import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getPublishedArticles, formatDate } from "@/lib/content/articles";
import Link from "next/link";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";

interface BlogSectionProps {
  locale: Locale;
}

export default function BlogSection({ locale }: BlogSectionProps) {
  const t = getTranslations(locale).blog;
  const articles = getPublishedArticles().slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section id="blog" className="py-24">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <AnimateOnScroll className="mb-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-heading font-black text-section-lg text-forest-dark mb-1">
                {t.sectionTitle}
              </h2>
              <p className="text-forest-dark/60 text-lg">{t.sectionSubtitle}</p>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-medium text-forest hover:underline underline-offset-4 whitespace-nowrap"
            >
              {t.viewAll} →
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <AnimateOnScroll key={article.slug} delay={i * 0.1}>
              <article>
                <div className="border-t-2 border-terracotta pt-5 mb-4" />
                <span className="text-xs font-semibold text-terracotta uppercase tracking-wider">
                  {t.categories[article.category]}
                </span>
                <h3 className="font-heading font-bold text-lg text-forest-dark mt-2 mb-3 leading-snug">
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className="hover:text-forest transition-colors"
                  >
                    {article.title.fr}
                  </Link>
                </h3>
                <p className="text-sm text-forest-dark/60 leading-relaxed mb-4">
                  {article.description.fr}
                </p>
                <div className="flex items-center justify-between">
                  <time
                    dateTime={article.date}
                    className="text-xs text-forest-dark/40"
                  >
                    {formatDate(article.date, locale)}
                  </time>
                  <span className="text-xs text-forest-dark/40">
                    {article.readingTime} min
                  </span>
                </div>
                {article.locale === "fr" && locale === "en" && (
                  <p className="text-xs text-forest-dark/40 mt-2 italic">
                    {t.langNote}
                  </p>
                )}
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
