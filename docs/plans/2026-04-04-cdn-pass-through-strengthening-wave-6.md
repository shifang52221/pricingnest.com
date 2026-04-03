# CDN Pass-Through Strengthening Wave 6 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `cdn-cost-pass-through` into a reviewed, exception-first
bandwidth support page without changing layout, URLs, or calculator behavior.

**Architecture:** Keep the existing guide template. Add failing tests first,
then rewrite `src/content/guides/cdn-cost-pass-through.md` so it aligns with the
bandwidth support line now established by `bandwidth-pricing-guide` and
`bandwidth-pricing-guardrails`.

**Tech Stack:** Astro content collections, Markdown guides, Node.js file-based
tests

---

### Task 1: Lock the CDN pass-through standard with failing tests

**Files:**
- Modify: `tests/decision-guide-depth.test.mjs`
- Modify: `tests/guide-trust-data.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Extend guide-depth coverage**

Add a `cdn-cost-pass-through` check to `tests/decision-guide-depth.test.mjs`
that requires:

- headings:
  - `## When CDN pass-through is justified`
  - `## What to confirm before you pass costs through`
  - `## When pass-through hurts trust and conversion`
  - `## Pass-through vs blended pricing vs enterprise custom terms`
  - `## How to interpret the calculator outputs`
  - `## Next steps`
- keywords including at least three of:
  - `pass-through`
  - `regional mix`
  - `cache hit rate`
  - `conversion`

**Step 2: Extend trust coverage**

Add `cdn-cost-pass-through` to the `coreGuideSlugs` list in
`tests/guide-trust-data.test.mjs` so the page must include:

- `sources:`
- `kind: "internal-input"`
- `kind: "supporting-page"`
- `label:`
- `note:`
- `href: "/`

**Step 3: Extend link-concentration coverage**

Add assertions to `tests/retained-link-concentration.test.mjs` so
`cdn-cost-pass-through`:

- includes `/guides/bandwidth-pricing-guide/`
- includes `/guides/bandwidth-pricing-guardrails/`
- includes `/saas-pricing/bandwidth-cost-calculator/`
- includes `/glossary/origin-fetch/`
- excludes `/glossary/cogs/`

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/decision-guide-depth.test.mjs
node tests/guide-trust-data.test.mjs
node tests/retained-link-concentration.test.mjs
```

Expected: FAIL because `cdn-cost-pass-through` is still a short checklist page
without retained trust data.

### Task 2: Rewrite the page with an exception-first stance

**Files:**
- Modify: `src/content/guides/cdn-cost-pass-through.md`

**Step 1: Add trust metadata**

Update the frontmatter to include:

- `updated: "2026-04-04"`
- `author: "PricingNest Editorial Team"`
- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-04-04"`
- `sources:` with:
  - one `internal-input`
  - at least three `supporting-page` items tied to the bandwidth cluster

**Step 2: Replace the checklist body**

Rewrite the page so it follows this structure:

- `## When CDN pass-through is justified`
- `## What to confirm before you pass costs through`
- `## When pass-through hurts trust and conversion`
- `## Pass-through vs blended pricing vs enterprise custom terms`
- `## How to interpret the calculator outputs`
- `## Next steps`

The page should communicate a clear default:

- prefer simpler public pricing first
- use pass-through only when cost volatility or traffic concentration makes
  simple pricing dishonest
- favor enterprise exceptions over cluttering the self-serve page with too many
  special rules

**Step 3: Tighten the support links**

Prefer links to:

- `/guides/bandwidth-pricing-guide/`
- `/guides/bandwidth-pricing-guardrails/`
- `/saas-pricing/bandwidth-cost-calculator/`
- `/saas-pricing/usage-based-pricing-calculator/`
- `/glossary/origin-fetch/`
- `/glossary/egress/`

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

Expected: PASS with a stronger reviewed CDN pass-through page and no regression
to the current quality baseline.

### Task 4: Review generated HTML before any merge decision

**Files:**
- Verify: `dist/guides/cdn-cost-pass-through/index.html`

**Step 1: Check the rendered guide output**

Run:

```bash
Select-String -Path dist/guides/cdn-cost-pass-through/index.html -Pattern "Reviewed","Sources and references","bandwidth-pricing-guide","bandwidth-pricing-guardrails","origin-fetch","glossary/cogs"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `bandwidth-pricing-guide` present
- `bandwidth-pricing-guardrails` present
- `origin-fetch` present
- `glossary/cogs` absent
