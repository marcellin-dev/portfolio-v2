import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "./cv-document";
import type { Locale } from "@/lib/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filenames: Record<Locale, string> = {
  fr: "CV_Marcellin_Fougang_FR.pdf",
  en: "CV_Marcellin_Fougang_EN.pdf",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "fr";

  try {
    const element = React.createElement(CVDocument, { locale }) as never;
    const buffer = await renderToBuffer(element);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filenames[locale]}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new NextResponse("PDF generation failed", { status: 500 });
  }
}
