import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

interface MethodSectionProps {
  locale: Locale;
}

export default function MethodSection({ locale }: MethodSectionProps) {
  const t = getTranslations(locale).method;

  return (
    <section id="methode" className="py-24">
      <div className="max-w-content mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="font-heading font-black text-section-lg text-forest-dark mb-16">
            {t.sectionTitle}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.steps.map((step, i) => (
            <AnimateOnScroll key={step.title} delay={i * 0.08}>
              <div className="relative">
                {/* Connector line (desktop) */}
                {i < t.steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-4 left-full w-6 h-px bg-forest-dark/20 z-10"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-terracotta text-ivory text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="font-heading font-bold text-base text-forest-dark">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-forest-dark/60 leading-relaxed pl-11">
                  {step.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
