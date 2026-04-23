# Usage Core Batch 3 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Run one mixed batch that removes another narrow set of weak indexed
usage-adjacent guide inventory while turning the retained usage-based pricing
path into a stronger decision workflow.

**Architecture:** Keep the current Astro content architecture, guide governance
layer, and retained-core testing pattern. First lock wave 6 governance with
failing tests. Then tighten retained usage expectations in hub, guide, and tool
cluster tests so the site fails in the right places. Finally update governance,
hubs, cluster links, and the retained usage guide body until the full batch
passes.

**Tech Stack:** Astro, Markdown content collections, Node.js file-based tests,
content governance data, static sitemap build, tool metadata in
`src/lib/tools.ts`

---

### Task 1: Lock guide governance wave 6 with failing tests

**Files:**
- Modify: `tests/content-governance.test.mjs`
- Modify: `tests/sitemap-governance.test.mjs`
- Modify: `tests/recovery-retention-thresholds.test.mjs`

**Step 1: Extend the next guide noindex set**

Add these guide slugs to governance expectations:

- `saas-metrics-cheat-sheet`
- `unit-economics-model-template`
- `usage-cap-communication`
- `usage-pricing-onboarding`
- `usage-tier-breakpoints`

Update the indexed guide threshold in
`tests/recovery-retention-thresholds.test.mjs` from `<= 60` to `<= 55`.

Update sitemap expectations in `tests/sitemap-governance.test.mjs` to exclude
the same five guide URLs.

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
- all three governance tests FAIL because wave 6 slugs are not yet in
  governance data and indexed guide count is still above `55`

### Task 2: Apply guide governance wave 6

**Files:**
- Modify: `src/lib/content-governance-data.mjs`

**Step 1: Add the five wave 6 guide slugs**

Mark each selected guide as `noindex,follow`.

Keep scope tight:

- no glossary wave in this batch
- no static-page governance changes
- do not touch `monthly-cloud-cost-breakdown`

**Step 2: Re-run governance verification**

Run:

```bash
npm run build
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
```

Expected: PASS

### Task 3: Lock the retained usage-core expectations with failing tests

**Files:**
- Modify: `tests/hub-curation.test.mjs`
- Modify: `tests/retained-guide-depth.test.mjs`
- Modify: `tests/retained-link-concentration.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`

**Step 1: Tighten homepage, guides hub, and toolkit hub usage expectations**

Update `tests/hub-curation.test.mjs` so:

- homepage must frame usage pricing as a buyer-estimation and bill-shock
  decision, not just a first pricing model
- homepage must include `/guides/usage-based-pricing-examples/`
- homepage must include `/glossary/overage/`
- guides hub must more clearly foreground `usage-based-pricing-examples` inside
  the retained packaging / pricing path
- toolkit hub must include `/guides/usage-based-pricing-examples/`
- toolkit hub must include `/glossary/overage/`
- toolkit hub must still exclude weaker wave-6 inventory pages

**Step 2: Tighten retained guide depth for `usage-based-pricing-examples`**

Update `tests/retained-guide-depth.test.mjs` so the guide requires:

- `## When usage pricing becomes a packaging-structure decision`
- `## Inputs to confirm before you publish a buyer-facing usage price`
- `## Where usage-based models create bill shock and margin leakage`
- `## Price per unit vs tiers vs included usage vs overage vs minimum commitment`
- `## How to interpret the calculator outputs`
- `## Next steps`

Refresh keywords so the page must cover at least four of:

- `value metric`
- `buyer estimation`
- `bill shock`
- `included usage`
- `overage`
- `minimum commitment`

**Step 3: Tighten retained link concentration for the retained usage guide**

Update `tests/retained-link-concentration.test.mjs` so
`usage-based-pricing-examples` must include:

- `/guides/value-metric-selection/`
- `/guides/minimum-commitment-model/`
- `/saas-pricing/usage-based-pricing-calculator/`
- `/saas-pricing/tiered-usage-pricing-calculator/`
- `/glossary/value-metric/`
- `/glossary/overage/`

And must exclude:

- `/guides/usage-cap-communication/`
- `/guides/usage-pricing-onboarding/`
- `/guides/usage-tier-breakpoints/`
- `/glossary/usage-forecast/`

**Step 4: Tighten the usage calculator core cluster**

Update `tests/core-tool-clusters.test.mjs` so
`usage-based-pricing-calculator` expects:

- primary guide `/guides/value-metric-selection/`
- support from `/guides/usage-based-pricing-examples/`,
  `/guides/minimum-commitment-model/`, `/glossary/value-metric/`,
  `/glossary/usage-based-pricing/`, `/glossary/overage/`

**Step 5: Run the tightened usage-core tests to verify failure**

Run:

```bash
node tests/hub-curation.test.mjs
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected:

- homepage / hub checks FAIL because the usage path is still too generic
- retained guide depth FAILS because `usage-based-pricing-examples` still reads
  like a general examples page
- retained link concentration FAILS because the guide does not yet point to the
  tighter retained usage set
- core tool clusters FAIL because the usage calculator cluster still uses the
  older broader support mix

### Task 4: Re-curate the usage path on homepage, guides hub, and toolkit hub

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/saas-pricing/index.astro`

**Step 1: Update homepage usage decision paths**

Change the homepage so usage pricing is presented more clearly as a retained
pricing decision.

At minimum one homepage path should route through:

- `/saas-pricing/usage-based-pricing-calculator/`
- `/guides/value-metric-selection/`
- `/guides/usage-based-pricing-examples/`
- `/glossary/overage/`

Avoid wording that frames the path as only "set a first pricing model."

**Step 2: Re-curate the guides hub**

Update `src/pages/guides/index.astro` so usage-based pricing examples is more
visibly part of the retained pricing / packaging path rather than just another
support page in a longer list.

**Step 3: Update the toolkit hub usage workflow**

Change `src/pages/saas-pricing/index.astro` so the usage workflow foregrounds:

- value metric selection
- retained usage examples
- overage awareness
- a smaller, clearer reading path

**Step 4: Re-run hub curation verification**

Run:

```bash
node tests/hub-curation.test.mjs
```

Expected: PASS

### Task 5: Tighten the usage calculator support cluster

**Files:**
- Modify: `src/lib/tools.ts`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/usage-based-content.test.mjs`

**Step 1: Update `CORE_TOOL_CLUSTER_LINKS` for `usage-based-pricing-calculator`**

Adjust the retained support chain so the usage calculator uses:

- primary guide `value-metric-selection`
- retained support guide `usage-based-pricing-examples`
- floor guide `minimum-commitment-model`
- glossary support from `value-metric`, `usage-based-pricing`, and `overage`

Do not change calculator formulas or expand the cluster beyond this retained
path.

**Step 2: Re-run usage tool verification**

Run:

```bash
node tests/core-tool-clusters.test.mjs
node tests/usage-based-content.test.mjs
```

Expected: PASS

### Task 6: Rewrite `usage-based-pricing-examples` as a retained decision guide

**Files:**
- Modify: `src/content/guides/usage-based-pricing-examples.md`
- Verify: `tests/retained-guide-depth.test.mjs`
- Verify: `tests/retained-link-concentration.test.mjs`
- Verify: `tests/guide-trust-data.test.mjs`

**Step 1: Refresh frontmatter and retained support boundaries**

Update:

- `updated`
- `reviewed`
- `sources`

Keep the URL and broad retained role, but narrow the page so it supports buyer
estimation, bill-shock prevention, packaging structure, and fixed-cost recovery
decisions.

**Step 2: Rewrite the body to the stronger retained structure**

Use exactly these headings:

- `## When usage pricing becomes a packaging-structure decision`
- `## Inputs to confirm before you publish a buyer-facing usage price`
- `## Where usage-based models create bill shock and margin leakage`
- `## Price per unit vs tiers vs included usage vs overage vs minimum commitment`
- `## How to interpret the calculator outputs`
- `## Next steps`

The new body should:

- explain when a simple price per unit is strong enough to publish
- show when included usage, overage, or a minimum commitment is the real
  packaging answer
- strengthen the boundary with weaker usage-support inventory
- connect tightly to `value-metric-selection`,
  `usage-based-pricing-calculator`, and
  `tiered-usage-pricing-calculator`

**Step 3: Re-run targeted guide verification**

Run:

```bash
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/guide-trust-data.test.mjs
```

Expected: PASS

### Task 7: Run final usage-core verification

**Files:**
- Review: `src/lib/content-governance-data.mjs`
- Review: `src/pages/index.astro`
- Review: `src/pages/guides/index.astro`
- Review: `src/pages/saas-pricing/index.astro`
- Review: `src/lib/tools.ts`
- Review: `src/content/guides/usage-based-pricing-examples.md`

**Step 1: Run the final command set**

Run:

```bash
npm run build
node tests/content-governance.test.mjs
node tests/sitemap-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
node tests/hub-curation.test.mjs
node tests/retained-guide-depth.test.mjs
node tests/retained-link-concentration.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/usage-based-content.test.mjs
node tests/guide-trust-data.test.mjs
```

Expected: PASS

**Step 2: Review the constrained diff**

Run:

```bash
git diff -- src/lib/content-governance-data.mjs src/pages/index.astro src/pages/guides/index.astro src/pages/saas-pricing/index.astro src/lib/tools.ts src/content/guides/usage-based-pricing-examples.md tests/content-governance.test.mjs tests/sitemap-governance.test.mjs tests/recovery-retention-thresholds.test.mjs tests/hub-curation.test.mjs tests/retained-guide-depth.test.mjs tests/retained-link-concentration.test.mjs tests/core-tool-clusters.test.mjs
```

Expected:

- no unrelated file churn
- batch remains limited to one governance wave, one retained usage rewrite,
  hub curation, and one usage cluster refresh
