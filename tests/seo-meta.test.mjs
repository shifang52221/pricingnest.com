import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const expected = [
  {
    slug: "usage-based-pricing-calculator",
    name: "Usage-Based Pricing Calculator",
    metaTitle: "Usage-Based Pricing Calculator - Price per Unit | PricingNest",
    metaDescription:
      "Free usage-based pricing calculator to estimate a price per unit from monthly usage, unit cost, fixed cost, and target gross margin."
  },
  {
    slug: "compute-cost-estimator",
    name: "Compute Cost Estimator",
    metaTitle: "Compute Cost Estimator - vCPU & Memory Pricing | PricingNest",
    metaDescription:
      "Free compute cost estimator to model vCPU-hour and GB-hour costs and turn them into a margin-safe monthly price."
  },
  {
    slug: "annual-discount-calculator",
    name: "Annual Discount Calculator",
    metaTitle: "Annual Discount Calculator - Annual Pricing | PricingNest",
    metaDescription:
      "Free annual discount calculator to convert a monthly price into annual pricing, annual prepay savings, and effective monthly rate."
  },
  {
    slug: "api-pricing-calculator",
    name: "API Pricing Calculator",
    metaTitle: "API Pricing Calculator - Cost per 1,000 Calls | PricingNest",
    metaDescription:
      "Free API pricing calculator to estimate cost per 1,000 calls, monthly API cost, and a margin-safe monthly price."
  },
  {
    slug: "storage-cost-calculator",
    name: "Storage Cost Calculator",
    metaTitle: "Storage Cost Calculator - Price per GB | PricingNest",
    metaDescription:
      "Free storage cost calculator to estimate price per GB-month, request fees, and a target-margin monthly storage price."
  }
];

const assertIncludes = (slug, key, value) => {
  if (!text.includes(value)) {
    throw new Error(`${slug}: missing ${key} -> ${value}`);
  }
};

for (const item of expected) {
  assertIncludes(item.slug, "name", item.name);
  assertIncludes(item.slug, "metaTitle", item.metaTitle);
  assertIncludes(item.slug, "metaDescription", item.metaDescription);
}

console.log("seo-meta.test.mjs: OK");
