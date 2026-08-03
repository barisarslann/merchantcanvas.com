# Data Sources

| Source | What it controls | Access state on 2026-08-02 | Freshness expectation | Notes |
| --- | --- | --- | --- | --- |
| `PRODUCT.md` and verified app implementation | Product capabilities, plans, availability, claims | Available; product repositories are read-only references | Before any public claim | Never mutate an external app repository |
| MerchantCanvas production site | Delivered content, metadata, discovery files | Public read access verified | Each operational run | HTTP and rendered checks are diagnostic |
| Cloudflare Pages API | Project, domain, deployment, and environment configuration | Connected; GA4 public ID configured on 2026-08-03 | Daily during deploy activity; weekly otherwise | Not the source for installs or marketing attribution |
| Shopify App Store listing | Public plans, copy, reviews, listing state | Public read access verified | Daily when acquisition is active; weekly otherwise | Public listing does not expose completed installs |
| Shopify Partner Dashboard | Installs, uninstalls, subscriptions/revenue where available | Owner-authorized read-only browser access verified | Daily collection, weekly decision | Aggregate only; raw merchant count includes internal/test stores |
| Google Search Console | Queries, pages, indexing, sitemap, CWV | Domain property and successful sitemap verified | Weekly | Authoritative for Google search visibility; indexing report still processing |
| Bing Webmaster Tools | Bing indexing, crawl, and Microsoft AI citations | Site, sitemap, search, and AI Performance verified | Weekly/monthly | Secondary search and Microsoft Copilot citation source |
| GA4 | Consented sessions and website events | Stream created; public ID configured in Cloudflare, collection validation pending deploy | Daily after activation | No PII; consented subset only |
| Google Ads | Spend, clicks, search terms, attributed events | No paid authorization | Daily only during a test | Shopify App Store Ads are excluded; this row is Google Search only |
| Meta Ads Manager / Events Manager | Spend, delivery, creative and attributed events | Business exists but is restricted from ads/audiences; no pixel configured | Daily only during a test | Manual review is an owner-approved action; pixel remains advertising-consent gated |
| PostHog | Optional behavior analytics and replay | Skill installed; OAuth app/tools not connected | Deferred | Do not duplicate GA4 or add another tracker without a demonstrated need |
| Meta Ad Library | Public active-ad research | Public and free | During creative research | Shows active ads, not reliable competitor economics |
| Manual AI query sample | Citations, mentions, recommendation framing | T0 exists; next fixed check due on or after 2026-08-12 | T+14, T+30, then monthly | Do not combine with referral sessions |

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
- PostHog can add behavior analytics and session replay, but it would duplicate
  parts of GA4 and introduce additional consent/data-governance work. The skill
  is installed but the OAuth app is not connected; defer both connection and
  instrumentation until GA4 limitations become concrete.
- Apollo.io can support a later agency-partner prospecting workflow. Do not add
  it before outreach rules, lawful basis, and anti-spam controls are approved.
- Cloudflare access is useful for deployment and delivery health, not as the
  primary acquisition analytics source.
