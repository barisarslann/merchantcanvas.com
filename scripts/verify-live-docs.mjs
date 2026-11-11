import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";

const root = await realpath(new URL("..", import.meta.url));
const reportPath = path.resolve(root, "growth/reports/daily/2026-11-11-docs-live.json");
assert.ok(reportPath.startsWith(`${root}${path.sep}`));
const manifest = JSON.parse(await readFile(path.join(root, "growth/reports/daily/2026-11-11-docs-import.json"), "utf8"));
const guide = JSON.parse(await readFile(path.join(root, "app/content/mtd-guide.json"), "utf8"));
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const checks = [];
const failures = [];

async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { "user-agent": "MerchantCanvas-documentation-verification/1.0", accept: "*/*" } });
  const bytes = Buffer.from(await response.arrayBuffer());
  return { url, finalUrl: response.url, status: response.status, contentType: response.headers.get("content-type"), bytes, sha256: sha(bytes) };
}

for (const route of ["/docs", "/docs/multitier-discounts"]) {
  const item = await get(`https://merchantcanvas.com${route}`);
  const html = item.bytes.toString("utf8");
  checks.push({ ...item, bytes: item.bytes.length });
  if (item.status !== 200) failures.push(`${route}: HTTP ${item.status}`);
  if (!html.includes(`href="https://merchantcanvas.com${route}"`)) failures.push(`${route}: canonical missing`);
  if ([...html.matchAll(/<h1\b/gi)].length !== 1) failures.push(`${route}: H1 count`);
  if (/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)) failures.push(`${route}: noindex`);
  if (route.endsWith("multitier-discounts")) {
    for (const id of ["guide-content", ...manifest.sourceIds]) {
      if (!html.includes(`id="${id}"`)) failures.push(`Missing anchor ${id}`);
    }
    for (const video of guide.videos) {
      if (!html.includes(`https://www.youtube.com/watch?v=${video.youtubeId}`)) failures.push(`Missing video ${video.id}`);
    }
    if (/<iframe\b/i.test(html)) failures.push("Unexpected initial iframe");
    if (/user-guide-assets\//.test(html)) failures.push("Legacy media dependency");
    if (!html.includes("Design preview edition")) failures.push("Source edition label lost");
  }
}

// Bounded concurrency. Fetch only the 68 explicit manifest assets.
let cursor = 0;
const assets = manifest.assets;
assert.equal(assets.length, 68);
await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < assets.length) {
    const asset = assets[cursor++];
    const relative = asset.path || asset.destination || asset.output;
    assert.equal(typeof relative, "string", "Manifest asset path required");
    const urlPath = relative.replaceAll("\\", "/").replace(/^public/, "");
    assert.ok(urlPath.startsWith("/docs/multitier-discounts/"), "Only documentation assets allowed");
    const item = await get(`https://merchantcanvas.com${urlPath}`);
    checks.push({ ...item, bytes: item.bytes.length });
    if (item.status !== 200 || item.sha256 !== asset.sha256) failures.push(`${urlPath}: status/hash mismatch`);
  }
}));

const oldGuide = await get(guide.sourceUrl);
checks.push({ ...oldGuide, bytes: oldGuide.bytes.length });
const oldBaseline = manifest.publicComparison.find((item) => item.kind === "guide");
if (oldGuide.status !== 200 || oldGuide.sha256 !== oldBaseline.liveSha256) failures.push("Original live guide changed or unavailable");
const sitemap = await get("https://merchantcanvas.com/sitemap.xml");
checks.push({ ...sitemap, bytes: sitemap.bytes.length });
for (const route of ["/docs", "/docs/multitier-discounts"]) {
  if (!sitemap.bytes.toString("utf8").includes(`<loc>https://merchantcanvas.com${route}</loc>`)) failures.push(`Sitemap missing ${route}`);
}
const report = { checkedAt: new Date().toISOString(), passed: failures.length === 0, failures, checks, oldHostModified: false, mailSent: false, mtdCodeChanged: false };
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ passed: report.passed, checks: checks.length, failures, report: reportPath })}\n`);
if (failures.length) process.exitCode = 1;
