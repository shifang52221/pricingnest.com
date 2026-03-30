import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseLayoutPath = join(__dirname, "..", "src", "layouts", "BaseLayout.astro");
const toolkitIndexPath = join(__dirname, "..", "src", "pages", "saas-pricing", "index.astro");

const baseLayoutText = readFileSync(baseLayoutPath, "utf-8");
const toolkitIndexText = readFileSync(toolkitIndexPath, "utf-8");

const assertIncludes = (text, label, expected) => {
  if (!text.includes(expected)) {
    throw new Error(`${label}: missing ${expected}`);
  }
};

const assertExcludes = (text, label, unexpected) => {
  if (text.includes(unexpected)) {
    throw new Error(`${label}: should not include ${unexpected}`);
  }
};

for (const unexpected of [
  "PUBLIC_ADSENSE_CLIENT",
  "PUBLIC_FUNDING_CHOICES_SCRIPT_SRC",
  "google-adsense-account",
  "fundingchoicesmessages.google.com",
  "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  "useFundingChoices",
]) {
  assertExcludes(baseLayoutText, "base layout", unexpected);
}

assertIncludes(baseLayoutText, "base layout", "<CookieBanner />");
assertExcludes(baseLayoutText, "toolkit page", "import AdSlot");
assertExcludes(toolkitIndexText, "toolkit page", "<AdSlot");

console.log("ads-noise-reduction.test.mjs: OK");
