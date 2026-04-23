import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const text = readFileSync(toolPagePath, "utf-8");

const assertIncludes = (snippet) => {
  if (!text.includes(snippet)) {
    throw new Error(`flagship tool page UX missing snippet: ${snippet}`);
  }
};

assertIncludes("const FLAGSHIP_TOOL_PAGE_SLUGS = new Set([");
assertIncludes('"usage-based-pricing-calculator"');
assertIncludes('"api-pricing-calculator"');
assertIncludes('"compute-cost-estimator"');
assertIncludes('"storage-cost-calculator"');
assertIncludes("const isFlagshipToolPage = FLAGSHIP_TOOL_PAGE_SLUGS.has(tool.slug);");
assertIncludes("const FLAGSHIP_FOLLOW_UP_LINKS: Readonly<Record<string, PageLink[]>> = {");
assertIncludes("const flagshipFollowUpLinks = isFlagshipToolPage ? FLAGSHIP_FOLLOW_UP_LINKS[tool.slug] ?? [] : [];");
assertIncludes("const recommendedLinks = isFlagshipToolPage");
assertIncludes("Decision summary");
assertIncludes("When the current floor is not enough");
assertIncludes("When the monthly price is not enough");
assertIncludes("When one storage price stops being honest");
assertIncludes("What to do next");
assertIncludes('href: "/guides/value-metric-selection/"');
assertIncludes('href: "/guides/usage-based-pricing-examples/"');
assertIncludes('href: "/guides/minimum-commitment-model/"');
assertIncludes('href: "/guides/api-cost-estimation/"');
assertIncludes('href: "/guides/api-pricing-model/"');
assertIncludes('href: "/guides/saas-gross-margin-targets/"');
assertIncludes('href: "/guides/compute-cost-modeling/"');
assertIncludes('href: "/guides/price-per-gb-month-explained/"');
assertIncludes('href: "/guides/storage-costs-and-pricing/"');
assertIncludes('href: "/guides/storage-retrieval-fees/"');
assertIncludes('href: "/glossary/gb-month/"');
assertIncludes('href: "/glossary/minimum-commitment/"');
assertIncludes('href: "/glossary/unit-cost/"');
assertIncludes('href: "/glossary/rate-limit/"');

console.log("flagship-tool-page-ux.test.mjs: OK");
