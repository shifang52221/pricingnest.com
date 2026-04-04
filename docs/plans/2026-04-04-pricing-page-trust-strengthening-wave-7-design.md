# Pricing Page Trust Strengthening Wave 7 Design

## Goal

Strengthen `/guides/pricing-page-trust-elements/` so it reads like a retained,
decision-oriented pricing-page trust guide instead of a short checklist support
article.

## Current evidence

- `pricing-page-trust-elements` is still using the old thin-guide shape:
  - short checklist body
  - limited decision framing
  - support links still point to weaker adjacent pages such as
    `/guides/pricing-page-comparison-table/`
  - glossary support still leans on weaker terminology such as
    `/glossary/annual-plan/`
- The page remains `index,follow` and is intentionally surfaced in:
  - the guides hub
  - the homepage
  - the pricing-tier optimizer cluster
- The retained-core queue explicitly marks this page as the highest-value
  pricing-page UX trust page and says the next pass should reduce template feel
  while keeping the focus on buyer-confidence signals that matter on real
  pricing pages.
- The current body says "show proof", "clarify billing cycle", and "add a FAQ,"
  but it does not yet help a pricing team decide which trust signals belong on
  the page, which belong elsewhere, and which trust elements create clutter.

## Core problem

This page occupies retained indexed surface, but its current content still reads
like a reusable checklist. That weakens both user experience and Google's view
of the retained guide layer because a page the site actively promotes as a core
decision guide still feels interchangeable with lower-value support inventory.

## Approaches considered

### Option 1: Strengthen only `pricing-page-trust-elements`

Rewrite the guide itself and extend the retained-core tests that define guide
depth, trust coverage, and retained link concentration.

Pros:

- narrowest and safest batch
- directly improves an indexed retained-core page
- reduces template feel without reopening adjacent pricing-page inventory

Cons:

- leaves glossary support such as `billing-cycle` for a later pass

### Option 2: Strengthen the guide plus one glossary page

Pair the guide with `billing-cycle` so pricing-page trust and billing-language
support improve together.

Pros:

- stronger terminology support
- tighter alignment between pricing-page copy and policy language

Cons:

- wider review surface than necessary for the next retained-core batch
- increases scope before the guide itself is fully upgraded

### Option 3: Reopen the full pricing-page content cluster

Rewrite `pricing-page-trust-elements` plus related pages such as
`pricing-page-comparison-table` and `pricing-tier-design`.

Pros:

- larger thematic refresh

Cons:

- conflicts with the current strict-contraction strategy
- risks reopening weaker pages that are not in the retained core
- too wide for a disciplined batch

## Recommendation

Use Option 1.

This page is already intentionally retained and indexable, so the cleanest next
move is to make it worthy of that indexed position. A single-page tightening
batch keeps the release narrow while still reducing the site's "template guide"
footprint in a high-visibility trust and UX topic.

## Scope for this batch

- Add retained-depth coverage for `pricing-page-trust-elements`.
- Add guide-trust coverage so the page must carry review metadata and sources.
- Extend retained-link concentration assertions so the page favors stronger
  retained trust neighbors and stronger glossary support.
- Rewrite the guide into a retained-core structure focused on pricing-page
  trust decisions:
  - when pricing page trust becomes a pricing problem
  - what buyers need to verify before they trust the page
  - where pricing pages lose trust
  - proof, policy clarity, and pricing-page simplicity
  - how to interpret the calculator outputs
  - next steps
- Replace weaker support references with stronger retained pathways tied to:
  - `pricing-tier-optimizer`
  - annual pricing clarity
  - value-metric and packaging clarity
  - billing-policy clarity

## Success criteria

- `pricing-page-trust-elements` no longer reads like a checklist page
- the page carries `author`, `reviewedBy`, `reviewed`, and `sources`
- the guide is deep enough to justify its retained indexed status
- the guide links concentrate on stronger retained tools, guides, and glossary
  terms
- weaker adjacent support paths such as
  `/guides/pricing-page-comparison-table/` and `/glossary/annual-plan/` are not
  revived inside the page
- retained-core quality tests and build still pass

## Non-goals

- no URL changes
- no calculator formula changes
- no redesign
- no new pages
- no broad pricing-page cluster rewrite
- no change to this page's indexed status
