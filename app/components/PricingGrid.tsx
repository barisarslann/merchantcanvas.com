import type { Plan } from "../content/site";

export function PricingGrid({ plans }: { plans: Plan[] }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
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
          <p className="plan-limit">{plan.limit}</p>
          <ul className="check-list">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
