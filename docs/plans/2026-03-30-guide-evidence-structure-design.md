# Guide Evidence Structure Design

## Goal

Upgrade the five retained core guide pages so the sidebar evidence section reads like a reviewed trust module instead of
a plain source list or an empty metadata block.

## Current problem

The retained guides already have stronger editorial metadata than before. They now show author, review date, related
tools, and related glossary terms. The remaining weak point is that the pages do not expose a structured evidence chain.

That leaves three SEO and quality gaps on some of the most important retained pages:

- users cannot tell which internal inputs should be validated before acting on the guide
- users cannot tell which linked PricingNest pages support the recommendation
- the review block still looks lighter than the equivalent trust block on the core calculator pages

## Approaches considered

### Option 1: Reuse the shared `sources` field as `string | object` everywhere

This is the lowest-friction implementation because both guides and glossary could accept either plain strings or
structured objects. The downside is that it weakens the guide constraint and leaves more room for low-value source lists
to slip back in.

### Option 2: Give guides their own structured source schema

This keeps glossary behavior unchanged while requiring guide evidence to use a stronger object shape:

```ts
type GuideSourceKind = "internal-input" | "supporting-page" | "external-reference";

type GuideSource = {
  label: string;
  kind: GuideSourceKind;
  href?: string;
  note?: string;
};
```

This is the cleanest quality-focused option because the five retained guides can adopt the same evidence language as the
core tool pages without expanding the scope.

### Option 3: Build a shared evidence abstraction for guides, glossary, and tools

This is the most unified long-term direction, but it is larger than this batch needs. It introduces more moving parts,
more regression surface, and more review overhead than necessary for the current quality push.

## Recommendation

Use Option 2 for this batch.

Why:

- it upgrades the highest-value retained guides without widening the change surface
- it keeps glossary untouched, which reduces risk
- it raises the minimum evidence quality for guide pages instead of adding a permissive compatibility layer
- it stays consistent with the structured evidence approach already shipped on the core tool pages

## UX behavior

Each retained guide should render a `Sources and references` section in the sidebar using compact evidence cards. Each
card should show:

- a visible kind badge such as `Internal input` or `Supporting page`
- a clear evidence label
- an optional internal or external link when relevant
- a short note explaining how the source supports review or decision-making

This gives users a clearer evidence path and makes the guide feel more reviewed and less generic.

## Scope for this batch

- add a guide-specific structured source schema in `src/content/config.ts`
- add a focused test that locks the new guide evidence model
- update `src/pages/guides/[slug].astro` to render evidence cards
- add structured sources to the five retained core guides
- reuse the existing `.source-*` styles instead of expanding the CSS unnecessarily

## Non-goals

- no site-wide content model refactor
- no glossary evidence redesign in this batch
- no formula or calculator behavior changes
- no large layout or navigation redesign
