import { safeReadStorage, safeRemoveStorage, safeWriteStorage } from "./storage.js";

export const ATTRIBUTION_KEY = "merchantcanvas-attribution";
export const ATTRIBUTION_KEYS = Object.freeze([
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
]);
export const ATTRIBUTION_VALUE_LIMIT = 256;
export const ATTRIBUTION_RECORD_LIMIT = 8192;
const AD_KEYS = new Set([
  "gclid", "dclid", "fbclid", "gbraid", "wbraid", "gclsrc", "msclkid",
  "ttclid", "twclid", "li_fat_id", "_gl", "_fbc", "_fbp",
]);
let ignoreStored = false;

/** @param {unknown} value */
function campaignValue(value) {
  return typeof value === "string" && value.length > 0 &&
    value.length <= ATTRIBUTION_VALUE_LIMIT && !/[\u0000-\u001f\u007f]/.test(value)
    ? value : null;
}

/** Only bounded, known string fields can ever leave this parser.
 * @param {string | null} raw
 * @returns {Record<string, string>}
 */
export function parseAttribution(raw) {
  if (!raw || raw.length > ATTRIBUTION_RECORD_LIMIT) return {};
  try {
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    /** @type {Record<string, string>} */
    const allowed = {};
    for (const key of ATTRIBUTION_KEYS) {
      const clean = campaignValue(value[key]);
      if (clean) allowed[key] = clean;
    }
    return allowed;
  } catch {
    return {};
  }
}

/** Call only after analytics consent. @returns {Record<string, string>} */
export function saveAttribution() {
  if (typeof window === "undefined") return {};
  const stored = safeReadStorage("sessionStorage", ATTRIBUTION_KEY);
  const merged = ignoreStored ? {} : parseAttribution(stored.value);
  const params = new URLSearchParams(window.location.search);
  for (const key of ATTRIBUTION_KEYS) {
    const value = campaignValue(params.get(key));
    if (value) merged[key] = value;
  }
  if (Object.keys(merged).length) {
    if (safeWriteStorage("sessionStorage", ATTRIBUTION_KEY, JSON.stringify(merged))) {
      ignoreStored = false;
    }
  } else {
    safeRemoveStorage("sessionStorage", ATTRIBUTION_KEY);
  }
  return merged;
}

export function clearAttribution() {
  // Even an undeletable old session record stays unusable after withdrawal.
  ignoreStored = true;
  safeRemoveStorage("sessionStorage", ATTRIBUTION_KEY);
}

/** Keep functional query fields/hash, but not click IDs without ad consent.
 * @param {string} raw @param {boolean} [allowAdvertising]
 */
export function sanitizedPageUrl(raw, allowAdvertising = false) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    url.username = "";
    url.password = "";
    if (!allowAdvertising) {
      for (const key of [...url.searchParams.keys()]) {
        if (AD_KEYS.has(key.toLowerCase())) url.searchParams.delete(key);
      }
    }
    return url.href;
  } catch {
    return "";
  }
}

/** Avoid forwarding query values (including personal data) from another page. */
export function sanitizedReferrer(raw) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}
