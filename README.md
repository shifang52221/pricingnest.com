# SaaS Pricing Toolkit (Astro + Cloudflare Pages)

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build output: `dist/`

## Cloudflare Pages

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables (optional):
  - `SITE_URL` (used for sitemap canonical URLs, e.g. `https://pricingnest.com`)
  - `PUBLIC_SITE_NAME`
  - `PUBLIC_SITE_URL`
  - `PUBLIC_ADSENSE_CLIENT` (e.g. `ca-pub-...`)
  - Ad slots (set to split units by placement; requires a new build/deploy to take effect):
    - `PUBLIC_ADSENSE_SLOT_HOME`
    - `PUBLIC_ADSENSE_SLOT_TOOLKIT`
    - `PUBLIC_ADSENSE_SLOT_TOOL`
    - `PUBLIC_ADSENSE_SLOT_USE_CASE`
    - `PUBLIC_ADSENSE_SLOT_DEFAULT` (fallback)
  - `PUBLIC_GA4_ID`
  - `PUBLIC_CONTACT_EMAIL` (e.g. `admin@pricingnest.com`)

## Before submitting to AdSense

- Update `public/ads.txt` with your real publisher line after approval.

### Deploy with Wrangler (optional)

```bash
npx wrangler pages deploy dist
```
