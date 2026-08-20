# Data Sources

| Source | What it controls | Access state on 2026-08-15 | Freshness expectation | Notes |
| --- | --- | --- | --- | --- |
| `PRODUCT.md` and verified app implementation | Product capabilities, plans, availability, claims | Available; product repositories are read-only references | Before any public claim | Never mutate an external app repository |
| MerchantCanvas production site | Delivered content, metadata, discovery files | Public read access verified | Each operational run | HTTP and rendered checks are diagnostic |
| Cloudflare Pages API | Project, domain, deployment, and environment configuration | Connected; GA4 public ID configured on 2026-08-03 | Daily during deploy activity; weekly otherwise | Not the source for installs or marketing attribution |
| Shopify App Store listing | Public plans, copy, reviews, listing state | Public read access verified; four plans live; zero reviews | Daily when acquisition is active; weekly otherwise | Public listing does not expose completed installs; privacy resource still uses the legacy product domain |
| Shopify Partner Dashboard | Installs, uninstalls, subscriptions/revenue where available | Owner-authorized read-only browser access verified; 10 current installs, none listed after 2026-07-17; $145.14 pending payout | Daily collection, weekly decision | Aggregate only; raw current installs include internal/test stores and pending payout is not new-acquisition attribution |
| Google Search Console | Queries, pages, indexing, sitemap, CWV | Domain property verified; 0 clicks, 1 impression; sitemap successful with 11 pages; 404 validation in progress | Weekly | Authoritative for Google search visibility; indexing report is delayed and remains at 1 indexed / 13 non-indexed |
| Bing Webmaster Tools | Bing indexing, crawl, and Microsoft AI citations | Not signed in during the 2026-08-15 check; prior verified access is stale | Weekly/monthly | Secondary search and Microsoft Copilot citation source; do not carry the prior zero baseline forward as current |
| GA4 | Consented sessions and website events | Stream and consent transport verified; latest seven-day view shows 0 users and 0 events; Search Console not linked | Daily after activation | Use the MerchantCanvas property for website traffic; a separate MTD property exists; no PII |
| Google Ads | Spend, clicks, search terms, attributed events | No paid authorization | Daily only during a test | Shopify App Store Ads are excluded; this row is Google Search only |
| Meta Ads Manager / Events Manager | Spend, delivery, creative and attributed events | Accessible; no campaign present on 2026-08-15; first-ad setup prompt shown; no activation authority | Daily only during a test | Pixel remains advertising-consent gated; controlled `InstallIntent` transport is verified |
| Shoffi | Affiliate discovery, referrals, attributed affiliate revenue, and payouts | Login required during the 2026-08-15 check; prior Free/no-integration state is stale | Weekly while preparing; daily during a live pilot | Affiliate channel only, not an investor or exit marketplace. Rotate the Partner API token before any connection; never store it in the repository |
| G2 | Free software profile, product facts, and voluntary verified reviews | Public research completed; no MerchantCanvas profile claimed | Quarterly after a profile exists | Secondary discovery/AEO source; free profile has limited calls to action and analytics |
| Product Hunt | Product-launch awareness and community feedback | Public launch workflow researched; no launch created | One-time launch preparation, then at major releases | Free launch is awareness, not evidence of Shopify merchant intent |
| PostHog | Optional behavior analytics and replay | Skill installed; OAuth app/tools not connected | Deferred | Do not duplicate GA4 or add another tracker without a demonstrated need |
| Meta Ad Library | Public active-ad research | Public and free | During creative research | Shows active ads, not reliable competitor economics |
| Manual AI query sample | Citations, mentions, recommendation framing | Fixed 20-query public web-search proxy rerun completed 2026-08-15; MerchantCanvas 0/20; comparable ChatGPT/Perplexity citation rerun incomplete | T+14, T+30, then monthly | Do not combine public organic presence, AI citations, or referral sessions |

## Access rules

- Authenticated sources should be accessed through owner-authorized browser
  sessions or supported connectors.
- Never save passwords, cookies, tokens, account IDs that are secret, merchant
  identities, or raw exports containing PII in the repository.
- When a source is unavailable, record `unavailable` and the reason. Do not
  silently carry forward an old value as current.
- Every snapshot must include the observation time and source freshness.

## Optional tools

- Semrush can later enrich keyword, competitor, backlink, and AI visibility
  research. It is useful, but it is not required for the zero-cost foundation.
- OpenVC can provide free investor search, deck sharing, engagement analytics,
  and a fundraising CRM. Defer outreach until MerchantCanvas has a clear raise
  objective, a verified traction narrative, and an owner-approved deck.
- Acquire.com, Flippa, Microns, and strategic acquirers are exit channels, not
  customer-acquisition channels. They are premature while MTD is building
  merchant traction and reviews.
- Reditus and PartnerStack overlap with Shoffi but are not zero-cost vendor
  alternatives at current public prices. Revisit only after affiliate revenue
  validates the channel.
- PostHog can add behavior analytics and session replay, but it would duplicate
  parts of GA4 and introduce additional consent/data-governance work. The skill
  is installed but the OAuth app is not connected; defer both connection and
  instrumentation until GA4 limitations become concrete.
- Apollo.io can support a later agency-partner prospecting workflow. Do not add
  it before outreach rules, lawful basis, and anti-spam controls are approved.
- Cloudflare access is useful for deployment and delivery health, not as the
  primary acquisition analytics source.
