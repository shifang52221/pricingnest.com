# Bandwidth Pricing Intent Tightening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the search intent and retained-core support layer around the bandwidth pricing calculator without
changing its formula or overall UX.

**Architecture:** Keep the existing Astro tool-page template. Make the change in the `bandwidth-cost-calculator` block
inside `src/lib/tools.ts`, add a bandwidth-specific curated cluster in `CORE_TOOL_CLUSTER_LINKS`, and lock the new
behavior with focused regression tests before implementation.

**Tech Stack:** Astro, TypeScript, Node.js file-based tests

---

### Task 1: Lock the new bandwidth pricing intent with failing tests

**Files:**
- Create: `tests/bandwidth-pricing-content.test.mjs`
- Modify: `tests/seo-meta.test.mjs`
- Modify: `tests/core-tool-clusters.test.mjs`

**Step 1: Write the dedicated bandwidth pricing content regression test**

Create `tests/bandwidth-pricing-content.test.mjs` so it isolates the `bandwidth-cost-calculator` block in
`src/lib/tools.ts`.

Require the block to include:

- `metaTitle: "Bandwidth Pricing Calculator & Price Per GB Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe bandwidth price from monthly GB egress, blended cost per GB, fixed overhead, and target gross margin. Set a price-per-GB floor, decide when bandwidth should be billed separately or passed through, and test CDN-heavy or regional traffic before publishing rates."`
- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-04-02"`
- `label: "Bandwidth Pricing Guide"`
- `label: "Bandwidth Pricing Guardrails"`
- `label: "CDN Cost Pass-Through"`
- FAQ wording about:
  - `How do I turn blended egress cost into a bandwidth price floor?`
  - `When should bandwidth be priced as a separate line item?`
  - `When should CDN costs be passed through separately?`
  - `How should I handle regional egress differences in pricing?`
  - `When does bandwidth overhead require a base fee or minimum commitment?`
  - `How do I test whether margin still holds for traffic spikes or heavy accounts?`

Reject:

- `Is this a CDN pricing calculator?`
- `What cost per GB should I use?`
- `How do I handle free CDN tiers?`
- `What if bandwidth is a pass-through cost?`

Also require the bandwidth curated cluster to include:

- `/guides/bandwidth-pricing-guide/`
- `/guides/bandwidth-pricing-guardrails/`
- `/guides/cdn-cost-pass-through/`
- `/glossary/egress/`
- `/glossary/bandwidth/`

**Step 2: Update bandwidth SEO expectations**

Modify `tests/seo-meta.test.mjs` so it can support expectation rows without a required custom `name` field, then add a
`bandwidth-cost-calculator` entry expecting:

- `metaTitle: "Bandwidth Pricing Calculator & Price Per GB Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe bandwidth price from monthly GB egress, blended cost per GB, fixed overhead, and target gross margin. Set a price-per-GB floor, decide when bandwidth should be billed separately or passed through, and test CDN-heavy or regional traffic before publishing rates."`

Keep the existing `name` assertions for rows that already define a `name`.

**Step 3: Tighten cluster-link expectations**

Modify `tests/core-tool-clusters.test.mjs` so the bandwidth pricing cluster expects:

- primary guide: `/guides/bandwidth-pricing-guide/`
- support links including:
  - `/guides/bandwidth-pricing-guardrails/`
  - `/guides/cdn-cost-pass-through/`
  - `/glossary/egress/`
  - `/glossary/bandwidth/`

**Step 4: Run tests to verify failure**

Run:

```bash
node tests/bandwidth-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
```

Expected: FAIL because the bandwidth pricing block and curated cluster have not been tightened yet.

### Task 2: Tighten the bandwidth pricing content block

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Keep pricing intent explicit**

Update the bandwidth pricing metadata so the page reads like a pricing-decision tool instead of a generic bandwidth or
CDN calculator.

Target metadata:

- `metaTitle: "Bandwidth Pricing Calculator & Price Per GB Floor | PricingNest"`
- `metaDescription: "Calculate a margin-safe bandwidth price from monthly GB egress, blended cost per GB, fixed overhead, and target gross margin. Set a price-per-GB floor, decide when bandwidth should be billed separately or passed through, and test CDN-heavy or regional traffic before publishing rates."`

Add:

- `reviewedBy: "PricingNest Editorial Team"`
- `reviewed: "2026-04-02"`

**Step 2: Strengthen sources**

Update the bandwidth pricing calculator `sources` so they point to:

- one internal-input source focused on bandwidth billing exports, CDN mix, and regional traffic mix review
- `Bandwidth Pricing Guide`
- `Bandwidth Pricing Guardrails`
- `CDN Cost Pass-Through`

Keep the notes decision-oriented rather than glossary-oriented.

**Step 3: Tighten interpretation and FAQ**

Bias the page toward pricing decisions rather than generic bandwidth explanation.

Replace lower-value FAQ emphasis with decision-oriented questions such as:

- `How do I turn blended egress cost into a bandwidth price floor?`
- `When should bandwidth be priced as a separate line item?`
- `When should CDN costs be passed through separately?`
- `How should I handle regional egress differences in pricing?`
- `When does bandwidth overhead require a base fee or minimum commitment?`
- `Should I use peak or average monthly GB when pricing bandwidth?`
- `How do I test whether margin still holds for traffic spikes or heavy accounts?`
- `Can I combine bandwidth with storage or compute in one plan?`

Remove weaker explanatory phrasing around:

- generic CDN-calculator wording
- raw “what cost should I use?” FAQ framing
- free-tier FAQ emphasis
- pass-through phrasing that is too generic and not tied to packaging decisions

### Task 3: Add the bandwidth curated next-step cluster

**Files:**
- Modify: `src/lib/tools.ts`

**Step 1: Add the bandwidth pricing cluster**

Create `CORE_TOOL_CLUSTER_LINKS["bandwidth-cost-calculator"]` so the page routes to:

- `/guides/bandwidth-pricing-guide/`
- `/guides/bandwidth-pricing-guardrails/`
- `/guides/cdn-cost-pass-through/`
- `/glossary/egress/`
- `/glossary/bandwidth/`

**Step 2: Keep the cluster compact**

Do not expand beyond five links. The goal is concentration, not a larger list.

### Task 4: Re-run targeted verification and build

**Files:**
- Verify: `tests/bandwidth-pricing-content.test.mjs`
- Verify: `tests/seo-meta.test.mjs`
- Verify: `tests/core-tool-clusters.test.mjs`
- Verify: `tests/tool-trust-data.test.mjs`
- Verify: `tests/content-governance.test.mjs`
- Verify: `tests/site-quality-signals.test.mjs`
- Verify: `tests/hub-curation.test.mjs`
- Verify: `tests/navigation-deduping.test.mjs`
- Verify: `npm run build`

**Step 1: Run the targeted verification set**

Run:

```bash
node tests/bandwidth-pricing-content.test.mjs
node tests/seo-meta.test.mjs
node tests/core-tool-clusters.test.mjs
node tests/tool-trust-data.test.mjs
node tests/content-governance.test.mjs
node tests/site-quality-signals.test.mjs
node tests/hub-curation.test.mjs
node tests/navigation-deduping.test.mjs
npm run build
```

Expected: PASS with tighter bandwidth pricing intent and an unchanged calculator build.

### Task 5: Verify the live bandwidth pricing page after deploy

**Files:**
- Verify: production HTML for `/saas-pricing/bandwidth-cost-calculator/`

**Step 1: Re-check live HTML**

Run:

```bash
curl.exe -L https://pricingnest.com/saas-pricing/bandwidth-cost-calculator/ | Select-String -Pattern 'Price Per GB Floor|bandwidth-pricing-guide|bandwidth-pricing-guardrails|cdn-cost-pass-through|Is this a CDN pricing calculator\\?|What cost per GB should I use\\?|How do I handle free CDN tiers\\?|What if bandwidth is a pass-through cost\\?'
```

Expected:

- `Price Per GB Floor` present
- `bandwidth-pricing-guide`, `bandwidth-pricing-guardrails`, and `cdn-cost-pass-through` present
- `Is this a CDN pricing calculator?` absent
- `What cost per GB should I use?` absent
- `How do I handle free CDN tiers?` absent
- `What if bandwidth is a pass-through cost?` absent
