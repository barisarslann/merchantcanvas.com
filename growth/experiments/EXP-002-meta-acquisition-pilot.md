# EXP-002 — Meta acquisition pilot

**Prepared:** 2026-08-04
**Status:** Preparation authorized; activation locked
**Product:** MultiTier Discounts
**Platform:** Meta only
**Duration:** Seven days after owner approval
**Lifetime spend ceiling:** 1,600 TRY

## Decision question

Can a compact Meta prospecting test create qualified MerchantCanvas landing
visits and measurable Shopify App Store handoffs without weakening product
truth, privacy controls, or budget safety?

## Structure

- One Traffic campaign optimized for Landing Page Views.
- One deliberately combined English-language prospecting ad set for the United
  States, United Kingdom, Canada, and Australia.
- The ad account is proposed in USD with an `Etc/UTC` reporting timezone. At
  activation, convert the 1,600 TRY hard ceiling using the live exchange rate
  and round the USD lifetime budget down.
- This is a globally positioned English-language launch cohort, not a Turkey
  campaign. Avoid worldwide targeting during the micro-budget pilot because it
  would fragment evidence and may push delivery toward cheap rather than
  commercially useful inventory.
- Two original creatives using only approved MTD screenshots and verified
  product language.
- Destination:
  `https://merchantcanvas.com/apps/multitier-discounts` with unique Meta UTMs.
- Google Ads and Shopify App Store Ads remain disabled.

## Measurement contract

Report each layer separately:

1. Meta delivery, spend, link clicks, and landing-page views.
2. GA4 consented MTD sessions and `install_intent` events.
3. Meta Pixel `InstallIntent` events after advertising consent.
4. Shopify completed installs, uninstalls, and paid plan activations.

An `install_intent` is an App Store handoff, not a completed installation.

## Safety and stop conditions

- The campaign, ad set, and ads remain paused until the owner approves the
  final preview.
- Lifetime spend may never exceed 1,600 TRY.
- Stop immediately for tracking duplication, consent leakage, destination or
  claim mismatch, or unsafe billing state.
- Diagnose at 800 TRY if there is no verified `install_intent`; do not continue
  by default merely because budget remains.
- Never request or reward a positive review and never invent adoption,
  performance, revenue, rating, or compatibility claims.

## Decision rule

At the end of the declared window, issue one source-backed decision:
`scale`, `revise`, or `stop`. Small numbers remain directional; completed
Shopify installs and paid activations carry more weight than platform clicks.
