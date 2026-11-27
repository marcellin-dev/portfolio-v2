import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import CvDownloadButton from "@/components/analytics/CvDownloadButton";
import ContactCtaLink from "@/components/analytics/ContactCtaLink";

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).recruiter;
  return {
    title: `${t.pageTitle} — Marcellin Fougang Lele`,
    description: t.summary,
    robots: { index: true, follow: true },
  };
}

const experienceData = [
  {
    id: "nano_dev_constellio",
    company: "Nano Dev SARL",
    client: { name: "Constellio", country: "Canada", group: "Harris Computer" },
    role: { fr: "Développeur Fullstack Senior", en: "Senior Full-Stack Developer" },
    dateLabel: { fr: "Février 2025 – Novembre 2026", en: "February 2025 – November 2026" },
    type: { fr: "Freelance", en: "Freelance" },
    highlights: {
      fr: [
        "Développement et tests d'applications ; participation aux choix d'architecture.",
        "Contribution à l'optimisation des performances.",
        "Réunions de suivi avec les interlocuteurs du projet.",
      ],
      en: [
        "Application development and testing; architectural decision contribution.",
        "Performance optimization contributions.",
        "Project follow-up meetings with stakeholders.",
      ],
    },
  },
  {
    id: "freemopay",
    company: "FreemoPay / Freemo Solutions SARL",
    client: null,
    role: { fr: "Head of Engineering", en: "Head of Engineering" },
    dateLabel: { fr: "Janvier 2021 – Aujourd'hui", en: "January 2021 – Present" },
    type: { fr: null, en: null },
    highlights: {
      fr: [
        "Pilotage de l'équipe technique et des projets d'intégration de paiement.",
        "Coordination des partenaires techniques, sécurité et fiabilité des transactions.",
        "Supervision serveurs, gestion des incidents.",
      ],
      en: [
        "Led the engineering team and payment integration projects.",
        "Coordinated technical partners; transaction security and reliability.",
        "Server oversight, incident management.",
      ],
    },
  },
  {
    id: "lemlist",
    company: "Lemlist",
    client: null,
    role: { fr: "Développeur Fullstack", en: "Full-Stack Developer" },
    dateLabel: { fr: "Août 2024 – Octobre 2024", en: "August 2024 – October 2024" },
    type: { fr: "Freelance · Télétravail", en: "Freelance · Remote" },
    highlights: {
      fr: [
        "Téléchargeur de vidéos LinkedIn et détecteur de spam.",
        "Développement, intégration et déploiement complets.",
      ],
      en: [
        "LinkedIn video downloader and spam detector.",
        "End-to-end development, integration, and deployment.",
      ],
    },
  },
  {
    id: "kamix",
    company: "Kamix SAS",
    client: null,
    role: { fr: "Développeur Fullstack", en: "Full-Stack Developer" },
    dateLabel: { fr: "2022 – 2024", en: "2022 – 2024" },
    type: { fr: "Télétravail", en: "Remote" },
    highlights: {
      fr: [
        "Plateforme KPI pour service de transfert d'argent crypto.",
        "Application de gestion des investisseurs (Node.js, React, MongoDB).",
        "Comptabilité crypto et collecte des prix historiques.",
      ],
      en: [
        "KPI platform for crypto money transfer service.",
        "Investor management application (Node.js, React, MongoDB).",
        "Crypto accounting and historical price collection.",
      ],
    },
  },
  {
    id: "abyster",
    company: "Abyster Consulting",
    client: null,
    role: { fr: "Ingénieur logiciel", en: "Software Engineer" },
    dateLabel: { fr: "Août 2022 – Février 2024", en: "August 2022 – February 2024" },
    type: { fr: null, en: null },
    highlights: {
      fr: [
        "Plugin Shopify (Node.js, React) et API Gateway .NET Core.",
        "Évolution plateforme Avomark (.NET MVC) et ERP DGI Congo (Angular).",
        "Solution de collecte de logs Elasticsearch/OpenSearch.",
      ],
      en: [
        "Shopify plugin (Node.js, React) and .NET Core API Gateway.",
        "Avomark loyalty platform (.NET MVC) and DGI Congo ERP (Angular).",
        "Log collection solution with Elasticsearch/OpenSearch.",
      ],
    },
  },
  {
    id: "bridge_africa",
    company: "Bridge Africa Ventures",
    client: null,
    role: { fr: "Développeur Frontend", en: "Frontend Developer" },
    dateLabel: { fr: "Août 2021 – Février 2022", en: "August 2021 – February 2022" },
    type: { fr: null, en: null },
    highlights: {
      fr: ["Développement d'interfaces web et intégration d'API."],
      en: ["Web interface development and API integration."],
    },
  },
];

const skillGroups = [
  { key: "frontend-backend", fr: "Frontend & Backend", en: "Frontend & Backend", tags: ["JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "NestJS", "API REST"] },
  { key: "backend-extra", fr: "Backend", en: "Backend", tags: ["C# / .NET", "Java / Spring Boot", "GraphQL", "WebSocket"] },
  { key: "data", fr: "Données", en: "Data", tags: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Prisma"] },
  { key: "arch", fr: "Architecture & qualité", en: "Architecture & quality", tags: ["Architecture modulaire", "SOLID", "DRY", "Clean code", "Tests"] },
  { key: "devops", fr: "DevOps & CI/CD", en: "DevOps & CI/CD", tags: ["Git", "GitHub Actions", "Jenkins", "Docker", "Docker Compose", "Nginx"] },
  { key: "extra", fr: "Complémentaires", en: "Additional", tags: ["Angular", "Flutter"] },
];

const aiItems = [
  { fr: "Agents de développement : Cursor, Codex — décomposition, implémentation, refactoring, tests.", en: "Development agents: Cursor, Codex — task decomposition, implementation, refactoring, tests." },
  { fr: "Context engineering et skills réutilisables pour guider les agents.", en: "Context engineering and reusable agent skills to guide agents." },
  { fr: "MCP (Model Context Protocol) — connexions agents aux outils et contextes.", en: "MCP (Model Context Protocol) — connecting agents to tools and contexts." },
  { fr: "LLM et tool calling : API OpenAI, function calling, orchestration backend.", en: "LLMs and tool calling: OpenAI API, function calling, backend orchestration." },
  { fr: "Automatisation conversationnelle : assistant WhatsApp avec NestJS, Prisma, Google Calendar.", en: "Conversational automation: WhatsApp assistant with NestJS, Prisma, Google Calendar." },
];

export default function RecruteurPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).recruiter;

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      {/* Header */}
      <AnimateOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start mb-16 pb-16 border-b border-forest-dark/10">
          <div>
            <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-4">
              {t.pageTitle}
            </p>
            <h1 className="font-heading font-black text-hero-sm text-forest-dark mb-2">
              Marcellin Fougang Lele
            </h1>
            <p className="text-xl font-medium text-forest-dark/70 mb-4">{t.title}</p>
            <p className="text-sm text-forest-dark/50 mb-6">{t.headline}</p>
            <p className="text-forest-dark/70 leading-relaxed max-w-2xl">{t.summary}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <ContactCtaLink
                href="mailto:lelemarcellin@gmail.com"
                method="email"
                locale={locale}
                ctaLocation="recruiter_header"
                className="text-sm text-forest-dark/60 hover:text-forest transition-colors"
              >
                lelemarcellin@gmail.com
              </ContactCtaLink>
              <ContactCtaLink
                href="tel:+237695509408"
                method="phone"
                locale={locale}
                ctaLocation="recruiter_header"
                className="text-sm text-forest-dark/60 hover:text-forest transition-colors"
              >
                +237 695 509 408
              </ContactCtaLink>
              <span className="text-sm text-forest-dark/40">Cameroun · Remote</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 lg:min-w-[200px]">
            <CvDownloadButton
              locale={locale}
              label={`${t.downloadCv} ↓`}
              ctaLocation="recruiter_header"
              className="inline-flex items-center justify-center gap-2 bg-forest text-ivory font-semibold px-5 py-3 rounded hover:bg-forest-light transition-colors text-sm"
            />
            <ContactCtaLink
              href={`/${locale}/contact`}
              method="form"
              locale={locale}
              ctaLocation="recruiter_header"
              className="inline-flex items-center justify-center gap-2 border border-forest text-forest font-medium px-5 py-3 rounded hover:bg-forest hover:text-ivory transition-colors text-sm"
            >
              {t.proposeInterview}
            </ContactCtaLink>
          </div>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        {/* Main */}
        <div className="space-y-16">
          {/* Experience */}
          <AnimateOnScroll>
            <h2 className="font-heading font-bold text-2xl text-forest-dark mb-8">{t.experience}</h2>
            <div className="space-y-10">
              {experienceData.map((exp) => (
                <div key={exp.id} className="border-l-2 border-terracotta/40 pl-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="font-heading font-bold text-lg text-forest-dark block">
                        {exp.role[locale]}
                      </span>
                      <span className="text-sm font-medium text-forest">
                        {exp.company}
                        {exp.client && (
                          <span className="text-forest-dark/50 font-normal">
                            {" "}· {t.mission} {exp.client.name} ({exp.client.country}, {exp.client.group})
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-forest-dark/50 block">{exp.dateLabel[locale]}</span>
                      {exp.type[locale] && (
                        <span className="text-xs text-forest-dark/40">{exp.type[locale]}</span>
                      )}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights[locale].map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm text-forest-dark/70 leading-relaxed">
                        <span className="text-terracotta shrink-0 mt-1">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Applied AI */}
          <AnimateOnScroll delay={0.1}>
            <h2 className="font-heading font-bold text-2xl text-forest-dark mb-6">{t.appliedAI}</h2>
            <ul className="space-y-3">
              {aiItems.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-forest-dark/70 leading-relaxed">
                  <span className="text-terracotta shrink-0 mt-0.5">→</span>
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>

          {/* Education */}
          <AnimateOnScroll delay={0.15}>
            <h2 className="font-heading font-bold text-2xl text-forest-dark mb-6">{t.education}</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-forest/30 pl-6">
                <span className="font-medium text-forest-dark block">
                  {locale === "fr"
                    ? "Ingénieur des travaux des télécommunications, option informatique"
                    : "Telecommunications Engineering Diploma, Computer Science specialization"}
                </span>
                <span className="text-sm text-forest-dark/60">
                  SUP-PTIC — École nationale des postes, des télécommunications et des TIC, Yaoundé · 2021
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Sidebar: skills */}
        <aside className="space-y-6">
          <AnimateOnScroll direction="left" className="sticky top-24">
            <h2 className="font-heading font-bold text-xl text-forest-dark mb-6">{t.skills}</h2>
            <div className="space-y-6">
              {skillGroups.map((group) => (
                <div key={group.key}>
                  <p className="text-xs font-semibold text-forest-dark/40 uppercase tracking-wider mb-2">
                    {group[locale] ?? group.fr}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-forest-dark/70 border border-forest-dark/15 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CKAD */}
            <div className="mt-6 pt-6 border-t border-forest-dark/10">
              <div className="flex items-center gap-2 text-sm text-forest-dark/60">
                <span className="w-2 h-2 rounded-full border-2 border-forest-dark/30" />
                <span>CKAD</span>
                <span className="text-xs text-terracotta border border-terracotta/30 px-1.5 py-0.5 rounded">
                  {t.inPrep}
                </span>
              </div>
            </div>

            {/* Download again */}
            <CvDownloadButton
              locale={locale}
              label={`${t.downloadCv} ↓`}
              ctaLocation="recruiter_sidebar"
              className="mt-6 flex items-center justify-center gap-2 bg-forest text-ivory font-semibold px-5 py-3 rounded hover:bg-forest-light transition-colors text-sm w-full"
            />
          </AnimateOnScroll>
        </aside>
      </div>
    </div>
  );
}
