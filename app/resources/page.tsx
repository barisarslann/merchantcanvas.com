import Link from "next/link";
import { resources } from "../content/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata(
  "Shopify promotion and B2B guides",
  "Practical MerchantCanvas guides for Shopify quantity breaks, tiered promotions, B2B quote approvals, and draft-order workflows.",
  "/resources",
);

export default function ResourcesPage() {
  return (
    <main>
      <section className="page-hero page-hero-resources">
        <div className="container narrow">
          <p className="eyebrow">MerchantCanvas resources</p>
          <h1>Shopify workflow guides for quantity breaks and B2B quote approvals.</h1>
          <p className="page-lead">
            Original, implementation-aware notes on Shopify promotion planning
            and B2B quote operations. Clear enough to use, specific enough to
            challenge your current process.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="resource-grid resource-grid-hub">
            {resources.map((resource) => (
              <article
                key={resource.slug}
                className={`resource-card accent-${resource.accent}`}
              >
                <div className="resource-meta">
                  <span>{resource.category}</span>
                  <span>{resource.readingTime}</span>
                </div>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <div className="resource-question">
                  <span>Question answered</span>
                  <strong>{resource.question}</strong>
                </div>
                <Link className="text-link" href={resource.href}>
                  {resource.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container authority-grid">
          <div>
            <p className="eyebrow">The content standard</p>
            <h2>No thin “top ten” filler.</h2>
          </div>
          <div>
            <p>
              MerchantCanvas resources focus on operating decisions, trade-offs,
              implementation constraints, test plans, and the points where a
              Shopify workflow commonly breaks.
            </p>
          </div>
          <ul>
            <li>Product claims grounded in current implementation</li>
            <li>Examples labelled as examples, not customer outcomes</li>
            <li>Public updates when product availability changes</li>
            <li>No hidden text, fabricated stories, or keyword-stuffed pages</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container content-roadmap">
          <div>
            <p className="eyebrow">What comes next</p>
            <h2>A deliberate knowledge base, grown with evidence.</h2>
          </div>
          <div className="roadmap-tags" aria-label="Planned resource types">
            <span>Product demos</span>
            <span>Changelogs</span>
            <span>Campaign planning tools</span>
            <span>Discount margin calculators</span>
            <span>B2B workflow templates</span>
            <span>Agency implementation guides</span>
            <span>Permissioned case studies</span>
          </div>
        </div>
      </section>
    </main>
  );
}
