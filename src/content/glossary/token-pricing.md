---
title: "Token Pricing"
description: "Pricing based on tokens (common for LLM/AI usage); requires careful unit definitions."
updated: "2026-01-30"
category: "api"
glossary: ["unit-cost","usage-based-pricing","overage","rate-limit"]
---
## Definition
Token pricing charges based on the number of input and output tokens processed, common in AI and LLM products.
## Why it matters
Token units are abstract for buyers, and costs can scale nonlinearly, so clarity is critical for margins and trust.
## Pricing implications
Separate input and output rates, publish token-to-character guidance, and set minimums or tiers for heavy users.
## Measurement tips
Track average tokens per request, model p90 usage, and monitor vendor pass-through costs.
## Checklist
- Define what counts as a token and how it is measured.
- Publish example conversions for common use cases.
- Separate input vs output token pricing.
- Add usage tiers or volume discounts.
- Set rate limits to protect infrastructure.
- Monitor token mix and margin by cohort.
- Provide usage dashboards for transparency.
- Review pricing after model updates.
## Examples
- .002 per 1K input tokens, .004 per 1K output tokens.
## Related glossary terms
- [Unit Cost](/glossary/unit-cost/)
- [Usage Based Pricing](/glossary/usage-based-pricing/)
- [Overage](/glossary/overage/)
- [Rate Limit](/glossary/rate-limit/)