import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { TrackedLink } from "../components/TrackedLink";
import { siteConfig } from "../content/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata(
  "Contact MerchantCanvas about a Shopify workflow",
  "Ask about MultiTier Discounts fit, pricing, or implementation, B2B Quote Approvals launch updates, agency evaluation, or a Shopify workflow.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero page-hero-contact">
        <div className="container narrow">
          <p className="eyebrow">Contact MerchantCanvas</p>
          <h1>Talk through the Shopify workflow you need to improve.</h1>
          <p className="page-lead">
            Tell us what the store or client is trying to run, where the current
            process breaks, and which product you are considering. You will get
            a direct response, not a generic sales sequence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-sidebar">
            <p className="eyebrow">Good context to include</p>
            <ul className="plain-list">
              <li>The Shopify workflow you run today</li>
              <li>The point where manual work or ambiguity appears</li>
              <li>Relevant store, catalogue, theme, or B2B context</li>
              <li>Whether you are a merchant or evaluating for a client</li>
              <li>Your timing and what a useful next step looks like</li>
            </ul>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <TrackedLink
                href={`mailto:${siteConfig.email}`}
                eventName="contact_intent"
                eventData={{ placement: "contact_email" }}
              >
                {siteConfig.email}
              </TrackedLink>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container contact-paths">
          <article>
            <p className="eyebrow">Promotion campaigns</p>
            <h2>MultiTier Discounts</h2>
            <p>
              Share the campaign shape, qualification logic, theme context, and
              package questions.
            </p>
            <Link href="/apps/multitier-discounts" className="text-link">
              Review product fit <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article>
            <p className="eyebrow">B2B quote operations</p>
            <h2>B2B Quote Approvals</h2>
            <p>
              Share the intake, approval, buyer, company, and draft-order
              handoffs you need to support.
            </p>
            <Link href="/apps/b2b-quote-approvals" className="text-link">
              Review product fit <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
