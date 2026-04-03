# Bandwidth Guardrails Strengthening Wave 5 Design

## Goal

Strengthen `/guides/bandwidth-pricing-guardrails/` so it acts like a retained
bandwidth decision-support page instead of a short checklist article.

## Current evidence

- The page still uses the old thin-guide format:
  - no `author`, `reviewedBy`, or `reviewed`
  - no `sources`
  - short checklist-led structure
- The page now sits directly under two stronger bandwidth-cluster pages:
  - `/saas-pricing/bandwidth-cost-calculator/`
  - `/guides/bandwidth-pricing-guide/`
- That means the remaining weak page is more visible than before. A user who
  clicks deeper into the bandwidth cluster immediately sees a quality drop.
- The current copy mentions burst traffic and rate limits, but it does not yet
  give enough commercial guidance on:
  - when bandwidth should stay bundled
  - when overage needs guardrails
  - when enterprise exceptions are healthier than public complexity
  - how regional mix and pass-through risk should change the packaging choice

## Core problem

The page is relevant, but it still reads like a template support page. That
weakens both user trust and Google-quality signals in a priority cluster that we
are actively trying to make feel more curated and human-reviewed.

## Approaches considered

### Option 1: Strengthen only `bandwidth-pricing-guardrails`

Upgrade this page to the retained-core standard and add tests for depth, trust,
and link concentration.

Pros:

- smallest and safest batch
- directly fixes the next most obvious weakness in the bandwidth cluster
- keeps the release discipline tight

Cons:

- leaves `cdn-cost-pass-through` for later

### Option 2: Pair `bandwidth-pricing-guardrails` with `cdn-cost-pass-through`

Refresh both remaining thin bandwidth support pages in one batch.

Pros:

- stronger cluster-wide consistency
- fewer release cycles for the bandwidth support layer

Cons:

- wider review surface
- more likely to blur the batch and delay completion

### Option 3: Reopen the full bandwidth cluster

Revisit tool copy, support guides, and glossary pages together.

Pros:

- would create the most complete bandwidth refresh

Cons:

- too broad for the next batch
- violates the current “narrow, reviewed, sequential” discipline

## Recommendation

Use Option 1.

The bandwidth cluster is already improving in the right order. First the tool,
then the main guide, and now the strongest remaining weak support page. This
keeps risk low while continuing to reduce template-feel inside a core cluster.

## Scope for this batch

- Add a focused guide-depth test for `bandwidth-pricing-guardrails`.
- Add guide-trust coverage so the page must carry review metadata and sources.
- Add retained-link concentration coverage so the page:
  - points to stronger bandwidth cluster neighbors
  - avoids weaker or generic glossary fallback where possible
- Rewrite the page into a decision-oriented structure:
  - when bandwidth guardrails are needed
  - what to confirm before setting them
  - where teams get guardrails wrong
  - guardrail options and trade-offs
  - how to interpret calculator outputs
  - next steps

## Success criteria

- the page no longer reads like a checklist template
- the page carries clear review and source signals
- it gives real commercial guidance on bandwidth packaging and margin protection
- it strengthens the bandwidth cluster without changing URLs or formulas
- tests, build, and rendered HTML all confirm the expected structure

## Non-goals

- no URL changes
- no calculator logic changes
- no redesign
- no simultaneous rewrite of `cdn-cost-pass-through`
- no broader bandwidth-cluster rework in this batch
