# MerchantCanvas Growth OS

MerchantCanvas Growth OS is the durable operating memory for acquisition,
SEO, AEO, measurement, and controlled advertising work. It exists so a new
Codex task can continue from evidence instead of reconstructing past decisions.

## Current mode

The system is in **zero-cost observation and preparation mode**. Paid media is
not authorized. The machine-readable authority switch is `control.json`.

## Required reading order

Every growth-agent run must read these sources in order:

1. `../AGENTS.md` and the workspace boundary it contains.
2. `../PRODUCT.md` for product truth and claim constraints.
3. `control.json` for the current authority and spend limits.
4. `OPERATING_RULES.md` for the run loop and safety contract.
5. `CURRENT_STATE.md` for the latest known operating state.
6. `METRICS.md` and `DATA_SOURCES.md` for definitions and source authority.
7. The latest daily and weekly reports.
8. Every experiment whose status is `in_progress`.
9. `LEARNINGS.md` and `decision-log.md` before proposing a repeated action.

Existing detailed marketing sources remain authoritative and are not copied
into this directory:

- `../docs/marketing/SOL_MEASUREMENT_PLAN.md`
- `../docs/marketing/MTD_PAID_MEDIA_PLAN.md`
- `../docs/marketing/AI_VISIBILITY_BASELINE_2026-07-29.md`
- `../docs/marketing/TERRA_CONTENT_BACKLOG.md`
- `../docs/marketing/SOL_TECHNICAL_AUDIT.md`

## Operating cadence

- Morning: collect source health and new observations.
- Evening: compare with the prior snapshot and flag anomalies.
- Extra same-day run: only during the first 72 hours of a launch or an incident.
- Weekly: make SEO, AEO, content, and channel decisions.
- Monthly: review positioning, attribution quality, channel economics, and the
  authority level granted to the agent.

Collection can be frequent. Decisions must wait for the minimum observation
window defined by the active experiment unless a safety or spend guardrail is
breached.

## Directory contract

- `control.json`: owner-controlled authority and budget switch.
- `CURRENT_STATE.md`: replaceable summary of the latest verified state.
- `METRICS.md`: stable metric definitions and decision rules.
- `DATA_SOURCES.md`: access, authority, freshness, and known gaps.
- `experiments/`: one immutable record per hypothesis.
- `snapshots/`: small, normalized, non-PII source observations.
- `reports/daily/`: operational checks and anomalies.
- `reports/weekly/`: decisions and evidence synthesis.
- `playbooks/`: reusable procedures, not campaign results.
- `queue/`: proposed work and actions needing owner approval.
- `LEARNINGS.md`: only evidence-supported, reusable lessons.
- `decision-log.md`: append-only strategic decisions.

Do not store passwords, API keys, cookies, merchant names, shop domains,
customer messages, email addresses, or other personal data in this directory.

