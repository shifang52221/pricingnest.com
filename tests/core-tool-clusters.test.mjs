import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");

const toolsModule = await import(pathToFileURL(toolsPath).href);
const toolPageText = readFileSync(toolPagePath, "utf-8");

const expectations = {
  "storage-cost-calculator": {
    guide: "/guides/price-per-gb-month-explained/",
    support: ["/guides/storage-costs-and-pricing/", "/glossary/gb-month/", "/glossary/storage-costs/"],
  },
  "compute-cost-estimator": {
    guide: "/guides/saas-gross-margin-targets/",
    support: ["/guides/compute-cost-modeling/", "/glossary/cogs/", "/glossary/unit-cost/"],
  },
  "api-pricing-calculator": {
    guide: "/guides/value-metric-selection/",
    support: ["/guides/api-pricing-model/", "/glossary/api-call/", "/glossary/rate-limit/"],
  },
  "usage-based-pricing-calculator": {
    guide: "/guides/value-metric-selection/",
    support: ["/guides/usage-based-pricing-examples/", "/glossary/value-metric/", "/glossary/usage-based-pricing/"],
  },
  "annual-discount-calculator": {
    guide: "/guides/minimum-commitment-model/",
    support: ["/guides/annual-prepay-discount/", "/glossary/annual-prepay-discount/", "/glossary/churn/"],
  },
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(typeof toolsModule.getCoreToolClusterLinks === "function", "core tool clusters: missing getCoreToolClusterLinks export");

for (const [slug, expected] of Object.entries(expectations)) {
  const links = toolsModule.getCoreToolClusterLinks(slug);
  assert(Array.isArray(links), `core tool clusters: ${slug} should return an array`);
  assert(links.length >= 4, `core tool clusters: ${slug} should have at least 4 curated links, got ${links.length}`);
  assert(links.length <= 6, `core tool clusters: ${slug} should stay focused with at most 6 curated links, got ${links.length}`);

  const hrefs = links.map((link) => link.href);
  const guideCount = hrefs.filter((href) => href.startsWith("/guides/")).length;
  const supportCount = hrefs.filter((href) => href.startsWith("/guides/") || href.startsWith("/glossary/")).length;
  const uniqueCount = new Set(hrefs).size;

  assert(guideCount >= 1, `core tool clusters: ${slug} should include at least one guide`);
  assert(supportCount >= 3, `core tool clusters: ${slug} should include at least three support links`);
  assert(uniqueCount === hrefs.length, `core tool clusters: ${slug} should not contain duplicate links`);
  assert(hrefs.includes(expected.guide), `core tool clusters: ${slug} should include primary guide ${expected.guide}`);

  for (const href of expected.support) {
    assert(hrefs.includes(href), `core tool clusters: ${slug} should include support link ${href}`);
  }
}

assert(toolPageText.includes("getCoreToolClusterLinks"), "tool page: should use getCoreToolClusterLinks");
assert(toolPageText.includes("const coreToolClusterLinks ="), "tool page: should define coreToolClusterLinks");

console.log("core-tool-clusters.test.mjs: OK");
