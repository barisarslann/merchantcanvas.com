import { ProductPage } from "../../components/ProductPage";
import { products } from "../../content/site";
import { pageMetadata } from "../../lib/metadata";

const product = products["b2b-quote-approvals"];

export const metadata = pageMetadata(
  "B2B Quote Approvals — Shopify quote approval workflow",
  "Create, review, approve, share, and convert wholesale quotes into Shopify draft orders from a focused approval desk.",
  "/apps/b2b-quote-approvals",
);

export default function B2BQuoteApprovalsPage() {
  return <ProductPage product={product} />;
}
