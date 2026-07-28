import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The requested MerchantCanvas page could not be found. Browse the Shopify app portfolio or return to the homepage.",
};

export default function NotFound() {
  return (
    <main>
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">404</p>
          <h1>That page is not in the current portfolio.</h1>
          <p className="page-lead">
            The address may have changed, or the page may never have existed.
            Use one of the verified routes below.
          </p>
          <div className="hero-actions">
            <Link href="/apps" className="button button-primary">
              Browse the apps
            </Link>
            <Link href="/" className="button button-secondary">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
