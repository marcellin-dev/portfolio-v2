import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { writeFile } from "fs/promises";
import { join } from "path";
import { CVDocument } from "../app/api/cv/cv-document";

const outputs: Array<{ locale: "fr" | "en"; filename: string }> = [
  { locale: "fr", filename: "CV-Marcellin-Fougang-FR.pdf" },
  { locale: "en", filename: "CV-Marcellin-Fougang-EN.pdf" },
];

async function generate() {
  for (const { locale, filename } of outputs) {
    const element = React.createElement(CVDocument, { locale });
    const buffer = await renderToBuffer(element as never);
    await writeFile(join(process.cwd(), "public", filename), buffer);
    console.log(`[cv] Generated ${filename}`);
  }
}

generate().catch((err) => {
  console.error("[cv] Generation failed:", err);
  process.exit(1);
});
