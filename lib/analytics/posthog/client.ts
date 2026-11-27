"use client";

import posthog from "posthog-js";
import type { Attribution } from "@/lib/analytics/campaigns/types";

let initialized = false;

export function initPostHog(): void {
  if (initialized || typeof window === "undefined") return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

  if (!key || !enabled) return;

  posthog.init(key, {
    api_host: host,
    capture_pageview: false, // manual via PageTracker
    capture_pageleave: false,
    autocapture: false,
    disable_session_recording: true,
    persistence: "localStorage+cookie",
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") ph.debug(false);
    },
  });

  initialized = true;
}

export function capture(
  event: string,
  props?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || !initialized) return;
  try {
    posthog.capture(event, props);
  } catch {
    // Never block UI on analytics errors
  }
}

/** Enrich props with attribution data if available. */
export function withAttribution(
  props: Record<string, unknown>,
  attribution?: Attribution
): Record<string, unknown> {
  if (!attribution) return props;
  return {
    ...props,
    campaign_id: attribution.campaign_id,
    audience: attribution.audience,
    channel: attribution.channel,
  };
}

export function optOut(): void {
  if (!initialized) return;
  posthog.opt_out_capturing();
}

export function optIn(): void {
  if (!initialized) return;
  posthog.opt_in_capturing();
}

export function hasOptedOut(): boolean {
  if (!initialized) return false;
  return posthog.has_opted_out_capturing();
}

export function getDistinctId(): string | undefined {
  if (!initialized || typeof window === "undefined") return undefined;
  try {
    return posthog.get_distinct_id();
  } catch {
    return undefined;
  }
}
