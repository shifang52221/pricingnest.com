import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildScriptPath = join(__dirname, "..", "scripts", "build.mjs");
const buildScriptText = readFileSync(buildScriptPath, "utf-8");

if (!buildScriptText.includes('spawnSync("astro", ["build", "--force"]')) {
  throw new Error('build script: expected astro build to run with --force to clear stale content cache');
}

console.log("build-script-force.test.mjs: OK");
