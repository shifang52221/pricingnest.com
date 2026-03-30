# Retained Glossary Recovery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen four high-value glossary terms so they read like decision-support pages instead of thin definition pages.

**Architecture:** Keep the existing glossary template and content schema, but raise the quality floor for a small retained set of high-intent terms. Add explicit editorial metadata, deepen the narrative structure, and connect each term back to calculators and guides that help users act on the concept.

**Tech Stack:** Astro content collections, Markdown content, Node.js file-based tests

---

### Task 1: Lock the quality bar with a failing test

**Files:**
- Modify: `tests/retained-glossary-depth.test.mjs`

**Step 1: Add four retained terms to the test**

Add checks for:
- `included-usage`
- `overage`
- `minimum-commitment`
- `gb-month`

Assert each term has:
- explicit `reviewed:` metadata
- at least 260 words
- strong decision-oriented headings
- topic keywords that show unique explanatory value
- at least one calculator or guide link

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
```

Expected: FAIL for the newly-added retained terms because they are still too thin.

### Task 2: Deepen the four retained glossary entries

**Files:**
- Modify: `src/content/glossary/included-usage.md`
- Modify: `src/content/glossary/overage.md`
- Modify: `src/content/glossary/minimum-commitment.md`
- Modify: `src/content/glossary/gb-month.md`

**Step 1: Add stronger editorial metadata**

For each entry, add or refresh:
- `updated: "2026-03-30"`
- `author: "PricingNest Editorial Team"`
- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-03-30"`

**Step 2: Rework each entry around decision support**

Use this section pattern where it fits:
- `## Definition`
- `## Why it matters in pricing decisions`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

Tie each term to:
- one or more live calculators
- one or more retained guides
- adjacent glossary terms that clarify the concept

**Step 3: Run test to verify it passes**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
```

Expected: PASS

### Task 3: Re-verify the trust baseline

**Files:**
- Verify: `tests/editorial-metadata.test.mjs`
- Verify: `tests/site-trust-signals-batch.test.mjs`
- Verify: `npm run build`

**Step 1: Run targeted verification**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/editorial-metadata.test.mjs
node tests/site-trust-signals-batch.test.mjs
npm run build
```

Expected: PASS and successful production build.
