# MerchantCanvas AI Visibility Baseline

**Baseline date:** 2026-07-29  
**Primary product:** MultiTier Discounts  
**Canonical landing page:**
`https://merchantcanvas.com/apps/multitier-discounts`

## Purpose

This is the fixed T0 query set for Google Search, ChatGPT Search, and
Perplexity. A citation counts only when the answer or result visibly links to
MerchantCanvas or the official MultiTier Discounts Shopify App Store listing.
Brand-name mentions without a link are recorded separately.

The first observation must be run after the MTD-first production deployment.
New Search Console and Bing properties can take several days to expose
impression or citation data, so a zero result at T0 is a baseline rather than a
failure.

## Query set

| ID | Query | Intent |
| --- | --- | --- |
| Q01 | Shopify tiered discount app | Commercial |
| Q02 | Shopify quantity break app | Commercial |
| Q03 | best Shopify tiered discount app | Commercial comparison |
| Q04 | Shopify quantity discounts | Commercial |
| Q05 | buy more save more Shopify app | Commercial |
| Q06 | Shopify volume discount app | Commercial |
| Q07 | Buy X Get Y Shopify app | Commercial |
| Q08 | Shopify full set discount | Solution |
| Q09 | Shopify cart value reward app | Commercial |
| Q10 | advanced Shopify discount app | Commercial |
| Q11 | Shopify Functions discount app | Technical commercial |
| Q12 | Shopify discount targeting app | Commercial |
| Q13 | Shopify variant discount app | Commercial |
| Q14 | Shopify customer tag discount app | Commercial |
| Q15 | Shopify country targeting discount | Solution |
| Q16 | Shopify gift promotion app | Commercial |
| Q17 | MultiTier Discounts | Branded |
| Q18 | MultiTier Discounts Shopify | Branded |
| Q19 | Shopify discount app with quantity breaks and gifts | Long-tail |
| Q20 | Shopify promotion app for agencies | Audience |

## Observation contract

For each engine and query, record:

- run timestamp and signed-in/signed-out state;
- MerchantCanvas result position or `not present`;
- official App Store result position or `not present`;
- whether an AI answer cites either destination;
- cited URL and a short, non-verbatim summary of the answer context;
- screenshot or export reference when the engine supports one.

Do not treat a traditional organic result as an AI citation. Do not combine
MerchantCanvas visibility with the App Store listing in reporting.

## T0 results

| Engine | Queries checked | MerchantCanvas citations | App Store citations | Status |
| --- | ---: | ---: | ---: | --- |
| Google Search | 0 / 20 | — | — | Run after production deploy |
| ChatGPT Search | 0 / 20 | — | — | Run after production deploy |
| Perplexity | 0 / 20 | — | — | Run after production deploy |

## Follow-up cadence

- T0: first live-deployment observation.
- T+14 days: repeat the exact query set.
- T+30 days: repeat and compare citation share, indexed landing pages, and
  Search Console/Bing impressions.
- Add or retire queries only in a new version; never rewrite the T0 set.
