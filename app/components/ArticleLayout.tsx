import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "../content/site";
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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: reviewedIso,
    dateModified: reviewedIso,
    mainEntityOfPage: `${siteConfig.url}${path}`,
    author: {
      "@type": "Organization",
      name: "MerchantCanvas product team",
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
