"use client";

import Link from "next/link";
import { preserveAttributionHref, trackEvent } from "./Analytics";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  eventName?: "select_app" | "contact_intent";
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
        if (eventName) trackEvent(eventName, eventData);
        const resolvedHref = preserveAttributionHref(href);
        if (
          resolvedHref !== href &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          window.location.assign(resolvedHref);
        }
      }}
    >
      {children}
    </Link>
  );
}
