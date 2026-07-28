# MerchantCanvas Organic and AI Discovery Measurement Plan

**Created:** 2026-07-28  
**Boundary:** This is an implementation and manual-platform checklist. No Search
Console, Bing, analytics, advertising, DNS, or submission action was performed.

## Measurement principles

- Measure decisions and qualified discovery, not ranking promises.
- Keep branded, non-branded product, and guide intent separate.
- Treat AI referrals as a directional channel: referrer data can be missing or
  reduced by apps, browsers, and privacy controls.
- Do not send names, email addresses, store URLs, free-text workflow
  descriptions, or other PII to analytics.
- Keep every analytics and advertising script behind the existing explicit
  consent choice.
- Use field data for user-performance claims. Lab results are diagnostic only.

## Google Search Console setup

Manual owner/admin actions:

1. Create or confirm a Domain property for `merchantcanvas.com` using DNS.
2. Confirm the production HTTPS host redirects consistently to the canonical
   non-`www` host.
3. Submit `https://merchantcanvas.com/sitemap.xml`.
4. Inspect these representative URLs:
   - `/`
   - `/apps/multitier-discounts`
   - `/apps/b2b-quote-approvals`
   - both resource guides
5. For each inspected URL verify:
   - fetch succeeds;
   - indexing is allowed;
   - user-declared and Google-selected canonical agree;
   - rendered main content is present;
   - no structured-data parsing error is reported.
6. Review Page Indexing and Crawl Stats after Google has had time to crawl.
7. Review Core Web Vitals when field data becomes available.
8. Use the current Generative AI performance report, when available for the
   property, alongside ordinary Search performance. Google says AI Search still
   depends on core Search systems; do not treat the report as a separate ranking
   system.

Do not bulk-request indexing as a substitute for crawlable internal links and a
correct sitemap.

## Bing Webmaster Tools setup

Manual owner/admin actions:

1. Add and verify `merchantcanvas.com`, or import the verified property from
   Google Search Console.
2. Submit `https://merchantcanvas.com/sitemap.xml`.
3. Run URL Inspection for the homepage, both product pages, and both guides.
4. Run Site Scan and review:
   - 4xx/5xx internal targets;
   - robots blocks;
   - duplicate titles/descriptions;
   - canonical conflicts.
5. Review Site Explorer monthly for discovered URLs outside the 11-route public
   set.

## Search query groups

Apply query groups in reporting; do not infer volume where none is available.

| Group | Include examples | Primary landing routes |
| --- | --- | --- |
| Brand | merchantcanvas, merchant canvas, multitier discounts, b2b quote approvals | `/`, product pages |
| Promotion product | shopify tiered discount app, shopify quantity break app, buy more save more shopify app | MultiTier product |
| Promotion guide | shopify quantity breaks, plan quantity breaks, quantity break margin, functions discount tiers | Quantity-break guide |
| B2B product | shopify quote approval app, wholesale quote approval shopify, quote to draft order app | B2B product |
| B2B guide | shopify b2b quote workflow, wholesale approval workflow, draft order approval process | B2B guide |
| Navigational/support | merchantcanvas contact, merchantcanvas pricing, product availability | Contact/product pages |

Exclude irrelevant generic RFQ/hide-price intent from the B2B product success
set unless future product evidence changes its scope.

## Landing-page groups

| Group | Routes | Decision measured |
| --- | --- | --- |
| Portfolio | `/`, `/apps`, `/about` | Can visitors identify the right workflow? |
| Promotion product | `/apps/multitier-discounts` | Does verified product detail create availability intent? |
| B2B product | `/apps/b2b-quote-approvals` | Does the beta scope create qualified launch/pilot intent? |
| Promotion education | quantity-break guide | Does neutral planning create product evaluation? |
| B2B education | quote-approval guide | Does workflow planning create product evaluation? |
| Conversion | `/contact` | Which route/topic prepares an email? |
| Legal | `/privacy`, `/terms` | Coverage only; not a growth KPI |

## Consent-aware event plan

Existing implementation:

| Event | Trigger | Required properties | Decision |
| --- | --- | --- | --- |
| `view_product` | Product page view after prior or newly granted analytics consent | `product` | Product evaluation volume |
| `select_app` | Product selection link | `product`, `placement` | Which surface sends product interest |
| `contact_intent` | Contact/availability CTA | `product` when known, `placement` | Which page creates conversation intent |
| `lead_submit` | Static mailto handoff prepared | `topic` only | Which topic reaches the handoff |

Implemented placement values include `product_hero`, `product_close`,
`home_hero_selector`, `workflow_decision`, `app_card`, and
`resource_guide_cta`.

Validation checklist in a consented test session:

1. With no consent stored, confirm no GTM, gtag, Google Ads, or Meta script
   request occurs.
2. Choose Essential only and confirm no measurement event is sent.
3. Choose Analytics on a product page and confirm one `view_product` event with
   the correct product.
4. Click each guide CTA and confirm `select_app` includes product and
   `resource_guide_cta`.
5. Prepare a contact email and confirm `lead_submit` includes only `topic`.
6. Confirm no duplicate GA4 events when GTM and direct GA4 IDs are both
   configured. Prefer one ownership path if duplicates appear.
7. Confirm no PII is present in GA4 DebugView, GTM Preview, Ads diagnostics, or
   Meta Pixel Helper.

## AI referral classification

Create a reporting-only channel group from `page_referrer` / session source.
Start with these host patterns and review monthly:

- `chatgpt.com`, `chat.openai.com`
- `perplexity.ai`
- `copilot.microsoft.com`, `bing.com` when an AI-specific path or campaign is
  observable
- `gemini.google.com`
- other clearly identified assistant/search hosts discovered in real traffic

Keep three measures separate:

1. **AI referred sessions:** sessions with a recognized referring host.
2. **AI assisted intent:** AI referred sessions with `select_app` or
   `contact_intent`.
3. **AI handoff:** AI referred sessions with `lead_submit`.

Do not equate a missing referrer with no AI influence, and do not combine manual
prompt-monitoring citation counts with web sessions.

## KPI definitions

### Weekly operational review

| KPI | Definition | Guardrail |
| --- | --- | --- |
| Indexable route coverage | Intended routes indexed / 11 intended routes | Investigate canonical/exclusion reason, not just count |
| Sitemap health | Submitted sitemap processed without URL errors | Sitemap inclusion does not guarantee indexing |
| Organic product sessions | Search sessions landing on either product route | Segment brand vs non-brand |
| Organic guide sessions | Search sessions landing on either guide | Segment by guide |
| Product selection rate | Sessions with `select_app` / eligible landing sessions | Consent means measured sessions are a subset |
| Contact-intent rate | Sessions with `contact_intent` / eligible product or portfolio sessions | Do not treat click as lead |
| Email-handoff rate | Sessions with `lead_submit` / contact sessions | Mail client opening is not confirmed delivery |
| AI referred sessions | Sessions from recognized AI referrers | Directional; referrer loss applies |

### Monthly strategic review

- Branded vs non-branded clicks, impressions, CTR, and average position.
- Product vs guide landing-page growth and query overlap.
- Google-selected canonical mismatches.
- Indexed route changes and crawl errors.
- Core Web Vitals field status by route template.
- AI Search report visibility where the current GSC property exposes it.
- Manual 20-query prompt sample across ChatGPT search, Google AI features, and
  Perplexity, recording citation URL and framing without claiming exhaustive
  coverage.
- Qualified topic mix from `lead_submit`.

## Targets

Do not set numerical growth targets until at least 4–8 weeks of clean
production data exists. The first target is data quality:

- no duplicate events;
- no PII;
- canonical agreement;
- all intended routes discoverable;
- stable channel grouping;
- documented consent rate so event denominators are interpreted correctly.

After the baseline window, set targets using observed medians and business
capacity rather than generic SEO benchmarks.

## Primary references

- [Google generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search Console URL Inspection](https://support.google.com/webmasters/answer/9012289)
- [Google Generative AI performance report](https://support.google.com/webmasters/answer/16984139)
- [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Bing Webmaster Tools help](https://www.bing.com/webmasters/help)
- [Bing sitemap guidance](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [OpenAI crawler controls](https://developers.openai.com/api/docs/bots)

