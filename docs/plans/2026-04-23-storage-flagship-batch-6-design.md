# Storage Flagship Batch 6 Design

## Goal

Strengthen `/saas-pricing/storage-cost-calculator/` so it reads less like a
repeated calculator record and more like a retained storage-pricing decision
page with clear packaging boundaries.

## Why this batch exists

The site strategy is not to publish more pages. It is to keep a smaller set of
pages that are more obviously useful, more editorially distinct, and less
likely to look like a bulk-generated toolkit.

The usage, API, and compute batches moved three important pages in that
direction. Storage is the next logical candidate because it already has strong
commercial relevance, but the page still behaves too much like a capable tool
inside a shared template.

## Why storage is the right next page

Storage pricing creates a different decision problem than generic
usage-oriented tools.

The central question is not only "what is the margin-safe price?" It is also:

- when should one blended GB-month price remain the public package?
- when should requests or retrievals be priced separately?
- when should fixed overhead move into a platform fee or minimum commitment?
- when do hot and archive behavior need different packaging instead of one
  average rate?

Those questions support a distinct page-level judgment model without forcing us
to open a broad new cluster of infrastructure content.

## Current problem

`storage-cost-calculator` already has solid supporting depth in `src/lib/tools.ts`,
including request-heavy and archive comparisons. But the page still inherits the
same generic high-level structure used by many other tools.

That means the page can still feel like:

- a formula record inside a large toolkit
- a guide hub with broad spillover links
- a page that explains storage math without making clear packaging decisions

The next gain should come from page-specific judgment and a tighter retained
resource path, not from adding more generic support copy.

## Approaches considered

### Option 1: Improve storage metadata only

This would add more FAQs, walkthroughs, and interpretation in `src/lib/tools.ts`
while leaving the page template unchanged.

This is not enough because the page would still look too similar to other tool
records at the structural level.

### Option 2: Create a wider infrastructure flagship batch

This would move storage, bandwidth, and perhaps cloud-cost pages together into a
new infrastructure wave.

This is the wrong move right now because it risks creating another repeated mini
template cluster.

### Option 3: Add a storage-only flagship layer

Keep the shared page template, but add a storage-specific flagship overlay for
`storage-cost-calculator` only.

This is the best option because it creates visible uniqueness without broadening
scope.

## Recommendation

Use Option 3.

The storage page should become a stronger retained decision page focused on
pricing structure:

- GB-month floor as a starting point, not the full answer
- request and retrieval boundaries
- fixed-cost recovery through commitments or platform fees
- hot versus archive separation when one public rate stops being honest

## Proposed page behavior

### Shared template changes

Extend `src/pages/saas-pricing/[slug].astro` so
`storage-cost-calculator` gets a storage-specific flagship path.

That path should add:

- a storage-specific decision-summary block near results
- a storage-specific section on when one GB-month rate is no longer enough
- storage-specific next steps and follow-up resources

The calculator, compare view, sensitivity tools, and long-form guide sections
should remain in place.

### Storage page framing

The page should read like:

- find the storage floor for the workload you actually want to price
- decide what belongs in the base GB-month price
- decide what should stay separate as request, retrieval, or commitment logic

The copy should foreground:

- blended stored-volume economics
- request-heavy versus archive-heavy behavior
- minimum commitments when smaller accounts cannot carry fixed overhead
- the point at which one all-in rate becomes misleading

### Storage follow-up path

The storage page should not use broad guide spillover.

It should use a tighter retained path centered on:

- `price-per-gb-month-explained`
- `storage-costs-and-pricing`
- `storage-retrieval-fees`
- `gb-month`
- `minimum-commitment`
- one additional resource only if it materially sharpens the packaging decision

## Content strategy

This batch should improve uniqueness in two ways.

### Structural uniqueness

The page should visibly behave differently from non-flagship tools.

### Judgment uniqueness

The storage tool record should express clearer editorial logic around:

- what belongs in the base price
- when request or retrieval charges should stay separate
- when hot and archive workloads should not share one public rate
- when fixed overhead requires a commitment structure

## Testing strategy

This batch should follow the same narrow TDD model as the prior flagship work.

### Storage content regression

Tighten `tests/storage-pricing-content.test.mjs` so the storage tool record must
show stronger packaging-boundary signals.

### Storage flagship page UX regression

Extend `tests/flagship-tool-page-ux.test.mjs` so the shared template must
contain a dedicated flagship path for `storage-cost-calculator`, including:

- storage in the flagship slug set
- a storage-specific decision-summary path
- a storage-specific packaging-change heading
- a tighter storage follow-up resource set

### Guardrail verification

Keep the existing core cluster, depth, and priority tests green so the batch
stays narrow and does not weaken the retained-core constraints already in place.

## Non-goals

This batch should not:

- redesign the tool template
- widen to bandwidth or cloud-cost pages
- change formulas or calculator inputs
- create broad new storage support inventory
- drift into operational storage architecture education

## Success criteria

The batch is successful if:

- `storage-cost-calculator` gains a visibly distinct flagship structure
- the page uses stronger original language around storage packaging boundaries
- the follow-up path is tighter and less index-like
- calculator behavior stays unchanged
- storage-specific tests pass alongside the shared guardrail suite
