---
title: "GB-Month"
description: "Storage measured as average GB stored over a month (GB times time)."
updated: "2026-01-30"
category: "storage"
tools: ["price-per-gb-month-calculator","storage-cost-calculator"]
glossary: ["storage-costs","retrieval-fees","bandwidth","gb-month"]
---
## Definition
GB-month is a storage billing unit that multiplies the average gigabytes stored by the number of months.
## Why it matters
It is the core unit for most storage pricing and is the baseline for cost and margin modeling.
## Pricing implications
Combine GB-month with request and retrieval fees to avoid underpricing heavy-access workloads.
## Measurement tips
Track average stored data daily and apply the correct storage class and region pricing.
## Checklist
- Define how average storage is calculated.
- Separate storage class costs (standard, archive).
- Include replication and backup multipliers.
- Add request and retrieval fees.
- Apply regional rate differences.
- Recompute when retention policies change.
- Validate with provider billing reports.
- Document unit assumptions.
## Examples
- 500 GB average storage for 1 month = 500 GB-months.
## Related calculators
- [Price Per Gb Month Calculator](/saas-pricing/price-per-gb-month-calculator/)
- [Storage Cost Calculator](/saas-pricing/storage-cost-calculator/)
## Related glossary terms
- [Storage Costs](/glossary/storage-costs/)
- [Retrieval Fees](/glossary/retrieval-fees/)
- [Bandwidth](/glossary/bandwidth/)