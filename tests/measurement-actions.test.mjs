import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Execute the real handlers without a browser, provider scripts, or network calls.
async function loadComponent(name, analytics = {}) {
  const source = await readFile(
    new URL(`../app/components/${name}.tsx`, import.meta.url),
    "utf8",
  );
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const effects = [];
  const stateUpdates = [];
  const navigations = [];
  const timers = new Map();
  let timerId = 0;
  let formReads = 0;
  let pageHref = "https://merchantcanvas.test/contact";
  const location = {
    search: "",
    get href() { return pageHref; },
    set href(value) { navigations.push(value); pageHref = value; },
    assign(value) { navigations.push(value); },
  };
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  const tracker = {
    OUTBOUND_TIMEOUT_MS: 500,
    preserveAttributionHref: (href) => href,
    trackEvent() {},
    trackOutboundEvent: () => Promise.resolve(),
    ...analytics,
  };
  const context = vm.createContext({
    exports,
    require(id) {
      if (id === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (id === "react") return {
        useState: (initial) => [initial, (value) => stateUpdates.push(value)],
        useRef: (initial) => ({ current: initial }),
        useEffect: (callback) => effects.push(callback),
      };
      if (id === "next/link") return { __esModule: true, default: "Link" };
      if (id === "../content/site") return {
        siteConfig: { email: "support@merchantcanvas.com" },
      };
      if (id === "./Analytics") return tracker;
      throw new Error(`Unexpected dependency: ${id}`);
    },
    window: {
      location,
      setTimeout(callback, delay) {
        timers.set(++timerId, { callback, delay });
        return timerId;
      },
      clearTimeout(id) { timers.delete(id); },
    },
    URLSearchParams,
    FormData: class {
      constructor(form) { formReads++; this.values = form.values; }
      get(key) { return this.values[key]; }
    },
    Promise,
  });
  vm.runInContext(compiled, context, { filename: `${name}.tsx` });
  return {
    component: exports[name], effects, stateUpdates, navigations, timers, location,
    get formReads() { return formReads; },
    runTimers() {
      for (const [id, timer] of [...timers]) {
        timers.delete(id);
        timer.callback();
      }
    },
  };
}

function nodes(node) {
  if (!node || typeof node !== "object") return [];
  const children = node.props?.children;
  return [node, ...[children].flat(Infinity).flatMap(nodes)];
}

function submitEvent(valid = true) {
  return {
    prevented: false,
    preventDefault() { this.prevented = true; },
    currentTarget: {
      reported: false,
      checkValidity: () => valid,
      reportValidity() { this.reported = true; },
      values: {
        name: "Private Person",
        email: "private@example.test",
        store: "https://private-store.test",
        topic: "MultiTier Discounts fit, pricing, or implementation",
        message: "Private workflow description",
      },
    },
  };
}

function clickEvent(overrides = {}) {
  return {
    defaultPrevented: false,
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    prevented: false,
    preventDefault() { this.prevented = true; },
    ...overrides,
  };
}

const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
const listing = "https://apps.shopify.com/multitier-discounts";

test("valid contact action prepares one email and only a non-PII contact intent", async () => {
  const events = [];
  const app = await loadComponent("ContactForm", {
    trackEvent: (...args) => events.push(JSON.parse(JSON.stringify(args))),
  });
  const form = app.component();
  form.props.onSubmit(submitEvent());
  assert.equal(app.navigations.length, 1);
  const mailto = new URL(app.navigations[0]);
  assert.equal(mailto.protocol, "mailto:");
  assert.equal(mailto.pathname, "support@merchantcanvas.com");
  assert.equal(mailto.searchParams.get("subject"), "[MerchantCanvas] MultiTier Discounts fit, pricing, or implementation");
  assert.match(mailto.searchParams.get("body"), /Private workflow description/);
  assert.deepEqual(events, [["contact_intent", {
    action: "email_prepare", method: "mailto", placement: "contact_form",
    topic: "MultiTier Discounts fit, pricing, or implementation",
  }]]);
  assert.doesNotMatch(JSON.stringify(events), /Private Person|private@|private-store|Private workflow|lead_submit/);
  assert.equal(app.stateUpdates.at(-1), "Your email app should open with this message prepared.");
});

test("invalid form does not prepare email or track and retains native validation", async () => {
  let events = 0;
  const app = await loadComponent("ContactForm", { trackEvent() { events++; } });
  const form = app.component();
  const event = submitEvent(false);
  form.props.onSubmit(event);
  assert.equal(event.currentTarget.reported, true);
  assert.equal(app.formReads, 0);
  assert.equal(events, 0);
  assert.equal(app.navigations.length, 0);
  const fields = nodes(form).filter((node) => ["input", "textarea"].includes(node.type));
  assert.equal(fields.find((node) => node.props.name === "email").props.type, "email");
  assert.equal(fields.filter((node) => node.props.required).length, 3);
});

test("contact mailto survives denied measurement and throwing tracking/storage", async () => {
  for (const trackEvent of [() => false, () => { throw new Error("blocked storage/provider"); }]) {
    const app = await loadComponent("ContactForm", { trackEvent });
    assert.doesNotThrow(() => app.component().props.onSubmit(submitEvent()));
    assert.equal(app.navigations.length, 1);
    assert.match(app.navigations[0], /^mailto:support@merchantcanvas\.com\?/);
  }
});

test("contact query topics and static-form disclosure are preserved", async () => {
  for (const [product, topic] of [
    ["multitier-discounts", "MultiTier Discounts fit, pricing, or implementation"],
    ["b2b-quote-approvals", "B2B Quote Approvals launch update"],
  ]) {
    const app = await loadComponent("ContactForm");
    app.location.search = `?product=${product}`;
    const form = app.component();
    const select = nodes(form).find((node) => node.type === "select");
    select.props.ref.current = { value: "General question" };
    app.effects.forEach((effect) => effect());
    assert.equal(select.props.ref.current.value, topic);
    const text = nodes(form).map((node) => node.props?.children).flat(Infinity).filter((child) => typeof child === "string").join(" ");
    assert.match(text, /Prepare email/);
    assert.match(text, /does not send data to a MerchantCanvas server/);
  }
});

test("install handoff completes once for sync errors and rejected provider promises", async () => {
  for (const trackOutboundEvent of [
    () => { throw new Error("provider queue"); },
    () => Promise.reject(new Error("provider rejected")),
    () => Promise.resolve(),
  ]) {
    const app = await loadComponent("TrackedLink", { trackOutboundEvent });
    const link = app.component({ href: listing, eventName: "install_intent", children: "Install" });
    const event = clickEvent();
    assert.doesNotThrow(() => link.props.onClick(event));
    await flush();
    app.runTimers();
    assert.equal(event.prevented, true);
    assert.deepEqual(app.navigations, [listing]);
    assert.equal(app.timers.size, 0);
  }
});

test("install provider stall cannot extend the 500ms navigation budget", async () => {
  let complete;
  const app = await loadComponent("TrackedLink", {
    trackOutboundEvent: () => new Promise((resolve) => { complete = resolve; }),
  });
  app.component({ href: listing, eventName: "install_intent", children: "Install" }).props.onClick(clickEvent());
  assert.equal(app.navigations.length, 0);
  assert.deepEqual([...app.timers.values()].map(({ delay }) => delay), [500]);
  app.runTimers();
  assert.deepEqual(app.navigations, [listing]);
  complete();
  await flush();
  assert.deepEqual(app.navigations, [listing]);
});

test("modified clicks and non-primary/prevented clicks retain native navigation", async () => {
  for (const overrides of [
    { metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true },
    { button: 1 }, { button: 2 }, { defaultPrevented: true },
  ]) {
    let waits = 0;
    const app = await loadComponent("TrackedLink", {
      trackEvent() { throw new Error("optional tracking"); },
      trackOutboundEvent() { waits++; },
    });
    const event = clickEvent(overrides);
    const link = app.component({ href: listing, eventName: "install_intent", children: "Install" });
    assert.doesNotThrow(() => link.props.onClick(event));
    assert.equal(link.props.href, listing);
    assert.equal(event.prevented, false);
    assert.equal(waits, 0);
    assert.equal(app.navigations.length, 0);
    assert.equal(app.timers.size, 0);
  }
});

test("internal links keep the destination when optional attribution or events fail", async () => {
  for (const overrides of [
    { preserveAttributionHref() { throw new Error("storage getter blocked"); } },
    { trackEvent() { throw new Error("provider blocked"); } },
  ]) {
    const app = await loadComponent("TrackedLink", overrides);
    const event = clickEvent();
    const link = app.component({ href: "/contact?product=multitier-discounts#form", eventName: "contact_intent", children: "Contact" });
    assert.doesNotThrow(() => link.props.onClick(event));
    assert.equal(event.prevented, false);
    assert.equal(link.props.href, "/contact?product=multitier-discounts#form");
    assert.equal(app.navigations.length, 0);
  }
  const app = await loadComponent("TrackedLink", {
    preserveAttributionHref: () => "/contact?product=multitier-discounts&utm_source=test#form",
    trackEvent() { throw new Error("provider blocked"); },
  });
  const event = clickEvent();
  app.component({ href: "/contact?product=multitier-discounts#form", eventName: "contact_intent", children: "Contact" }).props.onClick(event);
  assert.equal(event.prevented, true);
  assert.deepEqual(app.navigations, ["/contact?product=multitier-discounts&utm_source=test#form"]);
});
