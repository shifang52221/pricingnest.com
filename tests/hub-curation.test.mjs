import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const guidesIndexPath = join(__dirname, "..", "src", "pages", "guides", "index.astro");
const glossaryIndexPath = join(__dirname, "..", "src", "pages", "glossary", "index.astro");
const toolkitIndexPath = join(__dirname, "..", "src", "pages", "saas-pricing", "index.astro");

const guidesIndexText = readFileSync(guidesIndexPath, "utf-8");
const glossaryIndexText = readFileSync(glossaryIndexPath, "utf-8");
const toolkitIndexText = readFileSync(toolkitIndexPath, "utf-8");

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

assertIncludes(guidesIndexText, "guides hub", "Featured decision guides");
assertIncludes(guidesIndexText, "guides hub", "Pricing page and packaging guides");
assertIncludes(guidesIndexText, "guides hub", "Unit economics and cost recovery");
assertIncludes(guidesIndexText, "guides hub", "Start with the guide closest to the pricing decision you are making");
assertExcludes(guidesIndexText, "guides hub", "{guides.map((g) => (");

assertIncludes(glossaryIndexText, "glossary hub", "Key terms to learn first");
assertIncludes(glossaryIndexText, "glossary hub", "Pricing mechanics");
assertIncludes(glossaryIndexText, "glossary hub", "Unit economics and retention");
assertIncludes(glossaryIndexText, "glossary hub", "Learn the core terms first, then move into the calculators and guides");
assertExcludes(glossaryIndexText, "glossary hub", "{terms.map((t) => (");

assertIncludes(toolkitIndexText, "toolkit hub", "Five core calculator workflows");
assertIncludes(toolkitIndexText, "toolkit hub", "Usage-based pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "API pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "Storage pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "Compute pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "Annual pricing and discounts");
assertExcludes(toolkitIndexText, "toolkit hub", "Tier-1 intent keywords");
assertExcludes(toolkitIndexText, "toolkit hub", "Pricing page refresh");
assertExcludes(toolkitIndexText, "toolkit hub", "Retention and expansion");
assertExcludes(toolkitIndexText, "toolkit hub", "/guides/pricing-page-competitive-positioning/");
assertExcludes(toolkitIndexText, "toolkit hub", "/guides/expansion-forecasting/");

console.log("hub-curation.test.mjs: OK");
