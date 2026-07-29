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
  assert.match(robots, /ChatGPT-User/);
  assert.match(robots, /PerplexityBot/);
  assert.match(robots, /ClaudeBot/);
  assert.match(robots, /Google-Extended[\s\S]*Disallow: \//);
  assert.match(llms, /MultiTier Discounts/);
  assert.match(llms, /B2B Quote Approvals/);
  assert.match(llms, /apps\.shopify\.com\/multitier-discounts/);
  assert.match(llms, /\$24\.99\/month/);
  assert.match(sitemap, /shopify-quantity-breaks-guide/);
  assert.match(sitemap, /shopify-b2b-quote-approval-workflow/);
});

test("ships accessible form defaults and product answer markup", async () => {
  const [contactResponse, productResponse] = await Promise.all([
    render("/contact"),
    render("/apps/multitier-discounts"),
  ]);
  const [contactHtml, productHtml] = await Promise.all([
    contactResponse.text(),
    productResponse.text(),
  ]);

  assert.match(contactHtml, /Required fields are marked below\./);
  assert.match(
    contactHtml,
    /<option[^>]*selected[^>]*>General question<\/option>/,
  );
  assert.match(productHtml, /"@type":"FAQPage"/);
  assert.match(
    productHtml,
    /https:\/\/apps\.shopify\.com\/multitier-discounts/,
  );
  assert.match(productHtml, /Eligible Shopify Plus stores only/);
  assert.doesNotMatch(
    productHtml,
    /official public install URL is still awaiting owner confirmation/i,
  );
  assert.match(
    productHtml,
    /role="img" aria-label="MultiTier Discounts workflow"/,
  );
  assert.match(productHtml, /src="\/images\/multitier-campaign-rules\.jpg"/);
  assert.doesNotMatch(productHtml, /\/_vinext\/image/);
});

test("MTD install calls to action and B2B coming-soon status stay truthful", async () => {
  const installUrl = "https://apps.shopify.com/multitier-discounts";
  const installRoutes = [
    "/",
    "/apps",
    "/apps/multitier-discounts",
    "/resources/shopify-quantity-breaks-guide",
  ];

  for (const route of installRoutes) {
    const response = await render(route);
    const html = await response.text();
    const installAnchors = [
      ...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi),
    ].filter((match) => /Install from Shopify/i.test(match[2]));

    assert.ok(installAnchors.length > 0, `${route} install CTA`);
    for (const anchor of installAnchors) {
      assert.equal(anchor[1], installUrl, `${route} install destination`);
    }
  }

  const b2bResponse = await render("/apps/b2b-quote-approvals");
  const b2bHtml = await b2bResponse.text();
  const b2bInstallAnchors = [
    ...b2bHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi),
  ].filter((match) => /Install from Shopify/i.test(match[2]));

  assert.match(b2bHtml, /Coming soon/i);
  assert.match(b2bHtml, /Request a launch update/i);
  assert.equal(b2bInstallAnchors.length, 0, "B2B product has no install CTA");
  assert.doesNotMatch(b2bHtml, /"downloadUrl":/i);
});
