import { ProductPage } from "../../components/ProductPage";
import { products } from "../../content/site";
import { pageMetadata } from "../../lib/metadata";

const product = products["multitier-discounts"];

export const metadata = pageMetadata(
  "MultiTier Discounts — Shopify tiered discounts",
  "Install MultiTier Discounts for Shopify quantity breaks, cart-value, Buy X Get Y, and supported gift campaigns with Functions-based checkout logic.",
  "/apps/multitier-discounts",
);

export default function MultiTierDiscountsPage() {
  return <ProductPage product={product} />;
}
