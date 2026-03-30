import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aboutPagePath = join(__dirname, "..", "src", "pages", "about.astro");
const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const guidesPagePath = join(__dirname, "..", "src", "pages", "guides", "[slug].astro");
const glossaryPagePath = join(__dirname, "..", "src", "pages", "glossary", "[slug].astro");
const globalCssPath = join(__dirname, "..", "src", "styles", "global.css");

const aboutPageText = readFileSync(aboutPagePath, "utf-8");
const toolPageText = readFileSync(toolPagePath, "utf-8");
const guidesPageText = readFileSync(guidesPagePath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");
const globalCssText = readFileSync(globalCssPath, "utf-8");

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
  'id="editorial-team"',
  'id="how-calculators-are-built"',
  'id="review-policy"',
  'id="corrections-policy"',
  "Editorial responsibility",
  "How calculators are built",
  "Corrections and updates",
]) {
  assertIncludes(aboutPageText, "about page", expected);
}

for (const text of [guidesPageText, glossaryPageText]) {
  assertIncludes(text, "content page", '/about/#editorial-team');
  assertIncludes(text, "content page", '/about/#review-policy');
}

for (const expected of [
  "Methodology and review",
  "Reviewed by:",
  "Correction or feedback",
  '/about/#how-calculators-are-built',
  '/about/#review-policy',
]) {
  assertIncludes(toolPageText, "tool page", expected);
}

assertExcludes(globalCssText, "global css", ".crumbs a {\n  color: rgba(255, 255, 255, 0.84);\n}");

console.log("site-trust-signals-batch.test.mjs: OK");
