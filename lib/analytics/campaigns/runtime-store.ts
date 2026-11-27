import fs from "fs";
import path from "path";
import type { Campaign } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "campaigns.json");

export function getRuntimeCampaigns(): Campaign[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) as Campaign[];
  } catch {
    return [];
  }
}

function write(campaigns: Campaign[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(campaigns, null, 2) + "\n", "utf8");
}

export function addRuntimeCampaign(campaign: Campaign): void {
  const existing = getRuntimeCampaigns();
  const idx = existing.findIndex((c) => c.campaign_id === campaign.campaign_id);
  if (idx >= 0) {
    existing[idx] = campaign;
  } else {
    existing.push(campaign);
  }
  write(existing);
}

export function updateRuntimeCampaign(
  campaignId: string,
  patch: Partial<Campaign>
): boolean {
  const existing = getRuntimeCampaigns();
  const idx = existing.findIndex((c) => c.campaign_id === campaignId);
  if (idx < 0) return false;
  existing[idx] = { ...existing[idx], ...patch };
  write(existing);
  return true;
}
