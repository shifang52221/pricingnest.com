# Rate Limit Packaging Wave 14 Design

## Goal

Strengthen `/glossary/rate-limit/` so it reads as a retained API support term
about when a rate limit must become a buyer-visible packaging rule instead of
remaining a hidden engineering guardrail.

## Current evidence

- `rate-limit` is already part of the retained glossary surface and remains
  intentionally indexable.
- The page already has explicit trust metadata, sources, and support links, so
  the problem is not basic glossary hygiene.
- The current glossary entry is solid but still leans too much toward a
  general API operations explanation:
  - request cap definition
  - fairness and margin protection
  - error budget protection
  - overage awareness
- `api-pricing-model` was tightened in wave 13 into a retained-core decision
  page about when one public API usage rate is enough and when packaging
  structure must do more visible commercial work.
- That makes `rate-limit` a more important support term than before because the
  guide now depends on `rate-limit` as part of the visible packaging structure,
  not only as an infrastructure safeguard.
- The current glossary entry still under-explains one practical pricing
  decision:
  - when a limit can stay in internal operating policy
  - and when it must become part of the buyer-visible commercial promise

## Core problem

This glossary entry occupies an important retained index slot, but it still
behaves too much like a clean technical explainer. That weakens retained-core
 quality because the API pricing cluster now needs the page to clarify when a
rate limit changes the buyer's packaging expectation, upgrade path, and trust.

If this page stays broad:

- the API cluster still depends on a partially generic glossary term
- the difference between billable unit and throughput guardrail stays too fuzzy
- the site keeps a more templated feel in one of the most reusable SaaS/API
  topics Google can judge as low-value

## Approaches considered

### Option 1: Reframe it around engineering guardrail versus visible packaging rule

Pros:

- best fit for the retained-core API pricing chain
- creates a clearer support role for `api-pricing-model`
- reduces template feel by centering one practical commercial decision
- makes buyer expectation and margin fairness more explicit

Cons:

- requires tighter glossary expectations
- needs stronger boundaries with broader API pricing inventory

### Option 2: Reframe it around throttling, reliability, and error budgets

Pros:

- technically credible
- easy to explain from operations reality

Cons:

- drifts back toward engineering glossary content
- weaker commercial role inside the retained API pricing cluster
- less helpful for buyer-facing packaging decisions

### Option 3: Reframe it around overage and usage thresholds

Pros:

- close to real billing outcomes
- useful for customer-experience discussions

Cons:

- overlaps too much with `overage`
- risks making `rate-limit` a weaker copy of a threshold policy page instead
  of a distinct throughput and fairness support term

## Recommendation

Use Option 1.

Keep `rate-limit` as the retained glossary page, but narrow it so the term
answers one practical question:

when can a throughput cap remain an internal engineering guardrail, and when
does it become part of the visible packaging rule buyers need to understand
because it changes fairness, throughput expectation, or the paid escalation
path?

That gives the term a clearer retained-core role and creates cleaner
boundaries with nearby retained support:

- `api-call` defines the billable event
- `value-metric-selection` helps decide whether the unit is the right billing
  anchor at all
- `api-pricing-model` decides when one public rate is still enough
- `rate-limit` explains when throughput guardrails must become visible pricing
  structure
- `overage` explains what happens after the boundary is crossed

## Scope for this batch

- tighten the glossary page so it reads as a packaging-support term rather than
  a general technical explainer
- update retained glossary depth so the page must explicitly cover a stronger
  decision section:
  - `How rate limits move from engineering guardrail to visible packaging rule`
- tighten retained link concentration so the page must include:
  - `/guides/api-pricing-model/`
  - `/guides/value-metric-selection/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/api-call/`
  - `/glossary/overage/`
- keep weaker or broader adjacent support absent from the page:
  - `/guides/api-rate-limit-pricing/`
  - `/guides/request-pricing-model/`
  - `/glossary/usage-based-pricing/`
  - `/glossary/pricing-metric/`
- refresh trust signals and sources so the page supports:
  - buyer-visible throughput expectations
  - fairness under burst traffic
  - the difference between billable unit and throughput rule
  - the paid escalation path when the default cap is not enough

## Testing design

- Extend `tests/retained-glossary-depth.test.mjs` so `rate-limit` must use the
  stronger packaging-rule heading and packaging-support keywords.
- Extend `tests/retained-link-concentration.test.mjs` so the page must include
  stronger retained API support from:
  - `api-pricing-model`
  - `value-metric-selection`
  - `api-call`
  - `overage`
  - `api-pricing-calculator`
- Keep weaker API guide inventory and broader pricing glossary terms excluded.
- Use TDD:
  - update the tests first
  - run them and confirm they fail against the current broader glossary page
  - then rewrite the page
- Re-run targeted quality checks, build, sitemap verification, and rendered
  HTML review before any merge decision.

## Success criteria

- `rate-limit` clearly reads as a glossary support page about visible packaging
  rules, not only hidden technical throttling
- the page helps teams decide when the limit must become part of the buyer's
  commercial expectation
- the glossary entry has stronger retained boundaries with `api-call`,
  `api-pricing-model`, and `overage`
- support links become more concentrated on the retained API pricing cluster
- glossary, quality, and build checks pass without widening the indexed surface

## Non-goals

- no new URLs
- no calculator formula changes
- no redesign
- no broader API cluster rewrite
- no index-status change for this page
- no merge, push, or live verification in this batch
