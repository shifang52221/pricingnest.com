import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const computeStart = text.indexOf('slug: "compute-cost-estimator"');
const computeEnd = text.indexOf('slug: "monthly-cloud-cost-estimator"', computeStart);

if (computeStart === -1 || computeEnd === -1) {
  throw new Error("compute pricing content: could not isolate compute-cost-estimator block");
}

const computeBlock = text.slice(computeStart, computeEnd);

const requiredSnippets = [
  'metaTitle: "Compute Pricing Calculator & Monthly Price Floor | PricingNest"',
  'label: "Blended capacity cost and reserved-capacity review"',
  'label: "SaaS Gross Margin Targets"',
  'label: "Compute Cost Modeling"',
  'label: "Minimum Commitment Modeling"',
  'title: "Monthly plan versus commitment review"',
  'q: "When should I keep compute pricing as a flat monthly plan?"',
  'q: "When should compute pricing move to included usage or overages?"',
  'q: "When should I add a platform fee or minimum commitment?"',
  'q: "What if one public compute rate stops fitting very different workload shapes?"',
  "Use the floor to decide when a flat monthly plan is still honest and when compute should move into committed tiers, included usage, or overages."
];

for (const snippet of requiredSnippets) {
  if (!computeBlock.includes(snippet)) {
    throw new Error(`compute pricing content missing snippet: ${snippet}`);
  }
}

console.log("compute-pricing-content.test.mjs: OK");
