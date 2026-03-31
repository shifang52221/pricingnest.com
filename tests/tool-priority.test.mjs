import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const toolkitPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "index.astro");

const toolsText = readFileSync(toolsPath, "utf-8");
const toolkitPageText = readFileSync(toolkitPagePath, "utf-8");
const priorityBlockStart = toolsText.indexOf("export const SEO_PRIORITY_TOOL_SLUGS = [");
const priorityBlockEnd = toolsText.indexOf("] as const;", priorityBlockStart);
const priorityBlock = toolsText.slice(priorityBlockStart, priorityBlockEnd);

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

assertIncludes(toolsText, "tools.ts", 'export const SEO_PRIORITY_TOOL_SLUGS = [');
assertIncludes(priorityBlock, "SEO_PRIORITY_TOOL_SLUGS", '"storage-cost-calculator"');
assertIncludes(priorityBlock, "SEO_PRIORITY_TOOL_SLUGS", '"compute-cost-estimator"');
assertIncludes(priorityBlock, "SEO_PRIORITY_TOOL_SLUGS", '"api-pricing-calculator"');
assertIncludes(priorityBlock, "SEO_PRIORITY_TOOL_SLUGS", '"usage-based-pricing-calculator"');
assertIncludes(priorityBlock, "SEO_PRIORITY_TOOL_SLUGS", '"annual-discount-calculator"');
assertIncludes(toolsText, "tools.ts", "export function getPriorityTools(tools: ToolDefinition[]): ToolDefinition[] {");
if (priorityBlock.includes('"pricing-increase-impact-calculator"')) {
  throw new Error("SEO_PRIORITY_TOOL_SLUGS: pricing-increase-impact-calculator should not stay in the priority set");
}

assertIncludes(toolkitPageText, "toolkit page", "const featuredTools = getPriorityTools(TOOLS);");
assertIncludes(toolkitPageText, "toolkit page", "itemListElement: featuredTools.map((t, i) => ({");
assertIncludes(toolkitPageText, "toolkit page", "{featuredTools.map((tool) => (");

console.log("tool-priority.test.mjs: OK");
