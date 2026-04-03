# Retained Core Strengthening Wave 3 Review Log

## What This Batch Changed
- Strengthened one retained guide bridge page:
  - `api-pricing-model`
- Strengthened two retained glossary bridge pages:
  - `usage-based-pricing`
  - `churn`
- Added retained depth coverage so `api-pricing-model` now has the same retained-guide bar as the stronger decision pages.
- Added retained link-concentration coverage so:
  - `api-pricing-model` now depends on `api-call` and `rate-limit` instead of weaker glossary support such as `cogs`
  - `usage-based-pricing` now depends on `value-metric-selection` instead of `usage-mix-modeling`
  - `churn` now depends on retained annual and pricing-impact pathways instead of weak `noindex` support pages
- Extended retained guide trust coverage so `api-pricing-model` now carries the same source metadata floor as the stronger retained guides.

## What This Batch Intentionally Did Not Change
- No URL structure changes.
- No new pages.
- No calculator formula changes.
- No new contraction wave.
- No bandwidth guide work in this batch.
- No push, merge, or live-site verification.

## Verification Run
- `node tests/retained-guide-depth.test.mjs`
- `node tests/retained-glossary-depth.test.mjs`
- `node tests/guide-trust-data.test.mjs`
- `node tests/glossary-trust-data.test.mjs`
- `node tests/retained-link-concentration.test.mjs`
- `node tests/site-quality-signals.test.mjs`
- `node tests/template-quality.test.mjs`
- `node tests/hub-curation.test.mjs`
- `node tests/navigation-deduping.test.mjs`
- `node tests/tool-trust-data.test.mjs`
- `node tests/seo-meta.test.mjs`
- `node tests/content-governance.test.mjs`
- `node tests/recovery-retention-thresholds.test.mjs`
- `npm run build`
- `node tests/sitemap-governance.test.mjs`

All passed in `retained-core-strengthening-wave-3`.

## Remaining Risks
- The site still carries a broad long-tail inventory outside the retained core, so retained strengthening lowers low-quality-site risk but does not eliminate it by itself.
- The unified bandwidth batch and its live verification are still pending, which means the current recovery line is stronger locally than it is on the live site.
- Several tool-adjacent pages outside this batch still need a future pass if the site continues to look mixed-quality after deployment and Search Console re-crawl.

## Next Recommended Batch
- Do not start another retained bridge batch immediately.
- Recommended next step:
  - unify and live-verify the held bandwidth batch
  - check no-cache HTML on the live site
  - only then decide whether the next batch should be:
    - `bandwidth-pricing-guide`
    - `storage-cost-calculator` tightening
    - another small retained support pass near the storage or pricing-change cluster
- Rationale:
  - the main risk now is not lack of another retained page rewrite
  - the bigger risk is that the strengthened recovery line is still not fully reflected in the live environment
