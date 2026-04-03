# Retained Core Strengthening Wave 2 Review Log

## What This Batch Changed
- Strengthened two retained guide bridge pages:
  - `value-metric-selection`
  - `saas-gross-margin-targets`
- Strengthened two retained glossary bridge pages:
  - `api-call`
  - `annual-prepay-discount`
- Added wave-2 retained-depth coverage for the guide pair and glossary pair.
- Added retained trust coverage so `api-call` now has the same editorial trust floor as other retained glossary pages.
- Added retained link-concentration assertions so the batch now favors stronger retained-core neighbors and avoids weaker support inventory.

## What This Batch Intentionally Did Not Change
- No URL structure changes.
- No new pages.
- No calculator formula changes.
- No new hub redesign.
- No broader contraction wave.
- No push, merge, or live-site verification.

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
- `node tests/content-governance.test.mjs`
- `node tests/recovery-retention-thresholds.test.mjs`
- `npm run build`
- `node tests/sitemap-governance.test.mjs`

All passed in `retained-core-strengthening-wave-2`.

## Remaining Risks
- `api-pricing-model` still reads thinner than the retained bridge pages now surrounding it, so the API cluster still has a guide-depth mismatch.
- `annual-prepay-discount` guide and glossary now align better, but the annual cluster still depends on neighboring retained terms like `churn` and `billing-cycle` staying disciplined.
- The site still carries a large long-tail inventory outside the retained core, so this batch improves quality signals but does not by itself remove all low-quality-site risk.

## Next Recommended Batch
- Recommended next retained bridge wave:
  - `api-pricing-model`
  - `bandwidth-pricing-guide`
  - `usage-based-pricing` glossary
  - `churn` glossary
- Rationale:
  - `api-pricing-model` is now the weakest important retained bridge in the API cluster.
  - `bandwidth-pricing-guide` should follow after the bandwidth calculator tightening is unified and live-verified.
  - `usage-based-pricing` and `churn` are high-value retained terms that support multiple calculator and guide clusters.
