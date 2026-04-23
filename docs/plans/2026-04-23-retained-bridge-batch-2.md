# Retained Bridge Batch 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the retained API and storage support path by strengthening
four glossary bridge pages and aligning homepage, toolkit, and glossary hubs to
route users into the sharper retained guide and calculator chain.

**Architecture:** Keep the current Astro content architecture and retained-core
testing approach. First tighten hub, glossary, and tool-cluster expectations so
the current site fails in the right places. Then update the entry pages, adjust
API/storage core tool clusters, and rewrite the four retained glossary pages so
they behave more like decision bridges than broad definitions.

**Tech Stack:** Astro, Markdown content collections, Node.js file-based tests,
tool metadata in `src/lib/tools.ts`

---

### Task 1: Lock the retained-bridge batch expectations with failing tests

**Files:**
- Modify: `tests/hub-curation.test.mjs`
- Modify: `tests/retained-glossary-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`

**Step 1: Tighten homepage, toolkit hub, and glossary hub expectations**

Update `tests/hub-curation.test.mjs` so it requires stronger API and storage
retained paths:

- homepage must include language that frames API and storage as pricing
  decisions, not just tool entry points
- toolkit hub must include `api-cost-estimation` in the API workflow
- toolkit hub must include `storage-costs-and-pricing` in the storage workflow
- toolkit hub must include `gb-month` and `minimum-commitment` as retained
  glossary bridges for the storage path
- glossary hub must foreground `api-call`, `rate-limit`, `gb-month`, and
  `minimum-commitment` more explicitly as learn-first retained terms

Keep current exclusions for weaker inventory terms and generic browse patterns.

**Step 2: Tighten retained glossary depth expectations**

Update `tests/retained-glossary-depth.test.mjs` so these terms require stronger
decision-led sections:

- `api-call`
  - `## How API call boundaries become commercially misleading`
- `rate-limit`
  - keep `## How rate limits move from engineering guardrail to visible packaging rule`
- `gb-month`
  - replace `## How to use it with PricingNest tools` adjacency with a stronger
    decision section:
  - `## When GB-month is an honest buyer-facing storage unit`
- `minimum-commitment`
  - require:
  - `## When minimum commitment is a justified pricing floor`

Refresh keywords so each page must cover more pricing-structure language, not
just definitional vocabulary.

**Step 3: Tighten retained link concentration expectations**

Update `tests/retained-link-concentration.test.mjs` so:

- `api-call` must include:
  - `/guides/api-cost-estimation/`
  - `/guides/api-pricing-model/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/rate-limit/`
  - `/glossary/overage/`
- `rate-limit` must include:
  - `/guides/api-cost-estimation/`
  - `/guides/api-pricing-model/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/glossary/api-call/`
  - `/glossary/overage/`
- `gb-month` must include:
  - `/guides/storage-costs-and-pricing/`
  - `/guides/price-per-gb-month-explained/`
  - `/saas-pricing/storage-cost-calculator/`
  - `/saas-pricing/price-per-gb-month-calculator/`
  - `/glossary/minimum-commitment/`
- `minimum-commitment` must include:
  - `/guides/minimum-commitment-model/`
  - `/guides/api-cost-estimation/`
  - `/guides/storage-costs-and-pricing/`
  - `/saas-pricing/api-pricing-calculator/`
  - `/saas-pricing/storage-cost-calculator/`
  - `/glossary/gross-margin/`

Add exclusions so weaker adjacent inventory or broader glossary drift stays
out of those four pages where appropriate.

**Step 4: Tighten API and storage core tool-cluster expectations**

Update `tests/core-tool-clusters.test.mjs` so:

- `api-pricing-calculator` expects:
  - primary guide `/guides/api-cost-estimation/`
  - support from `/guides/api-pricing-model/`, `/glossary/api-call/`,
    `/glossary/rate-limit/`, `/glossary/overage/`
- `storage-cost-calculator` expects:
  - primary guide `/guides/storage-costs-and-pricing/`
  - support from `/guides/price-per-gb-month-explained/`,
    `/glossary/gb-month/`, `/glossary/minimum-commitment/`,
    `/guides/storage-retrieval-fees/`

**Step 5: Run the tightened tests to verify failure**

Run:

```bash
node tests/hub-curation.test.mjs
node tests/retained-glossary-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected:

- hub curation FAILS because homepage/toolkit/glossary hubs do not yet reflect
  the stronger API/storage bridge path
- retained glossary depth FAILS because `gb-month` and `minimum-commitment`
  still read too much like definitions
- retained link concentration FAILS because the glossary pages do not yet point
  to the tighter retained set
- core tool clusters FAIL because `src/lib/tools.ts` still uses the older API
  and storage cluster support

### Task 2: Re-curate homepage, toolkit hub, and glossary hub

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/saas-pricing/index.astro`
- Modify: `src/pages/glossary/index.astro`

**Step 1: Update homepage decision paths**

Change the homepage so the API and storage paths read more like retained
pricing-decision routes.

At minimum:

- API path should route through:
  - `/saas-pricing/api-pricing-calculator/`
  - `/guides/api-cost-estimation/`
  - `/glossary/api-call/`
  - `/glossary/rate-limit/`
- storage path should route through:
  - `/saas-pricing/storage-cost-calculator/`
  - `/guides/storage-costs-and-pricing/`
  - `/glossary/gb-month/`
  - `/glossary/minimum-commitment/`

**Step 2: Update toolkit hub workflows**

Change `src/pages/saas-pricing/index.astro` so:

- API workflow foregrounds `api-cost-estimation` before broader support terms
- storage workflow foregrounds `storage-costs-and-pricing`
- API and storage glossary bridges are explicit and retained-core focused

**Step 3: Update glossary hub curation**

Change `src/pages/glossary/index.astro` so the retained learn-first surface
more visibly features:

- `api-call`
- `rate-limit`
- `gb-month`
- `minimum-commitment`

Keep the hub curated and avoid falling back to generic inventory browsing.

**Step 4: Re-run hub curation verification**

Run:

```bash
node tests/hub-curation.test.mjs
```

Expected: PASS

### Task 3: Tighten API and storage core tool-cluster support

**Files:**
- Modify: `src/lib/tools.ts`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/api-pricing-content.test.mjs`
- Verify: `tests/storage-pricing-content.test.mjs`

**Step 1: Update API and storage `CORE_TOOL_CLUSTER_LINKS`**

Adjust the retained support chain so:

- `api-pricing-calculator` uses `api-cost-estimation` as the primary guide
  bridge and includes retained API glossary support
- `storage-cost-calculator` uses `storage-costs-and-pricing` as the primary
  guide bridge and includes `gb-month` plus `minimum-commitment`

Keep clusters focused and avoid adding extra links beyond the stronger retained
path.

**Step 2: Re-run tool-cluster verification**

Run:

```bash
node tests/core-tool-clusters.test.mjs
node tests/api-pricing-content.test.mjs
node tests/storage-pricing-content.test.mjs
```

Expected:

- `core-tool-clusters` PASS
- API and storage content tests remain PASS, proving the cluster refresh did
  not break tool-level content expectations

### Task 4: Rewrite `api-call` and `rate-limit` as stronger retained API bridges

**Files:**
- Modify: `src/content/glossary/api-call.md`
- Modify: `src/content/glossary/rate-limit.md`

**Step 1: Refresh frontmatter and retained support boundaries**

Update `updated`, `reviewed`, and `sources` while keeping scope narrow.

Both pages should stay concentrated on:

- retained API pricing support
- API calculator interpretation
- billable boundary, throughput rule, and escalation-path clarity

**Step 2: Strengthen body framing**

Rewrite the bodies so:

- `api-call` more clearly answers when a billable event becomes commercially
  misleading
- `rate-limit` more clearly answers when the cap becomes visible packaging

Both pages must directly support `api-cost-estimation` and
`api-pricing-model`, not drift toward broader API inventory.

**Step 3: Re-run targeted glossary verification**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/glossary-trust-data.test.mjs
```

Expected:

- API glossary failures are resolved
- storage glossary pages may still fail until the next task
- trust data remains PASS

### Task 5: Rewrite `gb-month` and `minimum-commitment` as stronger retained storage bridges

**Files:**
- Modify: `src/content/glossary/gb-month.md`
- Modify: `src/content/glossary/minimum-commitment.md`

**Step 1: Refresh frontmatter and retained support boundaries**

Keep URL and glossary role, but narrow the pages so they support:

- storage pricing interpretation
- API/storage floor decisions where commitments matter
- clearer boundary with weaker glossary drift

**Step 2: Replace definition-led framing with decision-led retained structure**

Rewrite:

- `gb-month` so it explains when GB-month is an honest buyer-facing storage unit
  and when it becomes a misleading average
- `minimum-commitment` so it explains when commitment is a justified pricing
  floor and when it is masking weak variable pricing

Each page should connect tightly to the relevant calculators and retained
guides.

**Step 3: Re-run targeted glossary verification**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/glossary-trust-data.test.mjs
```

Expected: PASS

### Task 6: Run final retained-bridge verification

**Files:**
- Review: `src/pages/index.astro`
- Review: `src/pages/saas-pricing/index.astro`
- Review: `src/pages/glossary/index.astro`
- Review: `src/lib/tools.ts`
- Review: `src/content/glossary/api-call.md`
- Review: `src/content/glossary/rate-limit.md`
- Review: `src/content/glossary/gb-month.md`
- Review: `src/content/glossary/minimum-commitment.md`

**Step 1: Run the final command set**

Run:

```bash
npm run build
node tests/hub-curation.test.mjs
node tests/retained-glossary-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/api-pricing-content.test.mjs
node tests/storage-pricing-content.test.mjs
node tests/glossary-trust-data.test.mjs
```

Expected: PASS

**Step 2: Review the constrained diff**

Run:

```bash
git diff -- src/pages/index.astro src/pages/saas-pricing/index.astro src/pages/glossary/index.astro src/lib/tools.ts src/content/glossary/api-call.md src/content/glossary/rate-limit.md src/content/glossary/gb-month.md src/content/glossary/minimum-commitment.md tests/hub-curation.test.mjs tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs tests/core-tool-clusters.test.mjs
```

Expected:

- no unrelated file churn
- batch remains limited to API/storage retained bridge work
