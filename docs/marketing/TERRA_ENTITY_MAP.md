# MerchantCanvas Entity Map

**Last reviewed:** 2026-07-29
**Canonical evidence:** PRODUCT.md, app/content/site.ts, verified product repositories, and the Shopify documentation linked in TERRA_SEARCH_RESEARCH.md.

| Entity | Canonical site explanation | Primary route | Supporting evidence | Do not claim | Relationship |
| --- | --- | --- | --- | --- | --- |
| MerchantCanvas | A product company and Shopify app studio building focused apps for practical promotion and B2B sales workflows. | / | PRODUCT.md; app/content/site.ts; About page | Shopify itself, an official Shopify partner, an agency, a broad suite, customer scale, ratings, or guaranteed growth. | Portfolio owner of MultiTier Discounts and B2B Quote Approvals. |
| MultiTier Discounts | A live Shopify embedded app for tiered, quantity-break, cart-value, Buy X Get Y, and gift promotions with Shopify Functions-based checkout logic. | /apps/multitier-discounts | app/content/site.ts; F:\Shopify\multi-tier-discounts; https://apps.shopify.com/multitier-discounts | Every-theme compatibility, universal Shopify-plan compatibility, revenue uplift, ratings/reviews, or treating install intent as a completed install. Plus is conditional on verified Shopify Plus eligibility. | The primary live promotion-workflow app; related to Shopify Functions, discount campaigns, quantity breaks, and the quantity-break guide. |
| B2B Quote Approvals | A Shopify Admin app for creating, reviewing, approving, sharing, and converting wholesale quotes into Shopify draft orders. | /apps/b2b-quote-approvals | app/content/site.ts; F:\Shopify\b2b-quote-approvals | Generic RFQ positioning, hide-price product, full ERP/CRM/wholesale suite, payment processor, public install availability, final Plus compatibility, or fabricated screenshots. | The quote-approval app; related to wholesale quotes, approval workflows, buyer decisions, and Shopify draft orders. |
| Shopify | The commerce platform that remains the authority for checkout, draft-order invoices, payment links, and order completion. | /about, then product pages | PRODUCT.md; Shopify Help documentation | That MerchantCanvas replaces Shopify, owns checkout/payment, or is a Shopify-owned product. | Platform context for both apps. |
| Shopify Functions | Shopify's configurable backend logic. In MultiTier, it is the checkout-logic foundation for supported qualifying discounts. | /apps/multitier-discounts; quantity-break guide | MultiTier repository; Shopify Discount Function documentation | That Functions remove the need for theme communication, work identically on every surface, or prove eligibility in a draft-order workflow. | Supports discount-campaign enforcement; distinct from widgets that explain progress. |
| Discount campaign | A configured promotion with a defined offer, eligible cart conditions, guardrails, and shopper communication. | /apps/multitier-discounts | MultiTier repository; quantity-break guide | Guaranteed conversion, AOV, margin, or revenue impact. | May use quantity breaks, Buy X Get Y, cart-value rewards, or gifts. |
| Quantity break | A tiered promotion that rewards a shopper for more eligible units or a defined cart threshold. | /resources/shopify-quantity-breaks-guide | Resource guide; Shopify Function documentation | That every quantity break is a fixed-price table, that native Shopify alone meets every use case, or that an app is always required. | A discount-campaign shape; MultiTier is one possible implementation path. |
| Buy X Get Y | A campaign shape in which a defined qualifying purchase unlocks a defined discount or item outcome. | /apps/multitier-discounts | MultiTier implementation and billing gates | That it is available on every MultiTier plan or combines with every other discount. | One promotion shape alongside tiered, quantity, cart-value, and gift campaigns. |
| Cart-value reward | A promotion triggered by an eligible cart amount rather than only product quantity. | /apps/multitier-discounts; quantity-break guide | MultiTier implementation and guide | That thresholds are globally currency-safe without configuration, or that shipping/returns are included without a stated policy. | A discount-campaign shape; may be explained with cart-progress messaging. |
| Wholesale quote | A record of proposed commercial terms for a buyer, company, products, prices, PO details, expiry, and revisions. | /apps/b2b-quote-approvals; B2B guide | B2B repository; resource guide | A legally binding contract, invoice, payment, or a complete customer portal by default. | Moves through an approval workflow and can hand off to a Shopify draft order after agreement. |
| Approval workflow | The explicit states, thresholds, decision rights, and recorded history used to evaluate a quote. | /resources/shopify-b2b-quote-approval-workflow; product page | B2B repository; resource guide | Access control unless identity is enforced, automated commercial approval policy, or multi-step approvals on every plan. | Governs a wholesale quote before its draft-order handoff. |
| Shopify draft order | Shopify's commerce object for agreed terms, invoices, payment links, and order completion. | /resources/shopify-b2b-quote-approval-workflow | Shopify Help documentation; B2B repository | The same thing as the quote record, a complete approval system, or a payment service operated by MerchantCanvas. | Receives agreed quote terms from B2B Quote Approvals; Shopify remains authoritative for the commerce handoff. |

## Canonical naming rules

- Capitalize product names exactly: **MerchantCanvas**, **MultiTier Discounts**, and **B2B Quote Approvals**.
- Use **Shopify Functions** as a platform term, never as a vague synonym for every app feature.
- Prefer **quantity break** for a campaign shape and **tiered promotion** for the wider family of campaigns. Explain the intended eligibility rule before using either term.
- Prefer **wholesale quote approval workflow** when referring to the B2B process. Do not collapse it into generic "request a quote" language.
- Say **Shopify draft order** on first mention in each substantial section, then use **draft order** when the referent remains clear.

## Relationship map

    MerchantCanvas
    ├── MultiTier Discounts
    │   └── Discount campaign
    │       ├── Quantity break
    │       ├── Buy X Get Y
    │       ├── Cart-value reward
    │       └── Shopify Functions checkout logic
    └── B2B Quote Approvals
        └── Wholesale quote
            └── Approval workflow
                └── Shopify draft order

Shopify is the platform context for both paths; it remains central for checkout and the final draft-order commerce handoff.
