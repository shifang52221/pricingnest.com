# Credibility Refresh Design

## Goal

Strengthen trust signals for PricingNest without inventing fake authority, fake customer proof, or inflated expert claims.

## Scope

This batch updates three surfaces:

- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/saas-pricing/[slug].astro`

## Strategy

The site already has baseline trust components such as an About page, a Contact page, visible review dates, methodology links, and correction-policy references. The weakness is that most of the current trust layer is self-descriptive rather than responsibility-driven.

This refresh should make the site feel more accountable by clarifying:

- why the site exists
- who maintains the site
- who should use it
- what it does not replace
- what a review date means
- how to request a correction
- what inputs users must replace before relying on a calculator

## Content Principles

- Do not claim credentials the site cannot verify
- Do not fabricate external proof such as clients, press mentions, or expert endorsements
- Prefer transparent limits and explicit responsibility over marketing language
- Keep the editorial identity as `PricingNest Editorial Team`, but make the maintenance and correction process feel more real and specific

## Success Criteria

- About page reads like a responsibility page, not just a brand blurb
- Contact page reads like a real editorial contact and correction route
- Tool pages explain what review means and what users must validate themselves
- Existing build and trust tests continue to pass
