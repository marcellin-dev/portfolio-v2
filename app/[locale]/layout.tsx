import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const locales: Locale[] = ["fr", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <SiteFooter locale={locale} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#17201C",
            color: "#F5F2EB",
            borderRadius: "6px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
