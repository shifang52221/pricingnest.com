---
title: "Throttling"
description: "Delaying or rejecting requests when usage exceeds limits; impacts user experience."
updated: "2026-01-30"
category: "api"
guides: ["api-rate-limit-pricing"]
glossary: ["rate-limit"]
---

## Definition
Throttling is delaying or rejecting requests when usage exceeds limits.

## Why it matters
Throttling protects infrastructure costs but can harm user experience if limits are too strict.

## Pricing implications
Throttling can be a guardrail for lower tiers. Higher tiers often include higher or no throttling to justify price.

## Measurement tips
Track throttling events and customer complaints to tune limits.

## Checklist
- Align throttling rules with rate limits by plan.
- Communicate throttling behavior in docs and SLAs.
- Monitor throttled requests and conversion impact.
- Offer upgrade paths for higher limits.
- Avoid silent throttling changes.
- Test throttling impact on key workflows.
- Use throttling data to refine tier thresholds.
- Review throttling quarterly.

## Related glossary terms
- [Rate Limit](/glossary/rate-limit/)
