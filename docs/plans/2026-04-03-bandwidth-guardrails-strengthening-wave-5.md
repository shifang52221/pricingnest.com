# Bandwidth Guardrails Strengthening Wave 5 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `bandwidth-pricing-guardrails` into a reviewed,
decision-oriented bandwidth support page without changing URLs, layout, or
calculator logic.

**Architecture:** Keep the existing guide template. Add failing tests first,
then rewrite `src/content/guides/bandwidth-pricing-guardrails.md` so it matches
the retained support standard already used by stronger guide pages in the
bandwidth cluster.

**Tech Stack:** Astro content collections, Markdown guides, Node.js file-based
tests

---

### Task 1: Lock the bandwidth guardrails standard with failing tests

**Files:**
- Modify: `tests/decision-guide-depth.test.mjs`
- Modify: `tests/guide-trust-data.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Extend guide-depth coverage**

Add a `bandwidth-pricing-guardrails` check to
`tests/decision-guide-depth.test.mjs` that requires:

- headings:
  - `## When bandwidth guardrails are necessary`
  - `## What to confirm before setting the guardrails`
  - `## Where bandwidth guardrails fail`
  - `## Guardrail options and trade-offs`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- keywords including at least three of:
  - `burst traffic`
  - `egress`
  - `gross margin`
  - `included usage`

**Step 2: Extend trust coverage**

Add `bandwidth-pricing-guardrails` to the `coreGuideSlugs` list in
`tests/guide-trust-data.test.mjs` so the page must include:

- `sources:`
- `kind: "internal-input"`
- `kind: "supporting-page"`
- `label:`
- `note:`
- `href: "/`

**Step 3: Extend link-concentration coverage**

Add assertions to `tests/retained-link-concentration.test.mjs` so
`bandwidth-pricing-guardrails`:

- includes `/guides/bandwidth-pricing-guide/`
- includes `/guides/cdn-cost-pass-through/`
- includes `/saas-pricing/bandwidth-cost-calculator/`
- excludes `/glossary/cogs/`

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/decision-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: FAIL because `bandwidth-pricing-guardrails` is still a checklist page
without retained support trust data.

### Task 2: Rewrite the guardrails page

**Files:**
- Modify: `src/content/guides/bandwidth-pricing-guardrails.md`

**Step 1: Add trust metadata**

Update the frontmatter to include:

- `updated: "2026-04-03"`
- `author: "PricingNest Editorial Team"`
- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-04-03"`
- `sources:` with:
  - one `internal-input`
  - at least three `supporting-page` items tied to the bandwidth cluster

**Step 2: Replace the checklist body**

Rewrite the page so it uses this structure:

- `## When bandwidth guardrails are necessary`
- `## What to confirm before setting the guardrails`
- `## Where bandwidth guardrails fail`
- `## Guardrail options and trade-offs`
- `## How to interpret the calculator outputs`
- `## Next steps`

The page should focus on:

- burst traffic and heavy-customer risk
- included usage and overage discipline
- gross margin protection
- regional mix and CDN exposure
- when enterprise exceptions are healthier than a messy self-serve page

**Step 3: Tighten the support links**

Prefer links to:

- `/guides/bandwidth-pricing-guide/`
- `/guides/cdn-cost-pass-through/`
- `/saas-pricing/bandwidth-cost-calculator/`
- `/saas-pricing/usage-based-pricing-calculator/`
- `/glossary/egress/`
- `/glossary/rate-limit/`

Do not revive weaker glossary support such as `/glossary/cogs/`.

### Task 3: Re-run targeted verification and build

**Files:**
- Verify: `tests/decision-guide-depth.test.mjs`
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
node tests/decision-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
node tests/tool-trust-data.test.mjs
npm run build
```

Expected: PASS with a stronger reviewed guardrails page and no regression to the
current quality baseline.

### Task 4: Review generated HTML before any merge decision

**Files:**
- Verify: `dist/guides/bandwidth-pricing-guardrails/index.html`

**Step 1: Check the rendered guide output**

Run:

```bash
Select-String -Path dist/guides/bandwidth-pricing-guardrails/index.html -Pattern "Reviewed","Sources and references","bandwidth-pricing-guide","cdn-cost-pass-through","glossary/cogs"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `bandwidth-pricing-guide` present
- `cdn-cost-pass-through` present
- `glossary/cogs` absent
