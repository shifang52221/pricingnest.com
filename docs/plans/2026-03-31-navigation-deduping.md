# Navigation De-Templating Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce remaining template feel on retained pages and hubs by tightening next-step navigation, using real page
titles, and reducing inventory-style browse sections.

**Architecture:** Keep the current Astro page structure, but improve the relationship between retained pages and hubs.
Guide and glossary detail templates should build related-link labels from actual content titles and render stronger
editorial next-step sections. Guide, glossary, and toolkit hubs should continue to surface curated clusters while
reducing generic browse behavior.

**Tech Stack:** Astro, TypeScript, Markdown content collections, Node.js file-based tests

---

### Task 1: Lock navigation quality with a failing test

**Files:**
- Create: `tests/navigation-deduping.test.mjs`

**Step 1: Write the failing test**

Assert that:

- `src/pages/guides/[slug].astro` and `src/pages/glossary/[slug].astro` contain `Recommended next steps`
- guide and glossary templates resolve related titles from content collections instead of slug capitalization logic
- guide and glossary hubs no longer contain `Browse more guides` or `Browse more terms`
- the toolkit hub no longer links prominently to the thin use-case layer in its sidebar

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/navigation-deduping.test.mjs
```

Expected: FAIL because the current templates still use slug-based labels and browse-more inventory sections.

### Task 2: De-template guide and glossary detail pages

**Files:**
- Modify: `src/pages/guides/[slug].astro`
- Modify: `src/pages/glossary/[slug].astro`

**Step 1: Resolve human-readable related titles**

Replace slug-to-title formatting logic with actual title lookups from the relevant content collection.

**Step 2: Tighten next-step navigation**

Add a stronger `Recommended next steps` section that:

- prioritizes the most useful linked tools, guides, and glossary terms
- avoids generic bucket labeling as the only navigation cue
- keeps the current evidence and editorial blocks intact

### Task 3: Reduce inventory feel on hub pages

**Files:**
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/glossary/index.astro`
- Modify: `src/pages/saas-pricing/index.astro`

**Step 1: Tighten guide and glossary hubs**

Reduce generic browse sections and replace them with stronger curated cluster guidance.

**Step 2: Tighten toolkit hub side navigation**

Keep the core workflows, but reduce emphasis on weaker follow-on layers such as thin use-case destinations from the
sidebar area.

### Task 4: Re-run verification

**Files:**
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `tests/editorial-metadata.test.mjs`
- Verify: `npm run build`

**Step 1: Run targeted verification**

Run:

```bash
node tests/navigation-deduping.test.mjs
node tests/hub-curation.test.mjs
node tests/template-quality.test.mjs
node tests/editorial-metadata.test.mjs
npm run build
```

Expected: PASS and successful production build.
