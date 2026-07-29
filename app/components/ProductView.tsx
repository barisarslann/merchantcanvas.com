"use client";

import { useEffect, useRef } from "react";
import { CONSENT_EVENT, trackEvent } from "./Analytics";

export function ProductView({ product }: { product: string }) {
  const trackedRef = useRef(false);

  useEffect(() => {
    const trackProductView = () => {
      if (trackedRef.current) return;
      trackedRef.current = trackEvent("view_product", { product });
    };

    trackProductView();
    window.addEventListener(CONSENT_EVENT, trackProductView);
    return () => window.removeEventListener(CONSENT_EVENT, trackProductView);
  }, [product]);
  return null;
}
