---
title: "Burst Traffic"
description: "Spiky usage patterns; increases risk in usage-based pricing and capacity planning."
updated: "2026-01-30"
category: "api"
---

## Definition
Burst traffic is spiky usage where demand surges above the baseline for short periods.

## Why it matters
Bursty usage can drive cost spikes and bill shock. Pricing models need to protect margin during peak periods.

## Pricing implications
Use tiered pricing, minimum fees, or rate limits to reduce risk. If burst costs are high, overage rates should reflect
peak cost, not just average cost.

## Measurement tips
Track p90 and p99 usage to understand how often spikes occur.

## Checklist
- Measure peak vs average usage (p90, p99).
- Include burst costs in unit pricing.
- Use alerts before customers hit peak thresholds.
- Consider usage caps or minimums for heavy users.
- Model burst scenarios in pricing tests.
- Align infrastructure scaling costs with pricing.
- Document burst assumptions in pricing reviews.
- Avoid basing pricing solely on average usage.
