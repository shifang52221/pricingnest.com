import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const governancePath = join(__dirname, "..", "src", "lib", "content-governance.ts");
const guidesPagePath = join(__dirname, "..", "src", "pages", "guides", "[slug].astro");
const glossaryPagePath = join(__dirname, "..", "src", "pages", "glossary", "[slug].astro");

const governanceModule = await import(pathToFileURL(governancePath).href);
const guidesPageText = readFileSync(guidesPagePath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

assert(typeof governanceModule.GUIDE_GOVERNANCE === "object", "content governance: missing GUIDE_GOVERNANCE export");
assert(typeof governanceModule.GLOSSARY_GOVERNANCE === "object", "content governance: missing GLOSSARY_GOVERNANCE export");
assert(typeof governanceModule.STATIC_PAGE_GOVERNANCE === "object", "content governance: missing STATIC_PAGE_GOVERNANCE export");
assert(typeof governanceModule.getGuideRobots === "function", "content governance: missing getGuideRobots export");
assert(typeof governanceModule.getGlossaryRobots === "function", "content governance: missing getGlossaryRobots export");
assert(typeof governanceModule.getStaticPageRobots === "function", "content governance: missing getStaticPageRobots export");

assert(governanceModule.getGuideRobots("missing-guide") === "index,follow", "content governance: guide default should be index,follow");
assert(governanceModule.getGlossaryRobots("missing-term") === "index,follow", "content governance: glossary default should be index,follow");
assert(
  governanceModule.getStaticPageRobots("/missing/") === "index,follow",
  "content governance: static page default should be index,follow"
);

const guideNoindexCandidates = [
  "fair-use-policy-design",
  "mrr-expansion-tracking",
  "overage-communication",
  "rate-card-quoting",
  "retention-campaign-calendar",
  "revenue-recognition-basics",
  "sales-discount-approval",
  "activation-pricing-triggers",
  "add-on-attach-rate-optimization",
  "api-free-tier-guardrails",
  "api-rate-limit-pricing",
  "pricing-migration-plan",
  "pricing-page-comparison-table",
  "pricing-page-layout-checklist",
  "pricing-segmentation",
  "rfp-pricing-response",
  "seat-utilization-forecast",
  "usage-mix-modeling",
  "pricing-tier-mistakes",
  "api-overage-automation",
  "arpa-growth-levers",
  "churn-reduction-playbook",
  "churn-risk-scoring",
  "monthly-cloud-cost-variance",
  "net-new-mrr-bridge",
  "price-lock-policy",
  "retention-early-warning-signals",
  "saas-metrics-cheat-sheet",
  "unit-economics-model-template",
  "usage-cap-communication",
  "usage-pricing-onboarding",
  "usage-tier-breakpoints"
];

const glossaryNoindexCandidates = [
  "effective-monthly-rate",
  "grace-period",
  "origin-fetch",
  "ramp",
  "retrieval-fees",
  "tiers",
  "unit-economics",
  "platform-fee",
  "discount",
  "a-b-test",
  "activation",
  "acv",
  "arrr",
  "backup",
  "burst-traffic",
  "cohort",
  "replication",
  "usage-forecast",
  "p50",
  "p90"
];

const staticNoindexCandidates = [
  "/saas-pricing/use-cases/usage-based-pricing/",
  "/saas-pricing/use-cases/api-pricing/",
  "/saas-pricing/use-cases/infra-cost-recovery/",
  "/saas-pricing/use-cases/unit-economics/",
  "/saas-pricing/use-cases/pricing-experiments/"
];

for (const slug of guideNoindexCandidates) {
  assert(governanceModule.getGuideRobots(slug) === "noindex,follow", `content governance: ${slug} should be noindex,follow`);
}

for (const slug of glossaryNoindexCandidates) {
  assert(governanceModule.getGlossaryRobots(slug) === "noindex,follow", `content governance: ${slug} should be noindex,follow`);
}

for (const pathname of staticNoindexCandidates) {
  assert(
    governanceModule.getStaticPageRobots(pathname) === "noindex,follow",
    `content governance: ${pathname} should be noindex,follow`
  );
}

assert(guidesPageText.includes("getGuideRobots"), "guides page: missing getGuideRobots import");
assert(guidesPageText.includes("const robots = getGuideRobots(entry.slug);"), "guides page: missing guide robots lookup");
assert(/<BaseLayout[\s\S]*robots=\{robots\}/.test(guidesPageText), "guides page: BaseLayout missing robots prop");

assert(glossaryPageText.includes("getGlossaryRobots"), "glossary page: missing getGlossaryRobots import");
assert(glossaryPageText.includes("const robots = getGlossaryRobots(entry.slug);"), "glossary page: missing glossary robots lookup");
assert(/<BaseLayout[\s\S]*robots=\{robots\}/.test(glossaryPageText), "glossary page: BaseLayout missing robots prop");

console.log("content-governance.test.mjs: OK");
