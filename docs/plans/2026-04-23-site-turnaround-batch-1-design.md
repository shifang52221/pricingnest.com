# Site Turnaround Batch 1 Design

## Goal

Shift `pricingnest.com` out of the current low-traction, template-heavy state by
combining one more narrow governance contraction wave with a deliberate rewrite
of the small set of guide pages that should actually earn trust, support tool
clusters, and feel meaningfully more original to users.

## Why this batch is different

This site is no longer in the "just clean up the index surface" stage.

The project now has roughly three months of live history, and the latest Search
Console export prepared on `2026-04-23` still shows:

- reporting window: `2026-03-24` through `2026-04-20`
- total clicks: `1`
- total impressions: `799`
- weighted average position: `46.29`

The site has already completed several governance and retained-core waves, and
current governance already keeps the indexed surface down to:

- indexed guides: `68` out of `134`
- indexed glossary pages: `53` out of `96`

That means governance alone is no longer the main missing ingredient.

## Current problem

The site still underperforms because three issues overlap:

1. The strongest search testing remains concentrated on a small calculator set,
   especially API and storage tools.
2. Too many remaining support pages still read like inventory or template
   support pages rather than pages with a clear editorial point of view.
3. The retained guides that should justify site trust are useful, but several
   of them still stop at "explainer" depth instead of helping the reader make a
   real pricing decision.

The result is a site that looks more disciplined than before, but not yet
different enough from a well-governed content inventory.

## Design principles

1. Stop treating governance as the primary growth lever.
2. Remove only pages that are still obviously weak and not central to current
   tool clusters.
3. Consolidate adjacent ideas into stronger retained pages instead of letting
   every near-duplicate concept keep its own editorial lane.
4. Rewrite retained pages so they lead with judgment, trade-offs, and decision
   structure rather than generic concept explanation.
5. Make the guide hub feel more like a workflow entry point and less like a
   catalogue.

## Approaches considered

### Option 1: Keep running narrow governance waves only

Pros:

- lowest implementation risk
- easy to verify with existing governance tests

Cons:

- does not address the "site still feels like content inventory" problem
- unlikely to create a meaningful user-trust or originality jump on its own
- three months of weak traction suggests this is no longer enough

### Option 2: Stop pruning and only rewrite core guides

Pros:

- focuses effort where upside is highest
- directly improves user usefulness and originality

Cons:

- leaves obvious leftover template pages indexed
- keeps site-wide quality dilution higher than necessary
- misses the chance to tighten topic ownership at the same time

### Option 3: Recommended - one mixed turnaround batch

Pros:

- best balance between contraction and genuine quality improvement
- reduces remaining weak inventory while making retained pages feel more
  purposeful
- directly supports the tool clusters that already have search exposure

Cons:

- more coordination than a simple governance-only wave
- requires disciplined scoping to avoid turning into a broad rewrite

## Recommendation

Use Option 3.

This batch should have three coordinated parts:

### A. Narrow governance wave 5

Move the next obvious weak guide inventory pages to `noindex,follow`:

- `api-overage-automation`
- `arpa-growth-levers`
- `churn-reduction-playbook`
- `churn-risk-scoring`
- `monthly-cloud-cost-variance`
- `net-new-mrr-bridge`
- `price-lock-policy`
- `retention-early-warning-signals`

These pages still fit the "template support inventory" pattern and are not
strong enough to justify an index slot relative to the current retained core.

### B. Topic absorption, not expansion

Treat the following pages as ideas to be absorbed into stronger retained pages
rather than as standalone entry pages that deserve more surface area:

- `request-pricing-model`
- `api-tier-design`
- `commit-and-consume-pricing`
- `storage-request-costs`
- `usage-pricing-floor`
- `usage-forecasting-pricing`
- `usage-tier-breakpoints`

This batch does not need to delete or redirect them. The important shift is to
change the retained pages so they absorb the most useful decision logic and no
longer rely on these adjacent pages to carry the topic.

### C. Rewrite the real retained winners

Deeply rewrite these three retained guides:

- `api-cost-estimation`
- `storage-costs-and-pricing`
- `price-per-gb-month-explained`

Each of them should move from "explainer page" toward "decision page":

- stronger point of view
- clearer boundary with adjacent support pages
- more workload segmentation
- clearer packaging and pricing trade-offs
- stronger next-step pathways back into calculators and retained glossary terms

## Concrete rewrite intent

### `api-cost-estimation`

Change the page from a broad "how to estimate API cost" explainer into a page
that answers:

- when API cost estimation is enough to support pricing
- when the cost model still hides a packaging problem
- when vendor pass-through, burst traffic, or endpoint mix make one public rate
  commercially fragile

This page should absorb practical framing that would otherwise leak into
`request-pricing-model`, `api-tier-design`, and `commit-and-consume-pricing`.

### `storage-costs-and-pricing`

Change the page from a generic storage-cost explainer into a guide that
distinguishes:

- archive-heavy workloads
- request-heavy workloads
- retrieval-sensitive workloads
- mixed SaaS file-storage workloads

The page should answer when a simple GB-month model is still honest and when
request, retrieval, or base-fee structure needs to become part of the pricing
design.

### `price-per-gb-month-explained`

Change the page from "what the metric means" into a stronger guide about when
`price per GB-month` is an honest buyer-facing unit and when it becomes a
misleading average.

This page should become the clearest storage-adjacent bridge between buyer
clarity and internal workload economics.

## UX scope

This batch should make one targeted hub improvement:

- update the guides hub so it surfaces the retained decision pages that support
  current calculator clusters instead of feeling like a generic reading list

This is a workflow improvement, not a redesign.

## In scope

- one new guide-only governance wave
- test updates for governance and retained-guide expectations
- guide hub curation improvement
- deep rewrites of `api-cost-estimation`, `storage-costs-and-pricing`, and
  `price-per-gb-month-explained`
- tighter retained link concentration away from weaker adjacent pages

## Out of scope

- new URL creation
- redirects
- formula changes in calculators
- broad glossary rewrite
- homepage redesign
- large information architecture changes

## Success criteria

- indexed guides drop from `68` to `60` or lower after the new governance wave
- the three retained guides become more decision-oriented and less template-like
- retained guide tests reflect stronger intent and topic ownership
- the guide hub more clearly routes users into retained decision pages
- the site looks smaller, sharper, and more editorially intentional after this
  batch, even before any traffic response shows up
