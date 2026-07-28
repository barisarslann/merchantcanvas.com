import Link from "next/link";
import { AppCard } from "../components/AppCard";
import { TrackedLink } from "../components/TrackedLink";
import { productList } from "../content/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata(
  "Shopify promotion and B2B quote apps",
  "Compare MerchantCanvas apps for Shopify tiered promotions and structured B2B quote approval workflows.",
  "/apps",
);

export default function AppsPage() {
  return (
    <main>
      <section className="page-hero page-hero-apps">
        <div className="container narrow">
          <p className="eyebrow">MerchantCanvas app portfolio</p>
          <h1>Shopify apps for tiered promotions and B2B quote approvals.</h1>
          <p className="page-lead">
            The portfolio starts with promotion operations and B2B quote
            approvals. Every app remains a standalone product with its own fit,
            packages, and path forward.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portfolio-index">
            <div>
              <span>01—02</span>
              <p>Current products</p>
            </div>
            <div>
              <span>03—05</span>
              <p>Future focused workflows</p>
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
            <p className="eyebrow">Need a fit check?</p>
            <h2>Bring the workflow, not a prepared feature list.</h2>
            <p>
              MerchantCanvas can help determine whether either product fits the
              real store or agency requirement.
            </p>
          </div>
          <TrackedLink
            href="/contact"
            className="button button-primary"
            eventName="contact_intent"
            eventData={{ placement: "apps_index_close" }}
          >
            Contact MerchantCanvas
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
