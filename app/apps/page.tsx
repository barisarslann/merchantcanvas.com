import Link from "next/link";
import { AppCard } from "../components/AppCard";
import { TrackedLink } from "../components/TrackedLink";
import { productList, products } from "../content/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata(
  "MultiTier Discounts and upcoming Shopify apps",
  "Install live Shopify promotion app MultiTier Discounts and preview the coming-soon B2B Quote Approvals workflow.",
  "/apps",
);

export default function AppsPage() {
  const multiTier = products["multitier-discounts"];

  return (
    <main>
      <section className="page-hero page-hero-apps">
        <div className="container narrow">
          <p className="eyebrow">MerchantCanvas app portfolio</p>
          <h1>One live Shopify promotion app. One B2B app coming soon.</h1>
          <p className="page-lead">
            MultiTier Discounts is the primary MerchantCanvas product and is
            available on the Shopify App Store. B2B Quote Approvals remains
            indexable for evaluation while its production release is prepared.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portfolio-index">
            <div>
              <span>01</span>
              <p>Live on Shopify</p>
            </div>
            <div>
              <span>02</span>
              <p>Coming soon</p>
            </div>
            <div>
              <span>One brand</span>
              <p>Clear standalone products</p>
            </div>
          </div>
          <div className="app-grid app-grid-index">
            {productList.map((product) => (
              <AppCard
                key={product.slug}
                product={product}
                headingLevel={2}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container compare-layout">
          <div>
            <p className="eyebrow">Quick fit check</p>
            <h2>Which problem are you trying to solve?</h2>
          </div>
          <div className="comparison-table" role="table" aria-label="App fit comparison">
            <div role="row" className="comparison-head">
              <span role="columnheader">Question</span>
              <span role="columnheader">MultiTier Discounts</span>
              <span role="columnheader">B2B Quote Approvals</span>
            </div>
            <div role="row">
              <span role="cell">Primary job</span>
              <span role="cell">Tiered promotion campaigns</span>
              <span role="cell">Wholesale quote decisions</span>
            </div>
            <div role="row">
              <span role="cell">Main user</span>
              <span role="cell">Ecommerce and marketing teams</span>
              <span role="cell">Sales, operations, and finance teams</span>
            </div>
            <div role="row">
              <span role="cell">Shopify outcome</span>
              <span role="cell">Qualifying checkout discount</span>
              <span role="cell">Approved Shopify draft order</span>
            </div>
            <div role="row">
              <span role="cell">Availability</span>
              <span role="cell">Live on the Shopify App Store</span>
              <span role="cell">Coming soon; no public install yet</span>
            </div>
            <div role="row">
              <span role="cell">Not designed as</span>
              <span role="cell">A loyalty or marketing suite</span>
              <span role="cell">A generic RFQ or wholesale suite</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container portfolio-future">
          <div>
            <p className="eyebrow">Designed to grow</p>
            <h2>A portfolio system, not a two-card dead end.</h2>
          </div>
          <p>
            New apps can be added by category, merchant problem, compatibility,
            package data, and resources without changing the site’s core
            navigation or forcing unrelated products onto the same page.
          </p>
          <Link href="/about" className="text-link">
            Read the product principles <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="closing-cta accent-green">
        <div className="container closing-cta-inner">
          <div>
            <p className="eyebrow">Live product</p>
            <h2>Install MultiTier Discounts from Shopify.</h2>
            <p>
              Use the product page to verify fit and package details, or move
              directly to the official Shopify App Store listing.
            </p>
          </div>
          <TrackedLink
            href={multiTier.installUrl!}
            className="button button-primary"
            eventName="install_intent"
            eventData={{
              product: "multitier-discounts",
              placement: "apps_index_close",
              destination: "shopify_app_store",
            }}
          >
            Install from Shopify
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
