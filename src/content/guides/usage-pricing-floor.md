---
title: "Usage Pricing Floors and Base Fees"
description: "Set a pricing floor for usage models and decide when a base fee is required to cover fixed costs."
updated: "2026-01-31"
tags: ["usage-based-pricing", "unit-economics"]
tools: ["usage-based-pricing-calculator", "tiered-usage-pricing-calculator", "api-pricing-calculator"]
glossary: ["usage-based-pricing", "fixed-cost", "overage", "gross-margin"]
---

## Quick checklist
- Separate fixed overhead from variable unit cost.
- Model p50 and p90 usage to stress-test unit pricing.
- Add a base fee when fixed cost is meaningful.
- Use tiers to keep pricing predictable at scale.

## Step-by-step
1. Compute all-in unit cost: variable cost + fixed cost per unit.
2. Set a margin target and solve for the unit price floor.
3. Stress-test p90 usage to ensure margins hold at scale.
4. Add a base fee if low-usage customers underpay.
5. Use tiers to control bill shock and revenue volatility.

## Signals that you need a base fee
- Fixed overhead >20% of total cost at p50 usage.
- Unit price looks uncompetitive without a minimum.
- Usage is highly volatile month to month.

## Common mistakes
- Pricing only on variable cost and ignoring fixed overhead.
- Using a unit customers cannot estimate.
- Skipping tiers and exposing users to bill shock.
- Setting a free tier without modeling paid unit volume.

## Tools to use
- [Usage-Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/)
- [Tiered Usage Pricing Calculator](/saas-pricing/tiered-usage-pricing-calculator/)
- [API Pricing Calculator](/saas-pricing/api-pricing-calculator/)

## Related glossary terms
- [Usage-Based Pricing](/glossary/usage-based-pricing/)
- [Fixed Cost](/glossary/fixed-cost/)
- [Overage](/glossary/overage/)
- [Gross Margin](/glossary/gross-margin/)
