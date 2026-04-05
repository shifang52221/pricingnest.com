# API Retained Release Prep Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Assemble an API-only local release candidate from waves 13 through 16
by cherry-picking the exact approved commits into a fresh branch from `main`,
then run unified verification and local review without merging or pushing.

**Architecture:** Work inside the dedicated
`api-retained-release-prep` worktree created from `main`. Cherry-pick the exact
plan and implementation commits for waves 13 through 16 in chronological order,
verify the integrated branch against `main`, then record one unified API review
log and stop before merge or upload.

**Tech Stack:** Git worktrees, PowerShell, Astro, Markdown content collections,
Node.js file-based tests, generated `dist` HTML review

---

### Task 1: Confirm the release-prep worktree baseline

**Files:**
- Verify: `.worktrees/api-retained-release-prep`
- Verify: `package.json`
- Verify: current branch state in `.worktrees/api-retained-release-prep`

**Step 1: Verify the worktree branch and cleanliness**

Run:

```bash
git status --short --branch
git worktree list
```

Expected:

- branch is `api-retained-release-prep`
- worktree is clean before integration
- worktree list shows the dedicated release-prep path

**Step 2: Verify the baseline quality gate on `main`**

Run:

```bash
node --test tests/content-governance.test.mjs tests/hub-curation.test.mjs tests/navigation-deduping.test.mjs tests/site-quality-signals.test.mjs tests/template-quality.test.mjs tests/tool-trust-data.test.mjs tests/seo-meta.test.mjs
```

Expected: PASS so later failures can be attributed to the integrated API batch.

### Task 2: Cherry-pick the exact API wave commits

**Files:**
- Modify: branch history in `.worktrees/api-retained-release-prep`
- Reference: `docs/plans/2026-04-05-api-retained-release-prep-design.md`

**Step 1: Cherry-pick wave 13 plan and implementation**

Run:

```bash
git cherry-pick 074cc83
git cherry-pick bdcbaf0
```

Expected: the release-prep branch gains only the approved wave-13 docs and API
guide tightening.

**Step 2: Cherry-pick wave 14 plan and implementation**

Run:

```bash
git cherry-pick 581e59f
git cherry-pick 1639026
```

Expected: the release-prep branch gains only the approved wave-14 docs and
`rate-limit` tightening.

**Step 3: Cherry-pick wave 15 plan and implementation**

Run:

```bash
git cherry-pick 47ca7cd
git cherry-pick f832f1b
```

Expected: the release-prep branch gains only the approved wave-15 docs and
`overage` tightening.

**Step 4: Cherry-pick wave 16 plan and implementation**

Run:

```bash
git cherry-pick a3b6138
git cherry-pick bdaf473
```

Expected: the release-prep branch gains only the approved wave-16 docs and
`api-call` tightening.

**Step 5: Classify any failure before editing**

Allowed classifications:

- cherry-pick conflict
- stale expectation
- true regression
- generated-output mismatch

Do not add unrelated cleanup if a cherry-pick needs attention.

### Task 3: Review integrated scope before running the full gate

**Files:**
- Verify: integrated branch history
- Verify: diff against `main`

**Step 1: Review the integrated commit list**

Run:

```bash
git log --oneline --decorate -12
```

Expected: the release-prep branch shows the eight approved cherry-picked wave
commits on top of `main`.

**Step 2: Review the integrated diff scope**

Run:

```bash
git diff --stat main...HEAD
```

Expected: the diff is limited to:

- wave-13 to wave-16 docs
- tests
- retained API guide/glossary content

and does not contain earlier retained-core waves.

### Task 4: Run the unified API verification gate

**Files:**
- Verify: `tests/retained-guide-depth.test.mjs`
- Verify: `tests/retained-glossary-depth.test.mjs`
- Verify: `tests/guide-trust-data.test.mjs`
- Verify: `tests/glossary-trust-data.test.mjs`
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/api-pricing-content.test.mjs`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/recovery-retention-thresholds.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/sitemap-governance.test.mjs`
- Verify: `package.json`

**Step 1: Run the file-based unified API gate**

Run:

```bash
node --test tests/retained-guide-depth.test.mjs tests/retained-glossary-depth.test.mjs tests/guide-trust-data.test.mjs tests/glossary-trust-data.test.mjs tests/retained-link-concentration.test.mjs tests/api-pricing-content.test.mjs tests/core-tool-clusters.test.mjs tests/hub-curation.test.mjs tests/site-quality-signals.test.mjs tests/template-quality.test.mjs tests/navigation-deduping.test.mjs tests/tool-trust-data.test.mjs tests/content-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/seo-meta.test.mjs
```

Expected: PASS with no regression across the integrated API retained chain.

**Step 2: Build and validate sitemap behavior**

Run:

```bash
npm run build
node --test tests/sitemap-governance.test.mjs
```

Expected:

- build succeeds
- sitemap governance still matches the intended indexed surface

### Task 5: Inspect generated HTML for the retained API cluster

**Files:**
- Verify: `dist/guides/api-pricing-model/index.html`
- Verify: `dist/glossary/rate-limit/index.html`
- Verify: `dist/glossary/overage/index.html`
- Verify: `dist/glossary/api-call/index.html`
- Verify: `dist/sitemap-0.xml`

**Step 1: Inspect the retained guide output**

Run:

```bash
Select-String -Path dist/guides/api-pricing-model/index.html -Pattern "Reviewed","Sources and references","/guides/value-metric-selection/","/glossary/api-call/","/glossary/rate-limit/","/glossary/overage/","api-free-tier-guardrails","api-tier-design"
```

Expected:

- trust signals and retained links are present
- weaker adjacent API inventory stays absent

**Step 2: Inspect the retained glossary outputs**

Run:

```bash
Select-String -Path dist/glossary/rate-limit/index.html -Pattern "Reviewed","Sources and references","/guides/api-pricing-model/","/guides/value-metric-selection/","/saas-pricing/api-pricing-calculator/","/glossary/api-call/","/glossary/overage/","api-rate-limit-pricing","/guides/request-pricing-model/","/glossary/usage-based-pricing/","/glossary/pricing-metric/"
Select-String -Path dist/glossary/overage/index.html -Pattern "Reviewed","Sources and references","/guides/api-pricing-model/","/guides/usage-based-pricing-examples/","/saas-pricing/tiered-usage-pricing-calculator/","/saas-pricing/api-pricing-calculator/","/glossary/included-usage/","/glossary/rate-limit/","/guides/api-cost-estimation/","/guides/overage-policy-design/","/guides/overage-communication/","/glossary/usage-based-pricing/"
Select-String -Path dist/glossary/api-call/index.html -Pattern "Reviewed","Sources and references","/guides/api-pricing-model/","/guides/value-metric-selection/","/saas-pricing/api-pricing-calculator/","/glossary/rate-limit/","/glossary/overage/","/guides/api-free-tier-guardrails/","/guides/request-pricing-model/","/glossary/usage-based-pricing/","/glossary/pricing-metric/"
```

Expected:

- strengthened trust signals and retained support links are present
- weaker adjacent inventory remains absent

**Step 3: Inspect the generated sitemap**

Run:

```bash
Select-String -Path dist/sitemap-0.xml -Pattern "api-pricing-model","rate-limit","overage","api-call"
```

Expected: the retained API pages that should still surface remain visible.

### Task 6: Record the unified local review and stop before merge

**Files:**
- Create: `docs/plans/2026-04-05-api-retained-release-prep-review-log.md`

**Step 1: Write the unified review log**

Capture:

- what this local API-only release-prep batch changed
- what it intentionally did not change
- what verification passed
- what HTML review confirmed
- remaining risks before merge/push
- what the eventual upload check must verify

**Step 2: Review final status**

Run:

```bash
git status --short --branch
git log --oneline --decorate -12
```

Expected: a clean local release-prep branch with one coherent API-only release
candidate ready for a later merge/push decision.

**Step 3: Do not merge or push in this plan**

Stop after local review. Merge to `main`, push to origin, and no-cache live
checks remain out of scope for this batch.
