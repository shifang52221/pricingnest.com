---
title: "Rate Limit"
description: "Limits on requests per time window; can protect cost and plan fairness."
updated: "2026-01-30"
category: "api"
---

## Definition
A rate limit is a cap on requests per time window (per minute, hour, or day).

## Why it matters
Rate limits protect infrastructure costs and prevent a small number of users from degrading service.

## Pricing implications
Rate limits can be a plan differentiator and a guardrail against bill shock. If your pricing is usage-based, limits help
contain peak cost risk.

## Measurement tips
Track throttling events and customer complaints to tune limits.

## Checklist
- Define limits per plan and publish them clearly.
- Align limits with cost drivers and performance goals.
- Use burst limits for short spikes when possible.
- Monitor throttled requests and adjust if needed.
- Offer higher limits or add-ons for heavy users.
- Keep limits consistent across docs and contracts.
- Review limits quarterly as usage grows.
- Avoid silent changes that surprise customers.
