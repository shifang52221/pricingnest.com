import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || "https://pricingnest.com",
  integrations: [
    sitemap({
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
    }),
  ],
});
