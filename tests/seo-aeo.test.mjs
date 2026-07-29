import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const SITE_URL = "https://merchantcanvas.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PUBLIC_ROUTES = [
  "/",
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

const PRODUCT_EXPECTATIONS = {
  "/apps/multitier-discounts": {
    prices: ["0", "5.99", "12.99", "24.99"],
    plans: ["Free", "Starter", "Pro", "Plus"],
    availability: [
      "https://schema.org/InStock",
      "https://schema.org/InStock",
      "https://schema.org/InStock",
      "https://schema.org/LimitedAvailability",
    ],
    eligibility: [
      "Available to Shopify stores",
      "Available to Shopify stores",
      "Available to Shopify stores",
      "Eligible Shopify Plus stores only",
    ],
    offerUrl: "https://apps.shopify.com/multitier-discounts",
    downloadUrl: "https://apps.shopify.com/multitier-discounts",
    faqCount: 6,
  },
  "/apps/b2b-quote-approvals": {
    prices: ["19", "39", "79"],
    plans: ["Starter", "Growth", "Pro"],
    availability: [
      "https://schema.org/LimitedAvailability",
      "https://schema.org/LimitedAvailability",
      "https://schema.org/LimitedAvailability",
    ],
    eligibility: [
      "Coming soon — public installation unavailable",
      "Coming soon — public installation unavailable",
      "Coming soon — public installation unavailable",
    ],
    offerUrl:
      "https://merchantcanvas.com/apps/b2b-quote-approvals#packages",
    downloadUrl: undefined,
    faqCount: 5,
  },
};

const ARTICLE_ROUTES = [
  "/resources/shopify-quantity-breaks-guide",
  "/resources/shopify-b2b-quote-approval-workflow",
];

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("seo-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(worker, path) {
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

function matchingTags(html, tagName, attributeName, attributeValue) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))]
    .map((match) => match[0])
    .filter(
      (tag) =>
        attribute(tag, attributeName)?.toLowerCase() ===
        attributeValue.toLowerCase(),
    );
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1];
}

function titleValues(html) {
  return [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((match) =>
    match[1].trim(),
  );
}

function canonicalValues(html) {
  return matchingTags(html, "link", "rel", "canonical").map((tag) =>
    attribute(tag, "href"),
  );
}

function descriptionValues(html) {
  return matchingTags(html, "meta", "name", "description").map((tag) =>
    attribute(tag, "content"),
  );
}

function headingOutline(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(
    (match) => ({
      level: Number(match[1]),
      text: visibleText(match[2]),
    }),
  );
}

function visibleText(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function visiblePageText(html) {
  return visibleText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " "),
  );
}

function jsonLd(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => JSON.parse(match[1]));
}

function graphNodes(documents) {
  return documents.flatMap((document) => {
    if (Array.isArray(document)) return document;
    if (Array.isArray(document["@graph"])) return document["@graph"];
    return [document];
  });
}

function nodeByType(nodes, type) {
  return nodes.find((node) => node["@type"] === type);
}

function nodeById(nodes, id) {
  return nodes.find((node) => node["@id"] === id);
}

function expectedCanonical(route) {
  return route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

function collectKeys(value, output = []) {
  if (!value || typeof value !== "object") return output;
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, output);
    return output;
  }
  for (const [key, item] of Object.entries(value)) {
    output.push(key);
    collectKeys(item, output);
  }
  return output;
}

test("public routes expose a unique, indexable metadata contract", async () => {
  const worker = await loadWorker();
  const records = [];

  for (const route of PUBLIC_ROUTES) {
    const response = await render(worker, route);
    assert.equal(response.status, 200, route);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      route,
    );

    const html = await response.text();
    const titles = titleValues(html);
    const descriptions = descriptionValues(html);
    const canonicals = canonicalValues(html);
    const outline = headingOutline(html);

    assert.equal(titles.length, 1, `${route} title`);
    assert.ok(titles[0], `${route} title content`);
    assert.equal(descriptions.length, 1, `${route} description`);
    assert.ok(descriptions[0], `${route} description content`);
    assert.deepEqual(canonicals, [expectedCanonical(route)], route);
    assert.equal(
      outline.filter((heading) => heading.level === 1).length,
      1,
      `${route} H1`,
    );
    assert.match(html, /<main\b/i, `${route} main content`);
    assert.match(html, /<html[^>]*\blang="en"/i, `${route} language`);

    for (let index = 1; index < outline.length; index += 1) {
      assert.ok(
        outline[index].level <= outline[index - 1].level + 1,
        `${route} skips from H${outline[index - 1].level} ` +
          `"${outline[index - 1].text}" to H${outline[index].level} ` +
          `"${outline[index].text}"`,
      );
    }

    assert.equal(
      matchingTags(html, "meta", "property", "og:title").length,
      1,
      `${route} og:title`,
    );
    assert.equal(
      matchingTags(html, "meta", "property", "og:description").length,
      1,
      `${route} og:description`,
    );
    assert.equal(
      matchingTags(html, "meta", "property", "og:url").length,
      1,
      `${route} og:url`,
    );
    assert.equal(
      matchingTags(html, "meta", "name", "twitter:card").length,
      1,
      `${route} twitter:card`,
    );
    assert.doesNotMatch(
      matchingTags(html, "meta", "name", "robots")
        .map((tag) => attribute(tag, "content"))
        .join(","),
      /\bnoindex\b/i,
      route,
    );

    assert.doesNotThrow(() => jsonLd(html), `${route} JSON-LD`);
    records.push({
      route,
      title: titles[0],
      description: descriptions[0],
      canonical: canonicals[0],
    });
  }

  for (const field of ["title", "description", "canonical"]) {
    assert.equal(
      new Set(records.map((record) => record[field])).size,
      records.length,
      `duplicate ${field}`,
    );
  }
});

test("unknown routes return a useful noindex 404 without a canonical", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/definitely-not-a-real-route");
  assert.equal(response.status, 404);

  const html = await response.text();
  assert.equal(titleValues(html).length, 1);
  assert.match(titleValues(html)[0], /MerchantCanvas/i);
  assert.deepEqual(canonicalValues(html), []);
  assert.match(
    matchingTags(html, "meta", "name", "robots")
      .map((tag) => attribute(tag, "content"))
      .join(","),
    /\bnoindex\b/i,
  );
  assert.match(html, /That page is not in the current portfolio\./);
  assert.match(html, /href="\/apps"/);
  assert.match(html, /href="\/"/);
});

test("sitemap, robots, canonicals, and internal links agree", async () => {
  const worker = await loadWorker();
  const [robots, sitemap, llms] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
  ]);
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );

  assert.deepEqual(
    sitemapUrls,
    PUBLIC_ROUTES.map(expectedCanonical),
  );
  assert.match(robots, /^Sitemap: https:\/\/merchantcanvas\.com\/sitemap\.xml$/m);
  assert.match(
    robots,
    /^Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference$/m,
  );
  assert.match(robots, /^User-agent: OAI-SearchBot$/m);
  assert.match(robots, /^User-agent: ChatGPT-User$/m);
  assert.match(robots, /^User-agent: PerplexityBot$/m);
  assert.match(robots, /^User-agent: ClaudeBot$/m);
  assert.match(robots, /^User-agent: GPTBot$/m);
  for (const agent of ["GPTBot", "CCBot", "Bytespider", "Google-Extended"]) {
    assert.match(
      robots,
      new RegExp(`User-agent: ${agent}\\s+Disallow: /`),
    );
  }

  const inbound = new Map(PUBLIC_ROUTES.map((route) => [route, new Set()]));

  for (const route of PUBLIC_ROUTES) {
    const response = await render(worker, route);
    const html = await response.text();
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const target = href.split(/[?#]/)[0] || "/";
      assert.ok(
        inbound.has(target),
        `${route} links to non-public route ${href}`,
      );
      inbound.get(target).add(route);
    }
  }

  for (const [route, sources] of inbound) {
    assert.ok(
      [...sources].some((source) => source !== route),
      `${route} has no inbound link from another public route`,
    );
  }

  for (const route of [
    "/apps/multitier-discounts",
    "/apps/b2b-quote-approvals",
    "/resources/shopify-quantity-breaks-guide",
    "/resources/shopify-b2b-quote-approval-workflow",
  ]) {
    assert.match(llms, new RegExp(expectedCanonical(route)));
  }
});

test("product JSON-LD matches visible pricing, eligibility, and availability", async () => {
  const worker = await loadWorker();

  for (const [route, expectation] of Object.entries(PRODUCT_EXPECTATIONS)) {
    const response = await render(worker, route);
    const html = await response.text();
    const nodes = graphNodes(jsonLd(html));
    const productUrl = expectedCanonical(route);
    const webPage = nodeById(nodes, `${productUrl}#webpage`);
    const application = nodeById(nodes, `${productUrl}#softwareapplication`);
    const faq = nodeById(nodes, `${productUrl}#faq`);
    const breadcrumb = nodeById(nodes, `${productUrl}#breadcrumb`);
    const availabilityNote = visibleText(
      html.match(
        /<p\b[^>]*class=["'][^"']*\bavailability-note\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/i,
      )?.[1] ?? "",
    );

    assert.equal(nodeById(nodes, ORGANIZATION_ID)?.["@type"], "Organization");
    assert.equal(nodeById(nodes, WEBSITE_ID)?.["@type"], "WebSite");
    assert.equal(webPage?.["@type"], "WebPage");
    assert.deepEqual(webPage?.isPartOf, { "@id": WEBSITE_ID });
    assert.deepEqual(webPage?.mainEntity, {
      "@id": `${productUrl}#softwareapplication`,
    });
    assert.equal(application?.["@type"], "SoftwareApplication");
    assert.deepEqual(application?.provider, { "@id": ORGANIZATION_ID });
    assert.deepEqual(application?.mainEntityOfPage, {
      "@id": `${productUrl}#webpage`,
    });
    assert.equal(application?.downloadUrl, expectation.downloadUrl);

    assert.deepEqual(
      application?.offers.map((offer) => offer.price),
      expectation.prices,
    );
    assert.deepEqual(
      application?.offers.map((offer) =>
        offer.name.replace(`${application.name} `, ""),
      ),
      expectation.plans,
    );
    for (const [index, offer] of (application?.offers ?? []).entries()) {
      assert.ok(offer["@id"]?.startsWith(`${productUrl}#offer-`));
      assert.equal(offer.url, expectation.offerUrl);
      assert.equal(offer.priceCurrency, "USD");
      assert.equal(offer.availability, expectation.availability[index]);
      assert.ok(availabilityNote, `${route} visible availability`);
      assert.match(
        offer.description,
        new RegExp(`${escapeRegExp(availabilityNote)}$`),
      );
      assert.deepEqual(offer.offeredBy, { "@id": ORGANIZATION_ID });
      assert.match(
        offer.description,
        new RegExp(escapeRegExp(expectation.eligibility[index])),
      );
      assert.match(
        visiblePageText(html),
        new RegExp(escapeRegExp(expectation.eligibility[index])),
      );
      assert.match(html, new RegExp(`>\\$?${offer.price}(?:<|\\s)`));
    }

    assert.equal(faq?.["@type"], "FAQPage");
    assert.equal(faq?.mainEntity.length, expectation.faqCount);
    for (const question of faq?.mainEntity ?? []) {
      assert.match(
        visiblePageText(html),
        new RegExp(escapeRegExp(question.name)),
      );
      assert.match(
        visiblePageText(html),
        new RegExp(escapeRegExp(question.acceptedAnswer.text)),
      );
    }

    assert.equal(breadcrumb?.["@type"], "BreadcrumbList");
    assert.deepEqual(
      breadcrumb?.itemListElement.map((item) => item.position),
      [1, 2],
    );
    const visibleBreadcrumb = visibleText(
      html.match(
        /<div\b[^>]*class=["'][^"']*\bbreadcrumbs\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
      )?.[1] ?? "",
    );
    for (const item of breadcrumb?.itemListElement ?? []) {
      assert.match(visibleBreadcrumb, new RegExp(escapeRegExp(item.name)));
    }

    const forbiddenKeys = new Set([
      "aggregateRating",
      "review",
      "installUrl",
    ]);
    for (const key of collectKeys(jsonLd(html))) {
      assert.ok(!forbiddenKeys.has(key), `${route} contains ${key}`);
    }
  }
});

test("article JSON-LD uses real dates and stable publisher relationships", async () => {
  const worker = await loadWorker();

  for (const route of ARTICLE_ROUTES) {
    const response = await render(worker, route);
    const html = await response.text();
    const nodes = graphNodes(jsonLd(html));
    const articleUrl = expectedCanonical(route);
    const webPage = nodeById(nodes, `${articleUrl}#webpage`);
    const article = nodeById(nodes, `${articleUrl}#article`);
    const author = nodeById(nodes, `${SITE_URL}/about#product-team`);
    const breadcrumb = nodeByType(nodes, "BreadcrumbList");

    assert.equal(breadcrumb?.["@id"], `${articleUrl}#breadcrumb`);
    const visibleBreadcrumb = visibleText(
      html.match(
        /<div\b[^>]*class=["'][^"']*\bbreadcrumbs\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
      )?.[1] ?? "",
    );
    for (const item of breadcrumb?.itemListElement ?? []) {
      assert.match(visibleBreadcrumb, new RegExp(escapeRegExp(item.name)));
    }
    assert.equal(webPage?.["@type"], "WebPage");
    assert.deepEqual(webPage?.mainEntity, { "@id": `${articleUrl}#article` });
    assert.equal(article?.["@type"], "Article");
    assert.match(article?.datePublished ?? "", /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(article?.dateModified, article?.datePublished);
    assert.deepEqual(article?.mainEntityOfPage, {
      "@id": `${articleUrl}#webpage`,
    });
    assert.deepEqual(article?.publisher, { "@id": ORGANIZATION_ID });
    assert.deepEqual(article?.author, {
      "@id": `${SITE_URL}/about#product-team`,
    });
    assert.equal(author?.name, "MerchantCanvas product team");
    assert.deepEqual(author?.parentOrganization, {
      "@id": ORGANIZATION_ID,
    });
    assert.match(html, /Prepared by the MerchantCanvas product team/);
  }
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
