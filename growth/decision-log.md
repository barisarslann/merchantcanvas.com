# Growth Decision Log

This log is append-only. New decisions go at the bottom. Superseded decisions
remain visible and point to the decision that replaced them.

## D-001 — Exclude Shopify App Store Ads

- **Date:** 2026-08-02
- **Decision:** Do not include Shopify App Store Ads in the acquisition plan.
- **Evidence:** Owner's prior real-world test produced unacceptable click
  economics for the current budget.
- **Revisit:** Only through an explicit owner instruction supported by new
  economics or a materially different product stage.

## D-002 — Begin with zero-cost observation

- **Date:** 2026-08-02
- **Decision:** Build persistent measurement and experiment memory before any
  paid activation.
- **Reason:** Current installation, retention, plan activation, and channel
  baselines are incomplete. Spending before source quality is known would make
  optimization unreliable.
- **Exit condition:** Owner authorization plus the paid-readiness gates in the
  active channel playbook.

## D-003 — Prepare Meta first without declaring it the winner

- **Date:** 2026-08-02
- **Decision:** Treat Meta as the first paid candidate for creative and audience
  preparation. Retain a small, high-intent Google Search test as a secondary
  candidate.
- **Reason:** MTD has visual workflows suitable for demonstration, but there is
  not yet MerchantCanvas conversion evidence proving Meta economics.
- **Revisit:** After no-cost creative research and measurement validation.

## D-004 — Test Shoffi as the first affiliate channel

- **Date:** 2026-08-09
- **Decision:** Prepare a bounded Shoffi affiliate pilot for MultiTier
  Discounts under the zero-cost phase. Do not activate it until token rotation,
  permission review, attribution verification, affiliate terms, and owner
  approval are complete.
- **Reason:** Shoffi directly serves Shopify app agencies, creators, and
  affiliates and has no platform charge until the Free-plan affiliate-revenue
  threshold. This is a closer fit than general SaaS affiliate networks at the
  current budget.
- **Boundary:** Shoffi is an acquisition channel, not an investor or exit
  marketplace. Any required MTD code change belongs to a separate task rooted
  in the MTD repository.
- **Revisit:** After 30 live days or earlier if security, attribution, review,
  or affiliate-quality guardrails fail.
