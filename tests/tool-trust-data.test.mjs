import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");

const toolsText = readFileSync(toolsPath, "utf-8");
const toolPageText = readFileSync(toolPagePath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

const coreSlugs = [
  "storage-cost-calculator",
  "compute-cost-estimator",
  "api-pricing-calculator",
  "usage-based-pricing-calculator",
  "annual-discount-calculator",
];

for (const field of [
  'export type ToolSourceKind = "internal-input" | "supporting-page" | "external-reference";',
  "export type ToolSource = {",
  "label: string;",
  "kind: ToolSourceKind;",
  "href?: string;",
  "note?: string;",
  "reviewedBy?: string;",
  "reviewed?: string;",
  "sources?: ToolSource[];",
]) {
  assertIncludes(toolsText, "tools type", field);
}

for (const slug of coreSlugs) {
  const start = toolsText.indexOf(`slug: "${slug}"`);
  if (start === -1) throw new Error(`tools data: missing block for ${slug}`);
  const block = toolsText.slice(start, start + 9000);
  for (const expected of [
    'reviewedBy: "PricingNest Editorial Team"',
    'reviewed: "2026-03-30"',
    "sources: [",
    'kind: "internal-input"',
    'kind: "supporting-page"',
    "label:",
    "note:",
  ]) {
    if (!block.includes(expected)) {
      throw new Error(`${slug}: missing ${expected}`);
    }
  }

  const linkedSupportPages = block.match(/href:\s*"\/(guides|glossary)\//g) ?? [];
  if (linkedSupportPages.length < 1) {
    throw new Error(`${slug}: expected at least 1 linked supporting page in sources`);
  }
}

for (const expected of [
  "const toolReviewedBy = tool.reviewedBy ??",
  "const toolReviewed = tool.reviewed ??",
  "const toolSources = tool.sources ?? [];",
  "function formatToolSourceKind(",
  "Sources and references",
  "toolSources.length > 0",
  'class="source-list"',
  'class="source-item"',
  "source.kind",
  "source.note",
]) {
  assertIncludes(toolPageText, "tool page", expected);
}

console.log("tool-trust-data.test.mjs: OK");
