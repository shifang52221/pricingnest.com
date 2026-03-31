# Compute Pricing Intent Tightening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the search intent and retained-core support layer around the compute pricing calculator without
changing its formula or overall UX.

**Architecture:** Keep the existing Astro tool-page template. Make the change in the `compute-cost-estimator` block
inside `src/lib/tools.ts`, update the curated compute cluster links, and lock the new behavior with focused regression
tests before implementation.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests

---

### Task 1: Lock the new compute pricing intent with failing tests

**Files:**
- Create: `tests/compute-pricing-content.test.mjs`
- Modify: `tests/seo-meta.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`

**Step 1: Write the dedicated compute pricing content regression test**

Create `tests/compute-pricing-content.test.mjs` so it isolates the `compute-cost-estimator` block in `src/lib/tools.ts`.

Require the block to include:

- the new `metaTitle` and `metaDescription`
- `SaaS Gross Margin Targets`
- `Compute Cost Modeling`
- `Minimum Commitment Modeling`
- decision-oriented FAQ wording about:
  - when fixed compute cost is too high for variable pricing
  - how to treat reserved capacity or savings plans in pricing
  - when to add a platform fee or minimum commitment
  - how to test whether gross margin survives heavier workloads
  - how to turn a compute price floor into committed tiers or minimums

Reject:

- generic `cloud compute cost calculator` emphasis
- `What are vCPU-hours and GB-hours?`
- `Should I treat autoscaling as lower cost?`
- `/glossary/cogs/` as part of the curated compute pricing cluster

**Step 2: Update compute pricing SEO expectations**

Modify `tests/seo-meta.test.mjs` so the `compute-cost-estimator` entry expects:

- `metaTitle: "Compute Pricing Calculator & Monthly Price Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe compute price from vCPU-hours, memory GB-hours, blended unit cost, fixed overhead, and target gross margin. Compare baseline and heavier workloads, set a price floor, and decide when a platform fee or minimum commitment is needed."`

**Step 3: Tighten cluster-link expectations**

Modify `tests/core-tool-clusters.test.mjs` so the compute pricing cluster expects:

- primary guide: `/guides/saas-gross-margin-targets/`
- support links including:
  - `/guides/compute-cost-modeling/`
  - `/guides/minimum-commitment-model/`
  - `/glossary/unit-cost/`
  - `/glossary/gross-margin/`

Do not keep `/glossary/cogs/` as a required support link for this page.

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/compute-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected: FAIL because the compute pricing block and curated cluster have not been tightened yet.

### Task 2: Tighten the compute pricing content block

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Keep pricing intent explicit**

Update the compute pricing metadata so the page reads like a pricing-decision tool instead of a generic compute cost
estimator.

Target metadata:

- `metaTitle: "Compute Pricing Calculator & Monthly Price Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe compute price from vCPU-hours, memory GB-hours, blended unit cost, fixed overhead, and target gross margin. Compare baseline and heavier workloads, set a price floor, and decide when a platform fee or minimum commitment is needed."`

Refresh `reviewed` to `2026-03-31`.

**Step 2: Strengthen sources**

Update the compute pricing calculator `sources` so they point to:

- one internal-input source focused on blended capacity cost, reserved-capacity assumptions, and pricing-floor review
- `SaaS Gross Margin Targets`
- `Compute Cost Modeling`
- `Minimum Commitment Modeling`

**Step 3: Tighten interpretation and FAQ**

Keep the page useful, but bias it toward pricing decisions rather than generic cloud explanation.

Replace lower-value FAQ emphasis with decision-oriented questions such as:

- `When is fixed compute cost too high for pure variable pricing?`
- `How should I treat reserved capacity or savings plans in compute pricing?`
- `When should I add a platform fee or minimum commitment?`
- `How do I test whether gross margin still holds for heavier workloads?`
- `How do I turn a compute price floor into committed tiers or minimums?`

Remove weaker explanatory phrasing around:

- generic cloud compute cost calculator wording
- raw terminology explainers that do not add pricing decision value
- autoscaling phrasing that frames the page as infra education instead of pricing design

### Task 3: Tighten the compute pricing curated next-step cluster

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Refresh the compute pricing cluster links**

Change `CORE_TOOL_CLUSTER_LINKS["compute-cost-estimator"]` so the page routes to:

- `/guides/saas-gross-margin-targets/`
- `/guides/compute-cost-modeling/`
- `/guides/minimum-commitment-model/`
- `/glossary/unit-cost/`
- `/glossary/gross-margin/`

**Step 2: Keep the cluster compact**

Do not expand beyond five links. The goal is concentration, not a larger list.

### Task 4: Re-run targeted verification and build

**Files:**
- Verify: `tests/compute-pricing-content.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `npm run build`

**Step 1: Run the targeted verification set**

Run:

```bash
node tests/compute-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/tool-trust-data.test.mjs
node tests/content-governance.test.mjs
node tests/site-quality-signals.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
npm run build
```

Expected: PASS with tighter compute pricing intent and an unchanged calculator build.

### Task 5: Verify the live compute pricing page after deploy

**Files:**
- Verify: production HTML for `/saas-pricing/compute-cost-estimator/`

**Step 1: Re-check live HTML**

Run:

```bash
curl.exe -L https://pricingnest.com/saas-pricing/compute-cost-estimator/ | Select-String -Pattern 'Monthly Price Floor|saas-gross-margin-targets|compute-cost-modeling|minimum-commitment-model|glossary/cogs|What are vCPU-hours and GB-hours\\?'
```

Expected:

- `Monthly Price Floor` present
- `saas-gross-margin-targets`, `compute-cost-modeling`, and `minimum-commitment-model` present
- `glossary/cogs` absent from the curated next-step cluster
- `What are vCPU-hours and GB-hours?` absent
