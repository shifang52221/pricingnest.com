# Retained Core Strengthening Wave 3 Design

## Goal
- Strengthen the next retained API and retention bridge layer so three indexed support pages read like curated decision support instead of checklist or KPI inventory:
  - `api-pricing-model`
  - `usage-based-pricing`
  - `churn`

## Why This Batch Exists
- Wave 1 and wave 2 strengthened several retained bridge pages around commitment, storage, annual discount, and metric selection.
- The next visible quality gap is the API cluster and the retained glossary support around usage and retention. These pages still sit inside the indexed surface but read thinner than the retained pages around them.
- If these pages stay shallow, the site still looks like a mixed-quality inventory even after contraction. Strengthening them keeps the retained core smaller and more defensible without widening scope.

## Current Problems

### `api-pricing-model`
- Still reads like a quick checklist rather than a retained guide.
- Has no retained trust metadata or source block.
- Still relies on weaker glossary support such as `cogs`.
- Does not yet act like the main retained API pricing interpretation page, especially now that `api-call` and `rate-limit` are stronger than the guide around them.

### `usage-based-pricing`
- Still behaves like a generic model definition plus checklist.
- Leans on weaker guide neighbors such as `usage-mix-modeling`, which is already `noindex,follow`.
- Needs to become the retained glossary support page that helps users interpret unit choice, included usage, bill shock, and tier behavior across the calculator cluster.

### `churn`
- Still reads like a KPI definition page rather than a retained pricing-support term.
- Leans on weaker or `noindex` guide neighbors such as `churn-survey-insights` and `annual-renewal-strategy`.
- Needs to support annual pricing, price-increase risk, retention trade-offs, and LTV interpretation without turning into a generic metrics glossary entry.

## Approaches Considered

### Option 1: Strengthen all four recommended pages, including `bandwidth-pricing-guide`
- Pros: broader visible progress.
- Cons: mixes in a bandwidth bridge page before the unified bandwidth batch is pushed and live-verified.

### Option 2: Strengthen one guide plus two glossary terms in the API and retention bridge layer
- Pros: keeps scope narrow, addresses the clearest retained-core gaps, and respects the decision to keep bandwidth separate until after live verification.
- Cons: leaves the bandwidth bridge untouched for now.

### Option 3: Strengthen only `api-pricing-model`
- Pros: smallest batch.
- Cons: leaves two high-value retained glossary terms under-strengthened and keeps API support stronger than the usage/retention interpretation layer around it.

## Chosen Approach
- Use Option 2.
- Keep the batch limited to:
  - guide: `api-pricing-model`
  - glossary: `usage-based-pricing`, `churn`
- Do not add new pages, change URLs, reopen another contraction wave, or pull `bandwidth-pricing-guide` into this batch.

## Page Design

### `api-pricing-model`
- Rewrite it as the retained API pricing decision page.
- Required sections:
  - `## When API pricing deserves its own model`
  - `## Inputs to confirm before you price`
  - `## Where API teams underprice`
  - `## Pricing options and trade-offs`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- Required themes:
  - billable unit boundaries
  - free tier versus paid entry
  - base fee versus pure usage pricing
  - rate-limit and overage pathways
  - vendor pass-through exposure
- Trust requirements:
  - add `author`, `reviewedBy`, `reviewed`, and `sources`
- Link concentration:
  - focus on retained support such as `api-call`, `rate-limit`, `usage-based-pricing`, and `gross-margin`
  - remove weaker glossary dependence such as `cogs`

### `usage-based-pricing`
- Upgrade it from a broad definition page into retained glossary support for unit-based monetization decisions.
- Required sections:
  - `## Definition`
  - `## Why it matters in pricing decisions`
  - `## How usage-based pricing changes packaging and margin protection`
  - `## How to use it with PricingNest tools`
  - `## Common interpretation mistakes`
  - `## Example`
- Required themes:
  - value metric fit
  - included usage
  - overage design
  - bill shock risk
  - segment predictability
- Link concentration:
  - support retained usage pages and calculators
  - remove reliance on `usage-mix-modeling`

### `churn`
- Upgrade it from a metrics glossary stub into retained glossary support for pricing-risk interpretation.
- Required sections:
  - `## Definition`
  - `## Why it matters in pricing decisions`
  - `## How churn changes pricing, retention, and expansion interpretation`
  - `## How to use it with PricingNest tools`
  - `## Common interpretation mistakes`
  - `## Example`
- Required themes:
  - logo versus revenue churn
  - pricing-change risk
  - annual commitment and renewal behavior
  - segment differences
  - LTV sensitivity
- Link concentration:
  - support retained annual and pricing-impact pathways
  - remove weaker dependencies such as `churn-survey-insights` and `annual-renewal-strategy`

## Testing Design

### Depth Tests
- Extend `tests/retained-guide-depth.test.mjs` with:
  - `api-pricing-model`
- Extend `tests/retained-glossary-depth.test.mjs` with:
  - `usage-based-pricing`
  - `churn`
- Use the retained-core depth pattern:
  - minimum word count
  - fixed retained headings
  - keyword coverage
  - calculator / guide / glossary link minimums

### Trust Tests
- Extend `tests/guide-trust-data.test.mjs` so `api-pricing-model` must carry retained guide source metadata.
- `usage-based-pricing` and `churn` already sit in retained glossary trust coverage, so this batch should preserve and strengthen that trust shape rather than widen it further.

### Link-Concentration Tests
- Extend `tests/retained-link-concentration.test.mjs` so:
  - `api-pricing-model` includes `/glossary/api-call/`
  - `api-pricing-model` includes `/glossary/rate-limit/`
  - `api-pricing-model` does not include `/glossary/cogs/`
  - `usage-based-pricing` includes `/guides/value-metric-selection/`
  - `usage-based-pricing` includes `/saas-pricing/usage-based-pricing-calculator/`
  - `usage-based-pricing` does not include `/guides/usage-mix-modeling/`
  - `churn` includes `/guides/annual-prepay-discount/`
  - `churn` includes `/saas-pricing/pricing-increase-impact-calculator/`
  - `churn` does not include `/guides/churn-survey-insights/`
  - `churn` does not include `/guides/annual-renewal-strategy/`

### Standard Verification
- Run the wave-specific retained tests first.
- Then run the broader quality and governance checks:
  - `site-quality-signals`
  - `template-quality`
  - `hub-curation`
  - `navigation-deduping`
  - `tool-trust-data`
  - `guide-trust-data`
  - `glossary-trust-data`
  - `seo-meta`
  - `content-governance`
  - `recovery-retention-thresholds`
  - `build`
- Run `sitemap-governance` only after the fresh build.

## Out Of Scope
- No URL changes.
- No new pages.
- No formula changes.
- No new contraction wave.
- No bandwidth guide work in this batch.
- No push, merge, or live-site verification.

## Acceptance Criteria
- `api-pricing-model` becomes a retained guide with clear decision depth and trust signals.
- `usage-based-pricing` becomes a stronger retained glossary support page for usage-based packaging decisions.
- `churn` becomes a stronger retained glossary support page for pricing and retention trade-offs.
- All three pages rely more on retained-core neighbors and less on weak or `noindex` support inventory.
- The batch improves retained-core quality without expanding the indexed surface.
