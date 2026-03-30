import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const governanceDataPath = join(__dirname, "..", "src", "lib", "content-governance-data.mjs");
const guidesDir = join(__dirname, "..", "src", "content", "guides");
const glossaryDir = join(__dirname, "..", "src", "content", "glossary");

const governanceModule = await import(pathToFileURL(governanceDataPath).href);

const guideFiles = readdirSync(guidesDir).filter((file) => file.endsWith(".md"));
const glossaryFiles = readdirSync(glossaryDir).filter((file) => file.endsWith(".md"));

const indexedGuideCount = guideFiles.filter((file) => governanceModule.GUIDE_GOVERNANCE[file.replace(/\.md$/, "")] !== "noindex,follow").length;
const indexedGlossaryCount = glossaryFiles.filter((file) => governanceModule.GLOSSARY_GOVERNANCE[file.replace(/\.md$/, "")] !== "noindex,follow").length;

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

assert(indexedGuideCount <= 90, `wave 1 recovery: expected <= 90 indexed guides, got ${indexedGuideCount}`);
assert(indexedGlossaryCount <= 70, `wave 1 recovery: expected <= 70 indexed glossary entries, got ${indexedGlossaryCount}`);

const expectedGuideNoindex = [
  "pricing-page-case-studies",
  "usage-alerts-design",
  "pricing-page-competitive-positioning",
  "feature-bundling-framework",
  "revenue-leakage-audit",
  "expansion-forecasting",
  "support-cost-allocation",
  "annual-renewal-strategy",
  "onboarding-milestone-pricing",
  "pricing-page-copy",
  "billing-dunning-strategy",
  "pricing-rollout-playbook"
];

const expectedGlossaryNoindex = [
  "tiers",
  "unit-economics",
  "throttling",
  "platform-fee",
  "usage-cap",
  "fixed-cost",
  "payback-period",
  "per-seat",
  "net-new-mrr",
  "discount",
  "annual-plan",
  "bookings",
  "contract-value"
];

for (const slug of expectedGuideNoindex) {
  assert(
    governanceModule.GUIDE_GOVERNANCE[slug] === "noindex,follow",
    `wave 1 recovery: expected guide ${slug} to be noindex,follow`
  );
}

for (const slug of expectedGlossaryNoindex) {
  assert(
    governanceModule.GLOSSARY_GOVERNANCE[slug] === "noindex,follow",
    `wave 1 recovery: expected glossary ${slug} to be noindex,follow`
  );
}

console.log("recovery-retention-thresholds.test.mjs: OK");
