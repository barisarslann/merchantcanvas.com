"use client";

import { useEffect } from "react";
import {
  CONSENT_LEVELS,
  createConsent,
  parseConsent,
  serializeConsent,
} from "../lib/consent.js";

const CONSENT_KEY = "merchantcanvas-consent";
const ATTRIBUTION_KEY = "merchantcanvas-attribution";
const CONSENT_EVENT = "merchantcanvas:consent";
const OUTBOUND_TIMEOUT_MS = 500;
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type ConsentRecord = ReturnType<typeof createConsent>;
type AnalyticsEvent =
  | "view_product"
  | "select_app"
  | "contact_intent"
  | "lead_submit"
  | "install_intent";

type MetaQueue = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: MetaQueue;
  queue?: unknown[][];
  version?: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: MetaQueue;
  _fbq?: MetaQueue;
};

function readConsent(): ConsentRecord | null {
  const raw = window.localStorage.getItem(CONSENT_KEY);
  const consent = parseConsent(raw);

  if (consent && (raw === "analytics" || raw === "essential")) {
    const migrated = {
      ...consent,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(CONSENT_KEY, serializeConsent(migrated));
    return migrated;
  }

  return consent;
}

function currentAttribution() {
  const params = new URLSearchParams(window.location.search);
  const values: Record<string, string> = {};

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) values[key] = value;
  }

  return values;
}

function storedAttribution() {
  const previous = window.sessionStorage.getItem(ATTRIBUTION_KEY);
  if (!previous) return {};

  try {
    return JSON.parse(previous) as Record<string, string>;
  } catch {
    window.sessionStorage.removeItem(ATTRIBUTION_KEY);
    return {};
  }
}

function saveAttribution() {
  const merged = {
    ...storedAttribution(),
    ...currentAttribution(),
  };

  if (Object.keys(merged).length) {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(merged));
  }

  return merged;
}

function appendScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureGtag() {
  const win = window as AnalyticsWindow;
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag() {
      // Google's gtag.js queue expects the Arguments object from each command.
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer?.push(arguments);
    };
    win.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: OUTBOUND_TIMEOUT_MS,
    });
    win.gtag("js", new Date());
  }
  return win;
}

function applyConsent(consent: ConsentRecord | null) {
  const win = ensureGtag();
  const analyticsGranted = consent?.analytics === true;
  const advertisingGranted = consent?.advertising === true;

  win.gtag?.("consent", "update", {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ad_storage: advertisingGranted ? "granted" : "denied",
    ad_user_data: advertisingGranted ? "granted" : "denied",
    ad_personalization: advertisingGranted ? "granted" : "denied",
  });

  if (!analyticsGranted) return;

  saveAttribution();
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const loaderId = ga4Id || (advertisingGranted ? adsId : undefined);

  if (loaderId) {
    appendScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId)}`,
      "merchantcanvas-gtag",
    );
  }

  if (ga4Id && !document.documentElement.dataset.ga4Configured) {
    win.gtag?.("config", ga4Id, {
      anonymize_ip: true,
      allow_google_signals: advertisingGranted,
    });
    document.documentElement.dataset.ga4Configured = "true";
  }

  if (
    advertisingGranted &&
    adsId &&
    !document.documentElement.dataset.adsConfigured
  ) {
    win.gtag?.("config", adsId);
    document.documentElement.dataset.adsConfigured = "true";
  }

  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (
    advertisingGranted &&
    metaId &&
    !document.documentElement.dataset.metaConfigured
  ) {
    if (!win.fbq) {
      const queue: MetaQueue = (...args: unknown[]) => {
        if (queue.callMethod) {
          queue.callMethod(...args);
          return;
        }
        queue.queue?.push(args);
      };
      queue.loaded = true;
      queue.push = queue;
      queue.queue = [];
      queue.version = "2.0";
      win.fbq = queue;
      win._fbq = queue;
    }
    appendScript(
      "https://connect.facebook.net/en_US/fbevents.js",
      "merchantcanvas-meta",
    );
    win.fbq("init", metaId);
    win.fbq("track", "PageView");
    document.documentElement.dataset.metaConfigured = "true";
  }
}

export function trackEvent(
  name: AnalyticsEvent,
  parameters: Record<string, string> = {},
  onComplete?: () => void,
) {
  if (typeof window === "undefined") return false;

  const consent = readConsent();
  if (!consent?.analytics) return false;

  applyConsent(consent);
  const win = window as AnalyticsWindow;
  const payload = {
    ...saveAttribution(),
    ...parameters,
  };
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const leadConversionLabel =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  const installConversionLabel =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_INSTALL_CONVERSION_LABEL;
  const hasGoogleTransport = Boolean(
    ga4Id || (consent.advertising && adsId),
  );
  const waitsForInstallConversion =
    name === "install_intent" &&
    consent.advertising &&
    Boolean(adsId && installConversionLabel && win.gtag);

  if (win.gtag && hasGoogleTransport) {
    win.gtag("event", name, {
      ...payload,
      ...(!waitsForInstallConversion && onComplete
        ? {
            event_callback: onComplete,
            event_timeout: OUTBOUND_TIMEOUT_MS - 50,
          }
        : {}),
    });
  }

  if (consent.advertising) {
    if (name === "lead_submit") {
      win.fbq?.("track", "Lead", payload);
      if (adsId && leadConversionLabel) {
        win.gtag?.("event", "conversion", {
          send_to: `${adsId}/${leadConversionLabel}`,
        });
      }
    } else if (name === "view_product") {
      win.fbq?.("track", "ViewContent", payload);
    } else if (name === "install_intent") {
      win.fbq?.("trackCustom", "InstallIntent", payload);
      if (adsId && installConversionLabel) {
        win.gtag?.("event", "conversion", {
          send_to: `${adsId}/${installConversionLabel}`,
          ...payload,
          ...(onComplete
            ? {
                event_callback: onComplete,
                event_timeout: OUTBOUND_TIMEOUT_MS - 50,
              }
            : {}),
        });
      }
    }
  }

  if (!hasGoogleTransport && onComplete) {
    queueMicrotask(onComplete);
  }

  return true;
}

export function trackOutboundEvent(
  name: AnalyticsEvent,
  parameters: Record<string, string> = {},
) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve();
    };
    const timeout = window.setTimeout(finish, OUTBOUND_TIMEOUT_MS);
    const dispatched = trackEvent(name, parameters, finish);
    if (!dispatched) finish();
  });
}

export function preserveAttributionHref(href: string) {
  if (
    typeof window === "undefined" ||
    !href.startsWith("/") ||
    href.startsWith("//")
  ) {
    return href;
  }

  const target = new URL(href, window.location.origin);
  const current = new URLSearchParams(window.location.search);
  for (const key of ATTRIBUTION_KEYS) {
    const value = current.get(key);
    if (value && !target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  }

  return `${target.pathname}${target.search}${target.hash}`;
}

export function Analytics() {
  useEffect(() => {
    const handleConsent = () => applyConsent(readConsent());

    handleConsent();
    window.addEventListener(CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsent);
  }, []);

  return null;
}

export {
  ATTRIBUTION_KEY,
  CONSENT_EVENT,
  CONSENT_KEY,
  CONSENT_LEVELS,
  OUTBOUND_TIMEOUT_MS,
};
