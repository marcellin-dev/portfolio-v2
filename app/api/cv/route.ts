import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { readFile, readdir, stat } from "fs/promises";
import { join } from "path";
import { CVDocument } from "./cv-document";
import type { Locale } from "@/lib/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filenames: Record<Locale, string> = {
  fr: "CV_Marcellin_Fougang_FR.pdf",
  en: "CV_Marcellin_Fougang_EN.pdf",
};

async function findLatestCV(): Promise<Buffer> {
  const publicDir = join(process.cwd(), "public");
  const files = await readdir(publicDir);
  const cvFiles = files.filter((f) => /^CV.*\.pdf$/i.test(f));
  if (cvFiles.length === 0) throw new Error("No CV PDF found in public");
  const withMtime = await Promise.all(
    cvFiles.map(async (f) => ({ f, mtime: (await stat(join(publicDir, f))).mtimeMs }))
  );
  withMtime.sort((a, b) => b.mtime - a.mtime);
  return readFile(join(publicDir, withMtime[0].f));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "fr";

  let buffer: Buffer;

  try {
    const element = React.createElement(CVDocument, { locale }) as never;
    buffer = await renderToBuffer(element);
  } catch (dynamicError) {
    console.error("[cv] Dynamic generation failed, falling back to static:", dynamicError);
    try {
      buffer = await findLatestCV();
    } catch (staticError) {
      console.error("[cv] Static fallback failed:", staticError);
      return new NextResponse(JSON.stringify({ error: "CV not available" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filenames[locale]}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
