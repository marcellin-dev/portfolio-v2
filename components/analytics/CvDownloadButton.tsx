"use client";

import { capture, hasOptedOut } from "@/lib/analytics/posthog/client";
import { readAttribution } from "@/lib/analytics/campaigns/attribution";
import type { Locale } from "@/lib/i18n";

interface CvDownloadButtonProps {
  locale: Locale;
  label: string;
  className?: string;
  ctaLocation?: string;
}

export default function CvDownloadButton({
  locale,
  label,
  className,
  ctaLocation = "unknown",
}: CvDownloadButtonProps) {
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
      cv_locale: locale,
      cv_variant: "pdf",
      cta_location: ctaLocation,
      ...(attribution
        ? {
            campaign_id: attribution.campaign_id,
            audience: attribution.audience,
            channel: attribution.channel,
          }
        : {}),
    };

    // Client-side PostHog capture (non-blocking)
    capture("cv_download_clicked", props);

    // Server-side alert (fire-and-forget, never blocks download)
    if (attribution) {
      void fetch("/api/analytics/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_name: "cv_download_clicked", properties: props }),
        keepalive: true,
      }).catch(() => {});
    }
  }

  return (
    <a
      href={`/api/cv?locale=${locale}`}
      download
      onClick={handleClick}
      className={className}
    >
      {label}
    </a>
  );
}
