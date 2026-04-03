# Bandwidth Guide Strengthening Wave 4 Review Log

## What This Batch Changed

- Strengthened `bandwidth-pricing-guide` from a short checklist page into a
  retained-core decision guide.
- Added retained-guide depth coverage so the page now has a hard floor for:
  - structure
  - topic coverage
  - minimum word count
- Added guide-trust coverage so the page must carry:
  - `author`
  - `reviewedBy`
  - `reviewed`
  - `sources`
- Added retained link-concentration coverage so the guide now favors:
  - `bandwidth-pricing-guardrails`
  - `cdn-cost-pass-through`
  - `egress`
  and no longer leans on `cogs`.
- Rebuilt the site and reviewed generated HTML for the updated guide.

## Why This Batch Was Worth Doing

- The bandwidth calculator is already strengthened and live, but its main guide
  was still visibly weaker than the retained-core standard.
- That mismatch made the bandwidth cluster look partly curated and partly
  templated.
- Tightening the guide reduces low-quality-site risk in a priority tool cluster
  without reopening a broad rewrite wave.

## What This Batch Intentionally Did Not Change

- No calculator formulas changed.
- No URLs changed.
- No new pages were added.
- No broader bandwidth-cluster rewrite happened.
- `bandwidth-pricing-guardrails` and `cdn-cost-pass-through` were left for a
  later batch.

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

All passed in `bandwidth-guide-strengthening-wave-4`.

## Local HTML Review Notes

- `dist/guides/bandwidth-pricing-guide/index.html` now includes:
  - `Reviewed`
  - `Sources and references`
  - `bandwidth-pricing-guardrails`
  - `cdn-cost-pass-through`
- The rendered guide does not include `glossary/cogs`.

## Remaining Risks

- The retained bandwidth cluster still includes thin support pages outside this
  batch, especially `bandwidth-pricing-guardrails` and
  `cdn-cost-pass-through`.
- This batch is only locally verified and not yet merged or live-checked.
- The broader retained-core queue still contains older pages whose queue order
  documents have not been fully refreshed after the recent recovery merges.

## Recommended Next Batch

- Best next candidate: `bandwidth-pricing-guardrails`
- Secondary candidate: `pricing-page-trust-elements`

Rationale:

- `bandwidth-pricing-guardrails` is now the most obvious remaining weak page in
  the bandwidth cluster after this guide rewrite.
- `pricing-page-trust-elements` is still a retained-core page with template-like
  structure, but it is less tightly coupled to the bandwidth recovery line.
