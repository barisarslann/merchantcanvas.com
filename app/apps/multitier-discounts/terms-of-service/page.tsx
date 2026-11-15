import Link from "next/link";
import { pageMetadata } from "../../../lib/metadata";
import styles from "../policies.module.css";

export const metadata = pageMetadata(
  "MultiTier Discounts terms of service",
  "Read the MultiTier Discounts app terms covering service scope, merchant responsibilities, Shopify billing, availability, acceptable use, and support.",
  "/apps/multitier-discounts/terms-of-service",
);

// Specified legal migration: inherit MerchantCanvas's existing reading surface.
const directionContract = `<!--
THESIS: The existing app terms, with a brand-domain home and a branded contact.
OWN-WORLD: MerchantCanvas legal typography, theme tokens and ruled text sections.
STORY: Read the app agreement and reach support or the app's privacy policy.
FIRST VIEWPORT: App identity, agreement title, original revision date and relocation note.
FORM: Narrow content migration; existing legal-page, legal-hero and legal-body composition.
-->`;

export default function MultiTierDiscountsTermsOfService() {
  return (
    <main>
      <span hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
      <article className="legal-page">
        <header className="legal-hero">
          <div className="container narrow">
            <p className="eyebrow">MultiTier Discounts · MerchantCanvas</p>
            <h1>Terms of Service</h1>
            <span>Last updated: March 24, 2026</span>
            <p><small>Moved to merchantcanvas.com on November 15, 2026. The terms wording and original revision date are preserved; the contact address and navigation links have been updated.</small></p>
          </div>
        </header>
        <div className={`container narrow legal-body ${styles.policyBody}`}>
          <section>
            <h2>1. Overview</h2>
            <p>These Terms govern your use of MultiTier Discounts. By installing or using the app, you agree to these Terms.</p>
            <p>Your use of the app is also subject to our Privacy Policy, which explains how store and protected customer-related data is processed for the purposes of the app.</p>
          </section>
          <section>
            <h2>2. Service scope</h2>
            <p>MultiTier Discounts helps merchants create and manage discount campaigns, storefront widgets, analytics, and related Shopify app functionality.</p>
          </section>
          <section>
            <h2>3. Merchant responsibilities</h2>
            <ul>
              <li>You are responsible for campaign configuration and the offers shown to your customers</li>
              <li>You are responsible for verifying campaign logic before using it in a live store</li>
              <li>You must use the app in compliance with Shopify&apos;s terms and applicable law</li>
            </ul>
          </section>
          <section>
            <h2>4. Billing</h2>
            <p>Paid plans are billed through Shopify where applicable. Pricing, trial availability, and billing intervals are shown in the Shopify App Store and inside the app billing page.</p>
          </section>
          <section>
            <h2>5. Availability</h2>
            <p>We aim to keep the app available and reliable, but we do not guarantee uninterrupted service at all times.</p>
          </section>
          <section>
            <h2>6. Acceptable use</h2>
            <ul>
              <li>You may not use the app to violate Shopify policies</li>
              <li>You may not attempt to interfere with the app&apos;s security or normal operation</li>
              <li>You may not use the service for unlawful or deceptive discount practices</li>
            </ul>
          </section>
          <section>
            <h2>7. Intellectual property</h2>
            <p>The app software, branding, and related materials remain the property of MerchantCanvas unless otherwise stated.</p>
          </section>
          <section>
            <h2>8. Disclaimer</h2>
            <p>The app is provided on an &quot;as is&quot; and &quot;as available&quot; basis. Merchants should test campaigns before relying on them in production.</p>
          </section>
          <section>
            <h2>9. Limitation of liability</h2>
            <p>To the fullest extent permitted by law, MerchantCanvas will not be liable for indirect, incidental, special, or consequential damages arising from use of the app.</p>
          </section>
          <section>
            <h2>10. Termination</h2>
            <p>You may stop using the app at any time by uninstalling it from your Shopify store. We may suspend or terminate access if the app is used in a way that violates these Terms or Shopify platform rules.</p>
          </section>
          <section>
            <h2>11. Changes</h2>
            <p>We may update these Terms over time. Continued use of the app after updates means you accept the revised Terms.</p>
          </section>
          <section>
            <h2>12. Contact</h2>
            <p>Questions about these Terms can be sent to <a href="mailto:support@merchantcanvas.com">support@merchantcanvas.com</a>.</p>
          </section>
          <footer>
            <nav aria-label="MultiTier Discounts policy links">
              <ul>
                <li><Link href="/docs/multitier-discounts">User Guide</Link></li>
                <li><Link href="/contact?product=multitier-discounts&intent=support">Support</Link></li>
                <li><Link href="/apps/multitier-discounts/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </nav>
          </footer>
        </div>
      </article>
    </main>
  );
}
