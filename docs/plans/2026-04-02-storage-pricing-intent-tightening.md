# Storage Pricing Intent Tightening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the search intent and retained-core support layer around the storage pricing calculator without
changing its formula or overall UX.

**Architecture:** Keep the existing Astro tool-page template. Make the change in the `storage-cost-calculator` block
inside `src/lib/tools.ts`, update the curated storage cluster links, and lock the new behavior with focused regression
tests before implementation.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests

---

### Task 1: Lock the new storage pricing intent with failing tests

**Files:**
- Create: `tests/storage-pricing-content.test.mjs`
- Modify: `tests/seo-meta.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`

**Step 1: Write the dedicated storage pricing content regression test**

Create `tests/storage-pricing-content.test.mjs` so it isolates the `storage-cost-calculator` block in
`src/lib/tools.ts`.

Require the block to include:

- the new `metaTitle` and `metaDescription`
- `Price Per GB-Month Explained`
- `Storage Costs and Pricing`
- `Storage Retrieval Fees`
- decision-oriented FAQ wording about:
  - how to turn cost per GB-month into a storage price floor
  - when to charge separately for requests or retrievals
  - when hot and archive storage should use different pricing
  - when fixed storage overhead requires a platform fee or minimum commitment
  - how to test whether gross margin still holds for request-heavy workloads

Reject:

- `Google Cloud Storage price calculator`
- `What is cost per GB-month?`
- `What counts as a request?`
- `/glossary/storage-costs/` as part of the curated storage pricing cluster

**Step 2: Update storage pricing SEO expectations**

Modify `tests/seo-meta.test.mjs` so the `storage-cost-calculator` entry expects:

- `metaTitle: "Storage Pricing Calculator & Price Per GB-Month Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe storage price from average GB stored, request volume, retrieval-sensitive costs, fixed overhead, and target gross margin. Compare archive and request-heavy workloads, set a price per GB-month floor, and decide when request or retrieval fees should be priced separately."`

**Step 3: Tighten cluster-link expectations**

Modify `tests/core-tool-clusters.test.mjs` so the storage pricing cluster expects:

- primary guide: `/guides/price-per-gb-month-explained/`
- support links including:
  - `/guides/storage-costs-and-pricing/`
  - `/guides/storage-retrieval-fees/`
  - `/glossary/gb-month/`
  - `/glossary/retrieval-fees/`

Do not keep `/glossary/storage-costs/` as a required support link for this page.

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/storage-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected: FAIL because the storage pricing block and curated cluster have not been tightened yet.

### Task 2: Tighten the storage pricing content block

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Keep pricing intent explicit**

Update the storage pricing metadata so the page reads like a pricing-decision tool instead of a generic storage cost
calculator.

Target metadata:

- `metaTitle: "Storage Pricing Calculator & Price Per GB-Month Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe storage price from average GB stored, request volume, retrieval-sensitive costs, fixed overhead, and target gross margin. Compare archive and request-heavy workloads, set a price per GB-month floor, and decide when request or retrieval fees should be priced separately."`

Refresh `reviewed` to `2026-04-02`.

**Step 2: Strengthen sources**

Update the storage pricing calculator `sources` so they point to:

- one internal-input source focused on storage billing exports plus request and retrieval mix review
- `Price Per GB-Month Explained`
- `Storage Costs and Pricing`
- `Storage Retrieval Fees`

**Step 3: Tighten interpretation and FAQ**

Keep the page useful, but bias it toward pricing decisions rather than generic storage explanation.

Replace lower-value FAQ emphasis with decision-oriented questions such as:

- `How do I turn cost per GB-month into a storage price floor?`
- `When should I charge separately for requests or retrievals?`
- `When should hot and archive storage use different pricing?`
- `When does fixed storage overhead require a platform fee or minimum commitment?`
- `How do I test whether gross margin still holds for request-heavy workloads?`

Remove weaker explanatory phrasing around:

- generic cloud-storage calculator wording
- raw terminology explainers that do not add pricing decision value
- request-definition FAQ phrasing that frames the page as glossary help instead of pricing guidance

### Task 3: Tighten the storage pricing curated next-step cluster

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Refresh the storage pricing cluster links**

Change `CORE_TOOL_CLUSTER_LINKS["storage-cost-calculator"]` so the page routes to:

- `/guides/price-per-gb-month-explained/`
- `/guides/storage-costs-and-pricing/`
- `/guides/storage-retrieval-fees/`
- `/glossary/gb-month/`
- `/glossary/retrieval-fees/`

**Step 2: Keep the cluster compact**

Do not expand beyond five links. The goal is concentration, not a larger list.

### Task 4: Re-run targeted verification and build

**Files:**
- Verify: `tests/storage-pricing-content.test.mjs`
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
node tests/storage-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/tool-trust-data.test.mjs
node tests/content-governance.test.mjs
node tests/site-quality-signals.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
npm run build
```

Expected: PASS with tighter storage pricing intent and an unchanged calculator build.

### Task 5: Verify the live storage pricing page after deploy

**Files:**
- Verify: production HTML for `/saas-pricing/storage-cost-calculator/`

**Step 1: Re-check live HTML**

Run:

```bash
curl.exe -L https://pricingnest.com/saas-pricing/storage-cost-calculator/ | Select-String -Pattern 'Price Per GB-Month Floor|price-per-gb-month-explained|storage-costs-and-pricing|storage-retrieval-fees|glossary/storage-costs|What is cost per GB-month\\?|Google Cloud Storage price calculator'
```

Expected:

- `Price Per GB-Month Floor` present
- `price-per-gb-month-explained`, `storage-costs-and-pricing`, and `storage-retrieval-fees` present
- `glossary/storage-costs` absent from the curated next-step cluster
- `What is cost per GB-month?` absent
- `Google Cloud Storage price calculator` absent
