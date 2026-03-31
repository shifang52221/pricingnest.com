# Compute Pricing Intent Tightening Design

## Goal

Tighten the search intent, editorial signals, and retained-core pathways around
`/saas-pricing/compute-cost-estimator/` so the page reads more like a compute pricing-decision tool and less like a
generic cloud cost explainer.

## Current evidence

- The page is useful, but its metadata still leans on generic `cost estimator` phrasing rather than explicit pricing
  decisions.
- The visible support layer is decent, but it still routes users through broader operational explanations:
  - `sources` currently point to `Compute Cost Modeling` and `Monthly Cloud Cost Breakdown`
  - the current curated cluster leans on `SaaS Gross Margin Targets`, `Compute Cost Modeling`, `COGS`, and `Unit Cost`
- Those support pages are relevant, but the highest-visibility layer can do a better job emphasizing:
  - gross-margin discipline
  - capacity-cost translation into plan pricing
  - when fixed-cost recovery requires a minimum commitment or base fee
- The FAQ mix still spends space on broad cloud cost questions such as:
  - `Is this a cloud compute cost calculator?`
  - `What are vCPU-hours and GB-hours?`
  - `Should I treat autoscaling as lower cost?`
- Those questions are not bad, but they underuse a priority page that should look like a pricing-decision resource.

## Core problem

The compute page is not low quality, but it still reads a little too much like an input-driven infrastructure explainer
instead of a pricing-decision page.

For a priority tool page, we want the visible support and FAQ layer to reinforce:

- compute pricing floors
- gross-margin guardrails
- fixed-cost recovery choices
- pricing structure decisions like base fees, minimums, and tiering

That is a stronger user and Google signal than spending scarce FAQ and support-link real estate on lower-value cloud
terminology questions.

## Approaches considered

### Option 1: Small intent-tightening pass on this one tool

Update only:

- compute pricing regression tests
- compute tool metadata, sources, interpretation, and FAQ in `src/lib/tools.ts`
- curated next-step links for the compute cluster

This is the best option because it improves a high-value page with low implementation risk and keeps the batch focused.

### Option 2: Medium pass on this one tool

Update the same areas as Option 1, plus broader sections like walkthroughs, scenarios, and use-case framing.

This could improve the page further, but it widens the batch more than we need right now.

### Option 3: Pair rewrite of compute pricing and monthly cloud cost

Tighten `compute-cost-estimator` and `monthly-cloud-cost-estimator` together so the two pages separate intent more
clearly.

This is strategically interesting, but it spreads the batch across two related pages and increases coordination cost.

## Recommendation

Use Option 1.

Why:

- it removes the most obvious generic-cost-estimator signals from a priority page
- it strengthens the decision layer without touching layout or calculator behavior
- it matches the successful pattern already used on the usage-based and API pricing pages
- it keeps the batch small enough to verify, ship, and review cleanly

## Scope for this batch

- Update compute pricing SEO/content regression tests so they require tighter pricing intent and reject weaker
  explanatory emphasis.
- Tighten compute pricing metadata around pricing-floor and margin decisions instead of generic compute cost wording.
- Refresh compute pricing `sources` around retained core decision pages:
  - `SaaS Gross Margin Targets`
  - `Compute Cost Modeling`
  - `Minimum Commitment Modeling`
- Replace lower-value FAQ emphasis with decision-oriented FAQ items about:
  - when compute fixed cost is too high for pure variable pricing
  - how to treat reserved capacity or savings plans in pricing
  - when to add a platform fee or minimum commitment
  - how to test whether gross margin survives heavier workloads
  - how to turn a compute price floor into tiers or committed plans
- Refresh the compute pricing curated cluster so the visible support layer emphasizes retained decision pages over
  weaker support terms.

## Success criteria

- no compute pricing regression test rewards generic cloud cost-estimator phrasing
- the page metadata reads like compute pricing guidance, not a generic cloud cost explainer
- the visible support layer routes users into retained compute pricing decision pages first
- FAQ content reads like pricing guidance rather than glossary help
- the page still builds and preserves the existing calculator UX and logic

## Non-goals

- no calculator formula changes
- no layout rewrite
- no changes to `monthly-cloud-cost-estimator`
- no broad internal-link refactor beyond the compute cluster
