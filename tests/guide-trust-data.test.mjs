import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configPath = join(__dirname, "..", "src", "content", "config.ts");
const guidePagePath = join(__dirname, "..", "src", "pages", "guides", "[slug].astro");

const configText = readFileSync(configPath, "utf-8");
const guidePageText = readFileSync(guidePagePath, "utf-8");

const coreGuideSlugs = [
  "annual-prepay-discount",
  "api-cost-estimation",
  "compute-cost-modeling",
  "storage-costs-and-pricing",
  "usage-based-pricing-examples",
  "pricing-page-trust-elements",
  "api-pricing-model",
  "bandwidth-pricing-guide",
  "bandwidth-pricing-guardrails",
  "cdn-cost-pass-through",
];

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

for (const expected of [
  "const guideSourceKindSchema = z.enum([",
  '"internal-input"',
  '"supporting-page"',
  '"external-reference"',
  "const guideSourceSchema = z.object({",
  "label: z.string()",
  "kind: guideSourceKindSchema",
  "href: z.string().optional()",
  "note: z.string().optional()",
  "sources: z.array(guideSourceSchema).optional()",
]) {
  assertIncludes(configText, "content config", expected);
}

for (const expected of [
  "type GuideSource = NonNullable<typeof entry.data.sources>[number];",
  "const guideSources = entry.data.sources ?? [];",
  "function formatGuideSourceKind(",
  "Sources and references",
  "guideSources.length > 0",
  'class="source-list"',
  'class="source-item"',
  "source.kind",
  "source.note",
]) {
  assertIncludes(guidePageText, "guide page", expected);
}

for (const slug of coreGuideSlugs) {
  const filePath = join(__dirname, "..", "src", "content", "guides", `${slug}.md`);
  const text = readFileSync(filePath, "utf-8");

  for (const expected of [
    "sources:",
    'kind: "internal-input"',
    'kind: "supporting-page"',
    "label:",
    "note:",
    'href: "/',
  ]) {
    if (!text.includes(expected)) {
      throw new Error(`${slug}: missing ${expected}`);
    }
  }
}

console.log("guide-trust-data.test.mjs: OK");
