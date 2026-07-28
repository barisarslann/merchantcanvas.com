"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, trackEvent } from "./Analytics";

export function ProductView({ product }: { product: string }) {
  useEffect(() => {
    const trackProductView = () => {
      trackEvent("view_product", { product });
    };

    trackProductView();
    window.addEventListener(CONSENT_EVENT, trackProductView);
    return () => window.removeEventListener(CONSENT_EVENT, trackProductView);
  }, [product]);
  return null;
}
