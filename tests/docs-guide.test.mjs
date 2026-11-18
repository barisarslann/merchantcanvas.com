import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const SITE = "https://merchantcanvas.com";
const ROUTE = "/docs/multitier-discounts";
const SOURCE_URL = "https://multi-tier-discounts.barisarslan.com.tr/user-guide.html";
const SECTION_IDS = [
  "plans", "quick-start", "concepts", "quantity-breaks", "product-selection",
  "buy-x-get-y", "gifts", "cart-value", "widgets", "launch", "combinations",
  "audience", "theme", "mystery", "settings-analytics", "troubleshooting", "faq",
];
const ALIAS_IDS = ["guide-content", "campaigns", "shipping", "testing", "media"];
const VIDEO_IDS = [
  "3q-XOG5qaf4", "UZHbPTnrfGQ", "opW_bU40dNI", "Tf0xqONliVY", "uY4zaSFcmyc",
  "-q1VEwQvO3E", "vsU4_QBbfdQ", "EWS0f7A3E1s", "Ag8s8T8nJ_M", "S-JrZp_0KU4",
  "X-S9ODd0vTU", "1JjAXnWqSjk", "lL6nMJr7uwg",
];
const TUTORIAL_IDS = VIDEO_IDS.map((_, index) => `tutorial-${String(index + 1).padStart(2, "0")}`);

async function guide() {
  return JSON.parse(await readFile(new URL("../app/content/mtd-guide.json", import.meta.url), "utf8"));
}

function attribute(tag, name) {
  return tag.match(new RegExp(`(?:\\s|<)${name}=["']([^"']*)["']`, "i"))?.[1];
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(match => match[0]);
}

function ids(html) {
  return [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map(match => match[1]);
}

function visibleText(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ").trim();
}

function rasterDimensions(bytes) {
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  assert.equal(bytes.readUInt16BE(0), 0xffd8, "JPEG or PNG raster expected");
  const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let offset = 2;
  while (offset + 8 < bytes.length) {
    while (offset < bytes.length && bytes[offset] !== 0xff) offset++;
    while (offset < bytes.length && bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd8 || marker === 0xd9) continue;
    const length = bytes.readUInt16BE(offset);
    assert.ok(length >= 2, "valid JPEG segment length");
    if (frameMarkers.has(marker)) {
      return { width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  assert.fail("JPEG frame dimensions not found");
}

async function localAsset(publicPath) {
  assert.ok(publicPath.startsWith(`${ROUTE}/`), `docs-local asset: ${publicPath}`);
  assert.doesNotMatch(publicPath, /\\|\.\.|[?#]/, `safe asset path: ${publicPath}`);
  return readFile(new URL(`../public${publicPath}`, import.meta.url));
}

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("docs-test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

test("committed guide preserves all 17 sections and 13 tutorial slots with the current YouTube links", async () => {
  const data = await guide();
  assert.equal(data.sourceUrl, SOURCE_URL);
  assert.match(data.sourceSha256, /^[a-f0-9]{64}$/);
  assert.deepEqual(data.sections.map(section => section.id), SECTION_IDS);
  assert.deepEqual(data.toc.map(section => section.id), SECTION_IDS);
  assert.equal(data.videos.length, 13);
  assert.deepEqual(data.videos.map(video => video.id), VIDEO_IDS.map((_, i) => String(i + 1).padStart(2, "0")));
  assert.deepEqual(data.videos.map(video => video.youtubeId), VIDEO_IDS);
  assert.deepEqual(
    data.sections.flatMap(section => section.parts).filter(part => "tutorialId" in part)
      .map(part => `tutorial-${part.tutorialId}`).sort(),
    [...TUTORIAL_IDS].sort(),
  );
  assert.match(data.editionNote, /Design preview edition/);
  assert.match(data.footerNote, /synthetic Fieldnote Supply/);
  assert.match(data.footerNote, /does not announce a production release/);
});

test("the revised plan tutorials link to matching versioned transcripts and captions", async () => {
  const data = await guide();
  const revised = [
    ["01", "fbf21b7dd719d0f445129bf5f90763635077cee8494a2085ab39d2a1a4114f03", "b14b78006854cdb1f1d102705d38712a70cc4ac26d4a671ad26d58359a5897e6"],
    ["13", "5c171af0093075284c30b2c94f520f04b284a107992056ba226d24042dd050c6", "7293bf5528f7a454929d4e8f2a60e85c77ced2eb8a8e1404f4a2daa4b4b1353f"],
  ];
  for (const [id, transcriptHash, captionHash] of revised) {
    const video = data.videos.find(item => item.id === id);
    const base = `${ROUTE}/tutorials/${video.directory}`;
    assert.equal(video.transcript, `${base}/transcript-2026-11-18.md`);
    assert.equal(video.captions, `${base}/captions-2026-11-18.en.vtt`);
    for (const [asset, hash] of [[video.transcript, transcriptHash], [video.captions, captionHash]]) {
      const normalized = (await localAsset(asset)).toString("utf8").replaceAll("\r\n", "\n");
      assert.equal(createHash("sha256").update(normalized).digest("hex"), hash, asset);
      assert.match(normalized, /one active campaign for new stores/i);
      assert.doesNotMatch(normalized, /Free covers core percentage|Free supports a small core percentage/i);
    }
  }
});

test("the committed import manifest verifies source parity and every copied asset without sibling access", async () => {
  const data = await guide();
  const manifest = JSON.parse(await readFile(new URL("../growth/reports/daily/2026-11-17-docs-import.json", import.meta.url), "utf8"));
  assert.equal(manifest.sourceUrl, SOURCE_URL);
  assert.equal(manifest.sourceSha256, data.sourceSha256);
  assert.deepEqual(manifest.sourceIds, manifest.importedIds);
  assert.deepEqual(manifest.counts, {
    sections: 17, tutorials: 13, guideImages: 28, tutorialPosters: 13,
    transcripts: 13, captions: 13, assets: 67,
  });
  const importedIds = data.sections.flatMap(section => [section.id, ...section.parts.flatMap(part => {
    if ("tutorialId" in part) return [`tutorial-${part.tutorialId}`];
    return ids(part.html);
  })]);
  assert.deepEqual(importedIds, manifest.sourceIds, "section/tutorial/alias order matches recorded source");
  assert.equal(manifest.assets.length, 67);
  assert.equal(new Set(manifest.assets.map(asset => asset.path)).size, 67);
  for (const asset of manifest.assets) {
    const bytes = await localAsset(asset.path);
    assert.equal(bytes.length, asset.bytes, asset.path);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, asset.path);
  }
});

test("trusted imported prose has local dimensioned images and no executable embeds", async () => {
  const data = await guide();
  const html = data.sections.flatMap(section => section.parts).map(part => part.html ?? "").join("\n");
  assert.doesNotMatch(html, /<(?:script|style|iframe|video|object|embed|form|input)\b|\son[a-z]+\s*=|javascript\s*:|data\s*:/i);
  assert.doesNotMatch(html, /multi-tier-discounts\.barisarslan\.com\.tr|user-guide-assets\/|user-guide-videos\//i);
  const images = tags(html, "img");
  assert.equal(images.length, 28);
  const seen = new Set();
  for (const image of images) {
    const src = attribute(image, "src");
    assert.ok(src.startsWith(`${ROUTE}/media/`));
    assert.ok(attribute(image, "alt")?.trim());
    assert.equal(attribute(image, "loading"), "lazy");
    const dimensions = rasterDimensions(await localAsset(src));
    assert.deepEqual({ width: Number(attribute(image, "width")), height: Number(attribute(image, "height")) }, dimensions, src);
    seen.add(src);
  }
  assert.equal(seen.size, 28, "all referenced screenshots retained without duplicates");
  for (const href of tags(html, "a").map(tag => attribute(tag, "href"))) {
    assert.ok(href.startsWith("#") || href.startsWith(`${ROUTE}/media/`), `known imported destination: ${href}`);
  }
});

test("every tutorial has a local poster, English transcript and captions but no copied video file", async () => {
  const data = await guide();
  for (const video of data.videos) {
    assert.ok(SECTION_IDS.includes(video.section));
    assert.match(video.duration, /^\d+:[0-5]\d$/);
    assert.ok(video.title.trim());
    const image = rasterDimensions(await localAsset(video.poster));
    assert.deepEqual(image, { width: video.width, height: video.height }, video.poster);
    const transcript = (await localAsset(video.transcript)).toString("utf8");
    assert.ok(transcript.trim().length > 100, `${video.id} written fallback`);
    const captions = (await localAsset(video.captions)).toString("utf8");
    assert.match(captions, /^WEBVTT/);
    assert.match(captions, /\d{2}:\d{2}:\d{2}\.\d{3} --> /);
  }
  const files = await readdir(new URL(`../public${ROUTE}/`, import.meta.url), { recursive: true });
  assert.ok(files.length >= 67, "28 screenshots and 39 tutorial support files");
  assert.ok(files.every(file => !/\.(?:mp4|webm|mov|m4v)$/i.test(file)), "videos remain on YouTube");
});

test("server guide retains every legacy anchor and tutorial with a non-autoloading video facade", async () => {
  const data = await guide();
  const html = await render(ROUTE);
  const renderedIds = ids(html);
  assert.equal(new Set(renderedIds).size, renderedIds.length, "no duplicate DOM IDs");
  for (const id of [...SECTION_IDS, ...ALIAS_IDS, ...TUTORIAL_IDS]) {
    assert.ok(renderedIds.includes(id), `preserved legacy #${id}`);
  }
  for (const link of tags(html, "a")) {
    const href = attribute(link, "href");
    if (href?.startsWith("#")) assert.ok(renderedIds.includes(href.slice(1)), `resolvable fragment ${href}`);
  }
  assert.equal(tags(html, "details").filter(tag => /^tutorial-\d{2}$/.test(attribute(tag, "id") ?? "")).length, 13);
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1);
  assert.doesNotMatch(html, /<(?:iframe|video)\b/);
  assert.doesNotMatch(html, /(?:src|href)=["']https?:\/\/(?:www\.)?(?:youtube-nocookie\.com|i\.ytimg\.com)/i);
  for (const video of data.videos) {
    assert.ok(html.includes(`href="https://www.youtube.com/watch?v=${video.youtubeId}"`));
    assert.ok(html.includes(`href="${video.transcript}"`));
    assert.ok(html.includes(`href="${video.captions}"`));
  }
  assert.ok(html.includes('href="https://apps.shopify.com/multitier-discounts"'));
  assert.ok(html.includes('href="/apps/multitier-discounts#packages"'));
  assert.match(html, /contact\?product=multitier-discounts/);
  assert.ok(html.includes('href="/apps/multitier-discounts/privacy-policy"'));
  assert.ok(html.includes('href="/apps/multitier-discounts/terms-of-service"'));
  assert.match(visibleText(html), /Design preview edition/);
  assert.match(visibleText(html), /synthetic Fieldnote Supply/);
});

test("documentation has its own canonical and breadcrumb without duplicating the watch-page schema", async () => {
  const html = await render(ROUTE);
  const documents = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(match => JSON.parse(match[1]));
  const nodes = documents.flatMap(document => document["@graph"] ?? [document]);
  const page = nodes.find(node => node["@type"] === "WebPage");
  const crumbs = nodes.find(node => node["@type"] === "BreadcrumbList");
  assert.equal(page?.url, `${SITE}${ROUTE}`);
  assert.ok(crumbs?.itemListElement.some(item => item.name === "Documentation" && item.item === `${SITE}/docs`));
  assert.equal(crumbs.itemListElement.at(-1).item, `${SITE}${ROUTE}`);
  assert.ok(nodes.every(node => !["VideoObject", "AggregateRating", "Review", "SoftwareApplication"].includes(node["@type"])));
  assert.deepEqual(tags(html, "link").filter(tag => attribute(tag, "rel") === "canonical").map(tag => attribute(tag, "href")), [`${SITE}${ROUTE}`]);
  const index = await render("/docs");
  assert.ok(index.includes(`href="${ROUTE}"`));
});
