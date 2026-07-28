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
      }`}
    >
      <div className="app-card-topline">
        <span>{product.category}</span>
        <span className="status-dot">Focused app</span>
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
        See {product.name} <span aria-hidden="true">→</span>
      </TrackedLink>
    </article>
  );
}
