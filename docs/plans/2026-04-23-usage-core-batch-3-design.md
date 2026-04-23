# Usage Core Batch 3 Design

## Goal

Run one narrow mixed batch that keeps shrinking low-value indexed guide inventory
 while turning the usage-based pricing path into a stronger retained-core route
 anchored on one guide, one calculator cluster, and a tighter homepage / hub
 surface.

## Why this batch exists

The latest Search Console export is dated `2026-04-23`, but the actual data
 window is `2026-03-24` through `2026-04-20` for `28` days of web search
 traffic. Across that window the site produced `845` impressions and `1`
 click at the page level. The strongest raw exposure still sits on API and
 storage calculator pages, but those URLs mostly remain in the `40-80` average
 ranking range.

Usage is the most credible next retained-core expansion because it already has
 signs of intent matching:

- `/guides/usage-based-pricing-examples/` showed `22` impressions at an average
  position of `7.09`
- `/guides/saas-metrics-cheat-sheet/` showed `23` impressions at an average
  position of `4.57`, but the page itself is highly template-like and does not
  behave like a retained pricing-decision page
- `/guides/monthly-cloud-cost-breakdown/` showed `11` impressions at an average
  position of `16.55`, so despite its thinner structure it still has enough live
  search signal that this batch should not remove it from the index yet

That combination suggests the next useful move is not broader publishing. It is
 a mixed contraction-and-strengthening batch:

- remove another very small set of inventory-like indexed guides
- promote one retained usage guide into a stronger decision page
- tighten the usage workflow exposed on the homepage, guides hub, and toolkit
  hub

## Scope

This batch is intentionally limited to three changes.

### 1. Guide governance wave 6

Move these indexed guides to `noindex,follow`:

- `saas-metrics-cheat-sheet`
- `unit-economics-model-template`
- `usage-cap-communication`
- `usage-pricing-onboarding`
- `usage-tier-breakpoints`

These pages are currently indexed, but they read more like inventory or
 checklist templates than retained decision pages. They also overlap the usage
 pricing path without being the strongest place to rank.

The expected result is reducing indexed guides from `60` to `55`.

### 2. One retained usage guide rewrite

Rewrite `usage-based-pricing-examples` so it stops acting like a list of
 examples and starts acting like a decision guide for when a usage-based model
 needs:

- a cleaner value metric
- included usage
- tiers
- overage structure
- a minimum commitment or platform floor

The page should become the bridge between:

- `usage-based-pricing-calculator`
- `tiered-usage-pricing-calculator`
- `value-metric-selection`
- `minimum-commitment-model`
- core usage glossaries such as `value-metric`, `usage-based-pricing`, and
  `overage`

### 3. Usage workflow re-curation

Tighten the usage path on:

- homepage
- guides hub
- toolkit hub
- usage calculator cluster support

The path should no longer read like "one more pricing calculator." It should
 read like a retained decision workflow for choosing a unit, pressure-testing
 buyer estimation, and deciding when to add structure around the raw unit price.

## Selected design choices

### Governance choice

Wave 6 stays narrow and only touches five guides. This keeps the batch focused
 and avoids reflexively removing pages that still show some live impression
 signal. `monthly-cloud-cost-breakdown` remains indexed for now because it has
 enough active search visibility to justify a later decision instead of being
 bundled into this usage-focused wave.

### Guide rewrite choice

`usage-based-pricing-examples` is the right retained target because it already
 has live ranking evidence, but the current body is still too generic. A
 stronger structure should make it more original and more useful to both users
 and search engines than the surrounding thinner usage-support pages.

### Hub and cluster choice

The usage calculator path should be tightened around:

- primary guide: `value-metric-selection`
- retained support guide: `usage-based-pricing-examples`
- commercial floor guide: `minimum-commitment-model`
- glossary support: `value-metric`, `usage-based-pricing`, `overage`

That chain is tighter than the current broader support mix and does a better
 job of connecting "what unit should we charge on" with "what packaging
 structure keeps the model honest."

## Proposed content shape for the rewritten usage guide

`usage-based-pricing-examples` should move to this retained decision-led
 structure:

- `## When usage pricing becomes a packaging-structure decision`
- `## Inputs to confirm before you publish a buyer-facing usage price`
- `## Where usage-based models create bill shock and margin leakage`
- `## Price per unit vs tiers vs included usage vs overage vs minimum commitment`
- `## How to interpret the calculator outputs`
- `## Next steps`

Required topic coverage should emphasize:

- value metric
- buyer estimation
- bill shock
- included usage
- overage
- minimum commitment
- fixed-cost recovery

## Non-goals

This batch should not:

- add new URLs
- widen into API or storage rewrites
- change calculator formulas
- reopen static use-case governance
- attempt a full sitewide IA redesign
- try to rescue every thin usage-support page with a rewrite

## Success criteria

The batch is successful if all of the following are true:

- indexed guides drop from `60` to `55`
- wave 6 governance is enforced in content governance and sitemap tests
- `usage-based-pricing-examples` passes stronger retained depth and link tests
- homepage, guides hub, and toolkit hub more clearly route users into the usage
  retained path
- `usage-based-pricing-calculator` uses a tighter retained support cluster
- the final diff stays limited to governance, one retained guide, hub curation,
  and one tool-cluster refresh
