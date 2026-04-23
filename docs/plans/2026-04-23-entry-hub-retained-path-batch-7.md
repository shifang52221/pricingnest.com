# Entry Hub Retained Path Batch 7 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the site's four entry hubs so the retained calculator spine is
clearer and the hubs feel less like broad resource directories.

**Architecture:** Keep the existing Astro pages and visual structure, but
refine copy, section emphasis, and curated links across the homepage,
`/saas-pricing/`, `/guides/`, and `/glossary/`. Update tests first so the hubs
must reflect the clearer retained path, then make minimal content edits until
the new expectations pass without widening scope.

**Tech Stack:** Astro, TypeScript/JS page templates, file-based Node.js tests
for hub curation and retained-link governance

---

### Task 1: Tighten hub-level expectations with failing tests

**Files:**
- Modify: `tests/hub-curation.test.mjs`
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`

**Step 1: Raise homepage and toolkit hub expectations**

Update `tests/hub-curation.test.mjs` so `/` and `/saas-pricing/` must make the
four retained calculator paths more explicit:

- usage
- API
- storage
- compute

Require language that points users toward the primary calculator path first,
with retained support links around it.

**Step 2: Raise guides and glossary hub expectations**

Update `tests/hub-curation.test.mjs` so `/guides/` and `/glossary/` must feel
more like focused retained-path hubs and less like broad libraries.

Require:

- clearer path-oriented wording
- stronger four-path grouping
- explicit first-step behavior

Keep the expectations narrow and textual.

**Step 3: Run tests to verify failure**

Run:

```bash
node tests/hub-curation.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/navigation-deduping.test.mjs
```

Expected:

- `hub-curation` FAILS because the hub pages are not yet tight enough
- retained-link and navigation tests should continue to PASS

### Task 2: Tighten homepage and toolkit hub positioning

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/saas-pricing/index.astro`

**Step 1: Refine homepage path hierarchy**

Update the homepage so the four retained paths feel like the site's main entry
spine.

Good targets:

- section headings
- supporting copy
- ordering and emphasis
- reduced competition from secondary workflows

Keep annual-discount and other secondary tools available, but clearly lower
their emphasis relative to the four core paths.

**Step 2: Refine toolkit hub hierarchy**

Update `/saas-pricing/` so it reads more clearly as the entry point to four
core calculator workflows plus a broader tool inventory.

Do not remove the broader tool list.

**Step 3: Re-run hub curation verification**

Run:

```bash
node tests/hub-curation.test.mjs
```

Expected: still FAIL or partially PASS until guides/glossary changes are made

### Task 3: Tighten guides and glossary hub curation

**Files:**
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/glossary/index.astro`

**Step 1: Refine guides hub around the retained spine**

Update `/guides/` so the featured sections map more explicitly to the four core
decision paths and tell users to open one retained path instead of browsing the
library.

**Step 2: Refine glossary hub around the same spine**

Update `/glossary/` so the featured terms work as a language-prep layer for the
same four retained paths, with clearer "what to learn first" behavior.

**Step 3: Re-run hub verification**

Run:

```bash
node tests/hub-curation.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/navigation-deduping.test.mjs
```

Expected: PASS

### Task 4: Run final entry-hub verification

**Files:**
- Review: `src/pages/index.astro`
- Review: `src/pages/saas-pricing/index.astro`
- Review: `src/pages/guides/index.astro`
- Review: `src/pages/glossary/index.astro`
- Review: `tests/hub-curation.test.mjs`
- Review: `docs/plans/2026-04-23-entry-hub-retained-path-batch-7-design.md`
- Review: `docs/plans/2026-04-23-entry-hub-retained-path-batch-7.md`

**Step 1: Run the final command set**

Run:

```bash
npm run build
node tests/hub-curation.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/navigation-deduping.test.mjs
node tests/site-quality-signals.test.mjs
node tests/tool-priority.test.mjs
```

Expected: PASS

**Step 2: Review the constrained diff**

Run:

```bash
git diff -- src/pages/index.astro src/pages/saas-pricing/index.astro src/pages/guides/index.astro src/pages/glossary/index.astro tests/hub-curation.test.mjs docs/plans/2026-04-23-entry-hub-retained-path-batch-7-design.md docs/plans/2026-04-23-entry-hub-retained-path-batch-7.md
```

Expected:

- no unrelated file churn
- changes stay limited to the four entry hubs, one hub test, and plan docs
