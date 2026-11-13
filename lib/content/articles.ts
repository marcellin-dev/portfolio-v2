export type ArticleCategory = "ia" | "metier" | "devops";
export type ArticleLocale = "fr" | "both";

export interface ArticleMeta {
  slug: string;
  draft: boolean;
  locale: ArticleLocale;
  category: ArticleCategory;
  date: string; // ISO date
  updatedAt?: string;
  relatedProjects?: string[];
  title: { fr: string; en?: string };
  description: { fr: string; en?: string };
  readingTime: number; // minutes
}

// Registry of all articles — add an entry here to publish a new article
export const articleRegistry: ArticleMeta[] = [
  {
    slug: "pme-agent-ia-ou-automatisation",
    draft: false,
    locale: "fr",
    category: "ia",
    date: "2026-10-15",
    relatedProjects: ["assistant-whatsapp-calendar"],
    title: {
      fr: "Votre PME a-t-elle besoin d'un agent IA ou d'une automatisation classique ?",
    },
    description: {
      fr: "Avant d'investir dans un agent IA, posez-vous les bonnes questions. Un guide pratique pour choisir entre automatisation classique et agent LLM selon votre cas d'usage.",
    },
    readingTime: 8,
  },
  {
    slug: "whatsapp-nestjs-tool-calling",
    draft: false,
    locale: "fr",
    category: "ia",
    date: "2026-11-01",
    relatedProjects: ["assistant-whatsapp-calendar"],
    title: {
      fr: "Connecter WhatsApp à Google Calendar avec NestJS et le tool calling",
    },
    description: {
      fr: "Architecture et implémentation d'un assistant WhatsApp capable de lire et créer des événements Calendar via le function calling d'un LLM. Avec des exemples de code NestJS.",
    },
    readingTime: 12,
  },
  {
    slug: "deployer-nodejs-docker-cicd",
    draft: false,
    locale: "fr",
    category: "devops",
    date: "2026-11-10",
    relatedProjects: [],
    title: {
      fr: "Déployer une application Node.js avec Docker et un pipeline CI/CD",
    },
    description: {
      fr: "Du Dockerfile optimisé au pipeline GitHub Actions en passant par Nginx : un guide pratique pour livrer une application Node.js en production sans surprise.",
    },
    readingTime: 10,
  },
];

export function getPublishedArticles(): ArticleMeta[] {
  return articleRegistry.filter((a) => !a.draft);
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articleRegistry.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): ArticleMeta[] {
  return getPublishedArticles().filter((a) => a.category === category);
}

export function formatDate(isoDate: string, locale: "fr" | "en"): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
