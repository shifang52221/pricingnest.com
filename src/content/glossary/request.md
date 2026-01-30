---
title: "Request"
description: "A single operation sent to a service (API request, storage request, etc.)."
updated: "2026-01-30"
category: "api"
---

## Definition
A request is a single operation sent to a service, such as an API call or a storage operation.

## Why it matters
Requests are a common pricing unit, especially for APIs and storage. Clear definitions prevent billing disputes and
protect margins.

## Pricing implications
If requests drive cost, you should price per request or per 1,000 requests. If they are minor, include them in a base
fee and keep pricing simple.

## Measurement tips
Define what counts as a request and ensure it matches your billing and logging system.

## Checklist
- Define request types (read, write, list) if they have different costs.
- Use a consistent unit on pricing page and invoices.
- Estimate cost per request using blended infra costs.
- Model p50 and p90 request volumes for pricing risk.
- Publish example bills to reduce confusion.
- Track request volume by plan.
- Update request costs when vendor pricing changes.
- Avoid ambiguous units customers cannot estimate.
