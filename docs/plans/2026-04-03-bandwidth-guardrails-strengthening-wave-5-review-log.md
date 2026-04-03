# Bandwidth Guardrails Strengthening Wave 5 Review Log

## What This Batch Changed

- Strengthened `bandwidth-pricing-guardrails` from a checklist-style support
  page into a reviewed decision-support guide.
- Added guide-depth coverage so the page now has a structure floor around:
  - when guardrails are needed
  - what to confirm first
  - where they fail
  - options and trade-offs
  - calculator interpretation
  - next steps
- Added guide-trust coverage so the page must now carry:
  - `author`
  - `reviewedBy`
  - `reviewed`
  - `sources`
- Added link-concentration coverage so the page now depends on stronger
  bandwidth-cluster neighbors:
  - `bandwidth-pricing-guide`
  - `cdn-cost-pass-through`
  - `bandwidth-cost-calculator`
- Kept `glossary/cogs` out of the guide support layer.

## Why This Batch Was Worth Doing

- After the bandwidth calculator and main bandwidth guide were strengthened,
  this page became the next visible quality mismatch in the same cluster.
- The old page looked templated compared with the reviewed bandwidth pages now
  surrounding it.
- Tightening it helps the cluster feel more curated and lowers the odds that
  Google sees the retained bandwidth support layer as low-quality filler.

## What This Batch Intentionally Did Not Change

- No calculator formulas changed.
- No URL changes.
- No new pages were added.
- `cdn-cost-pass-through` was not rewritten in this batch.
- No merge or live verification happened yet.

## Verification Run

- `node tests/decision-guide-depth.test.mjs`
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

- `dist/guides/bandwidth-pricing-guardrails/index.html` now includes:
  - `Reviewed`
  - `Sources and references`
  - `bandwidth-pricing-guide`
  - `cdn-cost-pass-through`
- The rendered page does not include `glossary/cogs`.

## Remaining Risks

- `cdn-cost-pass-through` is still thin relative to the rest of the bandwidth
  cluster and is now the clearest remaining weak support page in that cluster.
- This batch is only locally verified; it is not merged or live-checked.
- The current worktree also contains the previously completed
  `bandwidth-pricing-guide` batch, so merge/review should treat them as a single
  bandwidth-support line unless we deliberately split them.

## Recommended Next Batch

- Best next candidate: `cdn-cost-pass-through`
- Alternative next candidate: `pricing-page-trust-elements`

Rationale:

- `cdn-cost-pass-through` is now the most obvious weak page left inside the
  bandwidth cluster.
- `pricing-page-trust-elements` is still important for site-wide quality, but it
  is less directly coupled to the bandwidth recovery line.
