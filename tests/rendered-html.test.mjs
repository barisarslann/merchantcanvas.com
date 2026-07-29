import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the MerchantCanvas portfolio and endorsement system", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /MultiTier Discounts for Shopify promotions/i);
  assert.match(html, /Shopify tiered discounts, clearly controlled\./i);
  assert.match(html, /MultiTier Discounts/);
  assert.match(html, /B2B Quote Approvals/);
  assert.match(html, /Install from Shopify/);
  assert.match(html, /Coming soon/);
  assert.match(html, /merchantcanvas-lockup-light\.svg/);
  assert.match(html, /merchantcanvas-lockup-dark\.svg/);
  assert.match(html, /\/og\.png/);
  assert.match(html, /aria-controls="mobile-navigation"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /aria-label="Toggle color theme"/);
  assert.match(html, /id="main-content" tabindex="-1"/);
  assert.match(html, /aria-label="Choose a MerchantCanvas app"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("ships the complete production brand system", async () => {
  const requiredAssets = [
    "public/brand/merchantcanvas-lockup-color.svg",
    "public/brand/merchantcanvas-lockup-light.svg",
    "public/brand/merchantcanvas-lockup-dark.svg",
    "public/brand/merchantcanvas-lockup-ink.svg",
    "public/brand/merchantcanvas-lockup-reverse.svg",
    "public/brand/merchantcanvas-lockup-white.svg",
    "public/brand/merchantcanvas-symbol-color.svg",
    "public/brand/merchantcanvas-symbol-light.svg",
    "public/brand/merchantcanvas-symbol-dark.svg",
    "public/brand/merchantcanvas-symbol-ink.svg",
    "public/brand/merchantcanvas-symbol-white.svg",
    "public/brand/merchantcanvas-app-icon.svg",
    "public/brand/merchantcanvas-app-icon-light.svg",
    "public/brand/merchantcanvas-app-icon-dark.svg",
    "public/brand/merchantcanvas-app-icon-512.png",
    "public/favicon.svg",
    "public/favicon-light.svg",
    "public/favicon-dark.svg",
    "public/favicon-32.png",
    "public/apple-touch-icon.png",
    "public/og.png",
    "docs/brand/README.md",
    "docs/brand/production-proof.svg",
    "docs/brand/production-proof.png",
    "docs/brand/explorations/direction-01-register.svg",
    "docs/brand/explorations/direction-02-offset-planes.svg",
    "docs/brand/explorations/direction-03-joinery.svg",
    "docs/brand/incorrect-use-examples.svg",
  ];

  await Promise.all(
    requiredAssets.map((path) => access(new URL(`../${path}`, import.meta.url))),
  );
  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));

  const [packageJson, layout, guide, rootReadme] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../docs/brand/README.md", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /width: 1200/);
  assert.match(layout, /height: 630/);
  assert.match(guide, /trademark\/conflict check/i);
  assert.match(rootReadme, /Pre-launch/i);
});
