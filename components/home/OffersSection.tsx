import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

interface OffersSectionProps {
  locale: Locale;
}

export default function OffersSection({ locale }: OffersSectionProps) {
  const t = getTranslations(locale).offers;

  const offers = [
    {
      number: "01",
      title: t.offer1Title,
      desc: t.offer1Desc,
      tags: ["TypeScript", "React", "NestJS", "API REST"],
    },
    {
      number: "02",
      title: t.offer2Title,
      desc: t.offer2Desc,
      tags: ["OpenAI API", "Tool calling", "WhatsApp", "Orchestration"],
    },
    {
      number: "03",
      title: t.offer3Title,
      desc: t.offer3Desc,
      tags: ["Docker", "GitHub Actions", "Nginx", "PostgreSQL"],
    },
  ];

  return (
    <section id="offres" className="py-24 bg-forest-dark text-ivory">
      <div className="max-w-content mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="font-heading font-black text-section-lg text-ivory mb-3">
            {t.sectionTitle}
          </h2>
          <p className="text-ivory/60 max-w-xl mb-16 text-lg">{t.sectionIntro}</p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {offers.map((offer, i) => (
            <AnimateOnScroll key={offer.number} delay={i * 0.1}>
              <div className="border-t border-ivory/20 pt-6">
                <span className="text-terracotta text-sm font-mono font-semibold block mb-4">
                  {offer.number}
                </span>
                <h3 className="font-heading font-bold text-xl text-ivory mb-3">
                  {offer.title}
                </h3>
                <p className="text-ivory/60 text-sm leading-relaxed mb-5">{offer.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {offer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-ivory/50 border border-ivory/20 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
