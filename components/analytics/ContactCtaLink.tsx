"use client";

import { capture, hasOptedOut } from "@/lib/analytics/posthog/client";
import { readAttribution } from "@/lib/analytics/campaigns/attribution";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

type ContactMethod = "email" | "whatsapp" | "phone" | "form" | "calendar";

interface ContactCtaLinkProps {
  href: string;
  method: ContactMethod;
  locale: Locale;
  ctaLocation: string;
  className?: string;
  children: ReactNode;
}

export default function ContactCtaLink({
  href,
  method,
  locale,
  ctaLocation,
  className,
  children,
}: ContactCtaLinkProps) {
  function handleClick() {
    if (hasOptedOut()) return;

    const attribution = readAttribution();
    const pagePath = typeof window !== "undefined" ? window.location.pathname : "";

    const props = {
      schema_version: 1,
      locale,
      page_path: pagePath,
      environment:
        process.env.NODE_ENV === "production" ? "production" : "development",
      is_test: false,
      contact_method: method,
      cta_location: ctaLocation,
      ...(attribution
        ? {
            campaign_id: attribution.campaign_id,
            audience: attribution.audience,
            channel: attribution.channel,
          }
        : {}),
    };

    capture("contact_cta_clicked", props);

    if (attribution) {
      void fetch("/api/analytics/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_name: "contact_cta_clicked", properties: props }),
        keepalive: true,
      }).catch(() => {});
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
