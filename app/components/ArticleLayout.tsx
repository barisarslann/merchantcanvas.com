import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { editorialSchemaDateTime } from "../lib/schema-dates";
import {
  absoluteUrl,
  organizationId,
  websiteId,
} from "../lib/metadata";
import { StructuredData } from "./StructuredData";

type ArticleLayoutProps = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  reviewed: string;
  reviewedIso: string;
  published: string;
  publishedIso: string;
  illustration: { src: string; width: number; height: number; alt: string; caption: string };
  path: string;
  takeaways: string[];
  locale?: ArticleLocale;
  children: ReactNode;
};

type ArticleLocale = "en" | "tr";

const articleLabels = {
  en: {
    resources: "Resources",
    preparedBy: "Prepared by the MerchantCanvas product team",
    published: "Published",
    reviewed: "Reviewed",
    takeaways: "Key takeaways",
    reviewNote:
      "This guide reflects current product implementation and practical workflow research. It is not legal, tax, or financial advice.",
  },
  tr: {
    resources: "Kaynaklar",
    preparedBy: "MerchantCanvas ürün ekibi hazırladı",
    published: "Yayın",
    reviewed: "Kontrol",
    takeaways: "Öne çıkanlar",
    reviewNote:
      "Bu rehber, uygulamanın bugünkü hâline ve Shopify'ın yardım sayfalarına dayanır. Hukuki, vergi ya da finans tavsiyesi değildir.",
  },
} as const;

export function ArticleLayout({
  title,
  description,
  category,
  readingTime,
  reviewed,
  reviewedIso,
  published,
  publishedIso,
  illustration,
  path,
  takeaways,
  locale = "en",
  children,
}: ArticleLayoutProps) {
  const labels = articleLabels[locale];
  const articleUrl = absoluteUrl(path);
  const pageId = `${articleUrl}#webpage`;
  const articleId = `${articleUrl}#article`;
  const breadcrumbId = `${articleUrl}#breadcrumb`;
  const productTeamId = absoluteUrl("/about#product-team");
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": pageId,
        "@type": "WebPage",
        url: articleUrl,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": articleId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@id": articleId,
        "@type": "Article",
        url: articleUrl,
        headline: title,
        description,
        inLanguage: locale,
        datePublished: editorialSchemaDateTime(publishedIso),
        dateModified: editorialSchemaDateTime(reviewedIso),
        image: {
          "@type": "ImageObject",
          url: absoluteUrl(illustration.src),
          contentUrl: absoluteUrl(illustration.src),
          width: illustration.width,
          height: illustration.height,
          caption: illustration.caption,
        },
        mainEntityOfPage: { "@id": pageId },
        author: { "@id": productTeamId },
        publisher: { "@id": organizationId },
      },
      {
        "@id": productTeamId,
        "@type": "Organization",
        name: "MerchantCanvas product team",
        url: absoluteUrl("/about"),
        parentOrganization: { "@id": organizationId },
      },
      {
        "@id": breadcrumbId,
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: labels.resources,
            item: absoluteUrl("/resources"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: category,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <main lang={locale === "en" ? undefined : locale}>
        <article>
          <header className="article-hero">
            <div className="container article-hero-inner">
              <div className="breadcrumbs">
                <Link href="/resources">{labels.resources}</Link>
                <span aria-hidden="true">/</span>
                <span>{category}</span>
              </div>
              <p className="eyebrow">{category}</p>
              <h1>{title}</h1>
              <p className="article-deck">{description}</p>
              <div className="article-byline">
                <span>{labels.preparedBy}</span>
                <span>{readingTime}</span>
                <span>{`${labels.published} `}<time dateTime={publishedIso}>{published}</time></span>
                <span>{`${labels.reviewed} `}<time dateTime={reviewedIso}>{reviewed}</time></span>
              </div>
            </div>
          </header>
          <div className="container article-layout">
            <aside className="article-aside">
              <p className="eyebrow">{labels.takeaways}</p>
              <ul>
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="review-note">{labels.reviewNote}</p>
            </aside>
            <div className="article-body">
              <figure className="article-illustration">
                <Image unoptimized src={illustration.src} alt={illustration.alt}
                  width={illustration.width} height={illustration.height}
                  sizes="(max-width: 760px) calc(100vw - 32px), 760px" loading="lazy" />
                <figcaption>{illustration.caption}</figcaption>
              </figure>
              {children}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
