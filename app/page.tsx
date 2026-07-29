import Link from "next/link";
import { AppCard } from "./components/AppCard";
import { TrackedLink } from "./components/TrackedLink";
import { productList, products, resources } from "./content/site";
import { pageMetadata } from "./lib/metadata";

export const metadata = pageMetadata(
  "MultiTier Discounts for Shopify promotions",
  "Install MultiTier Discounts for Shopify tiered discounts, quantity breaks, Buy X Get Y, cart-value rewards, and supported gift campaigns.",
  "/",
);

export default function Home() {
  const multiTier = products["multitier-discounts"];

  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">Live Shopify discount app</p>
            <h1>Shopify tiered discounts, clearly controlled.</h1>
            <p>
              MultiTier Discounts is live for quantity breaks, Buy X Get Y,
              cart-value rewards, and supported gift campaigns. B2B Quote
              Approvals is the next focused MerchantCanvas app.
            </p>
            <div className="hero-actions">
              <TrackedLink
                href={multiTier.installUrl!}
                className="button button-primary"
                eventName="install_intent"
                eventData={{
                  product: "multitier-discounts",
                  placement: "home_hero",
                  destination: "shopify_app_store",
                }}
              >
                Install from Shopify
              </TrackedLink>
              <TrackedLink
                href="/contact?product=multitier-discounts&intent=fit-check"
                className="button button-secondary"
                eventName="contact_intent"
                eventData={{
                  product: "multitier-discounts",
                  placement: "home_hero_secondary",
                }}
              >
                Ask a fit question
              </TrackedLink>
            </div>
          </div>

          <div className="hero-app-selector" aria-label="Choose a MerchantCanvas app">
            {productList.map((product) => (
              <TrackedLink
                key={product.slug}
                href={`/apps/${product.slug}`}
                className={`hero-app-route accent-${product.accent}${
                  product.availabilityStatus === "live"
                    ? " hero-app-route-primary"
                    : " hero-app-route-coming-soon"
                }`}
                eventName="select_app"
                eventData={{
                  product: product.slug,
                  placement: "home_hero_selector",
                }}
              >
                <span className="hero-app-route-label">{product.category}</span>
                <strong>{product.name}</strong>
                <span className="hero-app-status">
                  {product.availabilityStatus === "live"
                    ? "Live on Shopify"
                    : "Coming soon"}
                </span>
                <p>{product.definition}</p>
                <span className="hero-app-route-arrow" aria-hidden="true">
                  ↗
                </span>
              </TrackedLink>
            ))}
          </div>
        </div>

        <div className="container hero-proof-strip" aria-label="Portfolio facts">
          <span>1 live app</span>
          <span>1 coming soon</span>
          <span>Shopify-native workflows</span>
          <span>Verified product details</span>
        </div>
      </section>

      <section className="section" aria-labelledby="portfolio-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Current portfolio</p>
              <h2 id="portfolio-title">Start with the live promotion app.</h2>
            </div>
            <p>
              MultiTier Discounts is ready to install. B2B Quote Approvals is
              clearly separated as an upcoming product, so availability never
              gets confused with capability.
            </p>
          </div>
          <div className="app-grid">
            {productList.map((product) => (
              <AppCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container">
          <div className="section-heading light">
            <div>
              <p className="eyebrow">Choose your workflow</p>
              <h2>Start with the operational bottleneck.</h2>
            </div>
            <p>
              A fast route for paid traffic, organic research, and agency
              evaluation.
            </p>
          </div>
          <div className="decision-grid">
            <article>
              <p className="eyebrow">Promotion campaigns</p>
              <h3>Help shoppers see and unlock tiered incentives.</h3>
              <p>
                Plan quantity breaks, cart-value rewards, Buy X Get Y, or gift
                flows with targeting and storefront guidance.
              </p>
              <TrackedLink
                href="/apps/multitier-discounts"
                className="text-link text-link-light"
                eventName="select_app"
                eventData={{
                  product: "multitier-discounts",
                  placement: "workflow_decision",
                }}
              >
                See MultiTier Discounts <span aria-hidden="true">→</span>
              </TrackedLink>
            </article>
            <article className="decision-coming-soon">
              <p className="eyebrow">B2B quote operations · Coming soon</p>
              <h3>Move wholesale quotes out of inbox-and-sheet chains.</h3>
              <p>
                Keep buyer context, pricing, approvals, revisions, and the
                Shopify draft-order handoff in one operational trail.
              </p>
              <TrackedLink
                href="/apps/b2b-quote-approvals"
                className="text-link text-link-light"
                eventName="select_app"
                eventData={{
                  product: "b2b-quote-approvals",
                  placement: "workflow_decision",
                }}
              >
                See B2B Quote Approvals <span aria-hidden="true">→</span>
              </TrackedLink>
            </article>
            <article className="decision-contact">
              <p className="eyebrow">Not sure yet?</p>
              <h3>Get a direct fit check for your store or client.</h3>
              <p>
                Share the real workflow. We will include where a product is not
                appropriate, not just where it might fit.
              </p>
              <TrackedLink
                href="/contact"
                className="text-link text-link-light"
                eventName="contact_intent"
                eventData={{ placement: "workflow_decision" }}
              >
                Contact MerchantCanvas <span aria-hidden="true">→</span>
              </TrackedLink>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container principle-layout">
          <div className="principle-intro">
            <p className="eyebrow">Why MerchantCanvas</p>
            <h2>Trust comes from product detail, not marketing theatre.</h2>
            <p>
              No fake logos, invented adoption numbers, or guaranteed growth
              claims. Product scope, current availability, and pricing are
              stated as they are.
            </p>
          </div>
          <div className="principle-list">
            <article>
              <div>
                <h3>Workflow before surface area</h3>
                <p>
                  Each app is built around a job a merchant can recognise and a
                  Shopify outcome the team can operate.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>Native foundations where they matter</h3>
                <p>
                  Shopify Functions, Admin workflows, billing, product and
                  company context, and draft orders serve defined jobs.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>Evidence without theatre</h3>
                <p>
                  Real screens and implementation-backed claims replace
                  fabricated dashboards, ratings, and generic SaaS promises.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Practical resources</p>
              <h2>Useful guidance before you choose an app.</h2>
            </div>
            <Link className="text-link" href="/resources">
              Browse all resources <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="resource-grid">
            {resources.map((resource) => (
              <article
                key={resource.slug}
                className={`resource-card accent-${resource.accent}`}
              >
                <div className="resource-meta">
                  <span>{resource.category}</span>
                  <span>{resource.readingTime}</span>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <Link className="text-link" href={resource.href}>
                  {resource.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta accent-green">
        <div className="container closing-cta-inner">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>Run your next promotion with MultiTier Discounts.</h2>
            <p>
              Review the verified packages on this site, then install from the
              official Shopify App Store listing.
            </p>
          </div>
          <TrackedLink
            href={multiTier.installUrl!}
            className="button button-primary"
            eventName="install_intent"
            eventData={{
              product: "multitier-discounts",
              placement: "home_close",
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
