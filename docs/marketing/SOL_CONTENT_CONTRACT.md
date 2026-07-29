# SOL → TERRA Content Contract

**Reviewed:** 2026-07-29
**Purpose:** Keep visible product language and technical metadata/schema in one
evidence-backed contract.

## Current result

No blocking visible-content addition is required. TERRA's current product pages
already expose the answer surfaces requested by the SOL plan:

| Answer surface | MultiTier Discounts | B2B Quote Approvals |
| --- | --- | --- |
| Direct product definition | Present in hero | Present in hero |
| Who it is for | Present | Present |
| When it is useful | Present | Present |
| When it is not appropriate | Present | Present |
| Workflow | Four visible steps | Four visible steps |
| Plans, prices, trials, limits | Three standard cards + conditional Plus band | Present |
| Availability boundary | Present beside CTA and in FAQ | Present beside CTA and in FAQ |
| Visible FAQs | Six | Five |
| Related guide | Quantity-break guide | Quote-approval guide |

The two guides also start with an `answer-first` paragraph and link back to the
relevant product as an implementation option, not as a guaranteed requirement.

## Technical contract TERRA must preserve

### Product identity

- Use product names exactly: `MerchantCanvas`, `MultiTier Discounts`, and
  `B2B Quote Approvals`.
- MerchantCanvas is the product company/provider. Shopify is the commerce
  platform, not the owner or endorser.
- Use the verified MTD App Store URL exactly:
  `https://apps.shopify.com/multitier-discounts`.
- Do not add a B2B install URL until its public release is verified.
- Do not add customer counts, ratings, reviews, testimonials, Shopify Plus
  compatibility, or outcome guarantees without explicit evidence.

### Plan and availability changes

Any future pricing or release update must change these surfaces in one reviewed
change:

1. `app/content/site.ts` visible plan/availability data.
2. Product CTA behavior and the source-controlled verified install URL.
3. Product SoftwareApplication/Offer rendered JSON-LD.
4. `public/llms.txt`.
5. SEO/AEO regression expectations.
6. The sitemap only if a new public canonical route is created.

The schema offer URL must remain the product page or a verified official
destination. A contact URL must not be relabelled as an install URL.

### FAQ changes

- Every FAQ Question and acceptedAnswer must remain visible on the same page.
- Edit visible content first; schema continues to derive from that same data
  structure.
- Do not add FAQs solely to pursue a rich result. Google limits FAQ rich-result
  visibility for ordinary commercial sites.

### Article date changes

The current two guides were introduced and reviewed on 2026-07-27, which
supports the current schema date. If a guide receives a substantive revision:

- introduce separate `publishedIso` and `modifiedIso` values;
- retain the original real publication date;
- update the visible reviewed date and `modifiedIso` together;
- do not use the build date, current date, or sitemap generation date as a fake
  content date.

Pure accessibility or formatting changes do not require a content-modified date.

### Breadcrumb changes

- Product breadcrumb labels: `Apps / {product name}`.
- Article breadcrumb labels: `Resources / {visible category}`.
- If visible labels or paths change, update BreadcrumbList in the same change.
- Do not add a breadcrumb item pointing to a nonexistent category URL.

## Content decisions still requiring owner input

1. Whether the draft Privacy and Terms pages should remain indexable before
   owner/legal approval.
2. The final monitored contact email and legal business entity.
3. B2B public App Store/install URL and launch state.
4. Permissioned proof such as reviews, customers, screenshots, or outcomes.
5. A real author/person attribution if MerchantCanvas later wants individual
   expertise rather than the truthful current `MerchantCanvas product team`.

Until those inputs exist, the current restrained copy and schema are the
approved fallback.

