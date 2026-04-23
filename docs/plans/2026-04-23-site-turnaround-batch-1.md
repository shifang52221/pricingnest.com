# Site Turnaround Batch 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Run one mixed turnaround batch that removes another narrow set of weak
indexed guide inventory and rewrites the three retained guides most capable of
making the site feel smaller, sharper, and more original.

**Architecture:** Keep the current Astro site architecture, governance layer,
and retained-core testing approach. First lock the next guide contraction wave
with failing governance tests, then tighten the guide hub curation, then
strengthen retained-guide test expectations before rewriting the three target
guides with clearer decision framing and tighter link concentration.

**Tech Stack:** Astro, Markdown content collections, Node.js file-based tests,
content governance data, static sitemap build

---

### Task 1: Lock guide governance wave 5 with failing tests

**Files:**
- Modify: `tests/content-governance.test.mjs`
- Modify: `tests/sitemap-governance.test.mjs`
- Modify: `tests/recovery-retention-thresholds.test.mjs`

**Step 1: Extend the next noindex guide set**

Add these guide slugs to the expected noindex assertions:

- `api-overage-automation`
- `arpa-growth-levers`
- `churn-reduction-playbook`
- `churn-risk-scoring`
- `monthly-cloud-cost-variance`
- `net-new-mrr-bridge`
- `price-lock-policy`
- `retention-early-warning-signals`

Update the retention threshold in
`tests/recovery-retention-thresholds.test.mjs` so indexed guides must be
`<= 60`.

Update the sitemap exclusion list in `tests/sitemap-governance.test.mjs` to
exclude the same eight guide URLs.

**Step 2: Run the governance checks to verify failure**

Run:

```bash
npm run build
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
```

Expected:

- build completes
- governance tests FAIL because wave 5 slugs are not in governance data yet

### Task 2: Apply guide governance wave 5

**Files:**
- Modify: `src/lib/content-governance-data.mjs`

**Step 1: Add the eight guide slugs to `GUIDE_GOVERNANCE`**

Mark each selected slug as `noindex,follow`.

Keep scope tight:

- do not add new glossary changes in this batch
- do not touch static-page governance in this task

**Step 2: Re-run governance verification**

Run:

```bash
npm run build
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
```

Expected:

- all three governance tests PASS
- indexed guides now remain at or below `60`

**Step 3: Commit**

```bash
git add src/lib/content-governance-data.mjs tests/content-governance.test.mjs tests/sitemap-governance.test.mjs tests/recovery-retention-thresholds.test.mjs
git commit -m "feat: apply site turnaround governance wave 5"
```

### Task 3: Re-curate the guides hub around retained decision pages

**Files:**
- Modify: `src/pages/guides/index.astro`
- Modify: `tests/hub-curation.test.mjs`

**Step 1: Tighten hub expectations first**

Update `tests/hub-curation.test.mjs` so the guides hub must visibly support the
turnaround batch by surfacing:

- `api-cost-estimation`
- `api-pricing-model`
- `storage-costs-and-pricing`
- `price-per-gb-month-explained`

Keep exclusions for weak inventory-style pages.

**Step 2: Run the hub curation test to verify failure**

Run:

```bash
node tests/hub-curation.test.mjs
```

Expected:

- FAIL because the current guides hub does not yet foreground the turnaround
  pages strongly enough

**Step 3: Update the guides hub copy and curation**

Change `src/pages/guides/index.astro` so the hub feels more like a workflow
entry point than a catalogue.

At minimum:

- surface `api-cost-estimation` in the API / pricing-decision path
- keep `api-pricing-model` in the pricing / packaging path
- surface `storage-costs-and-pricing` and `price-per-gb-month-explained` in the
  unit-economics / storage path
- keep the copy focused on "start with the strongest decision guide"

**Step 4: Re-run the hub curation test**

Run:

```bash
node tests/hub-curation.test.mjs
```

Expected: PASS

### Task 4: Tighten retained-guide expectations for the three rewrite targets

**Files:**
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Reference: `tests/guide-trust-data.test.mjs`

**Step 1: Strengthen `api-cost-estimation` expectations**

Update `tests/retained-guide-depth.test.mjs` so `api-cost-estimation` must use
these headings:

- `## When API cost estimation becomes a pricing-structure problem`
- `## Inputs that belong in the cost model before you publish API pricing`
- `## Where API cost models look precise but still misprice the plan`
- `## Cost estimation vs packaging structure vs buyer-facing rate`
- `## How to interpret the calculator outputs`
- `## Next steps`

Update keywords so the page must cover at least four of:

- `vendor pass-through`
- `endpoint mix`
- `burst traffic`
- `fixed overhead`
- `packaging structure`

Update `tests/retained-link-concentration.test.mjs` so the page must include:

- `/guides/api-pricing-model/`
- `/guides/value-metric-selection/`
- `/saas-pricing/api-pricing-calculator/`
- `/saas-pricing/api-cost-estimator/`
- `/glossary/api-call/`
- `/glossary/rate-limit/`

And must exclude:

- `/guides/request-pricing-model/`
- `/guides/api-tier-design/`
- `/guides/commit-and-consume-pricing/`

**Step 2: Strengthen `storage-costs-and-pricing` expectations**

Update `tests/retained-guide-depth.test.mjs` so
`storage-costs-and-pricing` must use these headings:

- `## When storage pricing stops being a simple GB-month problem`
- `## Inputs to confirm before you publish a storage price`
- `## Where storage pricing models hide request and retrieval risk`
- `## GB-month vs request fees vs retrieval fees vs base fee`
- `## How to interpret the calculator outputs`
- `## Next steps`

Update keywords so the page must cover at least four of:

- `archive-heavy`
- `request-heavy`
- `retrieval`
- `base fee`
- `workload mix`

Update `tests/retained-link-concentration.test.mjs` so the page must include:

- `/guides/price-per-gb-month-explained/`
- `/guides/storage-retrieval-fees/`
- `/saas-pricing/storage-cost-calculator/`
- `/saas-pricing/price-per-gb-month-calculator/`
- `/glossary/gb-month/`
- `/glossary/gross-margin/`

And must exclude:

- `/guides/storage-request-costs/`
- `/glossary/storage-costs/`
- `/glossary/cogs/`

**Step 3: Strengthen `price-per-gb-month-explained` expectations**

Update `tests/retained-guide-depth.test.mjs` so
`price-per-gb-month-explained` must use these headings:

- `## When price per GB-month is an honest buyer-facing rate`
- `## Inputs to confirm before publishing a price per GB-month`
- `## Where price per GB-month becomes a misleading average`
- `## Price per GB-month vs request fees vs retrieval fees vs minimum commitment`
- `## How to interpret the calculator outputs`
- `## Next steps`

Update keywords so the page must cover at least four of:

- `workload mix`
- `request-heavy`
- `retrieval-sensitive`
- `replication`
- `base fee`

Update `tests/retained-link-concentration.test.mjs` so the page must include:

- `/guides/storage-costs-and-pricing/`
- `/guides/storage-retrieval-fees/`
- `/saas-pricing/storage-cost-calculator/`
- `/saas-pricing/price-per-gb-month-calculator/`
- `/glossary/gb-month/`
- `/glossary/minimum-commitment/`

And must exclude:

- `/guides/storage-request-costs/`
- `/glossary/storage-costs/`
- `/glossary/cogs/`

**Step 4: Run the retained-guide tests to verify failure**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/guide-trust-data.test.mjs
```

Expected:

- retained depth and link concentration FAIL
- trust-data test remains PASS if frontmatter stays valid

### Task 5: Rewrite `api-cost-estimation`

**Files:**
- Modify: `src/content/guides/api-cost-estimation.md`

**Step 1: Refresh the page role in frontmatter**

Keep the existing URL and trust metadata pattern, but refresh:

- `updated`
- `reviewed`
- `sources`

Do not widen the tool list beyond pages directly supporting API pricing
decisions.

**Step 2: Rewrite the body to the stronger retained structure**

The rewritten body should:

- explain when cost estimation is enough and when it still hides a packaging
  problem
- distinguish average traffic from bursty or heavy traffic
- make vendor pass-through, endpoint mix, and fixed overhead explicit
- create a cleaner boundary with `api-pricing-model`
- absorb the most useful practical framing that would otherwise leak into
  `request-pricing-model`, `api-tier-design`, and `commit-and-consume-pricing`

Use exactly the headings locked in Task 4.

**Step 3: Re-run the targeted retained-guide tests**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/guide-trust-data.test.mjs
```

Expected:

- API guide failures are resolved
- other target pages may still fail until later tasks

### Task 6: Rewrite `storage-costs-and-pricing`

**Files:**
- Modify: `src/content/guides/storage-costs-and-pricing.md`

**Step 1: Refresh the page framing**

Keep the URL and retained-core role, but rewrite the page so it clearly handles:

- archive-heavy workloads
- request-heavy workloads
- retrieval-sensitive workloads
- mixed SaaS file-storage workloads

**Step 2: Replace the generic storage framing with the new decision structure**

Use exactly the headings locked in Task 4.

The new body should:

- explain when GB-month is enough and when it is not
- make request, retrieval, and base-fee trade-offs explicit
- avoid reading like a generic storage-cost explainer
- absorb the strongest useful logic from `storage-request-costs`

**Step 3: Re-run the targeted retained-guide tests**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/guide-trust-data.test.mjs
```

Expected:

- storage-costs-and-pricing failures are resolved
- price-per-gb-month-explained may still fail until the next task

### Task 7: Rewrite `price-per-gb-month-explained`

**Files:**
- Modify: `src/content/guides/price-per-gb-month-explained.md`

**Step 1: Reframe the page around honest buyer-facing usage**

Keep the URL, but turn the page into a stronger answer to:

- when `price per GB-month` is honest enough to publish
- when it becomes a misleading blended average
- when request, retrieval, or minimum-commitment structure needs to be visible

**Step 2: Rewrite the body to the stronger retained structure**

Use exactly the headings locked in Task 4.

The new body should:

- connect directly to `storage-cost-calculator`
- connect directly to `storage-costs-and-pricing`
- explain why a seemingly simple headline rate can still mislead both buyer and
  seller

**Step 3: Re-run the retained-guide tests**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/guide-trust-data.test.mjs
```

Expected: PASS

### Task 8: Run the full turnaround-batch verification

**Files:**
- Review: `src/lib/content-governance-data.mjs`
- Review: `src/pages/guides/index.astro`
- Review: `src/content/guides/api-cost-estimation.md`
- Review: `src/content/guides/storage-costs-and-pricing.md`
- Review: `src/content/guides/price-per-gb-month-explained.md`

**Step 1: Run the final verification commands**

Run:

```bash
npm run build
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
node tests/hub-curation.test.mjs
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/guide-trust-data.test.mjs
```

Expected: PASS

**Step 2: Review the diff**

Run:

```bash
git diff -- src/lib/content-governance-data.mjs src/pages/guides/index.astro src/content/guides/api-cost-estimation.md src/content/guides/storage-costs-and-pricing.md src/content/guides/price-per-gb-month-explained.md tests/content-governance.test.mjs tests/sitemap-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/hub-curation.test.mjs tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs
```

Expected:

- no unrelated file churn
- the batch remains constrained to one governance wave, one hub curation pass,
  and three retained-guide rewrites

**Step 3: Commit**

```bash
git add src/lib/content-governance-data.mjs src/pages/guides/index.astro src/content/guides/api-cost-estimation.md src/content/guides/storage-costs-and-pricing.md src/content/guides/price-per-gb-month-explained.md tests/content-governance.test.mjs tests/sitemap-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/hub-curation.test.mjs tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs
git commit -m "feat: run site turnaround batch 1"
```
