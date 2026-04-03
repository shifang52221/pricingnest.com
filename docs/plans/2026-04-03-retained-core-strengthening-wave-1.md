# Retained Core Strengthening Wave 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen four retained indexed support pages so they better support core calculator clusters and reduce low-quality site risk without widening scope.

**Architecture:** Keep the current Astro content model, governance layer, and page templates. Use test-first retained-depth, trust, and link-concentration assertions to lock expectations, then strengthen two guides followed by two glossary pages while preserving retained-core link discipline.

**Tech Stack:** Astro, Markdown content collections, Node.js file-based tests, git worktrees

---

### Task 1: Lock retained guide expectations with failing tests

**Files:**
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Reference: `src/content/guides/minimum-commitment-model.md`
- Reference: `src/content/guides/price-per-gb-month-explained.md`

**Step 1: Write the failing retained-guide checks**

Add guide depth checks for:
- `minimum-commitment-model`
- `price-per-gb-month-explained`

Use this structure:
- minimum word count of at least `500`
- six retained-guide headings
- at least four matching topic keywords
- at least two calculator links
- at least two glossary links

Add retained-link-concentration assertions so:
- `minimum-commitment-model` includes `/glossary/billing-cycle/`
- `minimum-commitment-model` does not include `/glossary/contract-value/`
- `price-per-gb-month-explained` includes `/glossary/gb-month/`
- `price-per-gb-month-explained` does not include `/glossary/storage-costs/`
- `price-per-gb-month-explained` does not include `/glossary/cogs/`

**Step 2: Run the tests to verify failure**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected:
- retained-guide depth fails because the two guides are still too thin or missing headings
- retained-link concentration fails because the current guide links still point to weaker support pages

**Step 3: Commit**

```bash
git add tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "test: lock retained guide strengthening expectations"
```

### Task 2: Strengthen the retained guide pair

**Files:**
- Modify: `src/content/guides/minimum-commitment-model.md`
- Modify: `src/content/guides/price-per-gb-month-explained.md`

**Step 1: Rewrite `minimum-commitment-model`**

Implement these sections exactly:
- `## When minimum commitments are the right pricing tool`
- `## Inputs to confirm before you set a commitment`
- `## Where minimum commitments go wrong`
- `## Commitment vs platform fee vs included usage`
- `## How to interpret the calculator outputs`
- `## Next steps`

Ensure the page:
- compares minimum commitments against platform fees and included usage
- explains billing-cycle and annual-prepay impact
- keeps retained links focused on `billing-cycle`, `minimum-commitment`, `pricing-metric`, and relevant tools

**Step 2: Rewrite `price-per-gb-month-explained`**

Implement these sections exactly:
- `## When price per GB-month is a useful buyer-facing metric`
- `## Inputs to confirm before publishing a storage price`
- `## Where storage teams underprice`
- `## When to separate request, retrieval, or replication charges`
- `## How to interpret the calculator outputs`
- `## Next steps`

Ensure the page:
- covers request-heavy and retrieval-sensitive workloads
- explains replication, backup, and overhead treatment
- replaces weaker glossary references with retained-core support where possible

**Step 3: Run guide verification**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: PASS

**Step 4: Commit**

```bash
git add src/content/guides/minimum-commitment-model.md src/content/guides/price-per-gb-month-explained.md
git add tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "feat: strengthen retained guide decision pages"
```

### Task 3: Lock retained glossary expectations with failing tests

**Files:**
- Modify: `tests/retained-glossary-depth.test.mjs`
- Modify: `tests/glossary-trust-data.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Reference: `src/content/glossary/rate-limit.md`
- Reference: `src/content/glossary/billing-cycle.md`

**Step 1: Write the failing retained-glossary checks**

Add glossary depth checks for:
- `rate-limit`
- `billing-cycle`

Use this structure:
- minimum word count of at least `260`
- six retained-glossary headings
- at least four matching topic keywords
- at least one guide or calculator link
- explicit `reviewed:` metadata

Extend `glossary-trust-data.test.mjs` so `billing-cycle` must include:
- `reviewedBy`
- `reviewed`
- `sources`
- internal input source
- supporting page sources

Extend `retained-link-concentration.test.mjs` so:
- `rate-limit` does not include `/guides/api-rate-limit-pricing/`
- `rate-limit` includes `/guides/api-pricing-model/`
- `billing-cycle` includes `/guides/minimum-commitment-model/`
- `billing-cycle` includes `/saas-pricing/annual-discount-calculator/`
- `billing-cycle` does not include `/guides/annual-renewal-strategy/`
- `billing-cycle` does not include `/glossary/annual-plan/`

**Step 2: Run the tests to verify failure**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/glossary-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected:
- retained glossary depth fails because `rate-limit` and `billing-cycle` are still too thin or missing headings
- glossary trust data fails because `billing-cycle` lacks retained trust metadata
- retained-link concentration fails because the current links still lean on weaker support pages

**Step 3: Commit**

```bash
git add tests/retained-glossary-depth.test.mjs tests/glossary-trust-data.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "test: lock retained glossary strengthening expectations"
```

### Task 4: Strengthen the retained glossary pair

**Files:**
- Modify: `src/content/glossary/rate-limit.md`
- Modify: `src/content/glossary/billing-cycle.md`

**Step 1: Rewrite `rate-limit`**

Implement these sections exactly:
- `## Definition`
- `## Why it matters in pricing decisions`
- `## How rate limits affect plan design and margin protection`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

Ensure the page:
- explains fairness, burst traffic, error-budget, and overage-path trade-offs
- links to retained API pages and tools instead of weaker support pages

**Step 2: Rewrite `billing-cycle`**

Add retained trust metadata and source blocks, then implement these sections exactly:
- `## Definition`
- `## Why it matters in pricing decisions`
- `## How billing cycle changes discount, churn, and cash flow interpretation`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

Ensure the page:
- supports annual discount and minimum-commitment interpretation
- explains effective monthly rate, renewal behavior, and MRR reporting
- removes dependence on weaker annual-plan and noindexed billing-cycle support pages

**Step 3: Run glossary verification**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/glossary-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: PASS

**Step 4: Commit**

```bash
git add src/content/glossary/rate-limit.md src/content/glossary/billing-cycle.md
git add tests/retained-glossary-depth.test.mjs tests/glossary-trust-data.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "feat: strengthen retained glossary decision support"
```

### Task 5: Verify the batch and record review outcome

**Files:**
- Create: `docs/plans/2026-04-03-retained-core-strengthening-wave-1-review-log.md`
- Reference: `docs/plans/2026-04-03-retained-core-strengthening-wave-1-design.md`

**Step 1: Run targeted and broader verification**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-glossary-depth.test.mjs
node tests/glossary-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
node tests/tool-trust-data.test.mjs
npm run build
```

If sitemap verification is needed, run it only after the fresh build:

```bash
node tests/sitemap-governance.test.mjs
```

**Step 2: Write the review log**

Create `docs/plans/2026-04-03-retained-core-strengthening-wave-1-review-log.md` with:
- what this batch changed
- what this batch intentionally did not change
- remaining risks
- next recommended retained-core batch

**Step 3: Review the diff**

Confirm:
- no new URLs were added
- no governance surface was widened
- the four strengthened pages now rely more on retained-core neighbors
- no template regression slipped into FAQ, examples, or next-step copy

**Step 4: Commit**

```bash
git add docs/plans/2026-04-03-retained-core-strengthening-wave-1-review-log.md
git commit -m "docs: record retained core strengthening review"
```
