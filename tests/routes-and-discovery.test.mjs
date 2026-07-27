import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("route-test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
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

test("renders every required public route with metadata", async () => {
  const routes = [
    "/apps",
    "/apps/multitier-discounts",
    "/apps/b2b-quote-approvals",
    "/resources",
    "/resources/shopify-quantity-breaks-guide",
    "/resources/shopify-b2b-quote-approval-workflow",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /<title>.+MerchantCanvas<\/title>/i, route);
    assert.match(html, /rel="canonical"/i, route);
  }
});

test("ships crawler, AI summary, sitemap, evidence, and Pages assets", async () => {
  const requiredAssets = [
    "public/images/multitier-campaign-rules.jpg",
    "public/images/multitier-analytics.jpg",
    "public/robots.txt",
    "public/sitemap.xml",
    "public/llms.txt",
    "public/_headers",
  ];

  await Promise.all(
    requiredAssets.map((path) => access(new URL(`../${path}`, import.meta.url))),
  );

  const [robots, llms, sitemap] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /OAI-SearchBot/);
  assert.match(robots, /GPTBot/);
  assert.match(llms, /MultiTier Discounts/);
  assert.match(llms, /B2B Quote Approvals/);
  assert.match(sitemap, /shopify-quantity-breaks-guide/);
  assert.match(sitemap, /shopify-b2b-quote-approval-workflow/);
});
