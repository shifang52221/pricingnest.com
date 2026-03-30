import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const governancePath = join(__dirname, "..", "src", "lib", "content-governance.ts");
const sitemapPath = join(__dirname, "..", "dist", "sitemap-0.xml");

const governanceModule = await import(pathToFileURL(governancePath).href);
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

for (const url of [...guideNoindexUrls, ...glossaryNoindexUrls, ...staticNoindexUrls]) {
  assert(!sitemapText.includes(`<loc>${url}</loc>`), `sitemap governance: noindex URL should be excluded from sitemap: ${url}`);
}

assert(sitemapText.includes("<loc>https://pricingnest.com/saas-pricing/storage-cost-calculator/</loc>"), "sitemap governance: core calculator should remain in sitemap");
assert(sitemapText.includes("<loc>https://pricingnest.com/saas-pricing/use-cases/</loc>"), "sitemap governance: use-cases hub should remain in sitemap");

console.log("sitemap-governance.test.mjs: OK");
