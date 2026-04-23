# Storage Flagship Batch 6 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the storage cost calculator so it behaves like a retained
storage-pricing decision page rather than another generic tool detail page.

**Architecture:** Keep the existing Astro tool-page template and calculator
logic, but add a storage-only flagship layer for
`storage-cost-calculator`. Tighten storage-specific tests first so the page must
express clearer pricing-boundary judgment around GB-month, request,
retrieval-sensitive costs, and minimum commitments. Then update the shared
template and storage tool metadata until the page becomes more structurally and
editorially distinct without widening into a broader infrastructure batch.

**Tech Stack:** Astro, TypeScript, file-based Node.js tests, shared tool detail
template in `src/pages/saas-pricing/[slug].astro`, tool metadata in
`src/lib/tools.ts`

---

### Task 1: Lock storage flagship expectations with failing tests

**Files:**
- Modify: `tests/storage-pricing-content.test.mjs`
- Modify: `tests/flagship-tool-page-ux.test.mjs`
- Verify: `tests/core-tool-clusters.test.mjs`

**Step 1: Tighten the storage content regression**

Update `tests/storage-pricing-content.test.mjs` so the
`storage-cost-calculator` block must show stronger storage-specific packaging
signals.

At minimum require signals for:

- included storage versus overage boundaries
- when requests or retrievals should stay separate from the base rate
- when fixed overhead requires a platform fee or minimum commitment
- when hot and archive pricing should split

Keep the test focused on pricing structure and packaging judgment, not formulas.

**Step 2: Extend flagship page UX expectations**

Update `tests/flagship-tool-page-ux.test.mjs` so the shared template must
contain a dedicated storage flagship path for `storage-cost-calculator`.

Require:

- storage in the flagship slug set
- a storage-specific decision-summary path
- a storage-specific packaging-change heading
- dedicated storage follow-up resources tied to retained pages

**Step 3: Run tests to verify failure**

Run:

```bash
node tests/storage-pricing-content.test.mjs
node tests/flagship-tool-page-ux.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected:

- `storage-pricing-content` FAILS because the storage record is not strong
  enough yet
- flagship page UX test FAILS because the template does not yet contain the
  storage flagship layer
- core tool cluster test should continue to PASS

### Task 2: Add a storage-only flagship layer to the shared template

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Add storage to the flagship-page switch**

Extend the existing flagship logic so `storage-cost-calculator` can use a
dedicated page path.

Do not generalize this to all infrastructure tools.

**Step 2: Add storage-specific page sections**

Add storage-specific content to the shared flagship configuration in
`src/pages/saas-pricing/[slug].astro`.

The storage path should include:

- a decision-summary block near the results area
- a section explaining when one GB-month price is no longer enough
- a storage-specific next-step path

The copy should focus on:

- base GB-month economics
- request and retrieval boundaries
- minimum commitments for fixed overhead recovery
- hot versus archive separation when one price no longer fits

**Step 3: Re-run flagship UX verification**

Run:

```bash
node tests/flagship-tool-page-ux.test.mjs
```

Expected: PASS

### Task 3: Tighten storage follow-up resources

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/flagship-tool-page-ux.test.mjs`

**Step 1: Add a dedicated storage retained path**

Set the storage flagship page to use a tighter follow-up resource set centered
on retained storage pricing support rather than broad guide spillover.

Keep the path focused on:

- `price-per-gb-month-explained`
- `storage-costs-and-pricing`
- `storage-retrieval-fees`
- `gb-month`
- `minimum-commitment`

Only add a sixth resource if it materially sharpens the pricing-boundary path.

**Step 2: Re-run curated-link verification**

Run:

```bash
node tests/core-tool-clusters.test.mjs
node tests/flagship-tool-page-ux.test.mjs
```

Expected: PASS

### Task 4: Refresh storage metadata to support the flagship page

**Files:**
- Modify: `src/lib/tools.ts`
- Verify: `tests/storage-pricing-content.test.mjs`
- Verify: `tests/core-tool-depth.test.mjs`

**Step 1: Tighten storage interpretation and support language**

Refresh the `storage-cost-calculator` record only where it materially supports
the stronger flagship page.

Good targets:

- interpretation copy
- walkthrough emphasis
- scenario framing
- FAQ answers that reinforce:
  - included storage versus overage boundaries
  - request or retrieval separation
  - fixed overhead recovery
  - hot versus archive packaging split

Do not change formulas or input count.

**Step 2: Re-run storage metadata verification**

Run:

```bash
node tests/storage-pricing-content.test.mjs
node tests/core-tool-depth.test.mjs
```

Expected: PASS

### Task 5: Run final storage flagship verification

**Files:**
- Review: `src/pages/saas-pricing/[slug].astro`
- Review: `src/lib/tools.ts`
- Review: `tests/storage-pricing-content.test.mjs`
- Review: `tests/flagship-tool-page-ux.test.mjs`
- Review: `tests/core-tool-clusters.test.mjs`
- Review: `docs/plans/2026-04-23-storage-flagship-batch-6-design.md`
- Review: `docs/plans/2026-04-23-storage-flagship-batch-6.md`

**Step 1: Run the final command set**

Run:

```bash
npm run build
node tests/storage-pricing-content.test.mjs
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
git diff -- src/pages/saas-pricing/[slug].astro src/lib/tools.ts tests/storage-pricing-content.test.mjs tests/flagship-tool-page-ux.test.mjs tests/core-tool-clusters.test.mjs tests/core-tool-depth.test.mjs docs/plans/2026-04-23-storage-flagship-batch-6-design.md docs/plans/2026-04-23-storage-flagship-batch-6.md
```

Expected:

- no unrelated file churn
- batch stays limited to one storage flagship page, the shared tool template,
  and related tests
