# Meta Readiness Playbook

Meta is a candidate because MTD has visible workflows that can be demonstrated
with approved product evidence. It is not yet proven to be cheaper or more
effective than Google for MerchantCanvas.

## Zero-cost preparation

1. Use the public Meta Ad Library to review active category advertising:
   `https://www.facebook.com/ads/library/`.
2. Record patterns by hook, problem, format, proof, CTA, and landing-page angle.
3. Do not infer spend, profitability, targeting, or conversion from the fact
   that an ad is active.
4. Prepare three original MTD concepts from verified screenshots and workflows:
   - Offer → Target → Guardrails → Checkout.
   - Quantity-break setup and shopper clarity.
   - Buy X Get Y or full-set campaign configuration.
5. Confirm each concept uses only claims allowed by `PRODUCT.md`.
6. Prepare UTM values and a unique experiment ID before activation.

## Measurement gate

- Advertising consent must be granted before Meta Pixel loads.
- Meta must receive exactly one PII-free `InstallIntent` event per eligible
  App Store CTA click.
- Completed installs remain a Shopify Partner Dashboard metric.
- Pixel and server events must not be added solely to bypass privacy controls.
- Conversions API is deferred until there is a justified server-side design,
  legal/consent review, and a deduplication contract.

## Paid-test shape after owner authorization

- One campaign, one primary objective, and the smallest practical structure.
- One market or a deliberately combined market set; do not fragment a small
  budget across many ad sets.
- Three materially different creative concepts.
- Use a lifetime budget when a hard experiment total is more important than
  uniform daily delivery.
- Run long enough for a declared learning window; avoid repeated edits.
- Optimize to the deepest reliable event available, while reporting completed
  Shopify installs separately.

Meta currently recommends giving a campaign at least seven days to learn and
notes that daily budgets can fluctuate while lifetime budgets remain capped at
the declared total. The exact future budget will be chosen only after creative,
measurement, market, and stop conditions are ready.

## Stop conditions to define before activation

- Hard lifetime spend cap reached.
- Tracking failure or duplicate events.
- Material product-truth or landing-page mismatch.
- No qualified downstream signal after the predeclared evidence threshold.
- Unacceptable uninstall or support-quality signal.

## Primary official references

- Meta Ad Library: `https://www.facebook.com/help/259468828226154`
- Meta budgets: `https://www.facebook.com/business/ads/pricing`
- Meta Conversions API: `https://www.facebook.com/business/help/AboutConversionsAPI`

