# MerchantCanvas SOL Technical SEO/AEO Audit

**Audit date:** 2026-07-28  
**Scope:** All public static routes, discovery files, rendered metadata,
structured data, internal links, SSR output, consent-aware measurement, and the
two supported build targets.  
**Environment:** Next.js 16.2.12, React 19.2.6, Vinext 0.0.50, Vite 8.0.13,
static export, Cloudflare-compatible worker output.

## Executive summary

No P0 crawl or indexation blocker was found. All 11 intended public routes
return HTTP 200, render their main content server-side, have one H1, one unique
title, one unique description, one self-canonical URL, complete Open Graph/X
metadata, and valid internal link targets. An unknown route returns HTTP 404,
has `noindex`, has no canonical, and now presents useful recovery links.

The audit found and fixed five P1 weaknesses:

1. The Organization, WebSite, WebPage, product, FAQ, breadcrumb, and Article
   nodes did not have a stable linked identity graph.
2. The homepage canonical omitted the terminal `/` used by the sitemap.
3. `/apps` skipped directly from H1 to product-card H3 headings.
4. Existing tests checked only a subset of the crawl, metadata, link, and schema
   contracts.
5. A product view selected before consent was lost after later consent, and
   guide-to-product CTAs did not carry decision context.

The fixes do not add an install URL, rating, review, customer count, unsupported
compatibility claim, fake sitemap date, `hreflang`, or AI-ranking promise.

## Evidence method

- Built and queried the Vinext production worker rather than reading source
  templates alone.
- Rendered all public routes and inspected status, headers, titles,
  descriptions, canonical tags, H1 and heading order, robots directives, social
  metadata, links, and JSON-LD.
- Compared sitemap URLs with the canonical set and followed all rendered
  internal links.
- Requested a deliberately unknown path and verified the actual response.
- Verified product plan prices, trial periods, and limits against:
  - `F:\Shopify\multi-tier-discounts\app\shopify.server.ts`
  - `F:\Shopify\multi-tier-discounts\app\routes\app.billing.tsx`
  - `F:\Shopify\b2b-quote-approvals\app\lib\billing-plans.ts`
- Verified the two article creation dates against commit
  `c57f5f2ab19ad032e1d2fdb9c2997c8a88dc87af` dated 2026-07-27. The later B2B
  article change on 2026-07-28 only added accessibility semantics to the visible
  status flow, so it did not change the article's reviewed content date.
- Reviewed analytics and advertising script loading from source. No third-party
  script is appended before the stored consent value is `analytics`.

## Rendered route inventory

All descriptions are present and unique; the table keeps only the fields useful
for compact verification.

| Route | Status | Canonical | Rendered title | H1 | Page-specific schema |
| --- | ---: | --- | --- | --- | --- |
| `/` | 200 | `https://merchantcanvas.com/` | Focused Shopify apps for promotions and B2B workflows \| MerchantCanvas | Shopify apps for promotions and B2B sales. | Organization, WebSite |
| `/apps` | 200 | `https://merchantcanvas.com/apps` | Shopify promotion and B2B quote apps \| MerchantCanvas | Shopify apps for tiered promotions and B2B quote approvals. | Organization, WebSite |
| `/apps/multitier-discounts` | 200 | `https://merchantcanvas.com/apps/multitier-discounts` | Shopify tiered discounts and quantity breaks \| MerchantCanvas | Create Shopify tiered discounts and quantity-break campaigns without setup sprawl. | WebPage, SoftwareApplication, FAQPage, BreadcrumbList |
| `/apps/b2b-quote-approvals` | 200 | `https://merchantcanvas.com/apps/b2b-quote-approvals` | Shopify B2B quote approvals and draft orders \| MerchantCanvas | Approve Shopify B2B quotes and turn agreed terms into draft orders. | WebPage, SoftwareApplication, FAQPage, BreadcrumbList |
| `/resources` | 200 | `https://merchantcanvas.com/resources` | Shopify quantity-break and B2B quote workflow guides \| MerchantCanvas | Shopify workflow guides for quantity breaks and B2B quote approvals. | Organization, WebSite |
| `/resources/shopify-quantity-breaks-guide` | 200 | `https://merchantcanvas.com/resources/shopify-quantity-breaks-guide` | Shopify quantity breaks: a practical planning guide \| MerchantCanvas | Shopify quantity breaks: a practical planning guide | WebPage, Article, BreadcrumbList |
| `/resources/shopify-b2b-quote-approval-workflow` | 200 | `https://merchantcanvas.com/resources/shopify-b2b-quote-approval-workflow` | A practical Shopify B2B quote approval workflow \| MerchantCanvas | A practical Shopify B2B quote approval workflow | WebPage, Article, BreadcrumbList |
| `/about` | 200 | `https://merchantcanvas.com/about` | About MerchantCanvas, a Shopify app studio \| MerchantCanvas | MerchantCanvas is a Shopify app studio for defined merchant workflows. | Organization, WebSite |
| `/contact` | 200 | `https://merchantcanvas.com/contact` | Contact MerchantCanvas about a Shopify workflow \| MerchantCanvas | Talk through the Shopify workflow you need to improve. | Organization, WebSite |
| `/privacy` | 200 | `https://merchantcanvas.com/privacy` | Privacy notice draft \| MerchantCanvas | Privacy notice | Organization, WebSite |
| `/terms` | 200 | `https://merchantcanvas.com/terms` | Website terms draft \| MerchantCanvas | Website terms | Organization, WebSite |

## Findings and actions

### P0

No P0 issue remains.

### P1-01 — Entity nodes were disconnected

- **Evidence:** Organization, SoftwareApplication, FAQPage, and Article were
  emitted as separate anonymous objects. Product providers and article
  publishers repeated name/URL values instead of referring to one entity.
- **Affected routes:** All; most visible on both product and both article
  routes.
- **Impact:** Machines could infer duplicate entities and could not reliably
  traverse Organization → WebSite → WebPage → main entity.
- **Action:** Added stable identifiers:
  - `https://merchantcanvas.com/#organization`
  - `https://merchantcanvas.com/#website`
  - route-level `#webpage`, `#softwareapplication`, `#article`, `#faq`, and
    `#breadcrumb` identifiers
- **Validation:** Rendered JSON-LD parses on every route; regression tests assert
  provider, publisher, author, page, and site relationships.
- **Status:** Fixed.

### P1-02 — Offer context did not state availability

- **Evidence:** Offers included real plan names and prices but no availability
  property. Both visible product pages explicitly say no public install URL is
  verified.
- **Affected routes:** Both product routes.
- **Impact:** A price-only offer could be misread as general public
  installability.
- **Action:** Kept only the verified plan prices, used
  `https://schema.org/LimitedAvailability`, pointed each offer to the visible
  `#packages` section rather than an install destination, attached the exact
  visible availability note to the offer description, and linked `offeredBy` to
  MerchantCanvas. No `downloadUrl`, install URL, review, or rating is emitted.
- **Validation:** Tests compare plan names/prices with rendered content and
  assert the availability, offer destination, provider, and forbidden fields.
- **Status:** Fixed.

### P1-03 — Homepage canonical formatting differed from the sitemap

- **Evidence:** Rendered canonical was `https://merchantcanvas.com`; sitemap
  location was `https://merchantcanvas.com/`.
- **Affected route:** `/`.
- **Impact:** The URLs are normally equivalent, but exact agreement is a
  clearer identity contract and avoids fragile downstream comparisons.
- **Action:** Centralized absolute URL creation with the platform URL parser.
- **Validation:** Canonical and sitemap sets are now exactly equal.
- **Status:** Fixed.

### P1-04 — `/apps` skipped H2

- **Evidence:** Rendered outline went from the page H1 directly to two AppCard
  H3 headings.
- **Affected route:** `/apps`.
- **Impact:** Weaker semantic outline for assistive technology and parsers.
- **Action:** Made AppCard's heading level context-aware; `/apps` uses H2 while
  homepage cards remain H3. Styling is preserved with a shared class.
- **Validation:** Automated outline checks reject any increase of more than one
  heading level.
- **Status:** Fixed.

### P1-05 — Unknown-route recovery was generic

- **Evidence:** HTTP status was already 404, but the page had no MerchantCanvas
  recovery content.
- **Affected route:** Any unknown path.
- **Impact:** Poor user recovery; crawl status itself was already correct.
- **Action:** Added a portfolio-consistent 404 body linking to `/apps` and `/`.
  Vinext supplies `noindex`; no canonical is emitted.
- **Validation:** Test asserts 404, `noindex`, no canonical, and both recovery
  links.
- **Status:** Fixed.

### P1-06 — SEO/AEO regression coverage was incomplete

- **Evidence:** Existing tests checked route status and the presence of some
  metadata/schema, but not uniqueness, exact canonical/sitemap agreement,
  unknown-route behavior, heading hierarchy, internal-link validity, graph
  relationships, visible FAQ parity, or offer truthfulness.
- **Affected area:** Test pipeline.
- **Action:** Added `tests/seo-aeo.test.mjs` and included it in `npm test`.
- **Validation:** The suite now covers all acceptance checks listed above.
- **Status:** Fixed.

### P1-07 — Consent-time product views and guide CTA context

- **Evidence:** `ProductView` attempted to record once on mount. A visitor who
  accepted analytics after that mount produced no `view_product` event. Guide
  CTAs were ordinary Links, so product interest originating from a guide lacked
  a `select_app` event.
- **Affected routes:** Both product pages and both guides.
- **Action:** ProductView retries only when the existing consent event fires;
  `trackEvent` still blocks collection unless consent is `analytics`. Both guide
  CTAs now record `select_app` with `product` and
  `placement=resource_guide_cta`.
- **Validation:** Typecheck/lint/render tests pass. A production analytics
  DebugView check remains a manual platform step because no account IDs or
  account access are available.
- **Status:** Fixed in code; live-platform verification pending.

## Structured-data decisions

- **Organization and WebSite:** One stable global identity on every rendered
  page.
- **WebPage:** Added only where it connects a product or article graph.
- **SoftwareApplication:** Uses the canonical product URL and MerchantCanvas as
  provider. `operatingSystem: Shopify` describes platform context; it does not
  imply Shopify ownership.
- **Offer:** Represents visible plan data only. Limited availability and the
  visible availability sentence prevent a general-install interpretation.
- **FAQPage:** Kept because the full questions and answers are visible and
  exactly tested. It is not presented as a Google rich-result growth tactic.
- **Article:** Uses the visible product-team attribution, stable publisher and
  author relationships, the canonical WebPage, and the documented 2026-07-27
  creation/review date.
- **BreadcrumbList:** Product labels match `Apps / product name`; article labels
  match `Resources / visible category`. Every URL is canonical and public.
- **Review/AggregateRating:** Deliberately absent.

## Crawl and discovery decisions

- `robots.txt` permits ordinary crawlers and explicitly permits Googlebot,
  Bingbot, OAI-SearchBot, and GPTBot.
- OAI-SearchBot is the OpenAI search-discovery control. GPTBot is a separate
  model-training policy choice. The existing allow policy was not changed
  without a business decision.
- Sitemap contains exactly the 11 canonical public routes and no install URL.
- No `lastmod` was added because no durable per-route modification source is
  generated for the static sitemap.
- No `hreflang` was added because the site has one English version.
- `llms.txt` remains a convenience summary. Google explicitly states that it
  neither helps nor harms Google Search visibility.

## Render and performance review

- Main content is present in the server-rendered HTML on every route.
- Product images carry intrinsic width/height. Current source sizes are about
  110 KB and 82 KB; layout-shift risk from those images is controlled.
- The local variable font is about 176 KB and uses `font-display: swap`.
- The largest built client assets observed were the React framework chunk
  (~190 KB uncompressed), the application entry (~83 KB), and combined CSS
  (~56 KB). These are build artifacts, not field-performance measurements.
- Third-party analytics/advertising scripts are appended only after explicit
  analytics consent.
- Header/menu controls are semantic, keyboard reachable, labelled, and covered
  by reduced-motion styles.
- No CrUX, RUM, Search Console Core Web Vitals, or production PageSpeed field
  data was available. No user-performance claim is made.

## Open P2 decisions

### P2-01 — Draft legal pages are indexable

`/privacy` and `/terms` are public, canonical, and in the sitemap, but visibly
labelled as drafts requiring owner/legal review. Removing them from search
before review is a business/legal publication decision, not an automatic SEO
change. The owner must either approve the content or explicitly authorize
temporary `noindex` and sitemap removal.

### P2-02 — 404 title parity differs by renderer

Vinext 0.0.50 uses the root default title on the custom not-found response while
correctly returning 404, adding `noindex`, omitting a canonical, and rendering
the custom H1/recovery content. This is not an indexation blocker. Re-test after
a Vinext upgrade; avoid adding a second literal `<title>` because it creates
duplicate title elements.

### P2-03 — Live rich-result and crawler validation requires deployment

Local JSON parsing cannot replace a public URL test in Google Rich Results,
Schema.org Validator, Search Console URL Inspection, or production crawler
logs. Those checks are listed in the measurement plan.

## Primary references

Accessed 2026-07-28:

- [Google: generative AI features and SEO](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [OpenAI crawler controls](https://developers.openai.com/api/docs/bots)
- [Bing robots.txt guidance](https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec)
- [Bing sitemap guidance](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)
- [Schema.org Offer](https://schema.org/Offer)
- [Schema.org Article](https://schema.org/Article)
- [Shopify app billing](https://shopify.dev/docs/apps/launch/billing)
- [Shopify draftOrderCreate](https://shopify.dev/docs/api/admin-graphql/latest/mutations/draftordercreate)

