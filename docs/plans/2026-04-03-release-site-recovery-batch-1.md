# Release Site Recovery Batch 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Assemble the completed recovery chain into one isolated pre-release
candidate, verify it end to end, record the release review, and only then make
the merge and deploy decision.

**Architecture:** Start from `main` in a dedicated integration worktree created
with `@using-git-worktrees`. Merge only
`retained-core-strengthening-wave-3`, because that branch already contains
`strict-contraction-wave-2`, `retained-core-strengthening-wave-1`, and
`retained-core-strengthening-wave-2`. Run batch-specific tests first, then the
full governance and build gate, inspect generated HTML, record a unified review
log, and keep root-cleanup work out of the release scope.

**Tech Stack:** Git worktrees, Astro, TypeScript, Node.js file-based tests,
PowerShell, generated `dist` HTML review

---

### Task 1: Create the isolated integration worktree

**Files:**
- Create: `.worktrees/release-site-recovery-batch-1/`
- Verify: `.worktrees/release-site-recovery-batch-1`

**Step 1: Create the release worktree from `main`**

Use `@using-git-worktrees`.

Run:

```bash
git worktree add .worktrees/release-site-recovery-batch-1 -b release-site-recovery-batch-1 main
```

Expected: a new worktree exists at
`.worktrees/release-site-recovery-batch-1` on branch
`release-site-recovery-batch-1`.

**Step 2: Verify the new worktree state**

Run:

```bash
git worktree list
git status --short --branch
```

Expected:

- `git worktree list` shows `.worktrees/release-site-recovery-batch-1`
- the new worktree is on `release-site-recovery-batch-1`
- the worktree is clean before integration

**Step 3: Commit the worktree creation context if any doc note was needed**

No git commit is required for worktree creation alone.

### Task 2: Merge the full recovery candidate into the release branch

**Files:**
- Modify: integration branch history in `.worktrees/release-site-recovery-batch-1`
- Verify: `docs/plans/2026-04-03-release-site-recovery-batch-1-design.md`
- Verify: `docs/plans/2026-04-03-release-site-recovery-batch-1.md`

**Step 1: Merge only the top recovery branch**

In the release worktree, run:

```bash
git merge --no-ff retained-core-strengthening-wave-3
```

Expected: merge succeeds and brings in the full recovery chain through wave 3.

**Step 2: If the merge fails, classify the failure before editing**

Allowed classifications:

- merge conflict
- stale expectation
- true regression
- generated-output mismatch

Do not start unrelated cleanup while resolving the merge.

**Step 3: Review the high-level commit and file scope**

Run:

```bash
git log --oneline --decorate -12
git diff --stat main...HEAD
```

Expected:

- the release branch now contains the strict contraction work plus retained-core
  waves 1, 2, and 3
- the diff is limited to approved content, tests, and docs

**Step 4: Commit only if a manual merge resolution changed tracked files**

Run:

```bash
git status --short
```

Expected: clean if the merge was automatic, or staged/conflict-resolved files if
manual conflict resolution was needed.

### Task 3: Run the batch-specific and full release verification gate

**Files:**
- Verify: `tests/bandwidth-pricing-content.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/recovery-retention-thresholds.test.mjs`
- Verify: `tests/retained-guide-depth.test.mjs`
- Verify: `tests/retained-glossary-depth.test.mjs`
- Verify: `tests/guide-trust-data.test.mjs`
- Verify: `tests/glossary-trust-data.test.mjs`
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/sitemap-governance.test.mjs`
- Verify: `package.json`

**Step 1: Run the batch-specific tests first**

Run:

```bash
node tests/bandwidth-pricing-content.test.mjs
node tests/content-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
node tests/retained-guide-depth.test.mjs
node tests/retained-glossary-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/glossary-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: PASS. Any failure must be classified before editing code.

**Step 2: Run the site-wide quality and trust gate**

Run:

```bash
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
node tests/tool-trust-data.test.mjs
node tests/seo-meta.test.mjs
```

Expected: PASS. No weakening of trust or template quality is acceptable.

**Step 3: Build and validate sitemap behavior**

Run:

```bash
npm run build
node tests/sitemap-governance.test.mjs
```

Expected:

- build succeeds
- sitemap governance still matches the stricter indexed surface

**Step 4: Commit only if verification uncovered a real integration-only fix**

Run:

```bash
git status --short
```

Expected: clean if no fix was required.

### Task 4: Inspect generated HTML for release-readiness

**Files:**
- Verify: `dist/saas-pricing/bandwidth-cost-calculator/index.html`
- Verify: `dist/guides/api-pricing-model/index.html`
- Verify: `dist/guides/value-metric-selection/index.html`
- Verify: `dist/glossary/usage-based-pricing/index.html`
- Verify: `dist/glossary/churn/index.html`
- Verify: `dist/sitemap-0.xml`

**Step 1: Inspect the core tool output**

Run:

```bash
Select-String -Path dist/saas-pricing/bandwidth-cost-calculator/index.html -Pattern "Price Per GB Floor","bandwidth-pricing-guide","bandwidth-pricing-guardrails","cdn-cost-pass-through","reviewed"
```

Expected: decision-oriented bandwidth wording, retained-cluster links, and trust
signals are present.

**Step 2: Inspect the retained guide outputs**

Run:

```bash
Select-String -Path dist/guides/api-pricing-model/index.html -Pattern "Reviewed","Sources","Next steps"
Select-String -Path dist/guides/value-metric-selection/index.html -Pattern "Reviewed","Sources","Next steps"
```

Expected: retained guides show stronger trust cues and focused navigation.

**Step 3: Inspect the retained glossary outputs**

Run:

```bash
Select-String -Path dist/glossary/usage-based-pricing/index.html -Pattern "Reviewed","Sources","Related"
Select-String -Path dist/glossary/churn/index.html -Pattern "Reviewed","Sources","Related"
```

Expected: glossary pages still read like support for retained decision pages,
not like generic inventory entries.

**Step 4: Inspect the generated sitemap**

Run:

```bash
Select-String -Path dist/sitemap-0.xml -Pattern "bandwidth-pricing-guardrails","value-metric-selection","usage-based-pricing","churn"
```

Expected:

- retained pages that should still surface remain visible
- pages moved out of the indexable surface stay absent

### Task 5: Audit root-directory leftovers without deleting them

**Files:**
- Create: `docs/plans/2026-04-03-root-inventory-audit.md`

**Step 1: List the repository root contents**

Run:

```bash
Get-ChildItem -Force | Select-Object Mode,Length,LastWriteTime,Name
```

Expected: a clear root-level inventory for audit.

**Step 2: Check whether unusual root files are referenced**

Run:

```bash
rg -n "FILENAME_OR_DIRECTORY_NAME" .
```

Expected: each suspicious item is classified as:

- clearly unused
- possibly referenced
- requires more confirmation

**Step 3: Record the audit instead of deleting anything**

Write `docs/plans/2026-04-03-root-inventory-audit.md` with:

- the item name
- the classification
- the reason
- whether it should be handled in a later cleanup-only batch

**Step 4: Commit the audit doc if it was created**

Run:

```bash
git add docs/plans/2026-04-03-root-inventory-audit.md
git commit -m "docs: audit root inventory leftovers"
```

Expected: one commit only if the audit doc was added.

### Task 6: Record the unified batch review and decide release readiness

**Files:**
- Create: `docs/plans/2026-04-03-release-site-recovery-batch-1-review-log.md`

**Step 1: Write the unified batch review log**

Record:

- what this batch changed
- what this batch intentionally did not change
- remaining risks after local verification
- what the next batch should do

**Step 2: Save the review log**

Create `docs/plans/2026-04-03-release-site-recovery-batch-1-review-log.md`.

**Step 3: Commit the review log**

Run:

```bash
git add docs/plans/2026-04-03-release-site-recovery-batch-1-review-log.md
git commit -m "docs: record unified recovery batch review"
```

Expected: the review log is versioned before any push decision.

**Step 4: Summarize release readiness**

Run:

```bash
git status --short --branch
git log --oneline --decorate -8
```

Expected: a clean release branch with a documented audit trail and a clear
yes/no decision on merging back to `main`.

### Task 7: Only after approval, merge and perform live no-cache verification

**Files:**
- Verify: production `/saas-pricing/bandwidth-cost-calculator/`
- Verify: production retained guides and glossary pages
- Verify: production sitemap

**Step 1: Merge back only after explicit release approval**

Run:

```bash
git checkout main
git merge --no-ff release-site-recovery-batch-1
```

Expected: `main` receives the full unified batch, not scattered commits.

**Step 2: Push only after the merge is confirmed clean**

Run:

```bash
git push origin main
```

Expected: remote `main` receives the unified batch.

**Step 3: Perform no-cache production checks**

Run:

```bash
curl.exe -H "Cache-Control: no-cache" -L https://pricingnest.com/saas-pricing/bandwidth-cost-calculator/ | Select-String -Pattern "Price Per GB Floor","bandwidth-pricing-guide","bandwidth-pricing-guardrails","cdn-cost-pass-through"
curl.exe -H "Cache-Control: no-cache" -L https://pricingnest.com/guides/api-pricing-model/ | Select-String -Pattern "Reviewed","Sources"
curl.exe -H "Cache-Control: no-cache" -L https://pricingnest.com/glossary/usage-based-pricing/ | Select-String -Pattern "Reviewed","Sources"
curl.exe -H "Cache-Control: no-cache" -L https://pricingnest.com/sitemap-0.xml
```

Expected:

- updated pages are live without relying on cache
- retained trust signals are present
- sitemap output matches the stricter governance state

**Step 4: Close the batch before opening the next one**

Use `@verification-before-completion`.

Only after live verification passes should the next batch be chosen.
