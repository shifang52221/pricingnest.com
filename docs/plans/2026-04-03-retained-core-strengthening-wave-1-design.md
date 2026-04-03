# Retained Core Strengthening Wave 1 Design

## Goal
- Strengthen four retained indexed support pages so they read like human-maintained decision support, not thin template inventory:
  - `minimum-commitment-model`
  - `price-per-gb-month-explained`
  - `rate-limit`
  - `billing-cycle`

## Why This Batch Exists
- The strict-contraction batches reduced index bloat, but several retained pages still look too thin to justify their index slots.
- These pages sit close to core calculator clusters and can materially affect whether the site feels like a real pricing toolkit or a lightly edited glossary/checklist inventory.
- The best next move is not more index expansion and not broad redesign. It is to make a small set of retained pages stronger, more decision-oriented, and more tightly linked to the calculator clusters they support.

## Current Problems

### `minimum-commitment-model`
- Still reads like a checklist instead of a commitment-decision page.
- Uses weak support terminology such as `/glossary/contract-value/` instead of concentrating on stronger retained support terms.
- Needs clearer decision framing around when a minimum commitment is better than a platform fee, higher floor price, or annual-prepay packaging.

### `price-per-gb-month-explained`
- Still behaves more like a short explainer than a retained storage-pricing guide.
- Links to weaker glossary support such as `/glossary/storage-costs/` and `/glossary/cogs/`.
- Does not yet carry enough decision value around request-heavy workloads, retrieval-sensitive pricing, replication, backup overhead, or when storage pricing should split charges.

### `rate-limit`
- Has trust metadata, but the body is still too thin for a retained glossary support term.
- Still points to `/guides/api-rate-limit-pricing/`, which is now a `noindex,follow` support page.
- Needs to act as the retained explanation layer for API pricing guardrails after broader contraction.

### `billing-cycle`
- Is still a thin glossary page with no retained trust metadata or sources.
- Still leans on weaker guide and glossary neighbors such as `billing-cycle-selection`, `annual-renewal-strategy`, and `annual-plan`.
- Needs to support annual discount, minimum commitment, and pricing interpretation decisions, not just define monthly versus annual billing.

## Approaches Considered

### Option 1: Strengthen only the two guides
- Pros: smallest content batch, quickest visible depth improvement.
- Cons: leaves retained glossary support too thin and weak around annual/API interpretation.

### Option 2: Strengthen two guides plus two glossary pages
- Pros: balances guide depth with glossary support, improves retained-core credibility without widening scope.
- Cons: slightly larger test surface and more link-concentration rules to maintain.

### Option 3: Add `value-metric-selection` to the batch
- Pros: touches a very important bridge page.
- Cons: batch grows too wide and starts mixing “needs strengthening soon” with “already fairly strong.”

## Chosen Approach
- Use Option 2.
- Keep the batch limited to four pages:
  - guides first: `minimum-commitment-model`, `price-per-gb-month-explained`
  - glossary second: `rate-limit`, `billing-cycle`
- Do not change formulas, URLs, hub structure, or governance in this batch.
- Do not reopen weaker `observe-for-now` or `noindex` pages just to support these four pages.

## Page Design

### `minimum-commitment-model`
- Rewrite as a true cross-cluster decision page.
- Required sections:
  - `## When minimum commitments are the right pricing tool`
  - `## Inputs to confirm before you set a commitment`
  - `## Where minimum commitments go wrong`
  - `## Commitment vs platform fee vs included usage`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- Required themes:
  - platform fee versus contracted floor
  - billing cycle effects
  - annual prepay interaction
  - gross-margin protection
  - low-usage account economics
- Link concentration:
  - keep or strengthen links to retained support such as `billing-cycle`, `minimum-commitment`, `pricing-metric`
  - remove weaker glossary dependence such as `contract-value`

### `price-per-gb-month-explained`
- Rewrite as the main retained explainer for storage pricing communication.
- Required sections:
  - `## When price per GB-month is a useful buyer-facing metric`
  - `## Inputs to confirm before publishing a storage price`
  - `## Where storage teams underprice`
  - `## When to separate request, retrieval, or replication charges`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- Required themes:
  - request-heavy workloads
  - retrieval-sensitive pricing
  - replication overhead
  - backup cost
  - base fee or minimum commitment
- Link concentration:
  - keep storage-calculator support tight
  - replace weaker glossary references such as `storage-costs` and `cogs` with retained support terms like `gb-month`, `unit-cost`, `gross-margin`, or `overage` where appropriate

### `rate-limit`
- Keep glossary framing, but make it a retained API guardrail page rather than a simple definition.
- Required sections:
  - `## Definition`
  - `## Why it matters in pricing decisions`
  - `## How rate limits affect plan design and margin protection`
  - `## How to use it with PricingNest tools`
  - `## Common interpretation mistakes`
  - `## Example`
- Required themes:
  - burst traffic
  - fairness
  - error budget
  - overage path
  - buyer expectation
- Link concentration:
  - support retained API pages and tools
  - remove reliance on `api-rate-limit-pricing`

### `billing-cycle`
- Upgrade from a thin glossary definition to a retained annual-versus-monthly interpretation page.
- Required sections:
  - `## Definition`
  - `## Why it matters in pricing decisions`
  - `## How billing cycle changes discount, churn, and cash flow interpretation`
  - `## How to use it with PricingNest tools`
  - `## Common interpretation mistakes`
  - `## Example`
- Required themes:
  - monthly versus annual
  - cash flow
  - renewal behavior
  - effective monthly rate
  - MRR interpretation
- Trust requirements:
  - add `author`, `reviewedBy`, `reviewed`, and `sources`
- Link concentration:
  - support retained annual and commitment decisions
  - remove dependence on weaker annual-plan and noindexed billing-cycle support pages

## Testing Design

### Depth Tests
- Extend `tests/retained-guide-depth.test.mjs` with `minimum-commitment-model` and `price-per-gb-month-explained`.
- Extend `tests/retained-glossary-depth.test.mjs` with `rate-limit` and `billing-cycle`.
- Use the existing retained-depth pattern:
  - minimum word count
  - fixed retained-core headings
  - keyword coverage
  - tool / guide / glossary link minimums

### Trust Tests
- Extend `tests/glossary-trust-data.test.mjs` so `billing-cycle` must carry the same retained trust structure as the stronger glossary pages.

### Link-Concentration Tests
- Extend `tests/retained-link-concentration.test.mjs` to ensure:
  - `minimum-commitment-model` stops depending on weaker glossary support such as `/glossary/contract-value/`
  - `price-per-gb-month-explained` stops depending on weaker glossary support such as `/glossary/storage-costs/` and `/glossary/cogs/`
  - `rate-limit` no longer depends on `/guides/api-rate-limit-pricing/`
  - `billing-cycle` links to retained annual / commitment pathways instead of weaker support pages

### Standard Verification
- Run the retained-page tests first.
- Then run broader site quality checks:
  - `site-quality-signals`
  - `template-quality`
  - `hub-curation`
  - `navigation-deduping`
  - `tool-trust-data`
  - `build`
- If sitemap verification is run, it must happen after a fresh build because it reads generated `dist` files.

## Out Of Scope
- No URL changes.
- No calculator formula changes.
- No hub redesign.
- No new pages.
- No additional contraction wave in this batch.
- No reopening of weak `observe-for-now` content.

## Acceptance Criteria
- All four pages are materially stronger and more decision-oriented.
- The strengthened pages rely more on retained-core neighbors and less on weak/noindexed support pages.
- The batch improves quality without expanding the indexed surface.
- The updated pages look curated and purposeful rather than template-generated.
