# Tool Meta Separation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Separate display copy from SEO copy for the five highest-priority tool pages without breaking the rest of the toolkit.

**Architecture:** Extend the tool-definition model with user-facing and SEO-facing fields, then update the tool page and card rendering to consume the correct fields with safe fallbacks for existing tools. Regression coverage must validate both source metadata and template wiring.

**Tech Stack:** Astro, TypeScript, Node.js, Playwright

---

### Task 1: Add source metadata regression coverage

**Files:**
- Modify: `tests/seo-meta.test.mjs`

**Step 1: Rewrite the expected metadata set for the 5 target tools**

Replace the current expectations so each target tool asserts:

- `name`
- `metaTitle`
- `metaDescription`

Expected values:

```js
const expected = [
  {
    slug: "usage-based-pricing-calculator",
    name: "Usage-Based Pricing Calculator",
    metaTitle: "Usage-Based Pricing Calculator - Price per Unit | PricingNest",
    metaDescription:
      "Free usage-based pricing calculator to estimate a price per unit from monthly usage, unit cost, fixed cost, and target gross margin."
  },
  {
    slug: "annual-discount-calculator",
    name: "Annual Discount Calculator",
    metaTitle: "Annual Discount Calculator - Annual Pricing | PricingNest",
    metaDescription:
      "Free annual discount calculator to convert a monthly price into annual pricing, annual prepay savings, and effective monthly rate."
  },
  {
    slug: "storage-cost-calculator",
    name: "Storage Cost Calculator",
    metaTitle: "Storage Cost Calculator - Price per GB | PricingNest",
    metaDescription:
      "Free storage cost calculator to estimate price per GB-month, request fees, and a target-margin monthly storage price."
  },
  {
    slug: "api-pricing-calculator",
    name: "API Pricing Calculator",
    metaTitle: "API Pricing Calculator - Cost per 1,000 Calls | PricingNest",
    metaDescription:
      "Free API pricing calculator to estimate cost per 1,000 calls, monthly API cost, and a margin-safe monthly price."
  },
  {
    slug: "compute-cost-estimator",
    name: "Compute Cost Estimator",
    metaTitle: "Compute Cost Estimator - vCPU & Memory Pricing | PricingNest",
    metaDescription:
      "Free compute cost estimator to model vCPU-hour and GB-hour costs and turn them into a margin-safe monthly price."
  }
];
```

**Step 2: Keep the test simple**

Use string inclusion checks against `src/lib/tools.ts`, consistent with the current test style.

**Step 3: Run the test to verify it fails**

Run: `node tests/seo-meta.test.mjs`

Expected: FAIL with missing `name`, `metaTitle`, or `metaDescription` strings.

**Step 4: Commit the failing-test change**

```bash
git add tests/seo-meta.test.mjs
git commit -m "test: cover tool display and meta copy fields"
```

### Task 2: Add template wiring regression coverage

**Files:**
- Create: `tests/tool-meta-separation.test.mjs`

**Step 1: Write a new regression test**

The test should read:

- `src/pages/saas-pricing/[slug].astro`
- `src/components/ToolCard.astro`

It should assert that:

- the tool page uses `tool.metaTitle` when building the layout title
- the tool page uses `tool.metaDescription` when building the layout description
- the H1 uses `tool.name`
- the hero paragraph uses `tool.description`
- the card component uses `tool.name` and `tool.description`

**Step 2: Run the new test to verify it fails**

Run: `node tests/tool-meta-separation.test.mjs`

Expected: FAIL because the current templates still use `tool.title`.

**Step 3: Commit the failing-test change**

```bash
git add tests/tool-meta-separation.test.mjs
git commit -m "test: add tool meta separation template regression"
```

### Task 3: Extend the tool model with fallback accessors

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Update `ToolDefinition`**

Add optional fields:

```ts
name?: string;
metaTitle?: string;
metaDescription?: string;
```

Keep legacy `title` and `description` so the rest of the toolkit remains compatible during rollout.

**Step 2: Add helper accessors**

At the bottom of the module, add small helpers:

```ts
export function getToolName(tool: ToolDefinition): string {
  return tool.name ?? tool.title;
}

export function getToolMetaTitle(tool: ToolDefinition): string {
  return tool.metaTitle ?? tool.title;
}

export function getToolMetaDescription(tool: ToolDefinition): string {
  return tool.metaDescription ?? tool.description;
}
```

Keep them pure and simple.

**Step 3: Update the 5 target tool records**

Add the agreed fields and copy:

- `usage-based-pricing-calculator`
- `annual-discount-calculator`
- `storage-cost-calculator`
- `api-pricing-calculator`
- `compute-cost-estimator`

Do not update non-target tools in this pass.

**Step 4: Run metadata regression**

Run: `node tests/seo-meta.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/tools.ts tests/seo-meta.test.mjs
git commit -m "feat: add separate display and meta copy for priority tools"
```

### Task 4: Update tool page rendering to use the new fields

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Import helper accessors from `src/lib/tools.ts`**

Use:

```ts
getToolName,
getToolMetaTitle,
getToolMetaDescription
```

**Step 2: Derive display and SEO values once**

Add local variables:

```ts
const toolName = getToolName(tool);
const toolMetaTitle = getToolMetaTitle(tool);
const toolMetaDescription = getToolMetaDescription(tool);
```

Build the final `<title>` from `toolMetaTitle`, preserving the existing suffix logic only if needed.

**Step 3: Replace page-body references**

Use:

- `toolName` for H1
- `toolName` for breadcrumb display
- `toolName` for related-tool titles
- `tool.description` for hero paragraph

Use:

- `toolMetaTitle` for layout title
- `toolMetaDescription` for layout description

**Step 4: Replace schema name/description sources**

Use:

- `toolName` for `WebPage.name`
- `toolName` for `SoftwareApplication.name`
- `toolMetaDescription` or `tool.description` only where it improves snippet consistency

Keep the schema shape unchanged.

**Step 5: Run template regression**

Run: `node tests/tool-meta-separation.test.mjs`

Expected: PASS

**Step 6: Commit**

```bash
git add src/pages/saas-pricing/[slug].astro tests/tool-meta-separation.test.mjs
git commit -m "refactor: separate tool page display copy from meta copy"
```

### Task 5: Update cards to use display copy

**Files:**
- Modify: `src/components/ToolCard.astro`

**Step 1: Import the display-name helper**

Use `getToolName`.

**Step 2: Render cards with display copy**

Use:

- heading: `getToolName(tool)`
- summary: `tool.description`

Do not use `metaTitle` or `metaDescription` in cards.

**Step 3: Re-run template regression**

Run: `node tests/tool-meta-separation.test.mjs`

Expected: PASS

**Step 4: Commit**

```bash
git add src/components/ToolCard.astro
git commit -m "refactor: use display copy in tool cards"
```

### Task 6: Verify build and key runtime behavior

**Files:**
- No code changes expected

**Step 1: Run all Node metadata tests**

Run:

```bash
node tests/seo-meta.test.mjs
node tests/tool-meta-separation.test.mjs
node tests/toolkit-meta.test.mjs
node tests/usage-based-content.test.mjs
```

Expected: PASS

**Step 2: Run build**

Run:

```bash
npm run build
```

Expected: build succeeds without template or content errors

**Step 3: Spot-check generated output**

Open:

- `dist/saas-pricing/usage-based-pricing-calculator/index.html`
- `dist/saas-pricing/annual-discount-calculator/index.html`

Confirm:

- `<title>` uses `metaTitle`
- `<meta name="description">` uses `metaDescription`
- visible H1 uses `name`
- hero paragraph uses `description`

**Step 4: Optional browser check**

Run:

```bash
npx playwright test tests/e2e/calculators.spec.ts --reporter=line
```

If this times out again in the current environment, record that explicitly instead of blocking release.

**Step 5: Commit verification-only changes if needed**

No commit required unless a verification fix is needed.
