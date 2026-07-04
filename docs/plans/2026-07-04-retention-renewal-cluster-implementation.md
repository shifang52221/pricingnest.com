# Retention and Renewal Cluster Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen six thin retained retention and renewal guides into one coherent, trust-forward cluster.

**Architecture:** Keep the retained set small and focused. Upgrade each page by clarifying the page's commercial role,
adding trust metadata, improving source framing, and tightening the decision path between expansion, renewals,
contraction, cohort validation, and churn feedback.

**Tech Stack:** Astro content markdown, Node audit scripts, governance tests, static build

---

### Task 1: Document the cluster roles

**Files:**
- Review: `src/content/guides/mrr-expansion-tracking.md`
- Review: `src/content/guides/annual-renewal-strategy.md`
- Review: `src/content/guides/renewal-forecasting.md`
- Review: `src/content/guides/downgrade-prevention.md`
- Review: `src/content/guides/retention-cohort-benchmarks.md`
- Review: `src/content/guides/churn-survey-insights.md`

**Step 1: Confirm current overlap**

Map which pages currently discuss:

- renewals
- expansion
- contraction
- cohort validation
- churn reasons

**Step 2: Define the role split**

Assign one primary question to each page before rewriting.

**Step 3: Commit**

```bash
git add docs/plans/2026-07-04-retention-renewal-cluster-design.md docs/plans/2026-07-04-retention-renewal-cluster-implementation.md
git commit -m "docs: add retention renewal cluster plan"
```

### Task 2: Rebuild the expansion and renewal core

**Files:**
- Modify: `src/content/guides/mrr-expansion-tracking.md`
- Modify: `src/content/guides/annual-renewal-strategy.md`
- Modify: `src/content/guides/renewal-forecasting.md`

**Step 1: Add trust metadata**

Bring all three pages to the retained-page standard with:

```md
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-07-04"
sources:
  - kind: "internal-input"
    label: "..."
    note: "..."
```

**Step 2: Rewrite each page around its role**

- `mrr-expansion-tracking`: define expansion clearly, separate it from new-logo growth, and explain distortion risks
- `annual-renewal-strategy`: explain how to prepare, segment, communicate, and decide at renewal
- `renewal-forecasting`: explain how to estimate timing, risk, and revenue effect over time

**Step 3: Add decision routing**

Link each page to the most relevant calculators and adjacent pages so the cluster teaches next steps.

**Step 4: Commit**

```bash
git add src/content/guides/mrr-expansion-tracking.md src/content/guides/annual-renewal-strategy.md src/content/guides/renewal-forecasting.md
git commit -m "docs: strengthen retention renewal core guides"
```

### Task 3: Rebuild the risk and validation support pages

**Files:**
- Modify: `src/content/guides/downgrade-prevention.md`
- Modify: `src/content/guides/retention-cohort-benchmarks.md`
- Modify: `src/content/guides/churn-survey-insights.md`

**Step 1: Add trust metadata**

Bring all three pages to the retained-page standard.

**Step 2: Rewrite around clear operating questions**

- `downgrade-prevention`: explain contraction signals, weak tier fit, and downgrade-specific response
- `retention-cohort-benchmarks`: explain how to validate changes through cohort baselines instead of headline averages
- `churn-survey-insights`: explain how to turn churn reasons into concrete pricing, packaging, or onboarding work

**Step 3: Remove checklist-only filler**

Cut repeated generic advice and keep only material that helps a reader decide what to do next.

**Step 4: Commit**

```bash
git add src/content/guides/downgrade-prevention.md src/content/guides/retention-cohort-benchmarks.md src/content/guides/churn-survey-insights.md
git commit -m "docs: strengthen retention risk guides"
```

### Task 4: Verify and package the wave

**Files:**
- Review: `src/content/guides/mrr-expansion-tracking.md`
- Review: `src/content/guides/annual-renewal-strategy.md`
- Review: `src/content/guides/renewal-forecasting.md`
- Review: `src/content/guides/downgrade-prevention.md`
- Review: `src/content/guides/retention-cohort-benchmarks.md`
- Review: `src/content/guides/churn-survey-insights.md`

**Step 1: Run governance checks**

Run: `node tests/content-governance.test.mjs`  
Expected: PASS

**Step 2: Run audit**

Run: `node scripts/audit.mjs`  
Expected: PASS

**Step 3: Run build**

Run: `npm run build`  
Expected: PASS

**Step 4: Spot-check rendered output**

Confirm the updated date, review block, and source block appear in generated output for the updated pages.

**Step 5: Commit**

```bash
git add src/content/guides/mrr-expansion-tracking.md src/content/guides/annual-renewal-strategy.md src/content/guides/renewal-forecasting.md src/content/guides/downgrade-prevention.md src/content/guides/retention-cohort-benchmarks.md src/content/guides/churn-survey-insights.md
git commit -m "docs: strengthen retention and renewal cluster"
```
