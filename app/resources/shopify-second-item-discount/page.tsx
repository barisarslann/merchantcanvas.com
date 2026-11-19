import { ArticleLayout } from "../../components/ArticleLayout";
import { TrackedLink } from "../../components/TrackedLink";
import { mtdEducation, products } from "../../content/site";
import { guideIllustrations } from "../../content/guide-illustrations";
import { pageMetadata } from "../../lib/metadata";

const path = "/resources/shopify-second-item-discount";
const title = "How to discount only the second item on Shopify";
const description =
  "A second-item discount sounds simple until the cart holds different prices, repeated units or other offers. Decide which item counts as second, check whether Shopify's own discount is enough, and test the cart before launch.";

export const metadata = pageMetadata(
  "Discount only the second item on Shopify",
  "How to discount only the second item in a Shopify cart: when Shopify's Buy X Get Y is enough, which item gets the reward, and what to test.",
  path,
);

export default function SecondItemDiscountPage() {
  const multiTier = products["multitier-discounts"];

  return (
    <ArticleLayout
      title={title}
      description={description}
      category="Promotion operations"
      readingTime="6 min read"
      reviewed="19 November 2026"
      reviewedIso="2026-11-19"
      published="19 November 2026"
      publishedIso="2026-11-19"
      illustration={guideIllustrations.quantityBreaks}
      path={path}
      takeaways={[
        "Decide which item is the second: the cheaper one, the more expensive one, or the one added second.",
        "Shopify's own Buy X Get Y discount can cover a simple second-item offer.",
        "Use position rules when the second and third items need different rewards.",
        "Two units on one cart line fill one position, so test repeated items separately.",
      ]}
    >
      <p className="answer-first">
        To discount only the second item in a Shopify cart, you need a rule
        that decides which eligible item counts as second and gives the reward
        to that item alone. Shopify’s own Buy X Get Y discount covers a simple
        version: in an automatic discount where the customer buys and gets from
        the same product or collection, Shopify discounts the lower-priced item.
        If the second and third items need different rewards, or you want to
        choose how items are ordered, use a position rule in an app such as
        MultiTier Discounts.
      </p>

      <h2>First decide which item is the second</h2>
      <p>
        With two different items in the cart, “the second item” can mean
        different things. Choose one before you configure anything, and use the
        same words on the product page.
      </p>
      <div className="article-table" role="table" aria-label="Ways to choose the second item">
        <div role="row" className="article-table-head">
          <span role="columnheader">The second item is</span>
          <span role="columnheader">Order items by</span>
          <span role="columnheader">Cart with a $30 and a $20 item</span>
        </div>
        <div role="row">
          <span role="cell">The cheaper item</span>
          <span role="cell">Price, high to low</span>
          <span role="cell">The $20 item gets the reward</span>
        </div>
        <div role="row">
          <span role="cell">The more expensive item</span>
          <span role="cell">Price, low to high</span>
          <span role="cell">The $30 item gets the reward</span>
        </div>
        <div role="row">
          <span role="cell">The item added second</span>
          <span role="cell">Cart order</span>
          <span role="cell">Depends on what the shopper added first</span>
        </div>
      </div>
      <p>
        Rewarding the cheaper item keeps the discount on the lower price.
        Rewarding the more expensive item costs more on every mixed cart.
      </p>

      <h2>When Shopify’s own discount is enough</h2>
      <p>
        A Shopify Buy X Get Y discount lets the customer buy qualifying items
        and get other items at a percentage off, an amount off, or free. In an
        automatic discount where the “buys” and “gets” sections use the same
        product or collection, Shopify discounts the lower-priced item the
        customer chooses. The discounted item is never added to the cart for
        the shopper.
      </p>
      <p>
        If your offer is one reward on the cheaper of two items from one
        collection, try this first. You may not need an app.{" "}
        <a href="https://help.shopify.com/en/manual/discounts/discount-types/buy-x-get-y">
          Read Shopify’s Buy X Get Y help page
        </a>.
      </p>

      <h2>When you need position rules</h2>
      <ul>
        <li>The second and third items get different rewards, for example 30% and 40%.</li>
        <li>You want to choose the order: price high to low, price low to high, or cart order.</li>
        <li>Only some products, variants, collections or tags should fill a position.</li>
        <li>Each position should show its own discount message in the cart and at checkout.</li>
        <li>The offer needs customer or country targeting, a schedule, or usage limits.</li>
      </ul>

      <h2>Set it up in MultiTier Discounts</h2>
      <p>
        In MultiTier Discounts, a price-position campaign gives a reward to
        each position you set. For a second-item offer, start from the “2 for 1
        at 50% off” template: it discounts the second eligible item, with items
        ordered by price from highest to lowest. In Quantity and Sorting, Price:
        High to Low is the default and compares unit prices, not line totals.
        The per-line quantity cap limits how many units on a line receive the
        reward.
      </p>
      <p>
        For example, with three different eligible items at $30, $20 and $10,
        High to Low sorting, 30% on position 2 and 40% on position 3 give $6
        off the $20 item and $4 off the $10 item: $50 before tax and shipping.
        This is example arithmetic, not a customer result.
      </p>
      <p>
        Related templates include “3 for 2 — cheapest free”, “3 for 2 — 3rd at
        50% off” and “Tiered discount (25%, 50%, 75%)”. Every plan includes
        this campaign type; the Free plan allows one active campaign.{" "}
        <a href={`${mtdEducation.guideUrl}#quantity-breaks`}>
          Follow the illustrated price-position setup
        </a>.
      </p>

      <h2>Two units of the same item</h2>
      <p>
        Position rules count eligible cart lines. Two units of the same variant
        on one line fill one position, not two. Shopify can also group
        identical units on one line or split them by line properties, so do not
        judge the result by the rows you see.
      </p>
      <p>
        If the offer is “buy two of the same product, get the second half
        price”, a quantity break can give the same total. Two $18 units with
        the second at 50% off cost $27; two units at 25% off each also cost
        $27. The totals only match at exactly two units. At three units, 25%
        off each saves more than one half-price item, so write the expected
        total for two, three and four units before you choose.
      </p>

      <h2>Check the margin</h2>
      <p>
        Half off the second item is 25% off the pair when both items cost the
        same. When the second item is cheaper, the discount is a smaller share
        of the order. Model the least profitable eligible cart, not the
        headline example, and decide whether the offer may combine with other
        product, order or shipping discounts.
      </p>

      <h2>Test before launch</h2>
      <div className="checklist-card">
        <h3>Second-item test path</h3>
        <ul className="check-list">
          <li>One eligible item: no reward</li>
          <li>Two different eligible items: the reward lands on the item you chose</li>
          <li>Two units of the same variant on one line</li>
          <li>Three or more items: later positions behave as planned</li>
          <li>An ineligible item in the cart does not take a position</li>
          <li>Remove an item: the reward moves or disappears as expected</li>
          <li>Product page, cart, mobile layout and checkout show the same result</li>
          <li>Another automatic discount or code in the same cart</li>
        </ul>
      </div>

      <div className="article-cta">
        <div>
          <p className="eyebrow">Related product</p>
          <h2>MultiTier Discounts</h2>
          <p>
            Position rules, quantity breaks, Buy X Get Y, gifts and cart-value
            rewards in one Shopify app, applied at checkout with Shopify
            Functions.
          </p>
        </div>
        <TrackedLink
          className="button button-primary"
          href={multiTier.installUrl!}
          eventName="install_intent"
          eventData={{
            product: "multitier-discounts",
            placement: "resource_second_item_cta",
            destination: "shopify_app_store",
          }}
        >
          Install from Shopify
        </TrackedLink>
      </div>
    </ArticleLayout>
  );
}
