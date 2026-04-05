# API Call Boundary Wave 16 Design

## Goal

Strengthen `/glossary/api-call/` so it reads as a retained support term about
when an API call is a commercially honest public billing unit and when the
billable-event boundary becomes too ambiguous to publish without misleading
buyers.

## Current evidence

- `api-call` is already part of the retained glossary surface and remains
  intentionally indexable.
- The page already has trust metadata, support links, and pricing-tool context,
  so this is not a baseline hygiene problem.
- The current entry is useful, but it still behaves too much like a broad API
  glossary explainer:
  - what a request is
  - when calls count as paid usage
  - why calls matter for forecasting
  - how burst traffic changes costs
- Wave 13 tightened `api-pricing-model` into a retained guide about when API
  pricing becomes a packaging-structure decision instead of a simple headline
  rate.
- Wave 14 tightened `rate-limit` into a retained glossary support term about
  when throughput rules must become visible packaging boundaries.
- Wave 15 tightened `overage` into a retained glossary support term about when
  paid escalation is still predictable and when it exposes packaging weakness.
- That makes `api-call` more important because the API chain still needs one
  glossary page that explains whether the billable event itself is stable enough
  to support:
  - buyer estimation
  - published pricing copy
  - visible throughput rules
  - clean escalation after included usage
- The current page under-explains one practical decision:
  - when the public billing unit is clear enough to publish
  - and when retries, premium endpoints, or request-mix distortion make the
    unit commercially misleading

## Core problem

This glossary entry occupies an important retained slot, but it still behaves
too much like a polished API terminology page. That weakens retained-core
quality because the surrounding API chain now needs `api-call` to explain
whether the public billable-event boundary is clear enough to support honest
pricing.

If this page stays broad:

- the API chain still begins with a partially generic glossary term
- buyers can read about API calls without learning when the pricing unit stops
  being estimate-friendly
- the site keeps more of the glossary-inventory feel that increases low-quality
  risk on reusable SaaS topics

## Approaches considered

### Option 1: Reframe it around billable-event boundary clarity versus misleading public unit

Pros:

- best fit for the retained API decision chain
- gives `api-pricing-model`, `rate-limit`, and `overage` a cleaner supporting
  foundation
- reduces template feel by centering one commercial decision instead of a broad
  term definition
- makes retries, premium endpoints, and request-mix distortion explicit

Cons:

- requires tighter boundaries with broader API pricing inventory
- leaves less room for generic educational copy

### Option 2: Reframe it around API usage estimation and monthly forecasting

Pros:

- easy to explain from the buyer perspective
- directly helpful for trust and spend predictability

Cons:

- overlaps too much with `api-pricing-model` and `api-cost-estimation`
- risks becoming another estimation explainer instead of a retained glossary
  support term

### Option 3: Reframe it around metering accuracy and internal billing operations

Pros:

- technically credible
- useful for finance and engineering alignment

Cons:

- drifts away from pricing-page clarity into internal billing mechanics
- weaker fit for retained-core SEO and buyer-facing support intent

## Recommendation

Use Option 1.

Keep `api-call` as the retained glossary page, but narrow it so the term answers
one practical question:

when is an API call a clean enough public billable unit to publish on the
pricing page, and when do retries, premium endpoints, hidden exclusions, or
request-mix differences make that unit commercially misleading?

That gives the term a clearer retained-core role and creates cleaner boundaries
with nearby retained support:

- `api-pricing-model` decides when the overall packaging structure needs more
  visible help
- `value-metric-selection` decides whether the public unit should be an API call
  at all
- `rate-limit` explains how throughput boundaries differ from the billable event
- `overage` explains what happens after the clean billable boundary is crossed
- `api-call` explains whether the boundary itself is commercially honest enough
  to publish

## Scope for this batch

- tighten the glossary page so it reads as a billable-boundary support term
  rather than a general API usage explainer
- update retained glossary depth so the page must explicitly cover a stronger
  decision section:
  - `How API call boundaries become commercially misleading`
- tighten retained link concentration so the page must include:
  - `/guides/api-pricing-model/`
  - `/guides/value-metric-selection/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
- keep weaker or broader adjacent support absent from the page:
  - `/guides/api-free-tier-guardrails/`
  - `/guides/request-pricing-model/`
  - `/glossary/usage-based-pricing/`
  - `/glossary/pricing-metric/`
- refresh trust signals and sources so the page supports:
  - billable-event boundary clarity
  - buyer estimation quality
  - retries and premium endpoints
  - request-mix distortion
  - stronger retained neighboring API support pages where helpful

## Testing design

- Extend `tests/retained-glossary-depth.test.mjs` so `api-call` must use the
  stronger billable-boundary heading and keywords.
- Extend `tests/retained-link-concentration.test.mjs` so the page must include
  stronger retained API support from:
  - `api-pricing-model`
  - `value-metric-selection`
  - `api-pricing-calculator`
  - `rate-limit`
  - `overage`
- Keep weaker adjacent API inventory and broader glossary support excluded.
- Use TDD:
  - update the tests first
  - run them and confirm they fail against the current broader glossary page
  - then rewrite the page
- Re-run targeted quality checks, build, sitemap verification, and rendered
  HTML review before any merge decision.

## Success criteria

- `api-call` clearly reads as a glossary support page about whether the public
  billing unit is commercially honest enough to publish
- the page helps teams decide when the billable event is estimate-friendly and
  when it becomes misleading because the boundary is unstable
- the glossary entry has stronger retained boundaries with
  `api-pricing-model`, `value-metric-selection`, `rate-limit`, and `overage`
- support links become more concentrated on the retained API cluster
- glossary, quality, and build checks pass without widening the indexed surface

## Non-goals

- no new URLs
- no calculator formula changes
- no redesign
- no broader API cluster rewrite
- no index-status change for this page
- no merge, push, or live verification in this batch
