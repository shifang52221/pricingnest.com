import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const toolCardPath = join(__dirname, "..", "src", "components", "ToolCard.astro");

const toolPageText = readFileSync(toolPagePath, "utf-8");
const toolCardText = readFileSync(toolCardPath, "utf-8");

const toolPageRequiredSnippets = [
  "getToolName",
  "getToolMetaTitle",
  "getToolMetaDescription",
  "const toolName = getToolName(tool);",
  "const toolMetaTitle = getToolMetaTitle(tool);",
  "const toolMetaDescription = getToolMetaDescription(tool);",
  "<h1>{toolName}</h1>",
  "<p>{tool.description}</p>"
];

const toolCardRequiredSnippets = [
  "getToolName",
  "<strong>{getToolName(tool)}</strong>",
  "<span>{tool.description}</span>"
];

for (const snippet of toolPageRequiredSnippets) {
  if (!toolPageText.includes(snippet)) {
    throw new Error(`tool page missing snippet: ${snippet}`);
  }
}

for (const snippet of toolCardRequiredSnippets) {
  if (!toolCardText.includes(snippet)) {
    throw new Error(`tool card missing snippet: ${snippet}`);
  }
}

console.log("tool-meta-separation.test.mjs: OK");
