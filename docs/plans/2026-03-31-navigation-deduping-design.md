# Navigation De-Templating Design

## Goal

Reduce the remaining template feel across retained pages and hubs by tightening next-step navigation, replacing slug-like
labels with human-readable titles, and reducing inventory-style browse patterns.

## Current problem

The recent recovery waves strengthened trust signals on core tool, guide, and glossary pages. The site now feels more
reviewed and less ad-driven, but one quality issue still shows through:

- too many related links still read like inventory lists
- some labels are derived from slugs instead of page titles
- guide and glossary hubs still expose a `Browse more ...` pattern that feels closer to a content catalog than a
  curated decision path
- glossary sidebars in particular still feel segmented into generic buckets rather than a stronger editorial next-step
  flow

This weakens both user experience and the “human-curated site” impression that matters for Google quality evaluation.

## Approaches considered

### Option 1: Keep current hubs and only polish copy

This is low-risk, but it would leave the structural template feel intact. Better wording alone does not solve the
inventory problem.

### Option 2: Tighten retained-page navigation and hub pathways without changing site architecture

Use the current Astro pages, but:

- make related labels resolve to real page titles where possible
- replace generic related-link buckets with a stronger `Recommended next steps` structure
- reduce the prominence of `Browse more` inventory lists on guides and glossary hubs
- keep the toolkit hub focused on core workflows rather than weak follow-on layers

This is the best balance between SEO quality improvement and implementation scope.

### Option 3: Broad IA rewrite across hubs, templates, and governance

This could produce the cleanest result, but it is too large for the current recovery batch and would blur together UX,
SEO, and governance work in one risky wave.

## Recommendation

Use Option 2 for this batch.

Why:

- it directly targets the remaining template feel
- it improves user pathways without introducing a redesign
- it strengthens the “people-first, editorially curated” signal on retained pages
- it sets up a cleaner base for a later second-pass governance review

## Scope for this batch

- add helper logic in retained page templates so guide/glossary related labels resolve to actual titles from content
- update `src/pages/guides/[slug].astro` to surface a stronger next-step section
- update `src/pages/glossary/[slug].astro` to surface a stronger next-step section
- reduce inventory-style browse output on `src/pages/guides/index.astro`
- reduce inventory-style browse output on `src/pages/glossary/index.astro`
- tighten `src/pages/saas-pricing/index.astro` so it emphasizes core workflows and not weaker use-case layers
- add regression coverage for de-templated navigation and label quality

## UX behavior

### Detail pages

Guide and glossary detail pages should still show editorial metadata and evidence, but the navigational area should be
more action-oriented:

- one clear `Recommended next steps` block
- links grouped by what the reader should do next, not by raw content type alone
- human-readable page titles rather than slug-derived labels

### Hub pages

Guide and glossary hubs should remain curated landing pages, not broad mini-sitemaps. They should:

- keep featured clusters
- de-emphasize generic browse-all behavior
- route users into the strongest retained clusters first

## Non-goals

- no second broad `noindex` wave in this batch
- no redesign of the homepage
- no changes to calculator formulas or SEO metadata logic
- no site-wide component abstraction project
