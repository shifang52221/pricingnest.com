# Wave 2 Governance And Retained Core Design

## Goal

Reduce the remaining "low-quality / scaled-template" risk by shrinking the indexable support-page surface, cleaning up
search intent on exposed calculator pages, and concentrating review/evidence signals on a smaller retained core.

## Current evidence

- The latest navigation de-templating batch is live on production:
  - guide detail pages show `Recommended next steps` and `Use the toolkit`
  - guide and glossary hubs show `How to use this hub`
  - the toolkit hub now uses `Next reads`
- Search Console data from the last 3 months still shows that the strongest exposure sits on a small calculator set:
  - `/saas-pricing/storage-cost-calculator/`
  - `/saas-pricing/usage-based-pricing-calculator/`
  - `/saas-pricing/compute-cost-estimator/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/saas-pricing/annual-discount-calculator/`
- The current site surface is still much larger than the retained, evidence-backed core:
  - 134 guide pages total
  - 96 glossary pages total
  - 44 guides already `noindex,follow`
  - 26 glossary pages already `noindex,follow`
  - only 8 guides currently expose `reviewedBy`
  - only 5 guides currently expose `sources`
  - only 8 glossary pages currently expose `reviewedBy` and `sources`
  - 21 calculator pages total, but only 5 currently expose full `reviewed + sources`
- Search-intent drift is visible in current query data:
  - `usage-based-pricing-calculator` is attracting `"delta csv"` queries because the title and description surface
    `Delta CSV Template`
  - that intent is weaker for PricingNest than direct pricing-model or unit-economics intent

## Core problem

The site's main SEO problem is not a lack of keywords.

The larger issue is that Google can still see too many indexable support pages relative to the number of clearly
reviewed, evidence-backed, high-intent retained pages. That imbalance makes the site easier to interpret as a large
templated content inventory instead of a smaller editorial pricing toolkit.

## Approaches considered

### Option 1: Keep the current index surface and add more pages

This would make the site broader, but it would worsen the trust-to-surface ratio. It increases the chance of looking
scaled before the retained core is strong enough.

### Option 2: Run a second governance wave and deepen the retained core

Use the current content system, but:

- noindex a second batch of repetitive or lower-value support pages
- clean up off-intent metadata on exposed calculator pages
- expand review and source coverage on the next retained guide/glossary layer
- keep the strongest calculator clusters as the center of gravity

This is the best balance between SEO recovery, user experience, and implementation risk.

### Option 3: Redesign architecture, templates, and hubs again

This could improve presentation, but it is too broad for the current recovery stage. The site needs concentration and
governance more than another redesign wave.

## Recommendation

Use Option 2 for the next batch.

Why:

- it directly addresses the remaining index-quality imbalance
- it keeps the site architecture stable
- it improves topical focus without adding content sprawl
- it strengthens the exact pages that already have the best chance to rank

## Five guide pages to strengthen next

These should become the next retained guide layer after the already strengthened core pages:

1. `src/content/guides/value-metric-selection.md`
2. `src/content/guides/minimum-commitment-model.md`
3. `src/content/guides/saas-gross-margin-targets.md`
4. `src/content/guides/price-per-gb-month-explained.md`
5. `src/content/guides/pricing-page-trust-elements.md`

Why these five:

- they connect directly to real pricing decisions, not just definitions
- they support the calculator clusters that already have the most search exposure
- they improve both SEO and on-site buyer confidence
- they are strong candidates for visible editorial review and source modules

## Glossary pages to strengthen next

Use a smaller supporting glossary layer that helps the retained guide set and core calculators:

1. `src/content/glossary/rate-limit.md`
2. `src/content/glossary/annual-prepay-discount.md`
3. `src/content/glossary/usage-based-pricing.md`
4. `src/content/glossary/churn.md`

## Candidate pages for Wave 2 noindex

These are the best next candidates because they read more like support inventory than retained destination pages:

### Guides

- `pricing-page-cta-optimization`
- `pricing-page-faqs`
- `pricing-page-unit-definition`
- `price-change-communication`
- `contract-minimums-messaging`
- `usage-reporting-dashboard`
- `usage-estimation-guide`
- `trial-usage-limit-design`
- `tier-naming-strategy`
- `plan-differentiation-matrix`

### Glossary

- `request`
- `renewal`
- `run-rate`
- `tcv`
- `pricing-page`
- `upsell`

## Scope for the next batch

- remove the off-intent `Delta CSV Template` metadata angle from the usage-based calculator
- add a second `noindex,follow` governance wave for selected repetitive guide/glossary pages
- expand `reviewedBy`, `reviewed`, and `sources` coverage on the next retained guide layer
- expand glossary evidence on the glossary terms most tightly connected to retained calculator clusters
- verify sitemap exclusion and production output after deployment

## Success criteria

- the indexable support-page surface is smaller and more curated
- the strongest calculator clusters point into a better-reviewed retained layer
- core ranking pages align more tightly to pricing intent and less to incidental `template / csv` intent
- sitemap output excludes the new noindex batch
- the site reads more like a maintained pricing toolkit than a broad support-page catalog

## Non-goals

- no broad site redesign
- no calculator formula changes
- no major content-model refactor
- no new large content-production wave
