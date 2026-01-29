---
title: "API Cost Estimation (Cost per Call)"
description: "How to estimate cost per request, include vendor costs, and avoid margin surprises."
updated: "2026-01-29"
tags: ["api-costs"]
tools: ["api-cost-estimator","compute-cost-estimator","monthly-cloud-cost-estimator"]
glossary: ["cogs","gross-margin"]
---

## Quick checklist
- Define the unit (call, request, message) and keep it consistent.
- Separate infra cost from vendor cost for visibility.
- Model at least two scenarios (p50 vs p90 request volume).
- Use a minimum fee if fixed overhead is meaningful.
- Validate costs against real billing data.

## Step-by-step
1. Estimate your blended infra cost per 1,000 calls.
2. Add vendor pass-through cost per 1,000 calls (LLMs, enrichment, email/SMS).
3. Add fixed overhead you need to recover (support, monitoring).
4. Pick a target gross margin range.
5. Validate outputs with CSV exports and shareable links.

## Example scenarios
- **Infra-only API**: no vendor cost, focus on compute and storage.
- **Vendor-heavy API**: high pass-through cost per 1,000 calls.
- **High-volume API**: large call volume to test cost per call stability.

## Common mistakes
- Ignoring third-party API costs until after pricing is published.
- Using peak costs instead of blended average costs.
- Omitting fixed overhead when pricing low-volume plans.


## Tools to use
- [Api Cost Estimator](/saas-pricing/api-cost-estimator/)
- [Compute Cost Estimator](/saas-pricing/compute-cost-estimator/)
- [Monthly Cloud Cost Estimator](/saas-pricing/monthly-cloud-cost-estimator/)


## Related glossary terms
- [Cogs](/glossary/cogs/)
- [Gross Margin](/glossary/gross-margin/)
