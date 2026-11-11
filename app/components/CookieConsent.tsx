"use client";

import { useEffect, useRef, useState } from "react";
import { CONSENT_LEVELS, createConsent } from "../lib/consent.js";
import { readConsent, saveConsentChoice } from "../lib/privacy";

type ConsentLevel = "essential" | "analytics" | "analytics-advertising";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const returnFocusIdRef = useRef<string | null>(null);
  const pendingReloadRef = useRef(false);

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      setVisible(!readConsent());
    }, 0);
    const open = (event: Event) => {
      const detail =
        event instanceof CustomEvent
          ? (event.detail as { returnFocusId?: string } | undefined)
          : undefined;
      returnFocusIdRef.current = detail?.returnFocusId || null;
      setVisible(true);
      window.setTimeout(() => firstActionRef.current?.focus(), 0);
    };
    window.addEventListener("merchantcanvas:open-consent", open);
    return () => {
      window.clearTimeout(initialCheck);
      window.removeEventListener("merchantcanvas:open-consent", open);
    };
  }, []);

  function choose(level: ConsentLevel) {
    const previous = readConsent();
    const next = createConsent(level);
    const needsReload =
      pendingReloadRef.current ||
      Boolean(previous?.analytics && !next.analytics) ||
      Boolean(previous?.advertising && !next.advertising);

    if (!saveConsentChoice(level)) {
      // Failed persistence switches this document to essential-only. Remember
      // already-loaded providers even though readConsent() now reports denied.
      pendingReloadRef.current = needsReload || Boolean(previous?.analytics);
      setSaveError(true);
      return;
    }
    setSaveError(false);
    setVisible(false);
    if (needsReload) {
      window.location.reload();
      return;
    }
    const returnFocusId = returnFocusIdRef.current;
    returnFocusIdRef.current = null;
    if (returnFocusId) {
      window.setTimeout(
        () => document.getElementById(returnFocusId)?.focus(),
        0,
      );
    }
  }

  if (!visible) return null;

  return (
    <aside
      id="cookie-preferences"
      className="cookie-banner"
      role="region"
      aria-label="Cookie and analytics preferences"
      aria-describedby={saveError ? "cookie-preferences-error" : undefined}
    >
      <div>
        <strong>Your privacy choice</strong>
        <p>
          Analytics helps improve the site. Advertising measurement is separate
          and only runs when you accept it. Essential storage remembers your
          choice.
        </p>
        {saveError && (
          <p id="cookie-preferences-error" role="alert">
            Optional analytics and advertising are off on this page, but we
            couldn’t save your preference. Check your browser’s storage settings,
            then choose again to retry. Your choice may not be remembered on your
            next visit.
          </p>
        )}
      </div>
      <div className="cookie-actions">
        <button
          ref={firstActionRef}
          type="button"
          className="button button-primary"
          onClick={() => choose(CONSENT_LEVELS.advertising)}
        >
          Analytics + advertising
        </button>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => choose(CONSENT_LEVELS.analytics)}
        >
          Analytics only
        </button>
        <button
          type="button"
          className="button button-quiet"
          onClick={() => choose(CONSENT_LEVELS.essential)}
        >
          Essential only
        </button>
      </div>
    </aside>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      id="cookie-settings-button"
      type="button"
      className="footer-button"
      aria-controls="cookie-preferences"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("merchantcanvas:open-consent", {
            detail: { returnFocusId: "cookie-settings-button" },
          }),
        )
      }
    >
      Cookie preferences
    </button>
  );
}
