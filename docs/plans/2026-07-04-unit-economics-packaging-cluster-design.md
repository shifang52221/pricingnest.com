# Unit Economics and Packaging Cluster Design

## Goal

Strengthen one weak retained guide and five thin-but-important glossary pages into a coherent editorial cluster that
improves trust, user usefulness, and topic depth without expanding low-value inventory.

## Scope

This wave focuses on six retained pages:

- `src/content/guides/pricing-experiments-playbook.md`
- `src/content/glossary/cac.md`
- `src/content/glossary/ltv.md`
- `src/content/glossary/cogs.md`
- `src/content/glossary/support-costs.md`
- `src/content/glossary/packaging.md`

This wave does not expand into broad storage or rate-card coverage. The following thin pages stay out of scope unless a
later audit shows they should be contracted or noindexed:

- `rate-card`
- `storage-costs`
- `bandwidth`

## Why This Cluster Matters

The site has already removed many weak pages and strengthened several retained hubs. The next problem is not inventory
volume alone. It is that a few retained pages still look too short, too generic, or too isolated to support a
high-trust editorial system.

This cluster matters because it sits near two core commercial questions:

- can the business support its acquisition and delivery model economically
- does the packaging structure translate those constraints into understandable plan design

If these pages remain thin, the site keeps an avoidable weakness in an area that should feel commercially rigorous.

## Design Principles

- Make retained pages feel authored, not mechanically expanded.
- Strengthen topic roles and decision flow, not just word count.
- Use credibility fields and source framing to reinforce review quality.
- Connect glossary pages through real decision logic instead of generic "related content."
- Avoid publishing more pages when stronger retained pages can carry the topic better.

## Cluster Roles

### Practical guide

- `pricing-experiments-playbook`

This should become the operational page in the cluster. It should explain which pricing experiments are worth running,
which ones are usually too noisy or too risky, how to set guardrails, and how to interpret outcomes before rollout.

### Unit economics chain

- `cac`
  - role: define acquisition cost and when it is decision-useful
- `ltv`
  - role: explain lifetime value as a derived profitability lens, not a vanity shortcut
- `cogs`
  - role: explain delivery-cost structure and how it constrains margin
- `support-costs`
  - role: explain one major cost input often hidden inside or outside COGS inconsistently

These pages should read like adjacent parts of one economic system rather than separate glossary stubs.

### Bridge page

- `packaging`

This page should connect unit economics to the visible plan structure. It should explain how plan design, feature
bundling, and upgrade logic are constrained by margin, cost-to-serve, and customer stage design.

## Upgrade Pattern

### `pricing-experiments-playbook`

Upgrade from a thin checklist into a retained guide with:

- a clearer definition of when an experiment is worth running
- a distinction between pricing tests, packaging tests, and discount tests
- guardrails around churn, support burden, and interpretation windows
- stronger links into calculators and unit-economics pages

### `cac`, `ltv`, `cogs`, `support-costs`

Upgrade each page with:

- author/review/source metadata
- a sharper explanation of what the term answers and what it does not
- common interpretation mistakes
- clearer routing to adjacent glossary pages, guides, and calculators

The goal is to reduce repetition by giving each page a narrower commercial job.

### `packaging`

Upgrade from a generic definition page into a bridge between plan design and economics, with:

- a clearer explanation of when packaging is the real pricing problem
- stronger ties to `pricing-tier-design`
- clearer ties to COGS, support burden, and value-metric choices
- decision-oriented next steps instead of generic related links

## Success Criteria

- `pricing-experiments-playbook` no longer reads like a thin checklist.
- The five glossary pages feel like a coherent retained cluster with distinct roles.
- Trust signals are visible across all six pages.
- Internal linking teaches a decision path rather than just increasing link count.
- Build, governance, and audit checks remain clean.
