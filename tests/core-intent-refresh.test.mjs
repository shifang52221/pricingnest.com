import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const usageGuidePath = join(__dirname, "..", "src", "content", "guides", "usage-based-pricing-examples.md");
const annualGuidePath = join(__dirname, "..", "src", "content", "guides", "annual-prepay-discount.md");
const storageGuidePath = join(__dirname, "..", "src", "content", "guides", "storage-costs-and-pricing.md");
const gbGuidePath = join(__dirname, "..", "src", "content", "guides", "price-per-gb-month-explained.md");

const toolsText = readFileSync(toolsPath, "utf-8");
const toolPageText = readFileSync(toolPagePath, "utf-8");
const usageGuideText = readFileSync(usageGuidePath, "utf-8");
const annualGuideText = readFileSync(annualGuidePath, "utf-8");
const storageGuideText = readFileSync(storageGuidePath, "utf-8");
const gbGuideText = readFileSync(gbGuidePath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

const assertToolBlockIncludes = (slug, expectedValues) => {
  const start = toolsText.indexOf(`slug: "${slug}"`);
  if (start === -1) throw new Error(`tools data: missing block for ${slug}`);
  const block = toolsText.slice(start, start + 14000);
  for (const expected of expectedValues) {
    assertIncludes(block, slug, expected);
  }
};

assertToolBlockIncludes("usage-based-pricing-calculator", [
  "Use it when you need a price-per-unit floor before you decide whether the plan also needs tiers, included usage, or a minimum commitment.",
  "Use this usage-based pricing calculator to calculate a margin-safe price per unit",
  "Use this when you already know the billable unit and need the floor before moving into tiering, included usage, or minimum commitments.",
]);

assertToolBlockIncludes("annual-discount-calculator", [
  "Convert a monthly price into an annual prepay price, annual savings, and an effective monthly rate you can publish or review internally.",
  "Use this annual discount calculator to convert a monthly plan into annual pricing",
  "Use this when you already have a monthly price and need to compare annual invoice, annual savings, and the effective monthly anchor.",
]);

assertToolBlockIncludes("storage-cost-calculator", [
  "Estimate storage cost structure from average GB stored, request volume, and fixed overhead before you decide what should become a buyer-facing rate.",
  "Use this storage cost calculator to model storage, request, and fixed-cost recovery before translating the result into a public price.",
  "Use this when you still need to understand the real storage cost structure before deciding whether one GB-month price is honest.",
]);

assertToolBlockIncludes("price-per-gb-month-calculator", [
  "Translate a storage cost model into a buyer-facing price per GB-month after you already understand the underlying workload economics.",
  "Use this when you already know the storage cost structure and need a publishable GB-month benchmark rather than a deeper cost breakdown.",
]);

for (const expected of [
  'href: "/guides/usage-based-pricing-examples/", label: "Guide: when one unit price needs tiers, included usage, or overage"',
  'href: "/guides/annual-prepay-discount/", label: "Guide: when annual prepay helps and how deep the discount should go"',
  'href: "/guides/storage-costs-and-pricing/", label: "Guide: when one GB-month price stops being enough"',
  'href: "/guides/price-per-gb-month-explained/", label: "Guide: turn the cost model into a buyer-facing GB-month rate"',
]) {
  assertIncludes(toolPageText, "tool page", expected);
}

for (const expected of [
  "The calculator should answer one narrower question first: what price per unit clears margin before you layer in packaging structure.",
  "Use the calculator first when the unit is already chosen and the main question is whether one public price per unit still clears margin.",
]) {
  assertIncludes(usageGuideText, "usage guide", expected);
}

for (const expected of [
  "The calculator should handle the conversion first: monthly price to annual invoice, annual savings, and effective monthly rate.",
  "Use the calculator first when the monthly list price already exists and the main question is how the annual prepay offer changes the buyer-facing number.",
]) {
  assertIncludes(annualGuideText, "annual guide", expected);
}

for (const expected of [
  "This guide answers a different question from the calculators.",
  "Use the Storage Cost Calculator when you still need to model the underlying cost structure.",
  "Use the Price Per GB-Month Calculator when the cost structure is already understood and the next job is translating it into a buyer-facing benchmark.",
]) {
  assertIncludes(storageGuideText, "storage guide", expected);
}

for (const expected of [
  "This page is for the buyer-facing rate, not the first-pass cost breakdown.",
  "If you still need to separate storage, request, retrieval, and fixed overhead costs, go back to the Storage Cost Calculator first.",
]) {
  assertIncludes(gbGuideText, "GB-month guide", expected);
}

console.log("core-intent-refresh.test.mjs: OK");
