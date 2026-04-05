# Overage Escalation Wave 15 Design

## Goal

Strengthen `/glossary/overage/` so it reads as a retained support term about
when overage is a predictable paid escalation path and when it reveals that the
packaging model is still doing hidden, low-trust work.

## Current evidence

- `overage` is already part of the retained glossary surface and remains
  intentionally indexable.
- The page already has trust metadata, tools, and supporting links, so the
  issue is not baseline glossary hygiene.
- The current glossary entry is useful, but it still behaves too much like a
  broad usage-pricing explainer:
  - extra charges after included usage
  - bill-shock risk
  - threshold alerts
  - margin protection
- Wave 13 tightened `api-pricing-model` into a retained-core decision page
  about when visible packaging structure must carry more of the commercial
  burden.
- Wave 14 tightened `rate-limit` into a retained support term about when a
  throughput rule becomes buyer-visible packaging instead of hidden operations.
- That makes `overage` more important because the API and usage clusters now
  need a glossary page that explains when paid escalation is still a clean
  extension of the plan and when it signals that the packaging is still not
  commercially resolved.
- The current page under-explains one practical decision:
  - when overage remains a fair continuation of the offer
  - and when repeated exceptions, opaque thresholds, or punitive rates mean the
    packaging model still needs redesign

## Core problem

This glossary entry occupies an important retained slot, but it still behaves
too much like a polished usage-pricing explainer. That weakens retained-core
quality because the API and usage clusters now need the page to clarify when
overage is an honest paid path and when it is covering up a packaging problem.

If this page stays broad:

- the API chain still depends on a partially generic glossary term
- the relationship between included usage, rate limit, and paid escalation
  stays too blurry
- the site keeps a more templated feel in one of the most reusable low-value
  SaaS topics Google can judge as inventory content

## Approaches considered

### Option 1: Reframe it around predictable escalation path versus packaging problem

Pros:

- best fit for the retained API and usage decision chain
- creates a clearer support role for `api-pricing-model` and `rate-limit`
- reduces template feel by centering one practical commercial decision
- makes buyer trust, escalation logic, and manual exceptions more explicit

Cons:

- requires tighter glossary expectations
- needs clearer boundaries with broader usage-pricing inventory

### Option 2: Reframe it around bill shock and customer alerts

Pros:

- easy to explain from customer-experience language
- directly relevant to trust and usability

Cons:

- drifts back toward generic billing UX advice
- weaker retained-core role than a true escalation-path glossary term
- less useful for packaging decisions upstream

### Option 3: Reframe it around cost floor and margin defense

Pros:

- commercially credible
- useful for finance-heavy pricing reviews

Cons:

- overlaps too much with `api-cost-estimation` and `gross-margin`
- risks turning `overage` into another economics explainer instead of a pricing
  support term

## Recommendation

Use Option 1.

Keep `overage` as the retained glossary page, but narrow it so the term answers
one practical question:

when is overage still a predictable paid escalation path that the buyer can
understand, and when does it become evidence that the packaging still relies on
hidden exceptions, vague thresholds, or punitive post-threshold logic?

That gives the term a clearer retained-core role and creates cleaner
boundaries with nearby retained support:

- `included-usage` explains what the buyer gets before incremental charging
- `rate-limit` explains when throughput boundaries become visible packaging
- `api-pricing-model` explains when the packaging structure needs overage at all
- `overage` explains whether the paid path is honest and stable once the buyer
  crosses the boundary

## Scope for this batch

- tighten the glossary page so it reads as an escalation-path support term
  rather than a general overage explainer
- update retained glossary depth so the page must explicitly cover a stronger
  decision section:
  - `How overage moves from predictable extension to packaging problem`
- tighten retained link concentration so the page must include:
  - `/guides/api-pricing-model/`
  - `/guides/usage-based-pricing-examples/`
  - `/saas-pricing/tiered-usage-pricing-calculator/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/included-usage/`
  - `/glossary/rate-limit/`
- keep weaker or broader adjacent support absent from the page:
  - `/guides/api-cost-estimation/`
  - `/guides/overage-policy-design/`
  - `/guides/overage-communication/`
  - `/glossary/usage-based-pricing/`
- refresh trust signals and sources so the page supports:
  - threshold timing and buyer estimation
  - margin protection without punitive rates
  - when manual exceptions expose packaging weakness
  - stronger retained neighboring API and usage pages where helpful

## Testing design

- Extend `tests/retained-glossary-depth.test.mjs` so `overage` must use the
  stronger escalation-path heading and packaging-quality keywords.
- Extend `tests/retained-link-concentration.test.mjs` so the page must include
  stronger retained support from:
  - `api-pricing-model`
  - `usage-based-pricing-examples`
  - `tiered-usage-pricing-calculator`
  - `api-pricing-calculator`
  - `included-usage`
  - `rate-limit`
- Keep weaker overage support inventory and the broader `usage-based-pricing`
  glossary term excluded.
- Use TDD:
  - update the tests first
  - run them and confirm they fail against the current broader glossary page
  - then rewrite the page
- Re-run targeted quality checks, build, sitemap verification, and rendered
  HTML review before any merge decision.

## Success criteria

- `overage` clearly reads as a glossary support page about a predictable paid
  escalation path versus a packaging failure signal
- the page helps teams decide when overage remains commercially honest and when
  it should trigger packaging redesign
- the glossary entry has stronger retained boundaries with `included-usage`,
  `rate-limit`, and `api-pricing-model`
- support links become more concentrated on the retained API and usage cluster
- glossary, quality, and build checks pass without widening the indexed surface

## Non-goals

- no new URLs
- no calculator formula changes
- no redesign
- no broader API or usage cluster rewrite
- no index-status change for this page
- no merge, push, or live verification in this batch
