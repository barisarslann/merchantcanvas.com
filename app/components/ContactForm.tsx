"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { siteConfig } from "../content/site";
import { trackEvent } from "./Analytics";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const topicRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product");
    if (product === "b2b-quote-approvals" && topicRef.current) {
      topicRef.current.value = "B2B Quote Approvals launch update";
    }
    if (product === "multitier-discounts" && topicRef.current) {
      topicRef.current.value = "MultiTier Discounts availability";
    }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const topic = String(form.get("topic") || "General question");
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const store = String(form.get("store") || "Not provided");
    const message = String(form.get("message") || "");
    const source = window.location.href;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Store: ${store}`,
      `Topic: ${topic}`,
      "",
      message,
      "",
      `Source page: ${source}`,
    ].join("\n");

    trackEvent("lead_submit", { topic });
    setStatus("Your email app should open with this message prepared.");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[MerchantCanvas] ${topic}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      className="contact-form"
      aria-describedby="contact-form-requirements"
      onSubmit={submit}
    >
      <p id="contact-form-requirements" className="contact-form-intro">
        Required fields are marked below.
      </p>
      <div className="form-row">
        <label>
          <span className="field-label">
            Your name <span className="field-note">Required</span>
          </span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span className="field-label">
            Work email <span className="field-note">Required</span>
          </span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span className="field-label">
          Shopify store URL <span className="field-note">Optional</span>
        </span>
        <input
          name="store"
          type="url"
          inputMode="url"
          placeholder="https://example.myshopify.com"
        />
      </label>
      <label>
        <span className="field-label">What are you exploring?</span>
        <select
          ref={topicRef}
          name="topic"
          defaultValue="General question"
        >
          <option>General question</option>
          <option>MultiTier Discounts availability</option>
          <option>B2B Quote Approvals launch update</option>
          <option>Agency or multi-store evaluation</option>
        </select>
      </label>
      <label>
        <span className="field-label">
          Tell us about the workflow{" "}
          <span className="field-note">Required</span>
        </span>
        <textarea
          name="message"
          rows={7}
          required
          placeholder="What are you trying to run today, and where does the process become difficult?"
        />
      </label>
      <div className="form-submit">
        <button className="button button-primary" type="submit">
          Prepare email
        </button>
        <p>
          This static form opens your email app; it does not send data to a
          MerchantCanvas server.
        </p>
      </div>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
