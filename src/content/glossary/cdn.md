---
title: "CDN"
description: "Content Delivery Network; reduces origin load but can introduce request fees."
updated: "2026-01-30"
category: "storage"
guides: ["cdn-cost-pass-through"]
---

## Definition
A CDN (Content Delivery Network) caches and delivers content closer to users, reducing origin load and latency.

## Why it matters
CDNs lower origin costs but introduce their own egress and request fees. Pricing must reflect the blended cost.

## Pricing implications
If CDN costs are significant, include them in per-GB pricing or in fixed overhead. Use a blended cost across regions and
providers.

## Measurement tips
Track cache hit rate and per-GB cost to understand true CDN impact.

## Checklist
- Use blended CDN egress costs across regions.
- Include request fees if they are material.
- Monitor cache hit rate and its effect on cost.
- Separate CDN costs from origin costs in models.
- Update costs when CDN pricing changes.
- Use tiered pricing if CDN costs spike at high usage.
- Avoid assuming CDN costs are zero.
- Validate with billing data monthly.
