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
  const freePlan = multiTier.plans.find((plan) => plan.name === "Free")!;
  const starterPlan = multiTier.plans.find((plan) => plan.name === "Starter")!;

  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">Live Shopify discount app</p>
            <h1>Shopify tiered discounts, clearly controlled.</h1>
            <p>
              MerchantCanvas builds Shopify apps for clear promotion rules.
              MultiTier Discounts handles quantity breaks, Buy X Get Y,
              cart-value rewards, and gift campaigns. Start with the Free plan
              for {freePlan.limit.toLowerCase()}. B2B Quote Approvals is coming soon.
              Features vary by plan.
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
              <h2 id="portfolio-title">Which app can I install today?</h2>
            </div>
            <p>
              MultiTier Discounts is live on Shopify. Free includes {freePlan.limit.toLowerCase()};
              paid plans start at {starterPlan.price}/month. B2B Quote Approvals
              is coming soon and cannot be installed yet.
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
              <h2>What do you need to manage?</h2>
            </div>
            <p>
              Choose an app for discount campaigns or wholesale quote approvals.
            </p>
          </div>
          <div className="decision-grid">
            <article>
              <p className="eyebrow">Promotion campaigns</p>
              <h3>Set clear discount rules.</h3>
              <p>
                Choose quantity breaks, cart-value rewards, Buy X Get Y, or gift
                offers. Define which products and shoppers qualify, then show
                the offer in your storefront.
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
              <h3>Keep wholesale quotes in one place.</h3>
              <p>
                The upcoming app brings buyer details, pricing, approvals,
                and revisions together before creating a Shopify draft order.
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
              <h3>Will MTD fit your store?</h3>
              <p>
                Tell us your offer, eligible products, and discount rules. We
                can help you compare the {multiTier.plans.length} plans and check
                what fits before you install.
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
            <h2>What can I check before installing?</h2>
            <p>
              Check plan limits, real product screenshots, and checkout rules
              before you choose. We explain what each app supports and when it
              is not a good fit.
            </p>
          </div>
          <div className="principle-list">
            <article>
              <div>
                <h3>Clear campaign rules</h3>
                <p>
                  Choose the qualifying products, quantities, and cart totals.
                  Match the offer shoppers see to the rule used at checkout.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>Checkout stays in Shopify</h3>
                <p>
                  MultiTier Discounts uses Shopify Functions for checkout
                  discounts. The upcoming B2B app works with Shopify Admin and
                  draft orders.
                </p>
              </div>
            </article>
            <article>
              <div>
                <h3>Real product screens</h3>
                <p>
                  See the MultiTier Discounts campaign builder and order
                  analytics before installing. We do not publish unverified
                  ratings or sales results.
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
              <h2>How should I plan the workflow?</h2>
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
              Start with Free for {freePlan.limit.toLowerCase()}, or compare
              paid plans from {starterPlan.price}/month. Install through the
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
