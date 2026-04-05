# API Pricing Structure Wave 13 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten `api-pricing-model` into a retained-core decision page about
when a simple public API usage rate is enough and when the model needs extra
packaging structure such as base fee, included usage, rate limit, or overage.

**Architecture:** Keep the existing guide URL and retained-core guide template.
Add failing tests first, then rewrite `src/content/guides/api-pricing-model.md`
so the page becomes a clearer decision layer between API cost estimation,
billable-unit definition, and buyer-facing packaging publication.

**Tech Stack:** Astro content collections, Markdown guides, Node.js file-based
tests

---

### Task 1: Lock the wave-13 API packaging standard with failing tests

**Files:**
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Tighten retained depth expectations**

Update the `api-pricing-model` entry in
`tests/retained-guide-depth.test.mjs` so it now requires these headings:

- `## When API pricing becomes a packaging-structure decision`
- `## Inputs to confirm before you publish one API usage rate`
- `## Where teams force one API rate across incompatible customer patterns`
- `## Billable unit vs base fee vs included usage vs rate limit vs overage`
- `## How to interpret the calculator outputs`
- `## Next steps`

Update the same test entry so the keyword list is:

- `billable unit`
- `base fee`
- `included usage`
- `rate limit`
- `overage`

Keep the same minimum word count.

**Step 2: Tighten retained link concentration expectations**

Update `tests/retained-link-concentration.test.mjs` so `api-pricing-model`
must:

- include `/guides/api-cost-estimation/`
- include `/guides/value-metric-selection/`
- include `/glossary/api-call/`
- include `/glossary/rate-limit/`
- include `/glossary/overage/`
- exclude `/guides/api-free-tier-guardrails/`
- exclude `/guides/api-tier-design/`
- exclude `/guides/api-rate-limit-pricing/`
- exclude `/glossary/cogs/`

**Step 3: Run tests to verify failure**

Run:

```bash
node --test tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs
```

Expected: FAIL because the current guide still uses the broader API-pricing
framing and does not yet include the stronger retained API support set.

### Task 2: Rewrite the retained guide to match the tighter intent

**Files:**
- Modify: `src/content/guides/api-pricing-model.md`

**Step 1: Refresh frontmatter without widening scope**

Update the frontmatter so the page reflects the wave-13 review:

- `updated: "2026-04-05"`
- `reviewed: "2026-04-05"`
- keep `author` and `reviewedBy`
- keep tools focused on API packaging decisions, such as:
  - `api-pricing-calculator`
  - `api-cost-estimator`
  - `tiered-usage-pricing-calculator`
- strengthen the `sources:` block so it supports:
  - billable-unit publication decisions
  - base-fee and included-usage structure decisions
  - visible rate-limit and overage decisions
  - stronger retained neighboring API pages where helpful

**Step 2: Replace the broader API framing with wave-13 headings**

Rewrite the body so it uses exactly these sections:

- `## When API pricing becomes a packaging-structure decision`
- `## Inputs to confirm before you publish one API usage rate`
- `## Where teams force one API rate across incompatible customer patterns`
- `## Billable unit vs base fee vs included usage vs rate limit vs overage`
- `## How to interpret the calculator outputs`
- `## Next steps`

The new body should stay practical and commercial. It should answer:

- when one public API usage rate is still honest enough to publish
- when the billable unit is too weak on its own
- when fixed overhead forces a base fee
- when included usage is needed for buyer estimation
- when rate limit or overage must become visible packaging structure instead of
  hidden operating detail

**Step 3: Tighten support concentration inside the body**

The rewritten page should directly support the retained core by linking to:

- `/guides/api-cost-estimation/`
- `/guides/value-metric-selection/`
- `/saas-pricing/api-pricing-calculator/`
- `/saas-pricing/api-cost-estimator/`
- `/saas-pricing/tiered-usage-pricing-calculator/`
- `/glossary/api-call/`
- `/glossary/rate-limit/`
- `/glossary/overage/`

Keep weaker API inventory absent.

### Task 3: Re-run targeted verification and build in the correct order

**Files:**
- Verify: `tests/retained-guide-depth.test.mjs`
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/guide-trust-data.test.mjs`
- Verify: `tests/api-pricing-content.test.mjs`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/recovery-retention-thresholds.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/sitemap-governance.test.mjs`
- Verify: `npm run build`

**Step 1: Run the file-based verification set before the build-dependent test**

Run:

```bash
node --test tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs tests/guide-trust-data.test.mjs tests/api-pricing-content.test.mjs tests/core-tool-clusters.test.mjs tests/hub-curation.test.mjs tests/site-quality-signals.test.mjs tests/template-quality.test.mjs tests/navigation-deduping.test.mjs tests/tool-trust-data.test.mjs tests/content-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/seo-meta.test.mjs
```

Expected: PASS with the tighter retained API packaging page and no regression
across the current recovery line.

**Step 2: Build before the sitemap assertion**

Run:

```bash
npm run build
node --test tests/sitemap-governance.test.mjs
```

Expected: PASS. `sitemap-governance` should run only after a fresh build,
because it reads `dist/sitemap-0.xml`.

### Task 4: Review rendered HTML before any merge decision

**Files:**
- Verify: `dist/guides/api-pricing-model/index.html`

**Step 1: Check the rendered guide output**

Run:

```bash
Select-String -Path dist/guides/api-pricing-model/index.html -Pattern "Reviewed","Sources and references","api-cost-estimation","value-metric-selection","/glossary/api-call/","/glossary/rate-limit/","/glossary/overage/","api-free-tier-guardrails","api-tier-design","/glossary/cogs/"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `api-cost-estimation` present
- `value-metric-selection` present
- `/glossary/api-call/` present
- `/glossary/rate-limit/` present
- `/glossary/overage/` present
- `api-free-tier-guardrails` absent
- `api-tier-design` absent
- `/glossary/cogs/` absent

### Task 5: Record the batch review and commit the implementation

**Files:**
- Create: `docs/plans/2026-04-05-api-pricing-structure-wave-13-review-log.md`
- Verify: `git diff -- tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/guides/api-pricing-model.md docs/plans/2026-04-05-api-pricing-structure-wave-13-review-log.md`

**Step 1: Write the review log**

Capture:

- what this batch changed
- why this batch was worth doing
- what it intentionally did not change
- verification commands that passed
- rendered HTML notes
- remaining risks
- recommended next step

**Step 2: Review the final diff**

Run:

```bash
git diff -- tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/guides/api-pricing-model.md docs/plans/2026-04-05-api-pricing-structure-wave-13-review-log.md
```

Expected: Only the planned wave-13 test, guide, and review-log changes are
present.

**Step 3: Commit the implementation**

Run:

```bash
git add tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/guides/api-pricing-model.md docs/plans/2026-04-05-api-pricing-structure-wave-13-review-log.md
git commit -m "feat: tighten api pricing packaging structure guide"
```

Expected: One clean implementation commit on `api-pricing-structure-wave-13`.
