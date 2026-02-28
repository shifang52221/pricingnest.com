# SEO Snippet Boost Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve CTR by updating title/description copy for the 5 highest-impression tool pages.

**Architecture:** Update tool metadata at the source of truth (`src/lib/tools.ts`). Tool pages already read this data for meta tags and hero summaries, so no template changes are required.

**Tech Stack:** Astro, TypeScript, Node.js.

---

### Task 1: Add a metadata regression test

**Files:**
- Create: `tests/seo-meta.test.mjs`

**Step 1: Write the failing test**

```js
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const expected = [
  {
    slug: "storage-cost-calculator",
    title: "Storage Cost Calculator - Price per GB | PricingNest",
    description:
      "Free storage pricing calculator to estimate cost per GB, request fees, and a target-margin price. CSV export."
  },
  {
    slug: "usage-based-pricing-calculator",
    title: "Usage-Based Pricing Calculator - Price per Unit | PricingNest",
    description:
      "Free price-per-unit calculator for usage pricing. Estimate unit price, revenue, and gross profit. CSV export."
  },
  {
    slug: "api-pricing-calculator",
    title: "API Pricing Calculator - Cost per 1,000 Calls | PricingNest",
    description:
      "Free API pricing calculator to set monthly pricing from call volume, cost per 1,000 calls, and margin. CSV export."
  },
  {
    slug: "compute-cost-estimator",
    title: "Compute Cost Estimator - vCPU & Memory Pricing | PricingNest",
    description:
      "Free compute cost estimator for vCPU-hours and GB-hours. Calculate monthly cost and a target-margin price. CSV export."
  },
  {
    slug: "annual-discount-calculator",
    title: "Annual Discount Calculator - Annual Pricing | PricingNest",
    description:
      "Free annual discount calculator to convert monthly price to annual prepay, effective monthly rate, and savings. CSV export."
  }
];

const assertIncludes = (slug, key, value) => {
  if (!text.includes(value)) {
    throw new Error(`${slug}: missing ${key} -> ${value}`);
  }
};

for (const item of expected) {
  assertIncludes(item.slug, "title", item.title);
  assertIncludes(item.slug, "description", item.description);
}

console.log("seo-meta.test.mjs: OK");
```

**Step 2: Run test to verify it fails**

Run: `node tests/seo-meta.test.mjs`  
Expected: FAIL with "missing title/description" errors.

**Step 3: Commit the test**

```bash
git add tests/seo-meta.test.mjs
git commit -m "test: add SEO metadata regression test"
```

---

### Task 2: Update tool titles and descriptions

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Update the 5 tool definitions**

Replace title/description for the following slugs with the expected strings from `tests/seo-meta.test.mjs`:
- `storage-cost-calculator`
- `usage-based-pricing-calculator`
- `api-pricing-calculator`
- `compute-cost-estimator`
- `annual-discount-calculator`

**Step 2: Run the test**

Run: `node tests/seo-meta.test.mjs`  
Expected: PASS ("seo-meta.test.mjs: OK").

**Step 3: Commit**

```bash
git add src/lib/tools.ts
git commit -m "chore: improve tool page titles and descriptions"
```

---

### Task 3: Quick verification

**Step 1: Rebuild locally (optional)**

Run: `npm run build:astro`  
Expected: build succeeds without errors.

**Step 2: Spot-check one tool page**

Open `dist/saas-pricing/storage-cost-calculator/index.html` and confirm:
- `<title>` matches the new title
- `<meta name="description">` matches the new description

**Step 3: Commit build verification (no code changes)**

No commit needed unless changes were made.
