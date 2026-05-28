# Core Intent Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework the identity and handoff of the retained usage, annual discount, and storage pages so they behave more like distinct search answers without adding any new pages.

**Architecture:** The implementation keeps the current URL set and page system, but sharpens role-specific copy in the tool registry, tool template, and selected retained guides. The batch is intentionally narrow: protect it with focused tests, update the core copy and linking logic, then run build and trust/metadata verification to confirm the retained-path strategy still holds.

**Tech Stack:** Astro, TypeScript, Markdown content collections, existing Node-based verification scripts

---

### Task 1: Add regression coverage for page-role identity

**Files:**
- Create: `tests/core-intent-refresh.test.mjs`
- Reference: `src/lib/tools.ts`
- Reference: `src/pages/saas-pricing/[slug].astro`
- Reference: `src/content/guides/usage-based-pricing-examples.md`
- Reference: `src/content/guides/annual-prepay-discount.md`
- Reference: `src/content/guides/storage-costs-and-pricing.md`
- Reference: `src/content/guides/price-per-gb-month-explained.md`

**Step 1: Write the failing test**

Create `tests/core-intent-refresh.test.mjs` that reads the files above and asserts the new intent language exists.

The test should verify:

- usage calculator copy explicitly frames the page around `price per unit` and `usage pricing floor`
- annual calculator copy explicitly frames the page around `monthly to annual` conversion and `effective monthly rate`
- storage calculator copy explicitly frames the page around real storage cost structure, not just a public rate
- `price-per-gb-month-explained` clearly distinguishes buyer-facing rate from cost modeling
- `storage-costs-and-pricing` clearly distinguishes cost model, public rate, and pricing-structure interpretation

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/core-intent-refresh.test.mjs
```

Expected:

- FAIL with missing strings because the new role-specific wording is not present yet

**Step 3: Commit the failing test only after confirming the expected failure locally**

Do not commit yet if more implementation will immediately follow; just keep the failing test in the working tree as protection.

---

### Task 2: Rework tool metadata for usage, annual, and storage roles

**Files:**
- Modify: `src/lib/tools.ts`
- Test: `tests/core-intent-refresh.test.mjs`

**Step 1: Update usage calculator metadata**

Adjust the `usage-based-pricing-calculator` entry so:

- `description` is more clearly about setting a price per unit floor
- `metaTitle` leans harder into `price per unit calculator` intent while keeping the retained PricingNest phrasing natural
- `metaDescription` clearly explains input-output task, not only category membership
- interpretation/use-case/walkthrough language reinforces that this tool is the floor-setting step, not the full packaging answer

**Step 2: Update annual discount calculator metadata**

Adjust the `annual-discount-calculator` entry so:

- `description` reads more like a monthly-to-annual conversion task
- `metaTitle` makes annual discount and effective monthly rate easier to infer
- `metaDescription` is explicit about annual invoice, effective monthly rate, and prepay comparison
- use cases, walkthroughs, and interpretation reinforce that this page is the numeric conversion page

**Step 3: Update storage calculator and GB-month calculator metadata**

Adjust:

- `storage-cost-calculator`
- `price-per-gb-month-calculator`

so the difference becomes clearer:

- storage cost calculator = real cost structure and workload modeling
- price per GB-month calculator = buyer-facing rate translation

Use the metadata, interpretation, use cases, and walkthroughs to make that split visible.

**Step 4: Run the focused regression test**

Run:

```bash
node tests/core-intent-refresh.test.mjs
```

Expected:

- partial improvement or continued failure until template/content updates are complete

---

### Task 3: Rework tool-page template copy and retained handoff

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`
- Test: `tests/core-intent-refresh.test.mjs`

**Step 1: Audit existing hero / flagship sections for the target slugs**

Read the existing slug-specific sections in `[slug].astro` and identify where the target tools already receive:

- special intro copy
- slug-specific decision summaries
- curated links
- packaging-change guidance

Do not broaden this to unrelated tools.

**Step 2: Rewrite usage page role language**

Update the slug-specific sections for `usage-based-pricing-calculator` so they:

- answer what this page is for in the first screen
- frame the output as a per-unit floor decision
- push metric-selection and packaging-variation decisions toward the appropriate retained guides

**Step 3: Rewrite annual page role language**

Update the template behavior for `annual-discount-calculator` so the page more clearly behaves like:

- a monthly-to-annual conversion page
- an annual prepay / effective monthly comparison page

If the template has no dedicated annual block today, add the smallest role-specific logic needed for that one page.

**Step 4: Rewrite storage page handoff language**

Update the `storage-cost-calculator` and `price-per-gb-month-calculator` presentation so users can tell:

- which page models actual cost
- which page translates that model into a publishable rate
- when to leave the tool and read the structural storage guide

**Step 5: Keep trust and correction language intact**

Do not remove the previously added trust sections. This batch is identity sharpening, not trust rollback.

**Step 6: Run the focused regression test**

Run:

```bash
node tests/core-intent-refresh.test.mjs
```

Expected:

- better alignment, though guide content updates may still be required

---

### Task 4: Rework the retained support guides for cleaner role separation

**Files:**
- Modify: `src/content/guides/usage-based-pricing-examples.md`
- Modify: `src/content/guides/annual-prepay-discount.md`
- Modify: `src/content/guides/storage-costs-and-pricing.md`
- Modify: `src/content/guides/price-per-gb-month-explained.md`
- Test: `tests/core-intent-refresh.test.mjs`

**Step 1: Tighten `usage-based-pricing-examples`**

Adjust the guide so it acts less like a duplicate tool explainer and more like:

- the page you read after you already have a unit-price floor
- the page that explains when one unit price needs tiers, included usage, overage, or minimum commitment

**Step 2: Tighten `annual-prepay-discount`**

Adjust the guide so it acts less like the calculator itself and more like:

- the page that explains discount policy tradeoffs
- the page you read after converting monthly to annual numbers

**Step 3: Tighten `storage-costs-and-pricing`**

Adjust the guide so it clearly owns:

- pricing structure interpretation
- the decision of when GB-month alone stops being enough

Make the relationship between:

- `storage-cost-calculator`
- `price-per-gb-month-calculator`
- this guide

more explicit in the copy.

**Step 4: Tighten `price-per-gb-month-explained`**

Adjust the guide so it more clearly behaves like:

- the explanation of the buyer-facing headline rate
- not the place where full underlying cost structure is first modeled

**Step 5: Run the regression test until it passes**

Run:

```bash
node tests/core-intent-refresh.test.mjs
```

Expected:

- PASS

---

### Task 5: Update homepage and toolkit-page retained workflow language

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/saas-pricing/index.astro`
- Test: `tests/core-intent-refresh.test.mjs`

**Step 1: Review current retained-path wording**

Inspect where homepage and toolkit page describe:

- usage workflow
- annual discount as a secondary workflow
- storage workflow

**Step 2: Make only the smallest copy changes needed**

Update those pages only where current wording weakens the new page-role split.

Examples of acceptable adjustments:

- clarify that usage starts with a price-per-unit floor
- clarify that annual discount is a secondary conversion check after the core packaging path is clear
- clarify that storage cost modeling happens before buyer-facing GB-month translation

Do not turn these pages into heavy rewrite candidates.

**Step 3: Re-run the regression test**

Run:

```bash
node tests/core-intent-refresh.test.mjs
```

Expected:

- PASS remains stable

---

### Task 6: Run full verification

**Files:**
- Verify only

**Step 1: Run build**

Run:

```bash
npm run build
```

Expected:

- PASS

**Step 2: Run focused regression**

Run:

```bash
node tests/core-intent-refresh.test.mjs
```

Expected:

- PASS

**Step 3: Run existing trust and metadata verification**

Run:

```bash
node tests/trust-credibility-refresh.test.mjs
node tests/site-trust-signals-batch.test.mjs
node tests/editorial-metadata.test.mjs
node tests/tool-trust-data.test.mjs
```

Expected:

- all PASS

**Step 4: Review git diff**

Run:

```bash
git diff --stat
git status --short
```

Expected:

- only the planned files show intended changes

---

### Task 7: Commit the batch

**Files:**
- Commit the modified plan, content, tool, template, and test files

**Step 1: Stage the batch**

Run:

```bash
git add docs/plans/2026-05-28-core-intent-refresh-design.md docs/plans/2026-05-28-core-intent-refresh-implementation.md src/lib/tools.ts src/pages/saas-pricing/[slug].astro src/pages/index.astro src/pages/saas-pricing/index.astro src/content/guides/usage-based-pricing-examples.md src/content/guides/annual-prepay-discount.md src/content/guides/storage-costs-and-pricing.md src/content/guides/price-per-gb-month-explained.md tests/core-intent-refresh.test.mjs
```

**Step 2: Commit**

Run:

```bash
git commit -m "feat: sharpen retained tool intent and workflow handoff"
```

Expected:

- one coherent commit for the core intent refresh batch

---

Plan complete and saved to `docs/plans/2026-05-28-core-intent-refresh-implementation.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
