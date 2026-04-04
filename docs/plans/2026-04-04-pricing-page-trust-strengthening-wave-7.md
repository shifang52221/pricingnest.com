# Pricing Page Trust Strengthening Wave 7 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `pricing-page-trust-elements` into a retained-core pricing
page trust guide without changing URLs, layout, or the site's strict-contraction
rules.

**Architecture:** Keep the existing guide template. Add failing retained-core
tests first, then rewrite `src/content/guides/pricing-page-trust-elements.md`
so it matches the stronger retained guide pattern already used by
`value-metric-selection` and `minimum-commitment-model`.

**Tech Stack:** Astro content collections, Markdown guides, Node.js file-based
tests

---

### Task 1: Lock the retained pricing-page trust standard with failing tests

**Files:**
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/guide-trust-data.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Extend retained depth coverage**

Add a `pricing-page-trust-elements` check to
`tests/retained-guide-depth.test.mjs` that requires:

- minimum 500 words
- headings:
  - `## When pricing page trust becomes a pricing problem`
  - `## What buyers need to verify before they trust the page`
  - `## Where pricing pages lose trust`
  - `## Proof, policy clarity, and pricing-page simplicity`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- keywords including at least four of:
  - `billing cycle`
  - `renewal`
  - `cancellation`
  - `annual prepay`
  - `included usage`

**Step 2: Extend trust coverage**

Add `pricing-page-trust-elements` to the `coreGuideSlugs` list in
`tests/guide-trust-data.test.mjs` so the guide must include:

- `sources:`
- `kind: "internal-input"`
- `kind: "supporting-page"`
- `label:`
- `note:`
- `href: "/`

**Step 3: Extend retained link-concentration coverage**

Add assertions to `tests/retained-link-concentration.test.mjs` so
`pricing-page-trust-elements`:

- includes `/guides/value-metric-selection/`
- includes `/guides/annual-prepay-discount/`
- includes `/glossary/billing-cycle/`
- includes `/glossary/annual-prepay-discount/`
- excludes `/guides/pricing-page-comparison-table/`
- excludes `/guides/pricing-tier-design/`
- excludes `/glossary/annual-plan/`
- excludes `/glossary/pricing-page/`

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: FAIL because `pricing-page-trust-elements` is still a short checklist
page without retained-core trust depth.

### Task 2: Rewrite the guide to the retained-core standard

**Files:**
- Modify: `src/content/guides/pricing-page-trust-elements.md`

**Step 1: Tighten frontmatter and trust metadata**

Update the frontmatter to include:

- `updated: "2026-04-04"`
- `author: "PricingNest Editorial Team"`
- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-04-04"`
- stronger `tools:` aligned with the page's decision path
- stronger `glossary:` aligned with retained glossary support
- a `sources:` block with:
  - one `internal-input`
  - at least three `supporting-page` items tied to stronger retained pages or
    tools

**Step 2: Replace the checklist body**

Rewrite the page so it follows the retained guide structure:

- `## When pricing page trust becomes a pricing problem`
- `## What buyers need to verify before they trust the page`
- `## Where pricing pages lose trust`
- `## Proof, policy clarity, and pricing-page simplicity`
- `## How to interpret the calculator outputs`
- `## Next steps`

The page should stay commercial and practical. It should focus on:

- buyer confidence on pricing pages
- billing-cycle and renewal clarity
- cancellation, refund, and policy visibility
- relevant proof near the plans instead of generic badge clutter
- when trust content belongs on the pricing page versus deeper supporting pages

**Step 3: Tighten the support layer**

Keep the guide linked to stronger retained pages, tools, and glossary terms.
Prefer:

- `/saas-pricing/pricing-tier-optimizer/`
- `/saas-pricing/annual-discount-calculator/`
- `/saas-pricing/usage-based-pricing-calculator/`
- `/guides/value-metric-selection/`
- `/guides/annual-prepay-discount/`
- `/glossary/billing-cycle/`
- `/glossary/annual-prepay-discount/`
- `/glossary/included-usage/`

Avoid reviving weaker adjacent support such as:

- `/guides/pricing-page-comparison-table/`
- `/guides/pricing-tier-design/`
- `/glossary/annual-plan/`
- `/glossary/pricing-page/`

### Task 3: Re-run targeted verification and build

**Files:**
- Verify: `tests/retained-guide-depth.test.mjs`
- Verify: `tests/guide-trust-data.test.mjs`
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `npm run build`

**Step 1: Run the targeted verification set**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
node tests/tool-trust-data.test.mjs
npm run build
```

Expected: PASS with a stronger retained pricing-page trust guide and no
regression to the current recovery line.

### Task 4: Review rendered HTML before any merge decision

**Files:**
- Verify: `dist/guides/pricing-page-trust-elements/index.html`

**Step 1: Check the rendered guide output**

Run:

```bash
Select-String -Path dist/guides/pricing-page-trust-elements/index.html -Pattern "Reviewed","Sources and references","value-metric-selection","annual-prepay-discount","pricing-page-comparison-table","annual-plan"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `value-metric-selection` present
- `annual-prepay-discount` present
- `pricing-page-comparison-table` absent
- `annual-plan` absent
