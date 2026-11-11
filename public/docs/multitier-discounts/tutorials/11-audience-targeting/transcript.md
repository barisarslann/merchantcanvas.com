# Configure Product and Audience Targeting

## V11-S01 - Distinguish item scope from audience

Targeting answers two questions: which merchandise qualifies, and which shopper may receive the offer? Our example uses Coral as the trigger and a twenty-percent Sun reward. In Conditions, select the product; in Rewards, choose the separate target. This demo selects whole products. When a product has multiple variants, expand the picker for exact SKU choices. Whole-product scope can include future variants, while an exact-variant selection remains restricted to its configured IDs.

## V11-S02 - Use a customer tag deliberately

Open Audience Targeting in Review and launch. Add the synthetic customer tag education-vip. This only configures a filter; it does not create a customer or assign that tag to anyone. Tagged customer eligibility requires the relevant signed-in customer context. Product tags classify merchandise; customer tags restrict shoppers. An empty audience filter means everyone, not nobody, so review it before saving a public offer.

## V11-S03 - Include is not exclude

Keep Include selected countries and select United States. That is different from excluding the United States and allowing other countries. The example now requires both the intended merchandise and this audience context. A shopper using U.S. dollars is not proof that they are browsing from the United States. Currency thresholds, country filters and a final delivery address are distinct checks; do not substitute one for another.

## V11-S04 - Reopen and test positive and negative cases

Save inactive and reopen the audience section. Confirm education-vip, United States and Include mode, as well as the trigger and reward selections. This video verifies the stored filter, not a real customer login or delivery change. Before launch, test a matching customer, a nonmatching customer and a signed-out session, plus allowed and excluded countries. Recheck after a market switch and compare the final checkout. Keep public messages consistent with all these restrictions.
