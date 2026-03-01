import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const text = readFileSync(pagePath, "utf-8");

const requiredLabels = [
  "Guide: usage-based pricing examples (price per unit)",
  "Guide: monthly to annual pricing and discount strategy",
  "Guide: compute costs and pricing model",
  "Guide: compute cost baseline (vCPU & GB-hour)",
  "Guide: API pricing model (per 1,000 calls)",
  "Guide: API cost estimate (per 1,000 calls)",
  "Guide: storage cost per GB and pricing"
];

for (const label of requiredLabels) {
  if (!text.includes(label)) {
    throw new Error(`guide anchor missing label: ${label}`);
  }
}

console.log("guide-anchor-intent.test.mjs: OK");
