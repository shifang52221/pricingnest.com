# PricingNest Low-Quality Recovery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce low-quality-site risk on `pricingnest.com` by shrinking the thin indexable surface, strengthening the five core calculator clusters, and tightening trust and curation signals across retained pages.

**Architecture:** Treat the existing calculators as the primary ranking layer and convert guides/glossary into a much smaller retained support layer. Implement this as governance-first changes in `content-governance`, then deepen a limited set of retained content pages, then tighten hubs and core-tool pathways so Google and users both see a clearer site structure.

**Tech Stack:** Astro, TypeScript, Markdown content collections, Node.js file-based tests

---

## Execution Order And Batch Size

This recovery should not be executed as scattered one-off edits. Use four controlled waves with clear exit criteria.

### Wave 1: Index Surface Control

Purpose: reduce low-quality-site risk quickly before doing broader content work.

Batch size:

- `35-45` guides moved to `noindex,follow`
- `20-25` glossary entries moved to `noindex,follow`
- `1` governance pass in `src/lib/content-governance-data.mjs`
- `1` verification pass for sitemap and governance tests

Do not do in this wave:

- large content rewrites
- design or layout changes beyond hub alignment required by the new retained set

Exit criteria:

- indexed guides are reduced to roughly `80-90`
- indexed glossary entries are reduced to roughly `65-70`
- sitemap excludes the newly noindexed URLs
- guide and glossary hubs no longer spotlight weak pages

### Wave 2: First Core Cluster Deepening

Purpose: strengthen the strongest commercial-intent cluster first.

Batch size:

- `2` retained guides rewritten in depth
- `3-4` retained glossary pages upgraded
- `2` core tool clusters tightened in metadata/template links

Recommended focus:

- storage cluster
- compute cluster

Exit criteria:

- storage and compute tools each point to a deliberate support path
- the rewritten guides read like decision aids, not checklist pages
- retained glossary pages explain how to interpret the tool outputs

### Wave 3: Second Core Cluster Deepening

Purpose: strengthen the next most important intent cluster without expanding inventory.

Batch size:

- `2` retained guides rewritten in depth
- `3-4` retained glossary pages upgraded
- `2` core tool clusters tightened in metadata/template links

Recommended focus:

- API pricing cluster
- usage-based pricing cluster

Exit criteria:

- API and usage-based tool pages have clean next-step pathways
- the support pages cover modeling trade-offs, not just definitions
- no duplicate or weak support links remain in the cluster output

### Wave 4: Final Core Page Strengthening And Trust Pass

Purpose: finish the retained commercial-support layer and align site trust signals.

Batch size:

- `1` retained guide rewritten in depth
- `2-3` retained glossary pages upgraded
- `1` trust and UX pass across hub/tool retained pages
- `1` cleanup review for redundant planning files

Recommended focus:

- annual discount cluster
- sitewide methodology and review consistency

Exit criteria:

- all five core calculator clusters are complete
- retained pages have consistent editorial and methodology cues
- only clearly useful local changes remain in the working tree

### Observation Window

After Wave 4, pause expansion and observe for `2-4` weeks.

During this period:

- do not publish new thin support pages
- monitor GSC impressions, average position, and page distribution weekly
- only make surgical fixes if a clear issue appears

## Workload Rules

To keep execution focused:

- never rewrite more than `2 guides` in one batch except the final single-guide wave
- never rewrite more than `4 glossary pages` in one batch
- governance/noindex work can be done in larger batches because it is centralized and testable
- do not mix broad governance changes and broad content rewrites in the same day unless verification is already green
- every wave must end with tests plus a build before moving to the next wave

## Success Sequence

The order matters:

1. shrink the weak indexable surface
2. strengthen the five calculator clusters
3. tighten hub and trust signals around the retained set
4. observe recovery before any new expansion

### Task 1: Lock recovery targets with a failing retention test

**Files:**
- Create: `tests/recovery-retention-thresholds.test.mjs`

**Step 1: Write the failing test**

Add a file-based test that:

- loads `src/lib/content-governance-data.mjs`
- scans `src/content/guides/*.md` and `src/content/glossary/*.md`
- counts indexable guides and glossary pages
- fails unless:
  - indexable guides are `<= 40`
  - indexable glossary entries are `<= 30`
- fails unless a first batch of known thin pages is marked `noindex,follow`

First batch of must-noindex candidates:

- guides:
  - `pricing-page-case-studies`
  - `usage-alerts-design`
  - `pricing-page-competitive-positioning`
  - `feature-bundling-framework`
  - `revenue-leakage-audit`
  - `expansion-forecasting`
  - `support-cost-allocation`
  - `annual-renewal-strategy`
  - `onboarding-milestone-pricing`
  - `pricing-page-copy`
- glossary:
  - `tiers`
  - `unit-economics`
  - `throttling`
  - `platform-fee`
  - `usage-cap`
  - `fixed-cost`
  - `payback-period`
  - `per-seat`
  - `net-new-mrr`
  - `discount`

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/recovery-retention-thresholds.test.mjs
```

Expected: FAIL because the current indexable counts are still far above the target and several listed pages are still indexed.

### Task 2: Expand governance data for second-pass index control

**Files:**
- Modify: `src/lib/content-governance-data.mjs`
- Modify: `tests/content-governance.test.mjs`

**Step 1: Expand the `noindex,follow` inventory**

Update `GUIDE_GOVERNANCE` and `GLOSSARY_GOVERNANCE` so they reflect the balanced recovery strategy:

- noindex thin, generic, repetitive support pages
- keep only pages that have clear standalone search value or strong calculator-cluster support
- document the reason for each new group with short comments

Use these target buckets:

- Keep indexed guides mainly for:
  - pricing calculators decision support
  - cost and margin interpretation
  - usage-based pricing decisions
  - annual discount evaluation
- Keep indexed glossary mainly for:
  - unit economics basics
  - pricing mechanics needed by the tools
  - a small number of high-value retention and packaging terms

**Step 2: Update governance regression coverage**

Extend `tests/content-governance.test.mjs` so it checks a larger representative set of second-pass noindex slugs.

**Step 3: Run focused tests**

Run:

```bash
node tests/content-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
```

Expected: PASS once the new governance set brings indexable counts into the target range.

### Task 3: Keep sitemap and hubs aligned with retained content

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/glossary/index.astro`
- Modify: `tests/sitemap-governance.test.mjs`
- Modify: `tests/hub-curation.test.mjs`

**Step 1: Tighten sitemap behavior**

Confirm sitemap filtering excludes all newly noindexed URLs and still includes core calculators and the strongest retained support pages.

**Step 2: Tighten hub curation**

Change both hub pages so they:

- feature retained pages only
- avoid broad “browse everything” behavior that re-surfaces weak inventory
- emphasize curated pathways into the calculator clusters

Specific expectations:

- `src/pages/guides/index.astro` should route users into decision guides for storage, compute, usage pricing, API pricing, and annual discount decisions.
- `src/pages/glossary/index.astro` should route users into only the terms that help interpret calculator outputs and pricing trade-offs.

**Step 3: Run focused verification**

Run:

```bash
npm run build
node tests/sitemap-governance.test.mjs
node tests/hub-curation.test.mjs
```

Expected: PASS with noindexed URLs absent from `dist/sitemap-0.xml` and hub copy reflecting curated retained content.

### Task 4: Lock core-tool support clusters before editing content

**Files:**
- Create: `tests/core-tool-clusters.test.mjs`
- Modify: `src/lib/tools.ts`
- Modify: `src/pages/saas-pricing/[slug].astro`

**Step 1: Write the failing cluster test**

Add a test that asserts each of these tool slugs has a deliberate support cluster in metadata and/or template output:

- `storage-cost-calculator`
- `api-pricing-calculator`
- `usage-based-pricing-calculator`
- `compute-cost-estimator`
- `annual-discount-calculator`

The test should require:

- at least one retained guide per tool
- at least two retained glossary/support links per tool
- no duplicate “recommended next step” links

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/core-tool-clusters.test.mjs
```

Expected: FAIL because tool-to-support clusters are not yet explicit enough.

**Step 3: Add the minimal cluster metadata**

Update `src/lib/tools.ts` and `src/pages/saas-pricing/[slug].astro` so the five core calculators point to a smaller, more deliberate set of support links rather than generic related-content output.

**Step 4: Re-run focused tests**

Run:

```bash
node tests/core-tool-clusters.test.mjs
node tests/template-quality.test.mjs
node tests/core-tool-depth.test.mjs
```

Expected: PASS with core tools showing a stronger, cleaner next-step path.

### Task 5: Deepen the storage and compute retained guides

**Files:**
- Modify: `src/content/guides/storage-costs-and-pricing.md`
- Modify: `src/content/guides/compute-cost-modeling.md`
- Create: `tests/retained-guide-depth.test.mjs`

**Step 1: Write the failing depth test**

Add checks for retained guide quality rather than exact prose. For these two guides, require:

- practical decision sections
- cost-model or trade-off vocabulary
- calculator links
- glossary links
- minimum word-count threshold appropriate for indexed guides

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/retained-guide-depth.test.mjs
```

Expected: FAIL because the current guide versions are still too light.

**Step 3: Rewrite the two guides as decision aids**

Each guide should answer:

- when the pricing model fits
- what inputs matter most
- where teams usually underprice
- how to interpret calculator results
- which follow-up glossary terms matter

**Step 4: Re-run focused tests**

Run:

```bash
node tests/retained-guide-depth.test.mjs
```

Expected: PASS for the storage and compute guides.

### Task 6: Deepen the API and usage-based retained guides

**Files:**
- Modify: `src/content/guides/api-cost-estimation.md`
- Modify: `src/content/guides/usage-based-pricing-examples.md`
- Modify: `tests/retained-guide-depth.test.mjs`

**Step 1: Extend the depth test for these two guides**

Require topic-specific signals such as:

- API pricing:
  - rate limits
  - request volume
  - bundled vs overage logic
- usage-based pricing:
  - value metric choice
  - usage forecast
  - bill-shock avoidance

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/retained-guide-depth.test.mjs
```

Expected: FAIL for the API and usage-based guides.

**Step 3: Rewrite both guides**

Make the pages useful for readers comparing packaging options, estimating cost exposure, and deciding how to interpret the core calculators.

**Step 4: Re-run focused tests**

Run:

```bash
node tests/retained-guide-depth.test.mjs
```

Expected: PASS for all four retained guides covered so far.

### Task 7: Deepen the annual discount decision page and its trust signals

**Files:**
- Modify: `src/content/guides/annual-prepay-discount.md`
- Modify: `tests/retained-guide-depth.test.mjs`

**Step 1: Extend the depth test**

Require the annual discount guide to cover:

- discount guardrails
- cash-flow trade-offs
- payback and retention assumptions
- cases where annual discounts should be smaller or avoided

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/retained-guide-depth.test.mjs
```

Expected: FAIL for `annual-prepay-discount`.

**Step 3: Rewrite the guide**

Make it a real decision page that supports `/saas-pricing/annual-discount-calculator/` rather than a light explainer.

**Step 4: Re-run the depth test**

Run:

```bash
node tests/retained-guide-depth.test.mjs
```

Expected: PASS for all retained guide targets.

### Task 8: Upgrade the retained glossary layer

**Files:**
- Modify: `src/content/glossary/value-metric.md`
- Modify: `src/content/glossary/pricing-metric.md`
- Modify: `src/content/glossary/unit-cost.md`
- Modify: `src/content/glossary/gross-margin.md`
- Modify: `src/content/glossary/included-usage.md`
- Modify: `src/content/glossary/overage.md`
- Modify: `src/content/glossary/minimum-commitment.md`
- Modify: `src/content/glossary/gb-month.md`
- Create: `tests/retained-glossary-depth.test.mjs`

**Step 1: Write the failing glossary-depth test**

Require each retained glossary page to include:

- a precise definition
- why the term matters in pricing decisions
- at least one calculator or guide cross-link
- examples or interpretation help
- enough depth to justify indexation

**Step 2: Run test to verify it fails**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
```

Expected: FAIL because the retained glossary layer is still too short.

**Step 3: Rewrite the retained glossary pages**

Upgrade them from short dictionary entries into concise but useful interpretation pages that help readers understand the calculators and adjacent guides.

**Step 4: Re-run focused tests**

Run:

```bash
node tests/retained-glossary-depth.test.mjs
node tests/editorial-metadata.test.mjs
```

Expected: PASS with stronger retained glossary pages and intact editorial metadata.

### Task 9: Full verification and working-tree cleanup

**Files:**
- Review: `docs/plans/2026-03-27-decision-guide-depth-design.md`
- Review: `docs/plans/2026-03-27-decision-guide-depth.md`
- Review: `docs/plans/2026-03-27-low-quality-risk-reduction-phase2.md`
- Review: `docs/plans/2026-03-27-site-quality-trust-design.md`
- Review: `docs/plans/2026-03-27-site-quality-trust.md`
- Verify: `tests/*.mjs`

**Step 1: Run targeted regression suite**

Run:

```bash
node tests/content-governance.test.mjs
node tests/recovery-retention-thresholds.test.mjs
node tests/sitemap-governance.test.mjs
node tests/hub-curation.test.mjs
node tests/template-quality.test.mjs
node tests/editorial-metadata.test.mjs
node tests/core-tool-depth.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/retained-guide-depth.test.mjs
node tests/retained-glossary-depth.test.mjs
node tests/site-quality-signals.test.mjs
```

Expected: All pass.

**Step 2: Run build verification**

Run:

```bash
npm run build
```

Expected: PASS and regenerated sitemap respects governance.

**Step 3: Clean up only confirmed-redundant docs**

Compare older `docs/plans/2026-03-27-*.md` files against:

- `docs/plans/2026-03-30-low-quality-recovery-design.md`
- `docs/plans/2026-03-30-low-quality-recovery.md`

Delete only documents whose guidance is fully superseded. Keep anything still useful for implementation history.

**Step 4: Commit the recovery batch**

Run:

```bash
git add src/lib/content-governance-data.mjs src/lib/content-governance.ts astro.config.mjs src/pages/guides/index.astro src/pages/glossary/index.astro src/pages/saas-pricing/[slug].astro src/lib/tools.ts src/content/guides/*.md src/content/glossary/*.md tests/*.mjs docs/plans/2026-03-30-low-quality-recovery-design.md docs/plans/2026-03-30-low-quality-recovery.md
git commit -m "feat: reduce low-quality index risk and strengthen core clusters"
```

Expected: A clean commit containing the governance pass, retained-page upgrades, and the new planning docs.
