# Create a gift offer and enable Gift Auto-Add

## V05-S01 - A gift with purchase

Let's create a gift with purchase in the Fieldnote demo store. Spend fifty dollars and receive one Sun notebook free.

We will build the campaign, enable Gift Auto-Add in an unpublished theme, and check the real cart and checkout.

## V05-S02 - Choose the offer and conditions

Choose New campaign, then Gift offer. Give the campaign a descriptive name and keep it automatic, so shoppers do not need a discount code.

In Conditions, choose Cart value. This example uses the store's U.S. dollar currency. Leave extra targeting and restrictions unchanged for this first test.

If you later sell in other currencies or combine offers, configure and test those rules separately. A working U.S. dollar example is not a check of every market.

## V05-S03 - Select the free gift and save a draft

In Rewards, set the minimum cart amount to fifty dollars and the gift discount to one hundred percent. Select the Sun notebook as the gift.

Use a fixed quantity of one and enable automatic gift addition. We are giving one configured product, not every product in a pool.

Leave Mystery Gift off for this walkthrough. Review the conditions and reward, then save as an inactive draft while you prepare the theme.

## V05-S04 - Enable the Gift Auto-Add embed

In Online Store, open Themes and edit the theme you want to test. We are using a disposable unpublished copy, leaving the original demo theme unchanged.

Open App embeds and enable Gift Auto-Add, then save. This is an app embed, not the Quantity Tiers or Cart Progress block.

Preview this same theme. The embed adds an eligible gift; the campaign defines when it qualifies and how it is discounted. Both the theme setup and the active campaign are needed.

## V05-S05 - Activate and test below and above the threshold

Return to the saved draft and activate this test campaign. Start with an empty cart in the theme preview.

Two Coral notebooks cost forty-eight dollars, below our fifty-dollar minimum. No free gift should appear.

Increase the paid quantity to three. The purchase is now seventy-two dollars. One Sun notebook should be added automatically, without pressing checkout, and its final price must be free.

## V05-S06 - Check the real checkout

Open checkout and confirm three Coral notebooks and one free Sun notebook. The merchandise amount remains seventy-two dollars, with twelve dollars saved on the gift.

Check the real product quantities as well as the totals. Delivery and taxes may be separate. We do not enter customer or payment details, and we do not place an order.

## V05-S07 - Check removal and finish safely

Return to the cart and remove the free gift. For this unchanged purchase, it should stay removed, including after a refresh. The app respects that choice.

Now change the qualifying purchase by adding another Coral notebook. This new eligible cart can receive one gift again. It must not create duplicate gifts or a refresh loop.

Remove the qualifying purchase and confirm its gift is cleaned up. Repeat the add and removal check, then leave the cart empty.

Keep your own theme unpublished until these checks pass. Our temporary campaign and recording theme are removed after filming; the original demo remains unchanged.
