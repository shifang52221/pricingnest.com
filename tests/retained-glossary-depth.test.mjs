import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const termChecks = [
  {
    slug: "value-metric",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["outcome", "buyer", "pricing page", "forecast", "unit"],
  },
  {
    slug: "pricing-metric",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["value metric", "charge", "buyer", "forecast", "usage"],
  },
  {
    slug: "unit-cost",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["margin", "variable cost", "blended cost", "usage", "floor"],
  },
  {
    slug: "gross-margin",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["revenue", "cogs", "discount", "segment", "floor"],
  },
  {
    slug: "included-usage",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["overage", "forecast", "base fee", "bill shock", "p90"],
  },
  {
    slug: "overage",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How overage moves from predictable extension to packaging problem",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["included usage", "paid escalation path", "buyer trust", "margin protection", "manual exceptions"],
  },
  {
    slug: "minimum-commitment",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["enterprise", "revenue", "ramp", "consumption", "margin"],
  },
  {
    slug: "gb-month",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["average", "storage", "retrieval", "region", "replication"],
  },
  {
    slug: "rate-limit",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How rate limits move from engineering guardrail to visible packaging rule",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["burst traffic", "fairness rule", "packaging rule", "buyer expectation", "upgrade path"],
  },
  {
    slug: "billing-cycle",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How billing cycle changes discount, churn, and cash flow interpretation",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["monthly versus annual", "cash flow", "renewal behavior", "effective monthly rate", "mrr"],
  },
  {
    slug: "api-call",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How API call boundaries become commercially misleading",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["billable event", "retries", "request mix", "buyer estimation", "premium endpoints"],
  },
  {
    slug: "annual-prepay-discount",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How annual prepay changes discount, retention, and cash flow interpretation",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["effective monthly rate", "renewal behavior", "cash flow", "margin protection", "annual versus monthly"],
  },
  {
    slug: "usage-based-pricing",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How usage-based pricing changes packaging and margin protection",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["value metric", "included usage", "overage", "forecast", "segment predictability"],
  },
  {
    slug: "churn",
    minWords: 260,
    headings: [
      "## Definition",
      "## Why it matters in pricing decisions",
      "## How churn changes pricing, retention, and expansion interpretation",
      "## How to use it with PricingNest tools",
      "## Common interpretation mistakes",
      "## Example",
    ],
    keywords: ["logo churn", "revenue churn", "renewal behavior", "price change", "ltv sensitivity"],
  },
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const check of termChecks) {
  const filePath = join(__dirname, "..", "src", "content", "glossary", `${check.slug}.md`);
  const text = readFileSync(filePath, "utf-8");
  const normalized = text.toLowerCase();
  const body = text.replace(/^---[\s\S]*?---/m, " ");
  const wordCount = (body.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? []).length;
  const toolOrGuideLinks = body.match(/\/(saas-pricing|guides)\//g) ?? [];

  assert(wordCount >= check.minWords, `${check.slug}: expected at least ${check.minWords} words, got ${wordCount}`);

  for (const heading of check.headings) {
    assert(text.includes(heading), `${check.slug}: missing heading ${heading}`);
  }

  const matchedKeywords = check.keywords.filter((keyword) => normalized.includes(keyword));
  assert(matchedKeywords.length >= 4, `${check.slug}: expected at least 4 topic keywords, found ${matchedKeywords.length}`);
  assert(toolOrGuideLinks.length >= 1, `${check.slug}: expected at least 1 guide or calculator link, got ${toolOrGuideLinks.length}`);
  assert(text.includes("reviewed:"), `${check.slug}: expected explicit reviewed metadata`);
}

console.log("retained-glossary-depth.test.mjs: OK");
