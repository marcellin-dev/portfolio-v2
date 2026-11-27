import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isEventName } from "@/lib/analytics/events/catalog";
import { shouldAlert } from "@/lib/analytics/alerts/policy";
import { sendAlertEmail } from "@/lib/analytics/alerts/resend";
import type { Attribution } from "@/lib/analytics/campaigns/types";
import { resolveCampaignAttribution } from "@/lib/analytics/campaigns/registry";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_192;

const BodySchema = z.object({
  event_name: z.string().min(1).max(100),
  properties: z.record(z.string(), z.unknown()),
});

// Minimal in-process throttle — not reliable across serverless instances.
// Use Upstash Redis for production-grade rate limiting if needed.
const recentRequests = new Map<string, number>();
const WINDOW_MS = 60_000;
const MAX_PER_IP = 60;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const count = recentRequests.get(ip) ?? 0;

  // Clean stale entries every 100 calls
  if (recentRequests.size > 1000) {
    recentRequests.forEach((v, k) => {
      if (now - v > WINDOW_MS) recentRequests.delete(k);
    });
  }

  if (count >= MAX_PER_IP) return false;
  recentRequests.set(ip, count + 1);

  // Reset after window
  setTimeout(() => {
    recentRequests.set(ip, Math.max(0, (recentRequests.get(ip) ?? 1) - 1));
  }, WINDOW_MS);

  return true;
}

export async function POST(request: NextRequest) {
  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  // Size guard
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    }
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error" }, { status: 400 });
  }

  const { event_name, properties } = parsed.data;

  if (!isEventName(event_name)) {
    return NextResponse.json({ error: "unknown_event" }, { status: 400 });
  }

  // Resolve attribution from properties (server re-validates campaign_id)
  let attribution: Attribution | undefined;
  if (typeof properties.campaign_id === "string" && properties.campaign_id) {
    // Find the campaign by ID to confirm it's still active
    // We use the campaign_id from properties and re-validate via registry
    // Note: we don't expose the ref from client, only the campaign_id stored in sessionStorage
    const { getAllCampaigns, isCampaignActive } = await import(
      "@/lib/analytics/campaigns/registry"
    );
    const campaign = getAllCampaigns().find(
      (c) => c.campaign_id === properties.campaign_id
    );
    if (campaign && isCampaignActive(campaign)) {
      attribution = {
        campaign_id: campaign.campaign_id,
        audience: campaign.audience,
        channel: campaign.channel,
      };
    }
  }

  // Decide whether to send an alert
  const decision = shouldAlert({
    event_name,
    attribution,
    extra: properties as Record<string, unknown>,
  });

  if (decision.should_alert && decision.category) {
    const locale =
      typeof properties.locale === "string" ? properties.locale : "fr";
    const page_path =
      typeof properties.page_path === "string" ? properties.page_path : "/";

    void sendAlertEmail({
      category: decision.category,
      event_name,
      attribution,
      extra: {
        locale,
        page_path,
        cta_location:
          typeof properties.cta_location === "string"
            ? properties.cta_location
            : undefined,
        cv_locale:
          typeof properties.cv_locale === "string"
            ? properties.cv_locale
            : undefined,
        contact_method:
          typeof properties.contact_method === "string"
            ? properties.contact_method
            : undefined,
        request_type:
          typeof properties.request_type === "string"
            ? properties.request_type
            : undefined,
      },
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
