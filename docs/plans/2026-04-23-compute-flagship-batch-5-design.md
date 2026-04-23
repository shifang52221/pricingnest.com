# Compute Flagship Batch 5 Design

## Goal

Strengthen `/saas-pricing/compute-cost-estimator/` so it reads less like one
tool in a large repeated toolkit and more like a distinct compute-pricing
decision page with its own structure, judgment, and retained follow-up path.

## Why this batch exists

The previous batch improved two flagship pages:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`

That work moved the site in the right direction, but the broader strategic goal
is not just "better page UX." The more important goal is to avoid sending a
bulk-template signal across the site.

A site can look editorially trustworthy to a human and still expose patterns
that feel machine-scaled or template-scaled to search systems:

- near-identical page structures across many tools
- repeated "recommended next steps" behavior with only small wording changes
- generic follow-up link spillover that makes many pages feel like thin route
  hubs
- tool content that explains formulas but does not create strong page-specific
  judgment

The strongest way to push against that is not broad redesign. It is to keep
choosing a small number of high-value pages and making each one meaningfully
more distinct.

## Why compute is the right next page

Among the remaining candidates, `compute-cost-estimator` is the cleanest next
target.

### Compute has high decision density

This page naturally supports a narrow but important set of buyer and operator
questions:

- when is a simple monthly price still defensible?
- when does fixed overhead force a platform fee or minimum commitment?
- when should compute be packaged as committed usage or included baseline
  capacity?
- when do workload differences become too large for one public rate?

Those questions make it a better retained decision page candidate than a generic
cost model.

### Compute is less likely to widen into low-value branches

`storage-cost-calculator` is also important, but it tends to branch quickly
into:

- request fees
- retrieval fees
- hot vs archive tiers
- replication
- lifecycle policies

Those are legitimate topics, but they make it easier to drift into broad
support copy or another semi-templated expansion wave.

`compute-cost-estimator` is more constrained. That is exactly what the current
site strategy needs.

## Current evidence

### The compute tool metadata is already solid

`src/lib/tools.ts` already gives `compute-cost-estimator` useful depth:

- walkthroughs
- scenarios
- richer FAQs
- cost-floor interpretation

This means the next gain is not "add more generic depth." The gain is to turn
existing depth into a page that feels commercially specific.

### The page still inherits the generic tool frame

Even after batch 4, `src/pages/saas-pricing/[slug].astro` still gives compute
the same high-level page skeleton as many other tools:

- generic inputs/results split
- generic guide section
- generic next-step area
- default relationship between page structure and support links

That is useful for consistency, but it also contributes to the repeated-tool
pattern we are trying to weaken.

## Problem statement

`compute-cost-estimator` still behaves more like a strong calculator record
inside a larger template system than like an independently strong retained page.

For this page, the next improvement should not be broader content quantity.
It should be stronger page-specific judgment and page-specific structure, so the
page sends clearer uniqueness signals:

- a distinct decision frame
- a distinct packaging-change frame
- a tighter compute-specific retained path
- clearer interpretation that is not interchangeable with usage or API pages

## Approaches considered

### Option 1: Improve compute content only inside `tools.ts`

This would add more compute-focused FAQs, walkthroughs, and interpretation while
leaving the page template behavior unchanged.

Why this is not enough:

- metadata is already reasonably strong
- the page would still inherit too much generic structure
- search-visible differentiation would improve less than page-visible
  differentiation

### Option 2: Broaden flagship logic to multiple infrastructure tools

This would pull `compute-cost-estimator`, `storage-cost-calculator`, and
possibly `bandwidth-cost-calculator` into the next wave together.

Why this is not the right move:

- it increases repetition risk again
- it creates a new mini-template cluster instead of a single strong page
- it widens verification and content scope too early

### Option 3: Add a compute-only flagship layer

Keep the shared template, but add a compute-specific page layer and tighter
compute-specific content support only for `compute-cost-estimator`.

This is the best option because it improves one high-value page without
restarting a broad production pattern.

## Recommendation

Use Option 3.

Why:

- it creates stronger uniqueness with minimal scope
- it aligns with the "fewer, stronger pages" strategy
- it avoids another broad page wave that could look templated at scale
- it gives us a cleaner test of whether this retained-page model works outside
  usage and API topics

## Proposed page behavior

### Shared template changes

Extend `src/pages/saas-pricing/[slug].astro` with a compute-only flagship path
for `compute-cost-estimator`.

This path should add:

- a compute-specific decision-summary block
- a compute-specific section explaining when a flat monthly floor is not enough
- a compute-specific "what to do next" path

The page should keep the calculator UI, compare tools, sensitivity panel, and
long-form guide sections. The change is not a redesign. It is a page-specific
overlay.

### Compute page framing

The compute page should read like:

- "find the compute price floor"
- "see when the floor still works as a simple monthly plan"
- "decide when the real answer is a minimum commitment, included baseline, or
  committed tier"

The page-level messaging should foreground:

- baseline workload selection
- fixed-cost recovery
- monthly plan vs committed structure
- included baseline capacity vs overage
- workload-shape divergence across customer segments

### Compute follow-up path

The compute page should not rely on generic guide spillover.

It should surface a tighter retained path centered on:

- `saas-gross-margin-targets`
- `compute-cost-modeling`
- `minimum-commitment-model`
- `unit-cost`
- `gross-margin`
- one additional compute-relevant support term only if it materially sharpens
  the path

## Content strategy

This batch should improve uniqueness in two ways at the same time:

### Structural uniqueness

The page visibly behaves differently from non-flagship tools.

### Judgment uniqueness

The compute tool record should use more distinctive editorial logic than a
generic cost-estimator page:

- when to stay with a monthly plan
- when to shift to minimum commitments
- when included baseline capacity is more honest than one flat rate
- when different workload shapes should not share one public price

## Testing strategy

This batch should tighten expectations before implementation.

### Compute content layer

Add a compute-specific test that requires stronger packaging and commitment
signals in the `compute-cost-estimator` record.

### Compute page experience layer

Add or extend a page-UX test so the template explicitly requires a dedicated
flagship path for `compute-cost-estimator`, including:

- stronger decision-summary behavior
- a compute-specific "monthly price is not enough" section
- tighter compute follow-up resources

### Cluster guardrail layer

Keep the existing cluster and depth tests passing so this batch strengthens
uniqueness without weakening the retained-core guardrails already in place.

## Non-goals

This batch should not:

- redesign the whole tool template
- widen to `storage-cost-calculator`
- change calculator formulas
- expand the toolkit hub
- create new support inventory just to feed the page
- add broad infrastructure-topic expansion

## Success criteria

The batch is successful if:

- `compute-cost-estimator` gains visibly distinct page structure beyond the
  generic tool frame
- the page exposes stronger original decision language around compute packaging
- its visible follow-up path becomes tighter and less index-like
- the calculator logic remains unchanged
- compute-specific tests pass alongside the existing core guardrail tests
