# Usage-Based Intent Tightening Design

## Goal

Tighten the search intent, editorial signals, and retained-core pathways around
`/saas-pricing/usage-based-pricing-calculator/` so the page reads more like a pricing-decision tool and less like a
generic calculator entry.

## Current evidence

- The live page already removed the old `Delta CSV Template` metadata angle, but one legacy test still expects that
  wording and no longer reflects the real SEO strategy.
- The page content is functional, but the highest-visibility support modules still lean on broader explanatory content:
  - `sources` currently point to `Usage-Based Pricing Examples` and `Value Metric Selection`
  - `Recommended next steps` currently route to `Usage-Based Pricing Examples`, `Value Metric`, `Usage-Based Pricing`,
    and `Included Usage`
- That support set is relevant, but it under-emphasizes the retained decision layer we want Google and users to see:
  - `Value Metric Selection`
  - `SaaS Gross Margin Targets`
  - `Minimum Commitment Modeling`
- The FAQ mix still includes some generic operational questions like exporting scenarios, while the page would benefit
  more from decision-focused questions about margin pressure, pricing floors, and minimum commitments.

## Core problem

The page is not low quality, but its supporting signals are still a little too broad and utilitarian relative to how
important this calculator is to the whole site.

For the strongest tool page on the site, we want the visible support layer to reinforce:

- value metric choice
- margin discipline
- commercial floor design

That is a better editorial and SEO signal than spending scarce FAQ and support-link real estate on lower-value helper
questions.

## Approaches considered

### Option 1: Small intent-tightening pass on this one tool

Update only:

- tests that still encode the old intent
- usage-based tool metadata content in `src/lib/tools.ts`
- curated follow-up links for the usage-based cluster

This is the best option because it improves one of the site's most important pages with very low implementation risk.

### Option 2: Broader rewrite of the usage-based tool template and content structure

This could go further, but it adds more moving parts than we need right now.

## Recommendation

Use Option 1.

Why:

- it fixes outdated test expectations
- it strengthens one of the site's highest-value pages without widening scope
- it concentrates more link equity and editorial context into the retained core
- it preserves the working calculator UX and layout

## Scope for this batch

- Update usage-based SEO/content regression tests so they require the current intent and reject the old `Delta CSV`
  angle.
- Tighten usage-based `sources` around retained core decision pages.
- Replace more generic FAQ items with decision-oriented FAQ items about:
  - choosing a value metric
  - handling high fixed cost per unit
  - deciding when to add a platform fee or minimum commitment
  - translating a unit-price floor into tiers or annual offers
- Refresh the usage-based core-cluster links so `Recommended next steps` emphasize retained guides over weaker support
  pages.

## Success criteria

- no usage-based SEO or content regression test expects `Delta CSV Template`
- the page's visible support layer routes users into retained core pages first
- FAQ content reads more like pricing guidance than tool help
- the page still builds and keeps the same calculator behavior

## Non-goals

- no calculator formula changes
- no layout rewrite
- no multi-tool content pass
- no broad internal-link refactor beyond the usage-based cluster
