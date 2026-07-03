# Low-Value Content Contraction Wave 8 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the remaining weak guide and glossary surface so Google sees a smaller, stronger, less template-like site.

**Architecture:** We will treat this as a governance-only contraction batch. The first pass adds the new thin pages to the noindex policy and locks that policy with regression tests. The second pass verifies that the sitemap and page-level robots behavior still protect the retained core pages.

**Tech Stack:** Astro content collections, TypeScript governance wrapper, Node-based regression tests, generated sitemap output.

---

### Task 1: Lock the contraction list in tests

**Files:**
- Modify: `tests/content-governance.test.mjs`

**Step 1: Extend the noindex regression list**

Add the 28 newly identified low-value pages to the existing guide/glossary governance assertions.

**Step 2: Keep retained-core defaults intact**

Do not change the default `index,follow` assertions for missing slugs.

**Step 3: Run the focused test**

Run: `node tests/content-governance.test.mjs`
Expected: fail until the governance data is updated.

### Task 2: Update governance data

**Files:**
- Modify: `src/lib/content-governance-data.mjs`

**Step 1: Add a new contraction wave**

Add the 28 weak pages under a new comment block so the batch is clearly traceable.

**Step 2: Keep the retained core untouched**

Avoid touching pages that already have real search exposure and should stay indexable for now.

**Step 3: Re-run the focused governance test**

Run: `node tests/content-governance.test.mjs`
Expected: pass.

### Task 3: Verify sitemap and build health

**Files:**
- Test: `tests/sitemap-governance.test.mjs`
- Test: `scripts/audit.mjs`

**Step 1: Run the sitemap governance check**

Run: `node tests/sitemap-governance.test.mjs`
Expected: pass and confirm the noindex URLs stay out of the sitemap.

**Step 2: Run the site audit**

Run: `node scripts/audit.mjs`
Expected: pass with no new governance regressions.

