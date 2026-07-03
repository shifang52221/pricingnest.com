# Site Diagnosis And Monitoring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a repeatable site diagnosis and monitoring system that produces strong executive reports, evidence-rich appendices, and structured audit snapshots for `pricingnest.com`.

**Architecture:** Extend the existing local audit scripts into a dated audit-run pipeline. Keep raw evidence in `audits/YYYY-MM-DD/`, generate a structured JSON snapshot, and render two Markdown reports in `docs/reports/` using normalized inputs from GSC files, crawl outputs, and manual review data.

**Tech Stack:** Node.js ES modules, existing repo scripts in `scripts/`, Astro repo conventions, Markdown reports, JSON snapshots, PowerShell command execution.

---

### Task 1: Create the report and audit directory structure

**Files:**
- Create: `docs/reports/.gitkeep`
- Create: `audits/.gitkeep`
- Modify: `README.md`
- Test: none

**Step 1: Add the reports directory placeholder**

Create `docs/reports/.gitkeep`.

**Step 2: Add the audits directory placeholder**

Create `audits/.gitkeep`.

**Step 3: Document the new artifact layout**

Update `README.md` to add a short section describing:

- `docs/reports/`
- `audits/YYYY-MM-DD/`
- expected high-level outputs

**Step 4: Verify the paths exist**

Run: `Get-ChildItem docs, audits`

Expected: both folders exist and are visible.

**Step 5: Commit**

```bash
git add README.md docs/reports/.gitkeep audits/.gitkeep
git commit -m "docs: add reporting and audit artifact structure"
```

### Task 2: Define the structured snapshot schema

**Files:**
- Create: `scripts/lib/site-health-schema.mjs`
- Create: `tests/site-health-schema.test.mjs`
- Test: `tests/site-health-schema.test.mjs`

**Step 1: Write the failing test**

Create a test that imports the schema helper and asserts the returned object shape includes:

- run metadata
- module scores
- core page watchlist
- issue summary
- recommended actions

**Step 2: Run test to verify it fails**

Run: `node tests/site-health-schema.test.mjs`

Expected: FAIL because the schema file does not exist yet.

**Step 3: Write minimal implementation**

Create `scripts/lib/site-health-schema.mjs` with helpers that:

- build an empty snapshot object
- validate required top-level sections
- export a stable list of module names

**Step 4: Run test to verify it passes**

Run: `node tests/site-health-schema.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/lib/site-health-schema.mjs tests/site-health-schema.test.mjs
git commit -m "feat: add site health snapshot schema"
```

### Task 3: Build a GSC ingestion helper for dated audit runs

**Files:**
- Create: `scripts/lib/gsc-ingest.mjs`
- Create: `tests/gsc-ingest.test.mjs`
- Test: `tests/gsc-ingest.test.mjs`

**Step 1: Write the failing test**

Create a test that loads small sample CSV fixtures and asserts the ingestion helper can:

- parse page, query, country, device, and chart files
- compute totals
- return top pages and top queries
- normalize date ranges

**Step 2: Add tiny fixtures**

Create a minimal fixture folder under `tests/fixtures/gsc-sample/` containing small CSV files with the same columns as current exports.

**Step 3: Run test to verify it fails**

Run: `node tests/gsc-ingest.test.mjs`

Expected: FAIL because the helper does not exist yet.

**Step 4: Write minimal implementation**

Create `scripts/lib/gsc-ingest.mjs` to:

- parse CSV files without external dependencies
- compute totals and averages
- extract top pages and top queries
- surface the reporting date range

**Step 5: Run test to verify it passes**

Run: `node tests/gsc-ingest.test.mjs`

Expected: PASS

**Step 6: Commit**

```bash
git add scripts/lib/gsc-ingest.mjs tests/gsc-ingest.test.mjs tests/fixtures/gsc-sample
git commit -m "feat: add GSC ingestion helpers for audit runs"
```

### Task 4: Extend crawl ingestion around SiteOne outputs

**Files:**
- Create: `scripts/lib/crawl-ingest.mjs`
- Create: `tests/crawl-ingest.test.mjs`
- Test: `tests/crawl-ingest.test.mjs`

**Step 1: Write the failing test**

Create a test that uses a tiny SiteOne-like JSON fixture and asserts the helper can extract:

- summary scores
- issue counts
- key defects
- slow URLs

**Step 2: Run test to verify it fails**

Run: `node tests/crawl-ingest.test.mjs`

Expected: FAIL because the helper does not exist yet.

**Step 3: Write minimal implementation**

Create `scripts/lib/crawl-ingest.mjs` to normalize:

- quality scores
- issue summary
- top SEO / accessibility / security findings
- broken URLs

**Step 4: Run test to verify it passes**

Run: `node tests/crawl-ingest.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/lib/crawl-ingest.mjs tests/crawl-ingest.test.mjs
git commit -m "feat: normalize crawl outputs for site health reporting"
```

### Task 5: Add template-risk and trust-signal analyzers

**Files:**
- Create: `scripts/template-risk-audit.mjs`
- Create: `tests/template-risk-audit.test.mjs`
- Modify: `scripts/audit.mjs`
- Test: `tests/template-risk-audit.test.mjs`

**Step 1: Write the failing test**

Create a test that asserts the analyzer can detect repeated structural signals across page templates, including markers like:

- repeated support blocks
- repeated next-step blocks
- repeated toolkit blocks

**Step 2: Run test to verify it fails**

Run: `node tests/template-risk-audit.test.mjs`

Expected: FAIL because the analyzer does not exist yet.

**Step 3: Write minimal implementation**

Create `scripts/template-risk-audit.mjs` that inspects:

- `src/pages/guides/[slug].astro`
- `src/pages/glossary/[slug].astro`
- `src/pages/saas-pricing/[slug].astro`

and outputs a simple template-risk summary.

Update `scripts/audit.mjs` only if needed to expose or call the new analysis in a non-destructive way.

**Step 4: Run test to verify it passes**

Run: `node tests/template-risk-audit.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/template-risk-audit.mjs scripts/audit.mjs tests/template-risk-audit.test.mjs
git commit -m "feat: add template risk and trust signal audit"
```

### Task 6: Create the site health snapshot generator

**Files:**
- Create: `scripts/generate-site-health.mjs`
- Create: `tests/generate-site-health.test.mjs`
- Modify: `scripts/lib/site-health-schema.mjs`
- Test: `tests/generate-site-health.test.mjs`

**Step 1: Write the failing test**

Create a test that wires sample GSC input, crawl input, and template-risk input into the generator and asserts it produces:

- module scores
- core page watchlist items
- issue summary
- recommended priorities

**Step 2: Run test to verify it fails**

Run: `node tests/generate-site-health.test.mjs`

Expected: FAIL because the generator does not exist yet.

**Step 3: Write minimal implementation**

Create `scripts/generate-site-health.mjs` that:

- accepts a dated output directory
- reads normalized GSC, crawl, and template-risk data
- generates `site-health.json`
- stores it in `audits/YYYY-MM-DD/`

**Step 4: Run test to verify it passes**

Run: `node tests/generate-site-health.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/generate-site-health.mjs scripts/lib/site-health-schema.mjs tests/generate-site-health.test.mjs
git commit -m "feat: generate site health snapshot"
```

### Task 7: Build the executive report renderer

**Files:**
- Create: `scripts/render-summary-report.mjs`
- Create: `tests/render-summary-report.test.mjs`
- Test: `tests/render-summary-report.test.mjs`

**Step 1: Write the failing test**

Create a test that asserts the renderer outputs Markdown with these sections:

- metadata
- one-sentence verdict
- top 3 findings
- P0 / P1 / P2 actions
- module scores
- core page watchlist

**Step 2: Run test to verify it fails**

Run: `node tests/render-summary-report.test.mjs`

Expected: FAIL because the renderer does not exist yet.

**Step 3: Write minimal implementation**

Create `scripts/render-summary-report.mjs` to generate:

- `docs/reports/pricingnest-summary-YYYY-MM-DD.md`

using `site-health.json` and other normalized inputs.

**Step 4: Run test to verify it passes**

Run: `node tests/render-summary-report.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/render-summary-report.mjs tests/render-summary-report.test.mjs
git commit -m "feat: render executive site health reports"
```

### Task 8: Build the audit appendix renderer

**Files:**
- Create: `scripts/render-audit-appendix.mjs`
- Create: `tests/render-audit-appendix.test.mjs`
- Test: `tests/render-audit-appendix.test.mjs`

**Step 1: Write the failing test**

Create a test that asserts the appendix renderer outputs Markdown with:

- source files used
- GSC evidence sections
- crawl evidence sections
- manual review section placeholder
- technical findings section

**Step 2: Run test to verify it fails**

Run: `node tests/render-audit-appendix.test.mjs`

Expected: FAIL because the renderer does not exist yet.

**Step 3: Write minimal implementation**

Create `scripts/render-audit-appendix.mjs` to generate:

- `docs/reports/pricingnest-audit-appendix-YYYY-MM-DD.md`

**Step 4: Run test to verify it passes**

Run: `node tests/render-audit-appendix.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/render-audit-appendix.mjs tests/render-audit-appendix.test.mjs
git commit -m "feat: render audit appendix reports"
```

### Task 9: Add a single audit-run entry point

**Files:**
- Create: `scripts/run-site-diagnosis.mjs`
- Modify: `package.json`
- Create: `tests/run-site-diagnosis.test.mjs`
- Test: `tests/run-site-diagnosis.test.mjs`

**Step 1: Write the failing test**

Create a test that asserts the entry script:

- creates a dated audit folder
- calls ingestion and render helpers in order
- writes expected output paths

**Step 2: Run test to verify it fails**

Run: `node tests/run-site-diagnosis.test.mjs`

Expected: FAIL because the orchestrator does not exist yet.

**Step 3: Write minimal implementation**

Create `scripts/run-site-diagnosis.mjs` and add an npm script such as:

- `audit:site-health`

The command should:

- set a run date
- create `audits/YYYY-MM-DD/`
- ingest available inputs
- generate `site-health.json`
- render both reports

**Step 4: Run test to verify it passes**

Run: `node tests/run-site-diagnosis.test.mjs`

Expected: PASS

**Step 5: Commit**

```bash
git add scripts/run-site-diagnosis.mjs package.json tests/run-site-diagnosis.test.mjs
git commit -m "feat: add unified site diagnosis run command"
```

### Task 10: Add operator documentation and usage examples

**Files:**
- Modify: `README.md`
- Create: `docs/reports/README.md`
- Test: none

**Step 1: Document how to run the new system**

Update `README.md` with:

- prerequisites
- expected inputs
- the audit command
- output locations

**Step 2: Add report-folder documentation**

Create `docs/reports/README.md` describing:

- summary report purpose
- appendix report purpose
- naming convention

**Step 3: Verify docs read cleanly**

Run: `Get-Content README.md`

Expected: the new instructions are present and coherent.

**Step 4: Commit**

```bash
git add README.md docs/reports/README.md
git commit -m "docs: document site diagnosis workflow"
```

### Task 11: Run end-to-end verification on current site data

**Files:**
- Use: current GSC exports
- Use: current SiteOne outputs
- Modify: none unless defects are found
- Test: end-to-end command

**Step 1: Prepare a dated run folder**

Use the current date and copy or reference the current source evidence into the dated audit folder.

**Step 2: Run the full diagnosis command**

Run: `npm run audit:site-health`

Expected:

- a dated `audits/YYYY-MM-DD/` folder is created
- `site-health.json` is written
- both Markdown reports are generated

**Step 3: Review generated outputs**

Check:

- the verdict is sensible
- core pages are included
- issue sections are not empty
- report structure matches the design

**Step 4: Fix any verification defects**

If the run fails or produces obviously weak output, patch the minimal responsible files and re-run.

**Step 5: Commit**

```bash
git add docs/reports audits package.json scripts tests README.md
git commit -m "feat: ship site diagnosis and monitoring workflow"
```
