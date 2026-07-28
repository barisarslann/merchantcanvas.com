# TERRA Handoff

**Completed:** 2026-07-28  
**Scope:** Search-landscape research, entity and route strategy, safe visible-copy and page-level metadata updates, internal-link clarity, first-wave backlog, and technical handoff. No deployment, push, pull request, external platform mutation, robots, sitemap, schema-component, metadata-helper, or test-pipeline change was made by TERRA.

## Route ownership

| Route | Dominant intent |
| --- | --- |
| / | Identify MerchantCanvas and select a promotion or B2B quote workflow. |
| /apps | Compare the two MerchantCanvas apps. |
| /apps/multitier-discounts | Evaluate a focused Shopify tiered-promotion and quantity-break app. |
| /apps/b2b-quote-approvals | Evaluate a Shopify B2B quote approval desk and draft-order handoff. |
| /resources | Find the planning guide that matches the workflow. |
| /resources/shopify-quantity-breaks-guide | Plan a Shopify quantity-break campaign. |
| /resources/shopify-b2b-quote-approval-workflow | Design a Shopify B2B quote approval workflow. |
| /about | Verify MerchantCanvas's entity, scope, and operating principles. |
| /contact | Begin an availability, pilot, agency, or workflow fit conversation. |

Full implementation detail is in TERRA_PAGE_MAP.md.

## Implemented visible-content changes

- MultiTier Discounts now starts with a direct definition that names tiered, quantity-break, cart-value, Buy X Get Y, and gift promotion scope plus Shopify Functions-based checkout logic.
- B2B Quote Approvals now starts with a direct definition that names the Shopify Admin quote-approval desk and Shopify draft-order outcome.
- Product-page sections now name plans, pricing, and availability explicitly. The related-guide CTA uses descriptive, task-based anchor text.
- App cards, homepage resource cards, and resources-hub cards use descriptive anchors rather than generic "Read the guide" or abbreviated product labels.
- /apps, /resources, /about, and /contact now identify the page's entity or workflow more directly in the H1 and page metadata.
- Both resource guides now open with a concise definition before their detailed planning guidance.

These edits preserve the current component structure and do not alter the visual system.

## Primary sources used

- Verified MultiTier implementation: F:\Shopify\multi-tier-discounts
- Verified B2B Quote Approvals implementation: F:\Shopify\b2b-quote-approvals
- Shopify's Discount Function documentation
- Shopify's B2B and draft-order documentation
- Google Search Central guidance for generative AI features, titles, snippets, and FAQ rich-result limits

Direct links and research notes are in TERRA_SEARCH_RESEARCH.md.

## Claims that must remain unverified or omitted

- A public Shopify App Store/install URL for either MerchantCanvas app.
- B2B Quote Approvals production availability and final Shopify review status.
- Shopify Plus compatibility for B2B Quote Approvals.
- Customer logos, testimonials, ratings, install counts, revenue or AOV outcomes, and universal compatibility claims.
- Any assertion that MultiTier Discounts or Shopify Functions works identically on every theme, cart, checkout, plan, or draft-order surface.
- Contact email forwarding until owner confirmation.

## SOL follow-up

TERRA_TO_SOL.md contains the requested technical validation:

1. Reconcile SoftwareApplication offer data and visible availability language.
2. Verify publication versus review dates on articles.
3. Keep visible FAQ content authoritative over FAQ schema or rich-result expectations.
4. Evaluate breadcrumb data only if it matches visible routes.
5. Validate sitemap, robots, canonical, Open Graph, llms.txt, and consent-gated analytics after technical changes.

## Next content wave

Prioritize the B2B draft-order handoff guide, tiered-discount versus quantity-break decision guide, and RFQ versus internal-approval comparison only after the listed evidence checks. The full eight-item, non-volume-scored backlog is in TERRA_CONTENT_BACKLOG.md.

## Verification

| Command | Result |
| --- | --- |
| npm run typecheck | Passed |
| npm run lint | Passed |
| npm test | Passed: 5 of 5 tests; includes a successful vinext static build of 12 routes |
| npm run build:pages | Passed: Next.js generated 13 static pages |

An initial npm test run exposed an outdated homepage-title expectation after a proposed metadata change. The homepage title was restored rather than editing SOL-owned regression tests; the final test run passed.
