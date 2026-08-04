# Current Growth State

**Updated:** 2026-08-04
**Mode:** Meta pilot preparation; zero spend until final owner approval
**Paid media authority:** Preparation granted; activation not granted
**Pilot ceiling:** 1,600 TRY lifetime over seven days after approval

## Product

- MultiTier Discounts is the only live product eligible for acquisition.
- Official destination: `https://apps.shopify.com/multitier-discounts`.
- The public listing was reachable on 2026-08-02 and displayed a free plan,
  free trial, four plans, and zero public reviews.
- B2B Quote Approvals remains coming soon and is excluded from acquisition.

## Channel decisions

- Shopify App Store Ads are excluded. The owner has already tested the channel
  and observed economics that are not acceptable for this stage.
- Meta is the only paid channel in scope for the first pilot.
- Google Ads and Shopify App Store Ads are explicitly excluded from this pilot.
- The proposed Meta ad-account settings are USD and `Etc/UTC`. Delivery
  geography is controlled separately at ad-set level.
- The initial global launch cohort is English-language traffic in the United
  States, United Kingdom, Canada, and Australia. Wider country expansion waits
  for evidence so the micro-budget is not fragmented across worldwide traffic.
- The owner authorized preparation of one campaign, one ad set, and two ads,
  but the entire structure must remain paused until the owner approves the
  final preview.

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
  script and no Meta script.
- The correct `MerchantCanvas` GA4 property and `https://merchantcanvas.com`
  stream use `G-6L80EEB9KD`, matching production. A command-queue mismatch was
  corrected in commit `09c82a6` so the site now uses Google's documented
  `dataLayer.push(arguments)` form. Google Tag Assistant then found the tag and
  recorded `Config`, `page_view`, and `view_product` hits with zero console
  errors. GA4 Realtime and DebugView still showed zero, so site-side transport
  is verified but property-side reporting remains an activation blocker.
- A separate `MultiTier Discounts` GA4 property contains activity from the app
  surface. Its totals must not be reported as MerchantCanvas website traffic.
- Cloudflare Pages project `merchantcanvas-com` is connected to GitHub `main`;
  the custom domain is active and the latest production deployment succeeded.
- Shopify Partner Dashboard reported 2 installs, 0 uninstalls, and 2 cumulative
  net installs for the last 30 days. Its raw merchant count is not a customer
  KPI because the observed history includes internal/test stores.
- Google Search Console reported 0 web-search clicks. Its sitemap is successful
  with 11 discovered pages; page-indexing data is still processing.
- Bing Webmaster Tools reported 0 clicks, 0 impressions, 0 Microsoft AI
  citations, and 0 average cited pages. Its sitemap is successful with 11 URLs.
- Meta Business Portfolio is accessible. The prior restriction no longer
  appears in the inspected settings surface, but Meta still labels the
  business details as unverified.
- Meta ad account `MerchantCanvas Global` was created in USD and UTC. Billing
  shows a zero balance, no recent spend, and no payment method.
- The public `MerchantCanvas` Facebook Page and `MerchantCanvas` Dataset/Pixel
  were created. The Dataset/Pixel is connected to the ad account and the owner
  has full access. Conversions API was deliberately left disabled for this
  browser-only pilot.
- `merchantcanvas.com` was added to Meta and is awaiting verification. Its
  verification meta tag is in the repository and must reach production before
  Meta's verify action can pass.
- No Instagram account is connected. A payment method is still absent, so the
  account cannot spend.
- The installed PostHog skill is present, but its OAuth-connected app/tools are
  not available in this session. PostHog remains optional and uninstrumented.
- Privacy and Terms remain drafts and continue to block paid activation.

## Immediate focus

1. Publish and verify the Meta domain tag, then configure the Dataset/Pixel ID
   in Cloudflare Pages production and preview.
2. Recheck GA4 property reporting, then validate consent-gated Meta PageView
   and one PII-free `InstallIntent` after the Pixel exists.
3. Keep Privacy and Terms drafts, billing safety, and owner preview approval as
   activation gates.
4. Do not spend or publish externally during preparation mode.
