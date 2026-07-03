import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { importTypeScriptModule } from "./helpers/import-typescript-module.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const toolPagePath = join(__dirname, "..", "src", "pages", "saas-pricing", "[slug].astro");
const methodologyPath = join(__dirname, "..", "src", "pages", "methodology.astro");
const aboutPath = join(__dirname, "..", "src", "pages", "about.astro");

const toolsModule = await importTypeScriptModule(toolsPath);
const toolPageText = readFileSync(toolPagePath, "utf-8");
const methodologyText = readFileSync(methodologyPath, "utf-8");
const aboutText = readFileSync(aboutPath, "utf-8");

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const flagshipToolSlugs = [
  "usage-based-pricing-calculator",
  "api-pricing-calculator",
  "compute-cost-estimator",
  "storage-cost-calculator",
  "annual-discount-calculator"
];

for (const slug of flagshipToolSlugs) {
  const tool = toolsModule.getToolBySlug(slug);
  assert(tool, `missing tool data for ${slug}`);
  assert(Array.isArray(tool.verificationChecklist) && tool.verificationChecklist.length > 0, `${slug}: missing verificationChecklist`);
  assert(Array.isArray(tool.reviewScope) && tool.reviewScope.length > 0, `${slug}: missing reviewScope`);
  assert(Array.isArray(tool.limitations) && tool.limitations.length > 0, `${slug}: missing limitations`);
  assert(
    Array.isArray(tool.defaultOutputBreakpoints) && tool.defaultOutputBreakpoints.length > 0,
    `${slug}: missing defaultOutputBreakpoints`
  );
}

for (const expected of [
  "How to verify this model",
  "Review scope",
  "When default outputs are most likely to break",
  "What this tool does not cover"
]) {
  assert(toolPageText.includes(expected), `tool page: missing ${expected}`);
}

for (const expected of [
  "How to independently verify a calculator output",
  "what reviewed means",
  "what counts as a meaningful update",
  "how a reader should independently validate a tool output"
]) {
  assert(methodologyText.includes(expected), `methodology page: missing ${expected}`);
}

for (const expected of [
  "maintained editorial toolkit",
  "not a bulk content directory",
  "reviewable assumptions"
]) {
  assert(aboutText.includes(expected), `about page: missing ${expected}`);
}

console.log("tool-trust-signals-core.test.mjs: OK");
