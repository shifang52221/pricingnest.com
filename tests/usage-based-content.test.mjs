import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const usageBasedStart = text.indexOf('slug: "usage-based-pricing-calculator"');
const usageBasedEnd = text.indexOf('slug: "compute-cost-estimator"', usageBasedStart);

if (usageBasedStart === -1 || usageBasedEnd === -1) {
  throw new Error("usage-based content: could not isolate usage-based-pricing-calculator block");
}

const usageBasedBlock = text.slice(usageBasedStart, usageBasedEnd);

const requiredSnippets = [
  'metaTitle: "Usage-Based Pricing Calculator & Price Per Unit Floor | PricingNest"',
  'label: "Usage distribution, blended unit cost, and pricing-floor review"',
  'label: "Value Metric Selection"',
  'label: "SaaS Gross Margin Targets"',
  'label: "Minimum Commitment Modeling"',
  'q: "How do I choose a value metric before setting price per unit?"',
  'q: "When is fixed cost per unit too high for pure usage pricing?"',
  'q: "When should I add a platform fee or minimum commitment?"',
  'q: "How do I test whether gross margin still holds at higher usage?"',
  'q: "How do I turn a unit-price floor into tiers or annual pricing?"',
  "Use the required unit price together with a platform fee or minimum commitment when fixed-cost recovery is too uneven across accounts."
];

const forbiddenSnippets = [
  "Delta CSV Template",
  "delta CSV template",
  'q: "How do I export pricing scenarios to CSV?"',
  'q: "Can I use this as a cost per use calculator?"'
];

for (const snippet of requiredSnippets) {
  if (!usageBasedBlock.includes(snippet)) {
    throw new Error(`usage-based content missing snippet: ${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (usageBasedBlock.includes(snippet)) {
    throw new Error(`usage-based content should not include snippet: ${snippet}`);
  }
}

console.log("usage-based-content.test.mjs: OK");
