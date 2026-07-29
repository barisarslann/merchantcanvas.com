"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products, siteConfig } from "../content/site";
import { TrackedLink } from "./TrackedLink";

function setThemeFavicon(theme: "light" | "dark") {
  const href =
    theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";

  document
    .querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')
    .forEach((icon) => {
      if (
        icon.type === "image/svg+xml" ||
        /favicon(?:-(?:light|dark))?\.svg$/.test(new URL(icon.href).pathname)
      ) {
        icon.href = href;
      }
    });
}

export function SiteHeader() {
  const multiTier = products["multitier-discounts"];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const theme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setThemeFavicon(theme);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !mobileMenuRef.current?.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOutside);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOutside);
    };
  }, [mobileMenuOpen]);

  function toggleTheme() {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("merchantcanvas-theme", nextTheme);
    setThemeFavicon(nextTheme);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label="MerchantCanvas home">
          <Image
            className="brand-lockup brand-lockup-light"
            src="/brand/merchantcanvas-lockup-light.svg"
            alt="MerchantCanvas"
            width="330"
            height="48"
          />
          <Image
            className="brand-lockup brand-lockup-dark"
            src="/brand/merchantcanvas-lockup-dark.svg"
            alt="MerchantCanvas"
            width="330"
            height="48"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <TrackedLink
          href={multiTier.installUrl!}
          className="button button-small button-primary header-cta"
          eventName="install_intent"
          eventData={{
            product: "multitier-discounts",
            placement: "site_header",
            destination: "shopify_app_store",
          }}
        >
          Install MTD
        </TrackedLink>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          title="Toggle color theme"
        >
          <span aria-hidden="true">◐</span>
        </button>
        <div className="mobile-nav" ref={mobileMenuRef}>
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="mobile-nav-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            Menu
          </button>
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            hidden={!mobileMenuOpen}
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/apps/multitier-discounts"
              onClick={() => setMobileMenuOpen(false)}
            >
              MultiTier Discounts — live
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
