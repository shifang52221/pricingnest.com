# Retained Link Concentration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten internal linking around the retained core so the strongest pages route users and crawlers into a
smaller, more trustworthy decision layer.

**Architecture:** Keep the current Astro template structure and content-governance system. Apply a narrow pass across
guide/glossary templates, hub pages, and curated tool-link metadata. Lock the new behavior with focused regression
tests before touching implementation.

**Tech Stack:** Astro, TypeScript, Markdown content collections, Node.js file-based tests

---

### Task 1: Lock the new link-concentration rules with failing regression tests

**Files:**
- Create: `tests/retained-link-concentration.test.mjs`
- Modify: `tests/tool-priority.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`
- Modify: `tests/hub-curation.test.mjs`

**Step 1: Write the failing regression test for retained-page filtering**

Assert that:

- `src/pages/guides/[slug].astro` imports `getGlossaryRobots`
- `src/pages/guides/[slug].astro` filters related glossary links through `getGlossaryRobots(... ) === "index,follow"`
- `src/pages/glossary/[slug].astro` imports `getGuideRobots`
- `src/pages/glossary/[slug].astro` filters related guides through `getGuideRobots(... ) === "index,follow"`
- `src/pages/glossary/[slug].astro` filters related glossary links through `getGlossaryRobots(... ) === "index,follow"`

**Step 2: Update hub and priority expectations**

Change the existing expectations so they require:

- `annual-discount-calculator` in `SEO_PRIORITY_TOOL_SLUGS`
- `pricing-increase-impact-calculator` removed from the priority set
- homepage and toolkit hub text to point at retained core pages instead of the weaker support examples chosen earlier
- refreshed retained glossary and guide hub clusters

**Step 3: Run the targeted tests to verify failure**

Run:

```bash
node tests/retained-link-concentration.test.mjs
node tests/tool-priority.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/hub-curation.test.mjs
```

Expected: FAIL because the new link concentration rules have not been applied yet.

### Task 2: Stop retained-page sidebars from routing users into `noindex` support pages

**Files:**
- Modify: `src/pages/guides/[slug].astro`
- Modify: `src/pages/glossary/[slug].astro`

**Step 1: Filter guide related glossary links**

Update `src/pages/guides/[slug].astro` so related glossary links only render when the linked glossary slug remains
`index,follow`.

**Step 2: Filter glossary related guides and glossary links**

Update `src/pages/glossary/[slug].astro` so related guide and glossary links only render when the linked page remains
`index,follow`.

**Step 3: Preserve current template structure**

Do not redesign the sidebar. Keep the same reviewed/sources/recommended-next-steps structure and only tighten which
links are allowed through.

### Task 3: Refocus homepage and hub pathways on retained pages

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/saas-pricing/index.astro`
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/glossary/index.astro`

**Step 1: Tighten homepage pathways**

Replace weaker support-page recommendations with stronger retained guide and glossary destinations that match the core
pricing decisions already promoted on the homepage.

**Step 2: Tighten toolkit hub pathways**

Align the toolkit hub sidebar and five workflow blocks with the retained decision layer and the actual five priority
calculators.

**Step 3: Refresh guide and glossary hubs**

Keep the same curated-hub structure, but update the chosen clusters so the retained guides and retained glossary terms
appear earlier and more consistently.

### Task 4: Correct priority-tool data and curated calculator follow-up links

**Files:**
- Modify: `src/lib/tools.ts`
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Correct the priority set**

Update `SEO_PRIORITY_TOOL_SLUGS` so it includes:

- `storage-cost-calculator`
- `compute-cost-estimator`
- `api-pricing-calculator`
- `usage-based-pricing-calculator`
- `annual-discount-calculator`

**Step 2: Tighten curated cluster links**

Refresh `CORE_TOOL_CLUSTER_LINKS` so the core calculators route users into a smaller, deliberate mix of retained guides
and glossary pages. Keep each set compact and unique.

**Step 3: Keep tool-page recommendations safe**

Ensure the tool-page recommendation output still dedupes links and only surfaces indexable internal guide/glossary
resources.

### Task 5: Re-run targeted verification and full build

**Files:**
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/tool-priority.test.mjs`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/sitemap-governance.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `npm run build`

**Step 1: Run the targeted verification set**

Run:

```bash
node tests/retained-link-concentration.test.mjs
node tests/tool-priority.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/site-quality-signals.test.mjs
npm run build
```

Expected: PASS with tighter retained-page navigation, updated hub curation, and a successful production build.

### Task 6: Verify the live output after deploy

**Files:**
- Verify: production HTML for the homepage, toolkit hub, and one retained guide/glossary pair

**Step 1: Re-check live HTML**

Run:

```bash
curl.exe -L https://pricingnest.com/ | Select-String -Pattern 'pricing-page-layout-checklist|value-metric-selection|pricing-page-trust-elements'
curl.exe -L https://pricingnest.com/saas-pricing/ | Select-String -Pattern 'annual-discount-calculator|pricing-increase-impact-calculator|value-metric-selection|saas-gross-margin-targets'
curl.exe -L https://pricingnest.com/guides/value-metric-selection/ | Select-String -Pattern 'usage-based-pricing|pricing-page-faqs'
curl.exe -L https://pricingnest.com/glossary/annual-prepay-discount/ | Select-String -Pattern 'discount-guardrails|run-rate|tcv'
```

Expected:

- homepage and toolkit hub show the updated retained-core pathways
- the priority-tool set reflects annual discount rather than pricing increase
- retained guide/glossary pages no longer surface the newly noindexed support pages in their sidebar blocks
