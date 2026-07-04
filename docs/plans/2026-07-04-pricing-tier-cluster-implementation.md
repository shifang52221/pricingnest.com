# Pricing Tier Cluster Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the retained pricing-tier topic cluster so it behaves like a tighter editorial hub with clearer
subtopic roles and stronger user navigation.

**Architecture:** This wave is content-only. We will strengthen one hub page, rebuild one weak supporting guide, and
sharpen the role boundaries between two adjacent retained guides. No template or governance-policy changes are needed.

**Tech Stack:** Astro markdown content, Node governance and audit scripts, static site build.

---

### Task 1: Strengthen the cluster hub

**Files:**
- Modify: `src/content/guides/pricing-tier-design.md`

**Step 1: Add clearer cluster framing**

Make the page more explicit about when it is the right hub page and what surrounding subpages answer.

**Step 2: Tighten next-step routing**

Add or refine guidance that moves readers toward `value-metric-selection`, `pricing-metric-validation`, and
`usage-tier-breakpoints` based on the actual problem they are trying to solve.

**Step 3: Preserve focus**

Keep the page centered on tier structure, not broad pricing strategy drift.

### Task 2: Rebuild the weak supporting guide

**Files:**
- Modify: `src/content/guides/usage-tier-breakpoints.md`

**Step 1: Add editorial metadata**

Add `author`, `reviewedBy`, `reviewed`, and `sources`.

**Step 2: Replace checklist structure**

Rewrite the page into a real supporting guide with interpretation, misuse boundaries, and links back into the hub.

**Step 3: Clarify its role in the cluster**

Make it clear that this page solves threshold placement inside a broader tier-design problem.

### Task 3: Sharpen role boundaries in adjacent guides

**Files:**
- Modify: `src/content/guides/value-metric-selection.md`
- Modify: `src/content/guides/pricing-metric-validation.md`

**Step 1: Clarify page roles**

Refine the wording so `value-metric-selection` is about choosing the anchor and `pricing-metric-validation` is about
testing operational and commercial publishability.

**Step 2: Improve mutual linking**

Add or refine internal links so the pages route readers into one another intentionally rather than overlapping vaguely.

**Step 3: Keep the cluster coherent**

Tie both pages back to `pricing-tier-design` where tier structure becomes the next problem.

### Task 4: Verify site health

**Files:**
- Test: `tests/content-governance.test.mjs`
- Test: `scripts/audit.mjs`
- Test: `npm run build`

**Step 1: Run governance regression**

Run: `node tests/content-governance.test.mjs`
Expected: pass.

**Step 2: Run content audit**

Run: `node scripts/audit.mjs`
Expected: pass with no new metadata or duplication regressions.

**Step 3: Run full build**

Run: `npm run build`
Expected: pass.

**Step 4: Review change scope**

Confirm the batch only touches the four cluster pages plus the new design and implementation records.
