# Retained Bridge Batch 2 Design

## Goal

Strengthen the retained API and storage support path after turnaround batch 1 by
making the most important glossary pages behave like decision bridges rather
than general definition inventory, and by aligning the main site entry points
with those retained paths.

This batch should make the site easier to navigate as a workflow:

- choose the pricing problem
- run the right calculator
- read the retained guide
- clarify the one glossary term that changes the decision

## Why this batch exists

Turnaround batch 1 already did three important things:

- removed another narrow set of weak indexed guides
- made the guides hub foreground retained decision pages
- rewrote the three strongest API and storage guides into more judgment-led
  decision pages

That work makes the retained guide layer much sharper, but the surrounding
support surface still has two gaps:

1. The homepage and toolkit hub still frame too much of the journey as
   "open a tool" instead of "solve this pricing problem."
2. Some retained glossary pages still read more like cleaned-up definitions
   than retained support pages that help users interpret calculator outputs and
   guide trade-offs.

If those two gaps stay in place, the site remains better governed but still not
fully coherent as a retained decision system.

## Current problem

The strongest retained API and storage pages now exist, but the path between
entry page, calculator, guide, and glossary is still only partially aligned.

### Homepage problem

The homepage points users toward calculators and methodology, but the API and
storage routes still understate the retained guide and glossary support that
now should do more commercial interpretation work.

### Toolkit hub problem

The toolkit hub has good workflow language, but the API and storage paths still
lean too much on broad support links instead of the sharper retained chain that
batch 1 just created.

### Glossary problem

`api-call` and `rate-limit` are already stronger than generic definitions, but
their support role can still become more explicit.

`gb-month` and `minimum-commitment` are useful, but both still read closer to
"what this term means" than "when this term becomes a pricing structure
decision."

That is the exact kind of remaining inventory feel we should keep removing.

## Design principles

1. Do not widen the indexed surface.
2. Do not create new URLs or new content lanes.
3. Use the glossary to clarify retained decisions, not to expand topic
   coverage.
4. Keep API and storage as the only scope for this batch.
5. Tighten pathways between homepage, toolkit hub, glossary hub, retained guide,
   and calculator so the site feels more intentional.

## Approaches considered

### Option 1: Glossary-only tightening

Pros:

- smallest implementation scope
- lowest risk to site entry pages
- easy to verify with retained glossary tests

Cons:

- leaves homepage and toolkit hub less aligned with the retained guide changes
- reduces the immediate navigation benefit of stronger glossary pages
- misses the chance to turn glossary into a clearer workflow bridge

### Option 2: Recommended - retained bridge batch

Pros:

- tightest alignment with turnaround batch 1
- improves both user path clarity and retained support quality
- strengthens API and storage clusters without expanding content scope
- makes the site feel smaller and more purposeful

Cons:

- touches more than one surface area
- requires careful test updates across hub and glossary files

### Option 3: Broader pricing path refresh

Pros:

- could cover more site sections at once
- may improve consistency across more topic clusters

Cons:

- too easy to drift back into broad rewrite territory
- weaker focus on the two clusters that just received the strongest retained
  guide investment
- adds more coordination than this turnaround phase needs

## Recommendation

Use Option 2.

This batch should be a focused retained bridge batch for API and storage only.

## Scope

### A. Reframe the main site entry points around the retained API and storage paths

Update:

- `src/pages/index.astro`
- `src/pages/saas-pricing/index.astro`
- `src/pages/glossary/index.astro`

The homepage should more clearly route users by pricing problem, especially:

- API pricing structure
- storage pricing structure

The toolkit hub should keep the calculator-first workflow, but the API and
storage workflows should now foreground the strongest retained guide and
glossary bridges rather than broader support vocabulary.

The glossary hub should move closer to "read these retained core terms first"
and put API/storage bridge terms more visibly in front of users.

### B. Strengthen four retained glossary bridges

Rewrite these glossary pages so they become stronger retained support terms:

- `api-call`
- `rate-limit`
- `gb-month`
- `minimum-commitment`

Each page should answer a pricing-structure question, not only define a term.

#### `api-call`

Should become clearer about:

- when a billable event is publishable
- when request mix or retries make the unit commercially messy
- when teams should move into `api-cost-estimation` or `api-pricing-model`

#### `rate-limit`

Should become clearer about:

- when the cap stays an internal guardrail
- when it becomes a visible packaging rule
- how it differs from the billable unit and upgrade path

#### `gb-month`

Should become clearer about:

- when GB-month is an honest buyer-facing unit
- when it becomes a misleading average
- how request, retrieval, and replication distort a simple storage story

#### `minimum-commitment`

Should become clearer about:

- when a commitment is a justified commercial floor
- when it is compensating for a weak variable model
- how it interacts with API and storage pricing structure

### C. Tighten tool-cluster support for API and storage

Update the API and storage core tool cluster support in `src/lib/tools.ts` so
the retained glossary and retained guide links reflect the stronger bridge role
from this batch.

The main goal is not to add more support links. The goal is to make the support
set more concentrated on the pages that now carry retained judgment.

## Testing design

Use existing retained and hub tests rather than creating a new testing lane.

### Hub tests

Tighten `tests/hub-curation.test.mjs` so it requires:

- stronger API and storage decision-path wording on the homepage
- stronger API and storage workflow wording on the toolkit hub
- stronger API/storage retained-core emphasis in the glossary hub

### Glossary retained depth

Tighten `tests/retained-glossary-depth.test.mjs` for:

- `api-call`
- `rate-limit`
- `gb-month`
- `minimum-commitment`

The pages should use more decision-led headings and keyword expectations.

### Link concentration

Tighten `tests/retained-link-concentration.test.mjs` so the four glossary pages
link more directly into:

- retained API and storage guides
- the relevant calculators
- a smaller retained glossary neighbor set

and stay away from weaker adjacent guide inventory or broader glossary terms
when those links dilute topic ownership.

### Tool cluster verification

Update `tests/core-tool-clusters.test.mjs` so the API and storage calculators
expect the tighter retained support chain.

### Existing trust checks

Keep:

- `tests/glossary-trust-data.test.mjs`
- `npm run build`

and any directly impacted cluster tests for API/storage as the final proof that
the retained bridge changes did not regress metadata or cluster behavior.

## Success criteria

- homepage, toolkit hub, and glossary hub all describe API and storage as
  pricing-decision paths rather than generic reading lists
- `api-call`, `rate-limit`, `gb-month`, and `minimum-commitment` read as
  retained support pages rather than inventory definitions
- API and storage tool clusters point to the stronger retained guide/glossary
  support set
- no new URL creation, no redirect work, and no widening of indexable surface
- the site feels more like one coherent retained system after the batch

## Non-goals

- no new pages
- no annual-discount or compute expansion in this batch
- no calculator formula changes
- no governance wave
- no broad glossary rewrite
- no homepage redesign beyond targeted path-copy improvement
