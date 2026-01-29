---
title: "Bandwidth Pricing Guide (Egress Cost Recovery)"
description: "How to price bandwidth/egress features using blended costs, tiers, and gross margin targets."
updated: "2026-01-29"
tags: ["bandwidth"]
tools: ["bandwidth-cost-calculator","usage-based-pricing-calculator"]
glossary: ["egress","gross-margin","cogs"]
---

## Quick checklist
- Use blended egress cost per GB across regions and CDNs.
- Separate bandwidth from storage and request costs.
- Model at least two scenarios (p50 vs p90 traffic).
- Use a base fee if overhead is meaningful.
- Publish usage examples to prevent bill shock.

## Step-by-step
1. Estimate your blended egress cost per GB (post-discount, weighted by region).
2. Add fixed overhead you need to recover (support, monitoring, baseline infra).
3. Pick a target gross margin range.
4. Choose tiers and included usage based on typical and heavy customers.
5. Validate outputs with CSV exports and shareable links.

## Example scenarios
- **Low-traffic SaaS**: small base fee + per-GB price keeps small customers profitable.
- **Media-heavy product**: tiered per-GB pricing with declining rates for high volume.
- **Global traffic**: adjust blended cost per GB to account for regional mix.

## Common mistakes
- Using a single region egress price when traffic is global.
- Pricing bandwidth below cost to simplify the pricing page.
- Ignoring request or origin-fetch costs when they are material.


## Tools to use
- [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/)
- [Usage Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/)


## Related glossary terms
- [Egress](/glossary/egress/)
- [Gross Margin](/glossary/gross-margin/)
- [Cogs](/glossary/cogs/)
