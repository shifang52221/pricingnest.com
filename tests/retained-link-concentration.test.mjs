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
const valueMetricSelectionGuidePath = join(__dirname, "..", "src", "content", "guides", "value-metric-selection.md");
const saasGrossMarginTargetsGuidePath = join(__dirname, "..", "src", "content", "guides", "saas-gross-margin-targets.md");
const apiPricingModelGuidePath = join(__dirname, "..", "src", "content", "guides", "api-pricing-model.md");
const bandwidthPricingGuidePath = join(__dirname, "..", "src", "content", "guides", "bandwidth-pricing-guide.md");
const bandwidthPricingGuardrailsGuidePath = join(__dirname, "..", "src", "content", "guides", "bandwidth-pricing-guardrails.md");
const cdnCostPassThroughGuidePath = join(__dirname, "..", "src", "content", "guides", "cdn-cost-pass-through.md");
const apiCallGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "api-call.md");
const annualPrepayDiscountGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "annual-prepay-discount.md");
const rateLimitGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "rate-limit.md");
const billingCycleGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "billing-cycle.md");
const usageBasedPricingGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "usage-based-pricing.md");
const churnGlossaryPath = join(__dirname, "..", "src", "content", "glossary", "churn.md");

const guidesPageText = readFileSync(guidesPagePath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");
const homepageText = readFileSync(homepagePath, "utf-8");
const baseLayoutText = readFileSync(baseLayoutPath, "utf-8");
const minimumCommitmentGuideText = readFileSync(minimumCommitmentGuidePath, "utf-8");
const pricingPageTrustGuideText = readFileSync(pricingPageTrustGuidePath, "utf-8");
const pricePerGbMonthGuideText = readFileSync(pricePerGbMonthGuidePath, "utf-8");
const valueMetricSelectionGuideText = readFileSync(valueMetricSelectionGuidePath, "utf-8");
const saasGrossMarginTargetsGuideText = readFileSync(saasGrossMarginTargetsGuidePath, "utf-8");
const apiPricingModelGuideText = readFileSync(apiPricingModelGuidePath, "utf-8");
const bandwidthPricingGuideText = readFileSync(bandwidthPricingGuidePath, "utf-8");
const bandwidthPricingGuardrailsGuideText = readFileSync(bandwidthPricingGuardrailsGuidePath, "utf-8");
const cdnCostPassThroughGuideText = readFileSync(cdnCostPassThroughGuidePath, "utf-8");
const apiCallGlossaryText = readFileSync(apiCallGlossaryPath, "utf-8");
const annualPrepayDiscountGlossaryText = readFileSync(annualPrepayDiscountGlossaryPath, "utf-8");
const rateLimitGlossaryText = readFileSync(rateLimitGlossaryPath, "utf-8");
const billingCycleGlossaryText = readFileSync(billingCycleGlossaryPath, "utf-8");
const usageBasedPricingGlossaryText = readFileSync(usageBasedPricingGlossaryPath, "utf-8");
const churnGlossaryText = readFileSync(churnGlossaryPath, "utf-8");

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

assertIncludes(valueMetricSelectionGuideText, "value metric selection guide", "/glossary/value-metric/");
assertIncludes(valueMetricSelectionGuideText, "value metric selection guide", "/glossary/pricing-metric/");
assertExcludes(valueMetricSelectionGuideText, "value metric selection guide", "/glossary/arpa/");

assertIncludes(saasGrossMarginTargetsGuideText, "saas gross margin targets guide", "/glossary/gross-margin/");
assertExcludes(saasGrossMarginTargetsGuideText, "saas gross margin targets guide", "/glossary/cogs/");
assertExcludes(saasGrossMarginTargetsGuideText, "saas gross margin targets guide", "/glossary/unit-economics/");

assertIncludes(apiPricingModelGuideText, "api pricing model guide", "/glossary/api-call/");
assertIncludes(apiPricingModelGuideText, "api pricing model guide", "/glossary/rate-limit/");
assertExcludes(apiPricingModelGuideText, "api pricing model guide", "/glossary/cogs/");

assertIncludes(bandwidthPricingGuideText, "bandwidth pricing guide", "/guides/bandwidth-pricing-guardrails/");
assertIncludes(bandwidthPricingGuideText, "bandwidth pricing guide", "/guides/cdn-cost-pass-through/");
assertIncludes(bandwidthPricingGuideText, "bandwidth pricing guide", "/glossary/egress/");
assertExcludes(bandwidthPricingGuideText, "bandwidth pricing guide", "/glossary/cogs/");

assertIncludes(bandwidthPricingGuardrailsGuideText, "bandwidth pricing guardrails guide", "/guides/bandwidth-pricing-guide/");
assertIncludes(bandwidthPricingGuardrailsGuideText, "bandwidth pricing guardrails guide", "/guides/cdn-cost-pass-through/");
assertIncludes(bandwidthPricingGuardrailsGuideText, "bandwidth pricing guardrails guide", "/saas-pricing/bandwidth-cost-calculator/");
assertExcludes(bandwidthPricingGuardrailsGuideText, "bandwidth pricing guardrails guide", "/glossary/cogs/");

assertIncludes(cdnCostPassThroughGuideText, "cdn cost pass-through guide", "/guides/bandwidth-pricing-guide/");
assertIncludes(cdnCostPassThroughGuideText, "cdn cost pass-through guide", "/guides/bandwidth-pricing-guardrails/");
assertIncludes(cdnCostPassThroughGuideText, "cdn cost pass-through guide", "/saas-pricing/bandwidth-cost-calculator/");
assertIncludes(cdnCostPassThroughGuideText, "cdn cost pass-through guide", "/glossary/origin-fetch/");
assertExcludes(cdnCostPassThroughGuideText, "cdn cost pass-through guide", "/glossary/cogs/");

assertIncludes(apiCallGlossaryText, "api call glossary", "/guides/api-pricing-model/");
assertIncludes(apiCallGlossaryText, "api call glossary", "/saas-pricing/api-pricing-calculator/");
assertExcludes(apiCallGlossaryText, "api call glossary", "/guides/api-free-tier-guardrails/");
assertExcludes(apiCallGlossaryText, "api call glossary", "/guides/request-pricing-model/");

assertIncludes(annualPrepayDiscountGlossaryText, "annual prepay discount glossary", "/guides/annual-prepay-discount/");
assertIncludes(annualPrepayDiscountGlossaryText, "annual prepay discount glossary", "/saas-pricing/annual-discount-calculator/");
assertExcludes(annualPrepayDiscountGlossaryText, "annual prepay discount glossary", "/glossary/annual-plan/");

assertIncludes(usageBasedPricingGlossaryText, "usage based pricing glossary", "/guides/value-metric-selection/");
assertIncludes(usageBasedPricingGlossaryText, "usage based pricing glossary", "/saas-pricing/usage-based-pricing-calculator/");
assertExcludes(usageBasedPricingGlossaryText, "usage based pricing glossary", "/guides/usage-mix-modeling/");

assertIncludes(churnGlossaryText, "churn glossary", "/guides/annual-prepay-discount/");
assertIncludes(churnGlossaryText, "churn glossary", "/saas-pricing/pricing-increase-impact-calculator/");
assertExcludes(churnGlossaryText, "churn glossary", "/guides/churn-survey-insights/");
assertExcludes(churnGlossaryText, "churn glossary", "/guides/annual-renewal-strategy/");

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
