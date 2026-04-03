# Release Site Recovery Batch 1 Design

## Goal

Assemble the already-finished recovery chain into one pre-release candidate so
we can validate the site as a smaller, stronger, more human-maintained English
pricing site before any merge or push.

## Current context

- `main` already contains the earlier bandwidth pricing intent tightening work,
  including `4adb4c8 feat: tighten bandwidth pricing intent`.
- The visible recovery chain is complete but not yet integrated back into
  `main`:
  - `strict-contraction-wave-2`
  - `retained-core-strengthening-wave-1`
  - `retained-core-strengthening-wave-2`
  - `retained-core-strengthening-wave-3`
- `retained-core-strengthening-wave-3` is the top of that linear chain and sits
  22 commits ahead of `main`.
- The current program constraints are fixed:
  - no redesign
  - no URL changes
  - no calculator formula changes
  - no widened content inventory
  - no scattered uploads
- The user preference is also fixed:
  - finish the work properly
  - review deeply
  - keep batches structured
  - do not push until the unified batch is ready

## Core problem

We no longer have a content-design problem for this batch. We now have a
release-assembly problem.

The recovery work exists, but it is still split across worktrees. If we merge
or push casually, we risk:

- treating the recovery work like scattered page edits instead of one coherent
  quality-recovery release
- missing regressions that only show up after the full chain is assembled
- mixing unrelated cleanup into the release and expanding scope
- weakening the release discipline we just established for Google-quality
  recovery

## Approaches considered

### Option 1: Create a dedicated pre-release integration worktree from `main` and merge only `retained-core-strengthening-wave-3`

This treats `retained-core-strengthening-wave-3` as the complete recovery
candidate because it already linearly contains:

- `strict-contraction-wave-2`
- `retained-core-strengthening-wave-1`
- `retained-core-strengthening-wave-2`

Pros:

- lowest integration complexity
- cleanest release story
- easiest diff review
- preserves `main` as a safe baseline until the full batch passes

Cons:

- requires one extra worktree for final assembly

### Option 2: Fast-forward `main` directly to `retained-core-strengthening-wave-3`

This is the shortest path mechanically, but it moves the shared baseline before
the final verification and review are complete.

Pros:

- fewest git steps

Cons:

- weak isolation
- harder rollback posture
- easier to turn `main` into a half-reviewed release candidate

### Option 3: Rebuild the release by cherry-picking each recovery branch into a fresh branch

This gives fine-grained control but replays work that is already linearly
composed.

Pros:

- maximum manual control

Cons:

- highest coordination cost
- easiest way to introduce human error
- duplicates work we have already validated

## Recommendation

Use Option 1.

Create a dedicated pre-release integration worktree from `main`, merge only
`retained-core-strengthening-wave-3`, and treat that merged result as the
single candidate for batch-level verification and review.

That is the best fit for the current recovery program because it gives us:

- isolation from `main`
- one coherent recovery candidate
- one full verification gate
- one unified review log
- one later merge/push decision instead of scattered movement

## Release architecture

### Baseline

- Base branch: `main`
- Integration input: `retained-core-strengthening-wave-3`
- Integration environment: a dedicated worktree such as
  `release-site-recovery-batch-1`

### What the unified batch contains

- indexed-surface contraction from `strict-contraction-wave-2`
- retained-core strengthening from waves 1, 2, and 3
- the tests, plans, and review docs required to govern that work
- the already-landed bandwidth pricing intent tightening that exists on `main`

### What the unified batch does not contain

- new content expansion
- additional strengthening waves
- root-folder cleanup actions
- unrelated refactors
- design or layout changes

## Fixed release flow

1. Create a dedicated integration worktree from `main`.
2. Merge `retained-core-strengthening-wave-3` into the integration branch.
3. Review the combined diff before running the full gate.
4. Run batch-specific tests first.
5. Run site-quality, governance, trust, template, and build verification.
6. Inspect generated HTML for the highest-risk retained pages and the bandwidth
   calculator.
7. Record one unified review log for the entire batch.
8. Only then decide whether to merge back to `main` and push.
9. After deploy, perform no-cache production checks before calling the batch
   live.

## Verification gate

The unified batch must pass all of the following before merge or push:

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

## Required local HTML review

After the full test gate and build pass, inspect local generated HTML for:

- `/saas-pricing/bandwidth-cost-calculator/`
- `/guides/api-pricing-model/`
- one additional strengthened retained guide
- `/glossary/usage-based-pricing/`
- `/glossary/churn/`
- `sitemap-0.xml`

The HTML review is there to confirm that the release still feels curated and
human-maintained, not merely test-compliant.

## Risk controls

### Scope control

- Do not mix new content work into this batch.
- Do not mix root cleanup deletes into this batch.
- Do not reopen additional retained pages during integration unless a regression
  blocks release.

### Regression control

If something fails during integration, classify it before fixing it:

- merge conflict or integration-only issue
- stale test expectation
- true content-quality or trust-signal regression
- build artifact or generated-output mismatch

The fix should happen in the integration branch unless the problem clearly
belongs in the originating worktree.

### Quality control

If the integrated pages show renewed template feel, weakened intent, repeated
FAQ structure, or diluted link concentration, hold the batch and review again
instead of forcing a release.

## Root-directory leftovers policy

Root-directory leftovers should be audited during this batch, but not deleted as
part of this release.

The correct release-safe action is:

1. inventory the root-level leftovers
2. classify each item as:
   - clearly unused
   - possibly referenced
   - requires more confirmation
3. write the audit down for a later cleanup-only batch

This keeps the recovery release focused on site quality and search-quality
signals rather than filesystem hygiene.

## Post-release review rules

The release is not complete immediately after merge or push.

Required production checks:

- no-cache HTML for the bandwidth calculator
- no-cache HTML for at least two retained guides
- no-cache HTML for at least two retained glossary pages
- `sitemap-0.xml` confirmation that newly noindexed pages are absent

Required follow-up window:

- re-check the release within 3 to 7 days
- confirm the retained core still has clean internal paths
- confirm the indexable surface is still intentionally narrow
- use Search Console feedback to guide the next small batch

## Success criteria

- the recovery chain is assembled as one isolated release candidate
- the unified diff is reviewable and scoped
- the full governance, trust, template, and build gate passes in one place
- local HTML confirms the retained core reads like a curated decision site
- root leftovers are audited separately rather than mixed into release scope
- the next batch can start from a repeatable release process instead of an ad
  hoc one

## Non-goals

- no push in this design step
- no merge to `main` in this design step
- no live deployment in this design step
- no content expansion
- no new calculator tightening beyond the already-approved release candidate
