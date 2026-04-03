# Bandwidth Guide Strengthening Wave 4 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `bandwidth-pricing-guide` into a retained-core decision
page without changing URLs, calculator logic, or overall layout.

**Architecture:** Keep the existing guide template. Add failing retained-guide
tests first, then rewrite `src/content/guides/bandwidth-pricing-guide.md` to
match the retained-core depth, trust, and link-concentration standard already
used by the stronger indexed guides.

**Tech Stack:** Astro content collections, Markdown guides, Node.js file-based
tests

---

### Task 1: Lock the retained bandwidth guide standard with failing tests

**Files:**
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/guide-trust-data.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Extend retained depth coverage**

Add a `bandwidth-pricing-guide` check to `tests/retained-guide-depth.test.mjs`
that requires:

- minimum 500 words
- headings:
  - `## When bandwidth pricing deserves its own model`
  - `## Inputs to confirm before you publish a rate`
  - `## Where bandwidth teams underprice`
  - `## Pricing options and trade-offs`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- keywords including at least four of:
  - `egress`
  - `cdn`
  - `gross margin`
  - `regional mix`
  - `pass-through`

**Step 2: Extend trust coverage**

Add `bandwidth-pricing-guide` to the `coreGuideSlugs` list in
`tests/guide-trust-data.test.mjs` so the guide must include:

- `sources:`
- `kind: "internal-input"`
- `kind: "supporting-page"`
- `label:`
- `note:`
- `href: "/`

**Step 3: Extend retained link-concentration coverage**

Add assertions to `tests/retained-link-concentration.test.mjs` so
`bandwidth-pricing-guide`:

- includes `/guides/bandwidth-pricing-guardrails/`
- includes `/guides/cdn-cost-pass-through/`
- includes `/glossary/egress/`
- excludes `/glossary/cogs/`

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: FAIL because `bandwidth-pricing-guide` is still a short checklist page
without retained-core trust data.

### Task 2: Rewrite the bandwidth guide to the retained-core standard

**Files:**
- Modify: `src/content/guides/bandwidth-pricing-guide.md`

**Step 1: Add retained trust metadata**

Update the frontmatter to include:

- `updated: "2026-04-03"`
- `author: "PricingNest Editorial Team"`
- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-04-03"`
- a `sources:` block with:
  - one `internal-input`
  - at least three `supporting-page` items tied to the retained bandwidth
    cluster

**Step 2: Replace the checklist body**

Rewrite the page so it follows the retained guide structure:

- `## When bandwidth pricing deserves its own model`
- `## Inputs to confirm before you publish a rate`
- `## Where bandwidth teams underprice`
- `## Pricing options and trade-offs`
- `## How to interpret the calculator outputs`
- `## Next steps`

The page should stay commercial and practical, not glossary-like. It should
focus on:

- egress and CDN cost exposure
- regional traffic mix
- pass-through vs blended pricing
- gross margin protection
- when a base fee or minimum commitment is needed

**Step 3: Tighten the support layer**

Keep the guide linked to retained bandwidth pages and stronger glossary terms.
Prefer:

- `/guides/bandwidth-pricing-guardrails/`
- `/guides/cdn-cost-pass-through/`
- `/saas-pricing/bandwidth-cost-calculator/`
- `/saas-pricing/usage-based-pricing-calculator/`
- `/glossary/egress/`
- `/glossary/gross-margin/`

Avoid reviving weaker glossary support such as `/glossary/cogs/`.

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

Expected: PASS with a stronger retained bandwidth guide and no regression to the
current recovery line.

### Task 4: Review generated HTML before any merge decision

**Files:**
- Verify: `dist/guides/bandwidth-pricing-guide/index.html`

**Step 1: Check the rendered guide output**

Run:

```bash
Select-String -Path dist/guides/bandwidth-pricing-guide/index.html -Pattern "Reviewed","Sources and references","bandwidth-pricing-guardrails","cdn-cost-pass-through","glossary/cogs"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `bandwidth-pricing-guardrails` present
- `cdn-cost-pass-through` present
- `glossary/cogs` absent
