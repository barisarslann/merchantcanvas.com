import Link from "next/link";
import { pageMetadata } from "../lib/metadata";
import styles from "./multitier-discounts/guide.module.css";

export const metadata = pageMetadata(
  "Shopify app documentation",
  "Find MerchantCanvas app setup instructions, illustrated campaign examples, English tutorials, and practical cart and checkout test checklists.",
  "/docs",
);

export default function DocumentationPage() {
  return (
    <main>
      <section className={styles.guideHeader}>
        <div className="container narrow">
          <p className="eyebrow">MerchantCanvas documentation</p>
          <h1>Set up your app. Test the real workflow.</h1>
          <p className="page-lead">Written instructions and optional English videos for the people running Shopify campaigns.</p>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <h2>MultiTier Discounts</h2>
          <p>Follow 17 illustrated sections and 13 tutorials covering first setup, quantity breaks, gifts, storefront widgets, and checkout checks.</p>
          <Link className="button button-primary" href="/docs/multitier-discounts">Open the merchant guide</Link>
          <p>Examples use synthetic Fieldnote Supply products. Test your own theme, qualifying cart, and checkout before launching.</p>
        </div>
      </section>
    </main>
  );
}
