# API Call Boundary Wave 16 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten `api-call` into a retained glossary support page about when an
API call is a clear public billable unit and when the billing boundary becomes
too ambiguous to publish without misleading buyers.

**Architecture:** Keep the existing glossary URL and retained glossary
template. Add failing tests first, then rewrite `src/content/glossary/api-call.md`
so it becomes a clearer support layer beneath `api-pricing-model` and alongside
`value-metric-selection`, `rate-limit`, and `overage`.

**Tech Stack:** Astro content collections, Markdown glossary entries, Node.js
file-based tests

---

### Task 1: Lock the wave-16 API call boundary standard with failing tests

**Files:**
- Modify: `tests/retained-glossary-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`

**Step 1: Tighten retained glossary depth expectations**

Update the `api-call` entry in `tests/retained-glossary-depth.test.mjs` so it
now requires this heading:

- `## How API call boundaries become commercially misleading`

Keep the other required headings the same.

Update the same `api-call` test entry so the keyword list is:

- `billable event`
- `retries`
- `request mix`
- `buyer estimation`
- `premium endpoints`

Keep the same minimum word count.

**Step 2: Tighten retained link concentration expectations**

Update `tests/retained-link-concentration.test.mjs` so `api-call` must:

- include `/guides/api-pricing-model/`
- include `/guides/value-metric-selection/`
- include `/saas-pricing/api-pricing-calculator/`
- include `/glossary/rate-limit/`
- include `/glossary/overage/`
- exclude `/guides/api-free-tier-guardrails/`
- exclude `/guides/request-pricing-model/`
- exclude `/glossary/usage-based-pricing/`
- exclude `/glossary/pricing-metric/`

**Step 3: Run tests to verify failure**

Run:

```bash
node --test tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs
```

Expected: FAIL because the current glossary entry still uses the broader API
usage framing and does not yet include the tighter wave-16 billable-boundary
structure.

### Task 2: Rewrite the retained glossary entry to match the tighter intent

**Files:**
- Modify: `src/content/glossary/api-call.md`

**Step 1: Refresh frontmatter without widening scope**

Update the frontmatter so the page reflects the wave-16 review:

- `updated: "2026-04-05"`
- `reviewed: "2026-04-05"`
- keep `author`, `reviewedBy`, and `category`
- keep guides focused on retained API support:
  - `api-pricing-model`
  - `value-metric-selection`
- keep tools focused on the retained pricing decision:
  - `api-pricing-calculator`
- tighten glossary support so the page concentrates on:
  - `rate-limit`
  - `overage`
- strengthen the `sources:` block so it supports:
  - billable-event boundary review
  - retries and premium endpoints
  - buyer estimation quality
  - request-mix distortion
  - stronger retained neighboring API pages where helpful

**Step 2: Replace the broader decision section with the wave-16 boundary section**

Rewrite the body so it uses these sections:

- `## Definition`
- `## Why it matters in pricing decisions`
- `## How API call boundaries become commercially misleading`
- `## How to use it with PricingNest tools`
- `## Common interpretation mistakes`
- `## Example`

The new body should stay practical and commercial. It should answer:

- when a public API call definition is clear enough to publish
- when retries or background activity make the unit too noisy
- when premium endpoints or request-mix differences break fairness
- how buyer estimation changes when the unit has hidden exclusions
- how the billable boundary should work with `rate-limit` and `overage`

**Step 3: Tighten support concentration inside the body**

The rewritten page should directly support the retained API core by linking to:

- `/guides/api-pricing-model/`
- `/guides/value-metric-selection/`
- `/saas-pricing/api-pricing-calculator/`
- `/glossary/rate-limit/`
- `/glossary/overage/`

Keep weaker support inventory and broader glossary support absent:

- `/guides/api-free-tier-guardrails/`
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

Expected: PASS with the tighter retained `api-call` glossary page and no
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
- Verify: `dist/glossary/api-call/index.html`

**Step 1: Check the rendered glossary output**

Run:

```bash
Select-String -Path dist/glossary/api-call/index.html -Pattern "Reviewed","Sources and references","api-pricing-model","value-metric-selection","/saas-pricing/api-pricing-calculator/","/glossary/rate-limit/","/glossary/overage/","/guides/api-free-tier-guardrails/","/guides/request-pricing-model/","/glossary/usage-based-pricing/","/glossary/pricing-metric/"
```

Expected:

- `Reviewed` present
- `Sources and references` present
- `api-pricing-model` present
- `value-metric-selection` present
- `/saas-pricing/api-pricing-calculator/` present
- `/glossary/rate-limit/` present
- `/glossary/overage/` present
- `/guides/api-free-tier-guardrails/` absent
- `/guides/request-pricing-model/` absent
- `/glossary/usage-based-pricing/` absent
- `/glossary/pricing-metric/` absent

### Task 5: Record the batch review and commit the implementation

**Files:**
- Create: `docs/plans/2026-04-05-api-call-boundary-wave-16-review-log.md`
- Verify: `git diff -- tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/api-call.md docs/plans/2026-04-05-api-call-boundary-wave-16-review-log.md`

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
git diff -- tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/api-call.md docs/plans/2026-04-05-api-call-boundary-wave-16-review-log.md
```

Expected: Only the planned wave-16 test, glossary, and review-log changes are
present.

**Step 3: Commit the implementation**

Run:

```bash
git add tests/retained-glossary-depth.test.mjs tests/retained-link-concentration.test.mjs src/content/glossary/api-call.md docs/plans/2026-04-05-api-call-boundary-wave-16-review-log.md
git commit -m "feat: tighten api call billable boundary glossary support"
```

Expected: One clean implementation commit on `api-call-boundary-wave-16`.
