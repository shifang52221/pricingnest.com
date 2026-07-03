---
title: "CDN"
description: "Content Delivery Network; reduces origin load but can introduce request fees."
updated: "2026-07-03"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-07-03"
category: "storage"
guides: ["cdn-cost-pass-through"]
tools: ["bandwidth-cost-calculator", "storage-cost-calculator"]
glossary: ["bandwidth", "egress", "storage-costs"]
sources:
  - kind: "internal-input"
    label: "CDN billing and cache-hit review"
    note: "Separate cache-hit savings, request fees, and egress exposure before deciding whether CDN cost belongs inside a blended rate or a pass-through policy."
  - kind: "supporting-page"
    label: "Bandwidth Cost Calculator"
    href: "/saas-pricing/bandwidth-cost-calculator/"
    note: "Use it when CDN traffic is materially changing the effective delivery cost of a customer segment."
  - kind: "supporting-page"
    label: "CDN Cost Pass-Through"
    href: "/guides/cdn-cost-pass-through/"
    note: "Use it when the real question is not what a CDN is, but whether the cost should be blended, tiered, or passed through."
---

## Definition

A CDN, or Content Delivery Network, caches and delivers content closer to end users so fewer requests have to travel
back to the origin system. It usually improves latency and reduces load on the origin, but it does not make delivery
cost disappear. It changes where cost shows up.

## Why it matters in pricing decisions

CDNs matter in pricing because they often improve performance while shifting the cost mix into a more complicated
combination of egress, request, and cache-behavior economics. A business can lower origin cost and still end up with a
pricing problem if CDN request intensity, regional delivery, or cache-miss behavior vary a lot across customers.

The practical issue is whether CDN cost should stay inside a blended rate or become visible through usage pricing,
tiering, or a pass-through rule. That depends on how uneven the traffic patterns are.

## Where CDN cost changes the model

CDN cost changes the pricing model most when one of three things is true:

- traffic varies a lot by region or customer type
- request-heavy behavior matters as much as transferred GB
- cache misses or origin fetches create a hidden second layer of cost

In those situations, a clean per-GB headline rate can look simpler than the real economics. Teams may need separate
thresholds, heavier-account exceptions, or a clearer bandwidth policy rather than pretending all delivered traffic has
the same cost.

## How to use it with PricingNest tools

Use the [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/) to estimate whether delivered traffic
still clears margin once CDN cost is included. If the product also stores content or files, pair it with the
[Storage Cost Calculator](/saas-pricing/storage-cost-calculator/) so storage and delivery cost are not accidentally
collapsed into one vague number.

When the problem shifts from definition to packaging, move into the
[CDN Cost Pass-Through](/guides/cdn-cost-pass-through/) guide. That is where the decision becomes whether traffic
should be blended, tiered, or exposed more directly.

## Common interpretation mistakes

- Assuming a CDN always lowers total cost rather than sometimes relocating it.
- Looking only at GB delivered while ignoring request fees or regional spread.
- Treating cache-hit improvement as permanent even when customer behavior changes.
- Mixing origin and CDN charges together so no one can explain which layer is driving margin pressure.

## Example

Suppose a media-heavy SaaS product uses a CDN to serve customer files. Cache hit rate is excellent for the average
account, but a subset of customers generates highly variable regional traffic and many cache misses. The average cost
per GB still looks acceptable, yet the heavy cohort is much more expensive to serve. In that case, the CDN is helping
product performance, but the pricing model may still need bandwidth guardrails or a separate high-usage policy.

## Related calculators

- [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/)
- [Storage Cost Calculator](/saas-pricing/storage-cost-calculator/)

## Related glossary terms

- [Bandwidth](/glossary/bandwidth/)
- [Egress](/glossary/egress/)
- [Storage Costs](/glossary/storage-costs/)
