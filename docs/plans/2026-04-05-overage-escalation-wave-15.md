# Overage Escalation Wave 15 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten `overage` into a retained glossary support page about when a
post-threshold charge is still a predictable paid escalation path and when it
signals that the packaging model is still unresolved.

**Architecture:** Keep the existing glossary URL and retained glossary
template. Add failing tests first, then rewrite
`src/content/glossary/overage.md` so it becomes a clearer support layer between
`included-usage`, `rate-limit`, and `api-pricing-model`.

**Tech Stack:** Astro content collections, Markdown glossary entries, Node.js
file-based tests

---

### Task 1: Lock the wave-15 overage escalation standard with failing tests

**Files:**
- Modify: `tests/retained-glossary-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Tighten retained glossary depth expectations**

Update the `overage` entry in `tests/retained-glossary-depth.test.mjs` so it
now requires this heading:

- `## How overage moves from predictable extension to packaging problem`

Keep the other required headings the same.

Update the same `overage` test entry so the keyword list is:

- `included usage`
- `paid escalation path`
- `buyer trust`
- `margin protection`
- `manual exceptions`

Keep the same minimum word count.

**Step 2: Tighten retained link concentration expectations**

Update `tests/retained-link-concentration.test.mjs` so `overage` must:

- include `/guides/api-pricing-model/`
- include `/guides/usage-based-pricing-examples/`
- include `/saas-pricing/tiered-usage-pricing-calculator/`
- include `/saas-pricing/api-pricing-calculator/`
- include `/glossary/included-usage/`
- include `/glossary/rate-limit/`
- exclude `/guides/api-cost-estimation/`
- exclude `/guides/overage-policy-design/`
- exclude `/guides/overage-communication/`
- exclude `/glossary/usage-based-pricing/`

**Step 3: Run tests to verify failure**

Run:

```bash
node --test tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs
```

Expected: FAIL because the current glossary entry still uses the broader
overage framing and does not yet include the stronger retained escalation-path
support set.

### Task 2: Rewrite the retained glossary entry to match the tighter intent

**Files:**
- Modify: `src/content/glossary/overage.md`

**Step 1: Refresh frontmatter without widening scope**

Update the frontmatter so the page reflects the wave-15 review:

- `updated: "2026-04-05"`
- `reviewed: "2026-04-05"`
- keep `author`, `reviewedBy`, and `category`
- keep guides focused on retained packaging support:
  - `api-pricing-model`
  - `usage-based-pricing-examples`
- keep tools focused on retained escalation decisions:
  - `tiered-usage-pricing-calculator`
  - `api-pricing-calculator`
- tighten glossary support so the page concentrates on:
  - `included-usage`
  - `rate-limit`
  - `gross-margin`
- strengthen the `sources:` block so it supports:
  - threshold timing and buyer estimation
  - when paid escalation stays commercially honest
  - when manual exceptions expose packaging weakness
  - stronger retained neighboring API and usage pages where helpful

**Step 2: Replace the broader decision section with the wave-15 escalation section**

Rewrite the body so it uses these sections:

- `## Definition`
- `## Why it matters in pricing decisions`
- `## How overage moves from predictable extension to packaging problem`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

The new body should stay practical and commercial. It should answer:

- when overage is still a clean continuation of the plan
- when the threshold or rate starts breaking buyer trust
- how overage interacts with included usage and rate-limit rules
- when overage belongs in a predictable paid path rather than manual exceptions
- when hidden discounts or repeated exceptions mean the packaging still needs
  redesign

**Step 3: Tighten support concentration inside the body**

The rewritten page should directly support the retained API and usage core by
linking to:

- `/guides/api-pricing-model/`
- `/guides/usage-based-pricing-examples/`
- `/saas-pricing/tiered-usage-pricing-calculator/`
- `/saas-pricing/api-pricing-calculator/`
- `/glossary/included-usage/`
- `/glossary/rate-limit/`

Keep weaker support inventory and broader glossary support absent:

- `/guides/api-cost-estimation/`
- `/guides/overage-policy-design/`
- `/guides/overage-communication/`
- `/glossary/usage-based-pricing/`

### Task 3: Re-run targeted verification and build in the correct order

**Files:**
- Verify: `tests/retained-glossary-depth.test.mjs`
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/glossary-trust-data.test.mjs`
- Verify: `tests/api-pricing-content.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/template-quality.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/recovery-retention-thresholds.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/sitemap-governance.test.mjs`
- Verify: `npm run build`

**Step 1: Run the file-based verification set before the build-dependent test**

Run:

```bash
node --test tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs tests/glossary-trust-data.test.mjs tests/api-pricing-content.test.mjs tests/hub-curation.test.mjs tests/site-quality-signals.test.mjs tests/template-quality.test.mjs tests/navigation-deduping.test.mjs tests/content-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/seo-meta.test.mjs
```

Expected: PASS with the tighter retained overage glossary page and no
regression across the current recovery line.

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
- Verify: `dist/glossary/overage/index.html`

**Step 1: Check the rendered glossary output**

Run:

```bash
Select-String -Path dist/glossary/overage/index.html -Pattern "Reviewed","Sources and references","api-pricing-model","/saas-pricing/tiered-usage-pricing-calculator/","/saas-pricing/api-pricing-calculator/","/glossary/included-usage/","/glossary/rate-limit/","/guides/api-cost-estimation/","/guides/overage-policy-design/","/guides/overage-communication/","/glossary/usage-based-pricing/"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `api-pricing-model` present
- `/saas-pricing/tiered-usage-pricing-calculator/` present
- `/saas-pricing/api-pricing-calculator/` present
- `/glossary/included-usage/` present
- `/glossary/rate-limit/` present
- `/guides/api-cost-estimation/` absent
- `/guides/overage-policy-design/` absent
- `/guides/overage-communication/` absent
- `/glossary/usage-based-pricing/` absent

### Task 5: Record the batch review and commit the implementation

**Files:**
- Create: `docs/plans/2026-04-05-overage-escalation-wave-15-review-log.md`
- Verify: `git diff -- tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/overage.md docs/plans/2026-04-05-overage-escalation-wave-15-review-log.md`

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
git diff -- tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/overage.md docs/plans/2026-04-05-overage-escalation-wave-15-review-log.md
```

Expected: Only the planned wave-15 test, glossary, and review-log changes are
present.

**Step 3: Commit the implementation**

Run:

```bash
git add tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/overage.md docs/plans/2026-04-05-overage-escalation-wave-15-review-log.md
git commit -m "feat: tighten overage escalation glossary support"
```

Expected: One clean implementation commit on `overage-escalation-wave-15`.
