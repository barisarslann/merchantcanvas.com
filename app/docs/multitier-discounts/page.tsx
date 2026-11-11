import Link from "next/link";
import { Fragment } from "react";
import { StructuredData } from "../../components/StructuredData";
import guide from "../../content/mtd-guide.json";
import { absoluteUrl, pageMetadata, websiteId } from "../../lib/metadata";
import { GuideNavigation, GuideTutorial } from "./GuideControls";
import styles from "./guide.module.css";

const path = "/docs/multitier-discounts";
const title = "MultiTier Discounts merchant guide";
const description = "Set up MultiTier Discounts with illustrated steps and 13 English tutorials for quantity breaks, gifts, widgets, targeting, and checkout testing.";
const canonical = absoluteUrl(path);

export const metadata = pageMetadata(title, description, path);

// Narrow migration of a specified manual; incumbent identity, not a redesign.
const directionContract = `<!--
THESIS: A complete merchant manual, not a second sales landing page.
OWN-WORLD: MerchantCanvas tokens, existing sans, light/dark, ruled reading sections.
STORY: Find a campaign task, follow verified demo steps, watch only when needed, test the cart.
FIRST VIEWPORT: Compact title and edition note, product links, sticky contents beside first chapter.
FORM: Specified manual migration; 17 anchored sections and 13 on-demand tutorials; no concept seed.
-->`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
      about: { "@id": absoluteUrl("/apps/multitier-discounts#softwareapplication") },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Documentation", item: absoluteUrl("/docs") },
        { "@type": "ListItem", position: 3, name: "MultiTier Discounts", item: canonical },
      ],
    },
  ],
};

export default function MultiTierDiscountsGuide() {
  return (
    <main className={styles.guide}>
      <span hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
      <StructuredData data={schema} />
      <header className={styles.guideHeader}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span>
            <Link href="/docs">Documentation</Link><span aria-hidden="true">/</span>
            <span>MultiTier Discounts</span>
          </nav>
          <p className="eyebrow">MultiTier Discounts documentation</p>
          <h1>{guide.title}</h1>
          <p className={styles.intro}>{guide.intro}</p>
          <p className={styles.edition}>{guide.editionNote}</p>
          <div className={styles.headerLinks}>
            <a href="#quick-start">Set up your first offer</a>
            <Link href="/apps/multitier-discounts#packages">View plans</Link>
            <Link href="/contact?product=multitier-discounts&intent=fit-check">Get setup help</Link>
          </div>
        </div>
      </header>
      <div className={`container ${styles.layout}`}>
        <GuideNavigation sections={guide.toc} />
        <article id="guide-content" className={styles.content} aria-label="MultiTier Discounts merchant guide">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.parts.map((part, index) => {
                if ("tutorialId" in part) {
                  const video = guide.videos.find((item) => item.id === part.tutorialId);
                  return video ? <GuideTutorial key={video.id} video={video} /> : null;
                }
                return (
                  <Fragment key={`${section.id}-${index}`}>
                    {/* Build-time imported, allowlisted public guide HTML; never visitor input. */}
                    <div className={styles.prose} dangerouslySetInnerHTML={{ __html: part.html ?? "" }} />
                  </Fragment>
                );
              })}
            </section>
          ))}
          <footer className={styles.guideFooter}>
            <p>{guide.footerNote}</p>
            <div className={styles.headerLinks}>
              <Link href="/apps/multitier-discounts">Product and plans</Link>
              <a href="https://apps.shopify.com/multitier-discounts">Install from Shopify</a>
              <Link href="/contact?product=multitier-discounts&intent=fit-check">Contact support</Link>
            </div>
            <p className={styles.legalLinks}>
              Application policies: <a href="https://multi-tier-discounts.barisarslan.com.tr/privacy-policy.html">App privacy policy</a>
              {" · "}<a href="https://multi-tier-discounts.barisarslan.com.tr/terms-of-service.html">App terms</a>
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
