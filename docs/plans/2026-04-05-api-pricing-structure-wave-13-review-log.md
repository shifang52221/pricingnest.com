# API Pricing Structure Wave 13 Review Log

## What This Batch Changed

- Tightened `api-pricing-model` from a broader API pricing explainer into a
  retained-core decision page about when one public API usage rate is still
  honest enough to publish and when the model needs more visible packaging
  structure.
- Updated retained-depth expectations so the page now has a stricter wave-13
  structure around:
  - when API pricing becomes a packaging-structure decision
  - inputs to confirm before publishing one API usage rate
  - where teams force one API rate across incompatible customer patterns
  - billable unit vs base fee vs included usage vs rate limit vs overage
  - calculator interpretation
  - next steps
- Updated retained link concentration so the page now explicitly depends on
  stronger retained support from:
  - `api-cost-estimation`
  - `value-metric-selection`
  - `api-call`
  - `rate-limit`
  - `overage`
- Refreshed frontmatter, trust signals, and sources so the page now frames API
  pricing as a visible packaging decision tied to:
  - billable-unit clarity
  - fixed-overhead recovery
  - included-usage boundaries
  - visible rate-limit expectations
  - paid overage handling
- Kept weaker adjacent API inventory absent from the guide:
  - `api-free-tier-guardrails`
  - `api-tier-design`
  - `api-rate-limit-pricing`
  - `cogs`

## Why This Batch Was Worth Doing

- `api-pricing-model` already sits inside the retained indexed surface, which
  makes it too important to leave as a partially generic API article.
- The older framing still explained API pricing reasonably well, but it did not
  force a clear decision about when a simple usage rate stops being enough for
  real buyers and real margin protection.
- Reframing the page around usage rate versus packaging structure gives the API
  cluster a cleaner decision chain:
  - cost estimation
  - billable-unit and value-metric review
  - visible packaging structure
- That improves user value, reduces template feel, and better supports the
  broader recovery goal of making retained indexed pages look intentionally
  maintained instead of broadly reusable.

## What This Batch Intentionally Did Not Change

- No URL changes.
- No calculator formula changes.
- No redesign.
- No broader API cluster rewrite.
- No index-status change for this page.
- No attempt to reopen weaker API support inventory.
- No merge, push, or live-site verification happened yet.

## Verification Run

- Red step:
  - `node --test tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs`
  - Result: expected fail on missing wave-13 heading and missing strengthened
    retained API support in `api-pricing-model`
- Green and regression checks:
  - `node --test tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs`
  - `node --test tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs tests/guide-trust-data.test.mjs tests/api-pricing-content.test.mjs tests/core-tool-clusters.test.mjs tests/hub-curation.test.mjs tests/site-quality-signals.test.mjs tests/template-quality.test.mjs tests/navigation-deduping.test.mjs tests/tool-trust-data.test.mjs tests/content-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/seo-meta.test.mjs`
  - `npm run build`
  - `node --test tests/sitemap-governance.test.mjs`

All green checks passed in the current worktree.

## Local HTML Review Notes

- `dist/guides/api-pricing-model/index.html` now includes:
  - `Reviewed`
  - `Sources and references`
  - `api-cost-estimation`
  - `value-metric-selection`
  - `/glossary/api-call/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
- The rendered page does not include:
  - `api-free-tier-guardrails`
  - `api-tier-design`
  - `/glossary/cogs/`

## Remaining Risks

- The page is stronger locally, but it has not yet been merged, pushed, or
  checked on the live site.
- The API cluster is tighter, but adjacent retained pages and glossary support
  still need to remain sharply differentiated so the site does not drift back
  toward broad API pricing inventory.
- This batch improves one important retained page, but the broader site still
  carries historical low-value pages, so it does not by itself remove the full
  low-quality-site risk.

## Recommended Next Step

- Review the wave-13 diff carefully.
- Keep this branch grouped with the current retained-core line rather than
  pushing it alone.
- Then move to the next retained API support page only if it strengthens the
  same decision chain without widening scope:
  - `rate-limit`
  - or `overage`
