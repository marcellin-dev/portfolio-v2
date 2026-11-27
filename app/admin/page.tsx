import { cookies } from "next/headers";
import type { Metadata } from "next";
import { verifySession } from "@/lib/admin/auth";
import { getAllCampaigns } from "@/lib/analytics/campaigns/registry";
import { getRuntimeCampaigns } from "@/lib/analytics/campaigns/runtime-store";
import AdminLogin from "@/components/admin/AdminLogin";
import CampaignDashboard from "@/components/admin/CampaignDashboard";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!verifySession(token)) {
    return <AdminLogin />;
  }

  const allCampaigns = getAllCampaigns();
  const runtimeIds = getRuntimeCampaigns().map((c) => c.campaign_id);

  return <CampaignDashboard campaigns={allCampaigns} runtimeIds={runtimeIds} />;
}
