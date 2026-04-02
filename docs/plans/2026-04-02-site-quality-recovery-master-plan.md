# Site Quality Recovery Master Plan Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce low-quality and template-like site risk by shrinking the retained index surface, strengthening the
pages that deserve to rank, and standardizing review and release discipline.

**Architecture:** Keep the current Astro site architecture, governance layer, and content collections. Add one review
ledger for indexed guides/glossary pages, use governance updates to shrink the index surface, then run tightly scoped
retained-core strengthening batches with the existing test suite as the guardrail.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests, Markdown content collections, git worktrees

---

### Task 1: Build the indexed-page review ledger

**Files:**
- Create: `docs/plans/2026-04-02-indexed-content-review-ledger.md`
- Review: `src/content/guides/*.md`
- Review: `src/content/glossary/*.md`
- Reference: `src/lib/content-governance.ts`
- Reference: `src/lib/content-governance-data.mjs`

**Step 1: List currently indexed guides and glossary pages**

Run commands that enumerate all guide and glossary files still returning `index,follow` from governance.

Expected output should separate:

- indexed guides
- indexed glossary pages
- counts for each group

**Step 2: Create the review ledger**

Create `docs/plans/2026-04-02-indexed-content-review-ledger.md` with one row per currently indexed page and these
columns:

- slug
- content type
- current robots status
- decision bucket
- reason
- follow-up action

Allowed decision buckets:

- `retain-and-strengthen`
- `move-to-noindex`
- `observe-for-now`

**Step 3: Review all currently indexed guides**

Audit every guide still marked `index,follow`.

Use these criteria:

- unique search intent
- clear decision value
- depth relative to nearby pages
- duplication risk
- fit with retained calculator clusters

**Step 4: Review all currently indexed glossary pages**

Audit every glossary page still marked `index,follow`.

Use the same criteria, but be stricter because glossary pages are higher risk for thin-content and template patterns.

**Step 5: Commit**

```bash
git add docs/plans/2026-04-02-indexed-content-review-ledger.md
git commit -m "docs: add indexed content review ledger"
```

### Task 2: Lock the next governance wave with failing tests

**Files:**
- Modify: `tests/content-governance.test.mjs`
- Modify: `tests/sitemap-governance.test.mjs`
- Modify: `tests/recovery-retention-thresholds.test.mjs`
- Reference: `docs/plans/2026-04-02-indexed-content-review-ledger.md`

**Step 1: Choose the first noindex batch from the ledger**

Select the highest-risk pages from the ledger first.

Keep the batch tight:

- around `8` to `15` guides and glossary pages combined
- only pages with high confidence `move-to-noindex` decisions

**Step 2: Update governance tests first**

Add the new candidate slugs to:

- `tests/content-governance.test.mjs`
- `tests/sitemap-governance.test.mjs`

If needed, update retention-threshold expectations in:

- `tests/recovery-retention-thresholds.test.mjs`

**Step 3: Run tests to verify failure**

Run:

```bash
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
```

Expected: FAIL because governance data has not been updated yet.

### Task 3: Apply the next governance wave

**Files:**
- Modify: `src/lib/content-governance-data.mjs`

**Step 1: Add the selected guide and glossary slugs to governance**

Update:

- `GUIDE_GOVERNANCE`
- `GLOSSARY_GOVERNANCE`

Only move the pages chosen in Task 2.

**Step 2: Re-run governance verification**

Run:

```bash
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/lib/content-governance-data.mjs tests/content-governance.test.mjs tests/sitemap-governance.test.mjs tests/recovery-retention-thresholds.test.mjs
git commit -m "feat: apply indexed content governance wave"
```

### Task 4: Define the retained-core strengthening queue

**Files:**
- Create: `docs/plans/2026-04-02-retained-core-strengthening-queue.md`
- Reference: `docs/plans/2026-04-02-indexed-content-review-ledger.md`
- Reference: `src/lib/tools.ts`

**Step 1: Select the next retained guide layer**

From the ledger, list the retained guides that most directly support:

- usage-based pricing
- API pricing
- compute pricing
- storage pricing
- bandwidth pricing
- annual pricing / discounting

**Step 2: Select the next retained glossary layer**

From the ledger, list the glossary terms that most directly support the retained guides and tool clusters.

**Step 3: Sequence the strengthening queue**

Document the order of execution:

1. highest-value retained guides
2. highest-value retained glossary pages
3. any remaining core calculator tightening not yet merged

**Step 4: Commit**

```bash
git add docs/plans/2026-04-02-retained-core-strengthening-queue.md
git commit -m "docs: define retained core strengthening queue"
```

### Task 5: Standardize batch review and release workflow

**Files:**
- Create: `docs/plans/2026-04-02-release-review-checklist.md`
- Reference: existing test suite and current workflow

**Step 1: Write the batch checklist**

Create `docs/plans/2026-04-02-release-review-checklist.md` with the exact workflow every batch must follow:

1. worktree setup
2. design doc
3. implementation plan
4. failing tests first where behavior changes
5. implementation
6. targeted verification
7. governance/site-quality/build verification
8. diff review
9. merge and push
10. production no-cache verification
11. batch review log

**Step 2: Include required verification commands**

List the standard commands:

```bash
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
npm run build
```

**Step 3: Commit**

```bash
git add docs/plans/2026-04-02-release-review-checklist.md
git commit -m "docs: add release review checklist"
```

### Task 6: Verify the planning layer is complete

**Files:**
- Verify: `docs/plans/2026-04-02-site-quality-recovery-master-plan-design.md`
- Verify: `docs/plans/2026-04-02-site-quality-recovery-master-plan.md`
- Verify: `docs/plans/2026-04-02-indexed-content-review-ledger.md`
- Verify: `docs/plans/2026-04-02-retained-core-strengthening-queue.md`
- Verify: `docs/plans/2026-04-02-release-review-checklist.md`

**Step 1: Verify planning documents exist and align**

Check that:

- the design doc sets goals, success criteria, and non-goals
- the implementation plan defines the execution order
- the ledger covers all indexed guides and glossary pages
- the retained queue is prioritized
- the release checklist is explicit and reusable

**Step 2: Run repository sanity checks**

Run:

```bash
git status -sb
```

Expected: only intentional planning files and any approved implementation files are present.

### Task 7: Start execution with the indexed-content review ledger

**Files:**
- Execute first: `docs/plans/2026-04-02-indexed-content-review-ledger.md`

**Step 1: Begin with the ledger, not with new page writing**

The first execution batch under this master plan should be:

- complete the review ledger
- choose the first noindex wave
- only then continue retained-core strengthening

This is the discipline that prevents scattered work and keeps the site focused.
