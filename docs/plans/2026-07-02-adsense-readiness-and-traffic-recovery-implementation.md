# AdSense Readiness And Traffic Recovery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strengthen `pricingnest.com` for Google AdSense approval while improving click capture and reducing visible low-value signals on the site's highest-priority pages.

**Architecture:** Improve approval-critical trust and policy pages first, then refresh the search-facing promise and first-screen experience of the top calculator pages, then reduce visible low-value surface area. Keep the work incremental and measurable so the site can be reviewed again after a short observation window.

**Tech Stack:** Astro, Markdown content collections, existing governance helpers, static build output, local Node.js audit scripts.

---

### Task 1: Audit current approval-critical pages and capture baseline notes

**Files:**
- Review: `src/pages/about.astro`
- Review: `src/pages/contact.astro`
- Review: `src/pages/privacy-policy.astro`
- Review: `src/pages/cookie-policy.astro`
- Review: `src/pages/terms.astro`
- Create: `docs/reports/pricingnest-approval-baseline-2026-07-02.md`
- Test: none

**Step 1: Re-read the approval-critical pages**

Review the current content and identify:

- thin sections
- missing legal or trust details
- wording that sounds placeholder-like

**Step 2: Capture a baseline approval memo**

Create `docs/reports/pricingnest-approval-baseline-2026-07-02.md` with:

- pages reviewed
- weaknesses found
- what must change before reapplying

**Step 3: Verify the memo exists**

Run: `Get-Content docs/reports/pricingnest-approval-baseline-2026-07-02.md`

Expected: the baseline memo renders with clear findings.

**Step 4: Commit**

```bash
git add docs/reports/pricingnest-approval-baseline-2026-07-02.md
git commit -m "docs: add AdSense approval baseline memo"
```

### Task 2: Strengthen the Terms page

**Files:**
- Modify: `src/pages/terms.astro`
- Test: `npm run build`

**Step 1: Write the desired structure as inline copy targets**

Add sections that clearly cover:

- informational nature of the site
- no guarantee of business outcomes
- user responsibility for validating assumptions
- acceptable use
- intellectual property
- correction and contact path

**Step 2: Run build mentally against page structure**

Confirm the new page will still fit the site's layout and tone.

**Step 3: Implement the expanded Terms content**

Write the minimal responsible copy to make the page look like a real operating page, not a placeholder.

**Step 4: Run build**

Run: `npm run build`

Expected: PASS and `dist/terms/index.html` is generated.

**Step 5: Commit**

```bash
git add src/pages/terms.astro
git commit -m "content: strengthen terms page for approval readiness"
```

### Task 3: Strengthen Privacy and Cookie policies

**Files:**
- Modify: `src/pages/privacy-policy.astro`
- Modify: `src/pages/cookie-policy.astro`
- Test: `npm run build`

**Step 1: Define the missing sections**

Expand the pages to better cover:

- what data is and is not collected
- analytics and advertising behavior
- consent handling
- cookie choices
- contact and correction path

**Step 2: Implement Privacy improvements**

Add enough detail to make the page read like a maintained policy page.

**Step 3: Implement Cookie improvements**

Add enough detail to make the cookie policy credible and user-facing.

**Step 4: Run build**

Run: `npm run build`

Expected: PASS and both pages build without layout regressions.

**Step 5: Commit**

```bash
git add src/pages/privacy-policy.astro src/pages/cookie-policy.astro
git commit -m "content: strengthen privacy and cookie policies"
```

### Task 4: Improve approval-critical trust copy on About and Contact

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/contact.astro`
- Test: `npm run build`

**Step 1: Identify missing trust statements**

Focus on:

- editorial responsibility
- correction handling
- response expectations
- methodology accountability

**Step 2: Implement About refinements**

Tighten or expand sections that help a reviewer verify the site is maintained and accountable.

**Step 3: Implement Contact refinements**

Make the contact route feel more operational and trustworthy.

**Step 4: Run build**

Run: `npm run build`

Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/about.astro src/pages/contact.astro
git commit -m "content: strengthen trust and contact pages"
```

### Task 5: Verify AdSense readiness path in layout and ad component

**Files:**
- Review: `src/layouts/BaseLayout.astro`
- Review: `src/components/AdSlot.astro`
- Review: `public/ads.txt`
- Create: `docs/reports/pricingnest-adsense-readiness-checklist-2026-07-02.md`
- Test: `npm run build`

**Step 1: Re-check the current ad and consent path**

Confirm:

- whether AdSense code is intentionally absent from key pages
- whether consent logic is coherent
- whether `ads.txt` is present and plausible

**Step 2: Write the readiness checklist**

Create `docs/reports/pricingnest-adsense-readiness-checklist-2026-07-02.md` with:

- what is already in place
- what still needs to be enabled or changed
- whether the next application should happen before or after code adjustments

**Step 3: Run build**

Run: `npm run build`

Expected: PASS

**Step 4: Commit**

```bash
git add docs/reports/pricingnest-adsense-readiness-checklist-2026-07-02.md
git commit -m "docs: add AdSense readiness checklist"
```

### Task 6: Refresh the search promise on the usage-based pricing calculator

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`
- Review: `src/lib/tools.ts`
- Test: `npm run build`

**Step 1: Identify the search-facing copy sources**

Find where title, description, hero copy, and trust blocks for the usage-based calculator are driven from.

**Step 2: Tighten the search promise**

Improve:

- title precision
- description clarity
- first-screen promise
- why this page is more useful than a generic calculator

**Step 3: Keep trust language visible**

Make sure the refreshed copy still supports methodology, review, and correction signals.

**Step 4: Run build**

Run: `npm run build`

Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/saas-pricing/[slug].astro src/lib/tools.ts
git commit -m "content: improve usage pricing calculator click promise"
```

### Task 7: Refresh the search promise on API, storage, and compute flagship tools

**Files:**
- Modify: `src/pages/saas-pricing/[slug].astro`
- Review: `src/lib/tools.ts`
- Test: `npm run build`

**Step 1: Identify the copy inputs for the three flagship pages**

Pages:

- `/saas-pricing/api-pricing-calculator/`
- `/saas-pricing/storage-cost-calculator/`
- `/saas-pricing/compute-cost-estimator/`

**Step 2: Improve their first-screen promises**

Focus on:

- decision clarity
- differentiation from generic calculators
- trust and methodology linkage

**Step 3: Run build**

Run: `npm run build`

Expected: PASS

**Step 4: Commit**

```bash
git add src/pages/saas-pricing/[slug].astro src/lib/tools.ts
git commit -m "content: improve flagship calculator click capture"
```

### Task 8: Reduce visible low-value pathways from top-level navigation surfaces

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/saas-pricing/index.astro`
- Review: `src/pages/guides/index.astro`
- Review: `src/pages/glossary/index.astro`
- Test: `npm run build`

**Step 1: Review current entry-page link density**

Check whether the user is pushed too quickly into low-value or repetitive content.

**Step 2: Tighten homepage and toolkit surfacing**

Emphasize curated, high-value paths over broad inventory signaling.

**Step 3: Keep useful pathways, remove weak emphasis**

Do not hide important resources, but reduce the feeling that page count is the product.

**Step 4: Run build**

Run: `npm run build`

Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/saas-pricing/index.astro
git commit -m "content: reduce low-value entry-point signals"
```

### Task 9: Run verification and capture a post-change checkpoint

**Files:**
- Create: `docs/reports/pricingnest-recovery-checkpoint-2026-07-02.md`
- Test: `npm run build`
- Test: `node scripts/audit.mjs`

**Step 1: Run the site build**

Run: `npm run build`

Expected: PASS

**Step 2: Run the repo audit**

Run: `node scripts/audit.mjs`

Expected: PASS with no missing metadata regressions.

**Step 3: Write a checkpoint memo**

Create `docs/reports/pricingnest-recovery-checkpoint-2026-07-02.md` summarizing:

- what changed
- what is stronger now
- what still needs monitoring
- when to review GSC again

**Step 4: Commit**

```bash
git add docs/reports/pricingnest-recovery-checkpoint-2026-07-02.md
git commit -m "docs: add recovery checkpoint summary"
```
