import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { getArticleBySlug, getPublishedArticles, formatDate } from "@/lib/content/articles";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import PmeArticle from "@/content/articles/pme-agent-ia-ou-automatisation";
import WhatsappArticle from "@/content/articles/whatsapp-nestjs-tool-calling";
import DockerArticle from "@/content/articles/deployer-nodejs-docker-cicd";

const articleComponents: Record<string, React.ComponentType> = {
  "pme-agent-ia-ou-automatisation": PmeArticle,
  "whatsapp-nestjs-tool-calling": WhatsappArticle,
  "deployer-nodejs-docker-cicd": DockerArticle,
};

export function generateStaticParams() {
  return getPublishedArticles().flatMap((a) => [
    { locale: "fr", slug: a.slug },
    { locale: "en", slug: a.slug },
  ]);
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.draft) return {};
  return {
    title: `${article.title.fr} — Marcellin Fougang Lele`,
    description: article.description.fr,
    openGraph: {
      title: article.title.fr,
      description: article.description.fr,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const article = getArticleBySlug(params.slug);
  if (!article || article.draft) notFound();

  const t = getTranslations(locale).blog;
  const ArticleContent = articleComponents[params.slug];
  if (!ArticleContent) notFound();

  return (
    <div className="max-w-[800px] mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-sm text-forest-dark/60 hover:text-forest transition-colors mb-12"
      >
        ← {locale === "fr" ? "Tous les articles" : "All articles"}
      </Link>

      {/* Article header */}
      <AnimateOnScroll>
        <div className="border-t-2 border-terracotta pt-6 mb-8">
          <span className="text-xs font-semibold text-terracotta uppercase tracking-wider block mb-4">
            {t.categories[article.category]}
          </span>
          <h1 className="font-heading font-black text-hero-sm text-forest-dark mb-4 leading-tight">
            {article.title.fr}
          </h1>
          <p className="text-xl text-forest-dark/60 leading-relaxed mb-6">
            {article.description.fr}
          </p>
          <div className="flex items-center gap-6 text-sm text-forest-dark/40 flex-wrap">
            <span>Marcellin Fougang Lele</span>
            <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
            <span>
              {article.readingTime} {locale === "fr" ? "min de lecture" : "min read"}
            </span>
          </div>
          {article.locale === "fr" && locale === "en" && (
            <p className="mt-4 text-sm text-forest-dark/50 italic border-l-2 border-terracotta/40 pl-4">
              {t.langNote}
            </p>
          )}
        </div>
      </AnimateOnScroll>

      {/* Article body */}
      <AnimateOnScroll delay={0.1}>
        <ArticleContent />
      </AnimateOnScroll>

      {/* Footer CTA */}
      <div className="mt-16 pt-8 border-t border-forest-dark/10">
        <p className="font-heading font-bold text-xl text-forest-dark mb-4">
          {locale === "fr" ? "Un projet à réaliser ?" : "A project in mind?"}
        </p>
        <p className="text-forest-dark/60 mb-6">
          {locale === "fr"
            ? "Je suis disponible pour des missions de développement et d'automatisation."
            : "I'm available for development and automation assignments."}
        </p>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 bg-forest text-ivory font-semibold px-6 py-3 rounded hover:bg-forest-light transition-colors"
        >
          {locale === "fr" ? "Me contacter" : "Contact me"} →
        </Link>
      </div>

      {/* Related projects */}
      {article.relatedProjects && article.relatedProjects.length > 0 && (
        <div className="mt-10 pt-8 border-t border-forest-dark/10">
          <p className="text-sm font-semibold text-forest-dark/40 uppercase tracking-wider mb-4">
            {locale === "fr" ? "Projet associé" : "Related project"}
          </p>
          <div className="flex flex-wrap gap-3">
            {article.relatedProjects.map((slug) => (
              <Link
                key={slug}
                href={`/${locale}/realisations/${slug}`}
                className="text-sm font-medium border border-forest text-forest px-4 py-2 rounded hover:bg-forest hover:text-ivory transition-colors"
              >
                {slug.replace(/-/g, " ")} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
