# Tool Evidence Structure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the five core tool pages from plain-text source bullets to a structured evidence module with source kinds, links, and explanatory notes.

**Architecture:** Keep the existing tool-page trust sidebar, but replace `sources?: string[]` with a structured `ToolSource[]` model in `src/lib/tools.ts`. Render those entries as evidence cards in `src/pages/saas-pricing/[slug].astro`, and add a light CSS layer in `src/styles/global.css` so the output reads like a review block instead of a generic list.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests, CSS

---

### Task 1: Lock the new evidence model with a failing test

**Files:**
- Modify: `tests/tool-trust-data.test.mjs`

**Step 1: Write the failing test**

Assert that:
- `src/lib/tools.ts` defines `ToolSourceKind` and `ToolSource`
- `ToolDefinition` uses `sources?: ToolSource[];`
- each of the five core tools includes structured source objects with `kind`, `label`, `note`, and at least one linked supporting page
- `src/pages/saas-pricing/[slug].astro` includes helpers and markup for rendering source kinds and notes

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/tool-trust-data.test.mjs
```

Expected: FAIL because the tool source model is still `string[]`.

### Task 2: Implement the structured tool evidence model

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Add the new source types**

Add:

```ts
export type ToolSourceKind = "internal-input" | "supporting-page" | "external-reference";

export type ToolSource = {
  label: string;
  kind: ToolSourceKind;
  href?: string;
  note?: string;
};
```

Update `ToolDefinition` to use `sources?: ToolSource[];`.

**Step 2: Convert the five core tools**

Convert source strings into objects for:
- `usage-based-pricing-calculator`
- `compute-cost-estimator`
- `api-pricing-calculator`
- `annual-discount-calculator`
- `storage-cost-calculator`

Each tool should include:
- one `internal-input` item
- at least one `supporting-page` item with an internal href
- a short `note` that explains why the source matters in review

### Task 3: Render the evidence module on tool pages

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`
- Modify: `src/styles/global.css`

**Step 1: Add source rendering helpers**

Add a helper that maps source kinds to visible badge labels.

**Step 2: Replace the source list markup**

Render each source as a compact card with:
- kind badge
- linked or plain label
- optional note

Keep the section heading `Sources and references`.

**Step 3: Add minimal CSS**

Add classes for:
- `.source-list`
- `.source-item`
- `.source-kind`
- `.source-note`

### Task 4: Re-run verification

**Files:**
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `npm run build`

**Step 1: Run targeted verification**

Run:

```bash
node tests/tool-trust-data.test.mjs
node tests/template-quality.test.mjs
npm run build
```

Expected: PASS and successful production build.
