# EXP-003 — Shoffi affiliate pilot

**Status:** proposed  
**Owner:** MerchantCanvas + Growth Agent  
**Created:** 2026-08-09  
**Observation window:** 30 days after owner-approved activation  
**Spend authorization:** no platform spend; revenue-share liability only after
eligible attributed revenue  
**Related decision:** D-004

## Hypothesis

A small, manually approved group of Shopify-focused agencies, creators, and
affiliates can produce at least one non-test completed MTD install without
upfront platform spend or incentivized review activity.

## Audience and problem

Shopify agencies, implementation partners, and educational creators whose
merchant audiences need tiered discounts, quantity breaks, Buy X Get Y,
cart-value rewards, or supported gift promotions.

## Single primary change

Publish one MultiTier Discounts affiliate program in Shoffi with a fixed,
owner-approved offer and manual affiliate approval. MerchantCanvas remains the
brand and education hub; the official Shopify App Store listing remains the
installation destination.

## Primary metric

**Attributed completed install:** a non-test completed Shopify install that is
attributed to an approved Shoffi affiliate and reconciled against the Shopify
Partner Dashboard. Shoffi clicks, referrals, and `install_intent` remain
diagnostics rather than completed installs.

## Diagnostics and guardrails

- Diagnostic: approved affiliates, activated affiliates, tracked referrals,
  attributed revenue, `install_intent`, and completed installs.
- Guardrail: proposed offer is 30% of eligible net recurring revenue for 12
  months, $0 CPI, manual affiliate approval, and $50 minimum withdrawal.
- Guardrail: no fake, purchased, gated, or incentivized Shopify App Store
  reviews and no request to review before the merchant receives value.
- Guardrail: no affiliate self-referrals, misleading claims, trademark abuse,
  spam, or unapproved paid search on MerchantCanvas/MTD brand terms.
- Guardrail: no credential or merchant-level data is stored in this repository.
- Stop condition: security concern, unverifiable attribution, policy breach,
  low-quality or automated promotion, unexpected fee, or owner withdrawal.

## Baseline

- Shoffi Free account is active with zero apps integrated on 2026-08-09.
- Shoffi's public pricing states that the platform is free until $100/month in
  affiliate-generated revenue and charges 0% commission on affiliate payouts.
- The signed-in dashboard displayed a security notice recommending Partner API
  token rotation. No token was used or submitted in this task.
- Shopify Partner Dashboard shows 2 installs, 0 uninstalls, and 2 cumulative
  net installs in the last 30 days, with no public rating. These totals include
  known internal/test activity and are not a clean customer baseline.

## Pre-activation checklist

1. Owner rotates the Shopify Partner API token and revokes the old token.
2. Owner approves the requested permissions and final affiliate terms.
3. Attribution path is verified in an MTD-rooted task if app work is required.
4. Affiliate-facing copy, assets, App Store URL, and terms receive final owner
   review.
5. Only relevant affiliates are approved manually.

## Execution log

- 2026-08-09 — Read-only account and market review completed. Free plan is
  active and no app is integrated. Comparable Shopify discount-app programs
  commonly use recurring revenue share; no external account mutation occurred.
- 2026-08-09 — Proposed terms and security/measurement gates recorded in the
  no-cost playbook and approval queue.

## Result

Pending activation and the declared 30-day observation window.

## Decision

Prepare only. Do not publish or invite affiliates until every pre-activation
gate is complete and the owner approves the final preview.

## Reusable learning

Pending.
