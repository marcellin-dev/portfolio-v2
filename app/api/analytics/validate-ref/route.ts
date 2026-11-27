import { NextRequest, NextResponse } from "next/server";
import { resolveCampaignAttribution } from "@/lib/analytics/campaigns/registry";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref") ?? "";

  // Basic sanitisation — reject anything that doesn't look like a ref
  if (!/^[a-z0-9_-]{6,64}$/i.test(ref)) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  const attribution = resolveCampaignAttribution(ref);

  if (!attribution) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      valid: true,
      campaign_id: attribution.campaign_id,
      audience: attribution.audience,
      channel: attribution.channel,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
