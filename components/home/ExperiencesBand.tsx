import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface ExperiencesBandProps {
  locale: Locale;
}

const companies = ["FreemoPay", "lemlist", "Kamix", "Constellio via Nano Dev"];

export default function ExperiencesBand({ locale }: ExperiencesBandProps) {
  const t = getTranslations(locale);

  return (
    <section aria-label={t.experiencesBand.label} className="py-6">
      <div className="max-w-content mx-auto px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-xs font-semibold text-forest-dark/40 uppercase tracking-widest whitespace-nowrap">
            {t.experiencesBand.label}
          </span>
          <span className="hidden sm:block h-4 w-px bg-forest-dark/20" aria-hidden="true" />
          {companies.map((company) => (
            <span
              key={company}
              className="text-sm font-semibold text-forest-dark/70"
            >
              {company}
            </span>
          ))}
          <span className="hidden sm:block h-4 w-px bg-forest-dark/20 ml-auto" aria-hidden="true" />
          <span className="text-sm font-semibold text-terracotta ml-auto sm:ml-0 whitespace-nowrap">
            {t.experiencesBand.yearsLabel}
          </span>
        </div>
      </div>
      <div className="max-w-content mx-auto px-6 mt-6">
        <div className="h-px bg-forest-dark/10" />
      </div>
    </section>
  );
}
