# PricingNest Site Diagnosis And Monitoring Design

**Date:** 2026-07-01

## Goal

Build a strong, repeatable diagnosis and monitoring system for `pricingnest.com` that does three things well:

1. finds the real growth constraints, not just isolated defects
2. produces strong reports for decision-making and备案
3. creates a long-term monitoring loop so we can compare changes over time

The system must stay aligned with our operating principles:

- real and useful content
- strong user experience
- reduce low-value and template-like signals
- avoid making Google treat the site like a bulk template site

## Why This Exists

The site has been live for roughly half a year and still shows weak search performance. Recent data and crawl evidence point to a site-level product problem, not only a technical SEO problem:

- the site is getting some exposure
- the strongest opportunity pages still fail to earn clicks
- parts of the site still share a highly repeatable content and layout pattern
- technical hygiene is not the main root cause, but it still weakens trust

That means the diagnosis system has to combine traffic evidence, page-quality evidence, template-signal evidence, and technical audit evidence into one framework.

## Recommended Approach

We will use a layered diagnosis system rather than a single-tool audit.

### Approach Options Considered

#### Option A: Manual review only

- review GSC exports
- run a crawl manually
- summarize findings by hand

Pros:

- fast to start
- low setup cost

Cons:

- inconsistent over time
- easy to miss regressions
- weak historical comparison

#### Option B: Automated crawl-first monitoring

- run recurring crawl, accessibility, and link checks
- save reports automatically

Pros:

- repeatable
- catches structural and technical regressions

Cons:

- does not explain search stagnation by itself
- can over-report low-impact issues

#### Option C: Diagnosis middle layer plus recurring monitoring

- combine GSC, crawl results, manual page review, and template-signal checks
- generate both executive and evidence-heavy reports
- keep structured outputs for comparisons

Pros:

- best fit for a stalled site
- supports root-cause analysis
- supports long-term monitoring
- gives both strategic and operational outputs

Cons:

- more setup effort

### Recommendation

Choose Option C.

This gives us one strong diagnosis system with two modes:

- deep review mode for root-cause analysis
- recurring monitoring mode for month-over-month comparison

## System Architecture

The system will have six layers.

### 1. Input Layer

Every review run should collect the same evidence classes.

#### Search evidence

- GSC 28-day export
- GSC 90-day export
- page-level export
- query-level export
- country and device export
- chart export for trend analysis

#### Crawl evidence

- SiteOne full-site crawl report
- local crawl artifacts already produced by repo scripts where useful
- issue tables for 404, security headers, labels, caching, compression, and metadata

#### Manual review evidence

- key page first-screen review
- SERP promise review for top pages
- page differentiation and trust review
- template-signal review for repeatable sections and repeated content patterns

### 2. Analysis Layer

All evidence should be normalized into five judgment modules.

#### A. Search Visibility

Questions:

- are the right pages getting impressions?
- are impressions concentrated in core assets or scattered across weak pages?
- are rankings improving on target intent or only on broad low-fit queries?

#### B. Click Capture

Questions:

- are pages that rank on page 1 actually earning clicks?
- do titles and descriptions create a clear reason to click?
- does the query intent match the page identity and promise?

#### C. Page Value

Questions:

- does the page help a user make a decision?
- does the page include inputs, tradeoffs, comparisons, or next actions?
- is the page more than a generic explanation?

#### D. Trust And Template Risk

Questions:

- does the page feel authored and accountable?
- does the site show repeated structural patterns that reduce perceived originality?
- would a user or Google see this as a retained expert resource or a scaled template library?

#### E. Technical Hygiene

Questions:

- are there crawl, indexing, accessibility, caching, compression, or security issues that weaken trust?
- are there defects that break experience or create maintenance drag?

### 3. Output Layer

Every run should produce two report documents and one structured data file.

#### Executive report

Path pattern:

- `docs/reports/pricingnest-summary-YYYY-MM-DD.md`

Purpose:

- short decision-ready summary
- suitable for备案 and historical review

#### Audit appendix

Path pattern:

- `docs/reports/pricingnest-audit-appendix-YYYY-MM-DD.md`

Purpose:

- detailed evidence log
- tables, anomalies, page lists, tool outputs, and rationale

#### Structured snapshot

Path pattern:

- `audits/YYYY-MM-DD/site-health.json`

Purpose:

- machine-readable trend comparison
- future automation input

### 4. Monitoring Layer

The system should keep a fixed watchlist of core pages and core health signals.

#### Core page watchlist

- `/saas-pricing/usage-based-pricing-calculator/`
- `/saas-pricing/api-pricing-calculator/`
- `/saas-pricing/storage-cost-calculator/`
- `/saas-pricing/annual-discount-calculator/`
- any new page that crosses a meaningful impression threshold

#### Watchlist metrics

- impressions
- clicks
- CTR
- average position
- title and meta copy
- first-screen promise quality
- trust signals present or missing
- template-risk notes

### 5. Retention And Traceability Layer

Each run should keep both source files and interpreted outputs.

Recommended folder layout:

- `audits/YYYY-MM-DD/gsc/`
- `audits/YYYY-MM-DD/crawl/`
- `audits/YYYY-MM-DD/manual/`
- `audits/YYYY-MM-DD/site-health.json`

This lets us answer:

- what did we conclude?
- what evidence supported it?
- what changed since the last run?

### 6. Alerting Layer

The first implementation should alert by local and repository artifacts, not external messaging.

Alert conditions should flag:

- new 404s on internal links
- large drop in core-page impressions
- page-1 or near-page-1 pages with persistently near-zero CTR
- sudden increase in noindex / crawl mismatches
- core page trust signals removed or weakened
- material growth in pages that look template-like or thin

## Tooling Strategy

Use one primary crawl tool plus several supporting checks.

### Primary crawl tool

- SiteOne Crawler

Why:

- best all-around site diagnosis coverage for crawl, SEO, accessibility, performance, security, and reporting

### Supporting tool classes

- Lighthouse CI for selected key pages
- accessibility checks for repeated interaction surfaces
- link checking for internal defects
- repo-native scripts for classification, HTML metrics, and issue extraction

The repo already contains useful crawl-support scripts:

- `scripts/seo-crawl.mjs`
- `scripts/seo-audit.mjs`
- `scripts/audit.mjs`

These should be preserved and connected into the new reporting flow rather than replaced without need.

## Reporting Model

The report system should be dual-layered.

### Layer 1: Executive Summary

This is the short report the user can quickly read and archive.

Required sections:

- report metadata
- one-sentence site verdict
- top 3 findings
- P0 / P1 / P2 actions
- change vs previous review
- core page watchlist summary

### Layer 2: Audit Appendix

This is the deep evidence pack.

Required sections:

- GSC summary tables
- query clusters
- page clusters
- country and device summary
- crawl findings
- page-level manual review notes
- trust and template-risk notes
- keep / improve / deindex / merge candidates
- technical issue logs

### Structured Data Snapshot

The JSON snapshot should capture:

- date range
- totals
- core page metrics
- module scores
- flagged issues
- recommended priorities

## Scoring And Decision Rules

Each report should score five modules from `0` to `3`.

- `0` = failing / clearly blocking
- `1` = weak / needs attention
- `2` = acceptable / monitor
- `3` = strong

### Module: Search Visibility

Healthy when:

- core pages earn stable impressions
- target-intent queries become more prominent

Needs work when:

- impressions are present but scattered across low-fit intent

High priority when:

- core pages stay outside meaningful ranking range for too long

### Module: Click Capture

Healthy when:

- page-1 or near-page-1 pages earn reasonable CTR

Needs work when:

- rankings improve but clicks do not

High priority when:

- a high-impression page ranks near page 1 and still gets near-zero CTR

### Module: Page Value

Healthy when:

- pages help users make a practical pricing decision

Needs work when:

- pages mostly explain terms without driving action or insight

High priority when:

- users can read the page and still not know what to do next

### Module: Trust And Template Risk

Healthy when:

- pages show authorship, review, sources, and meaningful structural differentiation

Needs work when:

- pages share the same framing and support blocks too heavily

High priority when:

- the site increasingly resembles a scaled content library more than a trusted specialist product

### Module: Technical Hygiene

Healthy when:

- no material crawl or accessibility defects are present

Needs work when:

- there are recurring but non-blocking defects

High priority when:

- issues directly weaken trust, navigation, or crawl integrity

## Strong Report Template

Every executive report should follow this structure:

1. report date, date range, and comparison baseline
2. one-sentence conclusion
3. top 3 findings
4. P0 / P1 / P2 actions
5. module scores and short rationale
6. core page watchlist
7. trend summary
8. appendix references

Every appendix should follow this structure:

1. source files used
2. GSC evidence
3. crawl evidence
4. manual review findings
5. template-risk findings
6. technical findings
7. page actions by priority
8. raw notes

## Manual Review Standards

The manual review section should not be generic. It must answer:

- why would a user click this result?
- why would a user trust this page after landing?
- what makes this page genuinely different from its siblings?
- what still feels modular, repeated, or library-like?

This is important because the site's current constraint is not just technical indexing. The site's strongest pages need better click capture, differentiation, and trust.

## Success Criteria

The diagnosis and monitoring system is successful when:

- each review produces consistent outputs
- we can compare any run against the previous one
- core page regressions are easy to spot
- the report clearly separates root cause from symptoms
- the report supports both strategic decisions and execution work

## Non-Goals

This design does not assume:

- immediate traffic growth from report creation alone
- full automation in phase one
- replacing human judgment with scoring

The system is meant to improve clarity and consistency first, then speed.

## Recommended Rollout

### Phase 1

- standardize folders
- generate the dual-layer report manually using current evidence
- create the JSON snapshot structure

### Phase 2

- automate recurring data ingestion where practical
- automate core-page comparisons
- automate flag generation for repeated conditions

### Phase 3

- add threshold-based monitoring
- add recurring command entry points
- refine scoring rules based on real review history

## Current Root-Cause Framing

Based on current evidence, the system should be built to test this primary hypothesis:

> The site is not mainly blocked by crawlability or lack of surface area. It is mainly blocked by weak click capture on promising pages, insufficient differentiation across repeated content structures, and a site-level trust/originality ceiling.

That hypothesis should be re-tested in each report rather than assumed forever.
