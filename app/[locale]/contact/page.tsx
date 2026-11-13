import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import ContactHome from "@/components/home/ContactHome";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return {
    title:
      locale === "fr"
        ? "Contact — Marcellin Fougang Lele"
        : "Contact — Marcellin Fougang Lele",
    description:
      locale === "fr"
        ? "Parlons de votre projet de développement logiciel ou d'automatisation IA."
        : "Let's discuss your software development or AI automation project.",
  };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return <ContactHome locale={locale} />;
}
