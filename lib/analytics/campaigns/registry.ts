/**
 * Campaign registry — SERVER-SIDE ONLY.
 * Never import from client components.
 *
 * Static campaigns below are examples/defaults (active: false).
 * Runtime campaigns added via /admin are stored in data/campaigns.json
 * and override static ones with the same campaign_id.
 */
import type { Campaign, Attribution } from "./types";
import { getRuntimeCampaigns } from "./runtime-store";

const staticCampaigns: Campaign[] = [
  // ── Example campaigns (active: false — do not activate these) ─────────────
  {
    campaign_id: "example-recruiter-email-01",
    ref: "r_q8k2mf9xvz3p",
    label: "Example Corp",
    position: "Senior Fullstack Developer",
    audience: "recruiter",
    channel: "email",
    created_at: "2024-11-01",
    active: false,
  },
  {
    campaign_id: "example-recruiter-linkedin-01",
    ref: "r_p3h7wz6njk9m",
    label: "Example Corp",
    position: "Senior Fullstack Developer",
    audience: "recruiter",
    channel: "linkedin",
    created_at: "2024-11-01",
    active: false,
  },
  {
    campaign_id: "example-prospect-email-01",
    ref: "p_m5x9kw2rzq7n",
    label: "Prospect Project",
    audience: "prospect",
    channel: "email",
    created_at: "2024-11-01",
    active: false,
  },
];

/** Merges static + runtime campaigns. Runtime campaigns take precedence. */
export function getAllCampaigns(): Campaign[] {
  const runtime = getRuntimeCampaigns();
  const runtimeIds = new Set(runtime.map((c) => c.campaign_id));
  const statics = staticCampaigns.filter((c) => !runtimeIds.has(c.campaign_id));
  return [...statics, ...runtime];
}

export function findCampaignByRef(ref: string): Campaign | undefined {
  return getAllCampaigns().find((c) => c.ref === ref);
}

export function isCampaignActive(campaign: Campaign): boolean {
  if (!campaign.active) return false;
  if (campaign.expires_at && new Date(campaign.expires_at) < new Date()) return false;
  return true;
}

export function resolveCampaignAttribution(ref: string): Attribution | null {
  const c = findCampaignByRef(ref);
  if (!c || !isCampaignActive(c)) return null;
  return { campaign_id: c.campaign_id, audience: c.audience, channel: c.channel };
}

/** Returns label + position for alert emails. Never expose to client. */
export function getCampaignMeta(
  campaign_id: string
): { label: string; position?: string } | undefined {
  return getAllCampaigns().find((c) => c.campaign_id === campaign_id);
}
