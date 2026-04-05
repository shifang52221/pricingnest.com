# API Pricing Structure Wave 13 Design

## Goal

Strengthen `/guides/api-pricing-model/` so it reads as a retained-core decision
page about when a simple API usage rate is enough and when the model needs
extra packaging structure such as a base fee, included usage, a visible rate
limit, or an overage path.

## Current evidence

- `api-pricing-model` is already retained and intentionally indexable.
- The page already has trust metadata, tool links, and glossary support, so the
  opportunity is not basic hygiene.
- The current guide is stronger than a thin API explainer, but it still reads
  too broadly:
  - when API pricing deserves its own model
  - inputs to confirm before you price
  - where API teams underprice
  - pricing options and trade-offs
- The retained-core queue explicitly calls out this page as a direct API
  pricing-intent page that should become stronger than the checklist-style API
  support inventory around it.
- The current page already sits near important API pricing layers:
  - `api-cost-estimation` explains request cost, vendor pass-through, and
    cost-per-call structure
  - `api-call` defines the billable unit
  - `rate-limit` defines fairness and burst guardrails
  - `api-pricing-model` should decide when those ingredients can still support
    one clean public usage rate and when they require stronger packaging
    structure
- The current guide does not yet make one practical decision explicit enough:
  when is a simple per-call or per-1,000-calls rate still honest enough to
  publish, and when do base fee, included usage, rate limit, or overage need
  to become part of the visible commercial structure?

## Core problem

This page occupies an important retained index slot, but it still behaves too
much like a broad API pricing article. That weakens both user value and
retained-core quality because the page should help the reader decide whether a
simple usage rate is enough, not merely explain that API pricing has multiple
inputs and trade-offs.

If this page stays broad:

- users still need to infer the packaging decision for themselves
- the page overlaps too loosely with `api-cost-estimation`
- the guide risks feeling like another reusable API pricing template instead of
  a maintained decision layer inside the site's API pricing cluster

## Approaches considered

### Option 1: Reframe it around usage rate versus packaging structure

Pros:

- best match for the retained-core queue
- creates a clearer role between API cost estimation and public pricing
  publication
- reduces template feel by focusing on one practical packaging decision
- helps align buyer clarity with margin protection

Cons:

- requires tighter retained-depth expectations
- needs sharper boundaries with broader API explainers

### Option 2: Reframe it around buyer estimation and fairness

Pros:

- strongly connected to customer experience
- easy to explain in pricing-page language

Cons:

- too easy to drift into generic UX or CRO advice
- weaker retained-core role than a true packaging decision page
- less clear separation from `value-metric-selection`

### Option 3: Reframe it around heavy-cohort risk and gross-margin protection

Pros:

- financially credible
- clearly useful for margin defense

Cons:

- overlaps too much with `api-cost-estimation`
- risks turning into another cost-model explainer instead of a packaging guide

## Recommendation

Use Option 1.

Keep `api-pricing-model` as the retained primary guide, but narrow it so the
page answers one practical question:

when is a single public API usage rate still commercially honest, and when do
base fee, included usage, rate limit, or overage need to become part of the
visible packaging structure so buyers can estimate spend and the business can
still protect gross margin?

That gives the page a more specific retained-core role and creates cleaner
boundaries with nearby pages:

- `api-cost-estimation` explains the cost structure behind API pricing
- `api-call` defines the billable unit
- `rate-limit` defines burst and fairness guardrails
- `api-pricing-model` decides what packaging structure the buyer actually needs
  to see once those ingredients are known

## Scope for this batch

- tighten the guide so it reads as a usage-rate versus packaging-structure
  decision page instead of a general API pricing explainer
- update retained-depth expectations so the page must explicitly cover:
  - `billable unit`
  - `base fee`
  - `included usage`
  - `rate limit`
  - `overage`
- extend retained link-concentration assertions so the guide must include:
  - `/guides/api-cost-estimation/`
  - `/guides/value-metric-selection/`
  - `/glossary/api-call/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
- keep the page away from weaker or broader support that dilutes the retained
  API cluster:
  - `/guides/api-free-tier-guardrails/`
  - `/guides/api-tier-design/`
  - `/guides/api-rate-limit-pricing/`
  - `/glossary/cogs/`
- rewrite the body around a tighter wave-13 structure:
  - when API pricing becomes a packaging-structure decision
  - inputs to confirm before you publish one API usage rate
  - where teams force one API rate across incompatible customer patterns
  - billable unit vs base fee vs included usage vs rate limit vs overage
  - how to interpret the calculator outputs
  - next steps

## Testing design

- Extend `tests/retained-guide-depth.test.mjs` so `api-pricing-model` must use
  the tighter wave-13 section headings and packaging-structure keywords.
- Extend `tests/retained-link-concentration.test.mjs` so the page must include
  stronger retained API support from:
  - `api-cost-estimation`
  - `value-metric-selection`
  - `api-call`
  - `rate-limit`
  - `overage`
- Keep `cogs` excluded and add the weaker API support inventory pages to the
  exclusion set.
- Use TDD:
  - update the tests first
  - run them and confirm they fail against the current broader page
  - then rewrite the guide
- Re-run targeted and broader quality tests plus build before any merge
  decision.

## Success criteria

- `api-pricing-model` clearly reads as a packaging-structure decision page
- the page helps teams decide when to keep one public API usage rate versus
  when to add:
  - a base fee
  - included usage
  - a visible rate limit
  - overage
- the guide has clearer retained boundaries with `api-cost-estimation`,
  `api-call`, and `rate-limit`
- retained support links become more concentrated on stronger API neighbors and
  glossary terms
- retained-core tests and build pass without widening the indexable surface

## Non-goals

- no new URLs
- no calculator formula changes
- no redesign
- no broader API cluster rewrite
- no index-status change for this page
- no reopening of weaker API support inventory in this batch
