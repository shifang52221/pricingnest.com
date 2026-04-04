# Pricing Page Trust Strengthening Wave 7 Review Log

## What This Batch Changed

- Strengthened `pricing-page-trust-elements` from a short checklist page into a
  reviewed retained-core guide about pricing-page trust decisions.
- Added retained-depth coverage so the page now has a required structure around:
  - when pricing-page trust becomes a pricing problem
  - what buyers need to verify first
  - where pricing pages lose trust
  - proof vs policy clarity vs simplicity
  - calculator interpretation
  - next steps
- Added guide-trust coverage so the page is now part of the enforced
  reviewed-guide set with:
  - `author`
  - `reviewedBy`
  - `reviewed`
  - `sources`
- Added retained-link concentration coverage so the page now depends on
  stronger retained trust support:
  - `value-metric-selection`
  - `annual-prepay-discount`
  - `billing-cycle`
  - `annual-prepay-discount`
- Removed weaker adjacent support paths from the page body and support layer:
  - `pricing-page-comparison-table`
  - `pricing-tier-design`
  - `annual-plan`
  - `pricing-page`

## Why This Batch Was Worth Doing

- This page was still indexable, retained, and promoted from the homepage and
  guides hub, but it still read like a reusable checklist.
- That mismatch made the retained indexed layer look thinner than it should in
  a topic that directly affects buyer confidence and site quality.
- Reframing the page as a decision guide reduces template feel and makes the
  page more consistent with the stronger retained-core content that now anchors
  the site.

## What This Batch Intentionally Did Not Change

- No URL changes.
- No calculator formula changes.
- No redesign.
- No broader pricing-page cluster rewrite.
- No index-status change for this page.
- No merge or live verification happened yet.

## Verification Run

- `node tests/retained-guide-depth.test.mjs`
- `node tests/guide-trust-data.test.mjs`
- `node tests/retained-link-concentration.test.mjs`
- `node tests/site-quality-signals.test.mjs`
- `node tests/template-quality.test.mjs`
- `node tests/hub-curation.test.mjs`
- `node tests/navigation-deduping.test.mjs`
- `node tests/tool-trust-data.test.mjs`
- `npm run build`

All passed in the current worktree.

## Local HTML Review Notes

- `dist/guides/pricing-page-trust-elements/index.html` now includes:
  - `Reviewed`
  - `Sources and references`
  - `value-metric-selection`
  - `annual-prepay-discount`
  - `billing-cycle`
- The rendered page does not include:
  - `pricing-page-comparison-table`
  - `annual-plan`

## Remaining Risks

- The page is stronger locally, but it has not yet been merged, pushed, or
  checked on the live site.
- The pricing-page trust topic is stronger, but adjacent retained-core items
  such as `value-metric-selection`, `minimum-commitment-model`, and
  `saas-gross-margin-targets` still matter for the broader pricing-page quality
  story.
- Site-wide retained-core quality still depends on continuing to shrink or
  ignore weaker indexed support pages rather than letting this single stronger
  guide carry too much of the trust and UX story.

## Recommended Next Step

- Recommended immediate next step:
  - review the wave-7 diff
  - merge it cleanly
  - push once
  - perform no-cache live verification

- Recommended next retained-core candidate after that:
  - `value-metric-selection`
  - or `minimum-commitment-model` if we want another high-value pricing-page
    support decision page before reopening storage work
