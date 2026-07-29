import type { Product } from "../content/site";
import { TrackedLink } from "./TrackedLink";

export function AppCard({
  product,
  compact = false,
  headingLevel = 3,
}: {
  product: Product;
  compact?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      className={`app-card accent-${product.accent}${
        compact ? " app-card-compact" : ""
      }${
        product.availabilityStatus === "coming-soon"
          ? " app-card-coming-soon"
          : " app-card-live"
      }`}
    >
      <div className="app-card-topline">
        <span>{product.category}</span>
        <span className="status-dot">
          {product.availabilityStatus === "live"
            ? "Live on Shopify"
            : "Coming soon"}
        </span>
      </div>
      <div>
        <Heading className="app-card-title">{product.name}</Heading>
        <p>{product.definition}</p>
      </div>
      {!compact && (
        <ul className="plain-list">
          {product.usefulWhen.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <TrackedLink
        href={`/apps/${product.slug}`}
        className="text-link"
        eventName="select_app"
        eventData={{ product: product.slug, placement: "app_card" }}
      >
        {product.availabilityStatus === "live"
          ? `See ${product.name}`
          : "View the upcoming app"}{" "}
        <span aria-hidden="true">→</span>
      </TrackedLink>
    </article>
  );
}
