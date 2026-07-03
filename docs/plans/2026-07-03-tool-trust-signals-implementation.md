# Tool Trust Signals Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen trust, reviewability, and editorial ownership on core PricingNest tool pages while keeping the site concise and non-template-like.

**Architecture:** Extend the shared tool data model with optional trust-signal fields, render a compact trust framework in the shared tool-page template, then add tailored content for the five priority tools while tightening the supporting methodology and about pages. Use defaults for non-priority tools so we improve the full tool layer without writing bespoke copy for every page.

**Tech Stack:** Astro, TypeScript content/config in `src/lib/tools.ts`, shared tool template in `src/pages/saas-pricing/[slug].astro`, existing Node-based audit and governance tests.

---

### Task 1: Extend the tool data model for trust fields

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Add optional trust field types**

Add optional fields to `ToolDefinition`:

- `verificationChecklist?: string[]`
- `reviewScope?: string[]`
- `limitations?: string[]`
- `defaultOutputBreakpoints?: string[]`

**Step 2: Keep the change backwards-compatible**

Do not require these fields on existing tools. Non-priority tools should continue compiling without custom trust content.

**Step 3: Run a focused build check**

Run: `npm run build`
Expected: PASS or fail later only because template rendering has not been updated yet.

### Task 2: Add trust defaults and helper lookups

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Create default trust content**

Add small shared default arrays for:

- verification guidance
- review scope
- limitations
- conditions where default outputs are least reliable

These defaults should be generic enough to apply to non-priority tools, but still practical.

**Step 2: Add custom trust content to the five priority tools**

Populate the new fields for:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`
- `compute-cost-estimator`
- `storage-cost-calculator`
- `annual-discount-calculator`

Make the content specific to each model's decision risks.

**Step 3: Add small helper functions if needed**

If the template becomes cleaner with helpers like `getToolVerificationChecklist(tool)`, add them here.

### Task 3: Render the trust framework on tool pages

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Read trust fields from the tool definition**

Use the new tool-level trust arrays or their defaults.

**Step 2: Add compact trust sections near the existing review area**

Render these sections in the sidebar review/trust area:

- `How to verify this model`
- `Review scope`
- `When default outputs are most likely to break`
- `What this tool does not cover`

Keep the layout visually consistent with the current card structure.

**Step 3: Preserve the current strong signals**

Do not remove:

- reviewer attribution
- last reviewed date
- methodology link
- sources and references

**Step 4: Ensure no new noindex or low-value links are introduced**

Only link to retained site-level trust pages where necessary.

### Task 4: Tighten the methodology page to support the tool trust layer

**Files:**
- Modify: `src/pages/methodology.astro`

**Step 1: Add a clearer independent validation section**

Explain what a reader should check before relying on a calculator output:

- billing exports
- contract terms
- usage distribution
- target margin policy
- segment differences

**Step 2: Clarify what review and review-date refresh mean**

Make the page more explicit about:

- what reviewed means
- what counts as a meaningful update
- why not every copy cleanup changes a review date

**Step 3: Keep the page concise**

Strengthen policy clarity without turning this into a long legal page.

### Task 5: Tighten the about page to reinforce site identity

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Strengthen the editorial-product framing**

Clarify that PricingNest is maintained as a reviewed editorial toolkit, not a bulk content directory.

**Step 2: Align wording with the new trust framework**

Make sure about-page language matches:

- reviewed content
- correction routing
- retained core pages
- real decision support

**Step 3: Avoid duplicating the full methodology page**

Keep this page identity-focused, not policy-heavy.

### Task 6: Verify rendering and governance health

**Files:**
- Test: `tests/content-governance.test.mjs`
- Test: `tests/site-quality-signals.test.mjs`
- Test: `tests/sitemap-governance.test.mjs`
- Test: `scripts/audit.mjs`

**Step 1: Run governance regression**

Run: `node tests/content-governance.test.mjs`
Expected: PASS

**Step 2: Run site-quality signals test**

Run: `node tests/site-quality-signals.test.mjs`
Expected: PASS

**Step 3: Run sitemap governance check**

Run: `node tests/sitemap-governance.test.mjs`
Expected: PASS

**Step 4: Run the audit**

Run: `node scripts/audit.mjs`
Expected: PASS

**Step 5: Run production build**

Run: `npm run build`
Expected: PASS

### Task 7: Review the diff and prepare execution

**Files:**
- Review only

**Step 1: Inspect the final diff**

Run: `git diff -- src/lib/tools.ts src/pages/saas-pricing/[slug].astro src/pages/methodology.astro src/pages/about.astro`
Expected: Trust content is stronger, concise, and does not look bloated.

**Step 2: Sanity-check copy repetition**

Make sure the five flagship tools feel more specific than the defaults.

**Step 3: Prepare commit**

Use a single commit message once the implementation is verified, such as:

`git commit -m "feat: strengthen tool trust and review signals"`
