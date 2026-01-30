---
title: "API Tier Design (Breakpoints, Overages, Included Calls)"
description: "How to pick tier breakpoints and included usage so bills stay predictable while margins hold."
updated: "2026-01-29"
tags: ["api-pricing","tiers"]
tools: ["tiered-usage-pricing-calculator","api-pricing-calculator","api-cost-estimator"]
glossary: ["usage-based-pricing","gross-margin"]
---

## Quick checklist
- Define included calls for the base tier.
- Pick tier breakpoints based on p50, p75, and p90 usage.
- Use a platform fee to recover fixed overhead.
- Publish example bills for each tier.
- Add usage alerts to reduce bill shock.

## Step-by-step
1. Estimate blended unit costs (infra + vendor pass-through).
2. Add fixed overhead you need to recover.
3. Set a target gross margin range.
4. Choose tier breakpoints based on usage distribution.
5. Validate with example bills and CSV exports.

## Example scenarios
- **Starter tier**: low included calls with a base fee.
- **Growth tier**: lower per-call rates past tier 1.
- **Enterprise tier**: negotiated commitments and discounted overages.

## Common mistakes
- Setting tiers too close together, causing immediate overages.
- Forgetting to include a base fee for fixed costs.
- Hiding tier thresholds in docs instead of the pricing page.


## Tools to use
- [Tiered Usage Pricing Calculator](/saas-pricing/tiered-usage-pricing-calculator/)
- [Api Pricing Calculator](/saas-pricing/api-pricing-calculator/)
- [Api Cost Estimator](/saas-pricing/api-cost-estimator/)


## Related glossary terms
- [Usage Based Pricing](/glossary/usage-based-pricing/)
- [Gross Margin](/glossary/gross-margin/)
