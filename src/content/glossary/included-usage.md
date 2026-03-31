---
title: "Included Usage"
description: "Usage bundled into a plan or platform fee before overages apply."
updated: "2026-03-30"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-03-30"
category: "pricing-models"
guides: ["usage-based-pricing-examples", "value-metric-selection"]
tools: ["usage-based-pricing-calculator", "tiered-usage-pricing-calculator"]
glossary: ["usage-based-pricing", "overage", "value-metric", "usage-forecast"]
sources:
  - kind: "internal-input"
    label: "Usage distribution and p90 allowance review"
    note: "Validate average, heavy, and p90 customer behavior before deciding how much usage to include in the base offer."
  - kind: "supporting-page"
    label: "Usage-Based Pricing Examples"
    href: "/guides/usage-based-pricing-examples/"
    note: "Use it to compare allowance size, conversion clarity, and bill-shock risk across packaging options."
  - kind: "supporting-page"
    label: "Tiered Usage Pricing Calculator"
    href: "/saas-pricing/tiered-usage-pricing-calculator/"
    note: "Model where included usage should end and overage tiers should begin."
  - kind: "supporting-page"
    label: "Overage"
    href: "/glossary/overage/"
    note: "Keep included usage and the post-threshold charge logic aligned as one customer experience."
---

## Definition

Included usage is the amount of metered product usage bundled into a plan price or platform fee before overage charges
start. It is the allowance a customer can consume without paying an incremental rate for every extra unit. In practice,
included usage is one of the clearest ways to turn a raw usage model into something that still feels easy to buy.

## Why it matters in pricing decisions

Included usage affects both conversion and margin. A good allowance makes the entry plan easier to understand, gives the
buyer a safer first month, and reduces bill shock because the customer can see a clear amount of value included before
variable charges begin. A weak allowance does the opposite. If the threshold is too low, the product feels punitive too
early. If it is too high, heavy users can consume expensive capacity before the pricing model starts recovering cost.

The best allowance is usually anchored to customer behavior, not a round number chosen for packaging convenience. Teams
should compare included usage against p50 and p90 usage, the size of the base fee, and the point where overage begins to
feel fair instead of surprising.

## How to use it with PricingNest tools

Start with the [Usage-Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/) to understand whether
your base fee and target margin can support an allowance at all. Then use the
[Tiered Usage Pricing Calculator](/saas-pricing/tiered-usage-pricing-calculator/) to test how much usage should be
included before a customer moves into overage tiers. The point is not only to find a number. It is to see whether the
model still feels forecastable once the buyer moves beyond the entry allowance.

For the commercial side, compare the result with
[Usage-Based Pricing Examples](/guides/usage-based-pricing-examples/) and
[Value Metric Selection](/guides/value-metric-selection/). That helps confirm the included amount matches the unit your
buyer already understands.

## Common interpretation mistakes

One mistake is setting included usage from intuition instead of real usage data. Another is making the allowance look
generous on the pricing page while the billing system measures a different unit behind the scenes. Teams also forget to
explain reset timing, pooled usage rules, or what happens when usage spikes late in the month. A more subtle mistake is
assuming included usage fixes a weak pricing model on its own. If the unit is still hard to forecast, a larger
allowance will not remove the trust problem. It only delays it.

## Example

Imagine a workflow automation product charging $99 per month with 50,000 tasks included. Most customers use about
35,000 tasks, while p90 accounts reach 110,000. In that case, the included usage gives typical buyers enough room to
adopt the product without immediate overage anxiety, but it still lets the company charge fairly when heavier customers
consume materially more infrastructure. If the team instead included 150,000 tasks, the plan might convert well but
would likely bury the real cost of heavy usage inside a base fee that no longer protects margin.
