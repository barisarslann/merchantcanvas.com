# MerchantCanvas

The website and production brand system for MerchantCanvas, an independent
product studio building focused Shopify apps.

Brand assets and usage guidance live in [`docs/brand`](docs/brand/README.md).
Production-ready SVG and PNG files live in [`public/brand`](public/brand).

> **Pre-launch:** The owner must perform a professional trademark/conflict check
> before the MerchantCanvas name or logo is used commercially. The visual review
> completed in this repository is not a legal clearance.

## Development

This site runs on vinext and requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm run build
npm test
```

## Optional public configuration

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_MULTITIER_INSTALL_URL`
- `NEXT_PUBLIC_B2B_QUOTE_INSTALL_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
- `NEXT_PUBLIC_META_PIXEL_ID`

Analytics integrations remain consent-gated. Product install calls to action
fall back to the contact flow when an install URL is not configured.

## Repository structure

- `app/` — website routes, shared components, metadata, and content
- `public/brand/` — active MerchantCanvas production identity
- `docs/brand/` — rationale, explorations, guidance, and visual proofs
- `.openai/hosting.json` — Sites deployment configuration
