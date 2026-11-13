"use client";

import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface SiteHeaderProps {
  locale: Locale;
}

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const t = getTranslations(locale);
  const pathname = usePathname();
  const otherLocale = locale === "fr" ? "en" : "fr";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build alternate-locale path
  function altLocalePath() {
    if (pathname.startsWith(`/${locale}`)) {
      return pathname.replace(`/${locale}`, `/${otherLocale}`);
    }
    return `/${otherLocale}`;
  }

  const navLinks = [
    { href: `/${locale}#services`, label: locale === "fr" ? "Services" : "Services" },
    { href: `/${locale}/realisations`, label: t.nav.realisations },
    { href: `/${locale}/blog`, label: t.nav.blog },
  ];

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-ivory/95 backdrop-blur-sm shadow-sm" : "bg-ivory"
      }`}
    >
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-heading font-bold text-xl text-forest-dark tracking-tight"
          aria-label="Marcellin — Accueil"
        >
          marcellin<span className="text-terracotta">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-forest ${
                isActive(link.href)
                  ? "text-forest font-semibold"
                  : "text-forest-dark/70"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Recruiter link */}
          <Link
            href={`/${locale}/recruteur`}
            className={`text-sm font-medium border rounded-full px-3 py-1 transition-colors ${
              isActive(`/${locale}/recruteur`)
                ? "border-forest text-forest bg-forest/5"
                : "border-forest-dark/25 text-forest-dark/60 hover:border-forest hover:text-forest"
            }`}
          >
            {t.nav.recruiter}
          </Link>

          {/* Separator */}
          <span className="h-4 w-px bg-forest-dark/20" aria-hidden="true" />

          {/* Language switch */}
          <Link
            href={altLocalePath()}
            className="text-sm font-medium text-forest-dark/60 hover:text-forest transition-colors"
            aria-label={t.nav.langSwitchLabel}
          >
            {t.nav.langSwitch}
          </Link>

          {/* CTA */}
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-forest text-ivory text-sm font-medium px-4 py-2 rounded hover:bg-forest-light transition-colors"
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Mobile: lang + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={altLocalePath()}
            className="text-xs font-medium text-forest-dark/60 hover:text-forest transition-colors"
            aria-label={t.nav.langSwitchLabel}
          >
            {t.nav.langSwitch}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Ouvrir le menu"
            className="p-2 text-forest-dark"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={`h-0.5 bg-forest-dark transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-forest-dark transition-all ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-forest-dark transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Separator line */}
      <div className="h-px bg-forest-dark/10" />

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-ivory border-t border-forest-dark/10 px-6 py-4 flex flex-col gap-4"
          aria-label="Navigation mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href) ? "text-forest font-semibold" : "text-forest-dark/70"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/recruteur`}
            className="text-sm font-medium border border-forest-dark/25 text-forest-dark/60 rounded-full px-4 py-2 text-center hover:border-forest hover:text-forest transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.recruiter}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center bg-forest text-ivory text-sm font-medium px-4 py-2.5 rounded hover:bg-forest-light transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.contact}
          </Link>
        </nav>
      )}
    </header>
  );
}
