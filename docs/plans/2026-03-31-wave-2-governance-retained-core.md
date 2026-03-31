# Wave 2 Governance And Retained Core Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce remaining low-quality risk by shrinking indexable support pages, cleaning up off-intent metadata, and
strengthening the next retained guide/glossary layer around the core calculator clusters.

**Architecture:** Keep the current Astro architecture and content-governance system. Apply a focused second noindex wave
through `src/lib/content-governance-data.mjs`, tighten search intent in `src/lib/tools.ts`, and deepen editorial trust
signals directly in selected Markdown content files.

**Tech Stack:** Astro, TypeScript, Markdown content collections, Node.js file-based tests

---

### Task 1: Lock the wave-2 scope with a failing regression test

**Files:**
- Create: `tests/wave-two-governance.test.mjs`

**Step 1: Write the failing test**

Assert that:

- `usage-based-pricing-calculator` metadata no longer contains `Delta CSV Template`
- the Wave 2 guide candidates return `noindex,follow`
- the Wave 2 glossary candidates return `noindex,follow`
- the retained guide candidates still return `index,follow`
- the retained glossary candidates still return `index,follow`

Wave 2 guide candidates:

- `pricing-page-cta-optimization`
- `pricing-page-faqs`
- `pricing-page-unit-definition`
- `price-change-communication`
- `contract-minimums-messaging`
- `usage-reporting-dashboard`
- `usage-estimation-guide`
- `trial-usage-limit-design`
- `tier-naming-strategy`
- `plan-differentiation-matrix`

Wave 2 glossary candidates:

- `request`
- `renewal`
- `run-rate`
- `tcv`
- `pricing-page`
- `upsell`

Retained guide candidates:

- `value-metric-selection`
- `minimum-commitment-model`
- `saas-gross-margin-targets`
- `price-per-gb-month-explained`
- `pricing-page-trust-elements`

Retained glossary candidates:

- `rate-limit`
- `annual-prepay-discount`
- `usage-based-pricing`
- `churn`

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/wave-two-governance.test.mjs
```

Expected: FAIL because the new governance wave and metadata cleanup have not been applied yet.

### Task 2: Apply the search-intent cleanup and second governance wave

**Files:**
- Modify: `src/lib/tools.ts`
- Modify: `src/lib/content-governance-data.mjs`

**Step 1: Remove off-intent metadata wording**

Update the `usage-based-pricing-calculator` block so its `metaTitle`, `metaDescription`, and related copy focus on
pricing and unit economics, not `Delta CSV Template`.

**Step 2: Add the Wave 2 noindex candidates**

Extend:

- `GUIDE_GOVERNANCE`
- `GLOSSARY_GOVERNANCE`

with the exact candidate slugs from Task 1.

**Step 3: Keep the retained core indexable**

Do not add the retained guide/glossary candidates to the new noindex wave.

### Task 3: Strengthen the next retained guide layer

**Files:**
- Modify: `src/content/guides/value-metric-selection.md`
- Modify: `src/content/guides/minimum-commitment-model.md`
- Modify: `src/content/guides/saas-gross-margin-targets.md`
- Modify: `src/content/guides/price-per-gb-month-explained.md`
- Modify: `src/content/guides/pricing-page-trust-elements.md`

**Step 1: Add review metadata**

Add:

- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-03-31"`

**Step 2: Add sources arrays**

Add compact `sources` arrays with:

- one internal-input source
- two or more supporting pages tightly connected to the actual pricing decision

**Step 3: Keep the pages specific**

Do not expand these pages into broad essays. Keep them decision-oriented, evidence-backed, and tied to related tools or
glossary terms already in the site.

### Task 4: Strengthen the supporting retained glossary layer

**Files:**
- Modify: `src/content/glossary/rate-limit.md`
- Modify: `src/content/glossary/annual-prepay-discount.md`
- Modify: `src/content/glossary/usage-based-pricing.md`
- Modify: `src/content/glossary/churn.md`

**Step 1: Add review metadata**

Add:

- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-03-31"`

**Step 2: Add sources arrays**

Add glossary `sources` that connect each term back to:

- a specific internal pricing input or review process
- one retained guide
- one calculator or adjacent glossary page when useful

### Task 5: Re-run governance, trust, and build verification

**Files:**
- Verify: `tests/wave-two-governance.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/sitemap-governance.test.mjs`
- Verify: `tests/guide-trust-data.test.mjs`
- Verify: `tests/glossary-trust-data.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `npm run build`

**Step 1: Run the targeted verification set**

Run:

```bash
node tests/wave-two-governance.test.mjs
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/guide-trust-data.test.mjs
node tests/glossary-trust-data.test.mjs
node tests/tool-trust-data.test.mjs
node tests/site-quality-signals.test.mjs
npm run build
```

Expected: PASS and successful production build.

### Task 6: Verify the live output after deploy

**Files:**
- Verify: production HTML for the updated pages

**Step 1: Re-check live HTML**

Run:

```bash
curl.exe -L https://pricingnest.com/saas-pricing/usage-based-pricing-calculator/ | Select-String -Pattern 'Delta CSV Template|Price Per Unit Calculator'
curl.exe -L https://pricingnest.com/guides/value-metric-selection/ | Select-String -Pattern 'Reviewed by|Sources and references'
curl.exe -L https://pricingnest.com/glossary/usage-based-pricing/ | Select-String -Pattern 'Reviewed by|Sources and references'
curl.exe -L https://pricingnest.com/sitemap-0.xml | Select-String -Pattern 'pricing-page-faqs|trial-usage-limit-design|run-rate|upsell'
```

Expected:

- the tool page no longer surfaces the off-intent metadata wording in the returned HTML
- retained guide/glossary pages show review and source modules
- newly noindexed pages do not appear in the sitemap
