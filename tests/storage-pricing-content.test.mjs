import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const storageStart = text.indexOf('slug: "storage-cost-calculator"');
const storageEnd = text.indexOf("export function getToolBySlug", storageStart);

if (storageStart === -1 || storageEnd === -1) {
  throw new Error("storage pricing content: could not isolate storage-cost-calculator block");
}

const storageBlock = text.slice(storageStart, storageEnd);

const requiredSnippets = [
  'metaTitle: "Storage Pricing Calculator & Price Per GB-Month Floor | PricingNest"',
  'metaDescription:\n      "Calculate a margin-safe storage price from average GB stored, request volume, retrieval-sensitive costs, fixed overhead, and target gross margin. Compare archive and request-heavy workloads, set a price per GB-month floor, and decide when request or retrieval fees should be priced separately."',
  'label: "Price Per GB-Month Explained"',
  'label: "Storage Costs and Pricing"',
  'label: "Storage Retrieval Fees"',
  'q: "How do I turn cost per GB-month into a storage price floor?"',
  'q: "When should I charge separately for requests or retrievals?"',
  'q: "When should hot and archive storage use different pricing?"',
  'q: "When does fixed storage overhead require a platform fee or minimum commitment?"',
  'q: "How do I test whether gross margin still holds for request-heavy workloads?"'
];

const forbiddenSnippets = [
  "Google Cloud Storage price calculator",
  "What is cost per GB-month?",
  "What counts as a request?"
];

for (const snippet of requiredSnippets) {
  if (!storageBlock.includes(snippet)) {
    throw new Error(`storage pricing content missing snippet: ${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (storageBlock.includes(snippet)) {
    throw new Error(`storage pricing content should not include snippet: ${snippet}`);
  }
}

const clusterStart = text.indexOf('"storage-cost-calculator":', text.indexOf("CORE_TOOL_CLUSTER_LINKS"));
const clusterEnd = text.indexOf('"compute-cost-estimator":', clusterStart);

if (clusterStart === -1 || clusterEnd === -1) {
  throw new Error("storage pricing cluster: could not isolate core tool cluster block");
}

const clusterBlock = text.slice(clusterStart, clusterEnd);

if (clusterBlock.includes("/glossary/storage-costs/")) {
  throw new Error("storage pricing cluster should not include /glossary/storage-costs/");
}

console.log("storage-pricing-content.test.mjs: OK");
