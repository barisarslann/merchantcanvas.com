"use client";

import { useEffect, useRef, useState } from "react";
import {
  CONSENT_EVENT,
  CONSENT_KEY,
  CONSENT_LEVELS,
} from "./Analytics";
import {
  createConsent,
  parseConsent,
  serializeConsent,
} from "../lib/consent.js";

type ConsentLevel = "essential" | "analytics" | "analytics-advertising";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const returnFocusIdRef = useRef<string | null>(null);

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      setVisible(
        !parseConsent(window.localStorage.getItem(CONSENT_KEY)),
      );
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
    const previous = parseConsent(window.localStorage.getItem(CONSENT_KEY));
    const next = createConsent(level);
    const needsReload =
      Boolean(previous?.analytics && !next.analytics) ||
      Boolean(previous?.advertising && !next.advertising);

    window.localStorage.setItem(CONSENT_KEY, serializeConsent(next));
    window.dispatchEvent(new Event(CONSENT_EVENT));
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
    >
      <div>
        <strong>Your privacy choice</strong>
        <p>
          Analytics helps improve the site. Advertising measurement is separate
          and only runs when you accept it. Essential storage remembers your
          choice.
        </p>
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
