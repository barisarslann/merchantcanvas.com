"use client";

import { useEffect, useRef, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY } from "./Analytics";

type Consent = "analytics" | "essential";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const returnFocusIdRef = useRef<string | null>(null);

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      setVisible(!window.localStorage.getItem(CONSENT_KEY));
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

  function choose(value: Consent) {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
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
        <strong>Your analytics choice</strong>
        <p>
          MerchantCanvas uses no advertising or analytics scripts until you
          choose analytics. Essential storage only remembers this preference.
        </p>
      </div>
      <div className="cookie-actions">
        <button
          ref={firstActionRef}
          type="button"
          className="button button-primary"
          onClick={() => choose("analytics")}
        >
          Accept analytics
        </button>
        <button
          type="button"
          className="button button-quiet"
          onClick={() => choose("essential")}
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
