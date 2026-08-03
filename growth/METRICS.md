# Growth Metrics and Decision Contract

## North-star outcome

The intended business outcome is a **retained, successfully using MTD
merchant**. That outcome is not yet fully observable from the marketing-site
repository, so the system must keep its measurable components separate rather
than inventing a composite number.

## Primary KPIs

| KPI | Definition | Authoritative source | Cadence | Decision |
| --- | --- | --- | --- | --- |
| Completed MTD installs | New completed installations during the period | Shopify Partner Dashboard | Daily collection, weekly decision | Is qualified acquisition reaching the product? |
| Retained installs | Installs still present after the declared retention window; initially 7 days if the source supports cohorting | Shopify Partner Dashboard or verified app analytics | Weekly | Are acquired stores remaining long enough to evaluate MTD? |
| Paid plan activations | New verified paid subscription activations, segmented by plan when available | Shopify Partner Dashboard | Weekly/monthly | Is usage becoming commercial value? |

If retained installs are not exposed by an authoritative source, report new
installs and uninstalls separately. Do not manufacture retention by matching
unrelated aggregates.

## Driver metrics

| Metric | Definition | Source | Caveat |
| --- | --- | --- | --- |
| Qualified MTD sessions | Sessions landing on the MTD product page from an identified source | GA4 | Consent means the observed set is incomplete |
| Install-intent rate | Sessions with one `install_intent` / eligible consented MTD sessions | GA4 | It measures App Store handoff, not installation |
| Non-brand organic clicks | Search clicks to MTD and MTD guides excluding brand terms | Search Console | Search data is delayed and low-volume early on |
| AI-referred sessions | Sessions with a recognized AI referrer | GA4 | Referrers can be missing or reduced |
| AI-assisted install intent | AI-referred sessions with `install_intent` | GA4 | Directional, not completed installation attribution |
| AI citation rate | Queries with a verified MerchantCanvas citation / fixed queries checked | Manual 20-query sample | Results vary by engine, account, locale, and time |

## Guardrails

| Guardrail | Rule |
| --- | --- |
| Spend | Must remain $0 while `control.json` is in zero-cost mode |
| Attribution honesty | Never report `install_intent` as an install or unknown traffic as AI traffic |
| Review integrity | Never reward, gate, or request a positive review |
| Data privacy | No PII or credentials in analytics events, snapshots, or Git |
| Product truth | No claim without verified product or official-source evidence |
| Experience quality | Investigate material uninstall or support-problem increases before scaling acquisition |

## Baseline and targets

The first target is measurement quality, not growth volume:

- establish access and freshness for every primary source;
- validate that no conversion event is duplicated;
- record completed installs and uninstalls without confusing them with clicks;
- complete at least one comparable weekly snapshot;
- preserve a fixed AI query set.

Numerical acquisition targets will be proposed only after 4-8 weeks of clean
data or enough verified product events to support a shorter decision window.

