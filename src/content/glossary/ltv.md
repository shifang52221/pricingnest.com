---
title: "LTV (Customer Lifetime Value)"
description: "Expected gross profit over a customer's lifetime and the assumptions behind it."
updated: "2026-07-04"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-07-04"
category: "unit-economics"
guides: ["ltv-sensitivity-analysis", "cac-payback-scenarios"]
tools: ["ltv-calculator", "break-even-cac-calculator"]
glossary: ["churn", "gross-margin"]
sources:
  - kind: "internal-input"
    label: "LTV assumption and downside-scenario review"
    note: "Check whether revenue per account, churn, and margin belong to the same segment before trusting the result."
  - kind: "supporting-page"
    label: "LTV Sensitivity Analysis"
    href: "/guides/ltv-sensitivity-analysis/"
    note: "Use it when the main question is which assumption changes the outcome fastest."
  - kind: "supporting-page"
    label: "CAC Payback Period"
    href: "/glossary/cac-payback/"
    note: "Use it to check whether the lifetime value story is also fast enough in cash-recovery terms."
---

## Definition

LTV is the expected gross profit from a customer over their lifetime, based on revenue per account, churn, and margin.

## Why it matters

LTV guides acquisition spend, pricing decisions, and product investment by showing long-term profitability. It is most
useful when the assumptions behind it are explicit and segment-specific.

## What LTV does and does not tell you

LTV tells you how much value a customer can generate over time. It does not tell you how quickly the business recovers
cash, and it does not tell you whether the input assumptions were too optimistic.

If the model relies on smooth averages, LTV can look strong while a weak cohort still drags the real business down.

## Pricing implications

Higher revenue per account and higher gross margin increase LTV; high churn can destroy it quickly. A pricing change
that improves expansion or retention should show up here, but only if the underlying cohort logic is clean.

## Measurement tips

Use consistent time windows, segment by plan, and validate with cohort retention data. A useful LTV model is one the
team can explain without hand-waving the churn assumption.

## Common mistakes

- Using revenue instead of gross profit.
- Mixing logo churn and revenue churn in the same formula.
- Building one company-wide LTV for segments with different onboarding or support costs.
- Treating a high LTV as safe when CAC payback is still too slow.

## How to use it with PricingNest tools

Use the [LTV Calculator](/saas-pricing/ltv-calculator/) to rebuild the revenue, margin, and churn assumptions. Use the
[Break Even CAC Calculator](/saas-pricing/break-even-cac-calculator/) when the question becomes how much acquisition
cost the model can support. Then check the [CAC Payback Period](/glossary/cac-payback/) to make sure the cash recovery
story is also healthy.

## Related calculators

- [LTV Calculator](/saas-pricing/ltv-calculator/)
- [Break Even CAC Calculator](/saas-pricing/break-even-cac-calculator/)

## Related glossary terms

- [Churn](/glossary/churn/)
- [Gross Margin](/glossary/gross-margin/)
- [CAC](/glossary/cac/)
