import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

interface SiteFooterProps {
  locale: Locale;
}

export default function SiteFooter({ locale }: SiteFooterProps) {
  const t = getTranslations(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forest-dark/10 mt-32">
      <div className="max-w-content mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Identity */}
          <div>
            <p className="font-heading font-bold text-xl text-forest-dark mb-2">
              marcellin<span className="text-terracotta">.</span>
            </p>
            <p className="text-sm text-forest-dark/60 leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-sm text-forest-dark/50 mt-1">
              {t.footer.location}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-semibold text-forest-dark/40 uppercase tracking-wider mb-4">
              {t.footer.links}
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${locale}/realisations`}
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  {t.nav.realisations}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#expertise`}
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  {t.nav.expertise}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/recruteur`}
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  {t.nav.recruiter}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-forest-dark/40 uppercase tracking-wider mb-4">
              {t.footer.contact}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:lelemarcellin@gmail.com"
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  lelemarcellin@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+237695509408"
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  +237 695 509 408
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/marcellin-fougang-0a35601b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/marcellin-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-forest-dark/70 hover:text-forest transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-forest-dark/10">
          <p className="text-xs text-forest-dark/40 text-center">
            {t.footer.legal.replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}
