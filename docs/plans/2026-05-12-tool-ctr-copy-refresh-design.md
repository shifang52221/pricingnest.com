# Tool CTR Copy Refresh Design

## Goal

Improve click-through rate for the three most commercially important tool pages that already have meaningful impressions:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`
- `storage-cost-calculator`

The intent is to strengthen SERP click appeal and reduce the gap between search-result promise and above-the-fold page copy.

## Why This Batch

The latest Search Console export for `2026-04-13` through `2026-05-10` shows that the site is no longer stuck at zero exposure. Google is actively testing the retained pricing pages, but clicks are not following:

- `usage-based-pricing-calculator` has the largest impression volume and a solid average ranking position, but zero clicks.
- `api-pricing-calculator` and `storage-cost-calculator` have enough visibility to justify immediate copy refinement.
- Core impressions are already concentrated on retained pages, so the next bottleneck is CTR and intent clarity rather than indexing volume.

## Scope

This batch intentionally stays narrow and low risk.

### In scope

- Update `description` in `src/lib/tools.ts` for the three target tools
- Update `metaTitle` in `src/lib/tools.ts` for the three target tools when the wording can become more click-oriented
- Update `metaDescription` in `src/lib/tools.ts` for the three target tools
- Add a targeted hero intro override in `src/pages/saas-pricing/[slug].astro` so the H1 is followed by a stronger promise for these three tools

### Out of scope

- No URL changes
- No structural layout changes
- No navigation changes
- No calculator logic changes
- No FAQ expansion in this batch
- No new pages

## Copy Strategy

### Usage-based pricing calculator

Current issue:

- Strong impression volume
- Average position is already good enough to earn clicks
- Existing wording reads correctly, but still sounds like a generic calculator description

Proposed direction:

- Emphasize that the page helps teams set a price floor
- Make the output feel immediately actionable
- Keep “usage-based pricing calculator” intact for topical match

### API pricing calculator

Current issue:

- The page matches API pricing intent, but the existing copy still reads more like internal modeling language than a search-result promise

Proposed direction:

- Lead with “price per 1,000 calls” and “monthly API plan”
- Make the calculator’s immediate use clearer
- Keep the copy grounded in cost plus margin language

### Storage cost calculator

Current issue:

- The page is relevant for “cost per GB” and “storage pricing” queries, but the wording can do more to connect storage cost inputs to a publishable price floor

Proposed direction:

- Surface “cost per GB-month” and “price floor” more directly
- Reinforce that users can compare archive vs request-heavy workloads
- Make the result feel usable for pricing decisions, not just estimation

## Implementation Notes

- Tool metadata lives in `src/lib/tools.ts`
- The tool page title and description are already wired to `getToolMetaTitle()` and `getToolMetaDescription()`
- The current hero section in `src/pages/saas-pricing/[slug].astro` uses shared copy; this batch should add a small per-tool override rather than fork the full template

## Success Criteria

The batch is successful if:

- All three target pages ship clearer, more click-oriented metadata
- The first paragraph below the H1 aligns with the updated search-result promise
- Build remains clean
- No non-target tool pages change behavior

## Verification

- Run `npm run build`
- Inspect the generated output for the three target pages
- Confirm the updated title and meta description render for:
  - `/saas-pricing/usage-based-pricing-calculator/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/saas-pricing/storage-cost-calculator/`
