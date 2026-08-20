# Current Growth State

**Updated:** 2026-08-15
**Mode:** Meta pilot preparation plus zero-cost distribution research; zero
spend until final owner approval
**Paid media authority:** Preparation granted; activation not granted
**Pilot ceiling:** 1,600 TRY lifetime over seven days after approval

## Product

- MultiTier Discounts is the only live product eligible for acquisition.
- Official destination: `https://apps.shopify.com/multitier-discounts`.
- The public listing was reachable on 2026-08-15 and displayed a free plan,
  free trial, all four plans including Plus, and zero public reviews.
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
- Shoffi is now the first zero-upfront-cost affiliate candidate for MTD. The
  Free account is active but no app is integrated, no listing is live, and no
  affiliate has been invited or approved.
- Proposed Shoffi terms are 30% of eligible net recurring revenue for 12
  months, $0 CPI, manual approval, and a $50 minimum withdrawal. These terms
  are not active and require owner approval.
- Shoffi is not an investor or app-sale marketplace. G2, Shopify Community,
  and Product Hunt are secondary free discovery candidates; OpenVC is a later
  fundraising-readiness tool; acquisition marketplaces are deferred.

## Website and discovery

- On 2026-08-15, the homepage, MTD page, `robots.txt`, `sitemap.xml`, and
  `llms.txt` all returned HTTP 200. The `www` host returned HTTP 301 to the
  canonical apex domain.
- Homepage and MTD page each rendered one H1 and a self-referencing canonical.
- The sitemap exposed the expected 11 public URLs with `lastmod` values.
- The fixed 20-query public web-search proxy check on 2026-08-15 returned no
  `merchantcanvas.com` result. The official App Store listing surfaced for
  branded MultiTier Discounts queries, not generic intent queries. This is
  directional and is not a completed ChatGPT/Perplexity citation sample.
- The authoritative 2026-07-29 audit recorded the homepage as indexed while
  MTD, B2B, and the two guides were not yet indexed at T0.

## Measurement

- The website has a defined consent-aware `install_intent` contract.
- Completed installs remain a separate Shopify Partner Dashboard KPI.
- GA4 web stream `G-6L80EEB9KD` and Meta Dataset/Pixel `1346021054411762` are
  configured in Cloudflare Pages production and preview. The site loads GA4
  only after analytics consent and loads the Meta Pixel only after advertising
  consent. Google Ads remains unset.
- Production script-layer consent validation passed on 2026-08-03: Essential
  only loaded no Google or Meta script; Analytics only loaded the correct GA4
  script and no Meta script.
- The correct `MerchantCanvas` GA4 property and `https://merchantcanvas.com`
  stream use `G-6L80EEB9KD`, matching production. A command-queue mismatch was
  corrected in commit `09c82a6` so the site now uses Google's documented
  `dataLayer.push(arguments)` form. Google Tag Assistant then found the tag and
  recorded `Config`, `page_view`, and `view_product` hits with zero console
  errors.
- The subsequent GA4 property recheck passed. MerchantCanvas Realtime showed
  two active users and received `page_view`, `view_product`, and
  `install_intent`. These are controlled validation events, not campaign
  traffic or completed Shopify installs.
- On 2026-08-09, GA4 reported 0 users and 0 events for both 2026-08-08 and the
  current day. Its last-seven-day view showed one active user in Ankara,
  26 events, 6 MTD page views, 2 session starts, and 3 `install_intent` events.
  Because this matches the known controlled Turkey/Meta/direct validation
  pattern, it is not counted as new prospect traffic or customer demand.
- On 2026-08-15, the latest-seven-day MerchantCanvas GA4 home view reported 0
  active users, 0 new users, 0 events, and 0 key events. Realtime also showed
  0 active users. There is no verified external prospect traffic in this
  period.
- A separate `MultiTier Discounts` GA4 property contains activity from the app
  surface. Its totals must not be reported as MerchantCanvas website traffic.
- Cloudflare Pages project `merchantcanvas-com` is connected to GitHub `main`;
  the custom domain is active and the latest production deployment succeeded.
- Shopify's developer dashboard reported 10 current installs on 2026-08-15,
  with no listed installation after 2026-07-17. Current installs include known
  internal/test stores and are not a customer KPI. The public listing has zero
  reviews. Payouts shows $145.14 USD pending from an existing merchant's annual
  subscription transaction net of a prior downgrade; it is not evidence of a
  new acquisition this week.
- Shopify Functions reported 1,884,572 successful runs and 9,030 errors over
  the last seven days, a displayed 0.48% error rate. August 12 produced 8,960
  `InstructionCountLimitExceededError` failures. Remediation belongs in a
  separate MTD-rooted task; this repository remains the only write scope.
- Google Search Console reported 0 clicks and 1 impression through 2026-08-13.
  The indexing report last updated on 2026-08-07 still showed 1 indexed and 13
  non-indexed URLs: 10 discovered but not indexed, 2 old `www` 404s, and 1
  redirect. Validation for the repaired `www` 404s started on 2026-08-08 and
  remains in progress. The sitemap was read on 2026-08-15 and is successful
  with 11 discovered pages.
- MerchantCanvas GA4 and Search Console are not linked. The no-cost connection
  is proposed as P-008 and requires owner approval because it mutates external
  analytics configuration.
- On 2026-08-09, Bing Webmaster Tools reported 0 clicks, 0 impressions, 0
  Microsoft AI citations, and 0 average cited pages. Its sitemap was successful
  with 11 URLs. This is now a stale baseline because the 2026-08-15 session was
  not signed in.
- Meta Business Portfolio is accessible. The prior restriction no longer
  appears in the inspected settings surface, but Meta still labels the
  business details as unverified.
- Meta ad account `MerchantCanvas Global` was created in USD and UTC. Billing
  shows a zero balance, no recent spend, and no payment method.
- The public `MerchantCanvas` Facebook Page and `MerchantCanvas` Dataset/Pixel
  were created. The Dataset/Pixel is connected to the ad account and the owner
  has full access. Conversions API was deliberately left disabled for this
  browser-only pilot.
- `merchantcanvas.com` is verified in Meta. The required verification tag is
  present in the live document head.
- The Dataset/Pixel ID is configured in Cloudflare Pages production and preview.
  A live essential-only check loaded no GA4 or Meta script; advertising consent
  loaded GA4 and the Meta Pixel. Meta processed PageView and ViewContent.
- The first two controlled outbound checks did not produce `InstallIntent` in
  Meta Test Events. The cause was traced to GA4's callback ending the outbound
  wait before the Meta transport had time to dispatch. Commit `4ddda52`
  reserves the bounded handoff window for the Meta transport.
- Production verification then passed: one controlled MTD App Store CTA click
  produced exactly one browser-side `InstallIntent`. It contained
  `product=multitier-discounts`, `placement=product_close`,
  `destination=shopify_app_store`, and the expected source, medium, campaign,
  and content UTM fields. No PII field was sent. The redirect still completed
  to the official Shopify App Store listing.
- Meta's automatic-events setup was observed off. Explicit `PageView`,
  `ViewContent`, and `InstallIntent` remain the measurement contract.
- No Instagram account is connected. A payment method is still absent, so the
  account cannot spend.
- The installed PostHog skill is present, but its OAuth-connected app/tools are
  not available in this session. PostHog remains optional and uninstrumented.
- Privacy and Terms remain drafts and continue to block paid activation.
- Meta Ads Manager remained campaign-free on 2026-08-15 and displayed the
  first-ad setup prompt. No paid delivery or external configuration change
  occurred.
- Bing Webmaster Tools and Shoffi were not signed in during the 2026-08-15
  check. Their older values are not carried forward as current observations.

## Immediate focus

1. Diagnose the August 12 Shopify Functions instruction-limit spike in a
   separate task explicitly rooted in the MTD repository.
2. Wait for Google to complete the old-`www` 404 validation and recheck
   indexation after the delayed report refreshes.
3. Obtain owner approval before linking GA4 and Search Console.
4. Complete the fixed ChatGPT/Perplexity citation sample when reproducible
   access is available.
5. For Shoffi, rotate the Partner API token first, approve the permissions and
   affiliate terms, and move any required MTD attribution work to a separate
   MTD-rooted task.
6. Create the Meta custom conversion after `InstallIntent` becomes available
   in Meta's event selector.
7. Wait for the owner to add a payment method directly in Meta and approve the
   Privacy and Terms pages.
8. Do not spend, launch Shoffi, publish a profile, or post externally during
   preparation mode.
