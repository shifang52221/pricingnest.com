# API Pricing Intent Tightening Design

## Goal

Tighten the search intent, editorial signals, and retained-core pathways around
`/saas-pricing/api-pricing-calculator/` so the page reads more like an API pricing-decision tool and less like a
keyword-expanded API cost explainer.

## Current evidence

- The page is useful, but its metadata and FAQ still lean heavily on generic `API cost estimate` phrasing.
- Several FAQ entries are close variants of the same search-targeted idea:
  - `How do I build an API cost estimate and price per 1,000 calls?`
  - `How do I go from API cost estimate to list price?`
  - `How do I price an API per 1,000 calls from my monthly cost model?`
  - `Can I use this as a cost estimate for an API plan?`
- That repetition makes the page feel more like a keyword-capture surface than a tightly edited pricing-decision page.
- The page already has a decent support set, but the strongest visible support layer should be more explicit about:
  - value metric choice
  - packaging a per-1,000-call floor into included usage and overages
  - deciding when a platform fee or minimum commitment is needed

## Core problem

The page is not broken, but it still carries a little too much "API cost calculator" search phrasing for a core page
that should signal higher editorial quality and stronger pricing intent.

For one of the site's priority calculators, we want the visible support and FAQ layer to reinforce:

- pricing metric clarity
- price-floor design
- margin discipline under heavier traffic
- commercial structure choices like platform fees and minimum commitments

That is a stronger user and Google signal than keeping multiple near-duplicate keyword questions alive on the same page.

## Approaches considered

### Option 1: Small intent-tightening pass on this one tool

Update only:

- API pricing regression tests
- API pricing metadata, sources, and FAQ in `src/lib/tools.ts`
- curated next-step links for the API pricing cluster

This is the best option because it improves a high-value page with low implementation risk and keeps the work focused.

### Option 2: Medium pass on this one tool

Update the same areas as Option 1, plus rewrite broader sections like walkthroughs, scenarios, and interpretation.

This could improve the page further, but it widens the batch more than we need right now.

### Option 3: Pair rewrite of API pricing and API cost estimator

Tighten `api-pricing-calculator` and `api-cost-estimator` together so the two pages separate intent more clearly.

This is strategically interesting, but it spreads the batch across two related pages and increases coordination cost.

## Recommendation

Use Option 1.

Why:

- it removes the most obvious keyword-duplication risk from a priority page
- it strengthens the visible decision layer without touching layout or calculator behavior
- it matches the successful pattern already used on `usage-based-pricing-calculator`
- it keeps the batch small enough to verify, ship, and review cleanly

## Scope for this batch

- Update API pricing SEO/content regression tests so they require tighter pricing intent and reject redundant
  cost-estimate phrasing.
- Tighten API pricing metadata around pricing-floor and packaging decisions instead of generic API cost wording.
- Refresh API pricing `sources` around retained core decision pages:
  - `Value Metric Selection`
  - `API Pricing Model`
  - `Minimum Commitment Modeling`
- Replace lower-value FAQ duplication with decision-oriented FAQ items about:
  - choosing between per-call and per-1,000-call pricing
  - deciding what counts as a billable API call
  - adding a platform fee or minimum commitment
  - testing margin durability at higher traffic
  - turning a per-call floor into included usage and overage structure
- Refresh the API pricing curated cluster so the visible support layer emphasizes retained decision pages over weaker
  support terms.

## Success criteria

- no API pricing regression test rewards repeated `API cost estimate` phrasing
- the page metadata reads like API pricing guidance, not a generic cost estimator
- the visible support layer routes users into retained API pricing decision pages first
- FAQ content reads like pricing guidance rather than keyword variants
- the page still builds and preserves the existing calculator UX and logic

## Non-goals

- no calculator formula changes
- no layout rewrite
- no changes to `api-cost-estimator`
- no broad internal-link refactor beyond the API pricing cluster
