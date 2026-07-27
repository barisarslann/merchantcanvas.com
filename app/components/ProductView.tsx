"use client";

import { useEffect } from "react";
import { trackEvent } from "./Analytics";

export function ProductView({ product }: { product: string }) {
  useEffect(() => {
    trackEvent("view_product", { product });
  }, [product]);
  return null;
}
