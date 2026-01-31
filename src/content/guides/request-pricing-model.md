---
title: "Request Pricing Model"
description: "Price per request or per 1,000 requests with margin-safe assumptions."
updated: "2026-01-31"
tags: ["api", "pricing"]
tools: ["api-pricing-calculator", "api-cost-estimator", "usage-based-pricing-calculator"]
glossary: ["request-pricing", "api-call", "unit-cost", "rate-card"]
---

## Quick checklist
- Define what counts as a billable request.
- Use per-1,000 units for pricing clarity.
- Model request costs with real infra data.
- Add a platform fee if fixed costs are high.
- Use tiers to avoid bill shock.

## Step-by-step
1. Estimate cost per 1,000 requests.
2. Set a target gross margin.
3. Convert to a price per 1,000 requests.
4. Add tiers for higher usage bands.
5. Validate with ARR and ARPA targets.

## What to watch
- Bursty traffic can distort costs.
- Request-heavy endpoints need separate pricing.
- Underpriced requests create margin erosion.

## Common mistakes
- Pricing per request without rounding.
- Ignoring caching and batching effects.
- Mixing read and write requests in one unit.

## Tools to use
- [API Pricing Calculator](/saas-pricing/api-pricing-calculator/)
- [API Cost Estimator](/saas-pricing/api-cost-estimator/)
- [Usage-Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/)

## Related glossary terms
- [Request Pricing](/glossary/request-pricing/)
- [API Call](/glossary/api-call/)
- [Unit Cost](/glossary/unit-cost/)
- [Rate Card](/glossary/rate-card/)
