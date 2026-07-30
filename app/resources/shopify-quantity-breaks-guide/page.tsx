import { ArticleLayout } from "../../components/ArticleLayout";
import { TrackedLink } from "../../components/TrackedLink";
import { products } from "../../content/site";
import { pageMetadata } from "../../lib/metadata";

const title = "Shopify quantity breaks: a practical planning guide";
const description =
  "A useful Shopify quantity-break campaign starts with one legible buying decision, protects contribution margin at every tier, and is tested from product page through checkout before launch.";

export const metadata = pageMetadata(
  "Shopify quantity breaks guide",
  "Plan Shopify quantity breaks around shopper clarity, margin, eligibility, storefront messaging, checkout logic, and pre-launch testing.",
  "/resources/shopify-quantity-breaks-guide",
);

export default function QuantityBreaksGuidePage() {
  const multiTier = products["multitier-discounts"];

  return (
    <ArticleLayout
      title={title}
      description={description}
      category="Promotion operations"
      readingTime="9 min read"
      reviewed="27 July 2026"
      reviewedIso="2026-07-27"
      path="/resources/shopify-quantity-breaks-guide"
      takeaways={[
        "Start with the shopper decision, then choose the tier mechanic.",
        "Model margin at every reachable tier, including shipping and returns.",
        "Use checkout logic for enforceable qualification; use widgets to explain it.",
        "Test cart mutations, combinations, mobile layout, and checkout before publishing.",
      ]}
    >
      <p className="answer-first">
        A Shopify quantity break is a tiered promotion that rewards shoppers
        for buying more eligible units or reaching a defined cart threshold.
        It works best when a shopper can understand the next useful quantity at
        a glance, the merchant can explain exactly which items qualify, and
        checkout applies the same rule the storefront promised. The campaign
        design therefore has three linked parts: economics, eligibility, and
        communication.
      </p>

      <h2>Begin with the buying behaviour, not the discount percentage</h2>
      <p>
        “Buy more, save more” can describe several different promotion
        mechanics. They should not be treated as interchangeable. A consumable
        with predictable repeat use may support straightforward quantity
        tiers. A coordinated product set may need a full-set requirement. A
        higher-value catalogue may be better served by a cart threshold or a
        carefully chosen gift.
      </p>
      <p>Write the intended shopper decision in one sentence before configuring anything:</p>
      <blockquote>
        A shopper buying one unit should see that three units are the sensible
        stock-up choice, without feeling that the single-unit price is
        artificially punitive.
      </blockquote>
      <p>
        If that sentence is difficult to write, the campaign is probably
        combining too many goals.
      </p>

      <h2>Choose a tier shape that matches the product</h2>
      <div className="article-table" role="table" aria-label="Quantity break tier shapes">
        <div role="row" className="article-table-head">
          <span role="columnheader">Campaign shape</span>
          <span role="columnheader">Useful when</span>
          <span role="columnheader">Watch for</span>
        </div>
        <div role="row">
          <span role="cell">Quantity threshold</span>
          <span role="cell">Multiple units of the same or eligible products are normal</span>
          <span role="cell">Variants, mixed carts, and whether quantities aggregate</span>
        </div>
        <div role="row">
          <span role="cell">Progressive item positions</span>
          <span role="cell">Later units should receive a deeper discount</span>
          <span role="cell">Which items are sorted or discounted when prices differ</span>
        </div>
        <div role="row">
          <span role="cell">Full-set offer</span>
          <span role="cell">A bundle only makes sense when every required item is present</span>
          <span role="cell">Partial sets accidentally receiving value</span>
        </div>
        <div role="row">
          <span role="cell">Cart-value reward</span>
          <span role="cell">The goal is overall basket value rather than unit count</span>
          <span role="cell">Currency, exclusions, returns, and shipping treatment</span>
        </div>
      </div>

      <h2>Model the economics at every tier</h2>
      <p>
        A higher order value is not automatically a better order. Model
        contribution margin after the product cost, payment cost, picking and
        packing, shipping subsidy, expected returns, and the discount itself.
        Do this for every tier a shopper can reach.
      </p>
      <div className="formula-card">
        <span>Illustrative check</span>
        <strong>
          Contribution after offer = net merchandise revenue − product cost −
          fulfilment cost − shipping subsidy − variable fees
        </strong>
        <p>
          This is an example planning formula, not a substitute for the store’s
          own finance model.
        </p>
      </div>
      <p>
        Also test boundary carts. If a shopper removes one item, changes to a
        cheaper variant, adds an excluded product, or applies another discount,
        what happens? The least profitable qualifying combination often hides
        at a boundary rather than at the headline tier.
      </p>

      <h2>Define eligibility precisely</h2>
      <p>
        “Buy three” is incomplete. Three of what, across which variants, for
        which customers, in which country, during which dates, and with which
        other discounts? A campaign specification should answer:
      </p>
      <ul>
        <li>Which products, variants, collections, or tags count?</li>
        <li>Do quantities aggregate across eligible lines or stay per line?</li>
        <li>Are qualifying items also the discounted items?</li>
        <li>Must a complete set be present?</li>
        <li>Is the offer automatic or code-based?</li>
        <li>Can it combine with product, order, or shipping discounts?</li>
        <li>Are there customer, country, schedule, usage, or cart-value limits?</li>
      </ul>
      <p>
        This specification is useful even if the campaign is configured with
        another app or directly through Shopify. It gives merchandising, support,
        and QA the same definition.
      </p>

      <h2>When Shopify Functions are a useful foundation</h2>
      <p>
        Shopify Functions are useful when qualification and discount
        application must be enforced within Shopify’s checkout logic rather
        than inferred only by theme JavaScript. They are particularly relevant
        when carts can contain mixed products or variants, combination rules
        matter, and the same result must survive cart refreshes and theme
        differences.
      </p>
      <p>
        Functions do not make storefront communication unnecessary. Checkout
        logic answers “does this cart qualify?” A widget or clear theme message
        answers “what should the shopper do next?” Those are different jobs.
      </p>

      <h2>Make the next tier easy to understand</h2>
      <p>
        Show the currently relevant decision, not the full campaign
        configuration. Near the product quantity control, a compact message can
        explain the next break. In the cart, a progress message can show the
        remaining quantity or value. Collection and cross-sell guidance should
        appear only when it helps complete the actual offer.
      </p>
      <p>A useful message answers three questions:</p>
      <ol>
        <li>What is already in the cart?</li>
        <li>What must change to unlock the next value?</li>
        <li>What will be discounted when the cart qualifies?</li>
      </ol>
      <p>
        Avoid messages that imply a gift is already free before checkout has
        applied the discount, or that hide important exclusions in a tooltip.
      </p>

      <h2>Test the campaign as a cart system</h2>
      <div className="checklist-card">
        <h3>Pre-launch test path</h3>
        <ul className="check-list">
          <li>Eligible and ineligible products at every tier boundary</li>
          <li>Exact variants, mixed variants, and future variants where relevant</li>
          <li>Quantity increases, decreases, removals, and cart refresh</li>
          <li>Product page, cart drawer, cart page, mobile layout, and checkout</li>
          <li>Automatic versus code behaviour and the customer-facing label</li>
          <li>Combination settings with realistic existing discounts</li>
          <li>Start/end dates, usage limits, customer tags, and countries</li>
          <li>Gift cleanup when the qualifying item is removed</li>
          <li>Custom themes and accelerated checkout paths</li>
        </ul>
      </div>

      <h2>Operate the campaign after launch</h2>
      <p>
        Monitor use, affected orders, discount totals, support questions, and
        margin—not just gross sales. Compare the campaign period with an
        appropriate baseline, while recognising that seasonality, media spend,
        inventory, and merchandising can move at the same time. App analytics
        can describe usage; they should not be presented as proof of causal
        lift.
      </p>
      <p>
        Keep a short campaign record with the hypothesis, eligibility
        definition, planned duration, margin floor, owner, test evidence, and
        the decision made afterward. That record makes the next campaign less
        dependent on memory.
      </p>

      <div className="article-cta">
        <div>
          <p className="eyebrow">Related product</p>
          <h2>MultiTier Discounts</h2>
          <p>
            A Shopify embedded app for native tiered campaigns with storefront
            guidance and Shopify Functions-based checkout logic.
          </p>
        </div>
        <TrackedLink
          className="button button-primary"
          href={multiTier.installUrl!}
          eventName="install_intent"
          eventData={{
            product: "multitier-discounts",
            placement: "resource_guide_cta",
            destination: "shopify_app_store",
          }}
        >
          Install from Shopify
        </TrackedLink>
      </div>
    </ArticleLayout>
  );
}
