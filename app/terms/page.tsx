import { siteConfig } from "../content/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata(
  "Website terms draft",
  "Draft MerchantCanvas public website terms covering informational content, product availability, pricing, acceptable use, and legal review.",
  "/terms",
);

export default function TermsPage() {
  return (
    <main>
      <article className="legal-page">
        <header className="legal-hero">
          <div className="container narrow">
            <p className="eyebrow">Draft — owner and legal review required</p>
            <h1>Website terms</h1>
            <p>
              These draft terms are a launch preparation document. They must be
              reviewed against the final business entity, product agreements,
              jurisdiction, and public availability before publication.
            </p>
            <span>Draft reviewed 29 July 2026</span>
          </div>
        </header>
        <div className="container legal-body">
          <section>
            <h2>1. About this website</h2>
            <p>
              MerchantCanvas is a product brand for focused Shopify apps. This
              website provides public information about the brand, current
              products, packages, availability, and educational resources. It
              is not a Shopify development consultancy or a promise to provide
              custom services.
            </p>
          </section>
          <section>
            <h2>2. Informational content</h2>
            <p>
              Resources and product pages are provided for general business and
              technical information. They are not legal, tax, accounting, or
              financial advice. Examples are illustrative and do not guarantee
              revenue, conversion, order value, quote win rate, or any other
              outcome.
            </p>
          </section>
          <section>
            <h2>3. Product availability</h2>
            <p>
              MultiTier Discounts is publicly installable through its verified
              official Shopify App Store listing. B2B Quote Approvals is coming
              soon and provides a launch-update path instead of an install link.
            </p>
            <p>
              Product functionality, compatibility, plans, limits, and
              availability may change as products are reviewed and updated.
              Material public information should be revised when those changes
              occur.
            </p>
          </section>
          <section>
            <h2>4. Packages and pricing</h2>
            <p>
              Prices, plan names, billing intervals, trial terms, and feature
              limits shown on product pages are intended to match the verified
              implemented billing configuration at the time of review. The
              Shopify billing confirmation controls the actual purchase. The
              MultiTier Discounts Plus plan is shown separately because it is
              available only to stores Shopify verifies as Shopify Plus and may
              not appear in the general public listing.
            </p>
            <p>
              Taxes, currency conversion, Shopify charges, and changes approved
              through Shopify may affect the final amount. No unpublished
              discount or custom price is promised by this website.
            </p>
          </section>
          <section>
            <h2>5. Product-specific terms</h2>
            <p>
              Installation or use of a MerchantCanvas app may require separate
              product-specific terms, privacy notices, billing approval, and
              Shopify permissions. Those product terms govern app use and data
              processing and are separate from these public website terms.
            </p>
          </section>
          <section>
            <h2>6. Acceptable use</h2>
            <p>
              You should not misuse the website, attempt unauthorised access,
              interfere with availability, submit malicious content, scrape the
              site in a way that degrades service, or use public contact paths
              to send unlawful or abusive material.
            </p>
          </section>
          <section>
            <h2>7. Intellectual property</h2>
            <p>
              The MerchantCanvas name, site design, original product copy, and
              original resources are intended to remain the property of their
              respective owner. Shopify and related names and marks belong to
              Shopify and their respective owners. References to Shopify
              describe product context and do not imply endorsement.
            </p>
          </section>
          <section>
            <h2>8. Third-party services and links</h2>
            <p>
              The website may link to Shopify, email providers, or other
              third-party services. MerchantCanvas does not control their
              availability, content, security, or terms. Use of those services
              is subject to their own agreements.
            </p>
          </section>
          <section>
            <h2>9. Disclaimers and liability</h2>
            <p>
              The final legal terms must define warranties, disclaimers,
              liability limits, indemnities, governing law, and dispute
              procedures appropriate to the owner’s legal entity and customer
              markets. This draft intentionally does not invent those clauses or
              claim that a jurisdiction has been selected.
            </p>
          </section>
          <section>
            <h2>10. Changes and contact</h2>
            <p>
              These terms should be updated when the legal entity, products,
              packages, availability, or applicable agreements change.
              Questions can be sent to {siteConfig.email}. The owner must
              confirm that this address is monitored before launch.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
