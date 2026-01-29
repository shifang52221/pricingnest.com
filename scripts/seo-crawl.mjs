import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "audits");

const origin = "https://pricingnest.com";
const sitemapUrl = `${origin}/sitemap-index.xml`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const toAbsolute = (href, base) => {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
};

const normalizeUrl = (url) => {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.toString().replace(/\/$/, "/");
  } catch {
    return null;
  }
};

const isSameHost = (url) => {
  try {
    return new URL(url).host === new URL(origin).host;
  } catch {
    return false;
  }
};

const extractLinks = (html, base) => {
  const links = [];
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const abs = toAbsolute(m[1], base);
    if (abs) links.push(abs);
  }
  return links;
};

const fetchText = async (url, maxRedirects = 5) => {
  let current = url;
  let redirects = 0;
  let res = null;
  while (redirects <= maxRedirects) {
    res = await fetch(current, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      const next = toAbsolute(res.headers.get("location"), current);
      if (!next) break;
      current = next;
      redirects += 1;
      continue;
    }
    break;
  }
  const text = res ? await res.text() : "";
  return { text, status: res?.status ?? 0, finalUrl: current, redirects };
};

const loadSitemaps = async () => {
  const index = await fetchText(sitemapUrl);
  const locs = [...index.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const loc of locs) {
    if (!loc.endsWith(".xml")) {
      urls.push(loc);
      continue;
    }
    const sm = await fetchText(loc);
    const entries = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    urls.push(...entries);
  }
  return Array.from(new Set(urls.map(normalizeUrl).filter(Boolean)));
};

const classifyUrl = (url) => {
  const u = new URL(url);
  const p = u.pathname;
  if (p.startsWith("/saas-pricing/") && p !== "/saas-pricing/") return "calculator";
  if (p.startsWith("/guides/") && p !== "/guides/") return "guide";
  if (p.startsWith("/glossary/") && p !== "/glossary/") return "resource";
  if (p.startsWith("/saas-pricing/use-cases/")) return "category";
  if (["/about/", "/contact/", "/privacy-policy/", "/terms/", "/cookie-policy/"].includes(p)) return "static";
  if (["/guides/", "/glossary/", "/saas-pricing/"].includes(p)) return "category";
  if (p === "/") return "category";
  return "static";
};

const crawlSite = async (seedUrls, limit = 500) => {
  const seen = new Set();
  const queue = [...seedUrls];
  const out = [];

  while (queue.length && out.length < limit) {
    const next = queue.shift();
    const norm = normalizeUrl(next);
    if (!norm || seen.has(norm)) continue;
    seen.add(norm);

    let html = "";
    let status = 0;
    let finalUrl = norm;
    let redirects = 0;

    try {
      const res = await fetchText(norm);
      html = res.text;
      status = res.status;
      finalUrl = res.finalUrl;
      redirects = res.redirects;
    } catch {
      status = 0;
    }

    out.push({ url: norm, status, finalUrl, redirects });

    if (status >= 200 && status < 300 && html) {
      const links = extractLinks(html, finalUrl).filter(isSameHost);
      for (const link of links) {
        if (!seen.has(normalizeUrl(link))) queue.push(link);
      }
    }

    if (out.length % 50 === 0) await sleep(200);
  }

  return out;
};

const main = async () => {
  await fs.mkdir(outDir, { recursive: true });

  const sitemapUrls = await loadSitemaps();
  const crawl = await crawlSite([origin, ...sitemapUrls]);

  const sitemapSet = new Set(sitemapUrls);
  const allUrls = Array.from(new Set([...sitemapUrls, ...crawl.map((c) => c.url)]));

  const rows = allUrls.map((url) => {
    const c = crawl.find((r) => r.url === url);
    const status = c?.status ?? null;
    return {
      url,
      category: classifyUrl(url),
      in_sitemap: sitemapSet.has(url),
      status,
    };
  });

  const csvHeader = "url,category,in_sitemap,status\n";
  const csvBody = rows
    .map((r) => `${r.url},${r.category},${r.in_sitemap ? "yes" : "no"},${r.status ?? ""}`)
    .join("\n");

  await fs.writeFile(path.join(outDir, "url-classification.csv"), csvHeader + csvBody, "utf8");
  await fs.writeFile(path.join(outDir, "url-classification.json"), JSON.stringify(rows, null, 2), "utf8");

  // Save crawl state to re-use in audit.
  await fs.writeFile(path.join(outDir, "crawl.json"), JSON.stringify(crawl, null, 2), "utf8");
};

await main();

