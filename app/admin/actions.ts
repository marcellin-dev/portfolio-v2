"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { hashPassword } from "@/lib/admin/auth";
import {
  addRuntimeCampaign,
  updateRuntimeCampaign,
} from "@/lib/analytics/campaigns/runtime-store";
import type { Audience, Channel } from "@/lib/analytics/campaigns/types";

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAction(
  formData: FormData
): Promise<{ error: string } | undefined> {
  const password = (formData.get("password") as string) ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: "Mot de passe incorrect" };
  }

  cookies().set("admin_session", hashPassword(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/admin",
  });

  redirect("/admin");
}

export async function logoutAction() {
  cookies().delete("admin_session");
  redirect("/admin");
}

// ── Campaigns ─────────────────────────────────────────────────────────────────

export type CreatedCampaign = {
  linkFr: string;
  linkEn: string;
  campaignId: string;
  label: string;
};

export async function createCampaignAction(
  formData: FormData
): Promise<{ success: true; data: CreatedCampaign } | { success: false; error: string }> {
  const label = (formData.get("label") as string)?.trim();
  const audience = (formData.get("audience") as string)?.trim() as Audience;
  const channel = (formData.get("channel") as string)?.trim() as Channel;
  const position = (formData.get("position") as string)?.trim() || undefined;
  const expires = (formData.get("expires") as string)?.trim() || undefined;
  const baseUrl =
    (formData.get("baseUrl") as string)?.trim() ||
    "https://marcellinlele.lasolutions.net";

  if (!label || !audience || !channel) {
    return { success: false, error: "Champs requis manquants" };
  }

  const validAudiences: Audience[] = ["recruiter", "prospect"];
  const validChannels: Channel[] = ["email", "whatsapp", "linkedin", "other"];

  if (!validAudiences.includes(audience) || !validChannels.includes(channel)) {
    return { success: false, error: "Valeurs invalides" };
  }

  const prefix = audience === "recruiter" ? "r" : "p";
  const ref = `${prefix}_${crypto.randomBytes(8).toString("hex")}`;
  const today = new Date().toISOString().slice(0, 10);
  const campaignId = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${channel}-${today}`;
  const allowedPath = audience === "recruiter" ? "/fr/recruteur" : "/fr";

  try {
    addRuntimeCampaign({
      campaign_id: campaignId,
      ref,
      label,
      ...(position ? { position } : {}),
      audience,
      channel,
      created_at: today,
      active: true,
      ...(expires ? { expires_at: expires } : {}),
      allowed_path: allowedPath,
    });
  } catch {
    return {
      success: false,
      error:
        "Impossible de sauvegarder : le système de fichiers est en lecture seule. Sur Vercel, committez data/campaigns.json après chaque ajout ou migrez vers Vercel KV.",
    };
  }

  revalidatePath("/admin");

  const segment = audience === "recruiter" ? "recruteur" : "";
  const linkFr = `${baseUrl}/fr/${segment}?ref=${ref}`.replace(/\/\?/, "?");
  const linkEn = `${baseUrl}/en/${segment}?ref=${ref}`.replace(/\/\?/, "?");

  return { success: true, data: { linkFr, linkEn, campaignId, label } };
}

export async function deactivateCampaignAction(
  campaignId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const updated = updateRuntimeCampaign(campaignId, { active: false });
    if (!updated) {
      return {
        success: false,
        error: "Campagne introuvable dans le store runtime (campagne statique — modifiez registry.ts)",
      };
    }
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Erreur d'écriture sur le disque" };
  }
}
