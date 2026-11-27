import { Resend } from "resend";
import React from "react";
import CampaignAlertEmail from "./templates/campaign-alert";
import type { CampaignAlertEmailProps } from "./templates/campaign-alert";
import type { AlertCategory } from "./policy";
import type { Attribution } from "@/lib/analytics/campaigns/types";
import { buildIdempotencyKey } from "./policy";
import { getCampaignMeta } from "@/lib/analytics/campaigns/registry";

const RECIPIENT = process.env.ALERT_RECIPIENT_EMAIL ?? "lelemarcellin@gmail.com";
const FROM = process.env.ALERT_FROM_EMAIL ?? "Portfolio Alerts <onboarding@resend.dev>";
const POSTHOG_URL =
  process.env.NEXT_PUBLIC_POSTHOG_DASHBOARD_URL ??
  "https://eu.posthog.com/project/portfolioapp/dashboard";

function formatDateDouala(): string {
  return new Date().toLocaleString("fr-FR", {
    timeZone: "Africa/Douala",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function dateSuffix(): string {
  return new Date()
    .toLocaleString("fr-FR", { timeZone: "Africa/Douala", year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/\//g, "");
}

export interface AlertPayload {
  category: AlertCategory;
  event_name: string;
  attribution?: Attribution;
  extra: {
    locale: string;
    page_path: string;
    cta_location?: string;
    cv_locale?: string;
    contact_method?: string;
    request_type?: string;
  };
}

export async function sendAlertEmail(payload: AlertPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[alert] RESEND_API_KEY not set — skipping alert");
    return;
  }

  const resend = new Resend(apiKey);

  const meta = payload.attribution
    ? getCampaignMeta(payload.attribution.campaign_id)
    : undefined;

  const emailProps: CampaignAlertEmailProps = {
    category: payload.category,
    event_name: payload.event_name,
    campaign_label: meta?.label ?? payload.attribution?.campaign_id ?? "Contact direct",
    campaign_position: meta?.position,
    campaign_channel: payload.attribution?.channel ?? "inconnu",
    locale: payload.extra.locale,
    page_path: payload.extra.page_path,
    cta_location: payload.extra.cta_location,
    cv_locale: payload.extra.cv_locale,
    contact_method: payload.extra.contact_method,
    request_type: payload.extra.request_type,
    datetime_local: formatDateDouala(),
    posthog_url: POSTHOG_URL,
  };

  const eventLabels: Record<string, string> = {
    cv_download_clicked: "Clic CV",
    contact_cta_clicked: "Clic CTA contact",
    contact_form_submitted: "Formulaire accepté",
  };

  const subject = `[Portfolio] ${meta?.label ?? "Contact direct"} · ${payload.attribution?.channel ?? "formulaire"} · ${eventLabels[payload.event_name] ?? payload.event_name}`;

  const idempotencyKey = buildIdempotencyKey(
    payload.category,
    payload.attribution,
    dateSuffix()
  );

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      subject,
      react: React.createElement(CampaignAlertEmail, emailProps),
      headers: {
        "X-Entity-Ref-ID": idempotencyKey,
      },
    });

    if (error) {
      console.error("[alert] Resend error:", error.message);
    }
  } catch (err) {
    console.error("[alert] send failed:", err);
  }
}
