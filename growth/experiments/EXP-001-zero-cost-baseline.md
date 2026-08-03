# EXP-001 — Zero-cost acquisition baseline

**Status:** in_progress  
**Owner:** MerchantCanvas + Growth Agent  
**Created:** 2026-08-02  
**Observation window:** 2026-08-02 through 2026-08-16  
**Spend authorization:** none; $0 hard cap  
**Related decision:** D-002

## Hypothesis

MerchantCanvas can identify its first meaningful acquisition opportunity
without paid traffic by combining authoritative installation data, current
search/indexation evidence, public competitor creative research, and one
high-intent content decision.

## Audience and problem

Shopify merchants and agencies that need controlled tiered, quantity-break,
Buy X Get Y, cart-value, or supported gift promotion workflows.

## Single primary change

Introduce a persistent evidence and decision loop. No public campaign, post,
outreach message, tracking integration, or website content is changed during
the experiment without separate approval.

## Primary metric

**Measurement readiness:** authoritative status is known and freshly recorded
for completed installs, web install intent, Google search visibility, and the
fixed AI citation sample.

## Diagnostics and guardrails

- Diagnostic: number of authoritative data sources with verified access and a
  current observation.
- Diagnostic: number of content/creative hypotheses backed by observed customer
  or competitor language.
- Guardrail: total spend remains $0.
- Guardrail: no external post, outreach, review request, or account mutation.
- Stop condition: any request to spend or publish is queued for approval rather
  than executed.

## Baseline

- Production homepage, MTD page, robots, and sitemap returned HTTP 200 on
  2026-08-02.
- Public MTD listing displayed zero reviews on 2026-08-02.
- T0 AI visibility baseline exists at
  `../../docs/marketing/AI_VISIBILITY_BASELINE_2026-07-29.md`.
- Public search proxy found no MerchantCanvas result for three representative
  queries on 2026-08-02; Search Console verification is required.
- Shopify Partner, Search Console, Bing, GA4 stream, and Meta business access
  were verified on 2026-08-03. Production GA4 collection still requires a
  deployment and consent-path validation.

## Execution log

- 2026-08-02 — Growth OS structure, authority switch, KPI contract, and initial
  public snapshot created.
- 2026-08-02 — Meta selected for no-cost readiness research, not for activation.
- 2026-08-02 — First public Meta Ad Library pass completed. The broad category
  query was noisy; a focused Pumper query produced usable creative patterns.
  Findings are recorded in `../research/META_AD_LIBRARY_2026-08-02.md`.
- 2026-08-02 — Cloudflare plugin verified read-only access to the production
  Pages project, active custom domain, successful deployment, and current
  environment-variable state. No account mutation occurred.

## Completion criteria

### 2026-08-03 execution update

- Shopify Partner baseline recorded: 2 installs, 0 uninstalls, and 2 cumulative
  net installs in the last 30 days. Raw merchant count was rejected as a
  customer KPI because internal/test stores are present.
- Search Console and Bing sitemap status verified. Both report zero search
  traffic; Bing AI Performance reports zero citations. Google page indexing is
  still processing.
- GA4 stream ID was added to Cloudflare production and preview. The existing
  consent-aware loader remains the only integration path.
- Meta business access verified, but Meta restricted the portfolio from ads
  and audiences based on suspected non-compliant automation. No review request
  was submitted.

1. Shopify Partner installation metrics are observed or explicitly documented
   as unavailable.
2. Search Console's current indexation/query state is observed or explicitly
   documented as unavailable.
3. GA4 production state and `install_intent` availability are observed or
   explicitly documented as unavailable.
4. T+14 fixed-query visibility check is completed on or after 2026-08-12.
5. A Meta Ad Library creative-pattern review is documented without copying
   competitor assets or claims.
6. One no-cost content or distribution experiment is ready for owner approval.

## Result

Pending.

## Decision

Pending until 2026-08-16 or earlier completion of every criterion.
