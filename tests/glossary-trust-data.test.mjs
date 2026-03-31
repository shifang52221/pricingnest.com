import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configPath = join(__dirname, "..", "src", "content", "config.ts");
const glossaryPagePath = join(__dirname, "..", "src", "pages", "glossary", "[slug].astro");

const configText = readFileSync(configPath, "utf-8");
const glossaryPageText = readFileSync(glossaryPagePath, "utf-8");

const retainedGlossarySlugs = [
  "value-metric",
  "pricing-metric",
  "unit-cost",
  "gross-margin",
  "included-usage",
  "overage",
  "minimum-commitment",
  "gb-month",
  "rate-limit",
  "annual-prepay-discount",
  "usage-based-pricing",
  "churn",
];

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

for (const expected of [
  "const glossarySourceKindSchema = z.enum([",
  '"internal-input"',
  '"supporting-page"',
  '"external-reference"',
  "const glossarySourceSchema = z.object({",
  "label: z.string()",
  "kind: glossarySourceKindSchema",
  "href: z.string().optional()",
  "note: z.string().optional()",
  "sources: z.array(glossarySourceSchema).optional()",
]) {
  assertIncludes(configText, "content config", expected);
}

for (const expected of [
  "type GlossarySource = NonNullable<typeof entry.data.sources>[number];",
  "const glossarySources = entry.data.sources ?? [];",
  "function formatGlossarySourceKind(",
  "Sources and references",
  "glossarySources.length > 0",
  'class="source-list"',
  'class="source-item"',
  "source.kind",
  "source.note",
]) {
  assertIncludes(glossaryPageText, "glossary page", expected);
}

for (const slug of retainedGlossarySlugs) {
  const filePath = join(__dirname, "..", "src", "content", "glossary", `${slug}.md`);
  const text = readFileSync(filePath, "utf-8");

  for (const expected of [
    'reviewedBy: "PricingNest Editorial Team"',
    "reviewed:",
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

console.log("glossary-trust-data.test.mjs: OK");
