# PricingNest Site Quality and Trust Design

**Date:** 2026-03-27

## Goal

Reduce low-quality template signals on `pricingnest.com` while strengthening editorial trust, structured data, and user-facing clarity on the homepage and core content templates.

## Constraints

- Keep the current site structure intact.
- Avoid a major refactor.
- Focus on the English site experience.
- Improve quality signals before expanding content breadth.

## Problem Summary

- Core templates still expose low-trust phrases such as "Auto-generated from your inputs", "Advertisement", and "More to explore".
- Tool pages surface too many related links, which makes the experience feel programmatic rather than curated.
- Guide and glossary templates lack editorial review context and page-level schema that signals original, reviewed, user-helpful content.
- The About page is informative but not strong enough on methodology, scope, and limitations.
- Homepage trust messaging has been improved already, but the rest of the site still lags behind.

## Options Considered

### Option 1: Quality-first template cleanup

Tighten the homepage, tool, guide, glossary, and About templates to remove low-quality cues and add stronger editorial signals.

**Pros**

- Highest leverage with limited code change.
- Directly addresses likely quality-review risks.
- Improves both SEO interpretation and user confidence.

**Cons**

- Does not solve thin content across the whole site in one pass.

### Option 2: Publish more content first

Create more guides and supporting pages around high-opportunity keywords.

**Pros**

- Can increase query coverage over time.

**Cons**

- Risks making the thin-content footprint worse.
- Does not fix the template-level trust problem.

### Option 3: Full architecture/content refactor

Rework information architecture, content collections, and internal linking rules.

**Pros**

- Could produce a cleaner long-term foundation.

**Cons**

- Too disruptive for the current site stage.
- High risk, slower to ship, harder to verify safely.

## Recommended Direction

Use **Option 1** now.

This batch should focus on removing low-quality signals from the templates that rank today, strengthening editorial context, and improving core user experience without destabilizing the site.

## Scope

### In scope

- Homepage trust messaging review
- About page rewrite
- Tool page cleanup for trust and navigation quality
- Guide template editorial metadata and `Article` schema
- Glossary template editorial metadata and `DefinedTerm` schema
- Regression tests for quality/trust rules

### Out of scope

- Large-scale content rewriting across all guides and glossary entries
- Major design system refactor
- Broad new page creation

## Success Criteria

- Core templates no longer surface obvious low-quality or ad-heavy language on key pages.
- Tool pages present a smaller, more curated next-step experience.
- Guides and glossary pages show editorial review context and structured schema.
- The site has tests that fail if these trust signals regress.

