# Rate Limit Packaging Wave 14 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten `rate-limit` into a retained glossary support page about when
a throughput cap must become a buyer-visible packaging rule instead of staying
an internal engineering guardrail.

**Architecture:** Keep the existing glossary URL and retained glossary
template. Add failing tests first, then rewrite
`src/content/glossary/rate-limit.md` so it becomes a clearer support layer
between `api-call`, `api-pricing-model`, and `overage`.

**Tech Stack:** Astro content collections, Markdown glossary entries, Node.js
file-based tests

---

### Task 1: Lock the wave-14 rate-limit packaging standard with failing tests

**Files:**
- Modify: `tests/retained-glossary-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Tighten retained glossary depth expectations**

Update the `rate-limit` entry in `tests/retained-glossary-depth.test.mjs` so it
now requires this heading:

- `## How rate limits move from engineering guardrail to visible packaging rule`

Keep the other required headings the same.

Update the same `rate-limit` test entry so the keyword list is:

- `burst traffic`
- `fairness rule`
- `packaging rule`
- `buyer expectation`
- `upgrade path`

Keep the same minimum word count.

**Step 2: Tighten retained link concentration expectations**

Update `tests/retained-link-concentration.test.mjs` so `rate-limit` must:

- include `/guides/api-pricing-model/`
- include `/guides/value-metric-selection/`
- include `/saas-pricing/api-pricing-calculator/`
- include `/glossary/api-call/`
- include `/glossary/overage/`
- exclude `/guides/api-rate-limit-pricing/`
- exclude `/guides/request-pricing-model/`
- exclude `/glossary/usage-based-pricing/`
- exclude `/glossary/pricing-metric/`

**Step 3: Run tests to verify failure**

Run:

```bash
node --test tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs
```

Expected: FAIL because the current glossary entry still uses the broader
engineering framing and does not yet include the stronger retained API support
set.

### Task 2: Rewrite the retained glossary entry to match the tighter intent

**Files:**
- Modify: `src/content/glossary/rate-limit.md`

**Step 1: Refresh frontmatter without widening scope**

Update the frontmatter so the page reflects the wave-14 review:

- `updated: "2026-04-05"`
- `reviewed: "2026-04-05"`
- keep `author`, `reviewedBy`, and `category`
- keep guides focused on API packaging decisions:
  - `api-pricing-model`
  - `value-metric-selection`
- keep tools focused on retained API support:
  - `api-pricing-calculator`
- tighten glossary support so the page concentrates on:
  - `api-call`
  - `overage`
  - `gross-margin`
- strengthen the `sources:` block so it supports:
  - buyer-visible throughput expectations
  - fairness under burst traffic
  - when the paid escalation path should become visible
  - stronger retained neighboring API pages and terms where helpful

**Step 2: Replace the broader decision section with the wave-14 packaging section**

Rewrite the body so it uses these sections:

- `## Definition`
- `## Why it matters in pricing decisions`
- `## How rate limits move from engineering guardrail to visible packaging rule`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

The new body should stay practical and commercial. It should answer:

- when a rate limit can stay in internal operating policy
- when the cap changes the buyer-facing commercial promise
- how the limit differs from the billable unit
- how the limit interacts with `api-call`, `overage`, and the upgrade path
- when a hidden limit damages buyer expectation and fairness trust

**Step 3: Tighten support concentration inside the body**

The rewritten page should directly support the retained API core by linking to:

- `/guides/api-pricing-model/`
- `/guides/value-metric-selection/`
- `/saas-pricing/api-pricing-calculator/`
- `/glossary/api-call/`
- `/glossary/overage/`

Keep weaker API inventory and broader glossary support absent:

- `/guides/api-rate-limit-pricing/`
- `/guides/request-pricing-model/`
- `/glossary/usage-based-pricing/`
- `/glossary/pricing-metric/`

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

Expected: PASS with the tighter retained rate-limit glossary page and no
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
- Verify: `dist/glossary/rate-limit/index.html`

**Step 1: Check the rendered glossary output**

Run:

```bash
Select-String -Path dist/glossary/rate-limit/index.html -Pattern "Reviewed","Sources and references","value-metric-selection","/glossary/api-call/","/glossary/overage/","/saas-pricing/api-pricing-calculator/","api-rate-limit-pricing","/guides/request-pricing-model/","/glossary/usage-based-pricing/","/glossary/pricing-metric/"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `value-metric-selection` present
- `/glossary/api-call/` present
- `/glossary/overage/` present
- `/saas-pricing/api-pricing-calculator/` present
- `api-rate-limit-pricing` absent
- `/guides/request-pricing-model/` absent
- `/glossary/usage-based-pricing/` absent
- `/glossary/pricing-metric/` absent

### Task 5: Record the batch review and commit the implementation

**Files:**
- Create: `docs/plans/2026-04-05-rate-limit-packaging-wave-14-review-log.md`
- Verify: `git diff -- tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/rate-limit.md docs/plans/2026-04-05-rate-limit-packaging-wave-14-review-log.md`

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
git diff -- tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/rate-limit.md docs/plans/2026-04-05-rate-limit-packaging-wave-14-review-log.md
```

Expected: Only the planned wave-14 test, glossary, and review-log changes are
present.

**Step 3: Commit the implementation**

Run:

```bash
git add tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/rate-limit.md docs/plans/2026-04-05-rate-limit-packaging-wave-14-review-log.md
git commit -m "feat: tighten rate limit packaging glossary support"
```

Expected: One clean implementation commit on `rate-limit-packaging-wave-14`.
