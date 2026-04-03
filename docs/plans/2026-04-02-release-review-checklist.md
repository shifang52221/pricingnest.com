# Release Review Checklist

## Required Batch Flow
1. Start inside a dedicated worktree.
2. Write the design doc first.
3. Write the implementation plan second.
4. If behavior changes, write failing tests before changing production code or governance data.
5. Implement the smallest batch that satisfies the approved plan.
6. Run targeted verification for the files and behavior changed in the batch.
7. Run governance, site-quality, template, trust, and build verification before merge.
8. Review the diff for accidental scope creep, template regressions, and off-intent copy.
9. Merge and push only as a unified batch, not as scattered single-page uploads.
10. Verify production with no-cache HTML checks after deploy.
11. Record a batch review log before opening the next batch.

## Standard Verification Commands
```bash
node tests/content-governance.test.mjs
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
node tests/tool-trust-data.test.mjs
npm run build
node tests/sitemap-governance.test.mjs
```

## Batch-Specific Verification Rule
- Always add the wave-specific or feature-specific tests for the batch before the standard verification set.
- Examples: `bandwidth-pricing-content`, `wave-two-governance`, `recovery-retention-thresholds`, or any newly added retained-depth tests.
- If a test reads generated `dist` artifacts, rebuild first and then run that verification against the fresh output.

## Diff Review Questions
- Did the batch only touch the approved scope?
- Did any retained page gain generic template copy or repetitive FAQ structure?
- Did any newly noindexed page remain in the sitemap?
- Did any retained page lose a meaningful internal path from a core tool or hub?
- Did any metadata or source block drift away from the actual pricing intent?

## Production No-Cache Verification
- Check the updated core tool HTML with `curl.exe -H "Cache-Control: no-cache"` or equivalent.
- Check at least one retained guide and one retained glossary page touched by the batch.
- Check `sitemap-0.xml` and confirm newly noindexed URLs are absent.
- Check the updated metadata, reviewed fields, sources, FAQ copy, and curated cluster links for the batch.

## Required Batch Review Log
- What this batch changed
- What this batch intentionally did not change
- Remaining risks after release
- What the next batch should do

## Release Discipline
- No isolated pushes for a single page that belongs to a larger approved batch.
- No new content expansion while retained-core cleanup is still the active program.
- No skipping the production verification step after merge and deploy.
