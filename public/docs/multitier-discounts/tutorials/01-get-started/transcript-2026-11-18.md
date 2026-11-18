# Get Started with MultiTier Discounts on Shopify

## V01-S01 - Start with one clear offer

In this tutorial, we'll prepare your first MultiTier Discounts offer without turning it on before you're ready. Our example is simple: buy two Cobalt notebooks and save ten percent, or buy three and save fifteen percent. We'll choose the right plan, identify the storefront setup, and save an inactive campaign. A separate tutorial walks through the actual cart tests.

## V01-S02 - Choose a plan by campaign capacity

In Shopify Admin, open MultiTier Discounts and go to Plans and Billing.

Start with the offer you want to run. All plans include the standard campaign tools, including gifts and discount codes.

Choose by the number of campaigns you need active at once.

Free includes one active campaign for new stores. Starter includes ten. Pro and Plus have no app-level campaign cap.

Checkout mystery presentation is the exception: it requires MTD Plus and an eligible Shopify Plus store.

This is a development store. No paid subscription is active here.

Check your allowance in the app and review Shopify's terms before approving a paid plan.

## V01-S03 - Identify the storefront layer

Now identify the theme you're testing. A visible widget explains the offer; the campaign controls its discount rules. For our product example, we'll later add Quantity Tiers to the product template.

Gift Auto-Add appears separately under app embeds. It supports eligible gift behavior and is not the same thing as a visible quantity widget. You don't need to enable every block or embed for this first example. Keep advanced cart selectors at their defaults until you have a specific theme problem.

## V01-S04 - Prepare the campaign

Return to All Campaigns and create a new campaign. Choose Tiered discount. In Offer, give it a recognizable name and choose automatic execution with a percentage reward. In Conditions, choose Quantity Breaks and select only the Cobalt notebook. Leaving this product list empty broadens the scope.

In Rewards, set the two-unit minimum to ten percent and the three-unit minimum to fifteen percent. If you began with a recipe, check all prefilled values and remove any tiers you do not intend to use. These are quantities on a qualifying cart line, not second- and third-product positions.

## V01-S05 - Review and save inactive

Open Review and launch. Read the product scope, both tiers, schedule and combination rules. In Quantity and Sorting, set Maximum discounted quantity per product to zero, meaning unlimited, so every qualifying unit receives the rate. Check the store timezone before adding dates. For this first save, choose Save as inactive draft.

After saving, reopen the campaign and check that the selected product and both tiers are still correct. Closing an advanced panel does not clear its values. Preview can help explain the configuration, but it cannot replace a real cart and Shopify checkout test.

## V01-S06 - Define the test before activation

At eighteen dollars per notebook, our expected merchandise totals are eighteen dollars for one, thirty-two dollars and forty cents for two, and forty-five dollars and ninety cents for three. Those figures exclude tax, shipping and other discounts. Check your actual product price before using them.

Test below each threshold, at the threshold, and after removing items. Check an unrelated product too. Keep the campaign inactive until you're ready for that controlled test. The next tutorial shows the quantity-break setup and how to compare the expected calculation with the real result.
