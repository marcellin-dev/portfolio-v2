"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { capture, hasOptedOut } from "@/lib/analytics/posthog/client";
import { readAttribution } from "@/lib/analytics/campaigns/attribution";

const SESSION_FLAG = "portfolio_engaged";
const VISIBLE_THRESHOLD_MS = 10_000; // 10 seconds

/**
 * Fires portfolio_visit_engaged once per session when:
 *  - The page has been visible for ≥ 10 cumulative seconds
 *  - AND the user has performed at least one interaction
 * Invisible tab time (Page Visibility API) is excluded.
 */
export default function EngagementTracker() {
  const pathname = usePathname();
  const visibleMs = useRef(0);
  const lastVisibleAt = useRef<number | null>(null);
  const hasInteracted = useRef(false);
  const fired = useRef(false);

  function tryFire() {
    if (fired.current) return;
    if (visibleMs.current < VISIBLE_THRESHOLD_MS) return;
    if (!hasInteracted.current) return;
    if (hasOptedOut()) return;

    // Check session flag
    try {
      if (sessionStorage.getItem(SESSION_FLAG) === "1") return;
      sessionStorage.setItem(SESSION_FLAG, "1");
    } catch {
      return;
    }

    fired.current = true;
    const attribution = readAttribution();
    const locale = pathname.startsWith("/fr") ? "fr" : "en";

    capture("portfolio_visit_engaged", {
      schema_version: 1,
      locale,
      page_path: pathname,
      environment:
        process.env.NODE_ENV === "production" ? "production" : "development",
      is_test: false,
      visible_seconds: Math.round(visibleMs.current / 1000),
      ...(attribution
        ? {
            campaign_id: attribution.campaign_id,
            audience: attribution.audience,
            channel: attribution.channel,
          }
        : {}),
    });
  }

  useEffect(() => {
    // Don't track if already fired this session
    try {
      if (sessionStorage.getItem(SESSION_FLAG) === "1") {
        fired.current = true;
        return;
      }
    } catch {
      return;
    }

    // Start visible timer if page is visible now
    if (!document.hidden) {
      lastVisibleAt.current = Date.now();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (lastVisibleAt.current !== null) {
          visibleMs.current += Date.now() - lastVisibleAt.current;
          lastVisibleAt.current = null;
        }
      } else {
        lastVisibleAt.current = Date.now();
      }
      tryFire();
    }

    function onInteraction() {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        // Flush pending visible time
        if (!document.hidden && lastVisibleAt.current !== null) {
          visibleMs.current += Date.now() - lastVisibleAt.current;
          lastVisibleAt.current = Date.now();
        }
        tryFire();
      }
    }

    // Poll visible time every second as a fallback
    const interval = setInterval(() => {
      if (!document.hidden && lastVisibleAt.current !== null) {
        const now = Date.now();
        visibleMs.current += now - lastVisibleAt.current;
        lastVisibleAt.current = now;
        tryFire();
      }
    }, 1000);

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("click", onInteraction, { once: true, passive: true });
    document.addEventListener("keydown", onInteraction, { once: true, passive: true });
    document.addEventListener("scroll", onInteraction, { once: true, passive: true });

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("keydown", onInteraction);
      document.removeEventListener("scroll", onInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
