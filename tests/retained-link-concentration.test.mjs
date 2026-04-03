import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const guidesPagePath = join(__dirname, "..", "src", "pages", "guides", "[slug].astro");
const glossaryPagePath = join(__dirname, "..", "src", "pages", "glossary", "[slug].astro");
const homepagePath = join(__dirname, "..", "src", "pages", "index.astro");
const baseLayoutPath = join(__dirname, "..", "src", "layouts", "BaseLayout.astro");
const minimumCommitmentGuidePath = join(__dirname, "..", "src", "content", "guides", "minimum-commitment-model.md");
const pricingPageTrustGuidePath = join(__dirname, "..", "src", "content", "guides", "pricing-page-trust-elements.md");
const pricePerGbMonthGuidePath = join(__dirname, "..", "src", "content", "guides", "price-per-gb-month-explained.md");
const rateLimitGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "rate-limit.md");
const billingCycleGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "billing-cycle.md");

const guidesPageText = readFileSync(guidesPagePath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");
const homepageText = readFileSync(homepagePath, "utf-8");
const baseLayoutText = readFileSync(baseLayoutPath, "utf-8");
const minimumCommitmentGuideText = readFileSync(minimumCommitmentGuidePath, "utf-8");
const pricingPageTrustGuideText = readFileSync(pricingPageTrustGuidePath, "utf-8");
const pricePerGbMonthGuideText = readFileSync(pricePerGbMonthGuidePath, "utf-8");
const rateLimitGlossaryText = readFileSync(rateLimitGlossaryPath, "utf-8");
const billingCycleGlossaryText = readFileSync(billingCycleGlossaryPath, "utf-8");

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

assertIncludes(guidesPageText, "guides detail page", "getGlossaryRobots");
assertIncludes(guidesPageText, "guides detail page", 'getGlossaryRobots(termSlug) === "index,follow"');

assertIncludes(glossaryPageText, "glossary detail page", "getGuideRobots");
assertIncludes(glossaryPageText, "glossary detail page", 'getGuideRobots(guideSlug) === "index,follow"');
assertIncludes(glossaryPageText, "glossary detail page", 'getGlossaryRobots(termSlug) === "index,follow"');

for (const expected of [
  "/guides/value-metric-selection/",
  "/guides/pricing-page-trust-elements/",
  "/guides/saas-gross-margin-targets/",
  "/saas-pricing/annual-discount-calculator/",
  "/glossary/usage-based-pricing/",
]) {
  assertIncludes(homepageText, "homepage", expected);
}

for (const unexpected of [
  "/guides/pricing-page-layout-checklist/",
  "/guides/usage-cap-communication/",
  "/guides/monthly-cloud-cost-breakdown/",
  "/saas-pricing/pricing-increase-impact-calculator/",
]) {
  assertExcludes(homepageText, "homepage", unexpected);
}

assertExcludes(minimumCommitmentGuideText, "minimum commitment guide", "/glossary/tcv/");
assertIncludes(minimumCommitmentGuideText, "minimum commitment guide", "/glossary/billing-cycle/");
assertExcludes(minimumCommitmentGuideText, "minimum commitment guide", "/glossary/contract-value/");

assertIncludes(pricePerGbMonthGuideText, "price per gb-month guide", "/glossary/gb-month/");
assertExcludes(pricePerGbMonthGuideText, "price per gb-month guide", "/glossary/storage-costs/");
assertExcludes(pricePerGbMonthGuideText, "price per gb-month guide", "/glossary/cogs/");

assertIncludes(rateLimitGlossaryText, "rate limit glossary", "/guides/api-pricing-model/");
assertExcludes(rateLimitGlossaryText, "rate limit glossary", "/guides/api-rate-limit-pricing/");

assertIncludes(billingCycleGlossaryText, "billing cycle glossary", "/guides/minimum-commitment-model/");
assertIncludes(billingCycleGlossaryText, "billing cycle glossary", "/saas-pricing/annual-discount-calculator/");
assertExcludes(billingCycleGlossaryText, "billing cycle glossary", "/guides/annual-renewal-strategy/");
assertExcludes(billingCycleGlossaryText, "billing cycle glossary", "/glossary/annual-plan/");

assertExcludes(pricingPageTrustGuideText, "pricing page trust guide", "/glossary/pricing-page/");
assertIncludes(pricingPageTrustGuideText, "pricing page trust guide", "/glossary/annual-prepay-discount/");

assertIncludes(baseLayoutText, "base layout", "/saas-pricing/use-cases/");
for (const unexpected of [
  "/saas-pricing/use-cases/usage-based-pricing/",
  "/saas-pricing/use-cases/api-pricing/",
  "/saas-pricing/use-cases/infra-cost-recovery/",
  "/saas-pricing/use-cases/unit-economics/",
]) {
  assertExcludes(baseLayoutText, "base layout", unexpected);
}

console.log("retained-link-concentration.test.mjs: OK");
