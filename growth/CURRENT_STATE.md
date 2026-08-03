# Current Growth State

**Updated:** 2026-08-03  
**Mode:** Zero-cost observation and preparation  
**Paid media authority:** Not granted  
**Daily and lifetime spend cap:** $0

## Product

- MultiTier Discounts is the only live product eligible for acquisition.
- Official destination: `https://apps.shopify.com/multitier-discounts`.
- The public listing was reachable on 2026-08-02 and displayed a free plan,
  free trial, four plans, and zero public reviews.
- B2B Quote Approvals remains coming soon and is excluded from acquisition.

## Channel decisions

- Shopify App Store Ads are excluded. The owner has already tested the channel
  and observed economics that are not acceptable for this stage.
- Meta is the first paid candidate to prepare, not a preselected winner.
- Google Search remains a secondary controlled candidate for high-intent terms.
- No paid channel may start until the owner explicitly changes the authority
  and budget state.

## Website and discovery

- On 2026-08-02, the homepage, MTD page, `robots.txt`, and `sitemap.xml` all
  returned HTTP 200.
- Homepage and MTD page each rendered one H1 and a self-referencing canonical.
- The sitemap exposed the expected 11 public URLs with `lastmod` values.
- A public search-tool check returned no `merchantcanvas.com` result for three
  representative queries. This is directional only and does not replace
  Search Console.
- The authoritative 2026-07-29 audit recorded the homepage as indexed while
  MTD, B2B, and the two guides were not yet indexed at T0.

## Measurement

- The website has a defined consent-aware `install_intent` contract.
- Completed installs remain a separate Shopify Partner Dashboard KPI.
- GA4 web stream `G-6L80EEB9KD` is configured in Cloudflare Pages production
  and preview. The site loads it only after analytics consent; Google Ads and
  Meta Pixel remain unset and advertising-consent gated.
- Production script-layer consent validation passed on 2026-08-03: Essential
  only loaded no Google or Meta script; Analytics only loaded the correct GA4
  script and no Meta script. GA4 Realtime event confirmation remains pending.
- The GA4 property already contains Shopify App Store listing activity. The
  observed seven-day property totals must not be reported as MerchantCanvas
  website traffic; future reporting should segment by stream or hostname.
- Cloudflare Pages project `merchantcanvas-com` is connected to GitHub `main`;
  the custom domain is active and the latest production deployment succeeded.
- Shopify Partner Dashboard reported 2 installs, 0 uninstalls, and 2 cumulative
  net installs for the last 30 days. Its raw merchant count is not a customer
  KPI because the observed history includes internal/test stores.
- Google Search Console reported 0 web-search clicks. Its sitemap is successful
  with 11 discovered pages; page-indexing data is still processing.
- Bing Webmaster Tools reported 0 clicks, 0 impressions, 0 Microsoft AI
  citations, and 0 average cited pages. Its sitemap is successful with 11 URLs.
- Meta Business Portfolio exists but is restricted from ads and audience use.
  Meta says the account appeared to be created or used with non-compliant
  automation. No review request has been submitted.
- The installed PostHog skill is present, but its OAuth-connected app/tools are
  not available in this session. PostHog remains optional and uninstrumented.
- Privacy and Terms remain drafts and continue to block paid activation.

## Immediate focus

1. Deploy and validate consent-aware GA4 collection on production.
2. Complete the existing T+14 AI/search observation on or after 2026-08-12.
3. Prepare a manual Meta restriction-review packet for owner approval; do not
   submit it automatically.
4. Select one MTD-first content item using real search/customer language.
5. Do not spend or publish externally during this mode.
