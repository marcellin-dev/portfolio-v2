import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { getProjectBySlug, projects } from "@/lib/content/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import ContactHome from "@/components/home/ContactHome";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title[locale]} — Marcellin Fougang Lele`,
    description: project.summary[locale],
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const t = getTranslations(locale).realisation;

  return (
    <>
      <div className="max-w-content mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href={`/${locale}/realisations`}
          className="inline-flex items-center gap-2 text-sm text-forest-dark/60 hover:text-forest transition-colors mb-12"
        >
          {t.backToList}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
          {/* Main content */}
          <div>
            <AnimateOnScroll>
              <span className="text-xs font-semibold text-terracotta uppercase tracking-widest block mb-4">
                {project.category === "ai"
                  ? "IA appliquée"
                  : project.category === "fintech"
                  ? "Fintech"
                  : project.category === "devops"
                  ? "DevOps"
                  : "Applications métier"}
              </span>
              <h1 className="font-heading font-black text-hero-sm text-forest-dark mb-6 leading-tight">
                {project.title[locale]}
              </h1>
              <p className="text-xl text-forest-dark/70 leading-relaxed mb-12">
                {project.summary[locale]}
              </p>
            </AnimateOnScroll>

            {/* Role */}
            <AnimateOnScroll delay={0.1}>
              <section className="mb-10">
                <h2 className="font-heading font-bold text-lg text-forest-dark mb-3 pb-3 border-b border-forest-dark/10">
                  {t.role}
                </h2>
                <p className="text-forest-dark/70 leading-relaxed">{project.role[locale]}</p>
              </section>
            </AnimateOnScroll>

            {/* Context */}
            {project.context[locale] && (
              <AnimateOnScroll delay={0.15}>
                <section className="mb-10">
                  <h2 className="font-heading font-bold text-lg text-forest-dark mb-3 pb-3 border-b border-forest-dark/10">
                    {t.context}
                  </h2>
                  <p className="text-forest-dark/70 leading-relaxed">{project.context[locale]}</p>
                </section>
              </AnimateOnScroll>
            )}

            {/* Achievements */}
            <AnimateOnScroll delay={0.2}>
              <section className="mb-10">
                <h2 className="font-heading font-bold text-lg text-forest-dark mb-4 pb-3 border-b border-forest-dark/10">
                  {t.achievements}
                </h2>
                <ul className="space-y-3">
                  {project.achievements[locale].map((item, i) => (
                    <li key={i} className="flex gap-3 text-forest-dark/70 leading-relaxed">
                      <span className="text-terracotta mt-1 shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </AnimateOnScroll>

            {/* Results */}
            {project.results && project.results[locale].length > 0 && (
              <AnimateOnScroll delay={0.25}>
                <section className="mb-10">
                  <h2 className="font-heading font-bold text-lg text-forest-dark mb-4 pb-3 border-b border-forest-dark/10">
                    {t.results}
                  </h2>
                  <ul className="space-y-3">
                    {project.results[locale].map((item, i) => (
                      <li key={i} className="flex gap-3 text-forest-dark/70 leading-relaxed">
                        <span className="text-terracotta mt-1 shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimateOnScroll>
            )}

            {/* External links */}
            {project.links && project.links.length > 0 && (
              <AnimateOnScroll delay={0.3}>
                <div className="flex flex-wrap gap-3 mt-4">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium border border-forest text-forest px-4 py-2 rounded hover:bg-forest hover:text-ivory transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </AnimateOnScroll>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Technologies */}
            <AnimateOnScroll direction="left">
              <div className="bg-forest text-ivory rounded-xl p-6 sticky top-24">
                <h3 className="font-heading font-bold text-sm text-ivory/60 uppercase tracking-wider mb-4">
                  {t.technologies}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-ivory/80 border border-ivory/20 px-2.5 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-ivory/20">
                  <Link
                    href={`/${locale}/contact`}
                    className="flex items-center justify-center gap-2 bg-ivory text-forest-dark font-semibold px-4 py-3 rounded text-sm hover:bg-ivory/90 transition-colors"
                  >
                    {t.contactCta} →
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </aside>
        </div>
      </div>

      {/* Contact section at bottom */}
      <div className="border-t border-forest-dark/10">
        <ContactHome locale={locale} />
      </div>
    </>
  );
}
