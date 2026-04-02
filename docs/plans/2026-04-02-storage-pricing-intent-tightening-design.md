# Storage Pricing Intent Tightening Design

## Goal

Tighten the search intent, editorial signals, and retained-core pathways around
`/saas-pricing/storage-cost-calculator/` so the page reads more like a storage pricing-decision tool and less like a
generic storage cost explainer.

## Current evidence

- The page is useful, but its metadata still leans on generic `cost per GB calculator` phrasing rather than explicit
  pricing decisions.
- The visible support layer is decent, but it still favors broad storage education over pricing structure decisions:
  - `sources` currently point to `Storage Costs and Pricing` and `Storage Retrieval Fees`
  - the current curated cluster leans on `Price Per GB-Month Explained`, `Storage Costs and Pricing`, `GB-Month`, and
    `Storage Costs`
- Those references are relevant, but the highest-visibility layer can do a better job emphasizing:
  - price-per-GB-month floors
  - request-heavy versus archive pricing tradeoffs
  - when retrieval fees should be priced separately
  - when fixed overhead should push the page toward a platform fee or minimum commitment
- The FAQ mix still spends space on broad storage-explainer questions such as:
  - `Can I use this as a Google Cloud Storage price calculator?`
  - `What is cost per GB-month?`
  - `What counts as a request?`
- Those questions are not wrong, but they underuse a priority page that should look like a pricing-decision resource.

## Core problem

The storage page is not low quality, but it still reads too much like a generalized storage cost explainer instead of a
pricing-decision page.

For a priority tool page, we want the visible support and FAQ layer to reinforce:

- storage pricing floors
- request and retrieval fee packaging decisions
- archive versus request-heavy pricing splits
- fixed-overhead recovery choices

That is a stronger user and Google signal than spending scarce FAQ and support-link real estate on broad storage
terminology questions.

## Approaches considered

### Option 1: Small intent-tightening pass on this one tool

Update only:

- storage pricing regression tests
- storage tool metadata, sources, interpretation, and FAQ in `src/lib/tools.ts`
- curated next-step links for the storage cluster

This is the best option because it improves a high-value page with low implementation risk and keeps the batch focused.

### Option 2: Medium pass on this one tool

Update the same areas as Option 1, plus broader sections like walkthroughs, scenarios, and use-case framing.

This could improve the page further, but it widens the batch more than we need right now.

### Option 3: Pair rewrite of storage pricing and bandwidth pricing

Tighten `storage-cost-calculator` and `bandwidth-cost-calculator` together so the two pages separate intent more
clearly.

This is strategically interesting, but it spreads the batch across two related pages and increases coordination cost.

## Recommendation

Use Option 1.

Why:

- it removes the most obvious generic-storage-calculator signals from a priority page
- it strengthens pricing-decision language without touching layout or calculator behavior
- it matches the successful pattern already used on the usage-based, API, and compute pricing pages
- it keeps the batch small enough to verify, ship, and review cleanly

## Scope for this batch

- Update storage pricing SEO/content regression tests so they require tighter pricing intent and reject weaker
  explanatory emphasis.
- Tighten storage pricing metadata around price-floor and packaging decisions instead of generic cost-per-GB wording.
- Refresh storage pricing `sources` around retained core decision pages:
  - `Price Per GB-Month Explained`
  - `Storage Costs and Pricing`
  - `Storage Retrieval Fees`
- Replace lower-value FAQ emphasis with decision-oriented FAQ items about:
  - when to charge separately for requests or retrievals
  - when hot and archive storage should use different pricing
  - how to turn cost per GB-month into a storage price floor
  - when fixed storage overhead requires a platform fee or minimum commitment
  - how to test margin on request-heavy versus archive workloads
- Refresh the storage pricing curated cluster so the visible support layer emphasizes retained pricing pages and the
  retrieval-fee decision path over weaker support terms.

## Success criteria

- no storage pricing regression test rewards generic cloud-storage calculator phrasing
- the page metadata reads like storage pricing guidance, not a generic storage explainer
- the visible support layer routes users into retained storage pricing decision pages first
- FAQ content reads like packaging and margin guidance rather than glossary help
- the page still builds and preserves the existing calculator UX and logic

## Non-goals

- no calculator formula changes
- no layout rewrite
- no changes to `bandwidth-cost-calculator`
- no broad internal-link refactor beyond the storage cluster
