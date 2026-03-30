# Tool Evidence Structure Design

## Goal

Upgrade the `Sources and references` section on the five core tool pages so it reads like a real evidence module instead
of a plain text list.

## Current problem

The current tool pages already show review dates, methodology links, and a source list. That is a meaningful step up
from the earlier template. The weak point is that `sources` is still modeled as `string[]`, so the page can only render
undifferentiated bullet text. Users cannot easily tell whether an item is:

- a real internal input they should validate
- a supporting PricingNest page they should read next
- an external reference

That makes the trust block feel flatter than it should on the most important pages.

## Recommended approach

Use a structured source model for core tools:

```ts
type ToolSourceKind = "internal-input" | "supporting-page" | "external-reference";

type ToolSource = {
  label: string;
  kind: ToolSourceKind;
  href?: string;
  note?: string;
};
```

Render those entries as compact evidence cards inside the existing `Sources and references` section.

## Why this approach

- It keeps the current site architecture intact.
- It strengthens trust on the five highest-value tool pages.
- It allows clickable internal links without losing internal-input notes.
- It gives us room to add official external references later without changing the template again.

## UX behavior

Each evidence item should show:

- a visible kind badge such as `Internal input` or `Supporting page`
- a clear label
- an optional link when the source is a page
- an optional note explaining why that source matters

This keeps the block readable on mobile and desktop while making the evidence chain more explicit.

## Scope for this batch

- Update the data model in `src/lib/tools.ts`
- Convert the five core tool pages to structured source entries
- Update `src/pages/saas-pricing/[slug].astro` to render evidence cards
- Add a small CSS pass in `src/styles/global.css`
- Tighten `tests/tool-trust-data.test.mjs`

## Non-goals

- No site-wide refactor of guide or glossary sources
- No new external docs lookup in this batch
- No change to tool formulas or calculator behavior
