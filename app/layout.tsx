import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "./components/Analytics";
import { CookieConsent } from "./components/CookieConsent";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StructuredData } from "./components/StructuredData";
import { siteConfig } from "./content/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "MerchantCanvas — Focused Shopify apps",
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
        width: 1730,
        height: 909,
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
  colorScheme: "light",
  themeColor: "#f6f2e9",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  logo: `${siteConfig.url}/brand/merchantcanvas-app-icon-512.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <StructuredData data={organizationSchema} />
        <Analytics />
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
