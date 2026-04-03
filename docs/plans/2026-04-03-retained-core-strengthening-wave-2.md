# Retained Core Strengthening Wave 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen the next retained bridge layer so four indexed support pages feel more human-maintained, decision-oriented, and tightly connected to core calculator workflows without widening the indexed surface.

**Architecture:** Keep the current Astro content structure, retained-core governance, and page templates. Lock the new expectations with failing retained-depth, trust, and link-concentration tests first, then strengthen the two guides followed by the two glossary pages while preserving the strict-contraction strategy already in place.

**Tech Stack:** Astro, Markdown content collections, Node.js file-based tests, git worktrees

---

### Task 1: Lock retained guide wave-2 expectations with failing tests

**Files:**
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Reference: `src/content/guides/value-metric-selection.md`
- Reference: `src/content/guides/saas-gross-margin-targets.md`

**Step 1: Write the failing retained-guide checks**

Add retained-guide depth checks for:
- `value-metric-selection`
- `saas-gross-margin-targets`

Use this structure:
- minimum word count of at least `500`
- six retained-guide headings
- at least four matching topic keywords
- at least two calculator links
- at least two glossary links

Add retained-link concentration assertions so:
- `value-metric-selection` includes `/glossary/value-metric/`
- `value-metric-selection` includes `/glossary/pricing-metric/`
- `value-metric-selection` does not include `/glossary/arpa/`
- `saas-gross-margin-targets` includes `/glossary/gross-margin/`
- `saas-gross-margin-targets` does not include `/glossary/cogs/`
- `saas-gross-margin-targets` does not include `/glossary/unit-economics/`

**Step 2: Run the tests to verify failure**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected:
- retained-guide depth fails because the two guides are still too thin or missing the new retained headings
- retained-link concentration fails because the current guide links still lean on weaker glossary support

**Step 3: Commit**

```bash
git add tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "test: lock retained bridge guide expectations"
```

### Task 2: Strengthen the retained guide pair

**Files:**
- Modify: `src/content/guides/value-metric-selection.md`
- Modify: `src/content/guides/saas-gross-margin-targets.md`

**Step 1: Rewrite `value-metric-selection`**

Implement these sections exactly:
- `## When value metric selection becomes a pricing problem`
- `## Inputs to confirm before you lock the metric`
- `## Where teams choose the wrong metric`
- `## Value metric vs pricing metric vs packaging simplicity`
- `## How to interpret the calculator outputs`
- `## Next steps`

Ensure the page:
- explains the trade-offs between buyer-visible value, cost alignment, and packaging simplicity
- covers segment fit, explainability, and migration risk
- keeps retained links focused on `value-metric`, `pricing-metric`, `usage-based-pricing`, and relevant calculators

**Step 2: Rewrite `saas-gross-margin-targets`**

Implement these sections exactly:
- `## When gross margin targets shape pricing decisions`
- `## Inputs to confirm before choosing a target range`
- `## Where teams set the wrong margin target`
- `## Margin target vs growth, pass-through costs, and packaging`
- `## How to interpret the calculator outputs`
- `## Next steps`

Ensure the page:
- explains segment-specific margin floors and pass-through exposure
- connects margin targets to calculator interpretation instead of generic benchmarks
- replaces weaker support such as `cogs` and `unit-economics` with stronger retained-core support where possible

**Step 3: Run guide verification**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: PASS

**Step 4: Commit**

```bash
git add src/content/guides/value-metric-selection.md src/content/guides/saas-gross-margin-targets.md
git add tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "feat: strengthen retained bridge guide pages"
```

### Task 3: Lock retained glossary wave-2 expectations with failing tests

**Files:**
- Modify: `tests/retained-glossary-depth.test.mjs`
- Modify: `tests/glossary-trust-data.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Reference: `src/content/glossary/api-call.md`
- Reference: `src/content/glossary/annual-prepay-discount.md`

**Step 1: Write the failing retained-glossary checks**

Add retained-glossary depth checks for:
- `api-call`
- `annual-prepay-discount`

Use this structure:
- minimum word count of at least `260`
- six retained-glossary headings
- at least four matching topic keywords
- at least one guide or calculator link
- explicit `reviewed:` metadata

Extend `glossary-trust-data.test.mjs` so `api-call` must include:
- `reviewedBy`
- `reviewed`
- `sources`
- internal input source
- supporting page sources

Extend `retained-link-concentration.test.mjs` so:
- `api-call` includes `/guides/api-pricing-model/`
- `api-call` includes `/saas-pricing/api-pricing-calculator/`
- `api-call` does not include `/guides/api-free-tier-guardrails/`
- `api-call` does not include `/guides/request-pricing-model/`
- `annual-prepay-discount` includes `/guides/annual-prepay-discount/`
- `annual-prepay-discount` includes `/saas-pricing/annual-discount-calculator/`
- `annual-prepay-discount` does not include `/glossary/annual-plan/`

**Step 2: Run the tests to verify failure**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/glossary-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected:
- retained glossary depth fails because `api-call` and the annual discount glossary remain too thin or do not follow the retained structure
- glossary trust data fails because `api-call` lacks retained trust metadata
- retained-link concentration fails because current links still lean on weaker API or annual support pages

**Step 3: Commit**

```bash
git add tests/retained-glossary-depth.test.mjs tests/glossary-trust-data.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "test: lock retained bridge glossary expectations"
```

### Task 4: Strengthen the retained glossary pair

**Files:**
- Modify: `src/content/glossary/api-call.md`
- Modify: `src/content/glossary/annual-prepay-discount.md`

**Step 1: Rewrite `api-call`**

Add retained trust metadata and source blocks, then implement these sections exactly:
- `## Definition`
- `## Why it matters in pricing decisions`
- `## How API calls affect plan design and margin protection`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

Ensure the page:
- defines billable-call boundaries clearly
- explains free-tier, overage, burst, and buyer-estimation trade-offs
- links to retained API pages and calculators instead of weaker guide inventory

**Step 2: Rewrite `annual-prepay-discount` glossary**

Implement these sections exactly:
- `## Definition`
- `## Why it matters in pricing decisions`
- `## How annual prepay changes discount, retention, and cash flow interpretation`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

Ensure the page:
- complements the stronger guide instead of repeating it
- explains effective monthly rate, renewal behavior, and margin guardrails
- removes dependence on weaker `annual-plan` support

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
git add src/content/glossary/api-call.md src/content/glossary/annual-prepay-discount.md
git add tests/retained-glossary-depth.test.mjs tests/glossary-trust-data.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "feat: strengthen retained bridge glossary pages"
```

### Task 5: Verify the batch and record the review outcome

**Files:**
- Create: `docs/plans/2026-04-03-retained-core-strengthening-wave-2-review-log.md`
- Reference: `docs/plans/2026-04-03-retained-core-strengthening-wave-2-design.md`

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
node tests/guide-trust-data.test.mjs
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

Create `docs/plans/2026-04-03-retained-core-strengthening-wave-2-review-log.md` with:
- what this batch changed
- what this batch intentionally did not change
- remaining risks
- next recommended retained-core batch

**Step 3: Review the diff**

Confirm:
- no new URLs were added
- no governance surface was widened
- the four strengthened pages rely more on retained-core neighbors
- no template regression slipped into examples, next-step copy, or glossary support patterns

**Step 4: Commit**

```bash
git add docs/plans/2026-04-03-retained-core-strengthening-wave-2-review-log.md
git commit -m "docs: record retained bridge wave 2 review"
```
