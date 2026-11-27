"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initPostHog, capture, hasOptedOut } from "./client";
import { readAttribution } from "@/lib/analytics/campaigns/attribution";

function buildPageProps(pathname: string): Record<string, unknown> {
  const locale = pathname.startsWith("/fr") ? "fr" : "en";
  const attribution = readAttribution();
  return {
    schema_version: 1,
    locale,
    page_path: pathname,
    environment:
      process.env.NODE_ENV === "production" ? "production" : "development",
    is_test: false,
    ...(attribution
      ? {
          campaign_id: attribution.campaign_id,
          audience: attribution.audience,
          channel: attribution.channel,
        }
      : {}),
  };
}

export function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Initialize once on mount
  useEffect(() => {
    initPostHog();
  }, []);

  // Track page views on route change (skip first render — PageTracker handles it)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (hasOptedOut()) return;
    capture("portfolio_page_viewed", buildPageProps(pathname));
  }, [pathname]);

  return <>{children}</>;
}
