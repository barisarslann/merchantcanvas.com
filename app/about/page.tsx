import Link from "next/link";
import { TrackedLink } from "../components/TrackedLink";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata(
  "About MerchantCanvas, a Shopify app studio",
  "MerchantCanvas is a product company building focused, practical Shopify apps around real merchant workflows.",
  "/about",
);

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero page-hero-about">
        <div className="container narrow">
          <p className="eyebrow">About MerchantCanvas</p>
          <h1>MerchantCanvas is a Shopify app studio for defined merchant workflows.</h1>
          <p className="page-lead">
            MerchantCanvas builds focused apps that turn a difficult merchant
            workflow into a clear, operable system. The ambition is a
            recognisable portfolio of four to five products—not a consultancy
            disguised as software.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container manifesto-grid">
          <div>
            <p className="eyebrow">The product thesis</p>
            <h2>Focused software can be ambitious without becoming broad.</h2>
          </div>
          <div className="manifesto-copy">
            <p>
              Shopify merchants already operate inside a dense system of
              products, orders, customers, companies, themes, discounts,
              invoices, and apps. A new product should reduce the cognitive
              load around one job, not add a new universe to maintain.
            </p>
            <p>
              That is why MerchantCanvas starts with the workflow: what decision
              must be made, which Shopify object should remain authoritative,
              what evidence an operator needs, and where an exception must
              become visible.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container value-grid">
          <article>
            <span>01</span>
            <h2>Practical</h2>
            <p>
              The interface and product language should match the merchant job,
              including the awkward edge cases that a demo can hide.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>Technically capable</h2>
            <p>
              Shopify Functions, Admin APIs, company context, draft orders,
              theme integrations, and billing are foundations—not marketing
              decoration.
            </p>
          </article>
          <article>
            <span>03</span>
            <h2>Truthful</h2>
            <p>
              Availability, pricing, compatibility, product evidence, and
              limitations should be stated plainly and updated when they
              change.
            </p>
          </article>
          <article>
            <span>04</span>
            <h2>Recognisable</h2>
            <p>
              Each app stays distinct while sharing the same standard of scope,
              explanation, operational clarity, and support.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container not-agency">
          <div>
            <p className="eyebrow">What MerchantCanvas is not</p>
            <h2>Clarity also comes from saying no.</h2>
          </div>
          <ul>
            <li>A generic AI agency</li>
            <li>A Shopify development consultancy</li>
            <li>A theme or template marketplace</li>
            <li>A broad “growth hacking” suite</li>
            <li>A collection of unrelated micro-tools</li>
            <li>A place for fabricated reviews or guaranteed outcomes</li>
          </ul>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container evidence-loop">
          <div>
            <p className="eyebrow">How products earn authority</p>
            <h2>Useful public information is part of the product.</h2>
          </div>
          <ol>
            <li>
              <span>Research</span>
              <p>Understand the merchant job and competitive reality.</p>
            </li>
            <li>
              <span>Implement</span>
              <p>Make the workflow and its guardrails real in the app.</p>
            </li>
            <li>
              <span>Explain</span>
              <p>Publish accurate definitions, fit guidance, packages, and trade-offs.</p>
            </li>
            <li>
              <span>Update</span>
              <p>Keep public claims aligned as availability and evidence change.</p>
            </li>
          </ol>
          <Link href="/resources" className="text-link">
            Read MerchantCanvas resources <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="closing-cta accent-green">
        <div className="container closing-cta-inner">
          <div>
            <p className="eyebrow">Work with the product, not a pitch</p>
            <h2>Have a Shopify workflow that needs a fit check?</h2>
            <p>
              Share the problem, store context, and current handoffs. We will be
              direct about what the current apps can and cannot do.
            </p>
          </div>
          <TrackedLink
            href="/contact"
            className="button button-primary"
            eventName="contact_intent"
            eventData={{ placement: "about_close" }}
          >
            Contact MerchantCanvas
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
