import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { importTypeScriptModule } from "./helpers/import-typescript-module.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");

const { TOOLS } = await importTypeScriptModule(toolsPath);

const expectations = [
  "usage-based-pricing-calculator",
  "compute-cost-estimator",
  "annual-discount-calculator",
  "api-pricing-calculator",
  "storage-cost-calculator"
];

for (const slug of expectations) {
  const tool = TOOLS.find((item) => item.slug === slug);
  if (!tool) {
    throw new Error(`missing tool: ${slug}`);
  }

  const inputGuidanceCount = tool.inputGuidance?.length ?? 0;
  const validationChecksCount = tool.validationChecks?.length ?? 0;
  const commonMistakesCount = tool.commonMistakes?.length ?? 0;
  const interpretationCount = tool.interpretation?.length ?? 0;
  const faqCount = tool.faq?.length ?? 0;
  const useCasesCount = tool.useCases?.length ?? 0;
  const walkthroughsCount = tool.walkthroughs?.length ?? 0;
  const scenariosCount = tool.scenarios?.length ?? 0;

  if (inputGuidanceCount < 5) throw new Error(`${slug}: expected at least 5 inputGuidance items, got ${inputGuidanceCount}`);
  if (validationChecksCount < 4) throw new Error(`${slug}: expected at least 4 validationChecks, got ${validationChecksCount}`);
  if (commonMistakesCount < 4) throw new Error(`${slug}: expected at least 4 commonMistakes, got ${commonMistakesCount}`);
  if (interpretationCount < 4) throw new Error(`${slug}: expected at least 4 interpretation items, got ${interpretationCount}`);
  if (faqCount < 10) throw new Error(`${slug}: expected at least 10 FAQ items, got ${faqCount}`);
  if (useCasesCount < 3) throw new Error(`${slug}: expected at least 3 use cases, got ${useCasesCount}`);
  if (walkthroughsCount < 3) throw new Error(`${slug}: expected at least 3 walkthroughs, got ${walkthroughsCount}`);
  if (scenariosCount < 5) throw new Error(`${slug}: expected at least 5 scenarios, got ${scenariosCount}`);
}

console.log("core-tool-depth.test.mjs: OK");
