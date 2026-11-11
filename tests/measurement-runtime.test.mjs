import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const consentKey = "merchantcanvas-consent";
const attributionKey = "merchantcanvas-attribution";
const grant = (advertising = false) => JSON.stringify({
  version: 2, analytics: true, advertising, updatedAt: "test",
});

// This harness evaluates the application modules themselves, not a rewritten
// tracker. All vendor script elements, storage and queues stay inside this VM.
function harness(options = {}) {
  let currentUrl = new URL(options.url ?? "https://merchantcanvas.com/contact");
  const local = new Map(Object.entries(options.local ?? {}));
  const session = new Map(Object.entries(options.session ?? {}));
  const failures = { ...(options.failures ?? {}) };
  const timers = new Map();
  const listeners = new Map();
  const scripts = new Map();
  const appendedScripts = [];
  const historyCalls = [];
  const reloads = [];
  const effects = [];
  const cookieWrites = [];
  let nextTimer = 0;

  class TestEvent {
    constructor(type, init = {}) { this.type = type; Object.assign(this, init); }
  }
  class TestCustomEvent extends TestEvent {
    constructor(type, init = {}) { super(type, init); this.detail = init.detail; }
  }
  const storage = (kind, values) => ({
    getItem(key) {
      if (failures[`${kind}.get`]) throw new Error("storage read denied");
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      if (failures[`${kind}.set`]) throw new Error("storage write denied");
      values.set(key, String(value));
    },
    removeItem(key) {
      if (failures[`${kind}.remove`]) throw new Error("storage remove denied");
      values.delete(key);
    },
    key(index) { return [...values.keys()][index] ?? null; },
    get length() { return values.size; },
  });
  const localStorage = storage("local", local);
  const sessionStorage = storage("session", session);
  const location = {
    get href() { return currentUrl.href; },
    set href(value) { currentUrl = new URL(value, currentUrl); },
    get search() { return currentUrl.search; },
    get pathname() { return currentUrl.pathname; },
    get origin() { return currentUrl.origin; },
    get hostname() { return currentUrl.hostname; },
    get hash() { return currentUrl.hash; },
    reload() { reloads.push(currentUrl.href); },
    assign(value) { currentUrl = new URL(value, currentUrl); },
  };
  const history = {
    state: { nextRouter: "preserve-me" },
    replaceState(state, title, url) {
      if (failures.history) throw new Error("history unavailable");
      historyCalls.push({ state, title, url });
      this.state = state;
      if (url) currentUrl = new URL(url, currentUrl);
    },
  };
  const win = {
    location, history,
    setTimeout(callback, delay) {
      const id = ++nextTimer;
      timers.set(id, { callback, delay });
      return id;
    },
    clearTimeout(id) { timers.delete(id); },
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(listener);
    },
    removeEventListener(type, listener) { listeners.get(type)?.delete(listener); },
    dispatchEvent(event) {
      for (const listener of listeners.get(event.type) ?? []) listener(event);
      return true;
    },
  };
  Object.defineProperties(win, {
    localStorage: { get() {
      if (failures["local.getter"]) throw new Error("storage property denied");
      return localStorage;
    } },
    sessionStorage: { get() {
      if (failures["session.getter"]) throw new Error("storage property denied");
      return sessionStorage;
    } },
  });
  const doc = {
    documentElement: { dataset: {}, style: {} },
    referrer: options.referrer ?? "",
    title: "MerchantCanvas test page",
    head: { appendChild(script) {
      scripts.set(script.id, script);
      appendedScripts.push({ id: script.id, src: script.src });
    } },
    createElement() {
      const script = { remove() { scripts.delete(script.id); } };
      return script;
    },
    getElementById(id) { return scripts.get(id) ?? null; },
    querySelectorAll() { return [...scripts.values()]; },
    get cookie() { return options.cookie ?? ""; },
    set cookie(value) { cookieWrites.push(value); },
  };
  const env = {
    NEXT_PUBLIC_GA4_ID: "G-TEST",
    NEXT_PUBLIC_GOOGLE_ADS_ID: "AW-TEST",
    NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: "OLD_LEAD",
    NEXT_PUBLIC_GOOGLE_ADS_INSTALL_CONVERSION_LABEL: "INSTALL_INTENT",
    NEXT_PUBLIC_META_PIXEL_ID: "META-TEST",
    ...options.env,
  };
  const context = vm.createContext({
    window: win, document: doc, URL, URLSearchParams, Date, console,
    Event: TestEvent, CustomEvent: TestCustomEvent,
    queueMicrotask, setTimeout: win.setTimeout, clearTimeout: win.clearTimeout,
    process: { env },
  });
  const modules = new Map();
  function load(relative, from = repo) {
    let filename = path.resolve(from, relative);
    if (!existsSync(filename)) {
      filename = [".ts", ".tsx", ".js"].map((extension) => filename + extension)
        .find(existsSync);
    }
    if (!filename) throw new Error(`Cannot resolve test module ${relative}`);
    if (modules.has(filename)) return modules.get(filename).exports;
    assert.ok(filename.startsWith(repo + path.sep), "VM modules stay in the repository");
    const source = readFileSync(filename, "utf8");
    const output = ts.transpileModule(source, {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        allowJs: true,
      },
    }).outputText;
    const vmModule = { exports: {} };
    modules.set(filename, vmModule);
    const require = (specifier) => {
      if (specifier === "react") return {
        useEffect(callback) { effects.push(callback); },
        useRef(value) { return { current: value }; },
      };
      if (specifier === "react/jsx-runtime") return { jsx: () => null, jsxs: () => null };
      if (specifier.startsWith(".")) return load(specifier, path.dirname(filename));
      throw new Error(`Unexpected VM dependency ${specifier}`);
    };
    const run = vm.runInContext(`(function(require,module,exports){${output}\n})`, context,
      { filename });
    run(require, vmModule, vmModule.exports);
    return vmModule.exports;
  }
  const analytics = load("./app/components/Analytics.tsx");
  const privacy = () => load("./app/lib/privacy.ts");
  return {
    analytics, privacy, load, win, doc, local, session, failures, timers, scripts,
    appendedScripts, history, historyCalls, reloads, cookieWrites,
    start() {
      analytics.Analytics();
      const cleanups = effects.splice(0).map((effect) => effect());
      return () => cleanups.forEach((cleanup) => cleanup?.());
    },
    google() { return [...(win.dataLayer ?? [])].map((entry) => Array.from(entry)); },
    meta() { return [...(win.fbq?.queue ?? [])]; },
    emitConsent() { win.dispatchEvent(new TestEvent("merchantcanvas:consent")); },
    advanceTimers() {
      const pending = [...timers.values()];
      timers.clear();
      for (const timer of pending) timer.callback();
    },
  };
}

function assertNoClickIds(value) {
  assert.doesNotMatch(JSON.stringify(value), /gclid|fbclid|wbraid|gbraid|GCLICK|FBCLICK|WBCLICK|GBCLICK/i);
}

test("attribution parser permits exactly five bounded campaign strings", () => {
  const h = harness();
  const attribution = h.load("./app/lib/attribution.js");
  const parsed = attribution.parseAttribution(JSON.stringify({
    utm_source: "partner", utm_medium: "email", utm_campaign: "setup",
    utm_content: "guide", utm_term: "quantity", gclid: "GCLICK", unknown: "secret",
  }));
  assert.deepEqual(Object.keys(parsed).sort(), ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].sort());
  assert.equal(parsed.utm_source, "partner");
  assert.equal(Object.keys(attribution.parseAttribution(JSON.stringify({ utm_source: "x".repeat(257) }))).length, 0);
  assert.equal(Object.keys(attribution.parseAttribution(" ".repeat(8193))).length, 0);
  assert.equal(Object.keys(attribution.parseAttribution(JSON.stringify({ utm_source: "bad\u0000value" }))).length, 0);
});

for (const kind of ["local", "session"]) {
  for (const operation of ["getter", "get", "set", "remove"]) {
    test(`safe storage guards ${kind} ${operation} separately`, () => {
      const h = harness({ failures: { [`${kind}.${operation}`]: true } });
      const storageApi = h.load("./app/lib/storage.js");
      const storageName = kind === "local" ? "localStorage" : "sessionStorage";
      const read = storageApi.safeReadStorage(storageName, "test");
      assert.equal(read.available, !["getter", "get"].includes(operation));
      assert.equal(read.value, null);
      assert.equal(storageApi.safeWriteStorage(storageName, "test", "value"), !["getter", "set"].includes(operation));
      assert.equal(storageApi.safeRemoveStorage(storageName, "test"), !["getter", "remove"].includes(operation));
    });
  }
}

for (const [label, local, failures] of [
  ["absent", {}, {}],
  ["essential", { [consentKey]: "essential" }, {}],
  ["invalid", { [consentKey]: "{not-json" }, {}],
  ["storage getter denied", { [consentKey]: grant(true) }, { "local.getter": true }],
  ["storage getItem denied", { [consentKey]: grant(true) }, { "local.get": true }],
]) {
  test(`${label} consent starts no optional providers or events`, () => {
    const h = harness({ local, failures });
    assert.doesNotThrow(() => h.start());
    assert.equal(h.analytics.trackEvent("contact_intent", { action: "email_prepare" }), false);
    assert.equal(h.appendedScripts.length, 0);
    assert.equal(h.google().filter(([command]) => command === "event" || command === "config").length, 0);
    assert.equal(h.meta().filter(([, event]) => event === "PageView").length, 0);
  });
}

test("analytics-only keeps UTM attribution but strips advertising IDs from measured URLs and internal links", () => {
  const h = harness({
    local: { [consentKey]: grant() },
    url: "https://merchantcanvas.com/contact?product=multitier-discounts&utm_source=partner&gclid=GCLICK&fbclid=FBCLICK&wbraid=WBCLICK&gbraid=GBCLICK#pricing",
    referrer: "https://example.com/?gclid=GCLICK&fbclid=FBCLICK&utm_source=source",
    session: { [attributionKey]: JSON.stringify({ gclid: "GCLICK", fbclid: "FBCLICK", utm_medium: "email", private: "must-drop" }) },
  });
  h.start();
  h.analytics.trackEvent("contact_intent", { action: "email_prepare", method: "mailto" });
  assertNoClickIds(h.google().filter(([command]) => command === "event" || command === "config"));
  assertNoClickIds(h.session.get(attributionKey));
  const attribution = JSON.parse(h.session.get(attributionKey));
  assert.equal(attribution.utm_source, "partner");
  assert.equal(attribution.utm_medium, "email");
  assert.equal(attribution.private, undefined);
  assert.equal(h.appendedScripts.some(({ id }) => id === "merchantcanvas-meta"), false);
  const href = h.analytics.preserveAttributionHref("/apps/multitier-discounts?product=keep#plans");
  assertNoClickIds(href);
  assert.match(href, /product=keep/);
  assert.match(href, /utm_source=partner/);
  assert.match(href, /#plans$/);
  assertNoClickIds(h.win.location.href);
  assert.equal(new URL(h.win.location.href).searchParams.get("product"), "multitier-discounts");
  assert.equal(new URL(h.win.location.href).hash, "#pricing");
  assert.deepEqual(h.history.state, { nextRouter: "preserve-me" });
});

test("essential consent neither saves attribution nor carries campaign parameters into links", () => {
  const h = harness({
    local: { [consentKey]: "essential" },
    url: "https://merchantcanvas.com/?utm_source=partner&gclid=GCLICK",
    session: { [attributionKey]: JSON.stringify({ utm_source: "stale", fbclid: "FBCLICK" }) },
  });
  h.start();
  assert.equal(h.session.has(attributionKey), false);
  assert.equal(h.analytics.preserveAttributionHref("/contact?product=multitier-discounts#form"), "/contact?product=multitier-discounts#form");
});

test("blocked history cleanup cannot leak the address-bar click IDs into measured page URLs", () => {
  const h = harness({
    local: { [consentKey]: grant() },
    url: "https://merchantcanvas.com/contact?product=multitier-discounts&gclid=GCLICK&fbclid=FBCLICK#form",
    failures: { history: true },
  });
  assert.doesNotThrow(() => h.start());
  h.analytics.trackEvent("contact_intent", { action: "email_prepare" });
  assertNoClickIds(h.google().filter(([command]) => command === "config" || command === "event"));
  assert.match(h.win.location.href, /gclid=GCLICK/);
});

test("advertising consent may initialize providers but never forwards click IDs in custom event payloads", () => {
  const h = harness({
    local: { [consentKey]: grant(true) },
    url: "https://merchantcanvas.com/?utm_source=partner&gclid=GCLICK&fbclid=FBCLICK",
  });
  h.start();
  h.analytics.trackEvent("view_product", { app: "multitier-discounts", gclid: "GCLICK", fbclid: "FBCLICK" });
  const events = h.google().filter(([command]) => command === "event");
  assertNoClickIds(events);
  assertNoClickIds(h.meta().filter(([, event]) => event === "ViewContent"));
  assert.ok(h.appendedScripts.some(({ id }) => id === "merchantcanvas-meta"));
});

test("mail preparation cannot become a Meta Lead or Google Ads lead conversion", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  h.start();
  h.analytics.trackEvent("contact_intent", {
    action: "email_prepare", method: "mailto", placement: "contact_form", topic: "General question",
  });
  assert.equal(h.meta().some(([, event]) => event === "Lead"), false);
  assert.equal(h.google().some(([command, event]) => command === "event" && event === "conversion"), false);
  assert.equal(h.google().filter(([command, event]) => command === "event" && event === "contact_intent").length, 1);
});

test("stale lead callers and unexpected personal-data parameters cannot enter measurement", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  h.start();
  assert.equal(h.analytics.trackEvent("lead_submit", { topic: "stale bundle" }), false);
  h.analytics.trackEvent("contact_intent", {
    action: "email_prepare", name: "Private Person", email: "private@example.com",
    store: "private-shop.myshopify.com", message: "Private merchant request",
    gclid: "GCLICK", fbclid: "FBCLICK",
  });
  const events = h.google().filter(([command]) => command === "event");
  assertNoClickIds(events);
  assert.doesNotMatch(JSON.stringify(events), /Private|private|lead_submit/);
  assert.equal(h.meta().some(([, name]) => name === "Lead"), false);
});

test("install click remains InstallIntent rather than an installation or sale", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  h.start();
  h.analytics.trackEvent("install_intent", { app: "multitier-discounts" });
  assert.ok(h.meta().some(([command, name]) => command === "trackCustom" && name === "InstallIntent"));
  assert.equal(h.meta().some(([, name]) => ["Purchase", "CompleteRegistration", "Install"].includes(name)), false);
  const conversion = h.google().find(([command, name]) => command === "event" && name === "conversion");
  assert.equal(conversion?.[2].send_to, "AW-TEST/INSTALL_INTENT");
});

for (const stored of [
  "{broken", "[]", "null", "true", "\"text\"",
  JSON.stringify({ utm_source: { nested: "not-a-string" }, utm_medium: ["not-a-string"], fbclid: "FBCLICK" }),
  JSON.stringify({ utm_source: "x".repeat(100000), gclid: "GCLICK" }),
]) {
  test(`malformed or oversized attribution is safe (${stored.slice(0, 35)})`, () => {
    const h = harness({ local: { [consentKey]: grant() }, session: { [attributionKey]: stored } });
    assert.doesNotThrow(() => h.start());
    assert.doesNotThrow(() => h.analytics.trackEvent("view_product", { app: "multitier-discounts" }));
    assertNoClickIds(h.google().filter(([command]) => command === "event"));
    const payload = h.google().find(([command]) => command === "event")?.[2] ?? {};
    if (payload.utm_source !== undefined) {
      assert.equal(typeof payload.utm_source, "string");
      assert.ok(payload.utm_source.length <= 256);
    }
    assert.notEqual(typeof payload.utm_medium, "object");
  });
}

for (const operation of ["getter", "get", "set", "remove"]) {
  test(`session storage ${operation} failure cannot throw or restore rejected IDs`, () => {
    const h = harness({
      local: { [consentKey]: grant() },
      session: { [attributionKey]: JSON.stringify({ utm_source: "partner", gclid: "GCLICK", fbclid: "FBCLICK" }) },
      failures: { [`session.${operation}`]: true },
    });
    assert.doesNotThrow(() => h.start());
    assert.doesNotThrow(() => h.analytics.trackEvent("view_product", { app: "multitier-discounts" }));
    assertNoClickIds(h.google().filter(([command]) => command === "event"));
  });
}

test("a failed grant is denied in this document and reported as unsaved", () => {
  const h = harness({ failures: { "local.set": true } });
  h.start();
  assert.equal(h.privacy().saveConsentChoice("analytics-advertising"), false);
  assert.equal(h.privacy().readConsent()?.analytics, false);
  assert.equal(h.privacy().readConsent()?.advertising, false);
  assert.equal(h.analytics.trackEvent("install_intent"), false);
  assert.equal(h.appendedScripts.length, 0);
  assert.equal(h.reloads.length, 0);
});

test("silent storage write failure cannot be reported as a persisted grant", () => {
  const h = harness();
  h.win.localStorage.setItem = () => {};
  h.start();
  assert.equal(h.privacy().saveConsentChoice("analytics-advertising"), false);
  assert.equal(h.privacy().readConsent()?.analytics, false);
  assert.equal(h.appendedScripts.length, 0);
});

test("failed revocation persistence overrides an old advertising grant without a stale-grant reload", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  h.start();
  h.failures["local.set"] = true;
  h.failures["local.remove"] = true;
  assert.equal(h.privacy().saveConsentChoice("essential"), false);
  assert.equal(h.privacy().readConsent()?.analytics, false);
  assert.equal(h.privacy().readConsent()?.advertising, false);
  const eventCount = h.google().filter(([command]) => command === "event").length;
  assert.equal(h.analytics.trackEvent("contact_intent"), false);
  assert.equal(h.google().filter(([command]) => command === "event").length, eventCount);
  assert.equal(h.reloads.length, 0);
  assert.equal(h.session.has(attributionKey), false);
});

test("withdrawal discards MerchantCanvas's unconsumed granted commands before a late vendor can replay them", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  h.start();
  h.analytics.trackEvent("install_intent", { product: "multitier-discounts" });
  assert.ok(h.google().some(([command, name]) => command === "event" && name === "conversion"));
  // The mock loader deliberately has not fired onload: these are pending
  // commands, not proof that a collector has received anything.
  h.failures["local.set"] = true;
  h.failures["local.remove"] = true;
  assert.equal(h.privacy().saveConsentChoice("essential"), false);
  const pending = h.google();
  assert.equal(pending.some(([command, action, value]) => command === "consent" &&
    ["update", "default"].includes(action) && Object.values(value).includes("granted")), false);
  assert.equal(pending.some(([command]) => command === "config" || command === "event"), false);
  assert.equal(h.scripts.size, 0);
  assert.equal(h.reloads.length, 0);
});

test("withdrawal does not empty another integration's dataLayer", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  const sentinel = ["external-integration", "not-owned-by-MerchantCanvas"];
  h.win.dataLayer = [sentinel];
  h.win.gtag = (...args) => h.win.dataLayer.push(args);
  h.start();
  h.analytics.trackEvent("install_intent", { product: "multitier-discounts" });
  assert.equal(h.privacy().saveConsentChoice("essential"), true);
  assert.ok(h.win.dataLayer.includes(sentinel));
});

test("own queue cleanup preserves foreign entries sharing its dataLayer", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  const before = ["another-integration", "queued-before-MerchantCanvas"];
  const after = ["another-integration", "queued-after-MerchantCanvas"];
  h.win.dataLayer = [before];
  h.start();
  h.analytics.trackEvent("install_intent", { product: "multitier-discounts" });
  h.win.dataLayer.push(after);
  assert.equal(h.privacy().saveConsentChoice("essential"), true);
  assert.ok(h.win.dataLayer.includes(before));
  assert.ok(h.win.dataLayer.includes(after));
  assert.equal(h.google().some(([command, name]) => command === "event" && name === "conversion"), false);
});

test("withdrawal does not pretend to recall commands already processed by a loaded vendor", () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  h.start();
  const script = h.scripts.get("merchantcanvas-gtag");
  assert.equal(typeof script?.onload, "function");
  script.onload();
  h.analytics.trackEvent("install_intent", { product: "multitier-discounts" });
  const historicalConversion = h.win.dataLayer.find((entry) =>
    entry[0] === "event" && entry[1] === "conversion");
  assert.ok(historicalConversion);
  assert.equal(h.privacy().saveConsentChoice("essential"), true);
  assert.ok(h.win.dataLayer.includes(historicalConversion));
  assert.equal(h.analytics.trackEvent("install_intent"), false);
  const consentUpdates = h.google().filter(([command, action]) => command === "consent" && action === "update");
  assert.equal(consentUpdates.at(-1)[2].analytics_storage, "denied");
  assert.equal(consentUpdates.at(-1)[2].ad_storage, "denied");
});

test("advertising downgrade clears denied context, preserving router state and legitimate query/hash", () => {
  const h = harness({
    local: { [consentKey]: grant(true) },
    url: "https://merchantcanvas.com/contact?product=multitier-discounts&utm_source=partner&gclid=GCLICK&fbclid=FBCLICK#form",
  });
  h.start();
  assert.equal(h.privacy().saveConsentChoice("analytics"), true);
  assertNoClickIds(h.win.location.href);
  assertNoClickIds(h.session.get(attributionKey));
  assert.equal(new URL(h.win.location.href).searchParams.get("product"), "multitier-discounts");
  assert.equal(new URL(h.win.location.href).hash, "#form");
  assert.deepEqual(h.history.state, { nextRouter: "preserve-me" });
  assert.equal(h.privacy().readConsent()?.advertising, false);
  assert.equal(h.privacy().saveConsentChoice("essential"), true);
  assert.equal(h.session.has(attributionKey), false);
  assert.equal(h.privacy().saveConsentChoice("analytics-advertising"), true);
  assertNoClickIds(h.session.get(attributionKey));
});

test("an undeletable withdrawn session cannot restore old campaign context on reconsent", () => {
  const h = harness({
    local: { [consentKey]: grant(true) },
    session: { [attributionKey]: JSON.stringify({ utm_source: "old-campaign", fbclid: "FBCLICK" }) },
    failures: { "session.remove": true, "session.set": true },
  });
  h.start();
  assert.equal(h.privacy().saveConsentChoice("essential"), true);
  assert.equal(h.privacy().saveConsentChoice("analytics"), true);
  h.analytics.trackEvent("view_product", { app: "multitier-discounts" });
  const events = h.google().filter(([command]) => command === "event");
  assertNoClickIds(events);
  assert.doesNotMatch(JSON.stringify(events), /old-campaign/);
});

test("cross-tab storage withdrawal stops new measurement and requests provider-cookie expiry", () => {
  const h = harness({
    local: { [consentKey]: grant(true) },
    cookie: "_ga=old; _ga_GTEST=old; _fbc=old; _fbp=old; theme=dark",
  });
  h.start();
  h.analytics.trackEvent("view_product", { product: "multitier-discounts" });
  const previousEvents = h.google().filter(([command]) => command === "event").length;
  h.local.set(consentKey, "essential");
  h.win.dispatchEvent({ type: "storage", key: consentKey });
  assert.equal(h.win["ga-disable-G-TEST"], true);
  assert.equal(h.scripts.size, 0);
  const remainingEvents = h.google().filter(([command]) => command === "event").length;
  assert.ok(remainingEvents <= previousEvents, "withdrawal may discard unconsumed own commands");
  assert.equal(h.analytics.trackEvent("install_intent"), false);
  assert.equal(h.google().filter(([command]) => command === "event").length, remainingEvents);
  assert.ok(h.cookieWrites.some((value) => value.startsWith("_ga=; Max-Age=0")));
  assert.ok(h.cookieWrites.some((value) => value.startsWith("_fbc=; Max-Age=0")));
  assert.equal(h.cookieWrites.some((value) => value.startsWith("theme=")), false);
});

test("throwing provider queues and history cannot escape tracking helpers", async () => {
  const h = harness({ local: { [consentKey]: grant(true) }, failures: { history: true } });
  h.start();
  h.win.gtag = () => { throw new Error("provider queue broken"); };
  h.win.fbq = () => { throw new Error("pixel queue broken"); };
  assert.doesNotThrow(() => h.analytics.trackEvent("contact_intent"));
  assert.doesNotThrow(() => h.analytics.preserveAttributionHref("/contact"));
  const pending = h.analytics.trackOutboundEvent("install_intent");
  for (const timer of h.timers.values()) assert.ok(timer.delay <= 500);
  h.advanceTimers();
  await assert.doesNotReject(pending);
});

test("outbound handoff resolves immediately without transport and is bounded with a silent vendor", async () => {
  const noTransport = harness({
    local: { [consentKey]: grant() },
    env: { NEXT_PUBLIC_GA4_ID: "", NEXT_PUBLIC_GOOGLE_ADS_ID: "", NEXT_PUBLIC_META_PIXEL_ID: "" },
  });
  noTransport.start();
  let completed = false;
  const immediate = noTransport.analytics.trackOutboundEvent("install_intent").then(() => { completed = true; });
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(completed, true);
  await immediate;
  assert.equal(noTransport.timers.size, 0);

  const silent = harness({ local: { [consentKey]: grant(true) } });
  silent.start();
  const pending = silent.analytics.trackOutboundEvent("install_intent");
  assert.ok(silent.timers.size > 0);
  assert.ok([...silent.timers.values()].every(({ delay }) => delay <= 500));
  silent.advanceTimers();
  await assert.doesNotReject(pending);
  assert.equal(silent.timers.size, 0);
});

test("provider property access failures cannot break event or outbound actions", async () => {
  const h = harness({ local: { [consentKey]: grant(true) } });
  for (const key of ["gtag", "fbq", "dataLayer"]) {
    Object.defineProperty(h.win, key, { configurable: true, get() { throw new Error("provider property denied"); } });
  }
  assert.doesNotThrow(() => h.start());
  assert.doesNotThrow(() => h.analytics.trackEvent("install_intent"));
  const pending = h.analytics.trackOutboundEvent("install_intent");
  h.advanceTimers();
  await assert.doesNotReject(pending);
});
