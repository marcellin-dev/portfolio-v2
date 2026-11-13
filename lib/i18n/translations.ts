export type Locale = "fr" | "en";

const translations = {
  fr: {
    nav: {
      realisations: "Réalisations",
      expertise: "Expertise",
      blog: "Blog",
      contact: "Me contacter",
      recruiter: "Vous recrutez ?",
      langSwitch: "EN",
      langSwitchLabel: "Switch to English",
    },
    hero: {
      eyebrow: "Ingénieur logiciel senior · IA appliquée & DevOps",
      title: "Je construis vos logiciels. J'automatise vos opérations.",
      intro:
        "Je suis Marcellin Fougang Lele. J'aide les PME et les équipes produit à créer des applications fiables, à connecter l'IA à leurs outils métier et à accompagner leur mise en production.",
      cta: "Parlons de votre projet",
      ctaSecondary: "Vous recrutez ?",
      location: "Basé au Cameroun · Collaboration à distance",
      demoLabel: "Démonstration illustrative",
      demoTitle: "Assistant WhatsApp",
      demoSubtitle: "Des conversations aux actions métier",
    },
    experiencesBand: {
      label: "Expériences & missions",
      yearsLabel: "5+ ans d'expérience",
    },
    projects: {
      sectionTitle: "Des projets concrets. Des décisions expliquées.",
      viewProject: "Voir le projet",
      viewAll: "Toutes les réalisations",
      noImage: "Illustration",
    },
    offers: {
      sectionTitle: "Ce que je construis pour vous",
      sectionIntro:
        "Trois domaines d'intervention, une approche commune : comprendre votre métier avant de coder.",
      offer1Title: "Applications métier",
      offer1Desc:
        "API, interfaces, intégrations de services tiers — des solutions pensées pour vos utilisateurs réels.",
      offer2Title: "Automatisations IA",
      offer2Desc:
        "Connexion d'un LLM à vos données et vos outils : extraction, classification, assistants conversationnels.",
      offer3Title: "Déploiement & exploitation",
      offer3Desc:
        "Docker, CI/CD, Nginx, supervision des serveurs — votre application livrée et maintenue en production.",
    },
    method: {
      sectionTitle: "Comment nous travaillons",
      steps: [
        { title: "Cadrage", desc: "Comprendre votre besoin réel avant de proposer une solution technique." },
        { title: "Réalisation", desc: "Développement itératif avec retours réguliers et code testé." },
        { title: "Validation", desc: "Tests en conditions réelles, correction des cas limites." },
        { title: "Mise en production", desc: "Déploiement maîtrisé, monitoring, zéro surprise." },
        { title: "Transmission", desc: "Documentation, formation si nécessaire, suivi post-livraison." },
      ],
    },
    expertise: {
      sectionTitle: "Parcours & expertise",
      sectionIntro: "Plus de 5 ans d'expérience en ingénierie logicielle fullstack, fintech et IA appliquée.",
      recruiterCta: "Présentation recruteur",
      downloadCv: "Télécharger mon CV",
      inPrep: "En préparation",
      stack: "Stack principale",
      backend: "Backend",
      devops: "DevOps & CI/CD",
      data: "Données",
      complementary: "Complémentaires",
    },
    blog: {
      sectionTitle: "Notes de terrain",
      sectionSubtitle: "Logiciel, IA et mise en production",
      viewArticle: "Lire l'article",
      viewAll: "Tous les articles",
      categories: {
        ia: "IA appliquée",
        metier: "Applications métier",
        devops: "Cloud & DevOps",
      },
      langNote: "Article disponible en français uniquement",
    },
    contact: {
      sectionTitle: "Parlons de votre projet",
      sectionIntro:
        "Une idée, un besoin technique ou une question sur vos options ? Décrivez votre projet — je vous réponds sous 24h.",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre adresse email",
      messagePlaceholder: "Décrivez votre projet ou votre besoin…",
      requestType: "Type de demande",
      typeProject: "Projet ou application",
      typeAI: "Automatisation IA",
      typeRecruiting: "Recrutement",
      typeOther: "Autre",
      sendButton: "Envoyer le message",
      sending: "Envoi en cours…",
      successMessage: "Message envoyé. Je vous réponds sous 24h.",
      errorMessage: "Une erreur est survenue. Contactez-moi directement :",
      orEmail: "Ou par email directement :",
      orPhone: "Téléphone :",
    },
    footer: {
      tagline: "Ingénieur logiciel senior · IA appliquée & DevOps",
      location: "Basé au Cameroun · Missions à distance",
      links: "Liens",
      legal: "© {year} Marcellin Fougang Lele. Tous droits réservés.",
      contact: "Contact",
    },
    recruiter: {
      pageTitle: "Présentation recruteur",
      title: "Développeur Fullstack Senior",
      headline: "TypeScript · React / Next.js · Node.js / NestJS · Fintech",
      summary:
        "Ingénieur logiciel avec plus de 5 ans d'expérience en développement fullstack. Spécialisé en TypeScript, React/Next.js et Node.js/NestJS. Expérience des paiements et des applications financières, responsabilités de Head of Engineering chez FreemoPay et mission pour Constellio (groupe Harris Computer).",
      downloadCv: "Télécharger mon CV",
      proposeInterview: "Proposer un entretien",
      experience: "Expérience professionnelle",
      skills: "Compétences techniques",
      education: "Formation",
      appliedAI: "IA appliquée et workflows agentiques",
      inPrep: "En préparation",
      present: "Aujourd'hui",
      freelance: "Freelance",
      remote: "Télétravail",
      mission: "Mission via",
    },
    realisation: {
      pageTitle: "Réalisations",
      pageIntro: "Projets réalisés, rôles exercés, technologies justifiées.",
      backToList: "← Toutes les réalisations",
      role: "Mon rôle",
      context: "Contexte",
      achievements: "Réalisations",
      technologies: "Technologies",
      results: "Résultats",
      contactCta: "Discutons de votre projet",
      noImage: "Illustration typographique — capture non disponible",
    },
    assistant: {
      step1Trigger: "Je souhaite prendre rendez-vous.",
      step2Response: "Voici les créneaux disponibles :",
      slots: [
        "Lundi · 14h00",
        "Mercredi · 10h30",
        "Vendredi · 09h00",
      ],
      step3Confirm: "Valider ce créneau",
      step4Result: "Créneau enregistré (démonstration simulée). En production, l'événement serait créé dans Google Calendar.",
      restart: "Recommencer la démonstration",
      howItWorks: "Comment ça fonctionne",
      howDesc:
        "Dans le projet réel, un message WhatsApp déclenche un webhook NestJS. Le backend appelle l'API OpenAI avec un registre d'outils (tool calling). L'outil sélectionné peut lire et créer des événements Google Calendar. La réponse est renvoyée en message WhatsApp.",
    },
  },
  en: {
    nav: {
      realisations: "Projects",
      expertise: "Expertise",
      blog: "Blog",
      contact: "Contact",
      recruiter: "Hiring?",
      langSwitch: "FR",
      langSwitchLabel: "Passer en français",
    },
    hero: {
      eyebrow: "Senior Software Engineer · Applied AI & DevOps",
      title: "I build your software. I automate your operations.",
      intro:
        "I'm Marcellin Fougang Lele. I help SMBs and product teams build reliable applications, connect AI to their business tools, and ship to production.",
      cta: "Let's talk about your project",
      ctaSecondary: "Hiring?",
      location: "Based in Cameroon · Remote collaboration",
      demoLabel: "Illustrative demo",
      demoTitle: "WhatsApp Assistant",
      demoSubtitle: "From conversations to business actions",
    },
    experiencesBand: {
      label: "Experience & assignments",
      yearsLabel: "5+ years of experience",
    },
    projects: {
      sectionTitle: "Real projects. Decisions explained.",
      viewProject: "View project",
      viewAll: "All projects",
      noImage: "Illustration",
    },
    offers: {
      sectionTitle: "What I build for you",
      sectionIntro:
        "Three focus areas, one shared approach: understand your business before writing a line of code.",
      offer1Title: "Business applications",
      offer1Desc:
        "APIs, interfaces, third-party integrations — solutions designed for your real users.",
      offer2Title: "AI automations",
      offer2Desc:
        "Connecting an LLM to your data and tools: extraction, classification, conversational assistants.",
      offer3Title: "Deployment & operations",
      offer3Desc:
        "Docker, CI/CD, Nginx, server monitoring — your application shipped and maintained in production.",
    },
    method: {
      sectionTitle: "How we work",
      steps: [
        { title: "Scoping", desc: "Understanding your real need before proposing a technical solution." },
        { title: "Development", desc: "Iterative development with regular feedback and tested code." },
        { title: "Validation", desc: "Real-world testing, edge case fixes." },
        { title: "Deployment", desc: "Controlled deployment, monitoring, no surprises." },
        { title: "Handover", desc: "Documentation, training if needed, post-delivery follow-up." },
      ],
    },
    expertise: {
      sectionTitle: "Background & expertise",
      sectionIntro: "Over 5 years of experience in fullstack software engineering, fintech, and applied AI.",
      recruiterCta: "Recruiter profile",
      downloadCv: "Download my CV",
      inPrep: "In preparation",
      stack: "Main stack",
      backend: "Backend",
      devops: "DevOps & CI/CD",
      data: "Data",
      complementary: "Additional",
    },
    blog: {
      sectionTitle: "Field notes",
      sectionSubtitle: "Software, AI, and shipping to production",
      viewArticle: "Read article",
      viewAll: "All articles",
      categories: {
        ia: "Applied AI",
        metier: "Business apps",
        devops: "Cloud & DevOps",
      },
      langNote: "Article available in French only",
    },
    contact: {
      sectionTitle: "Let's talk about your project",
      sectionIntro:
        "An idea, a technical need, or a question about your options? Describe your project — I'll reply within 24h.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email address",
      messagePlaceholder: "Describe your project or need…",
      requestType: "Request type",
      typeProject: "Project or application",
      typeAI: "AI automation",
      typeRecruiting: "Recruiting",
      typeOther: "Other",
      sendButton: "Send message",
      sending: "Sending…",
      successMessage: "Message sent. I'll reply within 24h.",
      errorMessage: "Something went wrong. Contact me directly:",
      orEmail: "Or by email:",
      orPhone: "Phone:",
    },
    footer: {
      tagline: "Senior Software Engineer · Applied AI & DevOps",
      location: "Based in Cameroon · Remote assignments",
      links: "Links",
      legal: "© {year} Marcellin Fougang Lele. All rights reserved.",
      contact: "Contact",
    },
    recruiter: {
      pageTitle: "Recruiter profile",
      title: "Senior Full-Stack Developer",
      headline: "TypeScript · React / Next.js · Node.js / NestJS · Fintech",
      summary:
        "Software engineer with over five years of full-stack development experience. Specializing in TypeScript, React/Next.js and Node.js/NestJS. Experience in payments and financial applications, with Head of Engineering responsibilities at FreemoPay and an assignment for Constellio (Harris Computer group).",
      downloadCv: "Download my CV",
      proposeInterview: "Propose an interview",
      experience: "Professional experience",
      skills: "Technical skills",
      education: "Education",
      appliedAI: "Applied AI and agentic workflows",
      inPrep: "In preparation",
      present: "Present",
      freelance: "Freelance",
      remote: "Remote",
      mission: "Assignment through",
    },
    realisation: {
      pageTitle: "Projects",
      pageIntro: "Completed projects, roles held, justified technologies.",
      backToList: "← All projects",
      role: "My role",
      context: "Context",
      achievements: "Achievements",
      technologies: "Technologies",
      results: "Results",
      contactCta: "Let's discuss your project",
      noImage: "Typographic illustration — screenshot not available",
    },
    assistant: {
      step1Trigger: "I'd like to schedule a meeting.",
      step2Response: "Here are the available slots:",
      slots: [
        "Monday · 2:00 PM",
        "Wednesday · 10:30 AM",
        "Friday · 9:00 AM",
      ],
      step3Confirm: "Confirm this slot",
      step4Result: "Slot recorded (simulated demo). In production, the event would be created in Google Calendar.",
      restart: "Restart demo",
      howItWorks: "How it works",
      howDesc:
        "In the real project, a WhatsApp message triggers a NestJS webhook. The backend calls the OpenAI API with a tool registry (tool calling). The selected tool can read and create Google Calendar events. The response is sent back as a WhatsApp message.",
    },
  },
} as const;

export type TranslationKey = typeof translations.fr;

export function getTranslations(locale: Locale): (typeof translations)[Locale] {
  return translations[locale] ?? translations.fr;
}

export function t(locale: Locale, ...path: string[]): string {
  let obj: Record<string, unknown> = getTranslations(locale) as unknown as Record<string, unknown>;
  for (const key of path) {
    obj = (obj?.[key] as Record<string, unknown>) ?? {};
  }
  return (typeof obj === "string" ? obj : "") as string;
}
