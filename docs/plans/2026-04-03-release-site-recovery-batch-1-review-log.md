# Release Site Recovery Batch 1 Review Log

## What This Batch Changed

- Assembled the visible recovery chain into one isolated release candidate on
  `release-site-recovery-batch-1`.
- Merged the full retained-core recovery stack by merging
  `retained-core-strengthening-wave-3`, which already included:
  - `strict-contraction-wave-2`
  - `retained-core-strengthening-wave-1`
  - `retained-core-strengthening-wave-2`
- Re-ran the unified verification gate for governance, retention, trust,
  template quality, SEO metadata, build, and sitemap behavior.
- Reviewed local generated HTML for the bandwidth calculator, strengthened
  retained guides, strengthened retained glossary pages, and the generated
  sitemap.
- Found and fixed an integration-layer issue in
  [`src/pages/saas-pricing/[slug].astro`](f:/www/www.pricingnest.com/.worktrees/release-site-recovery-batch-1/src/pages/saas-pricing/[slug].astro)
  where visible core-tool follow-up links were filtering out noindex support
  pages.
- Added
  [`tests/bandwidth-cluster-rendering.test.mjs`](f:/www/www.pricingnest.com/.worktrees/release-site-recovery-batch-1/tests/bandwidth-cluster-rendering.test.mjs)
  so the bandwidth calculator now has a post-build regression test requiring
  the full visible curated cluster:
  - `bandwidth-pricing-guide`
  - `bandwidth-pricing-guardrails`
  - `cdn-cost-pass-through`
  - `egress`
  - `bandwidth`
- Audited root-level leftovers without deleting anything and recorded the
  result in
  [`2026-04-03-root-inventory-audit.md`](f:/www/www.pricingnest.com/.worktrees/release-site-recovery-batch-1/docs/plans/2026-04-03-root-inventory-audit.md).

## Verification Completed

The unified batch passed:

- `node tests/bandwidth-pricing-content.test.mjs`
- `node tests/content-governance.test.mjs`
- `node tests/recovery-retention-thresholds.test.mjs`
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
- `npm run build`
- `node tests/sitemap-governance.test.mjs`
- `node tests/core-tool-clusters.test.mjs`
- `node tests/bandwidth-cluster-rendering.test.mjs`

## Local HTML Review Notes

- `/saas-pricing/bandwidth-cost-calculator/` now shows the intended pricing
  metadata, reviewed block, sources, decision-oriented FAQ, and the full visible
  curated follow-up cluster.
- `/guides/api-pricing-model/` and `/guides/value-metric-selection/` show
  stronger review metadata, source blocks, and next-step concentration.
- `/glossary/usage-based-pricing/` and `/glossary/churn/` show stronger trust
  cues and retained-core support framing.
- `dist/sitemap-0.xml` still contains the intended retained pages such as
  `value-metric-selection`, `usage-based-pricing`, and `churn`, while known
  tightened pages like `pricing-page-layout-checklist` and `annual-plan` remain
  absent.

## What This Batch Intentionally Did Not Change

- No merge back to `main` yet
- No push to `origin/main`
- No live production verification yet
- No redesign
- No URL changes
- No calculator formula changes
- No new content expansion
- No root-level deletion

## Remaining Risks

- The batch is still only locally assembled and locally verified; production has
  not been checked with no-cache HTML yet.
- Search Console and Google-quality effects will lag behind release, so local
  quality gains still need post-deploy observation.
- `audits/` remains a tracked historical root directory and still needs its own
  cleanup or archival decision outside this release.

## What The Next Batch Should Do

1. Review this release branch diff one more time for scope discipline.
2. If approved, merge `release-site-recovery-batch-1` back into `main`.
3. Push only after the merge is confirmed clean.
4. Perform no-cache production checks for:
   - `/saas-pricing/bandwidth-cost-calculator/`
   - at least two retained guides
   - at least two retained glossary pages
   - `sitemap-0.xml`
5. After live verification, choose the next narrow batch:
   - `storage-cost-calculator` intent tightening
   - or the next retained-core strengthening item from the queue
