import { execSync } from "node:child_process";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

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

export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://pricingnest.com",
  integrations: [
    sitemap({
      changefreq: "weekly",
      lastmod: resolveLastmod(),
      priority: 0.7,
      filter: (page) => {
        const blocked = new Set(["/404.html"]);
        const pathname = page.startsWith("http") ? new URL(page).pathname : page;
        return !blocked.has(pathname);
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
