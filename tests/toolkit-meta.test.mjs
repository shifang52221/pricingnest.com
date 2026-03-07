import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "index.astro");
const text = readFileSync(pagePath, "utf-8");

const requiredSnippets = [
  "title=\"SaaS Pricing Calculator Toolkit - Free Cost & Margin Calculators | PricingNest\"",
  "description=\"Free SaaS pricing calculator toolkit with usage-based pricing, API pricing, storage and compute cost calculators, plus margin modeling.\""
];

for (const snippet of requiredSnippets) {
  if (!text.includes(snippet)) {
    throw new Error(`toolkit meta missing snippet: ${snippet}`);
  }
}

console.log("toolkit-meta.test.mjs: OK");
