import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const toolkitPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "index.astro");

const toolsText = readFileSync(toolsPath, "utf-8");
const toolkitPageText = readFileSync(toolkitPagePath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

assertIncludes(toolsText, "tools.ts", 'export const SEO_PRIORITY_TOOL_SLUGS = [');
assertIncludes(toolsText, "tools.ts", '"storage-cost-calculator"');
assertIncludes(toolsText, "tools.ts", '"compute-cost-estimator"');
assertIncludes(toolsText, "tools.ts", '"api-pricing-calculator"');
assertIncludes(toolsText, "tools.ts", '"usage-based-pricing-calculator"');
assertIncludes(toolsText, "tools.ts", '"pricing-increase-impact-calculator"');
assertIncludes(toolsText, "tools.ts", "export function getPriorityTools(tools: ToolDefinition[]): ToolDefinition[] {");

assertIncludes(toolkitPageText, "toolkit page", "const featuredTools = getPriorityTools(TOOLS);");
assertIncludes(toolkitPageText, "toolkit page", "itemListElement: featuredTools.map((t, i) => ({");
assertIncludes(toolkitPageText, "toolkit page", "{featuredTools.map((tool) => (");

console.log("tool-priority.test.mjs: OK");
