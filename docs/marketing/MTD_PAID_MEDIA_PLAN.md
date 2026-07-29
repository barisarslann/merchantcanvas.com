# MultiTier Discounts Paid Media Launch Plan

**Prepared:** 2026-07-29  
**Status:** Drafted and paused — no campaign may spend until every launch gate
below is complete.  
**Markets:** United States, United Kingdom, Canada, Australia  
**Language:** English  
**Landing page:** `https://merchantcanvas.com/apps/multitier-discounts`

## Conversion contract

- Primary web conversion: `install_intent`
- Destination:
  `https://apps.shopify.com/multitier-discounts`
- Required event properties:
  `product=multitier-discounts`, `placement`,
  `destination=shopify_app_store`, and any available `utm_*`, `gclid`, or
  `fbclid`
- Google Ads: dedicated MTD install-intent conversion label
- Meta: `InstallIntent` custom event and a custom conversion scoped to
  `product=multitier-discounts`
- Completed installations: Shopify Partner Dashboard KPI, never inferred from
  the click event

## Google Search structure

Create one Search campaign per market only after enough volume justifies market
separation. For the initial controlled launch, one campaign may use the four
markets with location reporting segmented by country.

### Ad group 1 — tiered discounts and quantity breaks

Starting phrase/exact themes:

- shopify tiered discount app
- quantity breaks shopify
- shopify quantity discount app
- buy more save more shopify
- volume discount app shopify

Verified message options:

- Headline: Tiered Discounts for Shopify
- Headline: Build Quantity-Break Campaigns
- Headline: Install MultiTier Discounts
- Description: Create tiered, quantity-break, and cart-value campaigns with
  precise targeting and Shopify Functions-based checkout logic.
- Description: Review Free, Starter, Pro, and eligible Shopify Plus options,
  then install from the official Shopify App Store.

### Ad group 2 — Buy X Get Y and full-set offers

Starting phrase/exact themes:

- buy x get y shopify app
- shopify full set discount
- shopify mix and match discount app
- shopify cart value reward app

Verified message options:

- Headline: Buy X Get Y for Shopify
- Headline: Plan Full-Set Offers
- Headline: Target Products and Variants
- Description: Configure Buy X Get Y, cart-value, and supported full-set
  campaigns with schedules, limits, and combination controls.
- Description: Help shoppers understand progress before Shopify applies
  qualifying checkout logic.

### Ad group 3 — advanced Shopify discount app

Starting phrase/exact themes:

- advanced shopify discount app
- shopify discount targeting app
- shopify functions discount app
- shopify gift promotion app

Verified message options:

- Headline: Advanced Shopify Discounts
- Headline: Target Promotion Eligibility
- Headline: Shopify Functions Checkout Logic
- Description: Build focused promotion workflows with product, collection,
  variant, tag, quantity, price, cart, customer, or country controls where
  supported.
- Description: Start free or compare paid plans. No revenue-lift or
  performance guarantee is claimed.

### Search controls

- Start with exact and phrase match; review search terms before expanding.
- Initial negatives: jobs, course, tutorial, code example, free download,
  cracked, theme, wholesale quote, B2B quote, draft order.
- Do not bid B2B Quote Approvals terms or send ads to its coming-soon page.
- Do not claim increased AOV, customer counts, ratings, reviews, “best,”
  “official Shopify partner,” or universal theme/checkout compatibility.
- Pin only when required for legal/product accuracy; otherwise allow the ad
  system to test combinations.

## Meta preparation

### Prospecting creative concepts

1. **Offer → Target → Guardrails → Checkout**
   - Four-frame workflow using the verified MTD operating sequence.
   - CTA: Install from Shopify.
2. **One campaign, clear shopper progress**
   - Use the approved campaign-builder and analytics screenshots only.
   - Copy distinguishes storefront guidance from checkout enforcement.
3. **Choose the promotion shape**
   - Quantity breaks, cart-value rewards, Buy X Get Y, and supported gifts.
   - Avoid outcome claims; focus on campaign setup and operational control.

### Audience preparation

- Prospecting: broad ecommerce/Shopify business context by launch market;
  avoid sensitive or inferred personal attributes.
- Retargeting: consented visitors to MTD product and quantity-break guide pages,
  excluding recent `install_intent` users where audience size permits.
- Do not build B2B-retargeting audiences for paid activation while that product
  is coming soon.
- Retargeting stays unavailable until consented traffic volume meets Meta’s
  audience requirements.

## UTM convention

Use lowercase values and keep IDs in the ad platforms:

```text
utm_source=google|meta
utm_medium=cpc|paid_social
utm_campaign=mtd_{market}_{intent}_{yyyy_mm}
utm_content={creative_or_ad_id}
utm_term={keyword}
```

Examples:

- `mtd_us_quantity_breaks_2026_08`
- `mtd_uk_advanced_discounts_2026_08`
- `mtd_au_workflow_prospecting_2026_08`

## Launch gates

All must be green before changing campaign status from paused:

- Privacy and Terms receive final owner/legal approval; draft labels are
  removed only after that approval.
- Production GA4, Google Ads, install conversion label, and Meta Pixel IDs are
  configured.
- No analytics or advertising request occurs before the applicable consent.
- GA4 DebugView, Google Tag Assistant, and Meta Pixel Helper each show one
  PII-free `install_intent` handoff.
- App Store redirects complete in at most 500 ms when measurement is blocked.
- Search Console and Bing verify the live MTD landing page and sitemap.
- Live desktop/mobile light/dark QA passes.
- The MTD Plus path is verified on a second Shopify Plus test store.
- Campaign geo, language, budget, billing, brand-safety, negatives, and paused
  state are reviewed by the owner.

