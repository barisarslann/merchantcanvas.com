# Troubleshoot Widgets and Custom Cart Drawers

## V12-S01 - Locate the failure before editing

When an offer looks wrong, separate the campaign rule, storefront presentation and Shopify checkout. Write down the expected product, quantity, price, country, currency and code. Begin with a fresh controlled cart and the exact theme being tested. Check active status, schedule, selected items and thresholds first. A missing widget does not prove that the discount calculation failed, and a visible widget does not prove that the offer qualifies.

## V12-S02 - Keep integration defaults until needed

Open Settings, then Advanced cart integration. We are only inspecting these fields and will not save a change. Grey selector examples are placeholders, not proof they match your theme. Container selectors identify the drawer or cart wrapper; line selectors identify each repeated item. Section IDs use the part after shopify-section. Use stable theme selectors, not generated classes or product names, and change one verified value at a time.

## V12-S03 - Choose refresh behavior carefully

Auto is the normal starting point. Replace sections is for themes where the returned Shopify HTML is safe to swap. Theme events only is for drawers whose own JavaScript handles refresh. Per-theme embed overrides can differ from global settings, so inspect the exact preview. A refresh change is not a cure for a missing product selection, stock restriction, incompatible code or incorrect currency threshold. Keep existing working settings until the failure is reproducible.

## V12-S04 - Repeat the complete cart cycle

After any justified change, test add, remove, add again and remove again, including manual gift removal and an unchanged-cart reload. Check for duplicates, stale totals, loops and quantities changing on the way to checkout. For a report, include time and timezone, campaign, variants, quantities, market, code, expected result and redacted screenshots. Gift diagnostics can help support, but never share cart tokens, addresses or payment information. Our guide provides the checklist; this walkthrough changes no integration setting.
