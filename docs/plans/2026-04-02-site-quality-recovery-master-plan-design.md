# Site Quality Recovery Master Plan Design

## Goal

Create a unified recovery plan for `pricingnest.com` that improves user experience, reduces template-like signals,
shrinks low-value index surface area, and makes the site read more like a maintained English pricing toolkit than a
scaled content inventory.

## Current evidence

- The site has already completed several meaningful recovery batches:
  - template trust cleanup
  - navigation de-templating
  - retained-link concentration
  - wave-two governance
  - intent tightening on priority calculators
- Those batches materially improved trust and page focus, but the site still carries a broad index footprint:
  - `134` guide pages total
  - `80` guide pages still `index,follow`
  - `96` glossary pages total
  - `64` glossary pages still `index,follow`
- For a relatively young site whose strongest search opportunity still centers on a small calculator set, that surface
  area is still wide enough to create a "content inventory" impression.
- Current governance already protects many weaker pages, but the retained surface is still larger than the true
  evidence-backed core.
- The strongest real ranking opportunity still sits on a limited set of pages:
  - core calculator pages
  - a smaller guide layer directly tied to pricing decisions
  - a smaller glossary layer directly tied to retained guides and calculators
- This means the main problem is not a lack of keywords. The main problem is that the indexed surface still looks wider
  than the strongest retained core.

## Core problem

The remaining risk is not one bad page or one bad template. It is the combination of:

- too many indexable support pages relative to the strongest retained pages
- some retained pages still carrying residual template feel
- inconsistent depth across indexable guides and glossary pages
- no single operating plan that controls review order, release order, and re-audit discipline

If we keep improving pages one by one without tightening the overall retained surface, Google can still interpret the
site as low quality or scaled even if individual pages improve.

## Approaches considered

### Option 1: Quality contraction first, then retained-core strengthening

Start by auditing every currently indexable guide and glossary page. Reduce index surface first, then strengthen the
 smaller retained layer, then continue core-page tightening.

This is the best option because it directly reduces low-quality risk at the site level and gives every later batch a
 cleaner base.

### Option 2: Continue strengthening core calculators first

Keep improving top calculators and postpone another site-wide index review.

This would help the best pages, but the wider support inventory would still dilute quality signals.

### Option 3: Run audit and expansion in parallel

Audit indexed content while also continuing broader support-page improvement and publication.

This could move faster on paper, but it creates coordination risk, makes review weaker, and encourages scattered work.

## Recommendation

Use Option 1.

Why:

- it attacks the biggest remaining site-level quality risk directly
- it prevents more scattered work
- it produces a smaller, clearer retained core for Google and users
- it creates a repeatable review and release process instead of ad hoc cleanup

## Unified plan structure

### Phase 1: Index-surface review

Audit every guide and glossary page that is still `index,follow`.

Each page must end in one of three buckets:

- `retain-and-strengthen`
- `move-to-noindex`
- `observe-for-now`

This phase should produce a review ledger rather than code changes first.

### Phase 2: High-risk noindex wave

Take the most template-like, weakest, or most duplicative pages from the review ledger and add them to governance.

These pages should remain crawlable for internal links when useful, but should stop competing for index coverage.

### Phase 3: Retained-core strengthening

Strengthen only the pages that deserve to remain central:

- five core calculators
- a smaller guide layer tied to those calculators
- a smaller glossary layer tied to retained guides

The output should be more evidence-backed, decision-oriented, and less generic.

### Phase 4: Template and experience review

After the retained surface is smaller, re-check templates and page pathways for:

- repeated wording
- mechanical internal-link patterns
- FAQ sections that feel generated instead of decision-oriented
- shallow next-step pathways

This is a review-and-correction phase, not a redesign phase.

### Phase 5: Unified release and re-audit loop

Every execution batch should use the same release discipline:

1. work in an isolated worktree
2. write or update design and implementation docs
3. use targeted tests first
4. run broader governance and build checks
5. review diff and risk
6. merge and push in a controlled batch
7. verify production HTML without cache
8. record what changed and what remains

## Quality rules for review

### A page should remain indexable only if it has clear independent value

Signs that a page deserves `index,follow`:

- clear query intent
- unique decision value
- enough depth to stand alone
- strong relation to retained calculator clusters
- credible review and source framing

### A page should move to `noindex,follow` if it behaves like support inventory

Signs that a page should likely leave the index:

- mostly repeats stronger pages
- reads like a checklist template with swapped nouns
- lacks strong next-step value
- does not deserve one of the site's limited index slots
- mainly helps internal linking rather than external search

## Review and release discipline

The user explicitly wants work to stay focused and reviewable, so this plan requires:

- no scattered batches
- no broad redesign
- no unreviewed pushes
- no release without local verification
- no release without production follow-up

Each batch should end with a short review log:

- what was changed
- what was intentionally not changed
- what remains risky
- what the next batch should be

## Success criteria

- the indexed guide and glossary surface is materially smaller and more intentional
- retained pages are more obviously reviewed, evidence-backed, and decision-oriented
- template feel is reduced on the pages that remain central
- release and re-review become standardized instead of ad hoc
- the site reads like a maintained English pricing toolkit, not a broad inventory of related terms

## Non-goals

- no full site redesign
- no formula changes to calculators
- no broad content expansion wave
- no attempt to rescue every existing page
- no blind pushing without review, verification, and live follow-up
