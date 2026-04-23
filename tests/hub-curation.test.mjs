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
const homepagePath = join(__dirname, "..", "src", "pages", "index.astro");
const homepageText = readFileSync(homepagePath, "utf-8");

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

assertIncludes(guidesIndexText, "guides hub", "Four retained guide paths");
assertIncludes(guidesIndexText, "guides hub", "Start with the path that matches the pricing decision you are making");
assertIncludes(guidesIndexText, "guides hub", "Usage pricing path");
assertIncludes(guidesIndexText, "guides hub", "API pricing path");
assertIncludes(guidesIndexText, "guides hub", "Storage pricing path");
assertIncludes(guidesIndexText, "guides hub", "Compute pricing path");
assertIncludes(guidesIndexText, "guides hub", '"value-metric-selection"');
assertIncludes(guidesIndexText, "guides hub", '"minimum-commitment-model"');
assertIncludes(guidesIndexText, "guides hub", '"compute-cost-modeling"');
assertIncludes(guidesIndexText, "guides hub", '"saas-gross-margin-targets"');
assertIncludes(guidesIndexText, "guides hub", '"usage-based-pricing-examples"');
assertIncludes(guidesIndexText, "guides hub", '"api-cost-estimation"');
assertIncludes(guidesIndexText, "guides hub", '"api-pricing-model"');
assertIncludes(guidesIndexText, "guides hub", '"price-per-gb-month-explained"');
assertIncludes(guidesIndexText, "guides hub", '"storage-costs-and-pricing"');
assertIncludes(guidesIndexText, "guides hub", '"storage-retrieval-fees"');
assertExcludes(guidesIndexText, "guides hub", "Featured decision guides");
assertExcludes(guidesIndexText, "guides hub", "Pricing page and packaging guides");
assertExcludes(guidesIndexText, "guides hub", "Unit economics and cost recovery");
assertExcludes(guidesIndexText, "guides hub", "{guides.map((g) => (");
assertExcludes(guidesIndexText, "guides hub", '"pricing-page-layout-checklist"');
assertExcludes(guidesIndexText, "guides hub", '"pricing-page-comparison-table"');
assertExcludes(guidesIndexText, "guides hub", '"pricing-tier-design"');
assertExcludes(guidesIndexText, "guides hub", '"usage-tier-breakpoints"');

assertIncludes(homepageText, "homepage", "Four core pricing workflows");
assertIncludes(homepageText, "homepage", "Start with one primary calculator path and only the retained support that helps you make the next decision.");
assertIncludes(homepageText, "homepage", "Price API usage without hiding packaging risk");
assertIncludes(homepageText, "homepage", "Turn storage cost into an honest buyer-facing price");
assertIncludes(homepageText, "homepage", "Set a usage price without creating bill shock");
assertIncludes(homepageText, "homepage", "Back into compute pricing before one monthly rate hides the real workload shape");
assertIncludes(homepageText, "homepage", "Secondary pricing checks");
assertIncludes(homepageText, "homepage", "/saas-pricing/annual-discount-calculator/");
assertIncludes(homepageText, "homepage", "/guides/api-cost-estimation/");
assertIncludes(homepageText, "homepage", "/glossary/api-call/");
assertIncludes(homepageText, "homepage", "/glossary/rate-limit/");
assertIncludes(homepageText, "homepage", "/guides/storage-costs-and-pricing/");
assertIncludes(homepageText, "homepage", "/glossary/gb-month/");
assertIncludes(homepageText, "homepage", "/glossary/minimum-commitment/");
assertIncludes(homepageText, "homepage", "/guides/usage-based-pricing-examples/");
assertIncludes(homepageText, "homepage", "/glossary/overage/");
assertExcludes(homepageText, "homepage", "Launch usage-based billing");

assertIncludes(glossaryIndexText, "glossary hub", "Four retained glossary paths");
assertIncludes(glossaryIndexText, "glossary hub", "Learn only the language you need before opening the matching calculator or guide path.");
assertIncludes(glossaryIndexText, "glossary hub", "API pricing terms");
assertIncludes(glossaryIndexText, "glossary hub", "Storage pricing terms");
assertIncludes(glossaryIndexText, "glossary hub", "Usage pricing terms");
assertIncludes(glossaryIndexText, "glossary hub", "Compute pricing terms");
assertIncludes(glossaryIndexText, "glossary hub", '"api-call"');
assertIncludes(glossaryIndexText, "glossary hub", '"usage-based-pricing"');
assertIncludes(glossaryIndexText, "glossary hub", '"rate-limit"');
assertIncludes(glossaryIndexText, "glossary hub", '"minimum-commitment"');
assertIncludes(glossaryIndexText, "glossary hub", '"overage"');
assertIncludes(glossaryIndexText, "glossary hub", '"unit-cost"');
assertIncludes(glossaryIndexText, "glossary hub", '"gb-month"');
assertExcludes(glossaryIndexText, "glossary hub", "Key terms to learn first");
assertExcludes(glossaryIndexText, "glossary hub", "Pricing mechanics");
assertExcludes(glossaryIndexText, "glossary hub", "Unit economics and retention");
assertExcludes(glossaryIndexText, "glossary hub", "{terms.map((t) => (");
assertExcludes(glossaryIndexText, "glossary hub", '"storage-costs"');
assertExcludes(glossaryIndexText, "glossary hub", '"cogs"');
assertExcludes(glossaryIndexText, "glossary hub", '"support-costs"');
assertExcludes(glossaryIndexText, "glossary hub", '"usage-forecast"');

assertIncludes(toolkitIndexText, "toolkit hub", "Four core calculator workflows");
assertIncludes(toolkitIndexText, "toolkit hub", "These four paths carry most of the retained pricing decision support on the site.");
assertIncludes(toolkitIndexText, "toolkit hub", "Usage-based pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "API pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "Storage pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "Compute pricing");
assertIncludes(toolkitIndexText, "toolkit hub", "Secondary pricing checks");
assertIncludes(toolkitIndexText, "toolkit hub", "/guides/api-cost-estimation/");
assertIncludes(toolkitIndexText, "toolkit hub", "/guides/usage-based-pricing-examples/");
assertIncludes(toolkitIndexText, "toolkit hub", "/guides/value-metric-selection/");
assertIncludes(toolkitIndexText, "toolkit hub", "/guides/storage-costs-and-pricing/");
assertIncludes(toolkitIndexText, "toolkit hub", "/guides/saas-gross-margin-targets/");
assertIncludes(toolkitIndexText, "toolkit hub", "/glossary/gb-month/");
assertIncludes(toolkitIndexText, "toolkit hub", "/glossary/minimum-commitment/");
assertIncludes(toolkitIndexText, "toolkit hub", "/glossary/overage/");
assertIncludes(toolkitIndexText, "toolkit hub", "/saas-pricing/annual-discount-calculator/");
assertExcludes(toolkitIndexText, "toolkit hub", "Five core calculator workflows");
assertExcludes(toolkitIndexText, "toolkit hub", "Annual pricing and discounts");
assertExcludes(toolkitIndexText, "toolkit hub", "Tier-1 intent keywords");
assertExcludes(toolkitIndexText, "toolkit hub", "Pricing page refresh");
assertExcludes(toolkitIndexText, "toolkit hub", "Retention and expansion");
assertExcludes(toolkitIndexText, "toolkit hub", "/guides/pricing-page-competitive-positioning/");
assertExcludes(toolkitIndexText, "toolkit hub", "/guides/expansion-forecasting/");
assertExcludes(toolkitIndexText, "toolkit hub", "/guides/monthly-cloud-cost-breakdown/");
assertExcludes(toolkitIndexText, "toolkit hub", "/guides/usage-cap-communication/");
assertExcludes(toolkitIndexText, "toolkit hub", "/saas-pricing/pricing-increase-impact-calculator/");

console.log("hub-curation.test.mjs: OK");
