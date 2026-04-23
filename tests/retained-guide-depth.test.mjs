import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const guideChecks = [
  {
    slug: "storage-costs-and-pricing",
    minWords: 500,
    headings: [
      "## When storage pricing stops being a simple GB-month problem",
      "## Inputs to confirm before you publish a storage price",
      "## Where storage pricing models hide request and retrieval risk",
      "## GB-month vs request fees vs retrieval fees vs base fee",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["archive-heavy", "request-heavy", "retrieval", "base fee", "workload mix"],
  },
  {
    slug: "compute-cost-modeling",
    minWords: 500,
    headings: [
      "## When compute should be priced explicitly",
      "## Inputs to confirm before you set price",
      "## Where compute pricing usually breaks",
      "## Pricing options and trade-offs",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["vcpu", "memory", "gross margin", "base fee", "steady-state"],
  },
  {
    slug: "api-cost-estimation",
    minWords: 500,
    headings: [
      "## When API cost estimation becomes a pricing-structure problem",
      "## Inputs that belong in the cost model before you publish API pricing",
      "## Where API cost models look precise but still misprice the plan",
      "## Cost estimation vs packaging structure vs buyer-facing rate",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["vendor pass-through", "endpoint mix", "burst traffic", "fixed overhead", "packaging structure"],
  },
  {
    slug: "usage-based-pricing-examples",
    minWords: 500,
    headings: [
      "## When usage pricing becomes a packaging-structure decision",
      "## Inputs to confirm before you publish a buyer-facing usage price",
      "## Where usage-based models create bill shock and margin leakage",
      "## Price per unit vs tiers vs included usage vs overage vs minimum commitment",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["value metric", "buyer estimation", "bill shock", "included usage", "overage", "minimum commitment"],
  },
  {
    slug: "annual-prepay-discount",
    minWords: 500,
    headings: [
      "## When annual discounts help",
      "## What to confirm before setting the discount",
      "## Where annual discounts go wrong",
      "## Pricing options and trade-offs",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["cash flow", "retention", "renewal", "effective monthly rate", "discount guardrails"],
  },
  {
    slug: "minimum-commitment-model",
    minWords: 500,
    headings: [
      "## When minimum commitments are the right pricing tool",
      "## Inputs to confirm before you set a commitment",
      "## Where minimum commitments go wrong",
      "## Commitment vs platform fee vs included usage",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["platform fee", "billing cycle", "annual prepay", "gross margin", "contracted floor"],
  },
  {
    slug: "price-per-gb-month-explained",
    minWords: 500,
    headings: [
      "## When price per GB-month is an honest buyer-facing rate",
      "## Inputs to confirm before publishing a price per GB-month",
      "## Where price per GB-month becomes a misleading average",
      "## Price per GB-month vs request fees vs retrieval fees vs minimum commitment",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["workload mix", "request-heavy", "retrieval-sensitive", "replication", "base fee"],
  },
  {
    slug: "value-metric-selection",
    minWords: 500,
    headings: [
      "## When value metric selection becomes a pricing problem",
      "## Inputs to confirm before you lock the metric",
      "## Where teams choose the wrong metric",
      "## Value metric vs pricing metric vs packaging simplicity",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["buyer-visible value", "cost alignment", "segment fit", "pricing metric", "migration risk"],
  },
  {
    slug: "pricing-page-trust-elements",
    minWords: 500,
    headings: [
      "## When pricing page trust becomes a pricing problem",
      "## What buyers need to verify before they trust the page",
      "## Where pricing pages lose trust",
      "## Proof, policy clarity, and pricing-page simplicity",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["billing cycle", "renewal", "cancellation", "annual prepay", "included usage"],
  },
  {
    slug: "saas-gross-margin-targets",
    minWords: 500,
    headings: [
      "## When gross margin targets shape pricing decisions",
      "## Inputs to confirm before choosing a target range",
      "## Where teams set the wrong margin target",
      "## Margin target vs growth, pass-through costs, and packaging",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["pass-through costs", "blended unit cost", "self-serve", "enterprise", "margin floor"],
  },
  {
    slug: "api-pricing-model",
    minWords: 500,
    headings: [
      "## When API pricing becomes a packaging-structure decision",
      "## Inputs to confirm before you publish one API usage rate",
      "## Where teams force one API rate across incompatible customer patterns",
      "## Billable unit vs base fee vs included usage vs rate limit vs overage",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["billable unit", "base fee", "included usage", "rate limit", "overage"],
  },
  {
    slug: "bandwidth-pricing-guide",
    minWords: 500,
    headings: [
      "## When bandwidth pricing deserves its own model",
      "## Inputs to confirm before you publish a rate",
      "## Where bandwidth teams underprice",
      "## Pricing options and trade-offs",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["egress", "cdn", "gross margin", "regional mix", "pass-through"],
  },
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const check of guideChecks) {
  const filePath = join(__dirname, "..", "src", "content", "guides", `${check.slug}.md`);
  const text = readFileSync(filePath, "utf-8");
  const normalized = text.toLowerCase();
  const body = text.replace(/^---[\s\S]*?---/m, " ");
  const wordCount = (body.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? []).length;
  const calculatorLinks = body.match(/\/saas-pricing\//g) ?? [];
  const glossaryLinks = body.match(/\/glossary\//g) ?? [];

  assert(wordCount >= check.minWords, `${check.slug}: expected at least ${check.minWords} words, got ${wordCount}`);

  for (const heading of check.headings) {
    assert(text.includes(heading), `${check.slug}: missing heading ${heading}`);
  }

  const matchedKeywords = check.keywords.filter((keyword) => normalized.includes(keyword));
  assert(matchedKeywords.length >= 4, `${check.slug}: expected at least 4 topic keywords, found ${matchedKeywords.length}`);
  assert(calculatorLinks.length >= 2, `${check.slug}: expected at least 2 calculator links, got ${calculatorLinks.length}`);
  assert(glossaryLinks.length >= 2, `${check.slug}: expected at least 2 glossary links, got ${glossaryLinks.length}`);
}

console.log("retained-guide-depth.test.mjs: OK");
