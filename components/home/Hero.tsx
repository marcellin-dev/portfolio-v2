import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import AssistantDemo from "./AssistantDemo";

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = getTranslations(locale);

  return (
    <section id="home" className="pt-20 pb-0">
      <div className="max-w-content mx-auto px-6">
        {/* Eyebrow */}
        <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-8">
          {t.hero.eyebrow}
        </p>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div>
            <h1 className="font-heading font-black text-hero-lg text-forest-dark mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            <p className="text-lg text-forest-dark/65 leading-relaxed mb-8 max-w-lg">
              {t.hero.intro}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 bg-forest text-ivory font-semibold px-6 py-3.5 rounded-lg hover:bg-forest-light transition-colors text-base"
              >
                {t.hero.cta}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${locale}/recruteur`}
                className="inline-flex items-center gap-2 border border-forest-dark/25 text-forest-dark text-sm font-medium px-5 py-3.5 rounded-lg hover:border-forest hover:text-forest transition-colors"
              >
                {t.hero.ctaSecondary}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 text-sm text-forest-dark/50">
                <span className="text-terracotta font-bold">5+</span>
                <span>{locale === "fr" ? "ans d'expérience" : "years of experience"}</span>
              </div>
              <span className="hidden sm:block w-px h-4 bg-forest-dark/15" aria-hidden="true" />
              <div className="flex items-center gap-2 text-sm text-forest-dark/50">
                <span className="text-terracotta font-bold">4</span>
                <span>{locale === "fr" ? "entreprises accompagnées" : "companies served"}</span>
              </div>
              <span className="hidden sm:block w-px h-4 bg-forest-dark/15" aria-hidden="true" />
              <p className="text-sm text-forest-dark/50">
                <span className="text-terracotta mr-1">/</span>
                {t.hero.location}
              </p>
            </div>
          </div>

          {/* Right column: WhatsApp demo */}
          <div className="w-full lg:sticky lg:top-20">
            {/* Label above */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-forest-dark/10" />
              <p className="text-xs font-medium text-forest-dark/40 italic whitespace-nowrap">
                {t.hero.demoLabel}
              </p>
              <div className="h-px flex-1 bg-forest-dark/10" />
            </div>

            <AssistantDemo locale={locale} />

            {/* What this shows */}
            <p className="text-xs text-forest-dark/40 text-center mt-3 leading-relaxed">
              {locale === "fr"
                ? "3 exemples d'automatisation IA connectée à vos outils métier"
                : "3 examples of AI automation connected to your business tools"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="max-w-content mx-auto px-6 mt-16">
        <div className="h-px bg-forest-dark/10" />
      </div>
    </section>
  );
}
