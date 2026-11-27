"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { initPostHog, capture, hasOptedOut } from "@/lib/analytics/posthog/client";
import {
  storeAttribution,
  readAttribution,
  hasAttribution,
} from "@/lib/analytics/campaigns/attribution";

/**
 * Handles:
 *  1. Validating ?ref= attribution on first load
 *  2. Firing portfolio_page_viewed on mount (first navigation)
 *  3. Stripping ?ref from the URL bar
 *
 * Must be wrapped in <Suspense> due to useSearchParams().
 */
export default function PageTracker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const ref = searchParams.get("ref");

  useEffect(() => {
    initPostHog();
  }, []);

  // Validate ref against server registry and store attribution
  useEffect(() => {
    if (!ref) return;

    async function resolveRef() {
      try {
        const res = await fetch(
          `/api/analytics/validate-ref?ref=${encodeURIComponent(ref!)}`,
          { method: "GET" }
        );
        if (!res.ok) return;
        const json = (await res.json()) as { valid: boolean; campaign_id?: string; audience?: string; channel?: string };
        if (json.valid && json.campaign_id && json.audience && json.channel) {
          storeAttribution({
            campaign_id: json.campaign_id,
            audience: json.audience as "recruiter" | "prospect",
            channel: json.channel as "email" | "whatsapp" | "linkedin" | "other",
          });
        }
      } catch {
        // Network error — ignore, don't block page
      }

      // Strip ?ref from URL bar without navigation
      const url = new URL(window.location.href);
      url.searchParams.delete("ref");
      window.history.replaceState(null, "", url.toString());
    }

    void resolveRef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // Fire page_viewed on first render (subsequent route changes handled by provider)
  useEffect(() => {
    if (hasOptedOut()) return;

    // Small delay to let attribution resolve first
    const timer = setTimeout(() => {
      const attribution = readAttribution();
      const locale = pathname.startsWith("/fr") ? "fr" : "en";
      capture("portfolio_page_viewed", {
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
      });
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
