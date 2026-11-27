/**
 * Campaign registry — SERVER-SIDE ONLY.
 * Never import from client components.
 * Adding or modifying a campaign requires a redeployment.
 */
import type { Campaign, Attribution } from "./types";

const campaigns: Campaign[] = [
  // ── Recruiter campaigns ────────────────────────────────────────────────────
  // Generate new refs with: npm run add-campaign
  {
    campaign_id: "example-recruiter-email-01",
    ref: "r_q8k2mf9xvz3p",
    label: "Example Corp",
    position: "Senior Fullstack Developer",
    audience: "recruiter",
    channel: "email",
    created_at: "2024-11-01",
    active: false, // Set to true when sending
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
  // ── Prospect / freelance campaigns ────────────────────────────────────────
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

export function findCampaignByRef(ref: string): Campaign | undefined {
  return campaigns.find((c) => c.ref === ref);
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
  return campaigns.find((c) => c.campaign_id === campaign_id);
}

export function getAllCampaigns(): Campaign[] {
  return campaigns;
}
