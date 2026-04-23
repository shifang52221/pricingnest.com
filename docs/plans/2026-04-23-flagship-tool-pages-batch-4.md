# Flagship Tool Pages Batch 4 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the usage-based and API pricing calculator pages so they
behave like flagship decision pages instead of generic calculator detail pages.

**Architecture:** Keep the existing Astro tool-page template and calculator
logic, but add a narrow flagship-page layer for two slugs only:
`usage-based-pricing-calculator` and `api-pricing-calculator`. First tighten
tests so the template fails without stronger page-level decision sections and
tighter curated links. Then update the template and tool metadata until the two
pages expose a smaller, more intentional retained path while preserving current
calculator behavior.

**Tech Stack:** Astro, TypeScript, file-based Node.js tests, tool metadata in
`src/lib/tools.ts`, shared tool detail template in
`src/pages/saas-pricing/[slug].astro`

---

### Task 1: Lock flagship tool-page expectations with failing tests

**Files:**
- Modify: `tests/core-tool-clusters.test.mjs`
- Modify: `tests/usage-based-content.test.mjs`
- Modify: `tests/api-pricing-content.test.mjs`
- Create or modify: `tests/flagship-tool-page-ux.test.mjs`

**Step 1: Tighten usage and API tool-content expectations**

Update the existing usage and API tool content tests so the tool definitions
must support stronger page-level decision interpretation.

At minimum:

- `usage-based-pricing-calculator` should reinforce:
  - buyer estimation
  - included usage
  - overage
  - minimum commitment
- `api-pricing-calculator` should reinforce:
  - billable event clarity
  - rate-limit separation
  - overage
  - platform fee or minimum commitment decisions

Keep current anti-keyword-spam expectations intact.

**Step 2: Tighten flagship cluster expectations**

Update `tests/core-tool-clusters.test.mjs` if needed so the usage and API
clusters remain tightly curated around retained-core pages and do not drift back
toward broad support inventory.

**Step 3: Add a flagship page UX regression test**

Create or extend a test that reads `src/pages/saas-pricing/[slug].astro` and
requires a dedicated flagship-page path for:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`

The test should require:

- a stronger decision-summary block
- a packaging-change or "what to do next" section
- tighter curated follow-up resources

The test should also ensure the flagship path does not rely on the broad generic
guide spillover currently produced by the shared `guideLinks` logic.

**Step 4: Run the tightened tests to verify failure**

Run:

```bash
node tests/usage-based-content.test.mjs
node tests/api-pricing-content.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/flagship-tool-page-ux.test.mjs
```

Expected:

- existing usage and API content tests may fail if new required snippets are not
  present yet
- flagship tool-page UX test FAILS because `src/pages/saas-pricing/[slug].astro`
  does not yet contain the dedicated flagship layer

### Task 2: Add a narrow flagship-page layer to the shared tool template

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Add a flag for flagship tools**

Create a small slug-based switch in the template that only activates for:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`

Do not widen this to all priority tools.

**Step 2: Add flagship decision sections**

Extend the template with page-level sections that sit alongside the existing
results and guide blocks.

For both flagship pages, add:

- a decision-summary style block near the results area
- a section that helps users decide when the current price floor is not enough
- a tighter "what to do next" reading path

Keep the existing calculator UI, compare, sensitivity, and guide content in
place.

**Step 3: Re-run flagship template verification**

Run:

```bash
node tests/flagship-tool-page-ux.test.mjs
```

Expected: PASS

### Task 3: Tighten page-level curated follow-up links for the two flagship tools

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/flagship-tool-page-ux.test.mjs`

**Step 1: Override broad guide spillover for the flagship slugs**

Change the template so the two flagship pages use a dedicated retained
follow-up-resource set instead of inheriting the broad generic guide list.

For `usage-based-pricing-calculator`, keep the path focused on:

- `value-metric-selection`
- `usage-based-pricing-examples`
- `minimum-commitment-model`
- `usage-based-pricing`
- `value-metric`
- `overage`

For `api-pricing-calculator`, keep the path focused on:

- `api-cost-estimation`
- `api-pricing-model`
- `api-call`
- `rate-limit`
- `overage`
- `minimum-commitment-model` only if still justified

**Step 2: Re-run curated-link verification**

Run:

```bash
node tests/core-tool-clusters.test.mjs
node tests/flagship-tool-page-ux.test.mjs
```

Expected: PASS

### Task 4: Refresh usage tool metadata to support the stronger flagship page

**Files:**
- Modify: `src/lib/tools.ts`
- Verify: `tests/usage-based-content.test.mjs`
- Verify: `tests/core-tool-depth.test.mjs`

**Step 1: Tighten usage interpretation and page-support language**

Refresh the `usage-based-pricing-calculator` metadata only where it materially
supports the stronger flagship page.

Good targets:

- interpretation copy
- walkthrough emphasis
- scenario framing
- FAQ answers that reinforce buyer estimation, overage, and minimum commitment

Do not change formulas or the number of calculator inputs.

**Step 2: Re-run usage tool verification**

Run:

```bash
node tests/usage-based-content.test.mjs
node tests/core-tool-depth.test.mjs
```

Expected: PASS

### Task 5: Refresh API tool metadata to support the stronger flagship page

**Files:**
- Modify: `src/lib/tools.ts`
- Verify: `tests/api-pricing-content.test.mjs`
- Verify: `tests/core-tool-depth.test.mjs`

**Step 1: Tighten API interpretation and page-support language**

Refresh the `api-pricing-calculator` metadata only where it materially supports
the stronger flagship page.

Good targets:

- interpretation copy
- walkthrough emphasis
- scenario framing
- FAQ answers that reinforce billable event, rate-limit separation, and
  platform-fee / overage trade-offs

Do not widen the tool into a generic API cost-estimate page.

**Step 2: Re-run API tool verification**

Run:

```bash
node tests/api-pricing-content.test.mjs
node tests/core-tool-depth.test.mjs
```

Expected: PASS

### Task 6: Run final flagship-tool verification

**Files:**
- Review: `src/pages/saas-pricing/[slug].astro`
- Review: `src/lib/tools.ts`
- Review: `tests/core-tool-clusters.test.mjs`
- Review: `tests/usage-based-content.test.mjs`
- Review: `tests/api-pricing-content.test.mjs`
- Review: `tests/flagship-tool-page-ux.test.mjs`

**Step 1: Run the final command set**

Run:

```bash
npm run build
node tests/usage-based-content.test.mjs
node tests/api-pricing-content.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/core-tool-depth.test.mjs
node tests/tool-meta-separation.test.mjs
node tests/tool-priority.test.mjs
node tests/tool-trust-data.test.mjs
node tests/flagship-tool-page-ux.test.mjs
```

Expected: PASS

**Step 2: Review the constrained diff**

Run:

```bash
git diff -- src/pages/saas-pricing/[slug].astro src/lib/tools.ts tests/core-tool-clusters.test.mjs tests/usage-based-content.test.mjs tests/api-pricing-content.test.mjs tests/core-tool-depth.test.mjs tests/flagship-tool-page-ux.test.mjs docs/plans/2026-04-23-flagship-tool-pages-batch-4-design.md docs/plans/2026-04-23-flagship-tool-pages-batch-4.md
```

Expected:

- no unrelated file churn
- batch stays limited to two flagship tool pages, the shared tool template, and
  related tests
