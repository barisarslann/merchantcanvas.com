"use client";

import Link from "next/link";
import {
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
        const resolvedHref = preserveAttributionHref(href);
        const isUnmodified =
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey;

        if (eventName === "install_intent" && isUnmodified) {
          event.preventDefault();
          void trackOutboundEvent(eventName, eventData ?? {}).finally(() => {
            window.location.assign(resolvedHref);
          });
          return;
        }

        if (eventName) trackEvent(eventName, eventData ?? {});
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
