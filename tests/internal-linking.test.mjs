import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const guidesPagePath = join(__dirname, "..", "src", "pages", "guides", "[slug].astro");
const glossaryPagePath = join(__dirname, "..", "src", "pages", "glossary", "[slug].astro");

const guidesPageText = readFileSync(guidesPagePath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

assertIncludes(guidesPageText, "guides page", "const relatedToolSlugs = entry.data.tools ?? [];");
assertIncludes(guidesPageText, "guides page", 'label: getToolName(tool)');
assertIncludes(guidesPageText, "guides page", '<h2 style="margin-top: 1.25rem;">Recommended next steps</h2>');
assertIncludes(guidesPageText, "guides page", "Run the calculator closest to this decision.");

assertIncludes(glossaryPageText, "glossary page", 'label: getToolName(tool)');
assertIncludes(glossaryPageText, "glossary page", '<h2 style="margin-top: 1.25rem;">Recommended next steps</h2>');
assertIncludes(glossaryPageText, "glossary page", "Run a calculator that uses this concept directly.");

console.log("internal-linking.test.mjs: OK");
