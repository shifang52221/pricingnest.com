# Compute Flagship Batch 5 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the compute cost estimator so it behaves like a retained
compute-pricing decision page instead of another generic tool detail page.

**Architecture:** Keep the existing Astro tool-page template and calculator
logic, but add a compute-only flagship layer for
`compute-cost-estimator`. Tighten tests first so the page must show stronger
compute-specific decision framing and a tighter retained path. Then update the
shared template and compute tool metadata until the page expresses more unique
judgment without widening into a broader infrastructure content batch.

**Tech Stack:** Astro, TypeScript, file-based Node.js tests, tool metadata in
`src/lib/tools.ts`, shared tool detail template in
`src/pages/saas-pricing/[slug].astro`

---

### Task 1: Lock compute flagship expectations with failing tests

**Files:**
- Modify: `tests/core-tool-clusters.test.mjs` only if compute cluster expectations need to tighten
- Create: `tests/compute-pricing-content.test.mjs`
- Modify or create: `tests/flagship-tool-page-ux.test.mjs`

**Step 1: Add a compute content regression test**

Create `tests/compute-pricing-content.test.mjs` that isolates the
`compute-cost-estimator` block in `src/lib/tools.ts` and requires stronger
compute-specific decision language.

At minimum it should require signals for:

- baseline workload selection
- monthly plan vs included usage or overage
- minimum commitment or platform-fee decisions
- workload-shape divergence or segmented packaging

Keep the test focused on page-support language rather than formulas.

**Step 2: Extend flagship page UX expectations**

Update `tests/flagship-tool-page-ux.test.mjs` so the shared template must
contain a dedicated compute flagship path for `compute-cost-estimator`.

The test should require:

- compute in the flagship slug set
- a compute-specific decision-summary path
- a compute-specific "when the monthly price is not enough" section
- dedicated compute follow-up resources that do not depend on broad generic
  guide spillover

**Step 3: Tighten compute cluster expectations only if needed**

Update `tests/core-tool-clusters.test.mjs` only if the compute retained path
needs a small expectation change to reflect the final curated path.

Do not widen the cluster.

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/compute-pricing-content.test.mjs
node tests/flagship-tool-page-ux.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected:

- `compute-pricing-content` FAILS because the compute tool record is not strong
  enough yet
- flagship page UX test FAILS because the template does not yet contain a
  compute flagship layer
- core tool cluster test may PASS unless expectations were intentionally
  tightened

### Task 2: Add a compute-only flagship layer to the shared tool template

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Add compute to the flagship-page switch**

Extend the existing flagship logic so `compute-cost-estimator` can use a
dedicated page path.

Do not generalize this to all infrastructure tools.

**Step 2: Add compute-specific page sections**

Add compute-specific content to the shared flagship configuration in
`src/pages/saas-pricing/[slug].astro`.

The compute path should include:

- a decision-summary block near the results area
- a section for when a flat monthly price is no longer enough
- a compute-specific next-step path

The copy should focus on:

- baseline workload selection
- fixed-cost recovery
- monthly plan vs commitment structure
- included baseline vs overage

**Step 3: Re-run compute flagship UX verification**

Run:

```bash
node tests/flagship-tool-page-ux.test.mjs
```

Expected: PASS

### Task 3: Tighten compute page-level follow-up resources

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/flagship-tool-page-ux.test.mjs`

**Step 1: Add a dedicated compute retained path**

Set the compute flagship page to use a tighter follow-up resource set centered
on retained compute decision support rather than generic guide spillover.

Keep the path focused on:

- `saas-gross-margin-targets`
- `compute-cost-modeling`
- `minimum-commitment-model`
- `unit-cost`
- `gross-margin`
- one additional compute-relevant support term only if truly justified

**Step 2: Re-run curated-link verification**

Run:

```bash
node tests/core-tool-clusters.test.mjs
node tests/flagship-tool-page-ux.test.mjs
```

Expected: PASS

### Task 4: Refresh compute tool metadata to support the flagship page

**Files:**
- Modify: `src/lib/tools.ts`
- Verify: `tests/compute-pricing-content.test.mjs`
- Verify: `tests/core-tool-depth.test.mjs`

**Step 1: Tighten compute interpretation and support language**

Refresh the `compute-cost-estimator` record only where it materially supports
the stronger flagship page.

Good targets:

- interpretation copy
- walkthrough emphasis
- scenario framing
- FAQ answers that reinforce:
  - baseline workload choice
  - monthly plan vs included usage
  - minimum commitment decisions
  - workload segmentation when one rate is not honest

Do not change formulas or input count.

**Step 2: Re-run compute metadata verification**

Run:

```bash
node tests/compute-pricing-content.test.mjs
node tests/core-tool-depth.test.mjs
```

Expected: PASS

### Task 5: Run final compute flagship verification

**Files:**
- Review: `src/pages/saas-pricing/[slug].astro`
- Review: `src/lib/tools.ts`
- Review: `tests/compute-pricing-content.test.mjs`
- Review: `tests/flagship-tool-page-ux.test.mjs`
- Review: `tests/core-tool-clusters.test.mjs`

**Step 1: Run the final command set**

Run:

```bash
npm run build
node tests/compute-pricing-content.test.mjs
node tests/flagship-tool-page-ux.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/core-tool-depth.test.mjs
node tests/tool-meta-separation.test.mjs
node tests/tool-priority.test.mjs
node tests/tool-trust-data.test.mjs
```

Expected: PASS

**Step 2: Review the constrained diff**

Run:

```bash
git diff -- src/pages/saas-pricing/[slug].astro src/lib/tools.ts tests/compute-pricing-content.test.mjs tests/flagship-tool-page-ux.test.mjs tests/core-tool-clusters.test.mjs tests/core-tool-depth.test.mjs docs/plans/2026-04-23-compute-flagship-batch-5-design.md docs/plans/2026-04-23-compute-flagship-batch-5.md
```

Expected:

- no unrelated file churn
- batch stays limited to one compute flagship page, the shared tool template,
  and related tests
