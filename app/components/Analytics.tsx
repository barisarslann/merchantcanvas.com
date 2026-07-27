"use client";

import { useEffect } from "react";

const CONSENT_KEY = "merchantcanvas-consent";
const ATTRIBUTION_KEY = "merchantcanvas-attribution";
const CONSENT_EVENT = "merchantcanvas:consent";
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function hasConsent() {
  return window.localStorage.getItem(CONSENT_KEY) === "analytics";
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

function saveAttribution() {
  const fromUrl = currentAttribution();
  const previous = window.sessionStorage.getItem(ATTRIBUTION_KEY);
  const merged = {
    ...(previous ? JSON.parse(previous) : {}),
    ...fromUrl,
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

function loadAnalytics() {
  const win = window as AnalyticsWindow;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  saveAttribution();

  if (gtmId) {
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });
    appendScript(
      `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
      "merchantcanvas-gtm",
    );
  }

  if (ga4Id || adsId) {
    const loaderId = ga4Id || adsId;
    win.dataLayer = win.dataLayer || [];
    win.gtag =
      win.gtag ||
      function gtag(...args: unknown[]) {
        win.dataLayer?.push(args);
      };
    win.gtag("js", new Date());
    win.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    if (ga4Id) win.gtag("config", ga4Id, { anonymize_ip: true });
    if (adsId) win.gtag("config", adsId);
    appendScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId!)}`,
      "merchantcanvas-gtag",
    );
  }

  if (metaId && !win.fbq) {
    const queue = function (...args: unknown[]) {
      (queue as unknown as { queue: unknown[] }).queue.push(args);
    } as AnalyticsWindow["fbq"];
    (queue as unknown as { queue: unknown[] }).queue = [];
    win.fbq = queue;
    appendScript(
      "https://connect.facebook.net/en_US/fbevents.js",
      "merchantcanvas-meta",
    );
    win.fbq?.("init", metaId);
    win.fbq?.("track", "PageView");
  }
}

export function trackEvent(
  name: "view_product" | "select_app" | "contact_intent" | "lead_submit",
  parameters: Record<string, string> = {},
) {
  if (typeof window === "undefined" || !hasConsent()) return;

  const win = window as AnalyticsWindow;
  const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
  const attribution = stored ? JSON.parse(stored) : saveAttribution();
  const payload = { ...attribution, ...parameters };

  win.dataLayer?.push({ event: name, ...payload });
  win.gtag?.("event", name, payload);

  if (name === "lead_submit") {
    win.fbq?.("track", "Lead", payload);
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const conversionLabel =
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
    if (adsId && conversionLabel) {
      win.gtag?.("event", "conversion", {
        send_to: `${adsId}/${conversionLabel}`,
      });
    }
  } else if (name === "view_product") {
    win.fbq?.("track", "ViewContent", payload);
  }
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
    const handleConsent = () => {
      if (hasConsent()) loadAnalytics();
    };

    handleConsent();
    window.addEventListener(CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsent);
  }, []);

  return null;
}

export { ATTRIBUTION_KEY, CONSENT_EVENT, CONSENT_KEY };
