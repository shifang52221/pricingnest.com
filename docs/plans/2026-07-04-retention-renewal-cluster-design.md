# Retention and Renewal Cluster Design

## Goal

Strengthen a group of thin retained retention guides into a coherent editorial cluster that explains renewal risk,
expansion tracking, downgrade prevention, cohort validation, and churn-reason interpretation without expanding low-
value inventory.

## Scope

This wave focuses on six retained guides:

- `src/content/guides/mrr-expansion-tracking.md`
- `src/content/guides/annual-renewal-strategy.md`
- `src/content/guides/renewal-forecasting.md`
- `src/content/guides/downgrade-prevention.md`
- `src/content/guides/retention-cohort-benchmarks.md`
- `src/content/guides/churn-survey-insights.md`

## Why This Cluster Matters

The site has already improved trust, reduced low-value retained pages, and strengthened several core pricing and unit-
economics topics. One remaining weakness is that many indexable retention pages still read like short checklists.

That is especially costly because retention, renewal, expansion, and contraction are where pricing decisions are
validated over time. If these pages stay thin, the site still looks broad but not commercially rigorous in one of the
most important operating areas.

## Design Principles

- Make the cluster read like a connected operating system, not six isolated notes.
- Clarify role boundaries so each page answers one commercial question well.
- Add explicit trust metadata and source framing to every page.
- Keep the content practical and decision-oriented rather than generic and educational.
- Avoid expanding into broad churn-content inventory outside the retained set.

## Cluster Roles

### Core operating metric page

- `mrr-expansion-tracking`

This page should define how to isolate expansion from net-new growth and contraction so the business can interpret
retention-led growth honestly.

### Renewal execution pair

- `annual-renewal-strategy`
  - role: explain how to prepare and handle annual renewals operationally
- `renewal-forecasting`
  - role: explain how to forecast renewal outcomes and revenue effect over time

These should feel related but distinct: one is the operating motion, the other is the planning and forecasting layer.

### Retention risk pair

- `downgrade-prevention`
  - role: explain contraction risk, weak tier fit, and downgrade behavior
- `churn-survey-insights`
  - role: explain how to convert churn reasons into pricing, packaging, or onboarding action

These pages should connect cause and response rather than repeat churn basics.

### Validation page

- `retention-cohort-benchmarks`

This page should explain how cohort baselines validate whether pricing, onboarding, and renewal changes are actually
working.

## Upgrade Pattern

### Shared retained-page standard

Every page in this cluster should gain:

- `author`, `reviewedBy`, and `reviewed`
- `sources` with one internal review input and relevant supporting pages
- stronger role-focused section structure
- clearer routing to adjacent guides, calculators, and glossary terms

### `mrr-expansion-tracking`

Upgrade from a short metrics checklist into a guide that explains:

- how expansion differs from new logos and simple top-line growth
- what to separate before using expansion as a decision signal
- how contraction and downgrade pressure distort the picture

### `annual-renewal-strategy` and `renewal-forecasting`

Clarify the split:

- renewal strategy answers how the team should prepare and act
- renewal forecasting answers how the team should estimate risk, timing, and revenue effect

### `downgrade-prevention`

Upgrade from a generic warning page into a guide about contraction signals, weak tier fit, overlap, and how downgrade
behavior differs from outright churn.

### `retention-cohort-benchmarks`

Upgrade into a page about validating change quality over time rather than copying generic benchmark numbers.

### `churn-survey-insights`

Upgrade into a page that explains how to translate churn reasons into real pricing, packaging, onboarding, or renewal
work rather than just collecting feedback.

## Success Criteria

- All six pages visibly meet the retained-page trust standard.
- The cluster reads like a connected retention operating system.
- Renewal, expansion, contraction, and churn-reason pages have clearer boundaries.
- Internal linking teaches what page to use next instead of just adding generic related links.
- Governance, audit, and build checks remain clean.
