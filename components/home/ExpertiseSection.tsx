import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

interface ExpertiseSectionProps {
  locale: Locale;
}

const stackMain = ["TypeScript", "React / Next.js", "Node.js / NestJS", "PostgreSQL", "Prisma"];
const stackBackend = ["C# / .NET", "Java / Spring Boot", "NestJS", "API REST", "GraphQL"];
const stackDevOps = ["Docker", "GitHub Actions", "Jenkins", "Nginx", "Administration serveurs"];
const stackData = ["PostgreSQL", "MongoDB", "MySQL", "SQL Server"];
const stackComplement = ["Angular", "Flutter"];

function SkillGroup({ title, tags }: { title: string; tags: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold text-forest-dark/40 uppercase tracking-wider mb-3">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium border border-forest-dark/20 text-forest-dark/80 px-2.5 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExpertiseSection({ locale }: ExpertiseSectionProps) {
  const t = getTranslations(locale).expertise;

  return (
    <section id="expertise" className="py-24">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
          {/* Left */}
          <div>
            <AnimateOnScroll>
              <h2 className="font-heading font-black text-section-lg text-forest-dark mb-4">
                {t.sectionTitle}
              </h2>
              <p className="text-forest-dark/60 text-lg mb-10">{t.sectionIntro}</p>
            </AnimateOnScroll>

            {/* Skills grid */}
            <AnimateOnScroll delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <SkillGroup title={t.stack} tags={stackMain} />
                <SkillGroup title={t.backend} tags={stackBackend} />
                <SkillGroup title={t.devops} tags={stackDevOps} />
                <SkillGroup title={t.data} tags={stackData} />
                <SkillGroup title={t.complementary} tags={stackComplement} />
              </div>
            </AnimateOnScroll>

            {/* Certifications */}
            <AnimateOnScroll delay={0.2} className="mt-10">
              <div className="border-t border-forest-dark/10 pt-6">
                <span className="inline-flex items-center gap-2 text-sm text-forest-dark/60">
                  <span className="inline-block w-2 h-2 rounded-full border-2 border-forest-dark/40" />
                  CKAD — Certified Kubernetes Application Developer
                  <span className="text-xs text-terracotta font-medium border border-terracotta/30 px-1.5 py-0.5 rounded">
                    {t.inPrep}
                  </span>
                </span>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: recruiter card */}
          <AnimateOnScroll direction="left" className="self-start">
            <div className="bg-forest text-ivory rounded-xl p-8 sticky top-24">
              <p className="text-xs font-semibold text-ivory/50 uppercase tracking-widest mb-4">
                {locale === "fr" ? "Profil recruteur" : "Recruiter profile"}
              </p>
              <h3 className="font-heading font-bold text-xl mb-2">
                {locale === "fr" ? "Marcellin Fougang Lele" : "Marcellin Fougang Lele"}
              </h3>
              <p className="text-ivory/70 text-sm mb-6 leading-relaxed">
                {locale === "fr"
                  ? "Développeur Fullstack Senior · TypeScript · React · NestJS · Fintech"
                  : "Senior Full-Stack Developer · TypeScript · React · NestJS · Fintech"}
              </p>
              <div className="space-y-3">
                <Link
                  href={`/${locale}/recruteur`}
                  className="flex items-center justify-center gap-2 bg-ivory text-forest-dark font-semibold px-5 py-3 rounded hover:bg-ivory/90 transition-colors text-sm"
                >
                  {t.recruiterCta}
                </Link>
                <a
                  href={`/api/cv?locale=${locale}`}
                  download
                  className="flex items-center justify-center gap-2 border border-ivory/30 text-ivory/80 hover:text-ivory hover:border-ivory/60 px-5 py-3 rounded transition-colors text-sm"
                >
                  {t.downloadCv}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
