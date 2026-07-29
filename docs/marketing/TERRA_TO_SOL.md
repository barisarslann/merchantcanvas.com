# TERRA → SOL Technical Contract

**Updated:** 2026-07-29

## Product/schema parity

- MTD is live at `https://apps.shopify.com/multitier-discounts`.
- Free, Starter, and Pro are generally available standard offers.
- Plus is $24.99/month or $249.90/year with a 14-day free trial and is limited
  to stores Shopify verifies as Shopify Plus.
- B2B Quote Approvals is coming soon, has no install URL, and every offer remains
  limited availability.
- Every visible price, eligibility condition, FAQ answer, and availability
  sentence must continue to derive from the same content model as JSON-LD.

## Conversion/consent parity

- Every official App Store CTA emits one consented `install_intent` with
  `product`, `placement`, `destination`, and permitted attribution.
- A click is not reported as a completed installation.
- GA4 requires analytics consent; Google Ads and Meta require advertising
  consent.
- The old analytics preference must never grant advertising during migration.
- GTM remains unset for the first release.

## Discovery parity

- B2B stays indexable for organic prelaunch discovery but is excluded from paid
  landing pages.
- Cloudflare must deliver only the origin crawler policy; Managed robots prepend
  must be disabled.
- Sitemap, canonical, internal links, `llms.txt`, and rendered schema must remain
  regression-tested.

## Remaining external checks

- Search Console Domain property and representative URL inspections.
- Bing verification/import and sitemap submission.
- Live Rich Results/Schema.org validation.
- 20-query Google/ChatGPT Search/Perplexity baseline.
- Real-ID GA4/Google Ads/Meta event validation.
- Owner/legal approval before ad activation.
