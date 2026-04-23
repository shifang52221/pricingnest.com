# Flagship Tool Pages Batch 4 Design

## Goal

Strengthen the two highest-value retained tool pages,
`/saas-pricing/usage-based-pricing-calculator/` and
`/saas-pricing/api-pricing-calculator/`, so they feel less like generic
calculator templates and more like flagship decision pages that can hold
attention, route users into the retained core, and signal higher editorial
quality.

## Why this batch exists

The site has already completed three narrowing moves:

- guide governance waves that reduced indexed inventory
- retained-guide rewrites for API, storage, and usage decision paths
- tighter hub and tool-cluster curation

Those changes improved the retained core, but the actual tool detail page
template still does most of the on-page work through one broad shared layout in
`src/pages/saas-pricing/[slug].astro`.

That shared layout is functional and trustworthy, but it still has two limits:

1. It gives the flagship tools almost the same presentation as secondary tools.
2. It exposes a very broad guide-link generation system that can make important
   pages feel more like index hubs than decision pages.

For a site trying to win on a small set of pricing decision pages, that is the
next bottleneck. The strongest pages now need better page-level experience, not
just better content behind the links.

## Current evidence

### Tool content is already relatively strong

The tool definitions in `src/lib/tools.ts` already provide substantial depth for
priority tools:

- FAQs
- scenarios
- walkthroughs
- input guidance
- interpretation and mistakes

The main problem is not "too little content" inside the tool records.

### The page template is still too uniform

`src/pages/saas-pricing/[slug].astro` currently renders all tools through the
same major structure:

- hero
- inputs and results
- methodology sidebar
- compare and sensitivity panels
- long guide section
- recommended next steps

That layout is clean, but it does not give the flagship tools a stronger
decision-led reading path than the rest of the toolkit.

### Curated follow-up links are still too broad

The current `guideLinks` logic in `src/pages/saas-pricing/[slug].astro`
includes many generic or weakly related pages for the same slug, especially for
usage and API tools. Although some of these links are filtered by governance,
the overall pattern is still broader than what a flagship retained page should
surface.

## Problem statement

The site now has a stronger retained core, but its highest-value calculator
pages still do not fully express that strength at the page-experience layer.

For `usage-based-pricing-calculator` and `api-pricing-calculator`, the page
should do four things more clearly:

- explain how to read the outputs as pricing decisions
- show when the simple model stops being enough
- point to the next commercial structure decision
- keep the visible support path tight and intentional

## Approaches considered

### Option 1: Strengthen only content inside `tools.ts`

This would continue the earlier pattern of updating metadata, FAQs, and support
clusters without changing page structure.

Why it is not enough:

- those fields are already fairly rich
- the page still looks too generic
- it would improve information density more than actual page experience

### Option 2: Full tool-template redesign

This would refactor `src/pages/saas-pricing/[slug].astro` for all tools at
once.

Why it is not the right batch:

- too much scope for the site's current stage
- too much verification surface
- increases risk of broad, low-signal work

### Option 3: Two flagship-page overlays on the existing template

Keep the shared tool template, but add narrowly scoped, slug-specific flagship
sections and curated follow-up logic for the two most important tools:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`

This is the best option because it improves page experience where it matters
most without turning into a full template rewrite.

## Recommendation

Use Option 3.

Why:

- it keeps scope narrow
- it creates clearer breakout pages instead of average improvements everywhere
- it matches the site's current strategy of "fewer, stronger pages"
- it lets us tighten visible support links and page narrative at the same time

## Proposed page behavior

### Shared template changes

Add a lightweight flagship-page layer in `src/pages/saas-pricing/[slug].astro`
that only activates for the two selected slugs.

This layer should introduce:

- a stronger decision summary block near the results area
- a "when to change the packaging structure" style section
- a tighter curated next-step panel for flagship pages

These additions should live alongside the existing calculator UI, not replace
it.

### Usage-based flagship page

The usage page should read like:

- "set a usage price"
- "see when the unit breaks under real customer patterns"
- "decide whether included usage, tiers, overage, or a floor is the real
  answer"

The page-level messaging should foreground:

- buyer estimation
- bill shock risk
- included usage
- overage
- minimum commitment

### API flagship page

The API page should read like:

- "find a price floor per call or per 1,000 calls"
- "check whether the billable event is commercially honest"
- "decide whether rate limits, overage, or a platform fee are doing too much of
  the packaging work"

The page-level messaging should foreground:

- billable event clarity
- rate-limit separation
- platform fee vs usage rate
- overage and included usage decisions

## Link-curation changes

For the two flagship slugs, the page should not inherit the broad generic
`guideLinks` set.

Instead it should expose a tighter retained path:

### Usage page curated path

- `value-metric-selection`
- `usage-based-pricing-examples`
- `minimum-commitment-model`
- `usage-based-pricing`
- `value-metric`
- `overage`

### API page curated path

- `api-cost-estimation`
- `api-pricing-model`
- `api-call`
- `rate-limit`
- `overage`
- `minimum-commitment-model` or platform-floor support only if still justified

## Testing strategy

This batch should tighten tests before implementation in two layers.

### Tool content / cluster layer

Continue to enforce:

- usage-based content expectations
- API pricing content expectations
- core tool cluster expectations

### Tool page experience layer

Add or tighten tests so the page template explicitly requires flagship-page
elements for:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`

That should verify:

- presence of stronger decision sections
- tighter curated follow-up resources
- absence of broad low-value guide spillover on those two pages

## Non-goals

This batch should not:

- rewrite every tool page
- change calculator formulas
- change the toolkit hub again
- widen into storage or annual tool rewrites
- rebuild the entire tool page layout system

## Success criteria

The batch is successful if:

- the two flagship tools gain page-level decision sections beyond generic tool
  template content
- their curated next-step links become noticeably tighter
- tool behavior and calculator logic remain unchanged
- existing tool metadata tests still pass
- new or tightened flagship-page tests pass
