---
title: "LTV Sensitivity Analysis"
description: "Stress-test LTV assumptions to see how churn and margin shifts change unit economics."
updated: "2026-01-31"
tags: ["unit-economics", "metrics"]
tools: ["ltv-calculator", "churn-impact-calculator", "cac-payback-period-calculator"]
glossary: ["ltv", "churn", "arpa", "payback-period"]
---

## Quick checklist
- Start with realistic churn and margin assumptions.
- Test small deltas in churn (1-2 points).
- Validate ARPA and payback together.
- Use the same time window across inputs.
- Document the assumptions behind each scenario.

## Step-by-step
1. Calculate baseline LTV from ARPA, margin, and churn.
2. Increase churn by 1-2 points and recalc LTV.
3. Reduce margin by 5 points to model cost pressure.
4. Compare LTV to CAC payback constraints.
5. Use the sensitivity range to set guardrails.

## What to watch
- LTV sensitivity is usually dominated by churn.
- Margin changes matter when usage costs spike.
- Payback targets should be tightened when LTV drops.

## Common mistakes
- Using gross revenue instead of contribution margin.
- Mixing annual churn with monthly ARPA.
- Treating churn as constant across segments.

## Tools to use
- [LTV Calculator](/saas-pricing/ltv-calculator/)
- [Churn Impact Calculator](/saas-pricing/churn-impact-calculator/)
- [CAC Payback Period Calculator](/saas-pricing/cac-payback-period-calculator/)

## Related glossary terms
- [LTV](/glossary/ltv/)
- [Churn](/glossary/churn/)
- [ARPA](/glossary/arpa/)
- [Payback Period](/glossary/payback-period/)
