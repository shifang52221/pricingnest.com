import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pagePath = join(
  __dirname,
  "..",
  "dist",
  "saas-pricing",
  "bandwidth-cost-calculator",
  "index.html"
);

const pageHtml = readFileSync(pagePath, "utf-8");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const followUpSectionMatch = pageHtml.match(
  /Curated follow-up resources<\/div>\s*<ul class="list">([\s\S]*?)<\/ul>\s*<p class="muted"/
);

assert(
  followUpSectionMatch,
  "bandwidth cluster rendering: could not isolate visible curated follow-up resources section"
);

const followUpSection = followUpSectionMatch[1];

const expectedLinks = [
  "/guides/bandwidth-pricing-guide/",
  "/guides/bandwidth-pricing-guardrails/",
  "/guides/cdn-cost-pass-through/",
  "/glossary/egress/",
  "/glossary/bandwidth/"
];

for (const href of expectedLinks) {
  assert(
    followUpSection.includes(`href="${href}"`),
    `bandwidth cluster rendering: expected visible curated follow-up link ${href}`
  );
}

console.log("bandwidth-cluster-rendering.test.mjs: OK");
