import Link from "next/link";
import { pageMetadata } from "../../../lib/metadata";
import styles from "../policies.module.css";

export const metadata = pageMetadata(
  "MultiTier Discounts privacy policy",
  "Read the MultiTier Discounts app privacy policy covering Shopify store data, campaign analytics, optional support chat, retention, security, and your rights.",
  "/apps/multitier-discounts/privacy-policy",
);

// Specified legal migration: inherit MerchantCanvas's existing reading surface.
const directionContract = `<!--
THESIS: The existing app policy, with a brand-domain home and a branded contact.
OWN-WORLD: MerchantCanvas legal typography, theme tokens and ruled text sections.
STORY: Read the app's data practices and reach support or the app's terms.
FIRST VIEWPORT: App identity, policy title, original revision date and relocation note.
FORM: Narrow content migration; existing legal-page, legal-hero and legal-body composition.
-->`;

export default function MultiTierDiscountsPrivacyPolicy() {
  return (
    <main>
      <span hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
      <article className="legal-page">
        <header className="legal-hero">
          <div className="container narrow">
            <p className="eyebrow">MultiTier Discounts · MerchantCanvas</p>
            <h1>Privacy Policy</h1>
            <p><strong>Short version:</strong> We access only the Shopify data needed to run your discount campaigns. We do not sell your data. We do not use it for advertising. You can ask us to delete your data at any time.</p>
            <span>Last updated: March 24, 2026</span>
            <p><small>Moved to merchantcanvas.com on November 15, 2026. The policy wording and original revision date are preserved; the contact address and navigation links have been updated.</small></p>
          </div>
        </header>
        <div className={`container narrow legal-body ${styles.policyBody}`}>
          <section>
            <h2>1. Who We Are</h2>
            <p>MultiTier Discounts is a Shopify app published by <strong>MerchantCanvas</strong>. When you install this app, MerchantCanvas acts as the data processor on behalf of your store.</p>
            <p>If you have questions about this policy, contact us at: <a href="mailto:support@merchantcanvas.com">support@merchantcanvas.com</a></p>
          </section>
          <section>
            <h2>2. What Data We Access</h2>
            <p>To provide the app&apos;s functionality, we access the following data from your Shopify store:</p>
            <ul>
              <li><strong>Shop information:</strong> Store name, domain, timezone, currency code, and IANA timezone. Used to configure discount campaigns correctly.</li>
              <li><strong>OAuth session token:</strong> Used to authenticate your store and maintain your session within the app. Required by Shopify&apos;s embedded app standard.</li>
              <li><strong>Products and collections:</strong> Product titles, IDs, variants, and collection memberships. Used only when you select products or collections as campaign targets.</li>
              <li><strong>Orders:</strong> Order line items and applied discounts. Used to calculate campaign analytics and discount attribution. We access only the order data required to attribute discounts created by the app.</li>
              <li><strong>Customer tags:</strong> Tag names only. Used when you configure customer-segment targeting for a campaign.</li>
              <li><strong>Discount nodes:</strong> We create and manage Shopify discount records on your behalf when you activate a campaign.</li>
              <li><strong>Merchant feedback submissions:</strong> Ratings and written feedback that you voluntarily submit inside the app. Used only for support and product improvement.</li>
            </ul>
          </section>
          <section>
            <h2>3. What Data We Store</h2>
            <p>We store the following data in our own database (hosted on servers in the European Union):</p>
            <ul>
              <li><strong>Session data:</strong> Your store&apos;s Shopify OAuth access token and session identifier. Required for the app to function. Access tokens are stored encrypted at the application layer.</li>
              <li><strong>Campaign configurations:</strong> Names, discount tiers, trigger settings, start/end dates, and usage limits you define. This is the core data of the app.</li>
              <li><strong>Analytics records:</strong> Pseudonymized order references, the campaign applied, discount amounts, and timestamps. Used to power your analytics dashboard. No customer names, emails, phone numbers, or addresses are stored.</li>
              <li><strong>App settings:</strong> Your preferred language, discount threshold settings, and onboarding state.</li>
              <li><strong>Feedback records:</strong> Merchant-submitted ratings, comments, plan, and campaign count at the time of submission.</li>
            </ul>
            <p>We do <strong>not</strong> store customer names, email addresses, phone numbers, or shipping addresses.</p>
          </section>
          <section>
            <h2>4. How We Use Your Data</h2>
            <p>We use the data described above solely to:</p>
            <ul>
              <li>Display and manage your discount campaigns within the app</li>
              <li>Apply campaign logic at checkout via Shopify Functions</li>
              <li>Show analytics on your campaign performance</li>
              <li>Sync discount widget data to your storefront (via Shopify metafields)</li>
              <li>Process billing through Shopify&apos;s built-in billing API</li>
              <li>Review merchant feedback, debug issues, and improve the app experience</li>
            </ul>
            <p>We do <strong>not</strong> use your data for advertising, profiling, or selling to third parties.</p>
          </section>
          <section>
            <h2>5. Data Sharing</h2>
            <p>We do not sell, rent, or share your store data with any third parties, except:</p>
            <ul>
              <li><strong>Shopify:</strong> All discount operations go through the Shopify API. Shopify&apos;s own privacy policy applies to data processed on their platform.</li>
              <li><strong>Infrastructure providers:</strong> We use hosting, database, CDN, and security infrastructure providers to operate the app securely and reliably.</li>
              <li id="optional-support-chat"><strong>Optional support chat and tickets (tawk.to):</strong> Opening the chat bubble loads an isolated tawk.to chat frame in Admin; Contact support can also open chat in a separate tab. No chat connection is made until you choose to open it. You can create a support ticket by emailing the provided ticket address. Messages and contact details you choose to submit are processed by tawk.to to provide support; tawk.to also receives technical connection information such as your IP address and browser details when chat is loaded. The app does not automatically send your shop identity, campaign data, customer data or Shopify authentication tokens to this service. Chat scripts cannot access the Admin form or authentication URL, and no chat is added to the storefront or checkout. See <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer">tawk.to&apos;s privacy policy</a> for its processing practices. Please do not send passwords, access tokens or customer personal data through chat or tickets.</li>
            </ul>
            <p>We may also disclose information if required to comply with applicable law, regulation, subpoena, court order, or lawful request from a public authority, or to protect our rights, users, or the integrity of the app.</p>
          </section>
          <section>
            <h2>6. Data Retention</h2>
            <ul>
              <li><strong>Active stores:</strong> Data is retained for as long as the app is installed on your store.</li>
              <li><strong>After uninstallation:</strong> When you uninstall the app, your session is immediately deleted. Campaign and analytics data is retained for up to 30 days for recovery and support purposes, then permanently deleted.</li>
              <li><strong>On request:</strong> You may request immediate deletion of all data associated with your store at any time by contacting us.</li>
            </ul>
          </section>
          <section>
            <h2>7. Your Rights (GDPR and CCPA)</h2>
            <p>Depending on where your store operates, you may have certain rights regarding the data we process:</p>
            <ul>
              <li><strong>Right to access:</strong> You can request a copy of all data we hold for your store.</li>
              <li><strong>Right to deletion:</strong> You can request that we permanently delete all data related to your store.</li>
              <li><strong>Right to correction:</strong> If any stored data is incorrect, you can request a correction.</li>
              <li><strong>Right to portability:</strong> You can request your campaign and analytics data in a machine-readable format.</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href="mailto:support@merchantcanvas.com">support@merchantcanvas.com</a> with the subject line &quot;Data Request - [your store domain]&quot;. We will respond within 30 days.</p>
          </section>
          <section>
            <h2>8. Shopify Compliance Webhooks</h2>
            <p>We implement all mandatory Shopify compliance webhooks:</p>
            <ul>
              <li><code>customers/data_request</code> - We acknowledge and handle requests in line with Shopify&apos;s compliance workflow. The app does not store direct customer profile fields such as name, email, phone, or address.</li>
              <li><code>customers/redact</code> - We acknowledge redact requests and remove stored shop data where applicable under Shopify&apos;s compliance workflow.</li>
              <li><code>shop/redact</code> - We permanently delete all data associated with your shop within 30 days of receiving this request.</li>
            </ul>
          </section>
          <section>
            <h2>9. Security</h2>
            <p>We take reasonable precautions to protect your data. Access tokens and stored protected order references are encrypted or pseudonymized at the application layer, backups can be encrypted, and our server infrastructure uses HTTPS exclusively. Database access is restricted to application-level authentication only.</p>
            <p>No method of transmission over the internet is 100% secure. If you become aware of any security concern, please notify us immediately at <a href="mailto:support@merchantcanvas.com">support@merchantcanvas.com</a>.</p>
          </section>
          <section>
            <h2>10. Cookies and Technical Logs</h2>
            <p>The app itself (running inside Shopify Admin) does not use cookies independently. Shopify manages session handling within their admin iframe. The storefront badge extension does not set any cookies.</p>
            <p>Our infrastructure and security providers may process standard technical request data such as IP address, browser metadata, timestamps, and error logs for security, abuse prevention, uptime monitoring, and debugging.</p>
          </section>
          <section>
            <h2>11. Children&apos;s Privacy</h2>
            <p>This app is intended for use by Shopify merchants operating businesses. It is not directed at children under 13 and we do not knowingly collect data from minors.</p>
          </section>
          <section>
            <h2>12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. If we make significant changes, we will notify merchants through the app interface or via email. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.</p>
            <p>Continued use of the app after any changes constitutes acceptance of the updated policy.</p>
          </section>
          <section>
            <h2>13. Contact</h2>
            <p>For any privacy-related questions or requests:<br /><strong>MerchantCanvas</strong><br />Email: <a href="mailto:support@merchantcanvas.com">support@merchantcanvas.com</a></p>
          </section>
          <footer>
            <nav aria-label="MultiTier Discounts policy links">
              <ul>
                <li><Link href="/docs/multitier-discounts">User Guide</Link></li>
                <li><Link href="/contact?product=multitier-discounts&intent=support">Support</Link></li>
                <li><Link href="/apps/multitier-discounts/terms-of-service">Terms of Service</Link></li>
              </ul>
            </nav>
          </footer>
        </div>
      </article>
    </main>
  );
}
