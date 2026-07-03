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

## Site diagnosis and monitoring

The project includes a lightweight audit workflow for search performance,
site health, and trust review.

### What we check

- Search Console exports for clicks, impressions, CTR, and ranking trends
- Core page experience on the main calculator and methodology pages
- Broken links, duplicate metadata, thin pages, and redirect issues
- Trust signals such as About, Contact, review dates, and source references

### Recommended cadence

- Weekly: check the core pages and link health
- Monthly: run the full crawl and compare against the previous review
- After each meaningful content batch: review GSC again after 2 to 4 weeks

### Current repo scripts

- `node scripts/seo-crawl.mjs`
  - crawls the site and writes baseline crawl artifacts into `audits/`
- `node scripts/seo-audit.mjs`
  - reads the crawl artifacts and generates page-level diagnostics
- `node scripts/audit.mjs`
  - checks build logic and content collection hygiene

### Working folders

- `audits/`
  - crawl exports, diagnostics, and dated review evidence
- `docs/reports/`
  - human-readable summary reports and appendix files for archiving

### Suggested report names

- `docs/reports/pricingnest-summary-YYYY-MM-DD.md`
- `docs/reports/pricingnest-audit-appendix-YYYY-MM-DD.md`

### Suggested monthly flow

1. Export the latest Google Search Console data and save the CSVs in a dated
   audit folder.
2. Run `node scripts/seo-crawl.mjs` to refresh crawl artifacts.
3. Run `node scripts/seo-audit.mjs` to generate issue tables and page metrics.
4. Run `node scripts/audit.mjs` to catch build or content-collection regressions.
5. Write a short summary report and store it under `docs/reports/`.

### Team checklist

Use this shorter checklist when the team needs a repeatable review routine.

- Keep the focus on user value, not on producing more pages.
- Check whether the page answers a real buying or pricing decision.
- Remove or merge low-value pages before adding new ones.
- Make sure About, Contact, review dates, and sources stay visible.
- Watch for signs that a page feels modular, repeated, or template-driven.
- Review titles and descriptions first when a strong page gets impressions but no clicks.
- Let GSC trends guide the next content batch instead of expanding blindly.
- Recheck the site 2 to 4 weeks after each meaningful update.

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
