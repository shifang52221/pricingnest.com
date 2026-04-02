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
    metaTitle: "Compute Pricing Calculator & Monthly Price Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe compute price from vCPU-hours, memory GB-hours, blended unit cost, fixed overhead, and target gross margin. Compare baseline and heavier workloads, set a price floor, and decide when a platform fee or minimum commitment is needed."
  },
  {
    slug: "annual-discount-calculator",
    name: "Annual Discount Calculator",
    metaTitle: "Annual Discount Calculator - Annual Pricing | PricingNest",
    metaDescription:
      "Free annual discount calculator to convert a monthly price into annual pricing, annual prepay savings, and effective monthly rate."
  },
  {
    slug: "bandwidth-cost-calculator",
    metaTitle: "Bandwidth Pricing Calculator & Price Per GB Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe bandwidth price from monthly GB egress, blended cost per GB, fixed overhead, and target gross margin. Set a price-per-GB floor, decide when bandwidth should be billed separately or passed through, and test CDN-heavy or regional traffic before publishing rates."
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
    metaTitle: "API Pricing Calculator & Price Per 1,000 Calls Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe API price from call volume, infra cost per 1,000 calls, fixed overhead, and target gross margin. Compare billable-call scenarios, set a price floor, and decide when a platform fee or minimum commitment is needed."
  },
  {
    slug: "storage-cost-calculator",
    name: "Storage Pricing Calculator: Cost Per GB and Monthly Cost",
    metaTitle: "Storage Pricing Calculator & Price Per GB-Month Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe storage price from average GB stored, request volume, retrieval-sensitive costs, fixed overhead, and target gross margin. Compare archive and request-heavy workloads, set a price per GB-month floor, and decide when request or retrieval fees should be priced separately."
  }
];

const assertIncludes = (slug, key, value) => {
  if (!text.includes(value)) {
    throw new Error(`${slug}: missing ${key} -> ${value}`);
  }
};

for (const item of expected) {
  if (item.name) {
    assertIncludes(item.slug, "name", item.name);
  }
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
