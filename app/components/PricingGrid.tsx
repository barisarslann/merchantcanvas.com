import type { Plan } from "../content/site";

export function PricingGrid({ plans }: { plans: Plan[] }) {
  const cardPlans = plans.filter((plan) => plan.presentation === "card");
  const conditionalPlans = plans.filter(
    (plan) => plan.presentation === "conditional",
  );

  return (
    <div className="pricing-layout">
      <div className="pricing-grid">
        {cardPlans.map((plan) => (
          <article
            key={plan.name}
            className={`price-card${plan.recommended ? " recommended" : ""}`}
          >
            {plan.recommended && (
              <span className="plan-badge">Most suitable for many teams</span>
            )}
            <div className="price-card-header">
              <h3>{plan.name}</h3>
              <p>{plan.bestFor}</p>
            </div>
            <div className="price">
              <strong>{plan.price}</strong>
              <span>{plan.cadence}</span>
            </div>
            {plan.annualPrice && (
              <p className="annual-price">{plan.annualPrice}</p>
            )}
            {plan.trial && <p className="trial">{plan.trial}</p>}
            <p className="plan-eligibility">{plan.eligibility}</p>
            <p className="plan-limit">{plan.limit}</p>
            <ul className="check-list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {conditionalPlans.map((plan) => (
        <article className="conditional-plan" key={plan.name}>
          <div className="conditional-plan-intro">
            <span className="conditional-plan-label">Conditional plan</span>
            <div>
              <h3>Shopify {plan.name} plan</h3>
              <p>{plan.bestFor}</p>
            </div>
          </div>
          <div className="conditional-plan-price">
            <div className="price">
              <strong>{plan.price}</strong>
              <span>{plan.cadence}</span>
            </div>
            {plan.annualPrice && (
              <p className="annual-price">{plan.annualPrice}</p>
            )}
            {plan.trial && <p className="trial">{plan.trial}</p>}
            <p className="plan-eligibility">{plan.eligibility}</p>
          </div>
          <div>
            <p className="plan-limit">{plan.limit}</p>
            <ul className="check-list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
