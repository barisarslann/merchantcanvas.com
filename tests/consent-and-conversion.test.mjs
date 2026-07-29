import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  CONSENT_LEVELS,
  createConsent,
  parseConsent,
  serializeConsent,
} from "../app/lib/consent.js";

test("consent v2 keeps analytics and advertising as separate grants", () => {
  assert.deepEqual(createConsent(CONSENT_LEVELS.essential, "test"), {
    version: 2,
    analytics: false,
    advertising: false,
    updatedAt: "test",
  });
  assert.deepEqual(createConsent(CONSENT_LEVELS.analytics, "test"), {
    version: 2,
    analytics: true,
    advertising: false,
    updatedAt: "test",
  });
  assert.deepEqual(createConsent(CONSENT_LEVELS.advertising, "test"), {
    version: 2,
    analytics: true,
    advertising: true,
    updatedAt: "test",
  });
});

test("legacy analytics consent migrates without advertising consent", () => {
  assert.deepEqual(parseConsent("analytics"), {
    version: 2,
    analytics: true,
    advertising: false,
    updatedAt: "legacy-migration",
  });
  assert.deepEqual(parseConsent("essential"), {
    version: 2,
    analytics: false,
    advertising: false,
    updatedAt: "legacy-migration",
  });
});

test("invalid or contradictory stored consent fails safely", () => {
  assert.equal(parseConsent(null), null);
  assert.equal(parseConsent("not-json"), null);
  assert.equal(parseConsent('{"version":1}'), null);

  const parsed = parseConsent(
    serializeConsent({
      version: 2,
      analytics: false,
      advertising: true,
      updatedAt: "test",
    }),
  );
  assert.equal(parsed?.analytics, false);
  assert.equal(parsed?.advertising, false);
});

test("install intent uses direct consent-gated integrations and a bounded handoff", async () => {
  const [analytics, trackedLink] = await Promise.all([
    readFile(
      new URL("../app/components/Analytics.tsx", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../app/components/TrackedLink.tsx", import.meta.url),
      "utf8",
    ),
  ]);

  assert.doesNotMatch(analytics, /NEXT_PUBLIC_GTM_ID/);
  assert.match(analytics, /NEXT_PUBLIC_GOOGLE_ADS_INSTALL_CONVERSION_LABEL/);
  assert.match(analytics, /"trackCustom", "InstallIntent"/);
  assert.match(analytics, /const OUTBOUND_TIMEOUT_MS = 500/);
  assert.match(trackedLink, /eventName === "install_intent"/);
  assert.match(trackedLink, /trackOutboundEvent/);
});

