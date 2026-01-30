---
title: "Origin Fetch"
description: "Traffic from CDN to origin; can affect egress and cost structure."
updated: "2026-01-30"
category: "storage"
---

## Definition
Origin fetch is the traffic from a CDN back to the origin server when content is not cached.

## Why it matters
Origin fetch adds egress and request costs that can materially impact margins, especially when cache hit rates are low.

## Pricing implications
If origin fetch costs are significant, include them in blended bandwidth costs or charge separately for cache misses.

## Measurement tips
Track cache hit rate and origin egress volume by plan.

## Checklist
- Monitor cache hit rate and origin egress.
- Include origin fetch costs in cost models.
- Improve cache policies to reduce origin traffic.
- Align pricing with cache miss behavior.
- Separate CDN and origin costs in reports.
- Update costs when CDN or origin pricing changes.
- Avoid assuming 100% cache hit rate.
- Validate with billing exports.
