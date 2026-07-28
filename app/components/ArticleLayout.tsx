import Link from "next/link";
import type { ReactNode } from "react";
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
  path: string;
  takeaways: string[];
  children: ReactNode;
};

export function ArticleLayout({
  title,
  description,
  category,
  readingTime,
  reviewed,
  reviewedIso,
  path,
  takeaways,
  children,
}: ArticleLayoutProps) {
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
        inLanguage: "en",
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
        inLanguage: "en",
        datePublished: reviewedIso,
        dateModified: reviewedIso,
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
            name: "Resources",
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
      <main>
        <article>
          <header className="article-hero">
            <div className="container article-hero-inner">
              <div className="breadcrumbs">
                <Link href="/resources">Resources</Link>
                <span aria-hidden="true">/</span>
                <span>{category}</span>
              </div>
              <p className="eyebrow">{category}</p>
              <h1>{title}</h1>
              <p className="article-deck">{description}</p>
              <div className="article-byline">
                <span>Prepared by the MerchantCanvas product team</span>
                <span>{readingTime}</span>
                <span>Reviewed {reviewed}</span>
              </div>
            </div>
          </header>
          <div className="container article-layout">
            <aside className="article-aside">
              <p className="eyebrow">Key takeaways</p>
              <ul>
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="review-note">
                This guide reflects current product implementation and practical
                workflow research. It is not legal, tax, or financial advice.
              </p>
            </aside>
            <div className="article-body">{children}</div>
          </div>
        </article>
      </main>
    </>
  );
}
