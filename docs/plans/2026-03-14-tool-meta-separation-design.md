# Tool Meta Separation Design

## Context

- Site performance export for the past 28 days (2026-02-12 to 2026-03-11) shows 562 impressions and 1 click.
- Search visibility is concentrated on five tool pages:
  - `usage-based-pricing-calculator`
  - `annual-discount-calculator`
  - `storage-cost-calculator`
  - `api-pricing-calculator`
  - `compute-cost-estimator`
- Current tool metadata couples page display copy and search-engine copy in the same `title` and `description` fields.
- This coupling is hurting both UX and SEO:
  - page headings become long and unnatural
  - search snippets can be steered toward the wrong queries, such as `"price per unit" "delta" "csv"`

## Goal

Separate page display copy from SEO copy for the five highest-priority tool pages while keeping the system simple enough to maintain across the toolkit.

## Non-Goals

- No URL changes
- No calculator logic changes
- No guide or glossary template changes
- No homepage or toolkit-index rewrite in this pass
- No schema type overhaul in this pass

## Recommended Model

Use a two-layer content model on tool definitions:

- `name`
- `description`
- `metaTitle`
- `metaDescription`

### Responsibilities

- `name`
  - User-facing title inside the site
  - Used for H1, cards, related-tools lists, breadcrumbs, and schema display name
- `description`
  - User-facing summary inside the site
  - Used for hero copy, cards, and related-tools summaries
- `metaTitle`
  - Search-facing title
  - Used only for `<title>` and social title tags
- `metaDescription`
  - Search-facing description
  - Used only for meta description and social description tags

## Why This Is The Best Option

### UX

- Page headings stay short and readable.
- Tool cards and related links stop displaying SEO-heavy titles.
- The page reads like a product/tool, not like a snippet template.

### SEO

- Search snippets can align to query intent without polluting page copy.
- Misleading terms such as `Delta & CSV` can be removed from SERP-facing copy while keeping useful on-page functionality.
- Page-level intent becomes clearer to Google and users.

### Maintainability

- The model is stronger than a single shared `title` field.
- The model is still much lighter than introducing separate fields for cards, hero, nav, and schema.
- Existing tools can continue working through fallback logic while only five tools are upgraded in this pass.

## Fallback Strategy

Existing tools that do not yet define the new fields should continue to render safely:

- `name` falls back to legacy `title`
- `metaTitle` falls back to legacy `title`
- `metaDescription` falls back to `description`

This keeps the rollout small and avoids changing all 23 tool records in one pass.

## Template Impact

### Tool Page

File: `src/pages/saas-pricing/[slug].astro`

- `<title>` must use `metaTitle`
- meta description must use `metaDescription`
- H1 must use `name`
- hero paragraph must use `description`
- breadcrumb display label must use `name`
- structured data display names should use `name`

`metaTitle` must not appear in page body content.

### Layout

File: `src/layouts/BaseLayout.astro`

- No architectural change is required
- The tool page must pass the correct `title` and `description` props into the layout

### Cards And Related Tools

Files:

- `src/components/ToolCard.astro`
- `src/pages/saas-pricing/[slug].astro`

All site-facing title displays should use:

- title: `name`
- summary: `description`

## Priority Tool Copy Mapping

### 1. `usage-based-pricing-calculator`

- `name`: `Usage-Based Pricing Calculator`
- `description`: `Estimate a margin-safe price per unit from monthly usage, unit cost, fixed overhead, and target gross margin.`
- `metaTitle`: `Usage-Based Pricing Calculator - Price per Unit | PricingNest`
- `metaDescription`: `Free usage-based pricing calculator to estimate a price per unit from monthly usage, unit cost, fixed cost, and target gross margin.`

Notes:

- Remove `Delta & CSV` from primary snippet language
- Re-center the page on `usage-based pricing` and `price per unit`

### 2. `annual-discount-calculator`

- `name`: `Annual Discount Calculator`
- `description`: `Convert a monthly price into annual pricing, annual prepay savings, and an effective monthly rate.`
- `metaTitle`: `Annual Discount Calculator - Annual Pricing | PricingNest`
- `metaDescription`: `Free annual discount calculator to convert a monthly price into annual pricing, annual prepay savings, and effective monthly rate.`

### 3. `storage-cost-calculator`

- `name`: `Storage Cost Calculator`
- `description`: `Estimate storage cost, request fees, and a target monthly storage price from your average stored GB and unit costs.`
- `metaTitle`: `Storage Cost Calculator - Price per GB | PricingNest`
- `metaDescription`: `Free storage cost calculator to estimate price per GB-month, request fees, and a target-margin monthly storage price.`

### 4. `api-pricing-calculator`

- `name`: `API Pricing Calculator`
- `description`: `Estimate API cost per 1,000 calls, monthly API cost, and a margin-safe monthly price from your call volume and overhead.`
- `metaTitle`: `API Pricing Calculator - Cost per 1,000 Calls | PricingNest`
- `metaDescription`: `Free API pricing calculator to estimate cost per 1,000 calls, monthly API cost, and a margin-safe monthly price.`

### 5. `compute-cost-estimator`

- `name`: `Compute Cost Estimator`
- `description`: `Estimate monthly compute cost from vCPU-hours, memory GB-hours, fixed overhead, and target gross margin.`
- `metaTitle`: `Compute Cost Estimator - vCPU & Memory Pricing | PricingNest`
- `metaDescription`: `Free compute cost estimator to model vCPU-hour and GB-hour costs and turn them into a margin-safe monthly price.`

## Testing Strategy

This pass must verify three layers:

### 1. Source Data

Update metadata regression coverage so the five target tools are checked for:

- `name`
- `metaTitle`
- `metaDescription`

### 2. Template Wiring

Add a regression test to verify:

- page display uses `name`
- hero copy uses `description`
- meta tags use `metaTitle` and `metaDescription`
- cards and related-tools entries use `name`

### 3. Build Verification

Run:

- metadata tests
- template regression tests
- `npm run build`

## Rollout

Ship all five tool updates together in one pass.

Reason:

- they already account for almost all search visibility
- they share the same architectural change
- partial rollout would make attribution noisier

## Post-Launch Evaluation

Watch for 2 to 4 weeks after deployment.

Primary signals:

- clicks on `annual-discount-calculator`
- clicks and CTR on `usage-based-pricing-calculator`
- reduction of off-target `delta / csv` query exposure
- emergence of more relevant long-tail queries for storage, API, and compute pages
