import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configPath = join(__dirname, "..", "src", "content", "config.ts");
const guidesPagePath = join(__dirname, "..", "src", "pages", "guides", "[slug].astro");
const glossaryPagePath = join(__dirname, "..", "src", "pages", "glossary", "[slug].astro");

const configText = readFileSync(configPath, "utf-8");
const guidesPageText = readFileSync(guidesPagePath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

for (const field of ["published", "author", "reviewedBy", "reviewed", "sources"]) {
  assertIncludes(configText, "content config", field);
}

assertIncludes(guidesPageText, "guides page", '"@type": "Article"');
assertIncludes(guidesPageText, "guides page", "PricingNest Editorial Team");
assertIncludes(guidesPageText, "guides page", "Methodology and review");
assertIncludes(guidesPageText, "guides page", 'type="application/ld+json"');

assertIncludes(glossaryPageText, "glossary page", '"@type": "DefinedTerm"');
assertIncludes(glossaryPageText, "glossary page", "PricingNest Editorial Team");
assertIncludes(glossaryPageText, "glossary page", "Methodology and review");
assertIncludes(glossaryPageText, "glossary page", 'type="application/ld+json"');

console.log("editorial-metadata.test.mjs: OK");
