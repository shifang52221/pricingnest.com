---
title: "Storage Costs & Pricing (Cost per GB-Month)"
description: "How to model storage costs, request costs, and a margin-safe price."
updated: "2026-01-29"
tags: ["storage","unit-costs"]
tools: ["storage-cost-calculator","price-per-gb-month-calculator","bandwidth-cost-calculator"]
glossary: ["cogs","gross-margin"]
---

## Quick checklist
- Separate GB-month storage cost from request costs.
- Use blended cost per GB-month across regions and classes.
- Model at least two scenarios (p50 vs p90 usage).
- Use a base fee if fixed overhead is meaningful.
- Publish example bills for typical workloads.

## Step-by-step
1. Estimate blended cost per GB-month from your storage mix.
2. Add request costs based on monthly operation volume.
3. Add fixed overhead you need to recover.
4. Pick a target gross margin range.
5. Validate outputs with CSV exports and shareable links.

## Example scenarios
- **Archive storage**: high GB-month, low requests.
- **Read-heavy product**: moderate GB-month, high request volume.
- **Premium storage**: higher cost per GB-month with encryption or replication.

## Common mistakes
- Ignoring request costs when they are material.
- Using peak storage instead of average GB-month.
- Hiding storage unit definitions in docs.


## Tools to use
- [Storage Cost Calculator](/saas-pricing/storage-cost-calculator/)
- [Price Per Gb Month Calculator](/saas-pricing/price-per-gb-month-calculator/)
- [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/)


## Related glossary terms
- [Cogs](/glossary/cogs/)
- [Gross Margin](/glossary/gross-margin/)
