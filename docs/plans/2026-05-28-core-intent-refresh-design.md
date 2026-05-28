# Core Intent Refresh Design

## Goal

Improve search performance for retained PricingNest pages by making the highest-potential indexed pages more specific, more differentiated, and easier for both users and Google to understand as distinct answers.

This batch does **not** add new pages. It strengthens the pages that already have impression signals and clarifies the relationship between the existing tools and retained support content.

## Why This Batch Exists

The latest Search Console export for `2026-04-28` through `2026-05-25` shows that the site is still being tested in search, but the retained pages are not yet converting that testing into stable clicks.

Key signals:

- `usage-based-pricing-calculator` has `483` impressions, average position `8.59`, and `0` clicks.
- `annual-discount-calculator` has `103` impressions, average position `9.97`, and `0` clicks.
- `storage-cost-calculator` has `197` impressions, `1` click, and average position `34.61`.
- `storage-costs-and-pricing` has `129` impressions, `0` clicks, and average position `46.2`.
- From `2026-05-12` through `2026-05-25`, the site recorded `0` clicks on `545` impressions.

The earlier `2026-05-12` trust refresh was still the right move. It improved accountability and credibility signals. But the current bottleneck is now clearer:

- Google is willing to test some retained pages.
- Those pages are not yet strong enough as single-purpose answers.
- The problem is no longer "too many low-value pages."
- The problem is "the retained pages still need sharper intent identity and clearer page-to-page boundaries."

## Root Cause Summary

This batch is designed around six root-cause findings.

### 1. High-potential pages are being seen but not chosen

The clearest example is `usage-based-pricing-calculator`. A page with average position `8.59` and `483` impressions should not still be at `0` clicks unless the search-result promise and page identity are underperforming.

### 2. Core pages still answer too many adjacent questions at once

The tool pages are strong in breadth, but that breadth weakens page identity. A page can be helpful and still be too broad as a search answer.

### 3. The retained tools still share too much structural sameness

Even though the pages are not thin, they still rely on a highly uniform page system:

- similar tool architecture
- similar supporting sections
- similar "price floor / margin / fixed cost" framing
- similar relationship blocks

This is good for maintainability but can still blur page uniqueness.

### 4. Storage intent is spread across multiple pages without a crisp split

The storage cluster already has useful pages, but the roles of:

- `storage-cost-calculator`
- `price-per-gb-month-calculator`
- `storage-costs-and-pricing`

need to be made more explicit to reduce overlap and query ambiguity.

### 5. The annual discount page is close enough to compete but not specific enough to win

The page already has a useful ranking signal, but its current identity is still too generic relative to likely search tasks such as:

- monthly to annual price conversion
- annual prepay discount
- effective monthly rate

### 6. Governance reduced low-value indexation, but retained pages now need more authority per page

The site has already done real index governance:

- retained guides and glossary entries are selectively indexed
- many lower-priority pages are `noindex,follow`

That means the next stage is not broader pruning. It is stronger retained-page differentiation.

## Scope

### In scope

- Refine the indexed identity of:
  - `usage-based-pricing-calculator`
  - `annual-discount-calculator`
  - `storage-cost-calculator`
  - `price-per-gb-month-calculator`
  - `storage-costs-and-pricing`
- Update existing supporting guides so they reinforce tool intent instead of overlapping it:
  - `usage-based-pricing-examples`
  - `annual-prepay-discount`
  - `price-per-gb-month-explained`
- Improve tool-to-guide and guide-to-tool linking where that helps make the workflow clearer
- Tighten homepage and toolkit-page wording only if needed to reinforce the updated retained-path logic

### Out of scope

- No new guides
- No new glossary entries
- No new calculators
- No URL changes
- No broad template redesign
- No schema sprawl for pages that do not already contain the matching content
- No generic traffic grab attempts for broad head terms like `saas calculator`

## Constraints

- Preserve the site's existing principles:
  - real editorial tone
  - no fake authority
  - no invented customer proof
  - no mass-programmatic expansion
  - strong user experience over SEO theater
- Keep changes narrow enough that post-launch behavior can be interpreted
- Avoid creating internal competition between existing retained pages

## Approaches Considered

### Approach 1: Metadata-only refresh

Change only titles, descriptions, and hero copy.

Pros:

- Fast
- Low risk

Cons:

- Too shallow for the current problem
- Does not fix page-role ambiguity
- Likely to repeat the same "small lift, weak outcome" pattern

### Approach 2: Core-page identity refresh

Keep the existing URLs and page inventory, but sharpen the role of each core page and rework how related guides support the tool rather than partially duplicating it.

Pros:

- Solves the current root cause directly
- Keeps page count stable
- Fits the retained-page strategy
- Improves both user clarity and search clarity

Cons:

- Requires careful page-by-page rewriting
- More work than metadata-only changes

### Approach 3: Expansion through new supporting pages

Add new pages targeting terms like `price per gb calculator` or additional API/storage/usage guides.

Pros:

- Can create more landing points

Cons:

- Reintroduces template-scale risk
- Expands faster than the site has earned authority
- Confuses cause and effect if rankings change

## Recommendation

Use **Approach 2: Core-page identity refresh**.

This is the smallest change set that addresses the actual bottleneck:

- make high-impression pages more singular
- make support pages more supportive
- reduce overlap without reducing usefulness

## Page Role Design

### 1. Usage-Based Pricing Calculator

**Current problem**

The page is useful, but its identity is still too broad. It currently speaks to:

- usage-based pricing generally
- price floors
- platform fees
- minimum commitments
- included usage implications
- p50 vs p90 scenarios

All of that is valid, but the page needs a tighter public job.

**Target role**

This page should become the clearest retained answer to:

- how to calculate a price per unit
- how to set a usage-pricing floor
- when a pure per-unit model is too weak without a base fee or floor

**Design direction**

- Make the page read first as a **price-per-unit decision tool**
- Make the first screen answer:
  - what input is required
  - what output the user gets
  - when to use this tool
  - when to leave this tool and move to tiering or value-metric work
- Reduce "usage pricing as a broad topic" drift in the first screen
- Let `usage-based-pricing-examples` carry more of the packaging variation work
- Let `value-metric-selection` carry more of the metric-choice work

**Expected improvement**

The page should feel less like a general retained hub and more like the best direct answer for "price per unit / usage pricing floor" work.

### 2. Annual Discount Calculator

**Current problem**

The page is close enough to rank but still reads like a generic annual pricing utility.

**Target role**

This page should become the clearest retained answer to:

- convert monthly to annual pricing
- compare annual prepay discount scenarios
- calculate effective monthly rate from annual discount

**Design direction**

- Make the page more explicitly about the monthly-to-annual conversion task
- Push "effective monthly rate" higher in page identity
- Clarify the difference between:
  - annual invoice
  - annual savings
  - effective monthly anchor
- Let `annual-prepay-discount` carry more of the commercial interpretation
- Keep the tool focused on the pricing conversion itself

**Expected improvement**

The page should become more clickable for concrete calculator intent, not just for broad annual-pricing interest.

### 3. Storage Cost Calculator

**Current problem**

This page overlaps conceptually with both the GB-month calculator and the storage pricing guide.

**Target role**

This page should be the retained answer to:

- calculate actual storage economics
- combine GB stored, requests, and overhead into a real monthly cost model
- determine whether a simple storage rate is even possible

**Design direction**

- Emphasize that this page is for **cost structure**, not only for a public price
- Make request-heavy and access-heavy scenarios more visible earlier
- Clarify that this is the page you use **before** you decide whether a buyer-facing GB-month rate is honest
- Push buyer-facing rate translation toward `price-per-gb-month-calculator`

### 4. Price Per GB-Month Calculator

**Current problem**

This page appears underrepresented relative to query patterns like:

- `price per gb calculator`
- `cost per gb calculator`
- `storage cost per gb`

At the same time, it risks semantic overlap with the storage cost calculator.

**Target role**

This page should be the retained answer to:

- translate storage economics into a buyer-facing GB-month rate
- convert cost structure into a publishable price benchmark

**Design direction**

- Make the page identity more buyer-facing than internal-cost-facing
- Clarify that this page is not the place to model heavy request/retrieval complexity from scratch
- Explicitly send users back to `storage-cost-calculator` when the underlying cost structure is still uncertain

### 5. Storage Costs and Pricing Guide

**Current problem**

The guide is strong, but the tool-guide split can still be sharpened.

**Target role**

This guide should remain the retained answer to:

- when one storage unit is no longer enough
- when GB-month needs help from request, retrieval, or base-fee structure

**Design direction**

- Keep it as the structural interpretation page
- Make it more obvious that:
  - the calculator models cost
  - the GB-month calculator models public rate
  - this guide explains structure choice

## Internal Linking Design

The internal linking goal is not "more links." It is **clearer direction of intent**.

### Usage cluster

Preferred flow:

`Usage-Based Pricing Calculator`
→ `Value Metric Selection`
→ `Usage-Based Pricing Examples`
→ `Minimum Commitment Model` when needed

The calculator should not try to fully absorb the example/packaging guide's job.

### Annual cluster

Preferred flow:

`Annual Discount Calculator`
→ `Annual Prepay Discount`
→ `Billing Cycle` / `Annual Prepay Discount` glossary support

The calculator should feel like the numeric conversion tool; the guide should feel like the policy decision tool.

### Storage cluster

Preferred flow:

`Storage Cost Calculator`
→ `Price Per GB-Month Calculator`
→ `Storage Costs and Pricing`

Alternative flow:

`Storage Costs and Pricing`
→ `Storage Cost Calculator`
→ `Price Per GB-Month Calculator`

The user should be able to understand:

- where actual cost is modeled
- where the public rate is translated
- where the pricing structure is interpreted

## Copy Principles for This Batch

- Prefer plain, specific language over SEO adjectives
- Use search-intent phrasing only when it still sounds like a real operator wrote it
- Do not use:
  - fake social proof
  - fake usage counts
  - fake expertise claims
  - aggressive "best/free/top" wording
- Keep wording grounded in real SaaS pricing work:
  - unit cost
  - gross margin
  - annual prepay
  - request-heavy workloads
  - included usage
  - overage
  - minimum commitment

## Success Criteria

This batch is successful if:

- `usage-based-pricing-calculator` becomes more clearly a price-per-unit / usage-floor page
- `annual-discount-calculator` becomes more clearly a monthly-to-annual conversion page
- the storage cluster has cleaner page roles with less overlap
- no new pages are introduced
- retained internal linking becomes easier to follow as a workflow
- the updated copy feels more specific without becoming more salesy

## Validation Plan

### Code/content validation

- Build succeeds
- Existing trust and metadata tests continue to pass
- Any updated page-specific tests reflect the new role language where needed

### Search-performance validation

Observe over the next `2-4` weeks:

- whether `usage-based-pricing-calculator` begins earning clicks
- whether `annual-discount-calculator` retains front-page adjacency and begins earning clicks
- whether storage-related impressions concentrate more clearly by page role
- whether page/query fit becomes more interpretable in GSC

### What this batch is not expected to do immediately

- It is not expected to make broad compute/API head terms rank quickly
- It is not expected to produce a large traffic jump in days
- It is not expected to replace authority-building work over the longer term

Its purpose is narrower: make the retained core pages better answers so the testing Google is already doing has a better chance to convert.
