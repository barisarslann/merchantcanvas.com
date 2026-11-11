"use client";

import { useEffect } from "react";
import { CONSENT_LEVELS, createConsent } from "../lib/consent.js";
import { CONSENT_EVENT, CONSENT_KEY, readConsent } from "../lib/privacy";
import {
  ATTRIBUTION_KEY, ATTRIBUTION_KEYS, clearAttribution, saveAttribution,
  sanitizedPageUrl, sanitizedReferrer,
} from "../lib/attribution.js";

const OUTBOUND_TIMEOUT_MS = 500;
type ConsentRecord = ReturnType<typeof createConsent>;
type AnalyticsEvent = "view_product" | "select_app" | "contact_intent" | "install_intent";
type MetaQueue = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: MetaQueue;
  queue?: unknown[][];
  version?: string;
};
type GoogleQueue = ((...args: unknown[]) => void) & { merchantcanvasOwned?: boolean };
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GoogleQueue;
  fbq?: MetaQueue;
  _fbq?: MetaQueue;
};
let googleLoaded = false;
let previousConsent: ConsentRecord | null = null;
const pendingGoogleCommands = new Set<unknown>();

/** Measurement must never break a visitor's primary action. */
function attempt(action: () => void) {
  try { action(); return true; } catch { return false; }
}

function google(...args: unknown[]) {
  return attempt(() => (window as AnalyticsWindow).gtag?.(...args));
}

function meta(...args: unknown[]) {
  return attempt(() => (window as AnalyticsWindow).fbq?.(...args));
}

function appendScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (id === "merchantcanvas-gtag") script.onload = () => {
    googleLoaded = true;
    pendingGoogleCommands.clear();
  };
  document.head.appendChild(script);
}

function ensureGtag() {
  const win = window as AnalyticsWindow;
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag() {
      // Google's queue expects Arguments, not an array of arguments.
      // eslint-disable-next-line prefer-rest-params
      if (!googleLoaded) pendingGoogleCommands.add(arguments);
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer?.push(arguments);
    };
    win.gtag.merchantcanvasOwned = true;
    google("consent", "default", {
      analytics_storage: "denied", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied",
    });
    google("js", new Date());
  }
}

function measuredPage() {
  return {
    // Explicit overrides also protect the initial automatic GA page_view.
    page_location: sanitizedPageUrl(window.location.href),
    page_referrer: sanitizedReferrer(document.referrer),
  };
}

function clearAdvertisingUrl() {
  const clean = sanitizedPageUrl(window.location.href);
  if (clean && clean !== window.location.href) {
    // Preserve Next's navigation state, functional query fields and hashes.
    attempt(() => window.history.replaceState(window.history.state, "", clean));
  }
}

function clearProviderCookies(analytics: boolean, advertising: boolean) {
  attempt(() => {
    const names = document.cookie.split(";").map((part) => part.trim().split("=")[0]);
    const hostParts = window.location.hostname.split(".");
    const domains = ["", ...hostParts.map((_, i) => hostParts.slice(i).join("."))];
    for (const name of names) {
      const analyticsCookie = /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name);
      const advertisingCookie = /^_gcl_|^_fb[cp]$/.test(name);
      if ((!analytics && analyticsCookie) || (!advertising && advertisingCookie)) {
        for (const domain of domains) {
          document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
        }
      }
    }
  });
}

function applyConsent(consent: ConsentRecord | null) {
  const analytics = consent?.analytics === true;
  const advertising = analytics && consent?.advertising === true;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const downgraded = (previousConsent?.analytics && !analytics) ||
    (previousConsent?.advertising && !advertising);
  if (downgraded && !googleLoaded) attempt(() => {
    const win = window as AnalyticsWindow;
    // Removing a script does not cancel its fetch. Clear our still-pending
    // commands before queuing denial, so an arriving loader cannot replay them.
    if (win.gtag?.merchantcanvasOwned && Array.isArray(win.dataLayer)) {
      // A pre-existing dataLayer may contain another integration's records.
      // Remove only commands that this module actually queued.
      for (let i = win.dataLayer.length - 1; i >= 0; i--) {
        if (pendingGoogleCommands.has(win.dataLayer[i])) win.dataLayer.splice(i, 1);
      }
      pendingGoogleCommands.clear();
      delete document.documentElement.dataset.ga4Configured;
      delete document.documentElement.dataset.adsConfigured;
      google("consent", "default", {
        analytics_storage: "denied", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      });
      google("js", new Date());
    }
  });
  previousConsent = consent;

  if (!advertising) clearAdvertisingUrl();
  if (!analytics) clearAttribution();
  clearProviderCookies(analytics, advertising);
  if (ga4Id) attempt(() => {
    (window as unknown as Record<string, unknown>)[`ga-disable-${ga4Id}`] = !analytics;
  });
  // Basic consent: no optional script or new provider queue before a grant.
  if (analytics) attempt(ensureGtag);
  google("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  });
  if (!advertising) {
    meta("consent", "revoke");
    attempt(() => {
      const queue = (window as AnalyticsWindow).fbq?.queue;
      if (queue) queue.length = 0;
      document.getElementById("merchantcanvas-meta")?.remove();
      delete document.documentElement.dataset.metaConfigured;
      delete document.documentElement.dataset.adsConfigured;
    });
  }
  if (!analytics) {
    attempt(() => {
      document.getElementById("merchantcanvas-gtag")?.remove();
      delete document.documentElement.dataset.ga4Configured;
    });
    return;
  }

  saveAttribution();
  google("set", {
    ...measuredPage(),
    allow_google_signals: advertising,
    allow_ad_personalization_signals: advertising,
    ads_data_redaction: !advertising,
    url_passthrough: false,
  });
  const loaderId = ga4Id || (advertising ? adsId : undefined);
  if (loaderId) attempt(() => appendScript(
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId)}`,
    "merchantcanvas-gtag",
  ));
  if (ga4Id) {
    const configured = document.documentElement.dataset.ga4Configured === "true";
    const queued = google("config", ga4Id, {
      ...measuredPage(),
      allow_google_signals: advertising,
      allow_ad_personalization_signals: advertising,
      ...(configured ? { send_page_view: false } : {}),
    });
    if (queued) document.documentElement.dataset.ga4Configured = "true";
  }
  if (advertising && adsId && !document.documentElement.dataset.adsConfigured) {
    if (google("config", adsId)) document.documentElement.dataset.adsConfigured = "true";
  }
  if (advertising && metaId) attempt(() => {
    const win = window as AnalyticsWindow;
    if (!win.fbq) {
      const queue: MetaQueue = (...args: unknown[]) => {
        if (queue.callMethod) queue.callMethod(...args);
        else queue.queue?.push(args);
      };
      queue.loaded = true;
      queue.push = queue;
      queue.queue = [];
      queue.version = "2.0";
      win.fbq = queue;
      win._fbq = queue;
    }
    meta("consent", "grant");
    appendScript("https://connect.facebook.net/en_US/fbevents.js", "merchantcanvas-meta");
    if (!document.documentElement.dataset.metaConfigured) {
      win.fbq("init", metaId);
      win.fbq("track", "PageView");
      document.documentElement.dataset.metaConfigured = "true";
    }
  });
}

function safeParameters(parameters: Record<string, string>) {
  const allowed = ["product", "placement", "destination", "topic", "action", "method"];
  const clean: Record<string, string> = {};
  for (const key of allowed) {
    const value = parameters[key];
    if (typeof value === "string" && value.length <= 128 && !/[\u0000-\u001f]/.test(value)) clean[key] = value;
  }
  return clean;
}

export function trackEvent(name: AnalyticsEvent, parameters: Record<string, string> = {}, onComplete?: () => void) {
  if (typeof window === "undefined") return false;
  try {
    // Runtime allowlist: stale compiled callers cannot create a fake lead.
    if (!["view_product", "select_app", "contact_intent", "install_intent"].includes(name)) return false;
    const consent = readConsent();
    if (!consent?.analytics) { applyConsent(consent); return false; }
    applyConsent(consent);
    const payload = { ...saveAttribution(), ...safeParameters(parameters) };
    const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_INSTALL_CONVERSION_LABEL;
    const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const waitsForMetaInstallTransport = name === "install_intent" && consent.advertising && Boolean(metaId);
    const waitsForInstallConversion = name === "install_intent" && consent.advertising && Boolean(adsId && label);
    const hasGoogleTransport = Boolean(ga4Id || (consent.advertising && adsId));
    const callback = onComplete ? { event_callback: onComplete, event_timeout: OUTBOUND_TIMEOUT_MS - 50 } : {};

    if (hasGoogleTransport) google("event", name, {
      ...payload, ...measuredPage(),
      // Never broadcast a GA event to the configured Ads destination.
      send_to: ga4Id || adsId,
      ...(!waitsForInstallConversion && !waitsForMetaInstallTransport ? callback : {}),
    });
    if (consent.advertising) {
      if (name === "view_product") meta("track", "ViewContent", payload);
      if (name === "install_intent") {
        meta("trackCustom", "InstallIntent", payload);
        if (adsId && label) google("event", "conversion", {
          send_to: `${adsId}/${label}`, ...payload, ...measuredPage(),
          ...(!waitsForMetaInstallTransport ? callback : {}),
        });
      }
    }
    if (!hasGoogleTransport && !waitsForMetaInstallTransport && onComplete) queueMicrotask(onComplete);
    return true;
  } catch {
    return false;
  }
}

export function trackOutboundEvent(name: AnalyticsEvent, parameters: Record<string, string> = {}) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve();
    };
    const timeout = setTimeout(finish, OUTBOUND_TIMEOUT_MS);
    try { if (!trackEvent(name, parameters, finish)) finish(); } catch { finish(); }
  });
}

export function preserveAttributionHref(href: string) {
  if (typeof window === "undefined" || !href.startsWith("/") || href.startsWith("//")) return href;
  try {
    const consent = readConsent();
    const target = new URL(sanitizedPageUrl(new URL(href, window.location.origin).href, consent?.advertising === true));
    if (consent?.analytics) {
      const attribution = saveAttribution();
      for (const key of ATTRIBUTION_KEYS) {
        if (attribution[key] && !target.searchParams.has(key)) target.searchParams.set(key, attribution[key]);
      }
    }
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return href;
  }
}

export function Analytics() {
  useEffect(() => {
    const handleConsent = () => { attempt(() => applyConsent(readConsent())); };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) handleConsent();
    };
    handleConsent();
    window.addEventListener(CONSENT_EVENT, handleConsent);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("popstate", handleConsent);
    return () => {
      window.removeEventListener(CONSENT_EVENT, handleConsent);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("popstate", handleConsent);
    };
  }, []);
  return null;
}

export { ATTRIBUTION_KEY, CONSENT_EVENT, CONSENT_KEY, CONSENT_LEVELS, OUTBOUND_TIMEOUT_MS };
