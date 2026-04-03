# CDN Pass-Through Strengthening Wave 6 Design

## Goal

Strengthen `/guides/cdn-cost-pass-through/` into a reviewed decision page that
helps teams decide when CDN pass-through is justified and when they should avoid
it in favor of simpler pricing.

## Current evidence

- The page still uses the old thin-guide format:
  - no `author`, `reviewedBy`, or `reviewed`
  - no `sources`
  - short checklist body with limited commercial judgment
- The page is now directly referenced by:
  - `/guides/bandwidth-pricing-guide/`
  - `/guides/bandwidth-pricing-guardrails/`
  - the bandwidth calculator cluster
- That makes it the last obvious weak page inside the retained bandwidth support
  line.
- The current copy is too neutral and too thin. It says pass-through can be used
  but does not clearly warn when it damages trust, conversion, or pricing-page
  clarity.

## Core problem

The page is relevant, but it still behaves like a generic support article. In a
bandwidth cluster that is now being intentionally tightened and human-reviewed,
this kind of neutral checklist page increases template feel and weakens Google
quality signals.

## Approaches considered

### Option 1: Exception-first decision page

Position CDN pass-through as a tool for exceptional cases rather than the default
pricing pattern.

Pros:

- strongest trust signal
- most aligned with user experience and commercial realism
- reduces the chance that the page reads like a "how to push costs onto
  customers" playbook

Cons:

- slightly more opinionated than a neutral explainer

### Option 2: Neutral framework page

Present balanced pros and cons without recommending a default stance.

Pros:

- easier to write
- lower editorial commitment

Cons:

- more likely to feel templated
- weaker differentiation from generic pricing support content

### Option 3: Tactical pass-through playbook

Focus on how to operationalize pass-through pricing.

Pros:

- highly actionable for some operators

Cons:

- wrong signal for this recovery phase
- more likely to hurt perceived trust and human editorial quality

## Recommendation

Use Option 1.

The right positioning for this site is: default to simpler public pricing, and
only use CDN pass-through when cost volatility, regional variance, or enterprise
traffic concentration make a blended rate misleading.

That stance is better for:

- user trust
- conversion-minded pricing guidance
- reducing low-quality-site risk
- making the bandwidth cluster feel like curated editorial advice instead of
  generic checklist inventory

## Scope for this batch

- Add guide-depth coverage for `cdn-cost-pass-through`.
- Add guide-trust coverage so the page must carry review metadata and sources.
- Add retained-link concentration coverage so the page points to stronger
  bandwidth-cluster neighbors.
- Rewrite the page around an exception-first structure:
  - when CDN pass-through is justified
  - what to confirm before passing costs through
  - when pass-through hurts trust and conversion
  - pass-through vs blended pricing vs enterprise custom terms
  - how to interpret calculator outputs
  - next steps

## Success criteria

- the page no longer reads like a thin checklist
- the page clearly signals that pass-through is an exception, not the default
- it carries `author`, `reviewedBy`, `reviewed`, and `sources`
- it strengthens the bandwidth cluster without expanding scope or changing URLs
- local tests, build, and rendered HTML confirm the new standard

## Non-goals

- no calculator formula changes
- no URL changes
- no redesign
- no simultaneous glossary rewrite
- no broader site-wide trust-page work in this batch
