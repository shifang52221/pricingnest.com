import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexPagePath = join(__dirname, "..", "src", "pages", "index.astro");
const aboutPagePath = join(__dirname, "..", "src", "pages", "about.astro");
const baseLayoutPath = join(__dirname, "..", "src", "layouts", "BaseLayout.astro");

const indexPageText = readFileSync(indexPagePath, "utf-8");
const aboutPageText = readFileSync(aboutPagePath, "utf-8");
const baseLayoutText = readFileSync(baseLayoutPath, "utf-8");

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

assertExcludes(indexPageText, "homepage", "SEO and tier-1 traffic");
assertExcludes(indexPageText, "homepage", "SEO-friendly toolkit structure");
assertIncludes(indexPageText, "homepage", "Transparent formulas");
assertIncludes(indexPageText, "homepage", "Read the methodology");
assertIncludes(indexPageText, "homepage", "Trust and methodology");

assertExcludes(baseLayoutText, "base layout", "SEO-friendly, high-intent queries");
assertIncludes(baseLayoutText, "base layout", "input-driven calculators and practical guides");

assertIncludes(aboutPageText, "about page", "How calculators are built");
assertIncludes(aboutPageText, "about page", "How pages are reviewed");
assertIncludes(aboutPageText, "about page", "Editorial standards");
assertIncludes(aboutPageText, "about page", "Corrections and updates");
assertIncludes(aboutPageText, "about page", "PricingNest Editorial Team");

console.log("site-quality-signals.test.mjs: OK");
