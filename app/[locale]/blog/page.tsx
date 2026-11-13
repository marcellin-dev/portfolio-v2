import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import { getPublishedArticles, formatDate, type ArticleCategory } from "@/lib/content/articles";
import Link from "next/link";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return {
    title:
      locale === "fr"
        ? "Blog — Notes de terrain · Marcellin Fougang Lele"
        : "Blog — Field notes · Marcellin Fougang Lele",
    description:
      locale === "fr"
        ? "Articles sur le logiciel, l'IA appliquée et la mise en production."
        : "Articles on software, applied AI, and shipping to production.",
  };
}

const categoryOrder: ArticleCategory[] = ["ia", "devops", "metier"];

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).blog;
  const articles = getPublishedArticles();

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      {/* Header */}
      <AnimateOnScroll className="mb-16">
        <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-4">
          {t.sectionTitle}
        </p>
        <h1 className="font-heading font-black text-hero-sm text-forest-dark mb-4">
          {t.sectionSubtitle}
        </h1>
      </AnimateOnScroll>

      {/* Category filter — static display, no JS filtering for simplicity */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categoryOrder.map((cat) => (
          <span
            key={cat}
            className="text-xs font-medium border border-forest-dark/20 text-forest-dark/60 px-3 py-1.5 rounded"
          >
            {t.categories[cat]}
          </span>
        ))}
      </div>

      {/* Articles list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {articles.map((article, i) => (
          <AnimateOnScroll key={article.slug} delay={i * 0.08}>
            <article>
              <div className="border-t-2 border-terracotta pt-5 mb-4" />
              <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
                {t.categories[article.category]}
              </span>
              <h2 className="font-heading font-bold text-xl text-forest-dark mt-2 mb-3 leading-snug">
                <Link
                  href={`/${locale}/blog/${article.slug}`}
                  className="hover:text-forest transition-colors"
                >
                  {article.title.fr}
                </Link>
              </h2>
              <p className="text-sm text-forest-dark/60 leading-relaxed mb-5">
                {article.description.fr}
              </p>
              <div className="flex items-center justify-between text-xs text-forest-dark/40">
                <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
                <span>{article.readingTime} min</span>
              </div>
              {article.locale === "fr" && locale === "en" && (
                <p className="text-xs text-forest-dark/40 mt-2 italic">{t.langNote}</p>
              )}
            </article>
          </AnimateOnScroll>
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-forest-dark/40 text-center py-16">
          {locale === "fr" ? "Aucun article publié pour l'instant." : "No articles published yet."}
        </p>
      )}
    </div>
  );
}
