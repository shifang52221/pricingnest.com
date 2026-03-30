# Decision Guide Depth Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deepen three still-indexed guides so they function as real decision pages instead of thin support content.

**Architecture:** Keep the existing Astro guide rendering and Markdown content system. Add one behavior-level test for decision-guide depth, then rewrite the three target guides with stronger decision framing, topic-specific trade-offs, and better execution guidance.

**Tech Stack:** Astro content collections, Markdown guides, Node.js file-based tests

---

### Task 1: Add a decision-guide depth test

**Files:**
- Create: `tests/decision-guide-depth.test.mjs`

**Step 1: Write the failing test**

Create a test that reads:

- `src/content/guides/pricing-localization.md`
- `src/content/guides/support-tier-packaging.md`
- `src/content/guides/storage-retrieval-fees.md`

Assert that each guide:

- includes decision-oriented section signals such as `When to use`, `When not to use`, `Decision factors`, `Common mistakes`, or `Final checklist`
- contains at least two topic-specific terms
- retains at least one calculator link and one glossary link

Use topic-specific terms such as:

- pricing localization: `currency`, `FX`, `tax`, `regional pricing`
- support tier packaging: `SLA`, `response time`, `add-on`, `escalation`
- storage retrieval fees: `retrieval`, `request fees`, `egress`, `cold storage`

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/decision-guide-depth.test.mjs
```

Expected: FAIL because the existing guides are still short checklist pages and do not meet the decision-guide structure.

**Step 3: Write minimal implementation**

No production code changes in this task.

**Step 4: Commit**

Do not commit in this session unless the user explicitly asks.

### Task 2: Rewrite `pricing-localization`

**Files:**
- Modify: `src/content/guides/pricing-localization.md`

**Step 1: Rewrite the guide**

Replace the short checklist structure with a decision-guide structure that includes:

- when localization is worth doing
- when a global list price is better
- decision factors such as currency, FX, tax, payment methods, and arbitrage risk
- pricing approach options and trade-offs
- common mistakes
- final rollout checklist

Keep calculator and glossary internal links.

**Step 2: Run the targeted test**

Run:

```bash
node tests/decision-guide-depth.test.mjs
```

Expected: still FAIL because the other two guides remain unchanged.

**Step 3: Commit**

Do not commit in this session unless the user explicitly asks.

### Task 3: Rewrite `support-tier-packaging`

**Files:**
- Modify: `src/content/guides/support-tier-packaging.md`

**Step 1: Rewrite the guide**

Replace the short checklist structure with a decision-guide structure that includes:

- when support should be bundled versus sold separately
- decision factors such as SLA, response time, support channels, staffing coverage, and escalation path
- packaging options and trade-offs
- red flags and mistakes
- final packaging checklist

Keep calculator and glossary internal links.

**Step 2: Run the targeted test**

Run:

```bash
node tests/decision-guide-depth.test.mjs
```

Expected: still FAIL because `storage-retrieval-fees` remains unchanged.

**Step 3: Commit**

Do not commit in this session unless the user explicitly asks.

### Task 4: Rewrite `storage-retrieval-fees`

**Files:**
- Modify: `src/content/guides/storage-retrieval-fees.md`

**Step 1: Rewrite the guide**

Replace the short checklist structure with a decision-guide structure that includes:

- when retrieval fees should be priced explicitly
- the difference between storage, retrieval, request fees, and egress
- decision factors such as cold storage behavior, retrieval frequency, and regional cost differences
- pricing treatment options
- common mistakes
- final pricing checklist

Keep calculator and glossary internal links.

**Step 2: Run the targeted test**

Run:

```bash
node tests/decision-guide-depth.test.mjs
```

Expected: PASS

**Step 3: Commit**

Do not commit in this session unless the user explicitly asks.

### Task 5: Re-run quality verification

**Files:**
- Verify: `tests/decision-guide-depth.test.mjs`
- Verify: `tests/editorial-metadata.test.mjs`
- Verify: `tests/internal-linking.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/sitemap-governance.test.mjs`

**Step 1: Run targeted tests**

Run:

```bash
node tests/decision-guide-depth.test.mjs
node tests/editorial-metadata.test.mjs
node tests/internal-linking.test.mjs
node tests/hub-curation.test.mjs
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
```

Expected: PASS

**Step 2: Run build verification**

Run:

```bash
npm run build:astro
```

Expected: successful build

**Step 3: Commit**

Do not commit in this session unless the user explicitly asks.
