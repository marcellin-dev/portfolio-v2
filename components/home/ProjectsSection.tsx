import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getFeaturedProjects } from "@/lib/content/projects";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import freemopayImg from "@/public/freemopayimg.png";
import kamixImg from "@/public/investorappimg.png";

const imageMap: Record<string, string | null> = {
  freemopay: "freemopay",
  kamix: "kamix",
};

function ProjectIllustration({ imageKey, title }: { imageKey: string | null; title: string }) {
  if (imageKey === "freemopay") {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-forest/10">
        <Image
          src={freemopayImg}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <span className="absolute bottom-2 left-2 text-[10px] text-white/60 bg-black/30 px-1.5 py-0.5 rounded">
          Illustration
        </span>
      </div>
    );
  }
  if (imageKey === "kamix") {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-terracotta/10">
        <Image
          src={kamixImg}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <span className="absolute bottom-2 left-2 text-[10px] text-white/60 bg-black/30 px-1.5 py-0.5 rounded">
          Illustration
        </span>
      </div>
    );
  }
  // No image available — typographic placeholder
  return (
    <div className="w-full aspect-[16/10] rounded-lg bg-forest/8 flex items-center justify-center border border-forest-dark/10">
      <span className="text-xs text-forest-dark/30 italic">Illustration</span>
    </div>
  );
}

interface ProjectsSectionProps {
  locale: Locale;
}

export default function ProjectsSection({ locale }: ProjectsSectionProps) {
  const t = getTranslations(locale);
  const featured = getFeaturedProjects();

  return (
    <section id="realisations" className="py-24">
      <div className="max-w-content mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="font-heading font-black text-section-lg text-forest-dark mb-16">
            {t.projects.sectionTitle}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {featured.map((project, i) => (
            <AnimateOnScroll key={project.slug} delay={i * 0.1}>
              <article className="flex flex-col gap-4">
                <ProjectIllustration
                  imageKey={project.imageKey ?? null}
                  title={project.title[locale]}
                />
                <div>
                  <span className="inline-block text-terracotta text-xs font-semibold tracking-wider uppercase mb-1">
                    —
                  </span>
                  <h3 className="font-heading font-bold text-xl text-forest-dark leading-snug">
                    {project.title[locale]}
                  </h3>
                  <p className="text-sm text-forest-dark/60 mt-1 leading-relaxed">
                    {project.summary[locale]}
                  </p>
                </div>
                <Link
                  href={`/${locale}/realisations/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-light transition-colors mt-auto"
                >
                  {t.projects.viewProject}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-16 text-center">
          <Link
            href={`/${locale}/realisations`}
            className="inline-flex items-center gap-2 border border-forest text-forest font-medium px-6 py-3 rounded hover:bg-forest hover:text-ivory transition-colors"
          >
            {t.projects.viewAll}
            <span aria-hidden="true">→</span>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
