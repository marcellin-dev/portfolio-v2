"use client";

import type { Attribution } from "./types";

const SESSION_KEY = "portfolio_attribution";

export function storeAttribution(attribution: Attribution): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable (private mode, storage full)
  }
}

export function readAttribution(): Attribution | undefined {
  if (typeof sessionStorage === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Attribution;
    if (
      typeof parsed.campaign_id !== "string" ||
      typeof parsed.audience !== "string" ||
      typeof parsed.channel !== "string"
    )
      return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

export function clearAttribution(): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function hasAttribution(): boolean {
  return readAttribution() !== undefined;
}
