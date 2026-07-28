# MerchantCanvas SOL Handoff

**Date:** 2026-07-28  
**Branch:** `codex/digital-marketing-sol`  
**Deployment/submission:** Not performed.

## What changed

- Added one absolute URL helper and made root/non-root canonical output exactly
  match the sitemap.
- Rebuilt structured data as linked graphs with stable Organization, WebSite,
  WebPage, SoftwareApplication, Article, FAQPage, BreadcrumbList, author, and
  Offer identities.
- Kept offers limited to verified plan prices and attached the visible
  availability boundary; no public install URL or general availability is
  implied.
- Added a custom, recoverable 404 body while preserving real 404 status,
  `noindex`, and no canonical.
- Corrected the `/apps` heading hierarchy without changing card styling.
- Made post-consent product views measurable and added consent-gated guide CTA
  selection context.
- Added full rendered SEO/AEO regression coverage and wired it into `npm test`.
- Added the audit, content contract, measurement plan, SOL↔TERRA coordination
  note, and this handoff.

## Why it changed

The site already had strong visible content, SSR output, discovery files, and
basic metadata. The missing layer was a testable machine identity contract:
canonical URLs, graph relationships, visible/schema parity, and crawler behavior
needed to agree exactly and remain protected from future regressions.

## Deliberately not implemented

- No deploy, push, PR, search-engine submission, URL inspection request, DNS
  change, or analytics-account change.
- No unverified App Store/install URL.
- No review, rating, customer, testimonial, install count, or performance claim.
- No fake sitemap `lastmod`.
- No `hreflang` for the single-language site.
- No new `/pricing.md`, OKF bundle, or other speculative AI file.
- `llms.txt` was retained as a convenience only; it is not a ranking standard.
- GPTBot remains allowed because the existing training policy is a business
  choice. OAI-SearchBot remains allowed for ChatGPT search discovery.
- Draft Privacy/Terms indexation was not changed without owner/legal direction.
- No visual redesign.

## TERRA expectations

No blocking TERRA rewrite is required. Preserve the contracts in
`SOL_CONTENT_CONTRACT.md`, especially:

- visible FAQ/schema parity;
- pricing + availability + schema updates in one change;
- real separate publication/modification dates after substantive guide updates;
- breadcrumb label/path parity;
- no unsupported public availability or proof.

SOL touched the two guide route files only to add tracking wrappers and touched
the apps route only to select the correct semantic card heading. Visible copy
was not changed by those SOL edits.

## Manual owner/platform actions

1. Decide whether draft Privacy and Terms pages may remain indexable before
   legal approval.
2. Verify the contact email forwarding and final legal entity.
3. When real, provide official install/App Store URLs and re-run the complete
   content/schema contract.
4. Verify the production domain in Google Search Console and Bing Webmaster
   Tools; submit the existing sitemap.
5. Run live URL Inspection, Rich Results Test, and Schema.org validation after
   deployment.
6. Configure analytics IDs only in the approved production environment and run
   the consent/PII/duplicate-event checklist in `SOL_MEASUREMENT_PLAN.md`.
7. Review the explicit GPTBot allow rule as a separate training-policy choice.
8. Collect field Core Web Vitals and query/citation baselines before setting
   growth targets.

## Test results

Latest completed verification before final handoff:

- `npm run typecheck` — passed
- `npm run lint` — passed
- `npm test` — passed, 10 tests
- Vinext production build inside `npm test` — passed, 12 prerendered routes
- `npm run build:pages` — passed, 13 generated static pages including
  `/_not-found`
