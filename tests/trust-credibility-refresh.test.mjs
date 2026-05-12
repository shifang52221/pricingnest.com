import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aboutPagePath = join(__dirname, "..", "src", "pages", "about.astro");
const contactPagePath = join(__dirname, "..", "src", "pages", "contact.astro");
const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");

const aboutPageText = readFileSync(aboutPagePath, "utf-8");
const contactPageText = readFileSync(contactPagePath, "utf-8");
const toolPageText = readFileSync(toolPagePath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

for (const expected of [
  "Why this site exists",
  "Who maintains the site",
  "Who should use PricingNest",
  "What this site does not replace",
  "What counts as a reviewed update",
  "What changed when a review date is refreshed"
]) {
  assertIncludes(aboutPageText, "about page", expected);
}

for (const expected of [
  "Editorial contact",
  "Correction requests",
  "What to include",
  "What we can review",
  "What we cannot verify for you"
]) {
  assertIncludes(contactPageText, "contact page", expected);
}

for (const expected of [
  "What review means",
  "Default inputs are examples only",
  "Replace the defaults with your own bills, contracts, and usage data",
  "Use the contact page for corrections",
  "This page does not replace finance review"
]) {
  assertIncludes(toolPageText, "tool page", expected);
}

console.log("trust-credibility-refresh.test.mjs: OK");
