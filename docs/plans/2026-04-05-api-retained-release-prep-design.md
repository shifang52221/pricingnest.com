# API Retained Release Prep Design

## Goal

Assemble the retained API recovery line into one isolated local release
candidate so we can review, verify, and prepare a unified upload batch without
accidentally widening scope beyond the approved API chain.

## Current context

- `main` is still at `4071817` and does not contain the API retained chain from
  waves 13 through 16.
- The completed API work currently lives in four isolated worktrees:
  - `api-pricing-structure-wave-13`
  - `rate-limit-packaging-wave-14`
  - `overage-escalation-wave-15`
  - `api-call-boundary-wave-16`
- Each wave is already locally verified and documented, but they are stacked in
  a linear branch chain rather than hanging independently from `main`.
- The latest chain looks like this:
  - wave 13 plan: `074cc83`
  - wave 13 implementation: `bdcbaf0`
  - wave 14 plan: `581e59f`
  - wave 14 implementation: `1639026`
  - wave 15 plan: `47ca7cd`
  - wave 15 implementation: `f832f1b`
  - wave 16 plan: `a3b6138`
  - wave 16 implementation: `bdaf473`
- Those wave branches sit on top of earlier unmerged retained-core work, which
  means a direct merge of `api-call-boundary-wave-16` would also pull in waves
  8 through 12.
- The user preference is fixed:
  - no rushed push
  - no accidental scope expansion
  - one coherent batch
  - deep review before any upload

## Core problem

We no longer have a page-level design problem for this step. We now have a
release-scope control problem.

The retained API chain is ready for grouped review, but its git shape is
broader than the approved release scope. If we merge the latest wave branch
directly, we do not get an API-only batch. We get a wider retained-core batch
that includes additional earlier waves which have not been approved for this
release-prep candidate.

That creates three risks:

- the review batch becomes larger than intended
- the diff gets harder to audit for API-specific regressions
- later merge and upload discipline weakens because the batch boundary is no
  longer explicit

## Approaches considered

### Option 1: Create a fresh release-prep branch from `main` and cherry-pick the exact wave-13 to wave-16 commits

Pros:

- keeps the release candidate strictly API-only
- preserves the approved wave history and audit trail
- gives the cleanest diff against `main`
- avoids unintentionally dragging waves 8 through 12 into this batch

Cons:

- requires deliberate commit ordering
- may expose minor cherry-pick conflicts that need classification

### Option 2: Merge `api-call-boundary-wave-16` directly and accept the wider stacked history

Pros:

- fewest git operations
- fastest path mechanically

Cons:

- widens scope beyond the approved API-only release-prep batch
- makes the diff harder to read
- risks releasing earlier retained-core work without a dedicated review pass

### Option 3: Rebuild the API retained chain manually by copying file changes into the release-prep branch

Pros:

- maximum manual control over the final file set

Cons:

- duplicates already-verified work
- highest chance of human error
- weakens traceability and review discipline

## Recommendation

Use Option 1.

Create a fresh release-prep worktree from `main` and cherry-pick the exact plan
and implementation commits for waves 13 through 16 in chronological order.

That gives us one API-only candidate whose scope is explicit:

- `api-pricing-model`
- `rate-limit`
- `overage`
- `api-call`

and nothing else unless an integration-only fix becomes necessary.

## Release architecture

### Baseline

- Base branch: `main`
- Integration branch: `api-retained-release-prep`
- Integration worktree:
  `f:\www\www.pricingnest.com\.worktrees\api-retained-release-prep`

### Approved input commits

Cherry-pick these commits in order:

1. `074cc83` `docs: plan api pricing structure wave 13`
2. `bdcbaf0` `feat: tighten api pricing packaging structure guide`
3. `581e59f` `docs: plan rate limit packaging wave 14`
4. `1639026` `feat: tighten rate limit packaging glossary support`
5. `47ca7cd` `docs: plan overage escalation wave 15`
6. `f832f1b` `feat: tighten overage escalation glossary support`
7. `a3b6138` `docs: plan api call boundary wave 16`
8. `bdaf473` `feat: tighten api call billable boundary glossary support`

### What this local release-prep batch contains

- the four approved API retained waves
- their test tightening
- their trust-signal and internal-link concentration changes
- their plan and review documents

### What this local release-prep batch does not contain

- earlier retained-core waves 8 through 12
- new content work
- redesign
- URL changes
- calculator formula changes
- upload or live-site verification

## Fixed execution flow

1. Start in the dedicated `api-retained-release-prep` worktree from `main`.
2. Cherry-pick the exact wave-13 to wave-16 commits in chronological order.
3. If cherry-picks fail, classify the problem before editing:
   - cherry-pick conflict
   - stale expectation
   - true regression
   - generated-output mismatch
4. Review the integrated diff against `main`.
5. Run the unified API verification gate.
6. Build and run sitemap verification.
7. Inspect rendered HTML for the four retained API pages and the sitemap.
8. Record one unified API release-prep review log.
9. Stop there until merge/push approval is given.

## Verification gate

The API-only release-prep candidate must pass:

- `node --test tests/retained-guide-depth.test.mjs`
- `node --test tests/retained-glossary-depth.test.mjs`
- `node --test tests/guide-trust-data.test.mjs`
- `node --test tests/glossary-trust-data.test.mjs`
- `node --test tests/retained-link-concentration.test.mjs`
- `node --test tests/api-pricing-content.test.mjs`
- `node --test tests/core-tool-clusters.test.mjs`
- `node --test tests/hub-curation.test.mjs`
- `node --test tests/site-quality-signals.test.mjs`
- `node --test tests/template-quality.test.mjs`
- `node --test tests/navigation-deduping.test.mjs`
- `node --test tests/tool-trust-data.test.mjs`
- `node --test tests/content-governance.test.mjs`
- `node --test tests/recovery-retention-thresholds.test.mjs`
- `node --test tests/seo-meta.test.mjs`
- `npm run build`
- `node --test tests/sitemap-governance.test.mjs`

## Required local HTML review

After the full gate passes, inspect:

- `dist/guides/api-pricing-model/index.html`
- `dist/glossary/rate-limit/index.html`
- `dist/glossary/overage/index.html`
- `dist/glossary/api-call/index.html`
- `dist/sitemap-0.xml`

The goal is to confirm that the retained API cluster reads like a curated
decision chain rather than generic inventory pages.

## Risk controls

### Scope control

- Do not merge any wave branch directly into this release-prep branch.
- Do not cherry-pick commits outside the approved wave-13 to wave-16 list.
- Do not add new content work during integration unless a true integration-only
  fix blocks the candidate.

### Regression control

If an integration-only fix is required:

- classify the failure first
- add or update the smallest necessary test first if behavior changes
- keep the fix in the release-prep branch only until we decide whether the fix
  belongs upstream

### Review control

The unified diff must remain small enough to answer:

- did API intent get tighter instead of broader
- did trust signals stay explicit
- did weaker support links stay absent
- did the cluster become easier for buyers and for Google-quality review to
  interpret as intentionally maintained

## Success criteria

- the release-prep branch contains only the approved API waves 13 through 16
- the integrated diff against `main` is clean and auditable
- the full local verification gate passes in one place
- rendered HTML confirms the retained API chain is coherent
- one unified review log captures what changed, what did not change, and what
  the eventual upload check must verify

## Non-goals

- no merge to `main` in this design step
- no push in this design step
- no live no-cache verification in this design step
- no inclusion of waves 8 through 12
- no new retained-page strengthening beyond the already approved API chain
