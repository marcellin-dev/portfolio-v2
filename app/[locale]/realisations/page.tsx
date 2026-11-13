import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { projects } from "@/lib/content/projects";
import Link from "next/link";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import Image from "next/image";
import freemopayImg from "@/public/freemopayimg.png";
import kamixImg from "@/public/investorappimg.png";
import lemlistImg from "@/public/lemlist-logo.png";

const imagesByKey: Record<string, React.ComponentProps<typeof Image>["src"]> = {
  freemopay: freemopayImg,
  kamix: kamixImg,
  lemlist: lemlistImg,
};

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return {
    title:
      locale === "fr"
        ? "Réalisations — Marcellin Fougang Lele"
        : "Projects — Marcellin Fougang Lele",
    description:
      locale === "fr"
        ? "Projets réalisés en ingénierie logicielle fullstack, IA appliquée et DevOps."
        : "Completed projects in fullstack software engineering, applied AI and DevOps.",
  };
}

export default function RealisationsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const tr = getTranslations(locale);
  const t = tr.realisation;
  const tProjects = tr.projects;

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      {/* Header */}
      <AnimateOnScroll className="mb-16">
        <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-4">
          {locale === "fr" ? "Réalisations" : "Projects"}
        </p>
        <h1 className="font-heading font-black text-hero-sm text-forest-dark mb-4">
          {t.pageTitle}
        </h1>
        <p className="text-forest-dark/60 text-lg max-w-xl">{t.pageIntro}</p>
      </AnimateOnScroll>

      {/* Projects list */}
      <div className="space-y-6">
        {projects.map((project, i) => (
          <AnimateOnScroll key={project.slug} delay={i * 0.06}>
            <Link
              href={`/${locale}/realisations/${project.slug}`}
              className="group flex gap-6 items-start border border-forest-dark/10 rounded-xl p-6 hover:border-forest/40 hover:bg-forest/3 transition-all"
            >
              {/* Thumbnail */}
              <div className="shrink-0 w-20 h-16 rounded-lg overflow-hidden bg-forest/8 flex items-center justify-center">
                {project.imageKey && imagesByKey[project.imageKey] ? (
                  <Image
                    src={imagesByKey[project.imageKey]}
                    alt={project.title[locale]}
                    width={80}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xs text-forest-dark/30">—</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
                      {project.category === "ai"
                        ? "IA appliquée"
                        : project.category === "fintech"
                        ? "Fintech"
                        : project.category === "devops"
                        ? "DevOps"
                        : "Applications métier"}
                    </span>
                    <h2 className="font-heading font-bold text-xl text-forest-dark mt-1 mb-1 leading-snug">
                      {project.title[locale]}
                    </h2>
                    <p className="text-sm text-forest-dark/60 leading-relaxed line-clamp-2">
                      {project.summary[locale]}
                    </p>
                  </div>
                  <span className="text-forest font-medium text-sm whitespace-nowrap group-hover:translate-x-1 transition-transform">
                    {tProjects.viewProject} →
                  </span>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-forest-dark/50 border border-forest-dark/15 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-xs text-forest-dark/40">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
