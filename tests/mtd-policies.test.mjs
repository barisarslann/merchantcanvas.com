import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

const BASE = "/apps/multitier-discounts";

// Captured 2026-11-15 from the actual listing's extensionless policy URLs.
// The hashes pin every section's normalized visible wording, with only the
// authorized bariis.arslan@gmail.com -> support@merchantcanvas.com replacement.
// Privacy includes the live-only optional-support-chat disclosure.
const POLICIES = [
  {
    route: `${BASE}/privacy-policy`,
    sibling: `${BASE}/terms-of-service`,
    title: "Privacy Policy",
    source: "https://multi-tier-discounts.barisarslan.com.tr/privacy-policy",
    sourceSha256: "65a897e9299e993aa81fff0d476f6bbabcd134f77bb8cf0b5dfce714a4ef195b",
    sections: [
      "67706688fcaaa70077a44a264d51378364d7fba5eb2cf0322b314a203fc706e6",
      "bf6672071f8c49bce5c4c588003a1880f072c39b5a970a4d3818b18cff7f0cb0",
      "f624e58dba7d111e1b9a2225f46df89b6cf71cfe73d429e6302bfcf6bfade26f",
      "64514f0de491166150e59a8d6d702e6ce580bdca0809a1980a82f44186baae5c",
      "b1e4b8c59dc3c76e82d544864221cff680318a00b2cc9d461836c02f527a6a46",
      "74b57fdfe5828922db2cd752a65b45382a25f152af7a622b61299570ddc11cc8",
      "77e38a6f37bc76bdc47235e3b9d32df58473b4aefe6664c08a70a7147c8d3627",
      "2573801e103917e8d82d42cf15cb3fbc31a679eb57a897bbe9b33069adade353",
      "8b473375cdbbde50a8ff081853ba872ba4ff5ae35f704381757d3512cb5be839",
      "334f3e66e46dc33e8f4eec70e8e87031eb3eca58df9d2096a02c3673785e4645",
      "1f1fe92b3e0a9ab7f970829d935a98486b06e00474715d33ccba5fdde9b0c09a",
      "f510b031e972123de5cabe674de6f55ebc677694850a0c92e3b8b97f84e16e42",
      "630dbbec02d4987b9bfdc4f821ccc50fe794b4b45fc9e01e9fb7c270f1633c42",
    ],
  },
  {
    route: `${BASE}/terms-of-service`,
    sibling: `${BASE}/privacy-policy`,
    title: "Terms of Service",
    source: "https://multi-tier-discounts.barisarslan.com.tr/terms-of-service",
    sourceSha256: "c1dd877e1bc35d94fc675e8d636aed3e7d4874889ea6fe89d221aeb5d1069952",
    sections: [
      "b08feec4b5bcd604ae9d9d88a5f91f0252796c7fbc7b03a781ddfebf19f3bbe2",
      "6424abbc577638b0d0ccd134fb63a44faff6463fcb8a1a92928b73c4990625e5",
      "db9534c463e137e45eb91d9c9332ed3d245ccc797c774c5333c17d722dcd6e3c",
      "68fc181a06dd7c979b82f5321bbb21f3d5ccdcc06ae3cc86e1e98d1abfab0f26",
      "b1017b3e8e385f690d0b4a1ecf7bfd4ed2fa2dbec940ab4a642cc8ac78cdeae8",
      "205a553192181647f2cd298c63067e11cdd17c3743d2d4b25709477affb2ea96",
      "9f50cfacbb21289d39263cd7a53cfcd23be8df70ba8c03a54e1586f9e49cc0b4",
      "aadc880c20418602c1a05cc37a8994e9d0e6d05e9ab74a64592e96731506f376",
      "14a5aa36dd42591cb517eeb21dd915748fb7bdbb95cfdd5fbddbcff1c2fe521d",
      "dd969001492ecbb62f38480f815f576d0264ad6e5ff63fdacf70e53b168cd3e2",
      "eee39630a237b443af53ac5395dddff703cd00ded4484bd3140781be3ef453ff",
      "49a3bc432ec9c27c3a55b54f7c69943f7a0ff69c52145c24116b12cbdb881765",
    ],
  },
];

function visibleText(html) {
  return html.replace(/<[^>]+>/g, " ")
    .replace(/&(?:#x27|#39|apos);/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").trim();
}

async function render(route) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("policy-test", `${process.pid}-${Date.now()}-${route}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`https://merchantcanvas.com${route}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, route);
  return response.text();
}

for (const policy of POLICIES) {
  test(`${policy.title} preserves all live app-policy clauses`, async () => {
    const html = await render(policy.route);
    const article = html.match(/<article\b[^>]*class="legal-page"[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(article, "uses the existing legal reading surface");
    const sections = [...article.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)]
      .map(match => createHash("sha256").update(visibleText(match[1])).digest("hex"));
    assert.deepEqual(sections, policy.sections, `wording from ${policy.source} (${policy.sourceSha256})`);
    assert.equal([...article.matchAll(/<h1\b/g)].length, 1);
    assert.ok(article.includes(`<h1>${policy.title}</h1>`));
    assert.match(visibleText(article), /Last updated: March 24, 2026/);
    assert.match(visibleText(article), /Moved to merchantcanvas\.com on November 15, 2026/);
    assert.doesNotMatch(article, /Draft|owner and legal review|bariis\.arslan@gmail\.com/);
    assert.ok(article.includes('href="mailto:support@merchantcanvas.com"'));
    assert.ok(article.includes('href="/docs/multitier-discounts"'));
    assert.ok(visibleText(article).includes("Support"));
    assert.match(article, /href="\/contact\?product=multitier-discounts(?:&amp;|&)intent=support"/);
    assert.ok(article.includes(`href="${policy.sibling}"`));
    assert.doesNotMatch(article, /href="https:\/\/multi-tier-discounts\.barisarslan\.com\.tr/);
    assert.ok(html.includes(`href="https://merchantcanvas.com${policy.route}"`));
  });
}

test("app privacy retains its optional support disclosure without loading chat", async () => {
  const html = await render(`${BASE}/privacy-policy`);
  assert.ok(html.includes('id="optional-support-chat"'));
  assert.ok(html.includes('href="https://www.tawk.to/privacy-policy/"'));
  assert.match(visibleText(html), /No chat connection is made until you choose to open it\./);
  assert.doesNotMatch(html, /(?:src|href)="https:\/\/(?:embed|va)\.tawk\.to/);
});
