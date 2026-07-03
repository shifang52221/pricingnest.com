---
title: "Egress"
description: "Outbound data transfer; often a significant variable cost for infra products."
updated: "2026-07-03"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-07-03"
category: "storage"
tools: ["bandwidth-cost-calculator"]
guides: ["bandwidth-pricing-guide", "cdn-cost-pass-through"]
glossary: ["bandwidth","cdn","overage","storage-costs"]
sources:
  - kind: "internal-input"
    label: "Regional traffic and egress-cost review"
    note: "Separate origin traffic, regional delivery, and heavy-customer patterns before treating one egress rate as a safe pricing input."
  - kind: "supporting-page"
    label: "Bandwidth Cost Calculator"
    href: "/saas-pricing/bandwidth-cost-calculator/"
    note: "Use it to test whether current bandwidth pricing still protects margin after real egress exposure is included."
  - kind: "supporting-page"
    label: "Bandwidth Pricing Guide"
    href: "/guides/bandwidth-pricing-guide/"
    note: "Use it when the issue is no longer definition but how egress cost should shape the package and escalation path."
---

## Definition

Egress is outbound data transfer from your infrastructure to the public internet or customer networks. In practice, it
is one of the most common ways infrastructure cost sneaks into pricing decisions, especially in storage-heavy,
media-heavy, API-heavy, or globally distributed products.

## Why it matters in pricing decisions

Egress matters because it is easy to underprice. A product can look profitable at average traffic levels while a subset
of customers generates outsized delivery cost through large downloads, high-frequency API responses, streaming, or
regional traffic patterns.

That is why egress is not just a technical billing detail. It often determines whether a simple bundled plan can stay
honest or whether the business needs bandwidth overages, tiering, or a clearer pass-through policy.

## Where teams get egress wrong

Teams usually get egress wrong in four ways:

- they treat average egress as if heavy-customer behavior does not matter
- they blend origin and CDN effects into one vague cost number
- they price bandwidth too simply even when regional variation is material
- they wait for bill shock or margin leakage before surfacing the usage pattern

The result is usually one of two problems: either the business absorbs more cost than expected, or buyers are surprised
when hidden usage rules start appearing later.

## How to use it with PricingNest tools

Use the [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/) to check whether delivered traffic still
clears margin once real egress exposure is included. Then review the
[Bandwidth Pricing Guide](/guides/bandwidth-pricing-guide/) or [CDN Cost Pass-Through](/guides/cdn-cost-pass-through/)
if the public pricing model needs a clearer separation between included traffic, heavier usage, and delivery-specific
cost recovery.

That keeps egress tied to packaging decisions instead of leaving it buried inside infrastructure vocabulary.

## Common interpretation mistakes

- Assuming CDN use means egress is no longer a pricing issue.
- Reviewing only cost per GB while ignoring regional spread or request-heavy patterns.
- Treating egress as a support term rather than a real pricing driver.
- Using one blended number without checking whether a small set of customers is distorting the economics.

## Example

Suppose a customer-facing file platform bundles storage and download access in one price. Most accounts use modest
traffic, but a few customers repeatedly deliver large media files to global audiences. The storage bill may look stable,
yet egress cost expands sharply for the heavy cohort. In that case, the right response may be bandwidth tiers or a
clearer overage path rather than pretending the same bundled price still fits everyone.

## Related calculators

- [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/)

## Related glossary terms

- [Bandwidth](/glossary/bandwidth/)
- [CDN](/glossary/cdn/)
- [Overage](/glossary/overage/)
- [Storage Costs](/glossary/storage-costs/)
