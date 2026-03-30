# PricingNest Site Quality and Trust Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen SEO quality signals and user trust on core templates without restructuring the site.

**Architecture:** Apply a small, focused template pass across the homepage, About page, tool page template, guide page template, and glossary page template. Lock the new behavior with regression tests so low-quality phrases, excessive related-link blocks, and missing editorial metadata do not return.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests

---

### Task 1: Add regression tests for quality and editorial signals

**Files:**
- Create: `tests/site-quality-signals.test.mjs`
- Create: `tests/template-quality.test.mjs`
- Create: `tests/editorial-metadata.test.mjs`

**Step 1: Write the failing tests**

Add tests that assert:
- homepage no longer contains SEO-first public copy
- About page contains methodology and editorial language
- tool template does not contain `Advertisement` or `More to explore`
- tool template does contain `Recommended next steps`
- guide template includes `Article` schema and editorial defaults
- glossary template includes `DefinedTerm` schema and editorial defaults

**Step 2: Run tests to verify they fail**

Run:

```bash
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/editorial-metadata.test.mjs
```

Expected: Failures for the About page, tool template, guide template, and glossary template.

### Task 2: Improve trust and clarity on the About page

**Files:**
- Modify: `src/pages/about.astro`

**Step 1: Rewrite the page around methodology and limitations**

Add clearer sections for:
- who the site is for
- how calculators are built and reviewed
- what the site does not do
- how users can report issues or request corrections

**Step 2: Re-run the relevant test**

Run:

```bash
node tests/site-quality-signals.test.mjs
```

Expected: About-page assertions pass.

### Task 3: Clean up the tool page template

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Remove low-quality cues**

Replace:
- `Auto-generated from your inputs.`
- `Advertisement`
- `More to explore`

Add:
- more human review language
- curated `Recommended next steps`
- deduped and capped related-link output

**Step 2: Re-run the relevant test**

Run:

```bash
node tests/template-quality.test.mjs
```

Expected: Tool-template assertions pass.

### Task 4: Add editorial schema to guide and glossary templates

**Files:**
- Modify: `src/pages/guides/[slug].astro`
- Modify: `src/pages/glossary/[slug].astro`

**Step 1: Add editorial defaults and page schema**

For guides:
- `Article` schema
- author/reviewer defaults
- visible review metadata block

For glossary:
- `DefinedTerm` schema
- author/reviewer defaults
- visible editorial metadata block

**Step 2: Re-run the relevant test**

Run:

```bash
node tests/editorial-metadata.test.mjs
```

Expected: Editorial assertions pass.

### Task 5: Run full targeted verification

**Files:**
- Verify: `tests/internal-linking.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/tool-meta-separation.test.mjs`
- Verify: `tests/guide-anchor-intent.test.mjs`
- Verify: `tests/usage-based-content.test.mjs`

**Step 1: Run targeted tests**

Run:

```bash
node tests/site-quality-signals.test.mjs
node tests/template-quality.test.mjs
node tests/editorial-metadata.test.mjs
node tests/internal-linking.test.mjs
node tests/seo-meta.test.mjs
node tests/tool-meta-separation.test.mjs
node tests/guide-anchor-intent.test.mjs
node tests/usage-based-content.test.mjs
```

Expected: All tests pass.

**Step 2: Run build verification**

Run:

```bash
npm run build:astro
```

Expected: Production build succeeds.
