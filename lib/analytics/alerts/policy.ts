import type { EventName } from "@/lib/analytics/events/catalog";
import type { Attribution } from "@/lib/analytics/campaigns/types";

/** Categories of alerts. Each can be toggled independently. */
export const ALERT_CONFIG = {
  cv_download_from_campaign: true,
  contact_cta_from_campaign: true,
  contact_form_submitted: true,
} as const;

export type AlertCategory = keyof typeof ALERT_CONFIG;

export interface AlertContext {
  event_name: EventName;
  attribution?: Attribution;
  extra?: Record<string, unknown>;
}

export interface AlertDecision {
  should_alert: boolean;
  category?: AlertCategory;
  reason: string;
}

/** Pure function — testable without any SDK. */
export function shouldAlert(ctx: AlertContext): AlertDecision {
  const { event_name, attribution } = ctx;

  if (event_name === "cv_download_clicked") {
    if (!attribution) {
      return { should_alert: false, reason: "cv_download without campaign" };
    }
    if (!ALERT_CONFIG.cv_download_from_campaign) {
      return { should_alert: false, reason: "cv_download alerts disabled" };
    }
    return {
      should_alert: true,
      category: "cv_download_from_campaign",
      reason: "cv_download from tracked campaign",
    };
  }

  if (event_name === "contact_cta_clicked") {
    if (!attribution) {
      return { should_alert: false, reason: "contact_cta without campaign" };
    }
    if (!ALERT_CONFIG.contact_cta_from_campaign) {
      return { should_alert: false, reason: "contact_cta alerts disabled" };
    }
    return {
      should_alert: true,
      category: "contact_cta_from_campaign",
      reason: "contact_cta from tracked campaign",
    };
  }

  if (event_name === "contact_form_submitted") {
    if (!ALERT_CONFIG.contact_form_submitted) {
      return { should_alert: false, reason: "form_submitted alerts disabled" };
    }
    return {
      should_alert: true,
      category: "contact_form_submitted",
      reason: "contact form accepted",
    };
  }

  return { should_alert: false, reason: "event not in alert policy" };
}

/**
 * Idempotency key — prevents duplicate Resend sends for the same event-day combination.
 * Limitation: does NOT limit total sends per period in serverless (no persistent counter).
 * For volume protection, add Upstash Redis behind UPSTASH_REDIS_URL if needed.
 */
export function buildIdempotencyKey(
  category: AlertCategory,
  attribution: Attribution | undefined,
  dateSuffix: string // yyyyMMdd
): string {
  const campaignPart = attribution?.campaign_id ?? "direct";
  return `portfolio-alert:${category}:${campaignPart}:${dateSuffix}`;
}
