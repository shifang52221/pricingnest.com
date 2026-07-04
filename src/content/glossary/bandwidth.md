---
title: "Bandwidth"
description: "Data transferred per time, typically priced per GB with tiered rates."
updated: "2026-07-04"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-07-04"
category: "storage"
guides: ["bandwidth-pricing-guardrails", "cdn-cost-pass-through"]
glossary: ["egress", "cdn", "gb-month"]
sources:
  - kind: "internal-input"
    label: "Bandwidth floor and burst-exposure review"
    note: "Check normal usage, burst behavior, regional delivery mix, and enterprise concentration before publishing bandwidth pricing."
  - kind: "supporting-page"
    label: "Bandwidth Pricing Guardrails"
    href: "/guides/bandwidth-pricing-guardrails/"
    note: "Use it when the question is how much protection the public pricing page needs."
  - kind: "supporting-page"
    label: "CDN Cost Pass-Through"
    href: "/guides/cdn-cost-pass-through/"
    note: "Use it when variability is high enough that simple bundled pricing may be misleading."
---

## Definition

Bandwidth is the amount of data transferred over a network in a given time period, commonly measured and billed per
GB.

## Why it matters

High data transfer can drive material infrastructure costs and can quickly erode margins if not priced or controlled.
The commercial question is not only what the vendor bill looks like, but how much of that cost the public pricing model
can safely absorb.

## What bandwidth does and does not tell you

Bandwidth tells you transfer volume and cost exposure. It does not tell you whether the right fix is included usage,
overage, an enterprise path, or pass-through.

That decision depends on traffic shape, buyer tolerance, and how volatile the underlying delivery floor is.

## Pricing implications

Separate storage from bandwidth in plans, use usage tiers to reflect marginal costs, and add overage rates for spikes.
If the traffic mix is highly variable, the pricing structure may need guardrails rather than a single headline rate.

## Common drivers

Large file downloads, streaming, API responses, and CDN cache misses are typical bandwidth drivers.

## Measurement tips

Track bandwidth by product area, customer segment, and region to identify the highest cost contributors. If one cohort
consistently drives the expensive tail, the pricing model should not pretend that cohort is average.

## Common mistakes

- Using one average bandwidth rate for every product shape.
- Ignoring cache miss behavior and origin fetch costs.
- Publishing a simple rate without checking burst-heavy cohorts.
- Treating bandwidth as a technical metric only, not a pricing input.

## How to use it with PricingNest tools

Use [Bandwidth Pricing Guardrails](/guides/bandwidth-pricing-guardrails/) when the public plan needs a clear
threshold. Use [CDN Cost Pass-Through](/guides/cdn-cost-pass-through/) when cost variability is too high to hide
inside a single public rate.

## Related glossary terms

- [Egress](/glossary/egress/)
- [CDN](/glossary/cdn/)
- [GB-Month](/glossary/gb-month/)
- [Origin Fetch](/glossary/origin-fetch/)
