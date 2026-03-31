# Retained Link Concentration Design

## Goal

Reduce the remaining low-quality / scaled-inventory signal by concentrating internal links around the retained core,
stopping retained pages from routing users into `noindex` support pages, and aligning the homepage and toolkit hubs with
the five strongest calculator workflows.

## Current evidence

- Core governance is stronger than before, but retained guide and glossary pages can still surface `noindex` resources
  in their sidebar navigation because the template currently trusts frontmatter links without checking robots state.
- The homepage and `/saas-pricing/` hub still promote some thinner support pages instead of repeatedly reinforcing the
  retained core.
- `SEO_PRIORITY_TOOL_SLUGS` is currently out of sync with the working recovery strategy by prioritizing
  `pricing-increase-impact-calculator` instead of `annual-discount-calculator`.
- Tool detail pages already support curated core-cluster links, but the curated set is not yet fully aligned with the
  retained decision layer we have been strengthening.

## Core problem

The site is now better governed, but the link graph still spreads attention too widely.

That creates two risks:

- Google can still interpret retained pages as entry points into a larger support inventory.
- Users can still fall out of the strongest pricing-decision path and into weaker side pages too early.

## Approaches considered

### Option 1: Only noindex more pages

This shrinks the public surface, but it does not fix the pages that still point readers toward the weaker layer.

### Option 2: Tighten the internal-link concentration around the retained core

Keep the current architecture, but:

- filter `noindex` related links out of guide and glossary sidebars
- align homepage and hub recommendations with retained pages
- correct priority-tool ordering and curated cluster links

This is the best next batch because it improves both UX and Google-facing site structure without another broad content
wave.

### Option 3: Redesign templates or navigation again

This is too broad for the current stage and would add implementation risk without directly solving the link-distribution
problem.

## Recommendation

Use Option 2.

Why:

- it removes a real governance leak in retained-page navigation
- it reinforces the smaller editorial core we want Google to see
- it keeps changes local to templates, hubs, and curated link data
- it avoids a broad rewrite

## Scope for this batch

- Filter guide and glossary related-link blocks so `noindex` guides and glossary terms do not appear in retained-page
  sidebars.
- Update homepage and `/saas-pricing/` hub pathways so they point more consistently at retained core pages.
- Refresh `/guides/` and `/glossary/` hub clusters so the strongest retained decision pages and retained glossary terms
  surface earlier.
- Correct `SEO_PRIORITY_TOOL_SLUGS` so the priority set matches the current five-core-tool recovery strategy.
- Tighten curated core-tool cluster links so the strongest calculators route readers into a smaller, stronger follow-up
  layer.

## Success criteria

- retained guide and glossary sidebars no longer surface `noindex` support pages
- homepage and toolkit hub links emphasize retained core pages more consistently
- guide and glossary hubs read more like curated editorial gateways than mixed inventories
- the tool priority set reflects the actual five-core-tool strategy
- core calculator clusters stay small, unique, and better aligned with retained pages

## Non-goals

- no content-model refactor
- no formula changes
- no broad redesign
- no new large content-production wave
