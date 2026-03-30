import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const toolPageText = readFileSync(toolPagePath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

const assertExcludes = (text, label, unexpected) => {
  if (text.includes(unexpected)) {
    throw new Error(`${label}: should not include ${unexpected}`);
  }
};

assertExcludes(toolPageText, "tool page", "Advertisement");
assertExcludes(toolPageText, "tool page", "More to explore");
assertExcludes(toolPageText, "tool page", "Auto-generated from your inputs.");
assertExcludes(toolPageText, "tool page", "import AdSlot");
assertIncludes(toolPageText, "tool page", "Updated from your current assumptions.");
assertIncludes(toolPageText, "tool page", "Recommended next steps");
assertIncludes(toolPageText, "tool page", "function dedupeLinks");
assertIncludes(toolPageText, "tool page", "const recommendedLinks =");

console.log("template-quality.test.mjs: OK");
