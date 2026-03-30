import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const guideChecks = [
  {
    slug: "pricing-localization",
    headings: [
      "## When localization is worth doing",
      "## When not to localize pricing yet",
      "## Decision factors to confirm first",
      "## Approaches to regional pricing",
      "## Common mistakes",
      "## Final rollout checklist",
    ],
    keywords: ["currency", "fx", "tax", "regional pricing"],
  },
  {
    slug: "support-tier-packaging",
    headings: [
      "## When support tier packaging works well",
      "## When support should not be bundled by default",
      "## Decision factors to price support correctly",
      "## Packaging options and trade-offs",
      "## Common mistakes",
      "## Final packaging checklist",
    ],
    keywords: ["sla", "response time", "add-on", "escalation"],
  },
  {
    slug: "storage-retrieval-fees",
    headings: [
      "## When retrieval fees need pricing attention",
      "## What retrieval fees are actually covering",
      "## Decision factors to confirm first",
      "## Pricing options for retrieval-heavy products",
      "## Common mistakes",
      "## Final pricing checklist",
    ],
    keywords: ["retrieval", "request fees", "egress", "cold storage"],
  },
];

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

for (const check of guideChecks) {
  const path = join(__dirname, "..", "src", "content", "guides", `${check.slug}.md`);
  const text = readFileSync(path, "utf-8");
  const normalized = text.toLowerCase();

  for (const heading of check.headings) {
    assert(text.includes(heading), `${check.slug}: missing heading ${heading}`);
  }

  const matchedKeywords = check.keywords.filter((keyword) => normalized.includes(keyword));
  assert(matchedKeywords.length >= 3, `${check.slug}: expected at least 3 topic keywords, found ${matchedKeywords.length}`);

  assert(/\/saas-pricing\//.test(text), `${check.slug}: missing calculator link`);
  assert(/\/glossary\//.test(text), `${check.slug}: missing glossary link`);
}

console.log("decision-guide-depth.test.mjs: OK");
