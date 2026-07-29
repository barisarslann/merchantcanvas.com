# MerchantCanvas

The portfolio website and production brand system for MerchantCanvas, an
independent product studio building focused Shopify apps.

The site runs on vinext and is published through Cloudflare Pages. A static
Next.js export is used for the production deployment. Brand assets and usage
guidance live in [`docs/brand`](docs/brand/README.md); production SVG and PNG
files live in [`public/brand`](public/brand).

> **Pre-launch:** The owner must perform a professional trademark/conflict check
> before the MerchantCanvas name or logo is used commercially. The visual review
> completed in this repository is not a legal clearance.

## Local development

Use Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm test
```

The local development server defaults to `http://localhost:3000`.

## Deployment

The primary deployment uses the GitHub-connected Cloudflare Pages project:

- Build command: `npm run build:pages`
- Output directory: `out`
- Recommended Node version: `22.13.0` or newer

Copy the required public values from `.env.example` into Cloudflare Pages
environment variables before the production build. Values prefixed with
`NEXT_PUBLIC_` are intentionally shipped to the browser and must never contain
secrets.

## Public configuration

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_INSTALL_CONVERSION_LABEL`
- `NEXT_PUBLIC_META_PIXEL_ID`

The verified MultiTier Discounts App Store URL is source-controlled in the
product model. B2B Quote Approvals is coming soon and has no install URL.

## Analytics and attribution

GA4, Google Ads, and Meta Pixel are optional direct integrations. GTM is
intentionally unused in the first release. GA4 requires analytics consent;
Google Ads and Meta require advertising consent. The implementation preserves
common attribution parameters such as `utm_*`, `gclid`, and `fbclid`.

Supported intent events include:

- `view_product`
- `select_app`
- `contact_intent`
- `lead_submit`
- `install_intent`

The contact form is a static, accessible mail-client handoff. It does not claim
that a message was stored or transmitted by a server.

## Crawler policy

`public/robots.txt` allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User,
PerplexityBot, and ClaudeBot. It blocks GPTBot, CCBot, Bytespider, and
Google-Extended under the approved search/reference-without-training policy.
Cloudflare Managed robots prepend must remain disabled so this origin file is
the only delivered policy.

The site also ships:

- `public/sitemap.xml`
- `public/llms.txt`
- canonical URLs and social metadata
- Organization, SoftwareApplication, and Article structured data

`llms.txt` is a concise convenience summary for systems that choose to read it;
it is not treated as an access-control mechanism.

## Product evidence

Public claims were checked against the two sibling product repositories:

- `F:\Shopify\multi-tier-discounts`
- `F:\Shopify\b2b-quote-approvals`

The public site includes only verified capabilities and prices. MultiTier
Discounts uses approved product screenshots from its user-guide assets. B2B
Quote Approvals uses workflow diagrams and written UI descriptions because no
approved public screenshots were available. No fabricated ratings, reviews,
customer logos, install counts, or performance claims are included.

## Pre-launch owner checklist

- Connect the final custom domain and DNS records to the chosen production host.
- Confirm that the public contact address forwards to the right inbox.
- Add the official Shopify App Store or install URLs when they are live.
- Reconfirm every public price, trial period, limit, and package name.
- Replace or expand visuals only with approved real product screenshots or demos.
- Add customer proof only after permission and source verification.
- Complete legal review of the privacy notice, terms, consent wording, and
  trademark/conflict position.
- Add the production GTM, GA4, Google Ads, and Meta Pixel identifiers and confirm
  ownership of the associated analytics and advertising accounts.
- Run final production-domain checks for forms, consent, analytics events,
  canonical URLs, social previews, sitemap, and robots rules.

## Repository structure

- `app/` — routes, shared components, metadata, analytics, and content
- `public/brand/` — active MerchantCanvas production identity
- `public/images/` — verified product imagery
- `docs/brand/` — brand rationale, explorations, guidance, and visual proofs
- `tests/` — rendered-route, metadata, discovery-file, and asset checks
- `.openai/hosting.json` — Sites project and deployment metadata
