---
title: "Bandwidth Pricing Guide (How to Price Egress and CDN Usage)"
description: "Set a bandwidth price that reflects egress, CDN mix, burst behavior, and gross margin without turning the pricing page into infrastructure jargon."
updated: "2026-04-03"
author: "PricingNest Editorial Team"
reviewedBy: "PricingNest Editorial Team"
reviewed: "2026-04-03"
tags: ["bandwidth", "usage-pricing", "cloud-cost"]
tools: ["bandwidth-cost-calculator", "usage-based-pricing-calculator", "pricing-tier-optimizer"]
glossary: ["egress", "gross-margin", "bandwidth", "overage"]
sources:
  - kind: "internal-input"
    label: "Bandwidth billing export and traffic-mix review"
    note: "Validate regional mix, CDN contracts, cache-hit behavior, origin traffic, and burst patterns before publishing a headline bandwidth rate."
  - kind: "supporting-page"
    label: "Bandwidth Cost Calculator"
    href: "/saas-pricing/bandwidth-cost-calculator/"
    note: "Use it to estimate the blended per-GB floor after egress, CDN, fixed overhead, and target gross margin are included."
  - kind: "supporting-page"
    label: "Bandwidth Pricing Guardrails"
    href: "/guides/bandwidth-pricing-guardrails/"
    note: "Keep the public pricing logic aligned with burst traffic, included usage, and enterprise edge cases."
  - kind: "supporting-page"
    label: "CDN Cost Pass-Through"
    href: "/guides/cdn-cost-pass-through/"
    note: "Review when pass-through pricing is more honest than a single blended bandwidth rate."
  - kind: "supporting-page"
    label: "Usage-Based Pricing Calculator"
    href: "/saas-pricing/usage-based-pricing-calculator/"
    note: "Use it to test whether included usage, overage, or tier design still produces a buyer-friendly pricing path."
---

## When bandwidth pricing deserves its own model

Bandwidth pricing deserves its own model when outbound delivery is not just a background infrastructure detail but a
real part of what the customer is buying. That is common in media delivery, file distribution, analytics exports,
AI-heavy response payloads, and products where customer value rises with data transfer volume. In those cases, the team
is not only deciding whether bandwidth is expensive. It is deciding whether a buyer-facing rate can stay understandable
while still protecting margin across very different traffic patterns.

This is where many teams get into trouble. They start with one vendor egress quote, publish a simple per-GB number,
and assume the job is done. But a public bandwidth price has to survive the actual commercial environment: regional mix,
CDN behavior, burst traffic, cache misses, and the awkward reality that some accounts create a lot more outbound cost
than others. If those differences are material, bandwidth is not a footnote in your pricing model. It is part of the
pricing model itself.

The goal is not to expose every infrastructure line item to buyers. The goal is to decide when bandwidth should stay
bundled, when it needs explicit overage logic, and when a pass-through or enterprise exception is more honest than a
generic flat plan.

## Inputs to confirm before you publish a rate

Before you publish a bandwidth rate, confirm the inputs that actually determine whether the model is viable.

- **Blended egress cost.** Start with the real [Egress](/glossary/egress/) mix by provider and region, not one list
  price from the cheapest geography.
- **CDN and origin behavior.** A cache-friendly workload behaves very differently from one that constantly falls back
  to origin. That is why CDN mix belongs in the pricing model, not only in an ops dashboard.
- **Regional mix.** If North America, Europe, and APAC customers carry meaningfully different delivery costs, one
  public number may hide a real pricing problem.
- **Burst profile.** Average traffic is useful, but burst traffic often decides whether the unit still protects
  [Gross Margin](/glossary/gross-margin/) under stress.
- **Packaging tolerance.** Some products can support pass-through language. Others need a blended price with included
  usage because buyers will reject a page that feels like cloud-vendor re-billing.
- **Fixed overhead.** Support, monitoring, delivery tooling, and account overhead may mean the right answer is not pure
  usage pricing. A small base fee or minimum commitment can still be necessary.

Use the [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/) first so the team agrees on the cost
floor. Then run the [Usage-Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/) to see whether the
same unit still makes sense once included usage, overage, and segment differences are introduced.

## Where bandwidth teams underprice

Bandwidth teams usually underprice in four ways.

First, they use a single egress assumption and ignore regional mix. That makes the spreadsheet look clean, but it does
not reflect what actually happens once the customer base expands.

Second, they treat CDN and bandwidth as interchangeable. A strong cache hit rate can make a blended price work. A weak
cache hit rate can turn the same price into a margin leak. If the CDN, origin, and pass-through picture is changing,
the published rate has to account for that.

Third, they price against average usage instead of heavy or bursty cohorts. The traffic spike is often what decides
whether a bandwidth model is healthy. If the page only works under median behavior, the commercial model is too thin.

Fourth, they try to simplify the pricing page by hiding every uncomfortable cost inside one broad plan. That can help
conversion for a while, but it eventually creates a conflict between buyer clarity and gross margin protection. A
better answer may be included usage with clear overage, a tier boundary for high-volume customers, or a pass-through
policy for edge cases.

## Pricing options and trade-offs

There are several workable bandwidth pricing shapes, and each has a trade-off.

**Blended per-GB pricing** is the cleanest presentation when traffic mix is stable enough that one rate still feels
fair. The trade-off is that you must trust the blended number and review it regularly as regional mix changes.

**Included usage plus overage** works well when most customers stay within a predictable range and only the high-volume
accounts create major variability. This keeps the page easy to read, but it requires discipline around the included
amount and the upgrade trigger.

**Pass-through pricing** is better when certain CDN or delivery costs are too uneven to hide honestly inside a simple
headline number. The risk is that pass-through language can make the page feel operational rather than commercial. Use
the retained [CDN Cost Pass-Through](/guides/cdn-cost-pass-through/) guide when that trade-off starts to matter.

**Base fee plus bandwidth pricing** helps when fixed overhead is meaningful and small accounts would otherwise fail to
cover account costs. That model can be fair, but only if the buyer clearly understands what the platform fee buys.

If you need stronger guardrails around burst traffic, enterprise exceptions, or included usage logic, use the retained
[Bandwidth Pricing Guardrails](/guides/bandwidth-pricing-guardrails/) page before publishing the plan.

## How to interpret the calculator outputs

The calculators should help you choose structure, not just one number.

Use the [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/) to see whether the blended bandwidth
floor still holds once CDN, origin exposure, and fixed overhead are included. If the answer swings too much across
regional mix or heavy usage, the problem is probably not only the unit price. It may be the structure itself.

Use the [Usage-Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/) to test whether included usage,
tiers, and overage rules stay understandable once the bandwidth floor is known. If the only way to protect margin is a
messy set of exceptions, the packaging still needs work.

Use the [Pricing Tier Optimizer](/saas-pricing/pricing-tier-optimizer/) when the bandwidth discussion is really a plan
design problem. Sometimes the right fix is not a new per-GB rate but clearer plan boundaries, a stronger enterprise
path, or a better split between standard and high-volume customers.

Interpret the outputs together. A good bandwidth price is one that buyers can estimate, sales can explain, and finance
can defend after burst traffic and pass-through exposure show up in the real world.

## Next steps

- Pull one month of real delivery data and separate normal, bursty, and enterprise traffic before updating the pricing
  page.
- Re-run the [Bandwidth Cost Calculator](/saas-pricing/bandwidth-cost-calculator/) with a realistic regional mix, not
  one default cost assumption.
- Test included usage and overage choices in the
  [Usage-Based Pricing Calculator](/saas-pricing/usage-based-pricing-calculator/) before deciding whether bandwidth
  belongs inside a broader usage plan.
- Review [Bandwidth Pricing Guardrails](/guides/bandwidth-pricing-guardrails/) and
  [CDN Cost Pass-Through](/guides/cdn-cost-pass-through/) so the public pricing language matches the real operational
  constraints.
- Align the final explanation with [Egress](/glossary/egress/), [Gross Margin](/glossary/gross-margin/),
  [Bandwidth](/glossary/bandwidth/), and [Overage](/glossary/overage/) before publishing any new rate card.
