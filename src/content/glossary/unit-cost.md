---
title: "Unit Cost"
description: "Cost per unit of usage (call, event, GB, minute) used to set margin-safe prices."
updated: "2026-01-30"
category: "unit-economics"
guides: ["compute-cost-baselines", "monthly-cloud-cost-variance", "price-floor-by-margin", "usage-allocation-cost", "capacity-planning-pricing"]
tools: ["usage-based-pricing-calculator","api-cost-estimator"]
glossary: ["cogs","gross-margin","variable-cost","usage-based-pricing"]
---
## Definition
Unit cost is the cost to deliver one measurable unit of usage such as an API call, event, GB, or minute.
## Why it matters
Unit cost is the anchor for margin-safe pricing in usage-based models and for evaluating discounts.
## Pricing implications
Set unit prices to cover unit cost at target margins, with tiers that match cost decreases at scale.
## Measurement tips
Use blended vendor rates, include support and compute time, and validate with p90 usage profiles.
## Checklist
- Define the unit of usage clearly.
- Include all variable costs tied to usage.
- Separate shared overhead from unit cost.
- Model unit cost by region and product line.
- Compare unit price to unit cost monthly.
- Recalculate after infrastructure changes.
- Track unit cost trends over time.
- Document formulas and assumptions.
## Examples
- .0006 per API call based on infra and vendor costs.
## Related calculators
- [Usage Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/)
- [Api Cost Estimator](/saas-pricing/api-cost-estimator/)
## Related glossary terms
- [Cogs](/glossary/cogs/)
- [Gross Margin](/glossary/gross-margin/)
- [Variable Cost](/glossary/variable-cost/)
- [Usage Based Pricing](/glossary/usage-based-pricing/)
