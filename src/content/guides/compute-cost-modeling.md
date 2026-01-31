---
title: "Compute Cost Modeling Guide"
description: "Build a clean compute cost model for vCPU and memory usage, then translate it into a margin-safe price."
updated: "2026-01-31"
tags: ["cloud-costs", "unit-economics"]
tools: ["compute-cost-estimator", "monthly-cloud-cost-estimator"]
glossary: ["cogs", "gross-margin", "fixed-cost", "variable-cost"]
---

## Quick checklist
- Pull the last 90 days of vCPU-hours and GB-hours from billing exports.
- Use blended rates after discounts or savings plans.
- Separate compute from storage and bandwidth to avoid double counting.
- Add fixed overhead for on-call, monitoring, and support.
- Validate output prices against competitor benchmarks.

## Inputs to gather
- **vCPU-hours per month**: use average steady-state usage, not peaks.
- **Memory GB-hours per month**: include cache or memory-heavy workloads.
- **Cost per vCPU-hour**: blended rate after commitments.
- **Cost per GB-hour**: blended rate for memory usage.
- **Monthly fixed cost**: monitoring, on-call, platform overhead.
- **Target gross margin**: finance policy (often 70-85% for SaaS).

## Step-by-step
1. Estimate monthly vCPU-hours and memory GB-hours (p50 and p90).
2. Apply blended unit costs for CPU and memory.
3. Add fixed overhead to get total monthly cost.
4. Solve for price at your target margin.
5. Compare effective price per vCPU-hour to market ranges.

## Benchmarks and guardrails
- If fixed overhead is >30% of total cost, consider a base fee.
- If target margin >85%, expect price pressure in mid-market.
- If memory cost dominates, review cache and instance sizing.

## Common mistakes
- Modeling peak hours instead of average steady-state usage.
- Mixing on-demand and reserved pricing without a blended rate.
- Forgetting support and monitoring in fixed overhead.
- Double counting storage or bandwidth inside compute.

## When to add a base fee
- Your fixed overhead is meaningful relative to variable cost.
- Small customers would underpay without a minimum.
- You need a predictable revenue floor for capacity planning.

## Tools to use
- [Compute Cost Estimator](/saas-pricing/compute-cost-estimator/)
- [Monthly Cloud Cost Estimator](/saas-pricing/monthly-cloud-cost-estimator/)

## Related glossary terms
- [COGS](/glossary/cogs/)
- [Gross Margin](/glossary/gross-margin/)
- [Fixed Cost](/glossary/fixed-cost/)
- [Variable Cost](/glossary/variable-cost/)
