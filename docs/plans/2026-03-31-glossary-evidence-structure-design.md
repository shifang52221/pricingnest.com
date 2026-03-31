# Glossary Evidence Structure Design

## Goal

Upgrade the retained glossary layer so the highest-value glossary pages read like reviewed interpretation pages with an
explicit evidence chain instead of definition pages with a plain source list.

## Current problem

The glossary layer is stronger than it was earlier in the recovery effort. The retained pages now have:

- reviewed metadata
- tool and guide links
- deeper explanatory content on key terms

The remaining weak point is that glossary trust framing still stops short of the standard now used on the core tool and
core guide pages.

Current gaps:

- glossary `sources` still support only plain strings
- the glossary sidebar still renders sources as a generic list
- there is no regression test that requires glossary evidence objects with source kinds, notes, and linked support pages

That keeps the glossary layer feeling more like supplemental reference material than a clearly reviewed decision-support
layer.

## Approaches considered

### Option 1: Leave glossary sources as strings and only deepen copy

This is the smallest change, but it leaves the trust gap in place. The pages may become longer without becoming more
credible or easier to review.

### Option 2: Upgrade the retained glossary pages to the same structured evidence model used on tools and guides

Use a glossary-specific structured source schema:

```ts
type GlossarySourceKind = "internal-input" | "supporting-page" | "external-reference";

type GlossarySource = {
  label: string;
  kind: GlossarySourceKind;
  href?: string;
  note?: string;
};
```

Render the sources block as evidence cards in the sidebar.

### Option 3: Combine glossary evidence work with a second broad governance pass

This could reduce indexable surface and strengthen glossary pages at the same time, but it mixes two different risk
types in one batch and makes verification noisier.

## Recommendation

Use Option 2 for this batch.

Why:

- it aligns glossary quality with the tool and guide layers we just strengthened
- it raises user trust without widening the scope into another broad governance pass
- it makes retained glossary pages look more intentional to users and to Google
- it gives us a stable standard before we decide whether more glossary terms should remain indexed

## Scope for this batch

- add a glossary-specific structured source schema in `src/content/config.ts`
- add a glossary evidence regression test
- update `src/pages/glossary/[slug].astro` to render evidence cards
- add structured evidence data to the eight retained glossary pages already covered by the retained-depth test

Target glossary pages:

- `value-metric`
- `pricing-metric`
- `unit-cost`
- `gross-margin`
- `included-usage`
- `overage`
- `minimum-commitment`
- `gb-month`

## UX behavior

Each retained glossary page should show `Sources and references` in the sidebar as compact evidence cards with:

- a visible kind badge such as `Internal input` or `Supporting page`
- a clear label
- an optional internal or external link
- a short note explaining why the source matters to interpretation

This keeps the glossary pages lightweight while making them feel reviewed and usable.

## Non-goals

- no second broad `noindex` wave in this batch
- no large glossary rewrite beyond the eight retained pages
- no site-wide component abstraction refactor
- no homepage, hub, or calculator layout redesign
