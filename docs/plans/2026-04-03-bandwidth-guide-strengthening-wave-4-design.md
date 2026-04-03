# Bandwidth Guide Strengthening Wave 4 Design

## Goal

Strengthen `/guides/bandwidth-pricing-guide/` so it reads like a retained,
decision-oriented bandwidth pricing page instead of a short checklist support
article.

## Current evidence

- `bandwidth-pricing-guide` is still using the old thin-guide shape:
  - no `author`, `reviewedBy`, or `reviewed`
  - no `sources`
  - short checklist-style body instead of retained-core depth
- The page sits directly under the now-strengthened
  `/saas-pricing/bandwidth-cost-calculator/` cluster, so the quality mismatch is
  visible.
- The current guide still leans on generic reminders such as "use blended
  egress cost" and "model at least two scenarios" without enough commercial
  decision framing.
- The glossary support is also weak right now because it still points to
  `/glossary/cogs/` instead of a more focused bandwidth interpretation layer.

## Core problem

The bandwidth calculator now looks like a reviewed pricing tool, but its main
retained guide still looks like an old template page. That weakens both user
experience and Google's view of the retained support layer around a priority
tool.

## Approaches considered

### Option 1: Strengthen only `bandwidth-pricing-guide`

Update only the retained guide itself plus the tests that define retained-guide
depth, guide trust coverage, and retained link concentration.

Pros:

- smallest, safest batch
- directly fixes the most visible bandwidth-cluster mismatch
- keeps the release disciplined after the larger recovery merge

Cons:

- leaves `bandwidth-pricing-guardrails` and `cdn-cost-pass-through` for a later
  pass

### Option 2: Strengthen `bandwidth-pricing-guide` plus one glossary page

Pair the guide with `egress` so the guide and glossary support layer improve
together.

Pros:

- stronger cluster cohesion
- improves both guide and terminology support

Cons:

- wider scope than needed
- increases review surface for this batch

### Option 3: Rewrite the full retained bandwidth cluster

Strengthen `bandwidth-pricing-guide`, `bandwidth-pricing-guardrails`,
`cdn-cost-pass-through`, and one glossary term together.

Pros:

- most complete bandwidth-cluster refresh

Cons:

- too wide for the next batch
- harder to review, verify, and ship cleanly

## Recommendation

Use Option 1.

The guide is the most obvious remaining weak point under the bandwidth
calculator. Tightening it first keeps the batch narrow while still reducing the
site's "template support page" footprint in a place that matters for both users
and Google.

## Scope for this batch

- Add retained-depth coverage for `bandwidth-pricing-guide`.
- Add guide-trust coverage so the page must carry review metadata and sources.
- Add retained-link concentration assertions so the guide favors stronger
  retained bandwidth neighbors and avoids weaker glossary-style support such as
  `/glossary/cogs/`.
- Rewrite the guide into the retained-core structure:
  - when bandwidth pricing deserves its own model
  - inputs to confirm before publishing a rate
  - where bandwidth teams underprice
  - pricing options and trade-offs
  - how to interpret calculator outputs
  - next steps
- Add review metadata and `sources` aligned with the bandwidth calculator
  cluster.

## Success criteria

- `bandwidth-pricing-guide` no longer reads like a checklist page
- the page carries `author`, `reviewedBy`, `reviewed`, and `sources`
- the guide is deep enough to justify its indexed status
- the guide links concentrate on retained bandwidth support pages and glossary
  terms, not weak generic support
- build and retained-core quality tests still pass

## Non-goals

- no calculator formula changes
- no URL changes
- no redesign
- no new pages
- no broader bandwidth-cluster rewrite in this batch
