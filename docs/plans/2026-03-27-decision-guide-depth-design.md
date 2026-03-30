# Decision Guide Depth Design

**Date:** 2026-03-27

**Goal:** Upgrade three still-indexed guides from thin checklist pages into decision-oriented guides that better match user intent, strengthen site quality signals, and reduce scaled-template risk.

## Scope

This design covers:

- `src/content/guides/pricing-localization.md`
- `src/content/guides/support-tier-packaging.md`
- `src/content/guides/storage-retrieval-fees.md`

This phase does not change routing, Astro page rendering, collections, or guide page layout. It only upgrades content depth and adds a guardrail test to keep these guides from drifting back into generic template content.

## Problem

These three pages are currently indexable, but their content shape is too light and too repetitive:

- each page follows the same short checklist template
- each page answers the topic at a surface level only
- the pages do not clearly help a reader decide when to use a strategy, when not to use it, or how to evaluate trade-offs
- they risk looking like scaled supporting content instead of original editorial guidance

For indexable pages, this is the wrong quality bar. If a page stays indexed, it should stand on its own as a real decision aid.

## Chosen Approach

Use a decision-guide structure for all three pages, but customize each page heavily to its topic. The shared quality bar is:

1. Explain when the strategy fits and when it does not.
2. Identify the inputs or decision factors a team must confirm first.
3. Add a practical evaluation framework, not just generic steps.
4. Call out common mistakes and failure modes.
5. Keep useful internal links to calculators and glossary terms.
6. End with an execution-oriented checklist.

This approach improves user usefulness without introducing new templates, new routes, or a site-wide refactor.

## Guide-Specific Content Model

### Pricing Localization

This guide should help teams decide whether they need true regional pricing or only basic multi-currency presentation.

Key sections:

- when localization is worth doing
- when to keep a global list price
- decision factors such as currency, FX volatility, tax, payment methods, and arbitrage risk
- pricing approach options such as uniform global pricing, regional bands, or localized price points
- common mistakes such as over-localizing packaging or underestimating operational complexity
- final rollout checklist

### Support Tier Packaging

This guide should help teams package support as an economic and service-design decision, not a vague plan feature list.

Key sections:

- when support should be bundled, sold as an add-on, or reserved for higher tiers
- decision factors such as SLA, response time, support channels, coverage window, escalation path, and staffing cost
- packaging options and the trade-offs of each
- red flags such as promising 24x7 support without staffing depth
- mistakes that create margin leakage or support disputes
- final packaging checklist

### Storage Retrieval Fees

This guide should help teams model retrieval fees as a distinct cost and pricing decision instead of mixing them into storage or bandwidth by default.

Key sections:

- when retrieval fees matter enough to price separately
- decision factors such as cold storage usage, retrieval frequency, request fees, regional pricing differences, and peak recovery behavior
- cost breakdown between storage, retrieval, request fees, and egress
- pricing treatment options such as bundled recovery, separate fee disclosure, or overage handling
- common mistakes such as assuming retrieval is rare or using vendor list prices without usage mix validation
- final pricing checklist

## Testing Strategy

Add one focused content test that checks only these three guides for decision-guide depth. The test should verify:

- each guide contains decision-oriented section signals
- each guide includes topic-specific vocabulary
- each guide retains calculator and glossary internal links

The test should avoid asserting exact prose. It should enforce quality intent, not freeze writing style.

## Why This Is The Best Fit

Compared with a light copy refresh, this raises the usefulness threshold enough to matter for indexed pages.

Compared with a full research-style rewrite, it is faster and better matched to the current site architecture and content workflow.

Compared with publishing new pages, it improves the quality of existing URLs that already deserve to stay in the site structure.

## Risks And Guardrails

Risk: the guides could still read like the same template with different nouns.

Guardrail: each page must include topic-specific decision factors and failure modes that are unique to the subject.

Risk: the content could become long without becoming more useful.

Guardrail: every new section must help a user make a pricing, packaging, or cost-recovery decision.

Risk: later edits could shrink the guides back into short checklist pages.

Guardrail: add a dedicated test for these three guides so quality drift is caught in CI and local verification.
