import { CONSENT_LEVELS, createConsent, parseConsent, serializeConsent } from "./consent.js";
import { safeReadStorage, safeRemoveStorage, safeWriteStorage } from "./storage.js";

export const CONSENT_KEY = "merchantcanvas-consent";
export const CONSENT_EVENT = "merchantcanvas:consent";
type ConsentRecord = ReturnType<typeof createConsent>;
type ConsentLevel = "essential" | "analytics" | "analytics-advertising";

// A failed write must not restore the old grant on the next tracking call.
// This override deliberately lasts until a choice is successfully persisted.
let deniedForDocument: ConsentRecord | null = null;

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  if (deniedForDocument) return deniedForDocument;
  const stored = safeReadStorage("localStorage", CONSENT_KEY);
  if (!stored.available || (stored.value?.length ?? 0) > 2048) return null;
  return parseConsent(stored.value);
}

export function saveConsentChoice(level: ConsentLevel): boolean {
  if (typeof window === "undefined") return false;
  const next = createConsent(level);
  const serialized = serializeConsent(next);
  const written = safeWriteStorage("localStorage", CONSENT_KEY, serialized);
  const verified = written && safeReadStorage("localStorage", CONSENT_KEY);
  const saved = Boolean(verified && verified.available && verified.value === serialized);
  deniedForDocument = saved ? null : createConsent(CONSENT_LEVELS.essential);
  if (!saved) safeRemoveStorage("localStorage", CONSENT_KEY);
  window.dispatchEvent(new Event(CONSENT_EVENT));
  return saved;
}
