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
      "Free storage pricing calculator to estimate storage cost per GB-month, fixed monthly costs per GB assumptions, request fees, and target-margin monthly price. CSV export."
  },
  {
    slug: "usage-based-pricing-calculator",
    title: "Usage-Based Pricing Calculator - Price per Unit, Delta & CSV | PricingNest",
    description:
      "Free usage based pricing calculator for price per unit, delta comparison, and a delta CSV template export."
  },
  {
    slug: "api-pricing-calculator",
    title: "API Pricing Calculator & Cost Estimator - Per 1,000 Calls | PricingNest",
    description:
      "Free API pricing calculator and API cost estimate tool. Build an API cost estimate from call volume and cost per 1,000 calls, then set monthly plan price. CSV export."
  },
  {
    slug: "compute-cost-estimator",
    title: "Compute Cost Estimator - Compute Costs (vCPU & GB-Hour) | PricingNest",
    description:
      "Free compute cost estimator to calculate compute costs from vCPU-hours and GB-hours, then set compute pricing at target margin. CSV export."
  },
  {
    slug: "annual-discount-calculator",
    title: "Annual Discount Calculator - Monthly to Annual Price | PricingNest",
    description:
      "Free annual discount calculator for monthly to annual pricing: annual prepay price, effective monthly rate, and savings. CSV export."
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
