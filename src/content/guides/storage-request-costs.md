---
title: "Storage Request Costs (When Requests Matter)"
description: "When request pricing is material, how to model it, and how to reflect it in pricing."
updated: "2026-01-29"
tags: ["storage"]
tools: ["storage-cost-calculator"]
glossary: ["request-pricing","cogs"]
---

## Quick checklist
- Define request types (reads, writes, list, metadata) and how they map to your unit.
- Separate storage cost from request cost so each driver is visible.
- Model at least two scenarios (p50 vs p90 request volume).
- Use a minimum/platform fee if fixed overhead is meaningful.
- Publish example bills to reduce bill shock and support load.

## Why request costs surprise teams
Request costs feel small per unit but scale fast at high throughput. They also vary by storage class, region, and access
pattern. Teams often over-index on GB-month cost and underprice request-heavy workloads, which erodes margin.

## Step-by-step
1. Estimate your blended request unit costs (infra + vendor pass-through).
2. Separate write-heavy and read-heavy request types with their own unit cost.
3. Add fixed overhead you need to recover (support, monitoring, baseline infra).
4. Pick a target gross margin range that matches your storage product goals.
5. Choose tiers and included usage based on typical and heavy customers.
6. Validate outputs with CSV exports and shareable links.

## Example scenarios
- **Archive storage**: high GB-month, low requests. Price storage separately and keep request rates low.
- **Analytics workload**: medium GB-month, high read requests. Make request pricing explicit to avoid margin leakage.
- **API file storage**: high write volume. Consider a minimum fee and tiered request rates.

## Common mistakes
- Using a single request cost for all request types.
- Pricing requests below actual unit cost to simplify the page.
- Omitting request pricing on the pricing page and hiding it in docs.
- Ignoring request spikes during batch jobs or backfills.

## Tools to use
- [Storage Cost Calculator](/saas-pricing/storage-cost-calculator/)
- [Price per GB-Month Calculator](/saas-pricing/price-per-gb-month-calculator/)


## Related glossary terms
- [Request Pricing](/glossary/request-pricing/)
- [Cogs](/glossary/cogs/)
