# Retained Core Strengthening Wave 1 Review Log

## What This Batch Changed
- Strengthened two retained guide pages so they act like real decision pages instead of thin checklist support:
  - `minimum-commitment-model`
  - `price-per-gb-month-explained`
- Strengthened two retained glossary pages so they support core calculator clusters as interpretation layers instead of generic definitions:
  - `rate-limit`
  - `billing-cycle`
- Added retained-depth tests for the two strengthened guide pages.
- Added retained-depth and trust requirements for the two strengthened glossary pages.
- Tightened retained-link concentration so the strengthened pages rely on retained-core neighbors instead of weaker glossary or noindexed guide support.

## Why This Batch Was Worth Doing
- These four pages sit close to retained calculator clusters and were still using thin structure, weak support links, or generic glossary framing.
- After the earlier contraction waves, the next quality win was not more noindex work. It was proving that the remaining indexed support layer deserves to stay indexed.
- This batch makes the site feel more curated and human-maintained without widening the indexed surface.

## What This Batch Intentionally Did Not Change
- No calculator formulas changed.
- No URLs changed.
- No governance rules changed.
- No hub or navigation architecture changed.
- No new content types or new pages were added.

## Verification Run
- `node tests/retained-guide-depth.test.mjs`
- `node tests/retained-glossary-depth.test.mjs`
- `node tests/glossary-trust-data.test.mjs`
- `node tests/retained-link-concentration.test.mjs`
- `node tests/site-quality-signals.test.mjs`
- `node tests/template-quality.test.mjs`
- `node tests/hub-curation.test.mjs`
- `node tests/navigation-deduping.test.mjs`
- `node tests/tool-trust-data.test.mjs`
- `node tests/guide-trust-data.test.mjs`
- `node tests/seo-meta.test.mjs`
- `npm run build`
- `node tests/sitemap-governance.test.mjs`

## Remaining Risks
- Some `observe-for-now` pages are still indexed and still thinner than the strengthened retained core.
- `value-metric-selection` is still important enough to justify a future strengthening pass even though it was intentionally left out of this batch.
- Several retained support pages outside this batch may still need stronger examples or more distinctive next-step framing to reduce residual template feel.

## Recommended Next Batch
- Strengthen the next retained bridge page set rather than opening a new broad contraction wave.
- Best next candidates:
  - `value-metric-selection`
  - `saas-gross-margin-targets`
  - `api-call`
  - `annual-prepay-discount`
