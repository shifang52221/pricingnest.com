import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const expected = [
  {
    slug: "storage-cost-calculator",
    title: "Storage Cost Calculator - Price per GB | PricingNest",
    description:
      "Free storage pricing calculator to estimate cost per GB, request fees, and a target-margin price. CSV export."
  },
  {
    slug: "usage-based-pricing-calculator",
    title: "Usage-Based Pricing Calculator - Price per Unit | PricingNest",
    description:
      "Free price-per-unit calculator for usage pricing. Estimate unit price, revenue, and gross profit. CSV export."
  },
  {
    slug: "api-pricing-calculator",
    title: "API Pricing Calculator - Cost per 1,000 Calls | PricingNest",
    description:
      "Free API pricing calculator to set monthly pricing from call volume, cost per 1,000 calls, and margin. CSV export."
  },
  {
    slug: "compute-cost-estimator",
    title: "Compute Cost Estimator - vCPU & Memory Pricing | PricingNest",
    description:
      "Free compute cost estimator for vCPU-hours and GB-hours. Calculate monthly cost and a target-margin price. CSV export."
  },
  {
    slug: "annual-discount-calculator",
    title: "Annual Discount Calculator - Annual Pricing | PricingNest",
    description:
      "Free annual discount calculator to convert monthly price to annual prepay, effective monthly rate, and savings. CSV export."
  }
];

const assertIncludes = (slug, key, value) => {
  if (!text.includes(value)) {
    throw new Error(`${slug}: missing ${key} -> ${value}`);
  }
};

for (const item of expected) {
  assertIncludes(item.slug, "title", item.title);
  assertIncludes(item.slug, "description", item.description);
}

console.log("seo-meta.test.mjs: OK");
