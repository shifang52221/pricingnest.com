import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "audits");
const origin = "https://pricingnest.com";

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, "utf8"));

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

const stripHtml = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const countWords = (text) => (text ? text.split(/\s+/).filter(Boolean).length : 0);

const extractMeta = (html, name) => {
  const re = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i");
  const m = html.match(re);
  return m ? m[1].trim() : "";
};

const extractTag = (html, tag) => {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = html.match(re);
  return m ? stripHtml(m[1]) : "";
};

const extractCanonical = (html) => {
  const re = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
  const m = html.match(re);
  return m ? m[1].trim() : "";
};

const extractRobots = (html) => extractMeta(html, "robots");

const extractHreflang = (html) => {
  const links = [];
  const re = /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) links.push({ hreflang: m[1], href: m[2] });
  return links;
};

const extractInternalLinks = (html, base) => {
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  const links = new Set();
  let m;
  while ((m = re.exec(html))) {
    const abs = toAbsolute(m[1], base);
    const norm = abs ? normalizeUrl(abs) : null;
    if (norm && isSameHost(norm)) links.add(norm);
  }
  return Array.from(links);
};

const extractSchema = (html) => {
  const scripts = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1];
    try {
      JSON.parse(raw);
      scripts.push({ valid: true });
    } catch (err) {
      scripts.push({ valid: false, error: String(err) });
    }
  }
  return scripts;
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
  const contentType = res?.headers?.get("content-type") ?? "";
  return { text, status: res?.status ?? 0, finalUrl: current, redirects, contentType };
};

const main = async () => {
  await fs.mkdir(outDir, { recursive: true });
  const crawl = await readJson(path.join(outDir, "crawl.json"));

  const rows = [];
  const linkGraph = new Map();

  const sitemapRows = await readJson(path.join(outDir, "url-classification.json"));
  const sitemapSet = new Set(sitemapRows.filter((r) => r.in_sitemap).map((r) => r.url));

  for (const item of crawl) {
    const { url } = item;
    const res = await fetchText(url);
    const isHtml = res.contentType.includes("text/html");
    const isAsset = /\.(xml|txt|svg|png|jpg|jpeg|gif|webp|ico|css|js)$/i.test(new URL(url).pathname);
    const isCdnCgi = new URL(url).pathname.startsWith("/cdn-cgi/");
    if (!isHtml || isAsset || isCdnCgi) continue;
    const html = res.text;

    const title = extractTag(html, "title");
    const description = extractMeta(html, "description");
    const canonical = extractCanonical(html);
    const robots = extractRobots(html);
    const hreflang = extractHreflang(html);

    const textOnly = stripHtml(html);
    const words = countWords(textOnly);

    const internalLinks = extractInternalLinks(html, res.finalUrl);
    linkGraph.set(url, internalLinks);

    const schema = extractSchema(html);
    const schemaValid = schema.length === 0 ? "none" : schema.every((s) => s.valid) ? "valid" : "invalid";

    rows.push({
      url,
      status: res.status,
      final_url: res.finalUrl,
      redirects: res.redirects,
      title,
      description,
      canonical,
      robots,
      hreflang: hreflang.length ? JSON.stringify(hreflang) : "",
      main_content_words: words,
      internal_links: internalLinks.length,
      schema: schemaValid,
    });
  }

  const csvHeader =
    "url,status,final_url,redirects,title,description,canonical,robots,hreflang,main_content_words,internal_links,schema\n";
  const csvBody = rows
    .map((r) =>
      [
        r.url,
        r.status,
        r.final_url,
        r.redirects,
        r.title?.replaceAll(",", " "),
        r.description?.replaceAll(",", " "),
        r.canonical,
        r.robots,
        r.hreflang?.replaceAll(",", " "),
        r.main_content_words,
        r.internal_links,
        r.schema,
      ].join(",")
    )
    .join("\n");

  await fs.writeFile(path.join(outDir, "html-metrics.csv"), csvHeader + csvBody, "utf8");
  await fs.writeFile(path.join(outDir, "html-metrics.json"), JSON.stringify(rows, null, 2), "utf8");

  // Diagnostics
  const issues = [];
  const titleMap = new Map();
  const descMap = new Map();
  const canonicalMismatch = rows.filter((r) => r.canonical && normalizeUrl(r.canonical) !== normalizeUrl(r.final_url));
  const non200 = rows.filter((r) => r.status >= 400 || r.status === 0);
  const redirectChains = rows.filter((r) => r.redirects >= 2);
  const noIndexInSitemap = rows.filter((r) => r.robots?.includes("noindex") && sitemapSet.has(r.url));
  const shortContent = rows.filter((r) => r.main_content_words < 100);
  const schemaInvalid = rows.filter((r) => r.schema === "invalid");

  for (const r of rows) {
    if (r.title) {
      const list = titleMap.get(r.title) ?? [];
      list.push(r.url);
      titleMap.set(r.title, list);
    }
    if (r.description) {
      const list = descMap.get(r.description) ?? [];
      list.push(r.url);
      descMap.set(r.description, list);
    }
  }

  for (const [title, urls] of titleMap) {
    if (urls.length > 1) issues.push({ type: "duplicate_title", urls, evidence: title, priority: "high" });
  }
  for (const [desc, urls] of descMap) {
    if (urls.length > 1) issues.push({ type: "duplicate_description", urls, evidence: desc, priority: "medium" });
  }
  for (const r of canonicalMismatch) {
    issues.push({ type: "canonical_mismatch", urls: [r.url], evidence: r.canonical, priority: "high" });
  }
  for (const r of non200) {
    issues.push({ type: "non200", urls: [r.url], evidence: String(r.status), priority: "high" });
  }
  for (const r of redirectChains) {
    issues.push({ type: "redirect_chain", urls: [r.url], evidence: String(r.redirects), priority: "medium" });
  }
  for (const r of noIndexInSitemap) {
    issues.push({ type: "sitemap_noindex", urls: [r.url], evidence: r.robots, priority: "high" });
  }
  for (const r of shortContent) {
    issues.push({
      type: "short_content",
      urls: [r.url],
      evidence: `${r.main_content_words} words`,
      priority: "medium",
    });
  }
  for (const r of schemaInvalid) {
    issues.push({ type: "schema_invalid", urls: [r.url], evidence: "JSON-LD parse error", priority: "low" });
  }

  // Orphans: URLs not linked by any other internal page.
  const inbound = new Map();
  for (const [from, links] of linkGraph.entries()) {
    for (const to of links) {
      const list = inbound.get(to) ?? [];
      list.push(from);
      inbound.set(to, list);
    }
  }
  const orphans = rows.filter((r) => !inbound.get(r.url));
  for (const r of orphans) {
    issues.push({ type: "orphan", urls: [r.url], evidence: "No inbound internal links", priority: "medium" });
  }

  await fs.writeFile(path.join(outDir, "issues.json"), JSON.stringify(issues, null, 2), "utf8");

  const issueCsvHeader = "type,url,evidence,priority\n";
  const issueCsv = issues
    .flatMap((i) => i.urls.map((u) => `${i.type},${u},${String(i.evidence).replaceAll(",", " ")},${i.priority}`))
    .join("\n");
  await fs.writeFile(path.join(outDir, "issues.csv"), issueCsvHeader + issueCsv, "utf8");

  // Save inbound map for orphan review.
  await fs.writeFile(path.join(outDir, "link-graph.json"), JSON.stringify([...inbound.entries()], null, 2), "utf8");
};

await main();
