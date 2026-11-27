"use server";

import ContactFormEmail from "@/email/contact-form-email";
import { getErrorMessage, validateString } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";
import { serverCapture } from "@/lib/analytics/posthog/server";
import { sendAlertEmail } from "@/lib/analytics/alerts/resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  formData: FormData
): Promise<{ data?: unknown; error?: string }> => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const locale = (formData.get("locale") as string) ?? "fr";
  const requestType = (formData.get("requestType") as string) ?? "other";
  const campaignId = (formData.get("campaign_id") as string) ?? undefined;
  const audience = (formData.get("audience") as string) ?? undefined;
  const channel = (formData.get("channel") as string) ?? undefined;

  if (!validateString(senderEmail, 500)) {
    return { error: "Invalid sender email" };
  }
  if (!validateString(message, 5000)) {
    return { error: "Invalid message" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "lelemarcellin@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });

    if (error) {
      // Capture form failure (server-side, no form content)
      await serverCapture({
        event: "contact_form_failed",
        properties: {
          schema_version: 1,
          locale,
          page_path: `/${locale}/contact`,
          environment: process.env.NODE_ENV === "production" ? "production" : "development",
          is_test: false,
          error_code: "resend_error",
          ...(campaignId ? { campaign_id: campaignId, audience, channel } : {}),
        },
      }).catch(() => {});

      return { error: error.message };
    }

    // Capture submission server-side (after Resend accepted it)
    const captureProps = {
      schema_version: 1,
      locale,
      page_path: `/${locale}/contact`,
      environment: process.env.NODE_ENV === "production" ? "production" : "development",
      is_test: false,
      request_type: requestType,
      ...(campaignId ? { campaign_id: campaignId, audience, channel } : {}),
    };

    await serverCapture({
      event: "contact_form_submitted",
      properties: captureProps,
    }).catch(() => {});

    // Send alert email (always for form submission)
    const attribution =
      campaignId && audience && channel
        ? {
            campaign_id: campaignId,
            audience: audience as "recruiter" | "prospect",
            channel: channel as "email" | "whatsapp" | "linkedin" | "other",
          }
        : undefined;

    sendAlertEmail({
      category: "contact_form_submitted",
      event_name: "contact_form_submitted",
      attribution,
      extra: {
        locale,
        page_path: `/${locale}/contact`,
        request_type: requestType,
      },
    }).catch((err) => console.error("[sendEmail] alert failed:", err));

    return { data };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
};
