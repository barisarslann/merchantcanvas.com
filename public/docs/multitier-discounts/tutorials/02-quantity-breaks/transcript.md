# Quantity breaks: set up and verify your first offer

## V02-S01 - The offer

Let's build a quantity break with MultiTier Discounts, using our Fieldnote demo store.

The Cobalt notebook costs eighteen dollars. Two units receive ten percent off. Three or more receive fifteen percent off.

We'll review the setup, then check the product widget, cart and actual checkout. We won't place an order.

## V02-S02 - Offer

From All Campaigns, choose Create New Campaign, then the Quantity breaks starter.

Give the offer a clear name. Use Automatic execution and a percentage discount for this example.

A recipe only fills in starting values. It doesn't save or activate a campaign, so review every step before publishing.

## V02-S03 - Conditions

In Conditions, choose Quantity Breaks and select only the Cobalt notebook in Products.

Confirm the picker and wait for the selected product summary. Leaving this optional filter empty would make the offer broader.

Quantity breaks evaluate each qualifying cart line separately. Two different products with one unit each do not make a two-unit line.

Use a price-position offer instead when you want separate rewards on the second and third product.

## V02-S04 - Rewards

In Rewards, set the first minimum quantity to two and its discount to ten percent.

Set the next minimum to three and its discount to fifteen percent. Remove unused recipe tiers.

These numbers are quantity thresholds, not product positions. The highest matching tier wins; ten and fifteen percent are not added together.

At three units, all three notebooks receive the fifteen-percent rate when discounted quantity is unlimited.

## V02-S05 - Review and save

In Review and launch, check the selected product, both tiers, schedule and combination settings.

In Quantity and Sorting, zero means unlimited discounted units per line. Keep the test free of other discounts.

Save as an inactive draft, then reopen it to confirm the selection and tier values persisted.

Our new draft stays inactive. The storefront demonstration uses the existing identical demo offer, so we don't enable two overlapping campaigns.

## V02-S06 - Product widget

Open the Cobalt product in the demo theme. Quantity Tiers shows the offer beside the purchase controls.

One unit is eighteen dollars. At two units, the total is thirty-two dollars and forty cents.

Choose three units. Fifteen percent off fifty-four dollars saves eight dollars and ten cents, leaving forty-five dollars and ninety cents.

The widget explains the offer, but the cart and checkout must confirm the real result. Add three notebooks.

## V02-S07 - Cart and checkout

In the cart, confirm three Cobalt notebooks, eight dollars and ten cents saved, and forty-five dollars and ninety cents in merchandise.

Continue to checkout and compare the same product, quantity, discount and merchandise amount.

Tax and delivery may be separate. Opening checkout is a test, not a completed order. Don't enter payment details for this walkthrough.

## V02-S08 - Check removal and scope

Return to the cart and reduce the qualifying line to one. Its quantity discount should disappear.

Remove the notebook and test the Coral product outside the selected scope. This offer must not discount Coral.

Finish with an empty test cart. Your own launch checks should also cover four units, split lines, mobile, and any codes or markets you intend to support.

Use the written quantity-break guide to repeat these checks. Only activate your own offer once its real cart and checkout match the promise.
