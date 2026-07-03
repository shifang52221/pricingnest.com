# Retained Page Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the weakest retained indexable pages so they read like authored decision-support content instead of thin inventory pages.

**Architecture:** This batch is content-only. We will upgrade four retained guides and four retained glossary pages by adding practical scenarios, interpretation layers, and boundary conditions while preserving the existing content model and internal-link structure. Verification will focus on governance integrity and site health rather than new feature behavior.

**Tech Stack:** Astro markdown content, governance regression tests, Node audit script.

---

### Task 1: Enhance the thinnest retained guides

**Files:**
- Modify: `src/content/guides/revenue-vs-logo-churn.md`
- Modify: `src/content/guides/ltv-sensitivity-analysis.md`
- Modify: `src/content/guides/grr-vs-nrr.md`
- Modify: `src/content/guides/retention-curve-analysis.md`

**Step 1: Expand each guide with a real operating context**

Add at least one section per page that grounds the concept in a realistic pricing or retention workflow.

**Step 2: Add interpretation and boundary sections**

Add practical guidance about where teams overread the metric, hide risk, or use the wrong cohort/time window.

**Step 3: Strengthen next-step navigation**

Keep or improve links to relevant calculators, glossary pages, and deeper guides so these pages act like real entry points.

### Task 2: Enhance the thinnest retained glossary pages

**Files:**
- Modify: `src/content/glossary/grandfathering.md`
- Modify: `src/content/glossary/cdn.md`
- Modify: `src/content/glossary/arpa-per-seat.md`
- Modify: `src/content/glossary/seat-based-pricing.md`

**Step 1: Add operational framing**

Expand each term beyond definition-plus-checklist so it explains how the concept shows up in packaging, pricing, or margin decisions.

**Step 2: Add misuse and limitation guidance**

Show when the term is easy to misuse or when the model stops being reliable as a public pricing anchor.

**Step 3: Improve related-page bridges**

Tighten links to adjacent glossary pages, tools, and guides where they genuinely help the reader continue the decision flow.

### Task 3: Verify content and site health

**Files:**
- Test: `scripts/audit.mjs`
- Test: `tests/content-governance.test.mjs`

**Step 1: Run the governance regression**

Run: `node tests/content-governance.test.mjs`
Expected: pass.

**Step 2: Run the site audit**

Run: `node scripts/audit.mjs`
Expected: pass with no new content-health regressions.

**Step 3: Review git diff**

Confirm the batch only touches the eight content pages plus the new design and plan records.
