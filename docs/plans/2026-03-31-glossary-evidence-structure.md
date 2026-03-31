# Glossary Evidence Structure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the retained glossary layer from plain source lists to a structured evidence module with source kinds,
links, and notes on the eight highest-value glossary pages.

**Architecture:** Keep the current glossary layout and retained-content strategy, but give the `glossary` collection its
own structured `GlossarySource` schema in `src/content/config.ts`. Render glossary evidence items as cards in
`src/pages/glossary/[slug].astro`, and add structured source objects to the eight retained glossary pages already
covered by the retained-depth test.

**Tech Stack:** Astro, TypeScript, Markdown content collections, Node.js file-based tests, CSS

---

### Task 1: Lock the glossary evidence contract with a failing test

**Files:**
- Create: `tests/glossary-trust-data.test.mjs`

**Step 1: Write the failing test**

Assert that:

- `src/content/config.ts` defines a glossary-specific structured source schema
- `src/pages/glossary/[slug].astro` renders `Sources and references` with source-kind badges and notes
- each retained glossary target includes structured source objects
- each retained glossary target includes at least one `internal-input`
- each retained glossary target includes at least one linked `supporting-page`

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/glossary-trust-data.test.mjs
```

Expected: FAIL because glossary sources are still plain strings.

### Task 2: Implement the glossary schema and template

**Files:**
- Modify: `src/content/config.ts`
- Modify: `src/pages/glossary/[slug].astro`

**Step 1: Add the glossary-specific source schema**

Define a glossary source kind enum and object schema with:

- `label`
- `kind`
- optional `href`
- optional `note`

Apply that schema only to the `glossary` collection.

**Step 2: Render evidence cards in the glossary sidebar**

Add:

- a helper to format source-kind labels
- structured source rendering with `.source-list` and `.source-item`
- support for linked and non-linked evidence labels

Keep the existing editorial and related-link blocks intact.

### Task 3: Upgrade the eight retained glossary pages

**Files:**
- Modify: `src/content/glossary/value-metric.md`
- Modify: `src/content/glossary/pricing-metric.md`
- Modify: `src/content/glossary/unit-cost.md`
- Modify: `src/content/glossary/gross-margin.md`
- Modify: `src/content/glossary/included-usage.md`
- Modify: `src/content/glossary/overage.md`
- Modify: `src/content/glossary/minimum-commitment.md`
- Modify: `src/content/glossary/gb-month.md`

**Step 1: Add structured evidence frontmatter**

For each term, add:

- one `internal-input` entry describing the operating, pricing, or reporting input that should be validated
- at least one linked `supporting-page`
- a short note explaining why the evidence matters to interpreting the term correctly

**Step 2: Keep the evidence aligned with the body**

Make sure every evidence item matches the calculators, guides, or glossary terms already linked in the page body.

### Task 4: Re-run verification

**Files:**
- Verify: `tests/glossary-trust-data.test.mjs`
- Verify: `tests/editorial-metadata.test.mjs`
- Verify: `tests/retained-glossary-depth.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `npm run build`

**Step 1: Run targeted verification**

Run:

```bash
node tests/glossary-trust-data.test.mjs
node tests/editorial-metadata.test.mjs
node tests/retained-glossary-depth.test.mjs
node tests/template-quality.test.mjs
npm run build
```

Expected: PASS and successful production build.
