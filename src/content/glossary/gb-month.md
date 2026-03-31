---
title: "GB-Month"
description: "Storage measured as average GB stored over a month (GB times time)."
updated: "2026-03-30"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-03-30"
category: "storage"
tools: ["price-per-gb-month-calculator","storage-cost-calculator"]
guides: ["storage-costs-and-pricing", "storage-retrieval-fees"]
glossary: ["storage-costs","retrieval-fees","bandwidth","replication"]
sources:
  - kind: "internal-input"
    label: "Average stored volume and storage-class review"
    note: "Confirm average stored GB over time, region, and replication assumptions before treating GB-month as a pricing floor."
  - kind: "supporting-page"
    label: "Storage Costs & Pricing"
    href: "/guides/storage-costs-and-pricing/"
    note: "Use it to separate base storage economics from request, retrieval, and bandwidth behavior."
  - kind: "supporting-page"
    label: "Price Per GB Month Calculator"
    href: "/saas-pricing/price-per-gb-month-calculator/"
    note: "Check whether the candidate storage rate is viable once the average GB-month assumption is correct."
  - kind: "supporting-page"
    label: "Storage Costs"
    href: "/glossary/storage-costs/"
    note: "Review the broader storage-cost concept so GB-month is not mistaken for the whole workload bill."
---

## Definition

GB-month is the storage billing unit created by measuring the average amount of data stored across a month. It is not
just a snapshot of how many gigabytes existed at one moment. If stored data rises or falls during the month, the
GB-month value reflects that average over time. This is why cloud storage teams use GB-month instead of simple end-of-
month capacity when they model storage cost and price floors.

## Why it matters in pricing decisions

GB-month is the foundation for storage pricing because it converts raw stored volume into a billable unit that finance,
pricing, and operations teams can compare consistently. If the team uses the wrong storage measure, the pricing model
will be wrong before retrieval, request, backup, or bandwidth charges are even added. A product priced from peak storage
may look too expensive. A product priced from a single low snapshot may underrecover cost.

This is especially important when storage class, region, or replication policy changes the real cost to serve. A clean
GB-month model helps teams separate what is driven by average storage from what should be modeled as retrieval, request,
or network behavior.

## How to use it with PricingNest tools

Use the [Price Per Gb Month Calculator](/saas-pricing/price-per-gb-month-calculator/) when you need a quick pricing
floor for stored data itself. Use the [Storage Cost Calculator](/saas-pricing/storage-cost-calculator/) when the goal
is to estimate a more complete monthly storage bill that can include average stored GB, margin targets, and related
costs. Then compare those results with [Storage Costs & Pricing](/guides/storage-costs-and-pricing/) and
[Storage Retrieval Fees](/guides/storage-retrieval-fees/) so the team does not confuse storage volume with access
patterns that should be priced separately.

## Common interpretation mistakes

One common mistake is using peak stored data instead of the average storage held during the month. Another is ignoring
regional pricing differences or replication multipliers that increase the true cost of storage. Teams also underprice
when they stop at GB-month and forget retrieval, request, and bandwidth behavior. GB-month explains the storage base,
not the full workload. A final mistake is mixing archival and standard storage into one undifferentiated average even
though the storage class changes cost materially.

## Example

Imagine a customer stores 1,000 GB for the first half of the month and 2,000 GB for the second half. The average stored
data is 1,500 GB over that month, so the workload is roughly 1,500 GB-month. If the storage lives in a more expensive
region and is replicated for resilience, the effective cost can rise again before retrieval or request activity is even
counted. That is why storage pricing should start with the right GB-month assumption and then layer on the rest of the
workload economics.
