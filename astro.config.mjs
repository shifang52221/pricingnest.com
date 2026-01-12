import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://pricingnest.com",
  integrations: [
    sitemap({
      changefreq: "weekly",
      lastmod: process.env.SITEMAP_LASTMOD ? new Date(process.env.SITEMAP_LASTMOD) : new Date(),
      priority: 0.7,
      filter: (page) => {
        const blocked = new Set([
          "/contact/",
          "/cookie-policy/",
          "/privacy-policy/",
          "/terms/",
          "/404.html",
        ]);
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
