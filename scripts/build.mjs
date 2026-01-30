import https from "node:https";
import { spawnSync } from "node:child_process";

const fetchDateHeader = (url) =>
  new Promise((resolve) => {
    const request = https.request(
      url,
      { method: "HEAD", timeout: 5000 },
      (res) => {
        resolve(res.headers?.date ?? null);
        res.resume();
      }
    );
    request.on("error", () => resolve(null));
    request.on("timeout", () => {
      request.destroy();
      resolve(null);
    });
    request.end();
  });

const resolveBuildTime = async () => {
  if (process.env.SITEMAP_LASTMOD) return process.env.SITEMAP_LASTMOD;
  const header = await fetchDateHeader("https://www.google.com");
  if (header) {
    const parsed = new Date(header);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return new Date().toISOString();
};

const run = async () => {
  process.env.SITEMAP_LASTMOD = await resolveBuildTime();
  const result = spawnSync("astro", ["build"], { stdio: "inherit", shell: true, env: process.env });
  process.exit(result.status ?? 1);
};

run();
