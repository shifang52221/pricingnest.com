import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const guidesPagePath = join(__dirname, "..", "src", "pages", "guides", "[slug].astro");
const glossaryPagePath = join(__dirname, "..", "src", "pages", "glossary", "[slug].astro");
const guidesHubPath = join(__dirname, "..", "src", "pages", "guides", "index.astro");
const glossaryHubPath = join(__dirname, "..", "src", "pages", "glossary", "index.astro");
const toolkitHubPath = join(__dirname, "..", "src", "pages", "saas-pricing", "index.astro");

const guidesPageText = readFileSync(guidesPagePath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");
const guidesHubText = readFileSync(guidesHubPath, "utf-8");
const glossaryHubText = readFileSync(glossaryHubPath, "utf-8");
const toolkitHubText = readFileSync(toolkitHubPath, "utf-8");

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

for (const expected of [
  'const glossaryEntries = await getCollection("glossary");',
  "const glossaryTitleMap = new Map(",
  "Recommended next steps",
]) {
  assertIncludes(guidesPageText, "guides detail page", expected);
}

for (const expected of [
  'const guideEntries = await getCollection("guides");',
  "const guideTitleMap = new Map(",
  "const glossaryTitleMap = new Map(",
  "Recommended next steps",
]) {
  assertIncludes(glossaryPageText, "glossary detail page", expected);
}

assertExcludes(glossaryPageText, "glossary detail page", '.split("-")');
assertExcludes(guidesHubText, "guides hub", "Browse more guides");
assertExcludes(glossaryHubText, "glossary hub", "Browse more terms");
assertExcludes(toolkitHubText, "toolkit hub", "All use cases");
assertExcludes(toolkitHubText, "toolkit hub", "/saas-pricing/use-cases/usage-based-pricing/");
assertExcludes(toolkitHubText, "toolkit hub", "/saas-pricing/use-cases/api-pricing/");

console.log("navigation-deduping.test.mjs: OK");
