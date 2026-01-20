import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readText(filePath) {
  return fs.readFile(filePath, "utf8");
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function extractToolSlugsFromToolsTs(toolsTs) {
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(toolsTs))) slugs.push(m[1]);
  return uniq(slugs);
}

function extractSwitchCases(text) {
  const cases = [];
  const re = /case\s+"([^"]+)":/g;
  let m;
  while ((m = re.exec(text))) cases.push(m[1]);
  return uniq(cases);
}

function findDuplicates(rows, key) {
  const map = new Map();
  for (const row of rows) {
    const val = row[key];
    if (!val) continue;
    const list = map.get(val) ?? [];
    list.push(row.slug);
    map.set(val, list);
  }
  return Array.from(map.entries())
    .filter(([, slugs]) => slugs.length > 1)
    .map(([value, slugs]) => ({ value, slugs }));
}

function parseFrontmatter(md) {
  const m = md.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!m) return null;
  const body = m[1];
  const out = {};
  for (const line of body.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim();
    out[k] = v.replace(/^"|"$/g, "");
  }
  return out;
}

async function listMarkdown(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    if (e.isFile() && e.name.endsWith(".md")) out.push(path.join(dir, e.name));
  }
  return out.sort();
}

async function auditBuildLogic() {
  const toolsPath = path.join(repoRoot, "src", "lib", "tools.ts");
  const calcPath = path.join(repoRoot, "src", "scripts", "calculators.ts");
  const toolPagePath = path.join(repoRoot, "src", "scripts", "tool-page.js");

  const [toolsTs, calculatorsTs, toolPageJs] = await Promise.all([
    readText(toolsPath),
    readText(calcPath),
    readText(toolPagePath),
  ]);

  const toolSlugs = extractToolSlugsFromToolsTs(toolsTs);
  const calcCases = extractSwitchCases(calculatorsTs);
  const toolPageCases = extractSwitchCases(toolPageJs);

  const missingInCalculators = toolSlugs.filter((s) => !calcCases.includes(s));
  const missingInToolPage = toolSlugs.filter((s) => !toolPageCases.includes(s));

  return {
    toolCount: toolSlugs.length,
    missingInCalculators,
    missingInToolPage,
  };
}

async function auditContentCollections() {
  const guidesDir = path.join(repoRoot, "src", "content", "guides");
  const glossaryDir = path.join(repoRoot, "src", "content", "glossary");

  const [guideFiles, glossaryFiles] = await Promise.all([listMarkdown(guidesDir), listMarkdown(glossaryDir)]);

  const guides = [];
  const glossary = [];

  for (const filePath of guideFiles) {
    const md = await readText(filePath);
    const fm = parseFrontmatter(md);
    guides.push({ slug: path.basename(filePath, ".md"), title: fm?.title ?? "", description: fm?.description ?? "" });
  }

  for (const filePath of glossaryFiles) {
    const md = await readText(filePath);
    const fm = parseFrontmatter(md);
    glossary.push({ slug: path.basename(filePath, ".md"), title: fm?.title ?? "", description: fm?.description ?? "" });
  }

  const missingMeta = [
    ...guides.filter((g) => !g.title || !g.description).map((g) => `guides/${g.slug}`),
    ...glossary.filter((g) => !g.title || !g.description).map((g) => `glossary/${g.slug}`),
  ];

  const dupGuideTitles = findDuplicates(guides, "title");
  const dupGlossaryTitles = findDuplicates(glossary, "title");
  const dupGuideDescs = findDuplicates(guides, "description");
  const dupGlossaryDescs = findDuplicates(glossary, "description");

  return {
    guideCount: guides.length,
    glossaryCount: glossary.length,
    missingMeta,
    dupGuideTitles,
    dupGlossaryTitles,
    dupGuideDescs,
    dupGlossaryDescs,
  };
}

async function main() {
  const build = await auditBuildLogic();
  const content = await auditContentCollections();

  const results = {
    build,
    content,
  };

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(results, null, 2));

  const hasErrors =
    build.missingInCalculators.length > 0 ||
    build.missingInToolPage.length > 0 ||
    content.missingMeta.length > 0;

  process.exitCode = hasErrors ? 1 : 0;
}

await main();
