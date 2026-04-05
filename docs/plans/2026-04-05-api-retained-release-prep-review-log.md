# API Retained Release Prep Review Log

## What This Batch Changed

- Created one dedicated local release-prep branch from `main` for the retained
  API chain instead of merging the stacked wave branches directly.
- Cherry-picked the exact approved wave-13 to wave-16 commits so the local
  release candidate now contains only:
  - `api-pricing-model`
  - `rate-limit`
  - `overage`
  - `api-call`
- Preserved the plan, design, implementation, and per-wave review documents for
  each API wave inside the release-prep candidate.
- Assembled one API-only local diff against `main` without bringing in earlier
  retained-core waves 8 through 12.
- Re-ran the full retained API verification gate and rebuilt the site from the
  integrated branch.
- Reviewed rendered HTML for the retained API guide, three retained API
  glossary pages, and the generated sitemap.

## Why This Batch Was Worth Doing

- The retained API chain was already locally complete, but its branch shape was
  broader than the approved release scope because wave 16 sat on top of earlier
  unmerged retained-core work.
- Creating an API-only release-prep candidate solved that scope-control problem
  without reopening already-finished content decisions.
- This gives the project one clean local candidate that can be reviewed as a
  coherent retained API cluster instead of four isolated worktrees or one
  accidentally widened retained-core release.
- It also improves merge discipline because the eventual upload decision can now
  be made from a branch whose scope is explicit and auditable.

## What This Batch Intentionally Did Not Change

- No merge back to `main`
- No push to `origin`
- No live no-cache verification
- No inclusion of retained-core waves 8 through 12
- No new content expansion
- No redesign
- No URL changes
- No calculator formula changes
- No unrelated root cleanup

## Cherry-Picked Commits

The local release-prep branch includes these approved commits in order:

1. `074cc83` `docs: plan api pricing structure wave 13`
2. `bdcbaf0` `feat: tighten api pricing packaging structure guide`
3. `581e59f` `docs: plan rate limit packaging wave 14`
4. `1639026` `feat: tighten rate limit packaging glossary support`
5. `47ca7cd` `docs: plan overage escalation wave 15`
6. `f832f1b` `feat: tighten overage escalation glossary support`
7. `a3b6138` `docs: plan api call boundary wave 16`
8. `bdaf473` `feat: tighten api call billable boundary glossary support`

All cherry-picks applied cleanly without manual conflict resolution.

## Verification Completed

The integrated API-only release-prep candidate passed:

- `node --test tests/retained-guide-depth.test.mjs tests/retained-glossary-depth.test.mjs tests/guide-trust-data.test.mjs tests/glossary-trust-data.test.mjs tests/retained-link-concentration.test.mjs tests/api-pricing-content.test.mjs tests/core-tool-clusters.test.mjs tests/hub-curation.test.mjs tests/site-quality-signals.test.mjs tests/template-quality.test.mjs tests/navigation-deduping.test.mjs tests/tool-trust-data.test.mjs tests/content-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/seo-meta.test.mjs`
- `npm run build`
- `node --test tests/sitemap-governance.test.mjs`

## Local HTML Review Notes

- `dist/guides/api-pricing-model/index.html` includes:
  - `Reviewed`
  - `Sources and references`
  - `/guides/value-metric-selection/`
  - `/glossary/api-call/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
- `dist/guides/api-pricing-model/index.html` does not include:
  - `api-free-tier-guardrails`
  - `api-tier-design`
- `dist/glossary/rate-limit/index.html` includes:
  - `Reviewed`
  - `Sources and references`
  - `/guides/api-pricing-model/`
  - `/guides/value-metric-selection/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/api-call/`
  - `/glossary/overage/`
- `dist/glossary/rate-limit/index.html` does not include:
  - `api-rate-limit-pricing`
  - `/guides/request-pricing-model/`
  - `/glossary/usage-based-pricing/`
  - `/glossary/pricing-metric/`
- `dist/glossary/overage/index.html` includes:
  - `Reviewed`
  - `Sources and references`
  - `/guides/api-pricing-model/`
  - `/guides/usage-based-pricing-examples/`
  - `/saas-pricing/tiered-usage-pricing-calculator/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/included-usage/`
  - `/glossary/rate-limit/`
- `dist/glossary/overage/index.html` does not include:
  - `/guides/api-cost-estimation/`
  - `/guides/overage-policy-design/`
  - `/guides/overage-communication/`
  - `/glossary/usage-based-pricing/`
- `dist/glossary/api-call/index.html` includes:
  - `Reviewed`
  - `Sources and references`
  - `/guides/api-pricing-model/`
  - `/guides/value-metric-selection/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
- `dist/glossary/api-call/index.html` does not include:
  - `/guides/api-free-tier-guardrails/`
  - `/guides/request-pricing-model/`
  - `/glossary/usage-based-pricing/`
  - `/glossary/pricing-metric/`
- `dist/sitemap-0.xml` still includes:
  - `api-pricing-model`
  - `rate-limit`
  - `overage`
  - `api-call`

## Remaining Risks

- The candidate is only locally assembled and locally verified; nothing has been
  merged or pushed yet.
- The branch now has a clean API-only scope, but the eventual upload batch still
  needs a deliberate decision on whether it should remain API-only or be grouped
  with another already-reviewed retained line.
- Search and Google-quality effects will still lag after release, so this local
  success does not by itself prove recovery.
- If we later merge this candidate into a broader release branch, we must repeat
  the unified verification gate in that final integration context.

## What The Eventual Upload Check Must Verify

- the merged upload branch still contains only the intended retained API changes
  for this line
- the same unified API verification gate passes again after final integration
- no-cache production HTML shows the retained trust blocks, sources, and focused
  internal links for:
  - `/guides/api-pricing-model/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
  - `/glossary/api-call/`
- production `sitemap-0.xml` matches the local expected retained API surface

## Recommended Next Step

- Review this local API-only release-prep diff one more time.
- Then decide whether to:
  - merge this branch into `main` as its own unified upload batch
  - or merge it into a larger already-approved release branch and rerun the full
    verification gate there
- Do not push anything until the final branch choice is fixed.
