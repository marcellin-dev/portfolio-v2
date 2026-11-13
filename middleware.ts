import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "en";

function detectLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";

  // Parse "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7" into ordered language codes
  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, q] = part.trim().split(";q=");
      return { lang: lang.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .map((item) => item.lang);

  for (const lang of preferred) {
    if ((locales as readonly string[]).includes(lang)) {
      return lang as Locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
