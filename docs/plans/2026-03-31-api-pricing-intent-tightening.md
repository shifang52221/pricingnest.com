# API Pricing Intent Tightening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the search intent and retained-core support layer around the API pricing calculator without changing
its formula or overall UX.

**Architecture:** Keep the existing Astro tool-page template. Make the change in the `api-pricing-calculator` block
inside `src/lib/tools.ts`, update the curated API pricing cluster links, and lock the new behavior with focused
regression tests before implementation.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests

---

### Task 1: Lock the new API pricing intent with failing tests

**Files:**
- Create: `tests/api-pricing-content.test.mjs`
- Modify: `tests/seo-meta.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`

**Step 1: Write the dedicated API pricing content regression test**

Create `tests/api-pricing-content.test.mjs` so it isolates the `api-pricing-calculator` block in `src/lib/tools.ts`.

Require the block to include:

- the new `metaTitle` and `metaDescription`
- `Value Metric Selection`
- `API Pricing Model`
- `Minimum Commitment Modeling`
- decision-oriented FAQ wording about:
  - choosing per-call vs per-1,000-call pricing
  - deciding what counts as a billable API call
  - adding a platform fee or minimum commitment
  - testing whether gross margin survives heavier traffic
  - turning a unit-price floor into included usage and overages

Reject:

- repeated `API cost estimate` keyword phrasing
- `How do I go from API cost estimate to list price?`
- `Can I use this as a cost estimate for an API plan?`
- `/glossary/rate-limit/` as part of the curated API pricing cluster

**Step 2: Update API pricing SEO expectations**

Modify `tests/seo-meta.test.mjs` so the `api-pricing-calculator` entry expects:

- `metaTitle: "API Pricing Calculator & Price Per 1,000 Calls Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe API price from call volume, infra cost per 1,000 calls, fixed overhead, and target gross margin. Compare billable-call scenarios, set a price floor, and decide when a platform fee or minimum commitment is needed."`

**Step 3: Tighten cluster-link expectations**

Modify `tests/core-tool-clusters.test.mjs` so the API pricing cluster expects:

- primary guide: `/guides/value-metric-selection/`
- support links including:
  - `/guides/api-pricing-model/`
  - `/guides/minimum-commitment-model/`
  - `/glossary/api-call/`
  - `/glossary/pricing-metric/`

Do not keep `/glossary/rate-limit/` as a required support link for this page.

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/api-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected: FAIL because the API pricing block and curated cluster have not been tightened yet.

### Task 2: Tighten the API pricing content block

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Keep pricing intent explicit**

Update the API pricing metadata so the page reads like a pricing-decision tool instead of a generic API cost
estimator.

Target metadata:

- `metaTitle: "API Pricing Calculator & Price Per 1,000 Calls Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe API price from call volume, infra cost per 1,000 calls, fixed overhead, and target gross margin. Compare billable-call scenarios, set a price floor, and decide when a platform fee or minimum commitment is needed."`

Refresh `reviewed` to `2026-03-31`.

**Step 2: Strengthen sources**

Update the API pricing calculator `sources` so they point to:

- one internal-input source focused on billable call mix, blended infra cost, and pricing-floor review
- `Value Metric Selection`
- `API Pricing Model`
- `Minimum Commitment Modeling`

**Step 3: Tighten interpretation and FAQ**

Keep the page useful, but bias it toward pricing decisions rather than keyword coverage.

Replace lower-value FAQ duplication with decision-oriented questions such as:

- `How do I choose between pricing per call and per 1,000 calls?`
- `What should count as a billable API call?`
- `When should I add a platform fee or minimum commitment?`
- `How do I test whether gross margin survives heavier traffic?`
- `How do I turn a price-per-1,000-calls floor into included usage and overages?`

Remove weaker duplicate phrasing around:

- API cost estimate to list price
- cost estimate for an API plan
- repeated cost-estimate wording that does not add decision value

### Task 3: Tighten the API pricing curated next-step cluster

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Refresh the API pricing cluster links**

Change `CORE_TOOL_CLUSTER_LINKS["api-pricing-calculator"]` so the page routes to:

- `/guides/value-metric-selection/`
- `/guides/api-pricing-model/`
- `/guides/minimum-commitment-model/`
- `/glossary/api-call/`
- `/glossary/pricing-metric/`

**Step 2: Keep the cluster compact**

Do not expand beyond five links. The goal is concentration, not a larger list.

### Task 4: Re-run targeted verification and build

**Files:**
- Verify: `tests/api-pricing-content.test.mjs`
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
node tests/api-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/tool-trust-data.test.mjs
node tests/content-governance.test.mjs
node tests/site-quality-signals.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
npm run build
```

Expected: PASS with tighter API pricing intent and an unchanged calculator build.

### Task 5: Verify the live API pricing page after deploy

**Files:**
- Verify: production HTML for `/saas-pricing/api-pricing-calculator/`

**Step 1: Re-check live HTML**

Run:

```bash
curl.exe -L https://pricingnest.com/saas-pricing/api-pricing-calculator/ | Select-String -Pattern 'Price Per 1,000 Calls Floor|value-metric-selection|api-pricing-model|minimum-commitment-model|glossary/rate-limit|How do I go from API cost estimate to list price\\?'
```

Expected:

- `Price Per 1,000 Calls Floor` present
- `value-metric-selection`, `api-pricing-model`, and `minimum-commitment-model` present
- `glossary/rate-limit` absent from the curated next-step cluster
- `How do I go from API cost estimate to list price?` absent
