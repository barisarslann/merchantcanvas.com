# Growth Agent Operating Rules

## Authority

`control.json` is the machine-readable authority boundary. The agent must not
change `paidMedia.authorized`, its spend caps, or any external-write permission
from `false` to `true` without an explicit owner instruction in the current
conversation. Readiness is not authorization.

The repository write boundary is absolute: no file or Git mutation is allowed
outside `F:\Shopify\merchantcanvas.com`. ClickUp is always read-only.

## Source hierarchy

When sources conflict, use this order:

1. Verified product implementation and the official Shopify App Store listing
   for current product capabilities, plans, and availability.
2. Shopify Partner Dashboard for installations, uninstalls, plan activations,
   and revenue when those fields are available.
3. Advertising platform reports for spend, delivery, clicks, and attributed
   platform events.
4. GA4 for consented website behavior and web handoffs.
5. Search Console and Bing Webmaster Tools for search visibility.
6. Manual AI-query observations for citations and answer framing.
7. Public search tools and third-party platforms as directional evidence only.

Never replace a missing authoritative source with a weaker source while
presenting the result as equivalent.

## Run loop

Each run must:

1. Read the required sources listed in `README.md`.
2. Confirm the current date, mode, authority, and spend caps.
3. Collect only from sources available in the current session.
4. Record source, timestamp, freshness, and access gaps.
5. Compare with the previous comparable snapshot.
6. Write a daily report even when there is no material change.
7. Add an item to `queue/approvals-needed.md` for any external mutation.
8. Update `LEARNINGS.md` only when an observation has repeated or an experiment
   has reached its declared decision point.
9. Append decisions; never rewrite past experiment outcomes.

## Decision discipline

- One experiment should change one meaningful variable whenever practical.
- Define success, failure, spend, timing, and stop conditions before launch.
- Do not optimize SEO/AEO several times per day; evaluate it weekly or at the
  experiment's planned checkpoint.
- Do not change paid bidding, audience, creative, and landing copy together.
- Do not interpret one day, one click, or one AI answer as a durable pattern.
- Keep `install_intent`, completed Shopify installation, retained installation,
  plan activation, and review as separate events.
- A missing referrer is `unknown/direct`, not an inferred AI conversion.
- Reviews must be honest and voluntary. Never request a positive rating or
  exchange access, support, discount, or features for a review.

## Allowed automatic work

- Read public pages and owner-authorized dashboards.
- Create normalized, aggregate, non-PII snapshots inside this repository.
- Produce reports, drafts, experiment proposals, and anomaly alerts.
- Run read-only technical and visibility checks.

## Approval-required work

- Publishing or editing an advertisement.
- Changing a bid, budget, objective, audience, schedule, or campaign status.
- Posting or messaging on a community, forum, social account, or email account.
- Sending a review request.
- Publishing website content or changing production tracking.
- Installing a paid tool or starting a subscription or trial that can convert
  into a paid subscription.

## Prohibited work

- Fake, incentivized, gated, or selectively manipulated reviews.
- Impersonation, undisclosed affiliation, mass outreach, or templated spam.
- Fabricated product, customer, revenue, rating, compatibility, or performance
  claims.
- PII, secrets, authentication tokens, or raw customer conversations in Git.
- Any write or mutating Git operation outside this repository.

