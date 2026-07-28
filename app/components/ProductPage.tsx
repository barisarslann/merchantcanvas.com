import Image from "next/image";
import Link from "next/link";
import type { Product } from "../content/site";
import {
  absoluteUrl,
  organizationId,
  websiteId,
} from "../lib/metadata";
import { PricingGrid } from "./PricingGrid";
import { ProductView } from "./ProductView";
import { StructuredData } from "./StructuredData";
import { TrackedLink } from "./TrackedLink";

export function ProductPage({ product }: { product: Product }) {
  const productUrl = absoluteUrl(`/apps/${product.slug}`);
  const pageId = `${productUrl}#webpage`;
  const applicationId = `${productUrl}#softwareapplication`;
  const breadcrumbId = `${productUrl}#breadcrumb`;
  const faqId = `${productUrl}#faq`;
  const installUrl =
    product.slug === "multitier-discounts"
      ? process.env.NEXT_PUBLIC_MULTITIER_INSTALL_URL
      : process.env.NEXT_PUBLIC_B2B_QUOTE_INSTALL_URL;
  const actionHref = installUrl || product.primaryHref;
  const actionLabel = installUrl
    ? "Install from Shopify"
    : product.primaryAction;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": pageId,
        "@type": "WebPage",
        url: productUrl,
        name: product.name,
        description: product.definition,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": applicationId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@id": applicationId,
        "@type": "SoftwareApplication",
        name: product.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Shopify",
        url: productUrl,
        description: product.definition,
        mainEntityOfPage: { "@id": pageId },
        offers: product.plans.map((plan) => ({
          "@id": `${productUrl}#offer-${plan.name.toLowerCase()}`,
          "@type": "Offer",
          name: `${product.name} ${plan.name}`,
          url: `${productUrl}#packages`,
          price: plan.price.replace(/[^0-9.]/g, "") || "0",
          priceCurrency: "USD",
          availability: "https://schema.org/LimitedAvailability",
          description:
            `${plan.limit}. ${plan.bestFor}. ${product.availability}`,
          offeredBy: { "@id": organizationId },
        })),
        provider: { "@id": organizationId },
      },
      {
        "@id": faqId,
        "@type": "FAQPage",
        url: productUrl,
        isPartOf: { "@id": pageId },
        mainEntity: product.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@id": breadcrumbId,
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Apps",
            item: absoluteUrl("/apps"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <ProductView product={product.slug} />
      <StructuredData data={structuredData} />
      <main>
        <section className={`product-hero accent-${product.accent}`}>
          <div className="container">
            <div className="breadcrumbs">
              <Link href="/apps">Apps</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </div>
            <div className="product-hero-grid">
              <div>
                <p className="eyebrow">{product.eyebrow}</p>
                <h1>{product.headline}</h1>
                <p className="definition">{product.definition}</p>
                <p className="hero-copy">{product.summary}</p>
                <TrackedLink
                  href={actionHref}
                  className="button button-primary"
                  eventName={installUrl ? "select_app" : "contact_intent"}
                  eventData={{
                    product: product.slug,
                    placement: "product_hero",
                  }}
                >
                  {actionLabel}
                </TrackedLink>
                <p className="availability-note">{product.availability}</p>
              </div>
              <ProductWorkflowVisual product={product} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container fit-grid">
            <div className="fit-card">
              <p className="eyebrow">Who it is for</p>
              <h2>A focused fit for a defined workflow</h2>
              <ul className="plain-list">
                {product.for.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="fit-card fit-card-green">
              <p className="eyebrow">When it is useful</p>
              <h2>Use it when the process needs structure</h2>
              <ul className="plain-list">
                {product.usefulWhen.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="fit-card fit-card-muted">
              <p className="eyebrow">Not the right fit if…</p>
              <h2>Scope is a product decision</h2>
              <ul className="plain-list plain-list-cross">
                {product.notFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-ink">
          <div className="container">
            <div className="section-heading light">
              <div>
                <p className="eyebrow">How the workflow works</p>
                <h2>From decision to Shopify outcome</h2>
              </div>
              <p>
                The product is designed around a clear operational path, not a
                disconnected feature list.
              </p>
            </div>
            <ol className="workflow-steps">
              {product.workflow.map((item) => (
                <li key={item.step}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Capabilities in merchant language</p>
                <h2>What {product.name} helps you do</h2>
              </div>
              <p>
                Technical foundations matter after the operational outcome is
                clear.
              </p>
            </div>
            <div className="capability-grid">
              {product.capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {product.screenshots && (
          <section className="section section-soft">
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Current product evidence</p>
                  <h2>Real screens from the app</h2>
                </div>
                <p>
                  These images come from the current product guide, not a
                  marketing mockup.
                </p>
              </div>
              <div className="screenshot-grid">
                {product.screenshots.map((screenshot) => (
                  <figure key={screenshot.src}>
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={screenshot.width}
                      height={screenshot.height}
                      unoptimized
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                    <figcaption>{screenshot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section" id="packages">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Plans, pricing, and availability</p>
                <h2>Choose by workflow depth, not feature count</h2>
              </div>
              <p>
                Clear limits and suitability make the package differences easy
                to scan.
              </p>
            </div>
            <PricingGrid plans={product.plans} />
            <p className="pricing-note">{product.pricingNote}</p>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container faq-layout">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2>Useful answers before the next step</h2>
            </div>
            <div className="faq-list">
              {product.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container related-resource">
            <div>
              <p className="eyebrow">Related guide</p>
              <h2>{product.resource.title}</h2>
              <p>{product.resource.description}</p>
            </div>
            <Link
              className="button button-secondary"
              href={product.resource.href}
            >
              {product.resource.linkLabel}
            </Link>
          </div>
        </section>

        <section className={`closing-cta accent-${product.accent}`}>
          <div className="container closing-cta-inner">
            <div>
              <p className="eyebrow">Next step</p>
              <h2>See whether {product.name} fits your workflow.</h2>
              <p>
                Share the store context and the process you are trying to
                improve. MerchantCanvas will respond with an honest fit check.
              </p>
            </div>
            <TrackedLink
              href={actionHref}
              className="button button-primary"
              eventName={installUrl ? "select_app" : "contact_intent"}
              eventData={{
                product: product.slug,
                placement: "product_close",
              }}
            >
              {actionLabel}
            </TrackedLink>
          </div>
        </section>
      </main>
    </>
  );
}

function ProductWorkflowVisual({ product }: { product: Product }) {
  const labels =
    product.slug === "multitier-discounts"
      ? ["Offer", "Target", "Guardrails", "Checkout"]
      : ["Quote", "Review", "Approval", "Draft order"];

  return (
    <div
      className="product-visual"
      role="img"
      aria-label={`${product.name} workflow`}
    >
      <div className="visual-header">
        <span>{product.category}</span>
        <span>01—04</span>
      </div>
      <div className="visual-route">
        {labels.map((label, index) => (
          <div key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <p>One focused path. Clear merchant decisions. Shopify stays central.</p>
    </div>
  );
}
