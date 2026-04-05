# API Call Boundary Wave 16 Review Log

## What This Batch Changed

- Tightened `api-call` from a broader API usage glossary page into a retained
  support term about when an API call is a commercially honest public billing
  unit and when the billable-event boundary becomes too ambiguous to publish.
- Updated retained glossary depth so the page now has a stricter wave-16
  structure around:
  - definition
  - pricing importance
  - how API call boundaries become commercially misleading
  - tool interpretation
  - common mistakes
  - example
- Updated retained link concentration so the page now explicitly depends on
  stronger retained API support from:
  - `api-pricing-model`
  - `value-metric-selection`
  - `api-pricing-calculator`
  - `rate-limit`
  - `overage`
- Refreshed frontmatter, trust signals, and sources so the page now frames API
  calls as a real commercial decision about:
  - billable-event boundary clarity
  - buyer estimation quality
  - retries and background activity
  - premium endpoints and uneven request mix
- Kept weaker adjacent API inventory and broader glossary support absent from
  the entry:
  - `api-free-tier-guardrails`
  - `request-pricing-model`
  - `usage-based-pricing`
  - `pricing-metric`

## Why This Batch Was Worth Doing

- `api-call` already sits inside the retained glossary surface and now matters
  more after waves 13, 14, and 15 tightened the retained API chain.
- That made it too important to leave as a mostly generic API terminology page.
- Reframing the term around publishable billable-event boundary versus
  misleading public meter gives the API cluster a cleaner support sequence:
  - packaging structure decision
  - billable event clarity
  - throughput boundary
  - paid escalation path
- This improves retained-core quality, reduces glossary template feel, and
  makes one of the site's most reusable API topics feel more deliberately
  maintained.

## What This Batch Intentionally Did Not Change

- No URL changes.
- No calculator formula changes.
- No redesign.
- No broader API cluster rewrite.
- No index-status change for this page.
- No merge, push, or live-site verification happened yet.

## Verification Run

- Red step:
  - `node --test tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs`
  - Result: expected fail on missing wave-16 boundary heading and missing
    strengthened retained API support in `api-call`
- Green and regression checks:
  - `node --test tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs`
  - `node --test tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs tests/glossary-trust-data.test.mjs tests/api-pricing-content.test.mjs tests/hub-curation.test.mjs tests/site-quality-signals.test.mjs tests/template-quality.test.mjs tests/navigation-deduping.test.mjs tests/content-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/seo-meta.test.mjs`
  - `npm run build`
  - `node --test tests/sitemap-governance.test.mjs`

All green checks passed in the current worktree.

## Local HTML Review Notes

- `dist/glossary/api-call/index.html` now includes:
  - `Reviewed`
  - `Sources and references`
  - `/guides/api-pricing-model/`
  - `/guides/value-metric-selection/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
- The rendered page does not include:
  - `/guides/api-free-tier-guardrails/`
  - `/guides/request-pricing-model/`
  - `/glossary/usage-based-pricing/`
  - `/glossary/pricing-metric/`

## Remaining Risks

- The page is stronger locally, but it has not yet been merged, pushed, or
  checked on the live site.
- The retained API chain is now tighter, but adjacent retained pages still need
  to stay differentiated so the cluster does not drift back toward reusable
  template inventory.
- This batch improves one important glossary term, but the broader site still
  carries historical low-value content, so it does not by itself remove the
  full low-quality-site risk.

## Recommended Next Step

- Review the wave-16 diff carefully.
- Keep this branch grouped with the retained-core line rather than pushing it
  alone.
- Then decide whether the next move should be:
  - a unified review/upload preparation batch for the retained API chain
  - or one final targeted retained support batch only if it tightens the same
    buyer-facing sequence without widening scope
