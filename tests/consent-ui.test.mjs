import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { CONSENT_LEVELS, createConsent } from "../app/lib/consent.js";

// Execute the shipped TSX handlers with deterministic React/DOM adapters.
// No provider scripts, external network, or browser persistence is used here.
async function harness(file, options = {}) {
  const hooks = [];
  const effects = [];
  const effectSlots = new Set();
  const timers = [];
  const listeners = new Map();
  const savedChoices = [];
  const themeWrites = [];
  const focused = [];
  const icons = [{ type: "image/svg+xml", href: "/favicon-light.svg" }];
  let hookIndex = 0;
  let consent = options.consent ?? null;
  let saveSucceeds = options.saveSucceeds ?? true;
  let reloads = 0;
  const react = {
    useState(initial) {
      const slot = hookIndex++;
      if (!(slot in hooks)) hooks[slot] = initial;
      return [hooks[slot], (value) => {
        hooks[slot] = typeof value === "function" ? value(hooks[slot]) : value;
      }];
    },
    useRef(initial) {
      const slot = hookIndex++;
      if (!(slot in hooks)) hooks[slot] = { current: initial };
      return hooks[slot];
    },
    useEffect(effect) {
      const slot = hookIndex++;
      if (!effectSlots.has(slot)) {
        effectSlots.add(slot);
        effects.push(effect);
      }
    },
  };
  class MockCustomEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.detail = init.detail;
    }
  }
  const window = {
    setTimeout(callback) { timers.push(callback); return timers.length; },
    clearTimeout() {},
    addEventListener(type, listener) { listeners.set(type, listener); },
    removeEventListener(type) { listeners.delete(type); },
    dispatchEvent(event) { listeners.get(event.type)?.(event); },
    location: { reload() { reloads++; } },
  };
  const document = {
    documentElement: { dataset: { theme: "light" }, style: {} },
    querySelectorAll() { return icons; },
    getElementById(id) { return { focus() { focused.push(id); } }; },
  };
  const dependencies = {
    react,
    "react/jsx-runtime": {
      jsx: (type, props) => ({ type, props }),
      jsxs: (type, props) => ({ type, props }),
    },
    "../lib/consent.js": { CONSENT_LEVELS, createConsent },
    "../lib/privacy": {
      readConsent: () => consent,
      saveConsentChoice(level) {
        savedChoices.push(level);
        consent = createConsent(saveSucceeds ? level : CONSENT_LEVELS.essential);
        return saveSucceeds;
      },
    },
    "../lib/storage.js": {
      safeWriteStorage(...args) { themeWrites.push(args); return false; },
    },
    "next/image": { __esModule: true, default: "image" },
    "next/link": { __esModule: true, default: "link" },
    "./TrackedLink": { TrackedLink: "tracked-link" },
    "../content/site": {
      products: { "multitier-discounts": { installUrl: "https://apps.shopify.com/multitier-discounts" } },
      siteConfig: { navigation: [] },
    },
  };
  const source = await readFile(new URL(`../app/components/${file}.tsx`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    require(name) {
      assert.ok(name in dependencies, `Unexpected dependency ${name}`);
      return dependencies[name];
    },
    window,
    document,
    CustomEvent: MockCustomEvent,
    URL,
  }, { filename: `${file}.tsx` });
  return {
    render(name = file) { hookIndex = 0; return exports[name](); },
    flush() {
      while (effects.length) effects.shift()();
      while (timers.length) timers.shift()();
    },
    open() { window.dispatchEvent(new MockCustomEvent("merchantcanvas:open-consent", {
      detail: { returnFocusId: "cookie-settings-button" },
    })); },
    setSaveSucceeds(value) { saveSucceeds = value; },
    savedChoices,
    focused,
    themeWrites,
    icons,
    document,
    get reloads() { return reloads; },
  };
}

function elements(node, predicate) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap((child) => elements(child, predicate));
  return [
    ...(predicate(node) ? [node] : []),
    ...elements(node.props?.children, predicate),
  ];
}

function button(tree, label) {
  const result = elements(tree, (node) => node.type === "button" && node.props.children === label);
  assert.equal(result.length, 1, label);
  return result[0];
}

test("missing/invalid consent exposes three usable choices after the initial check", async () => {
  const ui = await harness("CookieConsent");
  assert.equal(ui.render(), null);
  ui.flush();
  const tree = ui.render();
  assert.equal(tree.props["aria-label"], "Cookie and analytics preferences");
  assert.equal(elements(tree, (node) => node.type === "button").length, 3);
});

test("failed preference save stays visible with accessible retry instructions and never reloads", async () => {
  const ui = await harness("CookieConsent", {
    consent: createConsent(CONSENT_LEVELS.advertising), saveSucceeds: false,
  });
  ui.render(); ui.flush();
  assert.equal(ui.render(), null);
  ui.open();
  button(ui.render(), "Essential only").props.onClick();
  const tree = ui.render();
  assert.equal(ui.reloads, 0);
  assert.equal(tree.props["aria-describedby"], "cookie-preferences-error");
  const alerts = elements(tree, (node) => node.props?.role === "alert");
  assert.equal(alerts.length, 1);
  assert.match(String(alerts[0].props.children), /off on this page/);
  assert.match(String(alerts[0].props.children), /next visit/);
  assert.equal(elements(tree, (node) => node.type === "button").length, 3);
  ui.setSaveSucceeds(true);
  button(tree, "Analytics only").props.onClick();
  assert.equal(ui.render(), null);
  assert.deepEqual(ui.savedChoices, ["essential", "analytics"]);
  assert.equal(ui.reloads, 1);
});

test("failed grant is not reported as saved or closed", async () => {
  const ui = await harness("CookieConsent", { saveSucceeds: false });
  ui.render(); ui.flush();
  button(ui.render(), "Analytics + advertising").props.onClick();
  assert.ok(ui.render());
  assert.equal(ui.reloads, 0);
  assert.equal(elements(ui.render(), (node) => node.props?.role === "alert").length, 1);
});

test("only a successfully saved downgrade reloads the document", async () => {
  for (const [previous, label, expectedReloads] of [
    ["analytics-advertising", "Analytics only", 1],
    ["analytics-advertising", "Essential only", 1],
    ["analytics", "Essential only", 1],
    ["essential", "Analytics only", 0],
    ["analytics", "Analytics + advertising", 0],
  ]) {
    const ui = await harness("CookieConsent", { consent: createConsent(previous) });
    ui.render(); ui.flush(); ui.open();
    button(ui.render(), label).props.onClick();
    assert.equal(ui.reloads, expectedReloads, `${previous} → ${label}`);
    assert.equal(ui.render(), null);
  }
});

test("retry after a failed withdrawal reloads only after persistence succeeds", async () => {
  for (const retryChoice of ["Essential only", "Analytics only"]) {
    const ui = await harness("CookieConsent", {
      consent: createConsent("analytics-advertising"), saveSucceeds: false,
    });
    ui.render(); ui.flush(); ui.open();
    button(ui.render(), "Essential only").props.onClick();
    assert.equal(ui.reloads, 0);
    ui.setSaveSucceeds(true);
    button(ui.render(), retryChoice).props.onClick();
    assert.equal(ui.reloads, 1, retryChoice);
  }

  const firstGrant = await harness("CookieConsent", { saveSucceeds: false });
  firstGrant.render(); firstGrant.flush();
  button(firstGrant.render(), "Analytics + advertising").props.onClick();
  firstGrant.setSaveSucceeds(true);
  button(firstGrant.render(), "Analytics + advertising").props.onClick();
  assert.equal(firstGrant.reloads, 0, "No provider was previously granted");
});

test("saved preference returns keyboard focus to its opener", async () => {
  const ui = await harness("CookieConsent", { consent: createConsent("essential") });
  ui.render(); ui.flush(); ui.open();
  button(ui.render(), "Analytics only").props.onClick();
  ui.flush();
  assert.deepEqual(ui.focused, ["cookie-settings-button"]);
});

test("theme and favicon still change when preference persistence is unavailable", async () => {
  const ui = await harness("SiteHeader");
  const tree = ui.render();
  const toggle = elements(tree, (node) => node.props?.["aria-label"] === "Toggle color theme")[0];
  toggle.props.onClick();
  assert.equal(ui.document.documentElement.dataset.theme, "dark");
  assert.equal(ui.document.documentElement.style.colorScheme, "dark");
  assert.equal(ui.icons[0].href, "/favicon-dark.svg");
  assert.deepEqual(ui.themeWrites, [["localStorage", "merchantcanvas-theme", "dark"]]);
});
