# Retained Core Strengthening Wave 2 Design

## Goal
- Strengthen the next retained bridge layer so four indexed support pages feel decision-oriented, curated, and clearly attached to core pricing workflows:
  - `value-metric-selection`
  - `saas-gross-margin-targets`
  - `api-call`
  - `annual-prepay-discount` glossary

## Why This Batch Exists
- The strict-contraction work reduced index bloat, and wave 1 strengthened the first retained support set nearest the core calculators.
- The next quality risk is not index width alone. It is that several retained bridge pages still read like checklist inventory or thin definitions, which can keep the site looking programmatic even after contraction.
- These four pages sit between core calculators and retained support clusters. If they stay thin, Google and users still see a site with shallow connective tissue. If they improve, the site looks more like a maintained pricing decision system.

## Current Problems

### `value-metric-selection`
- Still reads like a short checklist instead of a real decision page.
- Uses generic advice that could fit almost any SaaS site.
- Relies on weaker support such as `arpa` instead of concentrating on retained pricing-intent support.
- Does not yet show how to choose between customer value, cost alignment, buyer explainability, and packaging simplicity.

### `saas-gross-margin-targets`
- Has a stronger topic than many thin pages, but the body remains list-heavy and generic.
- Over-relies on broad finance phrases and weaker glossary support such as `cogs` and `unit-economics`.
- Does not clearly connect margin targets to calculator interpretation, segment differences, or buyer-facing pricing choices.

### `api-call`
- Is below the retained-core quality floor.
- Lacks retained trust metadata and sources.
- Reads like a dictionary stub instead of a practical interpretation page for API pricing.
- Needs to become the retained glossary support layer for request-based pricing, free-tier design, and overage interpretation.

### `annual-prepay-discount` glossary
- Has trust metadata and sources, but the body is still checklist-style.
- Still leans on weaker neighbors such as `annual-plan` and `mrr`.
- The guide version is already materially stronger, so the glossary page is now the weaker bridge in the annual pricing cluster.
- Needs to support annual discount interpretation without duplicating the stronger guide.

## Approaches Considered

### Option 1: Run another strict contraction wave first
- Pros: reduces index surface faster.
- Cons: does not strengthen the retained bridge pages that already occupy index slots and still look template-like.

### Option 2: Strengthen two retained guides and two retained glossary pages
- Pros: balances guide depth with glossary support, improves bridge quality without widening scope, and directly supports the retained calculator clusters.
- Cons: larger editorial batch than a single-cluster pass and requires link-discipline updates in tests.

### Option 3: Reopen only the annual discount and API cluster
- Pros: narrowest editorial scope and useful for two visible clusters.
- Cons: leaves `value-metric-selection` and `saas-gross-margin-targets` weak, which would keep an important pricing-strategy bridge thin.

## Chosen Approach
- Use Option 2.
- Keep the batch limited to four pages:
  - guides first: `value-metric-selection`, `saas-gross-margin-targets`
  - glossary second: `api-call`, `annual-prepay-discount`
- Treat `annual-prepay-discount` as glossary-first in this wave because the guide already functions as the stronger annual pricing decision page.
- Do not add new pages, widen the indexable surface, change URL structure, or reopen broad contraction in this batch.

## Page Design

### `value-metric-selection`
- Reframe it as a retained pricing-architecture decision page rather than a checklist.
- Required sections:
  - `## When value metric selection becomes a pricing problem`
  - `## Inputs to confirm before you lock the metric`
  - `## Where teams choose the wrong metric`
  - `## Value metric vs pricing metric vs packaging simplicity`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- Required themes:
  - buyer-visible value
  - cost alignment
  - segment fit
  - sales explainability
  - migration risk
- Link concentration:
  - keep links tight around retained terms such as `value-metric`, `pricing-metric`, and `usage-based-pricing`
  - reduce dependence on weaker support such as `arpa`

### `saas-gross-margin-targets`
- Reframe it as a retained decision-support page that helps teams pick a defensible margin range, not just repeat benchmark ranges.
- Required sections:
  - `## When gross margin targets shape pricing decisions`
  - `## Inputs to confirm before choosing a target range`
  - `## Where teams set the wrong margin target`
  - `## Margin target vs growth, pass-through costs, and packaging`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- Required themes:
  - segment differences
  - pass-through cost exposure
  - blended unit cost
  - self-serve versus enterprise economics
  - margin floor versus competitive pressure
- Link concentration:
  - keep support focused on retained terms and calculators that help validate margin assumptions
  - reduce dependence on `cogs` and `unit-economics`

### `api-call`
- Upgrade it from a definition stub to a retained glossary page that supports API pricing decisions.
- Required sections:
  - `## Definition`
  - `## Why it matters in pricing decisions`
  - `## How API calls affect plan design and margin protection`
  - `## How to use it with PricingNest tools`
  - `## Common interpretation mistakes`
  - `## Example`
- Required themes:
  - billable event boundaries
  - free tier design
  - rate limits and burst patterns
  - overage structure
  - buyer estimation clarity
- Trust requirements:
  - add `author`, `reviewedBy`, `reviewed`, and `sources`
- Link concentration:
  - support retained API pages and tools
  - avoid leaning on weaker guide inventory

### `annual-prepay-discount` glossary
- Keep glossary framing, but make it the retained interpretation layer that supports the stronger annual discount guide and calculator.
- Required sections:
  - `## Definition`
  - `## Why it matters in pricing decisions`
  - `## How annual prepay changes discount, retention, and cash flow interpretation`
  - `## How to use it with PricingNest tools`
  - `## Common interpretation mistakes`
  - `## Example`
- Required themes:
  - effective monthly rate
  - renewal behavior
  - segment guardrails
  - margin protection
  - annual versus monthly framing
- Link concentration:
  - support retained annual discount and commitment pathways
  - remove weaker neighbors such as `annual-plan`
  - keep overlap with the guide complementary rather than duplicative

## Testing Design

### Depth Tests
- Extend `tests/retained-guide-depth.test.mjs` with:
  - `value-metric-selection`
  - `saas-gross-margin-targets`
- Extend `tests/retained-glossary-depth.test.mjs` with:
  - `api-call`
  - `annual-prepay-discount`
- Use the retained-depth pattern already established in wave 1:
  - minimum word count
  - fixed retained-core headings
  - topic keyword coverage
  - tool and support-link minimums

### Trust Tests
- Extend `tests/glossary-trust-data.test.mjs` so `api-call` must meet retained glossary trust requirements.
- Reuse the same retained trust expectations for `annual-prepay-discount` where helpful, but do not widen trust requirements for pages outside this batch.

### Link-Concentration Tests
- Extend `tests/retained-link-concentration.test.mjs` so:
  - `value-metric-selection` no longer depends on `/glossary/arpa/`
  - `saas-gross-margin-targets` reduces dependence on `/glossary/cogs/` and `/glossary/unit-economics/`
  - `api-call` links to retained API pages or calculators rather than weak support inventory
  - `annual-prepay-discount` glossary no longer depends on `/glossary/annual-plan/`

### Standard Verification
- Run the wave-specific retained tests first.
- Then run the broader quality checks:
  - `site-quality-signals`
  - `template-quality`
  - `hub-curation`
  - `navigation-deduping`
  - `tool-trust-data`
  - `guide-trust-data`
  - `seo-meta`
  - `content-governance`
  - `recovery-retention-thresholds`
  - `build`
- Run `sitemap-governance` only after a fresh build.

## Out Of Scope
- No URL changes.
- No calculator formula changes.
- No new pages.
- No hub redesign.
- No new contraction wave in this batch.
- No push, merge, or production verification yet.

## Acceptance Criteria
- All four retained bridge pages become materially stronger and more decision-oriented.
- The annual discount glossary page becomes a support layer for the stronger guide instead of a thin duplicate.
- The API glossary layer becomes trust-backed and clearly useful to real pricing decisions.
- The guide pair relies more on retained-core support and less on weak glossary inventory.
- The batch improves quality and internal link discipline without widening the indexed surface.
