import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const useCasesIndexPath = join(__dirname, "..", "src", "pages", "saas-pricing", "use-cases", "index.astro");
const childPagePaths = [
  join(__dirname, "..", "src", "pages", "saas-pricing", "use-cases", "usage-based-pricing.astro"),
  join(__dirname, "..", "src", "pages", "saas-pricing", "use-cases", "api-pricing.astro"),
  join(__dirname, "..", "src", "pages", "saas-pricing", "use-cases", "infra-cost-recovery.astro"),
  join(__dirname, "..", "src", "pages", "saas-pricing", "use-cases", "unit-economics.astro"),
  join(__dirname, "..", "src", "pages", "saas-pricing", "use-cases", "pricing-experiments.astro")
];

const useCasesIndexText = readFileSync(useCasesIndexPath, "utf-8");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

assert(!useCasesIndexText.includes("import AdSlot"), "use-cases hub: should not import AdSlot");
assert(!useCasesIndexText.includes("<AdSlot"), "use-cases hub: should not render AdSlot");

for (const pagePath of childPagePaths) {
  const text = readFileSync(pagePath, "utf-8");
  const shortName = pagePath.split("\\").at(-1) ?? pagePath;

  assert(!text.includes("import AdSlot"), `${shortName}: should not import AdSlot`);
  assert(!text.includes("<AdSlot"), `${shortName}: should not render AdSlot`);
  assert(text.includes("getStaticPageRobots"), `${shortName}: should use getStaticPageRobots`);
  assert(text.includes("robots={robots}"), `${shortName}: should pass robots to BaseLayout`);
}

console.log("use-case-governance.test.mjs: OK");
