# Proposed Actions

## P-001 — Verify authenticated measurement access

- **Status:** completed on 2026-08-04, including production GA4 validation
- **Cost:** $0
- **Action:** Use owner-authorized read-only sessions for Shopify Partner
  Dashboard, Search Console, GA4, and Bing; record only aggregate observations.
- **Why:** These sources determine whether the agent can distinguish traffic,
  intent, installs, retention, and revenue.
- **Completed:** Cloudflare, Shopify Partner Dashboard, Search Console, GA4
  stream, Bing search/sitemap/AI Performance, and Meta business state verified.
- **Caveat:** Google indexing data is still processing; paid activation remains
  locked by billing, legal, conversion, and final-preview gates.

## P-002 — Research Meta creative patterns

- **Status:** in progress; first focused competitor completed
- **Cost:** $0
- **Action:** Review active, relevant ads in Meta Ad Library and write a
  non-copying pattern analysis.
- **Why:** Prepare evidence-based creative hypotheses before funding delivery.
- **Next:** Add two relevant advertiser-specific observations because the broad
  keyword result set proved too noisy.

## P-003 — Complete the T+14 AI visibility sample

- **Status:** scheduled for 2026-08-12 or later
- **Cost:** $0
- **Action:** Repeat the fixed query set without altering T0 definitions.
- **Why:** Determine whether indexing and citations changed after deployment.

## P-004 — Select one MTD-first content brief

- **Status:** proposed
- **Cost:** $0
- **Action:** Re-score the existing P1/P2 backlog using current Search Console
  and public question evidence, then prepare one brief.
- **Why:** Avoid publishing a broad content volume without demonstrated demand.

## P-005 — Validate consent-aware GA4 production collection

- **Status:** completed on 2026-08-04
- **Cost:** $0
- **Action:** Deploy the configured GA4 public ID, verify no Google request is
  made before consent, then confirm a consented session/event in GA4 Realtime.
- **Why:** Website intent cannot be optimized until production collection is
  proven end to end.
- **Observed:** Essential-only loaded neither Google nor Meta. Analytics-only
  loaded GA4 `G-6L80EEB9KD` and no Meta script on production. MerchantCanvas
  Realtime then received the controlled `page_view`, `view_product`, and
  `install_intent` validation events.

## P-006 — Prepare Meta restriction review

- **Status:** closed without submission on 2026-08-04; the prior restriction
  was no longer present in the inspected settings surface
- **Cost:** $0
- **Action:** Retain the truthful draft as a contingency only. Do not submit an
  appeal unless the restriction returns and the owner approves the exact text.
- **Why:** No review request was needed after access recovered.
- **Draft:** `../playbooks/META_RESTRICTION_REVIEW_DRAFT.md`

## P-007 — Prepare a Shoffi MTD affiliate pilot

- **Status:** proposed; account observed, no app integrated
- **Cost:** $0 platform cost until the Free-plan affiliate-revenue threshold;
  affiliate commission is payable only after eligible attributed revenue
- **Action:** Rotate the Partner API token, approve the minimum required
  permissions and final affiliate terms, verify attribution in an MTD-rooted
  task if required, then present the unlaunched Shoffi listing for owner review.
- **Proposed terms:** 30% of eligible net recurring revenue for 12 months, $0
  CPI, manual affiliate approval, and $50 minimum withdrawal.
- **Why:** Shoffi is the closest no-upfront-cost channel to MTD's actual Shopify
  app audience and recruits agencies, creators, and affiliates on a
  pay-for-results basis.
- **Guardrails:** No incentivized reviews, no affiliate self-referrals, no
  broad auto-approval, no credentials in Git, and no MTD repository change
  from this workspace.
- **Experiment:** `../experiments/EXP-003-shoffi-affiliate-pilot.md`

## P-008 — Link MerchantCanvas GA4 and Search Console

- **Status:** proposed; requires owner approval for an external analytics
  configuration change
- **Cost:** $0
- **Action:** Link the verified `sc-domain:merchantcanvas.com` property to the
  MerchantCanvas GA4 property, then confirm the organic-query and landing-page
  reports without changing consent behavior.
- **Why:** GA4 currently recommends the connection. It would join Google organic
  search context to consented on-site behavior without treating Search Console
  clicks as completed installs.
