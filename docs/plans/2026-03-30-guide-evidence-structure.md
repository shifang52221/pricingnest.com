# Guide Evidence Structure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the five retained core guide pages from plain or missing source metadata to a structured evidence
module with source kinds, links, and review notes.

**Architecture:** Keep the current guide page layout and editorial sidebar, but give the `guides` collection its own
structured `GuideSource` schema in `src/content/config.ts`. Render those entries as evidence cards in
`src/pages/guides/[slug].astro`, and add structured source objects to the five retained core guide files without
touching glossary behavior.

**Tech Stack:** Astro, TypeScript, Markdown content collections, Node.js file-based tests, CSS

---

### Task 1: Lock the guide evidence contract with a failing test

**Files:**
- Create: `tests/guide-trust-data.test.mjs`

**Step 1: Write the failing test**

Assert that:

- `src/content/config.ts` defines a guide-specific structured source schema
- `src/pages/guides/[slug].astro` renders `Sources and references` with source-kind badges and notes
- each of the five retained guides includes structured source objects
- each retained guide includes at least one `internal-input`
- each retained guide includes at least one linked `supporting-page`

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/guide-trust-data.test.mjs
```

Expected: FAIL because guide sources are not structured yet.

### Task 2: Implement the guide source schema and template

**Files:**
- Modify: `src/content/config.ts`
- Modify: `src/pages/guides/[slug].astro`

**Step 1: Add the guide-specific source schema**

Define a guide source kind enum and object schema with:

- `label`
- `kind`
- optional `href`
- optional `note`

Apply that schema only to the `guides` collection.

**Step 2: Render the evidence cards**

In the guide page template:

- normalize `entry.data.sources` to a structured array
- add a helper to format source-kind labels
- render the sources block with `.source-list` and `.source-item`
- keep existing editorial metadata intact

### Task 3: Upgrade the five retained guide files

**Files:**
- Modify: `src/content/guides/annual-prepay-discount.md`
- Modify: `src/content/guides/api-cost-estimation.md`
- Modify: `src/content/guides/compute-cost-modeling.md`
- Modify: `src/content/guides/storage-costs-and-pricing.md`
- Modify: `src/content/guides/usage-based-pricing-examples.md`

**Step 1: Add structured evidence frontmatter**

For each guide, add:

- one `internal-input` entry describing the real operating input the reader should validate
- at least one linked `supporting-page` entry
- a short note that explains why the evidence matters

**Step 2: Keep evidence aligned with the page body**

Make sure every evidence item matches the guide content and the linked calculators or glossary pages already referenced
in the article.

### Task 4: Re-run verification

**Files:**
- Verify: `tests/guide-trust-data.test.mjs`
- Verify: `tests/editorial-metadata.test.mjs`
- Verify: `tests/retained-guide-depth.test.mjs`
- Verify: `npm run build`

**Step 1: Run targeted verification**

Run:

```bash
node tests/guide-trust-data.test.mjs
node tests/editorial-metadata.test.mjs
node tests/retained-guide-depth.test.mjs
npm run build
```

Expected: PASS and successful production build.
