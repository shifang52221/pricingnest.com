# SEO Snippet Lift for Top 5 Tool Pages

## Context
- 28-day GSC export shows 377 impressions, 3 clicks, CTR 0.8%, avg position 29.42.
- Most impressions concentrate on tool pages, with CTR lagging even when ranking ~10-15.

## Goals
- Improve CTR on the 5 highest-impression tool pages.
- Align title/description/hero copy with observed query intent.
- Keep structure, URLs, and functionality stable to reduce risk.

## Non-Goals
- No URL changes, template restructuring, or new pages.
- No schema or internal-link overhaul in this pass.
- No changes to tool logic or inputs/outputs.

## Scope
Target pages (5):
- `storage-cost-calculator`
- `usage-based-pricing-calculator`
- `api-pricing-calculator`
- `compute-cost-estimator`
- `annual-discount-calculator`

## Options Considered
1) Title/description only (low effort, smaller impact)
2) Title/description + first hero sentence tweak (recommended)
3) Add schema + internal-link adjustments (higher impact, larger scope)

## Selected Approach
Option 2: update tool `title` and `description` for the five pages, which also updates the hero summary in the tool page template. This is the best balance of speed and CTR improvement.

## Design Details
- **Titles**: 50–60 chars, include primary keyword + "calculator", keep brand suffix `| PricingNest`.
- **Descriptions**: 120–155 chars, include "Free" and "CSV export" where relevant, match query intent (e.g., price per unit, cost per GB).
- **Hero copy**: uses tool `description` as the first paragraph; adjust to reflect exact query intent.

## Implementation Notes
- Tool titles/descriptions are defined in `src/lib/tools.ts`.
- Tool page meta tags are generated in `src/pages/saas-pricing/[slug].astro` and `src/layouts/BaseLayout.astro`.

## Success Criteria
- CTR improvement on the 5 target pages after 2–4 weeks.
- No regressions in crawlability or indexing.

## Risks & Mitigations
- **Risk**: Over-optimization or mismatched intent.  
  **Mitigation**: Keep copy accurate and specific to tool behavior.
- **Risk**: CTR change delayed.  
  **Mitigation**: Monitor weekly; adjust only if metrics remain flat after 4 weeks.

## Rollback
- Revert tool `title`/`description` values in `src/lib/tools.ts`.
