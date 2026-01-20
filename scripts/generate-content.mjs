import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { guides, glossary } from "./content-plan.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const outRoot = path.join(repoRoot, "src", "content");
const outGuides = path.join(outRoot, "guides");
const outGlossary = path.join(outRoot, "glossary");

const today = new Date().toISOString().slice(0, 10);

const titleFromSlug = (slug) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");

const mdFrontmatter = (data) => {
  const clean = {
    updated: today,
    tags: [],
    tools: [],
    guides: [],
    glossary: [],
    ...data,
  };

  const lines = [
    "---",
    `title: "${String(clean.title).replaceAll('"', '\\"')}"`,
    `description: "${String(clean.description).replaceAll('"', '\\"')}"`,
    `updated: "${clean.updated}"`,
  ];
  if (clean.category) lines.push(`category: "${String(clean.category).replaceAll('"', '\\"')}"`);
  if (Array.isArray(clean.tags) && clean.tags.length) lines.push(`tags: ${JSON.stringify(clean.tags)}`);
  if (Array.isArray(clean.tools) && clean.tools.length) lines.push(`tools: ${JSON.stringify(clean.tools)}`);
  if (Array.isArray(clean.guides) && clean.guides.length) lines.push(`guides: ${JSON.stringify(clean.guides)}`);
  if (Array.isArray(clean.glossary) && clean.glossary.length) lines.push(`glossary: ${JSON.stringify(clean.glossary)}`);
  lines.push("---");
  return lines.join("\n");
};

const listLinks = (label, items, toHref) => {
  if (!items?.length) return "";
  const lines = [`## ${label}`, ...items.map((s) => `- [${titleFromSlug(s)}](${toHref(s)})`)];
  return `\n\n${lines.join("\n")}\n`;
};

const glossaryBody = (term) => {
  const category = term.category ?? "general";
  const focus =
    category === "storage"
      ? "Storage and infra pricing gets messy fast. A clear definition helps you model cost recovery and explain pricing to buyers."
      : category === "api"
        ? "API pricing lives or dies on unit economics. A clear unit and cost model prevents margin surprises."
        : category === "pricing-experiments"
          ? "Pricing changes are risky without clear definitions and guardrails. This term shows up in rollout decisions."
          : category === "unit-economics"
            ? "Unit economics terms connect pricing decisions to profitability. Clear definitions reduce spreadsheet errors."
            : "Clear terminology helps you communicate pricing and assumptions across your team.";

  const pitfalls =
    category === "storage"
      ? ["Ignoring request costs and focusing only on GB-month.", "Using raw provider list prices instead of blended costs.", "Not modeling p90 customers who drive most cost."]
      : category === "api"
        ? ["Treating vendor/API pass-through costs as zero.", "Using p50 usage only (heavy users can break margins).", "Defining units buyers can’t estimate."]
        : category === "metrics"
          ? ["Mixing cash collected with run-rate metrics.", "Using inconsistent time windows.", "Not separating churn from expansion."]
          : ["Using an ambiguous definition across teams.", "Not writing assumptions down.", "Optimizing for simplicity but losing correctness."];

  return [
    `## Definition`,
    term.description,
    ``,
    `## Why it matters`,
    focus,
    ``,
    `## Common pitfalls`,
    ...pitfalls.map((p) => `- ${p}`),
    listLinks("Related calculators", term.tools ?? [], (s) => `/saas-pricing/${s}/`).trimEnd(),
    listLinks("Related guides", term.guides ?? [], (s) => `/guides/${s}/`).trimEnd(),
    listLinks("Related glossary terms", term.glossary ?? [], (s) => `/glossary/${s}/`).trimEnd(),
  ]
    .filter(Boolean)
    .join("\n");
};

const guideBody = (g) => {
  return [
    `## Quick checklist`,
    `- Define the unit and write down assumptions.`,
    `- Model at least two scenarios (p50 vs p90).`,
    `- Use a minimum/platform fee if fixed overhead is meaningful.`,
    `- Publish examples to reduce bill shock and support load.`,
    ``,
    `## Step-by-step`,
    `1. Estimate your blended unit costs (infra + vendor pass-through).`,
    `2. Add fixed overhead you need to recover.`,
    `3. Pick a target gross margin range.`,
    `4. Choose tiers and included usage based on typical and heavy customers.`,
    `5. Validate outputs with a CSV export and shareable links.`,
    listLinks("Tools to use", g.tools ?? [], (s) => `/saas-pricing/${s}/`).trimEnd(),
    listLinks("Related glossary terms", g.glossary ?? [], (s) => `/glossary/${s}/`).trimEnd(),
  ]
    .filter(Boolean)
    .join("\n");
};

async function writeAll() {
  await fs.mkdir(outGuides, { recursive: true });
  await fs.mkdir(outGlossary, { recursive: true });

  const guideWrites = guides.map(async (g) => {
    const filename = path.join(outGuides, `${g.slug}.md`);
    const md = `${mdFrontmatter(g)}\n\n${guideBody(g)}\n`;
    await fs.writeFile(filename, md, "utf8");
  });

  const glossaryWrites = glossary.map(async (t) => {
    const filename = path.join(outGlossary, `${t.slug}.md`);
    const md = `${mdFrontmatter(t)}\n\n${glossaryBody(t)}\n`;
    await fs.writeFile(filename, md, "utf8");
  });

  await Promise.all([...guideWrites, ...glossaryWrites]);
  // eslint-disable-next-line no-console
  console.log(`Generated: guides=${guides.length}, glossary=${glossary.length}`);
}

await writeAll();

