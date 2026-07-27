import Image from "next/image";
import Link from "next/link";
import { AppCard } from "./components/AppCard";
import { TrackedLink } from "./components/TrackedLink";
import { productList, resources } from "./content/site";
import { pageMetadata } from "./lib/metadata";

export const metadata = pageMetadata(
  "Focused Shopify apps for promotions and B2B workflows",
  "MerchantCanvas builds practical Shopify apps for tiered promotions and structured B2B quote approvals.",
  "/",
);

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">A focused Shopify product studio</p>
            <h1>
              Shopify apps for sharper promotions and cleaner B2B sales.
            </h1>
            <p>
              MerchantCanvas builds practical tools around real merchant
              workflows—precise discount campaigns on one side, structured
              wholesale quote approvals on the other.
            </p>
            <div className="hero-actions">
              <TrackedLink href="/apps" className="button button-primary">
                Explore the apps
              </TrackedLink>
              <TrackedLink
                href="/contact"
                className="text-link"
                eventName="contact_intent"
                eventData={{ placement: "home_hero" }}
              >
                Talk through a workflow <span aria-hidden="true">→</span>
              </TrackedLink>
            </div>
          </div>
          <div
            className="hero-workflow-board"
            aria-label="MerchantCanvas product workflow overview"
          >
            <div className="board-header">
              <span>Merchant workflows</span>
              <span>02 products</span>
            </div>
            <div className="board-track board-track-coral">
              <div>
                <span>Promotion</span>
                <strong>Campaign</strong>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>Qualify</span>
                <strong>Target</strong>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>Apply</span>
                <strong>Checkout</strong>
              </div>
            </div>
            <div className="board-track board-track-blue">
              <div>
                <span>Wholesale</span>
                <strong>Quote</strong>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>Decide</span>
                <strong>Approve</strong>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>Convert</span>
                <strong>Draft order</strong>
              </div>
            </div>
            <div className="board-note">
              <span>Practical scope</span>
              <p>One defined problem → one clear Shopify outcome.</p>
            </div>
          </div>
        </div>
        <div className="container hero-proof-strip">
          <span>Shopify-native foundations</span>
          <span>Truthful plan data</span>
          <span>Useful before impressive</span>
          <span>Built for merchants and agencies</span>
        </div>
      </section>

      <section
        className="endorsement-band"
        aria-labelledby="endorsement-title"
      >
        <div className="container">
          <div className="endorsement-heading">
            <p className="eyebrow">Endorsement system</p>
            <h2 id="endorsement-title">Distinct products. One studio.</h2>
          </div>
          <div className="endorsement-grid">
            <div className="endorsement-signature">
              <strong>MultiTier Discounts</strong>
              <span>— by</span>
              <Image
                src="/brand/merchantcanvas-lockup-color.svg"
                alt="MerchantCanvas"
                width="330"
                height="48"
              />
            </div>
            <div className="endorsement-signature">
              <strong>B2B Quote Approvals</strong>
              <span>— by</span>
              <Image
                src="/brand/merchantcanvas-lockup-color.svg"
                alt="MerchantCanvas"
                width="330"
                height="48"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The current portfolio</p>
              <h2>Two apps. Two distinct operational problems.</h2>
            </div>
            <p>
              Choose by the workflow you need today. The portfolio structure is
              ready to grow without blending every use case into one product.
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
              <h2>Start with the bottleneck, not the feature list.</h2>
            </div>
            <p>
              A fast route for paid traffic, organic research, and agency
              evaluation.
            </p>
          </div>
          <div className="decision-grid">
            <article>
              <span className="decision-number">01</span>
              <p className="eyebrow">Promotion problem</p>
              <h3>“I want shoppers to buy more, with clear tiered incentives.”</h3>
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
            <article>
              <span className="decision-number">02</span>
              <p className="eyebrow">B2B operations problem</p>
              <h3>“Our quote approvals live in email and get re-keyed into Shopify.”</h3>
              <p>
                Create one record for buyer context, pricing, decisions,
                revisions, and the Shopify draft-order handoff.
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
              <span className="decision-number">03</span>
              <p className="eyebrow">Still evaluating</p>
              <h3>“I need to know if either app fits our store or client.”</h3>
              <p>
                Share the real workflow. We will answer with a direct fit check,
                including where the product is not appropriate.
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
            <h2>A product studio should earn trust in the details.</h2>
            <p>
              No fake logos, invented adoption numbers, or guaranteed growth
              claims. Product scope, current availability, and pricing are
              stated as they are.
            </p>
          </div>
          <div className="principle-list">
            <article>
              <span>01</span>
              <div>
                <h3>Workflow before surface area</h3>
                <p>
                  Each app is built around a job a merchant can recognise and a
                  Shopify outcome the team can operate.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Native foundations where they matter</h3>
                <p>
                  Shopify Functions, Admin workflows, billing, product and
                  company context, and draft orders are used for the jobs they
                  are suited to.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
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
              <p className="eyebrow">MerchantCanvas resources</p>
              <h2>Practical guidance, even before you choose an app.</h2>
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
                  Read the guide <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta accent-green">
        <div className="container closing-cta-inner">
          <div>
            <p className="eyebrow">A clear next step</p>
            <h2>Find the app built for the workflow in front of you.</h2>
            <p>
              Explore the portfolio, compare verified packages, or contact
              MerchantCanvas for an honest fit check.
            </p>
          </div>
          <TrackedLink href="/apps" className="button button-primary">
            Explore products
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
