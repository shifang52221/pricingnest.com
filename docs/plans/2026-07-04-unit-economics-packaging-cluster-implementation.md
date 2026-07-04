# Unit Economics and Packaging Cluster Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen one weak retained guide and five thin glossary pages into a coherent, trust-forward unit-economics
and packaging cluster.

**Architecture:** Keep the page set small and retained. Upgrade each page by clarifying editorial role, adding stronger
trust metadata, tightening adjacent-page routing, and expanding only where it improves decision usefulness. Preserve the
site's anti-template posture by avoiding broad content spray.

**Tech Stack:** Astro content markdown, Node audit scripts, governance tests, static build

---

### Task 1: Refresh the practical guide

**Files:**
- Modify: `src/content/guides/pricing-experiments-playbook.md`

**Step 1: Rewrite the frontmatter**

Add stronger trust fields and review framing:

```md
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-07-04"
sources:
  - kind: "internal-input"
    label: "Pricing experiment planning review"
    note: "Confirm the hypothesis, exposure scope, customer risk, and evaluation window before changing visible pricing."
```

**Step 2: Replace the thin checklist structure**

Rewrite the page so it covers:

- when pricing experiments are worth running
- which experiment types belong on this page
- how to set success metrics and guardrails
- how to interpret outcomes before rollout

**Step 3: Add stronger routing**

Link to the most relevant calculators and adjacent unit-economics pages rather than generic related links.

**Step 4: Review for overlap**

Remove generic filler or repeated bullets so the page reads like a retained guide, not an inflated checklist.

**Step 5: Commit**

```bash
git add src/content/guides/pricing-experiments-playbook.md
git commit -m "docs: strengthen pricing experiments playbook"
```

### Task 2: Strengthen the unit economics chain

**Files:**
- Modify: `src/content/glossary/cac.md`
- Modify: `src/content/glossary/ltv.md`
- Modify: `src/content/glossary/cogs.md`
- Modify: `src/content/glossary/support-costs.md`

**Step 1: Add trust metadata to each page**

Bring each page to the retained-page standard with:

```md
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-07-04"
sources:
  - kind: "internal-input"
    label: "..."
    note: "..."
```

**Step 2: Clarify page role boundaries**

Rewrite each page so:

- `cac` answers acquisition-cost discipline and segmentation
- `ltv` answers long-run gross-profit value and model fragility
- `cogs` answers delivery-cost boundaries and margin floors
- `support-costs` answers a specific cost driver that affects COGS and packaging

**Step 3: Add interpretation mistakes and next-step routing**

Each page should include common mistakes plus links to the right calculators, guides, or adjacent glossary terms.

**Step 4: Remove repeated explanations**

Cut any repeated generic pricing advice so the pages read as adjacent parts of one system.

**Step 5: Commit**

```bash
git add src/content/glossary/cac.md src/content/glossary/ltv.md src/content/glossary/cogs.md src/content/glossary/support-costs.md
git commit -m "docs: strengthen unit economics glossary cluster"
```

### Task 3: Rebuild the bridge page

**Files:**
- Modify: `src/content/glossary/packaging.md`

**Step 1: Add trust metadata**

Add the retained-page trust fields and source framing.

**Step 2: Rewrite the body around economic constraints**

Explain:

- when packaging becomes the real pricing problem
- how customer stages, feature bundles, and limits interact
- how COGS and support burden should influence plan structure
- when to move into `pricing-tier-design` or related pages

**Step 3: Tighten cluster links**

Use links to connect `packaging` to:

- `pricing-tier-design`
- `value-metric-selection`
- `cogs`
- `support-costs`

**Step 4: Remove generic glossary-style filler**

Make sure the page reads like an editorial bridge, not a template definition.

**Step 5: Commit**

```bash
git add src/content/glossary/packaging.md
git commit -m "docs: strengthen packaging bridge page"
```

### Task 4: Verify the cluster and ship

**Files:**
- Review: `src/content/guides/pricing-experiments-playbook.md`
- Review: `src/content/glossary/cac.md`
- Review: `src/content/glossary/ltv.md`
- Review: `src/content/glossary/cogs.md`
- Review: `src/content/glossary/support-costs.md`
- Review: `src/content/glossary/packaging.md`

**Step 1: Run governance checks**

Run: `node tests/content-governance.test.mjs`  
Expected: PASS

**Step 2: Run audit**

Run: `node scripts/audit.mjs`  
Expected: PASS

**Step 3: Run production build**

Run: `npm run build`  
Expected: PASS

**Step 4: Spot-check generated output**

Confirm each updated page surfaces the new `updated` date and the added trust or source sections in the built or live
output.

**Step 5: Commit**

```bash
git add src/content/guides/pricing-experiments-playbook.md src/content/glossary/cac.md src/content/glossary/ltv.md src/content/glossary/cogs.md src/content/glossary/support-costs.md src/content/glossary/packaging.md
git commit -m "docs: strengthen unit economics and packaging cluster"
```
