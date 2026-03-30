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
  "Convert API cost estimate to price per 1,000 calls",
  "Test 10%, 15%, and 20% annual discount scenarios and compare conversion, cash collection, and effective monthly rate.",
  "How do I calculate annual price from a monthly plan?",
  "Convert monthly cloud bill data into blended vCPU-hour and GB-hour rates before setting compute plan pricing.",
  "How do I include GPU or accelerator costs in this compute pricing model?",
  "If request intensity is high, treat requests as a first-class pricing lever instead of only increasing the GB price.",
  "How do I calculate storage pricing per GB when request fees are significant?",
  "Map projected traffic into billable calls after free credits before setting list price per 1,000 calls.",
  "How do I price an API per 1,000 calls from my monthly cost model?",
  "How do I build a price-per-unit delta CSV template?",
  "How do I turn compute costs into compute pricing?",
  "How do I build an API cost estimate and price per 1,000 calls?",
  "How do I estimate fixed monthly costs per GB for storage pricing?",
  "delta CSV template",
  "Can I use this as a cost per use calculator?",
  "How do I estimate usage cost before setting price?",
  "Is this a compute pricing calculator?",
  "Can I use this as a Google Cloud Storage price calculator?",
  "Can I use this as a cost per GB calculator?",
  "How should I handle grandfathering pricing plans?",
  "How do I go from API cost estimate to list price?",
  "Estimate API cost per 1,000 calls, monthly API cost, and a margin-safe monthly price from your call volume and overhead."
];

for (const snippet of requiredSnippets) {
  if (!text.includes(snippet)) {
    throw new Error(`usage-based content missing snippet: ${snippet}`);
  }
}

console.log("usage-based-content.test.mjs: OK");
