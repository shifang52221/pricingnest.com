# Retained Page Enhancement Wave 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the second batch of thin retained pages so the indexed content surface looks more editorial,
practical, and trustworthy.

**Architecture:** This wave is content-only. Two short guides and four glossary pages will be upgraded with clearer
editorial metadata, stronger interpretation sections, misuse boundaries, and tighter links into core calculators and
retained guides. No index-policy or template-code changes are needed.

**Tech Stack:** Astro markdown content, Node audit script, governance regression tests, static site build.

---

### Task 1: Enhance the retained guides

**Files:**
- Modify: `src/content/guides/nrr-playbook.md`
- Modify: `src/content/guides/ltv-cac-benchmarks.md`

**Step 1: Add editorial trust metadata**

Add `author`, `reviewedBy`, `reviewed`, and `sources` fields that match the stronger retained guide pattern already
used elsewhere on the site.

**Step 2: Replace checklist-only framing with interpretation**

Rework each page so it explains when the metric matters, how to interpret the main patterns, and where teams often use
the wrong assumptions.

**Step 3: Strengthen next-step routing**

Link each guide to the right calculators and adjacent retained pages so the content acts like a decision-support entry
point rather than a thin explainer.

### Task 2: Enhance the retained glossary pages

**Files:**
- Modify: `src/content/glossary/feature-gating.md`
- Modify: `src/content/glossary/egress.md`
- Modify: `src/content/glossary/cac-payback.md`
- Modify: `src/content/glossary/time-to-value.md`

**Step 1: Add editorial trust metadata**

Add `author`, `reviewedBy`, `reviewed`, and `sources` fields where missing.

**Step 2: Add pricing and misuse framing**

Expand each glossary page beyond a definition and checklist so it shows why the concept matters, where it is easy to
misread, and what decision it should influence.

**Step 3: Tighten related-page bridges**

Use only links that create a real continuation path into retained guides, calculators, or adjacent glossary concepts.

### Task 3: Verify site health

**Files:**
- Test: `tests/content-governance.test.mjs`
- Test: `scripts/audit.mjs`
- Test: `npm run build`

**Step 1: Run the governance regression**

Run: `node tests/content-governance.test.mjs`
Expected: pass.

**Step 2: Run the audit**

Run: `node scripts/audit.mjs`
Expected: pass with no new content-health regressions.

**Step 3: Run the production build**

Run: `npm run build`
Expected: pass.

**Step 4: Review git scope**

Confirm the batch only touches the six targeted content files plus the new design and implementation records.
