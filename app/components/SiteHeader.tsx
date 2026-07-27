import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../content/site";
import { TrackedLink } from "./TrackedLink";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label="MerchantCanvas home">
          <Image
            className="brand-lockup"
            src="/brand/merchantcanvas-lockup-color.svg"
            alt="MerchantCanvas"
            width="330"
            height="48"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <TrackedLink
          href="/apps"
          className="button button-small button-primary header-cta"
        >
          Explore apps
        </TrackedLink>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/apps">Explore apps</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
