import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const apiStart = text.indexOf('slug: "api-pricing-calculator"');
const apiEnd = text.indexOf("slug: \"storage-cost-calculator\"", apiStart);

if (apiStart === -1 || apiEnd === -1) {
  throw new Error("api pricing content: could not isolate api-pricing-calculator block");
}

const apiBlock = text.slice(apiStart, apiEnd);

const requiredSnippets = [
  "API Pricing Calculator & Price Per 1,000 Calls Floor | PricingNest",
  "Calculate a margin-safe API price from call volume, infra cost per 1,000 calls, fixed overhead, and target gross margin. Compare billable-call scenarios, set a price floor, and decide when a platform fee or minimum commitment is needed.",
  'label: "Value Metric Selection"',
  'label: "API Pricing Model"',
  'label: "Minimum Commitment Modeling"',
  'q: "How do I choose between pricing per call and per 1,000 calls?"',
  'q: "What should count as a billable API call?"',
  'q: "When should I add a platform fee or minimum commitment?"',
  'q: "How do I test whether gross margin survives heavier traffic?"',
  'q: "How do I turn a price-per-1,000-calls floor into included usage and overages?"'
];

const forbiddenSnippets = [
  "API cost estimate",
  'q: "How do I go from API cost estimate to list price?"',
  'q: "Can I use this as a cost estimate for an API plan?"'
];

for (const snippet of requiredSnippets) {
  if (!apiBlock.includes(snippet)) {
    throw new Error(`api pricing content missing snippet: ${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (apiBlock.includes(snippet)) {
    throw new Error(`api pricing content should not include snippet: ${snippet}`);
  }
}

console.log("api-pricing-content.test.mjs: OK");
