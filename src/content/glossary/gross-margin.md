---
title: "Gross Margin"
description: "The share of revenue left after cost of goods sold, used to set floors, evaluate discounts, and protect pricing quality."
updated: "2026-03-30"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-03-30"
category: "unit-economics"
guides: ["annual-prepay-discount", "storage-costs-and-pricing", "compute-cost-modeling"]
tools: ["usage-based-pricing-calculator", "annual-discount-calculator", "api-pricing-calculator"]
glossary: ["cogs", "variable-cost", "unit-cost"]
sources:
  - kind: "internal-input"
    label: "Revenue, discount, and COGS review by segment"
    note: "Compare realized revenue against true cost to serve by plan and segment before using margin targets in pricing decisions."
  - kind: "supporting-page"
    label: "Annual Prepay Discount"
    href: "/guides/annual-prepay-discount/"
    note: "Use it to judge whether term discounts weaken margin more than they improve retention or cash flow."
  - kind: "supporting-page"
    label: "Usage-Based Pricing Calculator"
    href: "/saas-pricing/usage-based-pricing-calculator/"
    note: "Test whether a candidate unit price still holds the target gross margin under realistic usage assumptions."
  - kind: "supporting-page"
    label: "Unit Cost"
    href: "/glossary/unit-cost/"
    note: "Review unit cost with margin so the team does not set pricing floors from a partial cost picture."
---

## Definition

Gross margin is the percentage of revenue left after subtracting cost of goods sold, or COGS. In pricing work, it is one
of the clearest ways to judge whether a plan is commercially healthy after usage, service delivery, and infrastructure
cost are taken into account.

## Why it matters in pricing decisions

Gross margin is what keeps a company from confusing growth with quality. A plan can win customers and still damage the
business if revenue grows more slowly than service cost. Margin helps define the floor below which discounts, credits,
and custom packaging become dangerous. It also matters by segment because small self-serve accounts, mid-market teams,
and enterprise customers often carry very different support and usage profiles.

When teams ignore gross margin, they often approve discounts that look harmless in isolation but weaken the model once
renewals, high usage, or procurement pressure show up.

## How to use it with PricingNest tools

Start with the [Usage-Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/) to test whether expected
revenue and usage produce an acceptable margin. If the question is about annual contract structure, the
[Annual Discount Calculator](/saas-pricing/annual-discount-calculator/) helps show how a discount changes realized
revenue. For API-heavy products, the [API Pricing Calculator](/saas-pricing/api-pricing-calculator/) can expose whether
usage and cost assumptions are strong enough to support the listed price.

To ground those numbers in decision-making, compare the outputs with the guidance in
[Annual Prepay Discount](/guides/annual-prepay-discount/) and [Storage Costs & Pricing](/guides/storage-costs-and-pricing/).

## Common interpretation mistakes

The biggest mistake is treating gross margin as a single company-wide number and ignoring how it changes by plan,
discount level, or customer segment. Another is excluding obvious COGS items just to preserve a prettier headline. Teams
also assume that high revenue automatically means healthy pricing. In reality, a plan with aggressive discounting or
heavy support can generate revenue while still pulling the business toward an unsafe floor.

## Example

Suppose a plan produces $1,000 in monthly revenue and $300 in COGS. Gross margin is 70%. If a 20% discount drops revenue
to $800 while cost stays the same, margin falls to 62.5%. That may still be acceptable for one segment, but not for
another. This is why discount policy, segment strategy, and pricing floors should be reviewed together rather than in
separate spreadsheets.
