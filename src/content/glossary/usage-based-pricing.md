---
title: "Usage-Based Pricing"
description: "Charging based on consumption (calls, events, GB, minutes) instead of seats alone."
updated: "2026-03-31"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-03-31"
category: "pricing-models"
guides: ["usage-mix-modeling", "price-floor-by-margin"]
tools: ["usage-based-pricing-calculator","tiered-usage-pricing-calculator"]
glossary: ["seat-based-pricing","value-metric","unit-cost","overage"]
sources:
  - kind: "internal-input"
    label: "Usage distribution and bill-shock review"
    note: "Check average versus heavy account behavior, margin by unit, and buyer predictability before using usage-based pricing as the default model."
  - kind: "supporting-page"
    label: "Usage-Based Pricing Calculator"
    href: "/saas-pricing/usage-based-pricing-calculator/"
    note: "Use it to test whether the chosen unit still supports the target gross margin once fixed overhead is included."
  - kind: "supporting-page"
    label: "Usage-Based Pricing Examples"
    href: "/guides/usage-based-pricing-examples/"
    note: "Review concrete unit, tier, and included-usage patterns before publishing the pricing model."
  - kind: "supporting-page"
    label: "Value Metric"
    href: "/glossary/value-metric/"
    note: "Keep the billing model tied to a unit that buyers understand and that scales with customer value."
---
## Definition
Usage-based pricing charges customers based on measurable consumption instead of a fixed seat count or flat fee.
## Why it matters
It aligns price with value, scales with customer growth, and can protect margins when costs track usage.
## Pricing implications
Define a clear value metric, include a reasonable allowance, and set overages or tiers that reflect marginal cost.
## Design choices
Choose the usage unit, decide on included usage, pick tier shapes, and determine how to handle spikes.
## Measurement tips
Track usage distributions (P50, P90), revenue per unit, and margin per unit to validate the model.
## Checklist
- Define the value metric and unit clearly.
- Publish usage examples so buyers can estimate spend.
- Set included usage to cover typical customers.
- Use tiers or overages for heavy users.
- Align unit prices with unit cost and margin targets.
- Monitor expansion and contraction by cohort.
- Provide usage dashboards and alerts.
- Review pricing after cost changes.
## Examples
- .003 per API call after 10,000 included.
- Tiered GB: 0 to 1 TB, 1 to 10 TB, 10 TB+.
## Related calculators
- [Usage Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/)
- [Tiered Usage Pricing Calculator](/saas-pricing/tiered-usage-pricing-calculator/)
## Related glossary terms
- [Seat Based Pricing](/glossary/seat-based-pricing/)
- [Value Metric](/glossary/value-metric/)
- [Unit Cost](/glossary/unit-cost/)
- [Overage](/glossary/overage/)
