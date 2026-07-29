import { siteConfig } from "../content/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata(
  "Privacy notice draft",
  "Draft MerchantCanvas marketing website privacy notice covering contact, consent-aware analytics, attribution, and site operations.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <main>
      <article className="legal-page">
        <header className="legal-hero">
          <div className="container narrow">
            <p className="eyebrow">Draft — owner and legal review required</p>
            <h1>Privacy notice</h1>
            <p>
              This draft describes the intended data practices of the public
              MerchantCanvas brand website. It must be reviewed against the
              final business entity, hosting, contact, analytics, and applicable
              law before launch.
            </p>
            <span>Draft reviewed 29 July 2026</span>
          </div>
        </header>
        <div className="container legal-body">
          <section>
            <h2>1. Scope</h2>
            <p>
              This notice applies to the public website at merchantcanvas.com.
              Individual MerchantCanvas Shopify apps have or will have their own
              product-specific privacy information covering the data processed
              inside those apps.
            </p>
          </section>
          <section>
            <h2>2. Information you choose to provide</h2>
            <p>
              If you contact MerchantCanvas by email, you may provide your name,
              email address, Shopify store URL, company or agency context, and
              details about the workflow you are evaluating. The current
              website contact form is static: it prepares a message in your
              email application and does not submit the form to a
              MerchantCanvas server.
            </p>
            <p>
              Do not include passwords, access tokens, customer lists, payment
              information, or other sensitive store data in an initial enquiry.
            </p>
          </section>
          <section>
            <h2>3. Analytics and advertising technology</h2>
            <p>
              The website is prepared to use direct Google Analytics 4, Google
              Ads conversion tracking, and Meta Pixel integrations. Google Tag
              Manager is intentionally not used in the first release to reduce
              duplicate-event risk.
            </p>
            <p>
              Google Analytics 4 loads only after analytics consent. Google Ads
              and Meta Pixel load only after separate advertising consent.
              Configured services may then receive page, product, app-selection,
              contact-intent, lead, and App Store install-intent events together
              with permitted campaign attribution such as UTM parameters,
              gclid, or fbclid. No advertising or analytics script is requested
              when essential-only operation is selected.
            </p>
            <p>
              An install-intent event records a click to the official Shopify
              App Store listing; it is not treated as proof that an app was
              installed. Completed installations are measured separately
              through Shopify’s own reporting.
            </p>
          </section>
          <section>
            <h2>4. Local and session storage</h2>
            <p>
              The site uses local storage to remember whether you selected
              essential only, analytics only, or analytics plus advertising.
              Campaign attribution is stored in session storage only after
              analytics consent is granted. Before consent, supported campaign
              parameters may be carried in the URL when you follow a primary
              internal call to action. A previous analytics-only preference is
              migrated without enabling advertising.
            </p>
          </section>
          <section>
            <h2>5. Hosting and service providers</h2>
            <p>
              The site is intended to be hosted on Cloudflare infrastructure.
              Cloudflare may process technical request information needed to
              deliver and protect the website, such as IP address, request
              headers, timing, and security signals, according to the final
              account configuration and Cloudflare terms.
            </p>
            <p>
              Email providers process messages sent to the MerchantCanvas
              contact address. Analytics providers process data only if they
              are configured and consent is granted as described above.
            </p>
          </section>
          <section>
            <h2>6. Purpose and retention</h2>
            <p>
              Contact information is intended to be used to respond to
              enquiries, assess product fit, provide requested availability
              updates, and maintain a relevant business conversation. Final
              retention periods and deletion procedures must be documented by
              the owner before launch.
            </p>
          </section>
          <section>
            <h2>7. Sharing</h2>
            <p>
              MerchantCanvas does not intend to sell personal information.
              Information may be processed by providers needed to host the site,
              operate email, secure the service, and run consented analytics.
              It may also be disclosed when legally required. The final vendor
              list and contractual arrangements require owner review.
            </p>
          </section>
          <section>
            <h2>8. Your choices</h2>
            <p>
              You can choose essential-only operation, analytics only, or
              analytics plus advertising from the cookie preference interface.
              You can reopen preferences from the site footer. You may also ask
              about information provided in a contact conversation by emailing{" "}
              {siteConfig.email}.
            </p>
            <p>
              Specific statutory rights vary by location. This draft does not
              claim compliance with any particular jurisdiction until reviewed
              by qualified counsel.
            </p>
          </section>
          <section>
            <h2>9. Security and children</h2>
            <p>
              Reasonable technical and organisational safeguards should be
              applied to the final website and business systems. No online
              service can promise absolute security. The website and products
              are intended for businesses and are not directed to children.
            </p>
          </section>
          <section>
            <h2>10. Changes and contact</h2>
            <p>
              This notice should be updated when the hosting, analytics, contact
              flow, legal entity, or product practices change. Questions can be
              sent to {siteConfig.email}. The owner must confirm that this
              address is monitored before launch.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
