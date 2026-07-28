import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../content/site";
import { CookieSettingsButton } from "./CookieConsent";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="wordmark" aria-label="MerchantCanvas home">
            <Image
              className="brand-lockup brand-lockup-footer"
              src="/brand/merchantcanvas-lockup-dark.svg"
              alt="MerchantCanvas"
              width="330"
              height="48"
            />
          </Link>
          <p>
            Focused Shopify apps for practical promotion and B2B sales
            workflows.
          </p>
        </div>
        <div>
          <h2>Products</h2>
          <Link href="/apps/multitier-discounts">MultiTier Discounts</Link>
          <Link href="/apps/b2b-quote-approvals">B2B Quote Approvals</Link>
          <Link href="/apps">All apps</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h2>Legal</h2>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <CookieSettingsButton />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span>Built for clarity, evidence, and useful Shopify workflows.</span>
      </div>
    </footer>
  );
}
