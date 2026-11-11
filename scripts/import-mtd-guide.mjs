/**
 * One-time, explicitly invoked documentation snapshot importer.
 * Reads the MTD public directory; never runs or writes in the MTD repository.
 * Build/CI consume the checked-in JSON and assets, not this external source.
 * Reimporting is a reviewed content update, not an automatic build step.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = await realpath("F:/Shopify/merchantcanvas.com");
const sourceRoot = await realpath("F:/Shopify/multi-tier-discounts/public");
const sourceUrl = "https://multi-tier-discounts.barisarslan.com.tr/user-guide.html";
const mediaBase = "/docs/multitier-discounts/media";
const tutorialBase = "/docs/multitier-discounts/tutorials";
const reportPath = "growth/reports/daily/2026-11-11-docs-import.json";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const inside = (root, candidate) => {
  const rel = path.relative(root.toLowerCase(), candidate.toLowerCase());
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
};

async function sourcePath(relative) {
  const resolved = await realpath(path.resolve(sourceRoot, relative));
  assert(inside(sourceRoot, resolved), `Source escapes public directory: ${relative}`);
  return resolved;
}

async function outputPath(relative) {
  const resolved = path.resolve(projectRoot, relative);
  assert(inside(projectRoot, resolved), `Write escapes workspace: ${relative}`);
  let ancestor = path.dirname(resolved);
  for (;;) {
    try {
      assert(inside(projectRoot, await realpath(ancestor)), "Write ancestor resolves outside workspace");
      break;
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
      ancestor = path.dirname(ancestor);
    }
  }
  try {
    assert(inside(projectRoot, await realpath(resolved)), "Existing write target resolves outside workspace");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  return resolved;
}

async function emit(relative, bytes) {
  const destination = await outputPath(relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
}

function imageSize(bytes) {
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  assert.equal(bytes.readUInt16BE(0), 0xffd8, "Only PNG/JPEG documentation images are accepted");
  let offset = 2;
  while (offset < bytes.length) {
    assert.equal(bytes[offset], 0xff, "Invalid JPEG marker");
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const length = bytes.readUInt16BE(offset);
    assert(length >= 2 && offset + length <= bytes.length, "Invalid JPEG segment length");
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  throw new Error("JPEG dimensions not found");
}

function text(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|middot|nbsp|times);/gi, (_, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number(entity.slice(1)));
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", middot: "·", nbsp: " ", times: "×" }[entity.toLowerCase()];
  }).trim();
}

const tags = new Set("p strong em b i a img figure figcaption div span h3 ul ol li table caption thead tbody tr th td details summary dl dt dd code br".split(" "));
const attributes = new Set(["id", "class", "href", "src", "alt", "loading", "width", "height", "target", "rel", "scope", "colspan", "rowspan", "open"]);
function assertTrustedHtml(html) {
  assert(!/<\s*(script|style|iframe|form|input|object|embed|svg)\b/i.test(html), "Active markup is prohibited");
  assert(!/\bon[a-z]+\s*=/i.test(html), "Inline event handlers are prohibited");
  assert(!/<!--|<!DOCTYPE/i.test(html), "No comments/declarations in imported sections");
  for (const match of html.matchAll(/<\/?([a-z][a-z0-9-]*)\b([^>]*)>/gi)) {
    assert(tags.has(match[1].toLowerCase()), `Unapproved HTML tag: ${match[1]}`);
    let residue = match[2];
    residue = residue.replace(/([a-z][a-z0-9-]*)\s*=\s*"([^"]*)"/gi, (_, name, value) => {
      const lower = name.toLowerCase();
      assert(attributes.has(lower), `Unapproved HTML attribute: ${name}`);
      if (lower === "href" || lower === "src") {
        assert(value.startsWith("#") || value.startsWith(`${mediaBase}/`), `Unapproved URL: ${value}`);
      }
      if (lower === "id") assert(/^[a-z][a-z0-9-]*$/.test(value), "Invalid HTML id");
      return "";
    });
    assert(/^[\s/]*$/.test(residue), `Unparsed attributes: ${residue}`);
  }
}

const htmlBytes = await readFile(await sourcePath("user-guide.html"));
const html = htmlBytes.toString("utf8");
const catalogBytes = await readFile(await sourcePath("user-guide-videos.json"));
const catalog = JSON.parse(catalogBytes.toString("utf8"));
assert.equal(catalog.schemaVersion, 1);
assert.equal(catalog.videos.length, 13);
const main = html.match(/<main id="guide-content">([\s\S]*?)<\/main>/)?.[1];
assert(main, "Guide main not found");
const sourceIds = [...main.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(sourceIds).size, sourceIds.length, "Duplicate source guide id");
const imagePaths = [...new Set([...main.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((match) => match[1]))];
assert.equal(imagePaths.length, 29, "Expected exactly 29 referenced guide images");
const assets = [];
const imageRecords = new Map();
const pendingCopies = [];

async function stageAsset(sourceRelative, targetPublicPath, kind) {
  const from = await sourcePath(sourceRelative);
  const bytes = await readFile(from);
  const output = `public${targetPublicPath}`;
  await outputPath(output);
  const dimensions = /\.(jpe?g|png)$/i.test(sourceRelative) ? imageSize(bytes) : {};
  assets.push({ source: sourceRelative.replaceAll("\\", "/"), path: targetPublicPath, kind, bytes: bytes.length, sha256: sha256(bytes), ...dimensions });
  pendingCopies.push({ output, bytes });
  return { bytes, ...dimensions };
}

for (const relative of imagePaths) {
  assert(/^user-guide-assets\/[a-z0-9-]+\.(jpg|png)$/i.test(relative), `Unapproved guide asset path ${relative}`);
  const target = `${mediaBase}/${path.posix.basename(relative)}`;
  const record = await stageAsset(relative, target, "guide-image");
  imageRecords.set(relative, { ...record, target });
}

function convertHtml(value) {
  let converted = value.replace(/(?:href|src)="(user-guide-assets\/[^\"]+)"/g, (whole, source) => {
    assert(imageRecords.has(source), `Unreferenced image link: ${source}`);
    return whole.replace(source, imageRecords.get(source).target);
  });
  converted = converted.replace(/<img\b([^>]*)>/g, (whole, attrs) => {
    const src = attrs.match(/\bsrc="([^"]+)"/)?.[1];
    const record = [...imageRecords.values()].find((image) => image.target === src);
    assert(record, `Unknown imported image ${src}`);
    assert(!/\b(?:width|height)=/.test(attrs), "Unexpected source dimensions require explicit review");
    return `<img${attrs} width="${record.width}" height="${record.height}">`;
  });
  assertTrustedHtml(converted);
  return converted;
}

const tutorialSlots = [];
const sections = [...main.matchAll(/<section id="([^"]+)">([\s\S]*?)<\/section>/g)].map((match) => {
  const id = match[1];
  const heading = match[2].match(/<h2>([\s\S]*?)<\/h2>/);
  assert(heading, `Missing section heading ${id}`);
  const title = text(heading[1]);
  const body = match[2].replace(heading[0], "");
  const parts = [];
  let cursor = 0;
  for (const slot of body.matchAll(/<details class="tutorial" id="tutorial-(\d{2})" data-guide-video="\1">[\s\S]*?<\/details>/g)) {
    if (slot.index > cursor) parts.push({ html: convertHtml(body.slice(cursor, slot.index)) });
    parts.push({ tutorialId: slot[1] });
    tutorialSlots.push(slot[1]);
    cursor = slot.index + slot[0].length;
  }
  if (cursor < body.length) parts.push({ html: convertHtml(body.slice(cursor)) });
  return { id, title, parts };
});
assert.equal(sections.length, 17);
assert.equal(tutorialSlots.length, 13);
assert.equal(new Set(tutorialSlots).size, 13);
const nav = html.match(/<nav aria-label="Guide sections">([\s\S]*?)<\/nav>/)?.[1];
const toc = [...nav.matchAll(/<a href="#([^"]+)">([\s\S]*?)<\/a>/g)].map((match) => ({ id: match[1], label: text(match[2]) }));
assert.deepEqual(toc.map((item) => item.id), sections.map((section) => section.id));
const videos = [];
for (const video of catalog.videos) {
  assert(/^(0[1-9]|1[0-3])$/.test(video.id));
  assert(new RegExp(`^${video.id}-[a-z0-9]+(?:-[a-z0-9]+)*$`).test(video.directory));
  assert(/^[A-Za-z0-9_-]{11}$/.test(video.youtubeId));
  assert(sections.some((section) => section.id === video.section));
  const target = `${tutorialBase}/${video.directory}`;
  const source = `user-guide-videos/${video.directory}`;
  const poster = await stageAsset(`${source}/thumbnail.jpg`, `${target}/thumbnail.jpg`, "tutorial-poster");
  const transcript = await stageAsset(`${source}/transcript.md`, `${target}/transcript.md`, "tutorial-transcript");
  const captions = await stageAsset(`${source}/captions.en.vtt`, `${target}/captions.en.vtt`, "tutorial-captions");
  assert(transcript.bytes.toString("utf8").trim(), "Empty transcript");
  assert(captions.bytes.toString("utf8").startsWith("WEBVTT"), "Invalid captions header");
  videos.push({ ...video, poster: `${target}/thumbnail.jpg`, width: poster.width, height: poster.height, transcript: `${target}/transcript.md`, captions: `${target}/captions.en.vtt` });
}

const header = html.match(/<header class="header">([\s\S]*?)<\/header>/)?.[1];
const footerNote = text(main.match(/<footer><p>([\s\S]*?)<\/p>/)?.[1] ?? "");
assert(footerNote.includes("synthetic Fieldnote Supply") && footerNote.includes("does not announce a production release"));
const data = {
  sourceUrl,
  sourceSha256: sha256(htmlBytes),
  title: text(header.match(/<h1>([\s\S]*?)<\/h1>/)[1]),
  intro: text(header.match(/<\/h1><p>([\s\S]*?)<\/p>/)[1]),
  editionNote: text(header.match(/<p class="meta">([\s\S]*?)<\/p>/)[1]),
  footerNote,
  toc,
  sections,
  videos,
};
assert(data.editionNote.includes("Design preview edition"));
const importedIds = sections.flatMap((section) => [section.id, ...section.parts.flatMap((part) => part.tutorialId ? [`tutorial-${part.tutorialId}`] : [...part.html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))]);
assert.deepEqual(importedIds, sourceIds, "Guide section/tutorial/alias IDs must retain exact order");
const importedHtml = sections.flatMap((section) => section.parts.filter((part) => part.html).map((part) => part.html)).join("");
assert.equal([...importedHtml.matchAll(/<img\b/g)].length, 29);
for (const link of importedHtml.matchAll(/href="#([^"]+)"/g)) assert(importedIds.includes(link[1]), `Unknown internal fragment ${link[1]}`);

const checks = [];
for (const [kind, url, localBytes] of [["guide", sourceUrl, htmlBytes], ["catalog", new URL("user-guide-videos.json", sourceUrl).href, catalogBytes]]) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { "User-Agent": "MerchantCanvas-documentation-import/1.0" } });
    assert.equal(response.status, 200);
    const bytes = Buffer.from(await response.arrayBuffer());
    const normalizedEqual = kind === "catalog"
      ? JSON.stringify(JSON.parse(bytes.toString("utf8"))) === JSON.stringify(JSON.parse(localBytes.toString("utf8")))
      : bytes.toString("utf8").replaceAll("\r\n", "\n").trim() === localBytes.toString("utf8").replaceAll("\r\n", "\n").trim();
    checks.push({ kind, url, status: response.status, localSha256: sha256(localBytes), liveSha256: sha256(bytes), exactBytesEqual: bytes.equals(localBytes), normalizedEqual, liveBytes: bytes.length });
  } catch (error) {
    checks.push({ kind, url, error: error.message, localSha256: sha256(localBytes) });
  }
}

// The live CDN can add markup. Record this explicitly without concealing drift.
const report = {
  date: "2026-11-11",
  operation: "read-only source import into MerchantCanvas; old source/host retained",
  sourceRoot,
  sourceUrl,
  sourceSha256: data.sourceSha256,
  sourceBytes: htmlBytes.length,
  catalogSha256: sha256(catalogBytes),
  publicComparison: checks,
  output: "app/content/mtd-guide.json",
  counts: { sections: sections.length, tutorials: videos.length, guideImages: imagePaths.length, tutorialPosters: 13, transcripts: 13, captions: 13, assets: assets.length },
  sourceIds,
  importedIds,
  preservedSectionText: true,
  tutorialDetailsReplacedWithSlots: true,
  imageDimensions: "native JPEG/PNG headers; no image editing or packages",
  trustedHtmlTags: [...tags].sort(),
  trustedHtmlAttributes: [...attributes].sort(),
  copiedMp4: false,
  sourceModified: false,
  published: false,
  assets,
};

for (const copy of pendingCopies) await emit(copy.output, copy.bytes);
await emit("app/content/mtd-guide.json", `${JSON.stringify(data, null, 2)}\n`);
await emit(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ output: report.output, report: reportPath, counts: report.counts, sourceSha256: report.sourceSha256, publicComparison: checks }, null, 2));
