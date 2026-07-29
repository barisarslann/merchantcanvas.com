# MerchantCanvas SOL Technical SEO/AEO Audit

**Updated:** 2026-07-29
**Scope:** All public routes, rendered metadata, structured data, internal
links, discovery files, consent-aware measurement, and Cloudflare delivery.

## Executive summary

The local production build exposes 11 intended indexable routes with
server-rendered main content, unique metadata, one H1, self-canonicals, valid
internal links, parseable JSON-LD, and a useful noindex 404. MultiTier Discounts
is now represented as the live primary product; B2B Quote Approvals remains an
indexable coming-soon product.

No local P0 indexation blocker remains. Production commit `23cf9d3` deployed
successfully through Cloudflare Pages. Cloudflare crawler-policy cleanup,
Google Search Console verification, sitemap submissions, live URL inspection,
and Lighthouse validation are complete. External readiness still depends on
production measurement IDs, legal approval, post-index visibility follow-up,
and live vendor-helper QA.

## Implemented P1 fixes

### Product truth and conversion

- The verified MTD App Store destination is source-controlled at
  `https://apps.shopify.com/multitier-discounts`.
- Homepage, apps hub, MTD hero/close, and quantity-break guide expose direct
  install actions.
- B2B exposes “Coming soon” and a launch-update action without an install URL.
- All App Store calls to action use the same destination and event contract.

### Pricing and schema parity

- Free, Starter, and Pro remain the visible standard cards.
- Plus is a separate conditional band: $24.99/month, $249.90/year, 14-day free
  trial, eligible Shopify Plus stores only.
- `SoftwareApplication.downloadUrl` uses the official MTD listing.
- Standard MTD Offers use `InStock`; MTD Plus and every B2B offer use
  `LimitedAvailability`.
- Offer prices, names, eligibility text, availability, and visible FAQ answers
  are regression-tested against rendered HTML.
- No review, rating, merchant count, or outcome claim is emitted.

### Consent and measurement

- Consent v2 distinguishes Essential only, Analytics only, and Analytics +
  advertising.
- Legacy analytics preference migration never grants advertising.
- GA4 loads only with analytics consent. Google Ads and Meta load only with
  advertising consent.
- GTM is intentionally absent from the first-release code path.
- `install_intent` carries only product, placement, destination, and permitted
  attribution; navigation fails open at 500 ms.
- Completed Shopify installs remain a separate Shopify Partner Dashboard KPI.

### Discovery controls

The origin `robots.txt` now declares:

- Allowed: Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
  ClaudeBot.
- Blocked: GPTBot, CCBot, Bytespider, Google-Extended.
- `Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference`.

Cloudflare Managed `robots.txt` prepend was disabled on 2026-07-29 so this
origin file can be the only delivered policy. The live response must be
rechecked after the production deployment.

## External system status

- Google Search Console Domain property: verified.
- Google Search Console sitemap: submitted successfully; 11 URLs discovered at
  submission time.
- Bing Webmaster Tools: imported from Search Console.
- Bing sitemap: submitted successfully and processing.
- Cloudflare Managed `robots.txt`: disabled.
- Cloudflare Pages deployment: production commit `23cf9d3` published
  successfully.
- Live delivery: all 11 public sitemap routes and discovery files return HTTPS
  200 responses.
- Live crawler policy: `robots.txt` begins with the source-controlled
  `Content-Signal` directive; no Cloudflare prepend remains.
- Search Console URL Inspection: homepage is indexed and HTTPS-valid; MTD, B2B,
  and both guide URLs are not yet indexed at T0.
- Mobile Lighthouse: Performance 97, Accessibility 96, Best Practices 100, SEO
  100, CLS 0.0103, LCP 2.4 seconds.
- Visibility baseline: Google 20/20 and Perplexity 20/20 complete; ChatGPT
  Search 2/20 sampled, with the remaining queries scheduled after indexing.
- Cloudflare Pages measurement variables: only `NODE_VERSION` is currently
  configured; no production GA4, Google Ads, conversion-label, or Meta Pixel
  IDs were present during this audit.

## Remaining launch blockers

1. Privacy and Terms are intentionally still drafts and need owner/legal
   approval before paid activation.
2. Production GA4, Google Ads, install conversion label, and Meta Pixel IDs are
   required before real vendor-helper QA.
3. The remaining 18 ChatGPT Search baseline queries should be completed after
   the new product and guide URLs enter Google's index.
4. Consent combinations and single-event behaviour need browser/network and
   vendor-helper validation with real IDs.
5. The MTD Plus plan-selection, optional-scope, and managed-billing flow needs a
   second verified Shopify Plus test store.

## QA contract

Run under Node 22:

```powershell
npm run typecheck
npm run lint
npm test
npm run build:pages
```

Then validate live HTTPS routes, canonical/schema output, 360/390/768/1440
layouts, light/dark themes, App Store CTA visibility, no horizontal overflow,
and Lighthouse targets.

## Primary references

- [Google generative AI and SEO guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [OpenAI crawler controls](https://developers.openai.com/api/docs/bots)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)
- [Schema.org Offer](https://schema.org/Offer)
- [Shopify app billing](https://shopify.dev/docs/apps/launch/billing)
