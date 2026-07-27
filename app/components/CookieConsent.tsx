"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY } from "./Analytics";

type Consent = "analytics" | "essential";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      setVisible(!window.localStorage.getItem(CONSENT_KEY));
    }, 0);
    const open = () => setVisible(true);
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
  }

  if (!visible) return null;

  return (
    <aside
      className="cookie-banner"
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
          className="button button-primary"
          onClick={() => choose("analytics")}
        >
          Accept analytics
        </button>
        <button
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
      className="footer-button"
      onClick={() =>
        window.dispatchEvent(new Event("merchantcanvas:open-consent"))
      }
    >
      Cookie preferences
    </button>
  );
}
