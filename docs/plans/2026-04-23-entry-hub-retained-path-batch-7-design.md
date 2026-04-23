# Entry Hub Retained Path Batch 7 Design

## Goal

Tighten the site's core entry pages so the strongest retained calculator paths
are more obvious and the hubs feel less like resource directories.

## Why this batch exists

The recent batches improved individual flagship pages:

- `usage-based-pricing-calculator`
- `api-pricing-calculator`
- `compute-cost-estimator`
- `storage-cost-calculator`

That work made the destination pages stronger. The next risk is that the site
still enters those pages through hubs that can read more like libraries than
like a focused decision system.

If homepage and section hubs still feel broad or inventory-shaped, users and
search systems can miss the real structure:

- a small set of retained core calculator pages
- a smaller set of retained guides and glossary terms supporting them
- fewer paths that matter more

This batch exists to make that structure more obvious without expanding scope.

## Current state

The four entry hubs already contain useful curation:

- `/`
- `/saas-pricing/`
- `/guides/`
- `/glossary/`

The problem is not lack of links. The problem is that some entry areas still
mix:

- strong core paths
- secondary workflows
- generic resource-library language

That weakens the main signal we have been building.

## Problem statement

The site's retained core is getting stronger, but the entry experience still
does not always make the four core calculator paths feel like the site's main
decision spine.

The next gain should come from:

- clearer priority among entry links
- tighter wording around "what to open first"
- stronger cross-linking between the four core calculators and their retained
  guide/glossary support
- lower emphasis on secondary hub browsing behavior

## Approaches considered

### Option 1: Only adjust homepage and toolkit hub

This would tighten `/` and `/saas-pricing/` while leaving `/guides/` and
`/glossary/` mostly as they are.

Why this is not enough:

- it improves the top-level entry but leaves two important retained hubs
  relatively directory-like
- the overall site spine still stays less visible than it should

### Option 2: Broad hub redesign

This would redesign multiple hubs and likely introduce new navigation patterns,
new components, or much broader content reshuffling.

Why this is the wrong move:

- too much scope for this stage
- higher regression risk
- easy to slip from focused curation into fresh template work

### Option 3: Light retained-path tightening across all four hubs

Keep the current structure and components, but refine copy, section emphasis,
and core-path linking across the four entry hubs.

This is the best option because it strengthens the site's main spine without
opening a new design wave.

## Recommendation

Use Option 3.

This batch should stay deliberately narrow:

- no new URLs
- no new template systems
- no broad content deletion
- no new content inventory

Just tighten the way the four strongest calculator paths are presented and
connected.

## Proposed behavior

### Homepage

The homepage should make the four retained decision paths feel like the first
things to do:

- usage pricing
- API pricing
- storage pricing
- compute pricing

It should reduce the feeling that homepage is a general entry into all
resources. Secondary calculator topics can remain visible, but they should not
compete with the four main paths.

### Toolkit hub

`/saas-pricing/` should read more clearly as the home of the four core
calculator workflows, not just a long tool list plus a mixed sidebar.

The toolkit hub should:

- foreground the four retained workflows
- lower emphasis on secondary "next reads" that are not part of those paths
- keep the broader tool list available without letting it dominate

### Guides hub

`/guides/` should behave less like a guide library and more like a retained
decision-guide hub feeding the four core calculator workflows.

The strongest guide groups should map more directly to:

- usage
- API
- storage
- compute

The hub copy should tell users to start with one retained path, not browse the
inventory.

### Glossary hub

`/glossary/` should behave less like a term list and more like a focused
language-prep layer for the same retained paths.

It should:

- make the first-read terms for API, storage, usage, and compute more obvious
- connect those terms back into the strongest calculator and guide paths
- reduce the feel of generic glossary browsing

## Content strategy

This batch improves quality through prioritization, not expansion.

### Structural signal

The four strongest calculator paths should appear more consistently as the main
spine across entry hubs.

### Editorial signal

Hub wording should reinforce:

- start with the strongest retained page
- move to the linked support page only when needed
- avoid browsing broad resource inventory first

## Testing strategy

This batch should be guarded with hub-level regression tests.

### Hub curation expectations

Update `tests/hub-curation.test.mjs` so the four hubs must reflect the tighter
retained-path structure.

### Link concentration expectations

Use `tests/retained-link-concentration.test.mjs` and existing navigation tests
to make sure the hubs still point to retained guides and glossary terms instead
of reintroducing broader inventory patterns.

### Build and quality guardrails

Keep the broader build and navigation suite green so this batch remains a light
entry-layer tightening and not a hidden content expansion.

## Non-goals

This batch should not:

- add or remove URLs
- redesign all navigation globally
- change individual guide or glossary content bodies
- expand the number of retained pages
- add new components just for hub styling

## Success criteria

The batch is successful if:

- homepage, toolkit, guides, and glossary hubs present a clearer four-path
  retained spine
- hub language feels less like a library or directory
- secondary paths remain available but visibly subordinate
- existing retained-link and navigation tests continue to pass
