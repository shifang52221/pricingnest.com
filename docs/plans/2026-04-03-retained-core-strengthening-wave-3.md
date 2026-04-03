# Retained Core Strengthening Wave 3 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the next retained API and retention bridge layer so one guide and two glossary terms better support core pricing decisions without widening the indexed surface.

**Architecture:** Keep the current Astro content model, retained-core governance layer, and page templates. Use test-first retained-depth, trust, and link-concentration assertions to lock the expected quality floor, then strengthen `api-pricing-model` first and follow with the retained glossary support pair `usage-based-pricing` and `churn`.

**Tech Stack:** Astro, Markdown content collections, Node.js file-based tests, git worktrees

---

### Task 1: Lock retained API guide expectations with failing tests

**Files:**
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/guide-trust-data.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Reference: `src/content/guides/api-pricing-model.md`

**Step 1: Write the failing retained-guide checks**

Add retained-guide depth checks for:
- `api-pricing-model`

Use this structure:
- minimum word count of at least `500`
- six retained-guide headings
- at least four matching topic keywords
- at least two calculator links
- at least two glossary links

Extend `guide-trust-data.test.mjs` so `api-pricing-model` must include:
- `sources`
- internal input source
- supporting page sources

Add retained-link concentration assertions so:
- `api-pricing-model` includes `/glossary/api-call/`
- `api-pricing-model` includes `/glossary/rate-limit/`
- `api-pricing-model` does not include `/glossary/cogs/`

**Step 2: Run the tests to verify failure**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected:
- retained-guide depth fails because `api-pricing-model` is still too thin or missing retained headings
- guide trust data fails because the guide lacks retained source metadata
- retained-link concentration fails because the guide still leans on weaker glossary support

**Step 3: Commit**

```bash
git add tests/retained-guide-depth.test.mjs tests/guide-trust-data.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "test: lock retained api guide expectations"
```

### Task 2: Strengthen `api-pricing-model`

**Files:**
- Modify: `src/content/guides/api-pricing-model.md`

**Step 1: Rewrite the guide**

Implement these sections exactly:
- `## When API pricing deserves its own model`
- `## Inputs to confirm before you price`
- `## Where API teams underprice`
- `## Pricing options and trade-offs`
- `## How to interpret the calculator outputs`
- `## Next steps`

Add retained trust metadata and sources, and ensure the guide:
- explains billable unit boundaries, free tier shape, base fee versus pure usage pricing, and rate-limit or overage paths
- links to retained support such as `api-call`, `rate-limit`, `usage-based-pricing`, and `gross-margin`
- removes weaker dependence on `cogs`

**Step 2: Run API guide verification**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: PASS

**Step 3: Commit**

```bash
git add src/content/guides/api-pricing-model.md tests/retained-guide-depth.test.mjs tests/guide-trust-data.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "feat: strengthen retained api pricing guide"
```

### Task 3: Lock retained glossary bridge expectations with failing tests

**Files:**
- Modify: `tests/retained-glossary-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Reference: `src/content/glossary/usage-based-pricing.md`
- Reference: `src/content/glossary/churn.md`

**Step 1: Write the failing retained-glossary checks**

Add retained-glossary depth checks for:
- `usage-based-pricing`
- `churn`

Use this structure:
- minimum word count of at least `260`
- six retained-glossary headings
- at least four matching topic keywords
- at least one guide or calculator link
- explicit `reviewed:` metadata

Extend `retained-link-concentration.test.mjs` so:
- `usage-based-pricing` includes `/guides/value-metric-selection/`
- `usage-based-pricing` includes `/saas-pricing/usage-based-pricing-calculator/`
- `usage-based-pricing` does not include `/guides/usage-mix-modeling/`
- `churn` includes `/guides/annual-prepay-discount/`
- `churn` includes `/saas-pricing/pricing-increase-impact-calculator/`
- `churn` does not include `/guides/churn-survey-insights/`
- `churn` does not include `/guides/annual-renewal-strategy/`

**Step 2: Run the tests to verify failure**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected:
- retained glossary depth fails because `usage-based-pricing` and `churn` are still too thin or missing retained headings
- retained-link concentration fails because both pages still lean on weaker or `noindex` guide neighbors

**Step 3: Commit**

```bash
git add tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "test: lock retained usage and churn glossary expectations"
```

### Task 4: Strengthen the retained glossary pair

**Files:**
- Modify: `src/content/glossary/usage-based-pricing.md`
- Modify: `src/content/glossary/churn.md`

**Step 1: Rewrite `usage-based-pricing`**

Implement these sections exactly:
- `## Definition`
- `## Why it matters in pricing decisions`
- `## How usage-based pricing changes packaging and margin protection`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

Ensure the page:
- explains value metric fit, included usage, overage design, bill shock risk, and segment predictability
- supports retained usage calculators and guides
- removes dependence on `usage-mix-modeling`

**Step 2: Rewrite `churn`**

Implement these sections exactly:
- `## Definition`
- `## Why it matters in pricing decisions`
- `## How churn changes pricing, retention, and expansion interpretation`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

Ensure the page:
- explains logo versus revenue churn, pricing-change risk, annual commitment, renewal behavior, and LTV sensitivity
- links to retained annual and pricing-impact pathways
- removes dependence on `churn-survey-insights` and `annual-renewal-strategy`

**Step 3: Run glossary verification**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/glossary-trust-data.test.mjs
```

Expected: PASS

**Step 4: Commit**

```bash
git add src/content/glossary/usage-based-pricing.md src/content/glossary/churn.md
git add tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "feat: strengthen retained usage and churn glossary pages"
```

### Task 5: Verify the batch and record the review outcome

**Files:**
- Create: `docs/plans/2026-04-03-retained-core-strengthening-wave-3-review-log.md`
- Reference: `docs/plans/2026-04-03-retained-core-strengthening-wave-3-design.md`

**Step 1: Run targeted and broader verification**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-glossary-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/glossary-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
node tests/tool-trust-data.test.mjs
node tests/seo-meta.test.mjs
node tests/content-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
npm run build
```

If sitemap verification is needed, run it only after the fresh build:

```bash
node tests/sitemap-governance.test.mjs
```

**Step 2: Write the review log**

Create `docs/plans/2026-04-03-retained-core-strengthening-wave-3-review-log.md` with:
- what this batch changed
- what this batch intentionally did not change
- remaining risks
- next recommended retained-core batch

**Step 3: Review the diff**

Confirm:
- no new URLs were added
- no governance surface was widened
- the three strengthened pages rely more on retained-core neighbors
- no template regression slipped into examples, FAQs, or next-step copy

**Step 4: Commit**

```bash
git add docs/plans/2026-04-03-retained-core-strengthening-wave-3-review-log.md
git commit -m "docs: record retained bridge wave 3 review"
```
