# MerchantCanvas SOL Handoff

**Updated:** 2026-07-29
**Branch:** `main`
**Primary product:** MultiTier Discounts
**External activation:** Blocked until legal approval and measurement IDs/QA
are complete.

## Implemented

- Made the verified MTD App Store URL the source-controlled install
  destination.
- Added live/coming-soon product status and card/conditional plan presentation
  to the shared product model.
- Preserved Free, Starter, and Pro as the three standard cards and added the
  $24.99/month or $249.90/year Plus plan as a separate eligibility band.
- Marked standard MTD schema offers `InStock`, the Shopify Plus-only offer
  `LimitedAvailability`, and all coming-soon B2B offers
  `LimitedAvailability`.
- Added the official MTD `downloadUrl` to `SoftwareApplication`.
- Updated visible FAQs, discovery copy, `llms.txt`, and crawler policy to the
  same product truth.
- Added consent v2 with Essential only, Analytics only, and Analytics +
  advertising. Legacy analytics consent migrates without advertising.
- Removed GTM from the first-release implementation. GA4 is analytics-gated;
  Google Ads and Meta are advertising-gated.
- Added one PII-free `install_intent` contract with attribution, a dedicated
  Google Ads conversion label, Meta `InstallIntent`, and a 500 ms fail-open
  App Store handoff.
- Added regression coverage for product status, install destinations, Plus
  pricing/schema parity, crawler policy, and consent migration.

## Product-side dependency

The MTD repository no longer uses a per-shop checkout-mystery release allowlist.
The global production release flag, fresh managed Plus subscription, fresh
Shopify Plus capability, optional scopes, and campaign opt-in remain independent
gates. A second verified Shopify Plus test store is still required for the
pre-release plan-selection and optional-scope acceptance check.

## Deliberately not claimed

- `install_intent` is not a completed installation.
- No rating, review count, merchant count, AOV/revenue lift, “best app,” or
  universal compatibility claim was added.
- B2B Quote Approvals is not advertised or linked to an install destination.
- Privacy and Terms remain drafts pending owner/legal approval.
- `llms.txt` and `Content-Signal` are discovery/control aids, not ranking
  guarantees.

## Platform work

- Submit the verified sitemap and inspect `/`, MTD, B2B, and both guides in
  Google Search Console and Bing Webmaster Tools.
- Disable Cloudflare’s Managed `robots.txt` prepend so the origin policy is the
  only delivered policy.
- Configure GA4, Google Ads, the dedicated MTD install conversion label, and
  Meta Pixel only after account IDs are available.
- Keep all paid campaigns paused until every gate in
  `MTD_PAID_MEDIA_PLAN.md` passes.

## Verification contract

Run with Node 22:

```powershell
npm run typecheck
npm run lint
npm test
npm run build:pages
```

Also validate consent/network behaviour in a real browser and verify the live
Cloudflare deployment after the final commit reaches `main`.
