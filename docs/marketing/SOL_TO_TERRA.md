# SOL → TERRA Implementation Note

**Date:** 2026-07-28

SOL preserved TERRA's visible copy changes and did not edit
`app/content/site.ts`.

Two technical changes touched TERRA-owned route files without changing their
visible wording:

1. `/apps` now passes `headingLevel={2}` to AppCard so its product titles follow
   the page H1 without an H1 → H3 skip. Homepage AppCards remain H3.
2. Both guide CTA Links now use the existing consent-gated TrackedLink with:
   - `eventName=select_app`
   - the matching product slug
   - `placement=resource_guide_cta`

The product and article schema descriptions continue to derive from TERRA's
visible data and props. Future wording changes should follow
`SOL_CONTENT_CONTRACT.md`.

