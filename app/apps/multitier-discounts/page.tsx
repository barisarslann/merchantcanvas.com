import { ProductPage } from "../../components/ProductPage";
import { products } from "../../content/site";
import { pageMetadata } from "../../lib/metadata";

const product = products["multitier-discounts"];

export const metadata = pageMetadata(
  "Shopify tiered discounts and quantity breaks",
  "Plan targeted Shopify tiered discounts, quantity breaks, cart-value, Buy X Get Y, and supported gift campaigns with Functions-based checkout logic.",
  "/apps/multitier-discounts",
);

export default function MultiTierDiscountsPage() {
  return <ProductPage product={product} />;
}
