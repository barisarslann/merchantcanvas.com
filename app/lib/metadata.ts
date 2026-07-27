import type { Metadata } from "next";
import { siteConfig } from "../content/site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/og.png`,
          width: 1200,
          height: 630,
          alt: "MerchantCanvas — focused tools for clearer commerce operations",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/og.png`],
    },
  };
}
