# Usage-Based Intent Tightening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the search intent and retained-core support layer around the usage-based pricing calculator without
changing its formula or overall UX.

**Architecture:** Keep the current Astro tool-page template. Make the change in the usage-based block inside
`src/lib/tools.ts`, update the curated usage-based cluster links, and lock the new behavior with focused regression
tests before implementation.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests

---

### Task 1: Lock the new usage-based intent with failing tests

**Files:**
- Modify: `tests/usage-based-content.test.mjs`
- Modify: `tests/seo-meta.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`

**Step 1: Rewrite the usage-based content regression test**

Require the usage-based block in `src/lib/tools.ts` to include:

- the current `metaTitle` and `metaDescription`
- `Value Metric Selection`
- `SaaS Gross Margin Targets`
- `Minimum Commitment Modeling`
- decision-focused FAQ wording about:
  - choosing a value metric
  - when fixed cost per unit is too high
  - when to add a platform fee or minimum commitment
  - how to move from a unit-price floor into tiered or annual packaging

Reject:

- `Delta CSV Template`
- `delta CSV template`
- the export-to-CSV FAQ emphasis for this tool
- `Included Usage` as part of the curated usage-based cluster

**Step 2: Update usage-based SEO expectations**

Change `tests/seo-meta.test.mjs` so the usage-based calculator expectations match the current pricing-intent metadata
instead of the old `Delta CSV` metadata.

**Step 3: Tighten cluster-link expectations**

Update `tests/core-tool-clusters.test.mjs` so the usage-based cluster expects:

- primary guide: `/guides/value-metric-selection/`
- support links including:
  - `/guides/saas-gross-margin-targets/`
  - `/guides/minimum-commitment-model/`
  - `/glossary/value-metric/`
  - `/glossary/usage-based-pricing/`

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/usage-based-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected: FAIL because the usage-based block and curated cluster have not been tightened yet.

### Task 2: Tighten the usage-based content block

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Keep pricing intent explicit**

Preserve the current usage-based pricing metadata and keep all old `Delta CSV` wording out of the usage-based block.

**Step 2: Strengthen sources**

Update the usage-based calculator `sources` so they point to:

- one internal-input source focused on usage distribution, unit cost, and pricing-floor review
- `Value Metric Selection`
- `SaaS Gross Margin Targets`
- `Minimum Commitment Modeling`

**Step 3: Tighten FAQ toward decision support**

Keep the FAQ useful, but bias it toward pricing decisions rather than tool operation.

### Task 3: Tighten the usage-based curated next-step cluster

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Refresh the usage-based cluster links**

Change `CORE_TOOL_CLUSTER_LINKS["usage-based-pricing-calculator"]` so the page routes to:

- `/guides/value-metric-selection/`
- `/guides/saas-gross-margin-targets/`
- `/guides/minimum-commitment-model/`
- `/glossary/value-metric/`
- `/glossary/usage-based-pricing/`

**Step 2: Keep the cluster compact**

Do not expand beyond five links. The goal is concentration, not a larger list.

### Task 4: Re-run targeted verification and build

**Files:**
- Verify: `tests/usage-based-content.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `npm run build`

**Step 1: Run the targeted verification set**

Run:

```bash
node tests/usage-based-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/tool-trust-data.test.mjs
npm run build
```

Expected: PASS with tighter usage-based intent and an unchanged calculator build.

### Task 5: Verify the live usage-based page after deploy

**Files:**
- Verify: production HTML for `/saas-pricing/usage-based-pricing-calculator/`

**Step 1: Re-check live HTML**

Run:

```bash
curl.exe -L https://pricingnest.com/saas-pricing/usage-based-pricing-calculator/ | Select-String -Pattern 'Delta CSV Template|value-metric-selection|saas-gross-margin-targets|minimum-commitment-model|included-usage'
```

Expected:

- `Delta CSV Template` absent
- `value-metric-selection`, `saas-gross-margin-targets`, and `minimum-commitment-model` present
- `included-usage` absent from the curated next-step cluster
