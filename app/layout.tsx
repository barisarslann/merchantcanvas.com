import type { Metadata, Viewport } from "next";
import { Analytics } from "./components/Analytics";
import { CookieConsent } from "./components/CookieConsent";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StructuredData } from "./components/StructuredData";
import { siteConfig } from "./content/site";
import {
  absoluteUrl,
  organizationId,
  websiteId,
} from "./lib/metadata";
import "./globals.css";
import "./brand-system.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "MerchantCanvas — MultiTier Discounts for Shopify",
    template: "%s | MerchantCanvas",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "MerchantCanvas" }],
  creator: "MerchantCanvas",
  publisher: "MerchantCanvas",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MerchantCanvas — focused Shopify apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#06131f" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": organizationId,
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: absoluteUrl("/"),
      email: siteConfig.email,
      description: siteConfig.description,
      logo: absoluteUrl("/brand/merchantcanvas-app-icon-512.png"),
    },
    {
      "@id": websiteId,
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem("merchantcanvas-theme");var theme=saved==="light"||saved==="dark"?saved:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme="light";}})();`,
          }}
        />
      </head>
      <body>
        <div
          hidden
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: A multi-app Shopify portfolio should route visitors by a real workflow, not impress them with abstract studio theatre. OWN-WORLD: Cobalt and sun on clean light fields; azure and coral on deep-sea dark fields; compact sans type, hard color zones, precise lines, restrained radius. STORY: Understand the studio, see both apps, choose the relevant workflow, verify fit, act. FIRST VIEWPORT: Compact offer and actions left; two named product routes right; proof strip below. FORM: Swatch-book product index, grounded direction 7, seed 2e988220; the approved local comparison supplies the staging. -->",
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <StructuredData data={organizationSchema} />
        <Analytics />
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
