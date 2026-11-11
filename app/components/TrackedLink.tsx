"use client";

import Link from "next/link";
import {
  OUTBOUND_TIMEOUT_MS,
  preserveAttributionHref,
  trackEvent,
  trackOutboundEvent,
} from "./Analytics";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  eventName?: "select_app" | "contact_intent" | "install_intent";
  eventData?: Record<string, string>;
  ariaLabel?: string;
};

export function TrackedLink({
  href,
  className,
  children,
  eventName,
  eventData,
  ariaLabel,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        if (event.defaultPrevented || event.button !== 0) return;

        let resolvedHref = href;
        try {
          resolvedHref = preserveAttributionHref(href);
        } catch {
          // A measurement failure must not change the intended destination.
        }
        const isUnmodified =
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey;

        if (eventName === "install_intent" && isUnmodified) {
          event.preventDefault();
          let navigated = false;
          const navigate = () => {
            if (navigated) return;
            navigated = true;
            window.clearTimeout(timeout);
            window.location.assign(resolvedHref);
          };
          const timeout = window.setTimeout(navigate, OUTBOUND_TIMEOUT_MS);
          try {
            void Promise.resolve(
              trackOutboundEvent(eventName, eventData ?? {}),
            ).then(navigate, navigate).catch(() => {
              // A failed optional handoff must not become an unhandled rejection.
            });
          } catch {
            navigate();
          }
          return;
        }

        try {
          if (eventName) trackEvent(eventName, eventData ?? {});
        } catch {
          // Preserve normal navigation if a provider or storage is unavailable.
        }
        if (resolvedHref !== href && isUnmodified) {
          event.preventDefault();
          window.location.assign(resolvedHref);
        }
      }}
    >
      {children}
    </Link>
  );
}
