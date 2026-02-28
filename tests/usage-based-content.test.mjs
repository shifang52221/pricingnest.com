import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const toolsPath = join(__dirname, "..", "src", "lib", "tools.ts");
const text = readFileSync(toolsPath, "utf-8");

const requiredSnippets = [
  "Choose one billable unit customers can forecast (per API call, per 1,000 calls, per GB, or per event).",
  "If required price per unit swings between p50 and p90, use tiered breakpoints and clear overage guardrails.",
  "How do I choose a usage metric customers can understand?",
  "Can I use this for per-GB pricing?",
  "Per-GB pricing",
  "Convert API cost estimate to price per 1,000 calls"
];

for (const snippet of requiredSnippets) {
  if (!text.includes(snippet)) {
    throw new Error(`usage-based content missing snippet: ${snippet}`);
  }
}

console.log("usage-based-content.test.mjs: OK");
