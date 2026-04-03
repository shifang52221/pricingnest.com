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
      "## When storage pricing needs its own model",
      "## Inputs to confirm before you price",
      "## Where storage teams underprice",
      "## Pricing options and trade-offs",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["gb-month", "request costs", "retrieval", "margin", "blended cost"],
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
      "## When API pricing deserves its own model",
      "## Inputs to confirm before you price",
      "## Where API teams underprice",
      "## Pricing options and trade-offs",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["per 1,000 calls", "rate limits", "vendor cost", "overage", "request volume"],
  },
  {
    slug: "usage-based-pricing-examples",
    minWords: 500,
    headings: [
      "## When usage-based pricing is a good fit",
      "## Inputs to confirm before you choose a unit",
      "## Where teams underprice",
      "## Packaging options and trade-offs",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["value metric", "included usage", "bill shock", "tiers", "forecast"],
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
      "## When price per GB-month is a useful buyer-facing metric",
      "## Inputs to confirm before publishing a storage price",
      "## Where storage teams underprice",
      "## When to separate request, retrieval, or replication charges",
      "## How to interpret the calculator outputs",
      "## Next steps",
    ],
    keywords: ["request-heavy", "retrieval", "replication", "backup", "minimum commitment"],
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
