"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { capture, hasOptedOut } from "@/lib/analytics/posthog/client";
import { readAttribution } from "@/lib/analytics/campaigns/attribution";
import type { Locale } from "@/lib/i18n";

interface ProjectViewTrackerProps {
  projectSlug: string;
  locale: Locale;
}

export default function ProjectViewTracker({
  projectSlug,
  locale,
}: ProjectViewTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (hasOptedOut()) return;
    const attribution = readAttribution();
    capture("project_viewed", {
      schema_version: 1,
      locale,
      page_path: pathname,
      environment:
        process.env.NODE_ENV === "production" ? "production" : "development",
      is_test: false,
      project_slug: projectSlug,
      ...(attribution
        ? {
            campaign_id: attribution.campaign_id,
            audience: attribution.audience,
            channel: attribution.channel,
          }
        : {}),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
