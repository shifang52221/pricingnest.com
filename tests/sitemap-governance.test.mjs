import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { importTypeScriptModule } from "./helpers/import-typescript-module.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const governancePath = join(__dirname, "..", "src", "lib", "content-governance.ts");
const sitemapPath = join(__dirname, "..", "dist", "sitemap-0.xml");

const governanceModule = await importTypeScriptModule(governancePath);
const sitemapText = readFileSync(sitemapPath, "utf-8");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const guideNoindexUrls = Object.entries(governanceModule.GUIDE_GOVERNANCE)
  .filter(([, robots]) => robots === "noindex,follow")
  .map(([slug]) => `https://pricingnest.com/guides/${slug}/`);

const glossaryNoindexUrls = Object.entries(governanceModule.GLOSSARY_GOVERNANCE)
  .filter(([, robots]) => robots === "noindex,follow")
  .map(([slug]) => `https://pricingnest.com/glossary/${slug}/`);

const staticNoindexUrls = Object.entries(governanceModule.STATIC_PAGE_GOVERNANCE)
  .filter(([, robots]) => robots === "noindex,follow")
  .map(([pathname]) => `https://pricingnest.com${pathname}`);

const nextWaveGuideNoindexUrls = [
  "https://pricingnest.com/guides/api-overage-automation/",
  "https://pricingnest.com/guides/arpa-growth-levers/",
  "https://pricingnest.com/guides/churn-reduction-playbook/",
  "https://pricingnest.com/guides/churn-risk-scoring/",
  "https://pricingnest.com/guides/monthly-cloud-cost-variance/",
  "https://pricingnest.com/guides/net-new-mrr-bridge/",
  "https://pricingnest.com/guides/price-lock-policy/",
  "https://pricingnest.com/guides/retention-early-warning-signals/",
  "https://pricingnest.com/guides/saas-metrics-cheat-sheet/",
  "https://pricingnest.com/guides/unit-economics-model-template/",
  "https://pricingnest.com/guides/usage-cap-communication/",
  "https://pricingnest.com/guides/usage-pricing-onboarding/",
  "https://pricingnest.com/guides/usage-tier-breakpoints/"
];

const nextWaveGlossaryNoindexUrls = [
  "https://pricingnest.com/glossary/a-b-test/",
  "https://pricingnest.com/glossary/activation/",
  "https://pricingnest.com/glossary/acv/",
  "https://pricingnest.com/glossary/arrr/",
  "https://pricingnest.com/glossary/backup/",
  "https://pricingnest.com/glossary/burst-traffic/",
  "https://pricingnest.com/glossary/cohort/",
  "https://pricingnest.com/glossary/replication/",
  "https://pricingnest.com/glossary/usage-forecast/",
  "https://pricingnest.com/glossary/p50/",
  "https://pricingnest.com/glossary/p90/"
];

for (const url of [
  ...guideNoindexUrls,
  ...glossaryNoindexUrls,
  ...staticNoindexUrls,
  ...nextWaveGuideNoindexUrls,
  ...nextWaveGlossaryNoindexUrls
]) {
  assert(!sitemapText.includes(`<loc>${url}</loc>`), `sitemap governance: noindex URL should be excluded from sitemap: ${url}`);
}

assert(sitemapText.includes("<loc>https://pricingnest.com/saas-pricing/storage-cost-calculator/</loc>"), "sitemap governance: core calculator should remain in sitemap");
assert(sitemapText.includes("<loc>https://pricingnest.com/saas-pricing/use-cases/</loc>"), "sitemap governance: use-cases hub should remain in sitemap");

console.log("sitemap-governance.test.mjs: OK");
