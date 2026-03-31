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
    name: "Price Per Unit Calculator for Usage-Based Pricing",
    metaTitle: "Usage-Based Pricing Calculator & Price Per Unit Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe price per unit from usage, unit cost, fixed overhead, and target margin. Compare p50 and p90 scenarios, set a pricing floor, and decide when a platform fee or minimum commitment is needed."
  },
  {
    slug: "compute-cost-estimator",
    name: "Compute Pricing Calculator from vCPU and Memory Costs",
    metaTitle: "Compute Pricing Calculator & Cost Estimator | PricingNest",
    metaDescription:
      "Estimate compute costs from vCPU-hours, memory GB-hours, and fixed overhead, then turn them into a margin-safe monthly compute price."
  },
  {
    slug: "annual-discount-calculator",
    name: "Annual Discount Calculator",
    metaTitle: "Annual Discount Calculator - Annual Pricing | PricingNest",
    metaDescription:
      "Free annual discount calculator to convert a monthly price into annual pricing, annual prepay savings, and effective monthly rate."
  },
  {
    slug: "pricing-increase-impact-calculator",
    name: "Price Increase Calculator for Grandfathered Plans",
    metaTitle: "Grandfathering Pricing Plans Calculator | PricingNest",
    metaDescription:
      "Model revenue lift, churn risk, and break-even churn for a price increase. Compare fully grandfathered, partially grandfathered, and no-grandfathering scenarios."
  },
  {
    slug: "api-pricing-calculator",
    name: "API Pricing Calculator for Cost per 1,000 Calls",
    metaTitle: "API Cost Calculator & Pricing Estimator | PricingNest",
    metaDescription:
      "Estimate API cost per 1,000 calls, monthly API cost, and a margin-safe plan price. Use real call volume and overhead to turn API cost estimates into pricing."
  },
  {
    slug: "storage-cost-calculator",
    name: "Storage Pricing Calculator: Cost Per GB and Monthly Cost",
    metaTitle: "Cost Per GB Calculator for Storage Pricing | PricingNest",
    metaDescription:
      "Estimate monthly storage cost, request fees, and a target price per GB. Use it to turn cost per GB assumptions into a margin-safe storage pricing model."
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

const pagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const pageText = readFileSync(pagePath, "utf-8");

if (!pageText.includes("const toolMetaTitle = getToolMetaTitle(tool);")) {
  throw new Error("tool page: missing getToolMetaTitle usage");
}

if (!pageText.includes("const toolMetaDescription = getToolMetaDescription(tool);")) {
  throw new Error("tool page: missing getToolMetaDescription usage");
}

if (!pageText.includes("<BaseLayout title={pageTitle} description={toolMetaDescription}>")) {
  throw new Error("tool page: BaseLayout is not wired to tool metadata");
}

console.log("seo-meta.test.mjs: OK");
