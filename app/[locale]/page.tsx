import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import Hero from "@/components/home/Hero";
import ExperiencesBand from "@/components/home/ExperiencesBand";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import OffersSection from "@/components/home/OffersSection";
import MethodSection from "@/components/home/MethodSection";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import BlogSection from "@/components/home/BlogSection";
import ContactHome from "@/components/home/ContactHome";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale);
  return {
    title:
      locale === "fr"
        ? "Marcellin Fougang Lele — Ingénieur logiciel senior · IA appliquée & DevOps"
        : "Marcellin Fougang Lele — Senior Software Engineer · Applied AI & DevOps",
    description:
      locale === "fr"
        ? t.hero.intro
        : t.hero.intro,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      title:
        locale === "fr"
          ? "Marcellin Fougang Lele — Ingénieur logiciel senior"
          : "Marcellin Fougang Lele — Senior Software Engineer",
      description: t.hero.intro,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;

  return (
    <>
      <Hero locale={locale} />
      <ExperiencesBand locale={locale} />
      <ServicesSection locale={locale} />
      <ProjectsSection locale={locale} />
      <OffersSection locale={locale} />
      <MethodSection locale={locale} />
      <ExpertiseSection locale={locale} />
      <BlogSection locale={locale} />
      <ContactHome locale={locale} />
    </>
  );
}
