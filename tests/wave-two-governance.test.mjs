import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const governancePath = join(__dirname, "..", "src", "lib", "content-governance.ts");
const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const guidesDir = join(__dirname, "..", "src", "content", "guides");

const governanceModule = await import(pathToFileURL(governancePath).href);
const toolsText = readFileSync(toolsPath, "utf-8");

const waveTwoGuideNoindex = [
  "pricing-page-cta-optimization",
  "pricing-page-faqs",
  "pricing-page-unit-definition",
  "price-change-communication",
  "contract-minimums-messaging",
  "usage-reporting-dashboard",
  "usage-estimation-guide",
  "trial-usage-limit-design",
  "tier-naming-strategy",
  "plan-differentiation-matrix",
];

const waveTwoGlossaryNoindex = [
  "request",
  "renewal",
  "run-rate",
  "tcv",
  "pricing-page",
  "upsell",
];

const retainedGuides = [
  "value-metric-selection",
  "minimum-commitment-model",
  "saas-gross-margin-targets",
  "price-per-gb-month-explained",
  "pricing-page-trust-elements",
];

const retainedGlossary = [
  "rate-limit",
  "annual-prepay-discount",
  "usage-based-pricing",
  "churn",
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const usageBasedStart = toolsText.indexOf('slug: "usage-based-pricing-calculator"');
assert(usageBasedStart !== -1, "wave two governance: missing usage-based-pricing-calculator block");

const usageBasedBlock = toolsText.slice(usageBasedStart, usageBasedStart + 9000);
assert(!usageBasedBlock.includes("Delta CSV Template"), "wave two governance: usage-based-pricing-calculator still includes Delta CSV Template");

for (const slug of waveTwoGuideNoindex) {
  assert(governanceModule.getGuideRobots(slug) === "noindex,follow", `wave two governance: guide should be noindex,follow: ${slug}`);
}

for (const slug of waveTwoGlossaryNoindex) {
  assert(governanceModule.getGlossaryRobots(slug) === "noindex,follow", `wave two governance: glossary should be noindex,follow: ${slug}`);
}

for (const slug of retainedGuides) {
  assert(governanceModule.getGuideRobots(slug) === "index,follow", `wave two governance: retained guide should stay indexable: ${slug}`);

  const guidePath = join(guidesDir, `${slug}.md`);
  const guideText = readFileSync(guidePath, "utf-8");

  for (const expected of [
    'reviewedBy: "PricingNest Editorial Team"',
    'reviewed: "2026-03-31"',
    "sources:",
    'kind: "internal-input"',
    'kind: "supporting-page"',
    "label:",
    "note:",
    'href: "/',
  ]) {
    assert(guideText.includes(expected), `wave two governance: ${slug} missing ${expected}`);
  }
}

for (const slug of retainedGlossary) {
  assert(governanceModule.getGlossaryRobots(slug) === "index,follow", `wave two governance: retained glossary should stay indexable: ${slug}`);
}

console.log("wave-two-governance.test.mjs: OK");
