export const CONSENT_VERSION = 2;

export const CONSENT_LEVELS = Object.freeze({
  essential: "essential",
  analytics: "analytics",
  advertising: "analytics-advertising",
});

/**
 * @param {"essential" | "analytics" | "analytics-advertising"} level
 * @param {string} [updatedAt]
 */
export function createConsent(
  level,
  updatedAt = new Date().toISOString(),
) {
  return {
    version: CONSENT_VERSION,
    analytics: level !== CONSENT_LEVELS.essential,
    advertising: level === CONSENT_LEVELS.advertising,
    updatedAt,
  };
}

/**
 * Reads both the v2 JSON record and the previous single-value preference.
 * Legacy analytics consent never becomes advertising consent.
 *
 * @param {string | null} raw
 */
export function parseConsent(raw) {
  if (raw === "analytics") {
    return createConsent(CONSENT_LEVELS.analytics, "legacy-migration");
  }
  if (raw === "essential") {
    return createConsent(CONSENT_LEVELS.essential, "legacy-migration");
  }
  if (!raw) return null;

  try {
    const value = JSON.parse(raw);
    if (
      value?.version !== CONSENT_VERSION ||
      typeof value.analytics !== "boolean" ||
      typeof value.advertising !== "boolean"
    ) {
      return null;
    }

    return {
      version: CONSENT_VERSION,
      analytics: value.analytics,
      advertising: value.analytics && value.advertising,
      updatedAt:
        typeof value.updatedAt === "string" ? value.updatedAt : "unknown",
    };
  } catch {
    return null;
  }
}

/**
 * @param {ReturnType<typeof createConsent>} consent
 */
export function serializeConsent(consent) {
  return JSON.stringify(consent);
}

