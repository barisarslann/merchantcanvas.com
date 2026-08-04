# MultiTier Discounts Meta pilot checklist

**Updated:** 2026-08-04
**State:** Setup authorized; spend and launch remain locked
**Account settings:** USD, UTC
**Pilot markets:** United States, United Kingdom, Canada, Australia
**Hard ceiling:** No more than 1,600 TRY equivalent over seven days

## Owner tasks

- [x] Approve USD as the permanent Meta ad-account currency.
- [x] Approve UTC as the permanent Meta reporting time zone.
- [x] Authorize creation of the zero-spend Meta account, Page, domain, and
  Dataset/Pixel assets.
- [ ] Add the virtual card directly in Meta Billing & payments. Never place card
  details in chat, Git, or this file.
- [ ] Give final business-owner approval to the Privacy page.
- [ ] Give final business-owner approval to the Terms page.
- [ ] Review and approve the final paused campaign preview.
- [ ] Explicitly authorize launch after tracking and billing gates pass.

## Codex tasks

- [x] Create the MerchantCanvas Meta ad account in USD and UTC.
- [x] Confirm the account has no payment method and cannot spend yet.
- [x] Create or attach the public MerchantCanvas Facebook Page.
- [ ] Add and verify `merchantcanvas.com` as the business domain.
- [x] Create the MerchantCanvas Dataset/Pixel and connect it to the ad account.
- [ ] Configure the Pixel through the existing advertising-consent gate.
- [ ] Verify no Meta request occurs before advertising consent.
- [ ] Verify one PageView and one PII-free `InstallIntent` after advertising
  consent, with no duplicate event.
- [ ] Reconfirm GA4 property reporting before launch.
- [ ] Convert the 1,600 TRY ceiling to USD at activation time and round down.
- [ ] Create one campaign, one ad set, and two ads in paused state.
- [ ] Confirm Google Ads and Shopify App Store Ads remain disabled.
- [ ] Present the final paused preview and measurement contract to the owner.

## Pilot guardrails

- [x] `install_intent` is reported separately from a completed Shopify install.
- [x] Completed installs, uninstalls, and paid-plan activations use Shopify
  Partner Dashboard evidence.
- [x] No incentivized reviews, fabricated proof, or unverifiable claims.
- [x] Stop for tracking failure, policy rejection, or unsafe billing behavior.
- [x] Pause for diagnosis at 800 TRY if there is no verified InstallIntent.
- [x] Never exceed the seven-day 1,600 TRY-equivalent lifetime ceiling.
