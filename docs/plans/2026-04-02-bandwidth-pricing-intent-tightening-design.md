# Bandwidth Pricing Intent Tightening Design

## Goal

Tighten the search intent, editorial signals, and retained-core pathways around
`/saas-pricing/bandwidth-cost-calculator/` so the page reads more like a bandwidth pricing-decision tool and less like
a generic bandwidth or CDN cost explainer.

## Current evidence

- The page is useful, but its current metadata still reads like a broad calculator description:
  - `Estimate egress/bandwidth cost and a recommended price using your own per-GB costs, fixed overhead, and target gross margin.`
- The visible content already mentions useful ideas like blended egress cost, regional differences, and pass-through,
  but the highest-visibility layer still under-emphasizes pricing decisions such as:
  - setting a per-GB price floor
  - deciding when bandwidth should be a separate billable line item
  - deciding when CDN cost pass-through is needed
  - deciding when regional traffic mix requires a different pricing policy
  - deciding when fixed overhead requires a base fee or minimum commitment
- The current FAQ still spends valuable space on more generic framing:
  - `Is this a CDN pricing calculator?`
  - `What cost per GB should I use?`
  - `Should I include origin fetch and request costs?`
  - `How do I handle free CDN tiers?`
  - `What if bandwidth is a pass-through cost?`
- Those questions are not wrong, but they make the page feel more like a broad explainer than a pricing-decision page.
- The page also lacks the stronger trust/editorial layer already added to other tightened core pages:
  - no dedicated `metaTitle`
  - no dedicated `metaDescription`
  - no `reviewedBy` / `reviewed`
  - no explicit `sources`
- There is also no curated bandwidth-specific core cluster in `CORE_TOOL_CLUSTER_LINKS`, so the sidebar follow-up
  links are not yet concentrated around the strongest retained bandwidth pricing pages.

## Core problem

The bandwidth page is not low quality, but it still reads too much like a general bandwidth cost explainer instead of a
pricing-decision page.

For a priority infrastructure calculator, we want the visible support and FAQ layer to reinforce:

- per-GB pricing floors
- pass-through versus marked-up bandwidth pricing
- CDN versus origin cost treatment
- regional egress variability
- fixed-overhead recovery choices

That is a stronger user and Google signal than spending scarce metadata, FAQ, and support-link real estate on generic
calculator framing.

## Approaches considered

### Option 1: Small intent-tightening pass on this one tool

Update only:

- bandwidth pricing regression tests
- bandwidth tool metadata, sources, interpretation, and FAQ in `src/lib/tools.ts`
- curated next-step links for a new bandwidth cluster

This is the best option because it improves a high-value page with low implementation risk and keeps the batch focused.

### Option 2: Medium pass on this one tool

Update the same areas as Option 1, plus broader sections like walkthroughs, scenarios, and use-case framing.

This could improve the page further, but it widens the batch more than we need right now.

### Option 3: Pair rewrite of bandwidth pricing and monthly cloud cost

Tighten `bandwidth-cost-calculator` and `monthly-cloud-cost-estimator` together so bandwidth intent is separated from
blended cloud-cost intent at the same time.

This is strategically interesting, but it spreads the batch across two related pages and increases coordination cost.

## Recommendation

Use Option 1.

Why:

- it removes the most obvious generic bandwidth-calculator signals from a strong infrastructure page
- it strengthens pricing-decision language without touching layout or calculator behavior
- it matches the successful pattern already used on the usage-based, API, compute, and storage pages
- it keeps the batch small enough to verify, ship, and review cleanly

## Scope for this batch

- Update bandwidth pricing SEO/content regression tests so they require tighter pricing intent and reject weaker,
  generic calculator phrasing.
- Add dedicated bandwidth pricing metadata around price floors, pass-through decisions, and regional egress complexity.
- Add trust/editorial signals with `reviewedBy`, `reviewed`, and explicit `sources`.
- Refresh bandwidth pricing `sources` around retained core decision pages:
  - `Bandwidth Pricing Guide`
  - `Bandwidth Pricing Guardrails`
  - `CDN Cost Pass-Through`
  - optionally `Egress Pricing Playbook` if it gives a cleaner retained path than weaker glossary-heavy support
- Replace lower-value FAQ emphasis with decision-oriented FAQ items about:
  - how to turn blended egress cost into a price-per-GB floor
  - when bandwidth should be priced as a separate line item
  - when CDN cost pass-through is needed
  - when regional traffic mix requires different pricing or guardrails
  - when fixed overhead requires a base fee or minimum commitment
- Add a curated bandwidth cluster so the visible support layer routes users into retained bandwidth pricing decision
  pages and compact glossary support instead of weaker generic follow-up links.

## Success criteria

- no bandwidth pricing regression test rewards generic CDN-calculator framing
- the page metadata reads like bandwidth pricing guidance, not a generic bandwidth explainer
- the visible support layer routes users into retained bandwidth pricing decision pages first
- FAQ content reads like packaging, pass-through, and margin guidance rather than glossary help
- the page preserves the existing calculator UX and logic

## Non-goals

- no calculator formula changes
- no layout rewrite
- no input or output changes
- no walkthrough, scenario, or use-case rewrite in this batch
- no changes to `monthly-cloud-cost-estimator`
- no broad internal-link refactor beyond the bandwidth cluster
