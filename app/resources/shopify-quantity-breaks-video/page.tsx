import Link from "next/link";
import { StructuredData } from "../../components/StructuredData";
import { quantityBreaksVideo as video } from "../../content/quantity-breaks-video";
import { absoluteUrl, organizationId, pageMetadata, websiteId } from "../../lib/metadata";
import { VideoPlayer } from "./VideoPlayer";
import styles from "./watch.module.css";

const canonical = absoluteUrl(video.path);
const pageId = `${canonical}#webpage`;
const videoId = `${canonical}#video`;
const breadcrumbId = `${canonical}#breadcrumb`;
const thumbnailUrl = absoluteUrl(video.poster.src);
const baseMetadata = pageMetadata("Shopify quantity breaks video", video.description, video.path);

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    images: [{ ...video.poster, url: thumbnailUrl }],
  },
  twitter: { ...baseMetadata.twitter, images: [thumbnailUrl] },
};

const watchSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageId,
      url: canonical,
      name: video.title,
      description: video.description,
      inLanguage: "en",
      mainEntity: { "@id": videoId },
      isPartOf: { "@id": websiteId },
      breadcrumb: { "@id": breadcrumbId },
    },
    {
      "@type": "VideoObject",
      "@id": videoId,
      name: video.title,
      description: video.description,
      thumbnailUrl: [thumbnailUrl],
      uploadDate: video.uploadDate,
      duration: video.duration,
      embedUrl: video.embedUrl,
      inLanguage: "en",
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Resources", item: absoluteUrl("/resources") },
        { "@type": "ListItem", position: 2, name: "Quantity breaks video", item: canonical },
      ],
    },
  ],
};

export default function QuantityBreaksVideoPage() {
  return (
    <>
      <StructuredData data={watchSchema} />
      <main className={styles.watch}>
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: "<!-- THESIS: Watch one real quantity-break campaign rather than read a second article. OWN-WORLD: MerchantCanvas two-sky colors, compact type, and simple rules. STORY: Watch, find the relevant chapter, then repeat the cart checks. FIRST VIEWPORT: Compact title above a dominant 16:9 player with an explicit load action. FORM: Single-column watch page with notes beneath the player. -->",
          }}
        />
        <div className={`container ${styles.content}`}>
          <header className={styles.intro}>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/resources">Resources</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Quantity breaks video</span>
            </nav>
            <p className="eyebrow">Video tutorial · {video.runtime} · English captions</p>
            <h1>{video.title}</h1>
            <p>{video.description}</p>
          </header>
          <VideoPlayer />
          <div className={styles.notes}>
            <section aria-labelledby="video-chapters">
              <h2 id="video-chapters">Chapters</h2>
              <ol className={styles.chapters}>
                {video.chapters.map(([time, label]) => (
                  <li key={time}><span>{time}</span><span>{label}</span></li>
                ))}
              </ol>
            </section>
            <section className={styles.summary} aria-labelledby="video-notes">
              <h2 id="video-notes">What to test in your cart</h2>
              <p>
                In the Fieldnote Supply demo, two eligible notebooks on one cart
                line get 10% off; three or more get 15% off. The tiers do not
                stack, and two one-unit lines do not combine to qualify.
              </p>
              <p>
                Check the product widget, cart, and checkout at each tier. Then
                return to one unit to verify that the discount is removed.
                The demo uses fictional products and no order is placed.
              </p>
              <Link className="text-link" href={video.guidePath}>
                Read the quantity-break planning guide <span aria-hidden="true">→</span>
              </Link>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
