# Low-Quality Risk Reduction Phase 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce the risk that Google interprets PricingNest as a low-quality or scaled-template site by strengthening the five highest-opportunity tool pages, curating weak index pages, and introducing a repeatable thin-content governance rule.

**Architecture:** Keep the current site architecture, but shift the quality bar upward in three places: the top tool definitions in `src/lib/tools.ts`, the guides/glossary hubs that currently expose too many weak pages, and a new indexing-governance layer that can mark low-value content as `noindex,follow` without deleting it. Back the policy with tests so the site cannot quietly drift back into thin-content sprawl.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests, Astro content collections

---

### Task 1: Add a thin-content governance layer

**Files:**
- Create: `src/lib/content-governance.ts`
- Modify: `src/pages/guides/[slug].astro`
- Modify: `src/pages/glossary/[slug].astro`
- Test: `tests/content-governance.test.mjs`

**Step 1: Write the failing test**

Add `tests/content-governance.test.mjs` asserting that:
- `src/lib/content-governance.ts` exports guide and glossary governance maps
- the maps can return `index,follow` or `noindex,follow`
- `src/pages/guides/[slug].astro` reads the governance rule and passes `robots={...}` to `BaseLayout`
- `src/pages/glossary/[slug].astro` reads the governance rule and passes `robots={...}` to `BaseLayout`

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/content-governance.test.mjs
```

Expected: FAIL because the governance module and robots wiring do not exist yet.

**Step 3: Write minimal implementation**

Create `src/lib/content-governance.ts` with an explicit allowlist / review queue shape like:

```ts
export const GUIDE_GOVERNANCE: Record<string, "index,follow" | "noindex,follow"> = {};
export const GLOSSARY_GOVERNANCE: Record<string, "index,follow" | "noindex,follow"> = {};

export function getGuideRobots(slug: string): string {
  return GUIDE_GOVERNANCE[slug] ?? "index,follow";
}

export function getGlossaryRobots(slug: string): string {
  return GLOSSARY_GOVERNANCE[slug] ?? "index,follow";
}
```

Wire `src/pages/guides/[slug].astro` and `src/pages/glossary/[slug].astro` to use these helpers:

```astro
<BaseLayout title={title} description={entry.data.description} robots={robots}>
```

**Step 4: Run test to verify it passes**

Run:

```bash
node tests/content-governance.test.mjs
```

Expected: PASS

**Step 5: Commit**

```bash
git add tests/content-governance.test.mjs src/lib/content-governance.ts src/pages/guides/[slug].astro src/pages/glossary/[slug].astro
git commit -m "feat: add content governance layer"
```

### Task 2: Deepen the five core tool pages instead of adding more pages

**Files:**
- Modify: `src/lib/tools.ts:80-320`
- Modify: `src/lib/tools.ts:323-520`
- Modify: `src/lib/tools.ts:1677-1764`
- Modify: `src/lib/tools.ts:2054-2182`
- Modify: `src/lib/tools.ts:2717-2848`
- Test: `tests/core-tool-depth.test.mjs`

**Step 1: Write the failing test**

Add `tests/core-tool-depth.test.mjs` asserting that the following five tool slugs each include:
- at least 5 `inputGuidance` items
- at least 4 `validationChecks`
- at least 4 `commonMistakes`
- at least 4 `interpretation` items
- at least 3 `faq` entries
- at least 2 `walkthroughs` or 2 `scenarios`

Target slugs:
- `usage-based-pricing-calculator`
- `compute-cost-estimator`
- `annual-discount-calculator`
- `api-pricing-calculator`
- `storage-cost-calculator`

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/core-tool-depth.test.mjs
```

Expected: FAIL for at least the annual discount calculator and any other tool that does not yet meet the new depth floor.

**Step 3: Write minimal implementation**

Expand only the five core tool entries in `src/lib/tools.ts`:
- add richer scenarios tied to real buyer decisions
- add stronger validation checks and misuse warnings
- add FAQs that answer user intent from Search Console queries
- add more explicit interpretation and next-step guidance

Keep changes inside the existing tool objects. Do not refactor the tool system.

**Step 4: Run test to verify it passes**

Run:

```bash
node tests/core-tool-depth.test.mjs
node tests/usage-based-content.test.mjs
node tests/seo-meta.test.mjs
```

Expected: PASS

**Step 5: Commit**

```bash
git add tests/core-tool-depth.test.mjs src/lib/tools.ts
git commit -m "feat: deepen core pricing calculators"
```

### Task 3: Curate the guides and glossary hub pages

**Files:**
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/glossary/index.astro`
- Test: `tests/hub-curation.test.mjs`

**Step 1: Write the failing test**

Add `tests/hub-curation.test.mjs` asserting that:
- guides index no longer renders every guide in a flat dump
- glossary index no longer renders every term in a flat dump
- both hubs include a featured or curated section
- both hubs include a quality-oriented explanation of what users should use first

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/hub-curation.test.mjs
```

Expected: FAIL because both hubs still render every entry directly.

**Step 3: Write minimal implementation**

Change both hub pages to:
- feature a limited number of high-value entries first
- group items by intent or theme instead of one long alphabetical wall
- keep a browse-all section only if it is clearly secondary

Recommended structure for `src/pages/guides/index.astro`:
- Featured decision guides
- Pricing page and packaging guides
- Unit economics and cost recovery guides

Recommended structure for `src/pages/glossary/index.astro`:
- Start with key terms
- Pricing mechanics
- Unit economics and retention metrics

**Step 4: Run test to verify it passes**

Run:

```bash
node tests/hub-curation.test.mjs
```

Expected: PASS

**Step 5: Commit**

```bash
git add tests/hub-curation.test.mjs src/pages/guides/index.astro src/pages/glossary/index.astro
git commit -m "feat: curate guides and glossary hubs"
```

### Task 4: Build the first noindex review batch for weak support pages

**Files:**
- Modify: `src/lib/content-governance.ts`
- Review: `src/content/guides/*.md`
- Review: `src/content/glossary/*.md`
- Test: `tests/content-governance.test.mjs`

**Step 1: Write the review list**

Review content files against this rule:
- keep `index,follow` only if the page has unique explanatory value, clear intent, and useful internal linkage
- mark `noindex,follow` if the page is too short, repetitive, or only restates what a stronger page already explains

Start with the weakest support pages first instead of touching the five core tools.

**Step 2: Update the governance map**

Add the first batch of weak slugs to the governance map, for example:

```ts
export const GUIDE_GOVERNANCE = {
  "rate-card-quoting": "noindex,follow",
  "regional-pricing-floor": "noindex,follow"
} as const;
```

Do the same for clearly weak glossary pages if they do not stand on their own.

**Step 3: Run test to verify it passes**

Run:

```bash
node tests/content-governance.test.mjs
npm run build:astro
```

Expected: PASS and successful build.

**Step 4: Commit**

```bash
git add src/lib/content-governance.ts
git commit -m "chore: noindex weak support pages"
```

### Task 5: Re-verify the trust baseline after the phase-2 changes

**Files:**
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `tests/editorial-metadata.test.mjs`
- Verify: `tests/internal-linking.test.mjs`
- Verify: `tests/guide-anchor-intent.test.mjs`
- Verify: `tests/tool-meta-separation.test.mjs`
- Verify: `tests/usage-based-content.test.mjs`

**Step 1: Run targeted tests**

Run:

```bash
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/editorial-metadata.test.mjs
node tests/content-governance.test.mjs
node tests/core-tool-depth.test.mjs
node tests/hub-curation.test.mjs
node tests/internal-linking.test.mjs
node tests/guide-anchor-intent.test.mjs
node tests/tool-meta-separation.test.mjs
node tests/usage-based-content.test.mjs
```

Expected: PASS

**Step 2: Run build verification**

Run:

```bash
npm run build:astro
```

Expected: production build succeeds

**Step 3: Commit**

```bash
git add tests src/pages/guides/index.astro src/pages/glossary/index.astro src/pages/guides/[slug].astro src/pages/glossary/[slug].astro src/lib/content-governance.ts src/lib/tools.ts
git commit -m "feat: reduce low-quality indexing risk"
```
