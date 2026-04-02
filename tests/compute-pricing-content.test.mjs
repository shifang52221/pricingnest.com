import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const computeStart = text.indexOf('slug: "compute-cost-estimator"');
const computeEnd = text.indexOf("slug: \"api-pricing-calculator\"", computeStart);

if (computeStart === -1 || computeEnd === -1) {
  throw new Error("compute pricing content: could not isolate compute-cost-estimator block");
}

const computeBlock = text.slice(computeStart, computeEnd);

const requiredSnippets = [
  "Compute Pricing Calculator & Monthly Price Floor | PricingNest",
  "Calculate a margin-safe compute price from vCPU-hours, memory GB-hours, blended unit cost, fixed overhead, and target gross margin. Compare baseline and heavier workloads, set a price floor, and decide when a platform fee or minimum commitment is needed.",
  'label: "SaaS Gross Margin Targets"',
  'label: "Compute Cost Modeling"',
  'label: "Minimum Commitment Modeling"',
  'q: "When is fixed compute cost too high for pure variable pricing?"',
  'q: "How should I treat reserved capacity or savings plans in pricing?"',
  'q: "When should I add a platform fee or minimum commitment?"',
  'q: "How do I test whether gross margin survives heavier workloads?"',
  'q: "How do I turn a compute price floor into committed tiers or minimums?"'
];

const forbiddenSnippets = [
  "cloud compute cost",
  "What are vCPU-hours and GB-hours?",
  "Should I treat autoscaling as lower cost?"
];

for (const snippet of requiredSnippets) {
  if (!computeBlock.includes(snippet)) {
    throw new Error(`compute pricing content missing snippet: ${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (computeBlock.includes(snippet)) {
    throw new Error(`compute pricing content should not include snippet: ${snippet}`);
  }
}

const clusterStart = text.indexOf('"compute-cost-estimator":', text.indexOf("CORE_TOOL_CLUSTER_LINKS"));
const clusterEnd = text.indexOf('"api-pricing-calculator":', clusterStart);

if (clusterStart === -1 || clusterEnd === -1) {
  throw new Error("compute pricing cluster: could not isolate core tool cluster block");
}

const clusterBlock = text.slice(clusterStart, clusterEnd);

const requiredClusterLinks = [
  "/guides/saas-gross-margin-targets/",
  "/guides/compute-cost-modeling/",
  "/guides/minimum-commitment-model/",
  "/glossary/unit-cost/",
  "/glossary/gross-margin/"
];

for (const link of requiredClusterLinks) {
  if (!clusterBlock.includes(link)) {
    throw new Error(`compute pricing cluster missing required link: ${link}`);
  }
}

if (clusterBlock.includes("/glossary/cogs/")) {
  throw new Error("compute pricing cluster should not include /glossary/cogs/");
}

console.log("compute-pricing-content.test.mjs: OK");
