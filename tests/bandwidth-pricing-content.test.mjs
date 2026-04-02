import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const bandwidthStart = text.indexOf('slug: "bandwidth-cost-calculator"');
const bandwidthObjectStart = text.lastIndexOf("{", bandwidthStart);

const findMatchingBrace = (source, startIndex) => {
  let depth = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inTemplateString = false;
  let isEscaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (inSingleQuote || inDoubleQuote || inTemplateString) {
      if (isEscaped) {
        isEscaped = false;
        continue;
      }

      if (char === "\\") {
        isEscaped = true;
        continue;
      }

      if (inSingleQuote && char === "'") inSingleQuote = false;
      if (inDoubleQuote && char === '"') inDoubleQuote = false;
      if (inTemplateString && char === "`") inTemplateString = false;
      continue;
    }

    if (char === "'") {
      inSingleQuote = true;
      continue;
    }
    if (char === '"') {
      inDoubleQuote = true;
      continue;
    }
    if (char === "`") {
      inTemplateString = true;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }

  return -1;
};

const bandwidthEnd = bandwidthObjectStart === -1 ? -1 : findMatchingBrace(text, bandwidthObjectStart);

if (bandwidthStart === -1 || bandwidthObjectStart === -1 || bandwidthEnd === -1) {
  throw new Error("bandwidth pricing content: could not isolate bandwidth-cost-calculator block");
}

const bandwidthBlock = text.slice(bandwidthObjectStart, bandwidthEnd);
const normalizedBandwidthBlock = bandwidthBlock.replace(/\r\n/g, "\n");

const expectedMetaDescriptionSnippet =
  'metaDescription:\n      "Calculate a margin-safe bandwidth price from monthly GB egress, blended cost per GB, fixed overhead, and target gross margin. Set a price-per-GB floor, decide when bandwidth should be billed separately or passed through, and test CDN-heavy or regional traffic before publishing rates."';

const requiredSnippets = [
  'metaTitle: "Bandwidth Pricing Calculator & Price Per GB Floor | PricingNest"',
  'reviewedBy: "PricingNest Editorial Team"',
  'reviewed: "2026-04-02"',
  'label: "Bandwidth Pricing Guide"',
  'label: "Bandwidth Pricing Guardrails"',
  'label: "CDN Cost Pass-Through"',
  'q: "How do I turn blended egress cost into a bandwidth price floor?"',
  'q: "When should bandwidth be priced as a separate line item?"',
  'q: "When should CDN costs be passed through separately?"',
  'q: "How should I handle regional egress differences in pricing?"',
  'q: "When does bandwidth overhead require a base fee or minimum commitment?"',
  'q: "How do I test whether margin still holds for traffic spikes or heavy accounts?"'
];

const forbiddenSnippets = [
  "Is this a CDN pricing calculator?",
  "What cost per GB should I use?",
  "How do I handle free CDN tiers?",
  "What if bandwidth is a pass-through cost?"
];

for (const snippet of requiredSnippets) {
  if (!bandwidthBlock.includes(snippet)) {
    throw new Error(`bandwidth pricing content missing snippet: ${snippet}`);
  }
}

if (!normalizedBandwidthBlock.includes(expectedMetaDescriptionSnippet)) {
  throw new Error(`bandwidth pricing content missing snippet: ${expectedMetaDescriptionSnippet}`);
}

for (const snippet of forbiddenSnippets) {
  if (bandwidthBlock.includes(snippet)) {
    throw new Error(`bandwidth pricing content should not include snippet: ${snippet}`);
  }
}

const clusterStart = text.indexOf('"bandwidth-cost-calculator":', text.indexOf("CORE_TOOL_CLUSTER_LINKS"));
const clusterEnd = text.indexOf("],", clusterStart);

if (clusterStart === -1 || clusterEnd === -1) {
  throw new Error("bandwidth pricing cluster: could not isolate core tool cluster block");
}

const clusterBlock = text.slice(clusterStart, clusterEnd + 2);

const requiredClusterLinks = [
  "/guides/bandwidth-pricing-guide/",
  "/guides/bandwidth-pricing-guardrails/",
  "/guides/cdn-cost-pass-through/",
  "/glossary/egress/",
  "/glossary/bandwidth/"
];

for (const link of requiredClusterLinks) {
  if (!clusterBlock.includes(link)) {
    throw new Error(`bandwidth pricing cluster missing required link: ${link}`);
  }
}

console.log("bandwidth-pricing-content.test.mjs: OK");
