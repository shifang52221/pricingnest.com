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
    title: "Storage Pricing Calculator - Cost per GB & Requests | PricingNest",
    description:
      "Free storage pricing calculator to estimate cost per GB-month, request fees, and target-margin monthly price. CSV export."
  },
  {
    slug: "usage-based-pricing-calculator",
    title: "Usage-Based Pricing Calculator - Price per Unit, Delta & CSV | PricingNest",
    description:
      "Free usage-based pricing calculator. Calculate required price per unit, compare scenario deltas, and download CSV."
  },
  {
    slug: "api-pricing-calculator",
    title: "API Pricing Calculator & Cost Estimator - Per 1,000 Calls | PricingNest",
    description:
      "Free API pricing calculator and API cost estimator. Model call volume, cost per 1,000 calls, margin, and monthly plan price. CSV export."
  },
  {
    slug: "compute-cost-estimator",
    title: "Compute Cost Estimator - Compute Costs (vCPU & GB-Hour) | PricingNest",
    description:
      "Free compute cost estimator to calculate compute costs from vCPU-hours and GB-hours, then set a target-margin price. CSV export."
  },
  {
    slug: "annual-discount-calculator",
    title: "Annual Discount Calculator - Monthly to Annual Price | PricingNest",
    description:
      "Free annual discount calculator to convert monthly to annual price, effective monthly rate, and annual prepay savings. CSV export."
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
