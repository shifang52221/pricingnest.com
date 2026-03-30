import { execSync } from "node:child_process";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { GLOSSARY_GOVERNANCE, GUIDE_GOVERNANCE, STATIC_PAGE_GOVERNANCE } from "./src/lib/content-governance-data.mjs";

const resolveLastmod = () => {
  if (process.env.SITEMAP_LASTMOD) {
    const parsed = new Date(process.env.SITEMAP_LASTMOD);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  if (process.env.SOURCE_DATE_EPOCH) {
    const epoch = Number(process.env.SOURCE_DATE_EPOCH) * 1000;
    if (Number.isFinite(epoch)) return new Date(epoch);
  }
  try {
    const raw = execSync("git log -1 --format=%ct", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    const epoch = Number(raw) * 1000;
    if (Number.isFinite(epoch)) return new Date(epoch);
  } catch {}
  return new Date();
};

const NOINDEX_SITEMAP_PATHS = new Set([
  "/404.html",
  ...Object.entries(GUIDE_GOVERNANCE)
    .filter(([, robots]) => robots === "noindex,follow")
    .map(([slug]) => `/guides/${slug}/`),
  ...Object.entries(GLOSSARY_GOVERNANCE)
    .filter(([, robots]) => robots === "noindex,follow")
    .map(([slug]) => `/glossary/${slug}/`),
  ...Object.entries(STATIC_PAGE_GOVERNANCE)
    .filter(([, robots]) => robots === "noindex,follow")
    .map(([pathname]) => pathname),
]);

export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://pricingnest.com",
  integrations: [
    sitemap({
      changefreq: "weekly",
      lastmod: resolveLastmod(),
      priority: 0.7,
      filter: (page) => {
        const pathname = page.startsWith("http") ? new URL(page).pathname : page;
        return !NOINDEX_SITEMAP_PATHS.has(pathname);
      },
      serialize: (item) => {
        // Slightly boost important landing pages.
        try {
          const pathname = new URL(item.url).pathname;
          if (pathname === "/") return { ...item, priority: 1.0 };
          if (pathname === "/saas-pricing/") return { ...item, priority: 0.9 };
        } catch {}
        return item;
      },
    }),
  ],
});
