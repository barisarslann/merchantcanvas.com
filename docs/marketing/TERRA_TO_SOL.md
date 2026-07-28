# TERRA → SOL Technical Requests

**Created:** 2026-07-28  
**Ownership:** TERRA has not changed app/lib/metadata.ts, structured-data components, robots.txt, sitemap.xml, or the technical test pipeline.

## P0 — visible-content / structured-data contract

1. **Verify the SoftwareApplication offer graph against visible availability.**
   - Product pages visibly list current plan structures and say that neither public install path is verified.
   - The schema graph should never make B2B Quote Approvals appear publicly installable or generally available before production and final Shopify review testing are complete.
   - Confirm every offer price, currency, plan, description, and availability value is defensible from the visible page. Add only properties whose meaning is unambiguous and visibly supported.

2. **Review article dates.**
   - ArticleLayout currently assigns the review date to both datePublished and dateModified.
   - Confirm that the public date represents a real publication date; otherwise use accurate publication and revision dates or remove inaccurate publication metadata.

3. **Keep FAQ structured data subordinate to visible content.**
   - TERRA's product FAQs are visible and match their corresponding answer text.
   - Do not treat FAQ markup as a Google rich-result growth lever. Google has limited FAQ rich results for ordinary commercial sites. Keep or revise the markup only when it remains accurate, useful, and valid.

4. **Evaluate breadcrumb markup separately.**
   - Visual breadcrumbs exist on product and article pages.
   - If SOL adds BreadcrumbList schema, it must precisely match the public URLs and visible labels. This is a request to evaluate, not an instruction to add markup without validation.

## P1 — crawler and metadata validation

1. Verify that sitemap and robots decisions expose only final public routes and do not advertise an unverified install URL.
2. Confirm page titles, canonical URLs, Open Graph text, llms.txt, and schema descriptions remain consistent with the revised visible definitions:
   - MerchantCanvas: focused Shopify apps for promotion and B2B sales workflows.
   - MultiTier Discounts: a Shopify embedded app for supported tiered promotions with Shopify Functions-based checkout logic.
   - B2B Quote Approvals: a Shopify Admin quote-approval desk that converts agreed wholesale quotes into Shopify draft orders; public install is not claimed.
3. Run the existing static export and technical discovery tests after the TERRA copy changes.

## Measurement recommendations

No consent-gated analytics implementation was changed by TERRA. If SOL reviews tracking, retain the existing privacy boundary and verify these decision-oriented events:

| Decision | Event | Required context |
| --- | --- | --- |
| Which workflow attracts evaluation | select_app | product, placement |
| Which page sends a contact intent | contact_intent | product when known, placement |
| Which route produces a prepared email | lead_submit | topic, no PII in event payload |
| Which guide creates product interest | select_app | product, placement indicating the guide CTA |

Do not send names, email addresses, store URLs, free-text workflow descriptions, or other PII to analytics events. Verify events in a consented session and preserve the current consent gating.

## Current blockers / unknowns

- Public App Store URLs and actual install availability for both apps.
- Final B2B production hosting, Shopify review testing, and any compatibility statement.
- Owner-confirmed contact email forwarding.
- Search Console and production analytics access.
