
export type ProjectCategory = "ai" | "fintech" | "enterprise" | "devops";

export interface Project {
  slug: string;
  featured: boolean;
  category: ProjectCategory;
  imageKey?: string | null; // key to resolve in component
  title: { fr: string; en: string };
  summary: { fr: string; en: string };
  role: { fr: string; en: string };
  context: { fr: string; en: string };
  achievements: { fr: string[]; en: string[] };
  technologies: string[];
  results?: { fr: string[]; en: string[] };
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    slug: "assistant-whatsapp-calendar",
    featured: true,
    category: "ai",
    imageKey: null,
    title: {
      fr: "Assistant WhatsApp & Google Calendar",
      en: "WhatsApp & Google Calendar Assistant",
    },
    summary: {
      fr: "Automatisation conversationnelle : un assistant WhatsApp capable de lire et créer des événements Google Calendar via le tool calling d'un LLM.",
      en: "Conversational automation: a WhatsApp assistant capable of reading and creating Google Calendar events via LLM tool calling.",
    },
    role: {
      fr: "Conception et développement fullstack — architecture, intégration LLM, registre d'outils, webhooks.",
      en: "Full-stack design and development — architecture, LLM integration, tool registry, webhooks.",
    },
    context: {
      fr: "Projet de démonstration et d'exploration technique illustrant l'intégration d'un LLM à des outils métier réels via le protocole de tool calling. Non déployé en production à date.",
      en: "Technical exploration project illustrating LLM integration with real business tools via tool calling. Not deployed in production at this date.",
    },
    achievements: {
      fr: [
        "Architecture NestJS modulaire avec registre d'outils extensible et découverte automatique.",
        "Intégration de l'API OpenAI avec définition des outils (function calling) pour la lecture et la création d'événements Calendar.",
        "Gestion des webhooks WhatsApp Business : réception, validation de signature, dispatch.",
        "Persistence Prisma / PostgreSQL pour le contexte conversationnel et l'état des sessions.",
        "Orchestration backend : extraction de l'intention, sélection de l'outil, exécution, formatage de la réponse.",
      ],
      en: [
        "Modular NestJS architecture with extensible tool registry and automatic tool discovery.",
        "OpenAI API integration with tool definitions (function calling) for reading and creating Calendar events.",
        "WhatsApp Business webhook handling: reception, signature validation, dispatch.",
        "Prisma / PostgreSQL persistence for conversational context and session state.",
        "Backend orchestration: intent extraction, tool selection, execution, response formatting.",
      ],
    },
    technologies: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "WhatsApp Business API", "Google Calendar API", "Docker"],
    results: {
      fr: [
        "Registre d'outils extensible : ajouter un nouvel outil = déclarer une fonction et son schéma JSON.",
        "Délai moyen de réponse WhatsApp → action Calendar < 3 secondes en test local.",
      ],
      en: [
        "Extensible tool registry: adding a new tool = declare a function and its JSON schema.",
        "Average response time WhatsApp → Calendar action < 3 seconds in local testing.",
      ],
    },
  },
  {
    slug: "freemopay",
    featured: true,
    category: "fintech",
    imageKey: "freemopay",
    title: {
      fr: "FreemoPay — Ingénierie des paiements",
      en: "FreemoPay — Payment Engineering",
    },
    summary: {
      fr: "Rôle de Head of Engineering chez FreemoPay / Freemo Solutions SARL : pilotage de l'équipe technique, intégrations de paiement et exploitation des systèmes.",
      en: "Head of Engineering at FreemoPay / Freemo Solutions SARL: engineering team leadership, payment integrations, and system operations.",
    },
    role: {
      fr: "Head of Engineering — coordination de l'équipe, décisions techniques, supervision des intégrations et de la production.",
      en: "Head of Engineering — team coordination, technical decisions, oversight of integrations and production.",
    },
    context: {
      fr: "FreemoPay est une solution de paiement et d'épargne collective au Cameroun. L'équipe technique intègre plusieurs opérateurs (Mobile Money, etc.), déploie et exploite les services en production.",
      en: "FreemoPay is a payment and collective savings solution in Cameroon. The engineering team integrates multiple operators (Mobile Money, etc.) and deploys and operates services in production.",
    },
    achievements: {
      fr: [
        "Pilotage de l'équipe technique et des projets d'intégration de solutions de paiement.",
        "Coordination des partenaires techniques, contribution à la sécurité et à la fiabilité des transactions.",
        "Supervision des serveurs, gestion des incidents, amélioration des processus opérationnels.",
        "Développement de l'application mobile Flutter (disponible sur Play Store) : épargne collaborative, rappels automatiques.",
      ],
      en: [
        "Led the engineering team and payment integration projects.",
        "Coordinated technical partners, contributed to transaction security and reliability.",
        "Oversaw servers, managed incidents, improved operational processes.",
        "Developed the Flutter mobile application (available on Play Store): collective savings, automatic reminders.",
      ],
    },
    technologies: ["Node.js", "NestJS", "Flutter", "PostgreSQL", "Docker", "Nginx", "GitHub Actions"],
    results: {
      fr: [],
      en: [],
    },
    links: [
      { label: "Application mobile (Play Store)", url: "https://play.google.com/store/apps/details?id=com.freemopay.app" },
    ],
  },
  {
    slug: "kamix",
    featured: true,
    category: "fintech",
    imageKey: "kamix",
    title: {
      fr: "Kamix — Plateforme KPI & outils crypto",
      en: "Kamix — KPI Platform & crypto tools",
    },
    summary: {
      fr: "Conception et développement de la plateforme de suivi des KPI d'un service de transfert d'argent vers l'Afrique reposant sur les cryptomonnaies, plus une application de gestion des investisseurs.",
      en: "Design and development of the KPI monitoring platform for a cryptocurrency-based money transfer service to Africa, plus an investor management application.",
    },
    role: {
      fr: "Développeur Fullstack — conception et réalisation complète des applications.",
      en: "Full-Stack Developer — end-to-end design and development of the applications.",
    },
    context: {
      fr: "Kamix SAS propose des transferts d'argent vers l'Afrique utilisant les cryptomonnaies comme couche de règlement intermédiaire. L'équipe avait besoin d'outils internes pour suivre les indicateurs métier et gérer les investisseurs.",
      en: "Kamix SAS offers money transfers to Africa using cryptocurrencies as the intermediate settlement layer. The team needed internal tools to monitor business KPIs and manage investors.",
    },
    achievements: {
      fr: [
        "Conception et réalisation d'une plateforme de suivi des KPI : volumes de transactions, délais, marges, alertes.",
        "Développement d'une application de gestion des investisseurs (Node.js, React, MongoDB).",
        "Réalisation d'une application de comptabilité des cryptomonnaies pour les entreprises.",
        "Outil de collecte et de distribution des prix historiques des actifs numériques en haute disponibilité.",
      ],
      en: [
        "Designed and built a KPI monitoring platform: transaction volumes, delays, margins, alerts.",
        "Developed an investor management application (Node.js, React, MongoDB).",
        "Built a cryptocurrency accounting application for businesses.",
        "High-availability tool for collecting and distributing historical digital asset prices.",
      ],
    },
    technologies: ["Node.js", "React", "MongoDB", "TypeScript", "Docker", "GitHub Actions"],
  },
  {
    slug: "lemlist",
    featured: false,
    category: "enterprise",
    imageKey: "lemlist",
    title: {
      fr: "Lemlist — Outils d'acquisition utilisateurs",
      en: "Lemlist — User acquisition tools",
    },
    summary: {
      fr: "Mission freelance : conception et déploiement d'outils d'acquisition utilisateurs pour la plateforme d'email automation Lemlist.",
      en: "Freelance assignment: design and deployment of user acquisition tools for the Lemlist email automation platform.",
    },
    role: {
      fr: "Développeur Fullstack freelance — développement complet, intégration et déploiement.",
      en: "Freelance Full-Stack Developer — end-to-end development, integration, and deployment.",
    },
    context: {
      fr: "Mission freelance à distance (France) d'août à octobre 2024. Lemlist est une plateforme d'automatisation des emails de prospection utilisée par des milliers d'entreprises.",
      en: "Remote freelance assignment (France), August to October 2024. Lemlist is an email automation platform used by thousands of businesses.",
    },
    achievements: {
      fr: [
        "Conception et mise en ligne d'un téléchargeur de vidéos LinkedIn.",
        "Développement d'un détecteur de spam pour qualifier les listes d'emails.",
        "Développement complet, intégration et déploiement des outils.",
      ],
      en: [
        "Designed and launched a LinkedIn video downloader.",
        "Developed a spam detector for qualifying email lists.",
        "End-to-end development, integration, and deployment of the tools.",
      ],
    },
    technologies: ["Node.js", "React", "TypeScript", "Docker"],
  },
  {
    slug: "constellio-nano-dev",
    featured: false,
    category: "enterprise",
    imageKey: null,
    title: {
      fr: "Constellio — Mission via Nano Dev SARL",
      en: "Constellio — Assignment through Nano Dev SARL",
    },
    summary: {
      fr: "Développeur Fullstack Senior en mission pour Constellio (Canada), entreprise du groupe Harris Computer, via Nano Dev SARL.",
      en: "Senior Full-Stack Developer on assignment for Constellio (Canada), a company within the Harris Computer group, through Nano Dev SARL.",
    },
    role: {
      fr: "Développeur Fullstack Senior freelance via Nano Dev SARL — Constellio n'est pas un employeur direct.",
      en: "Senior Full-Stack Developer freelance through Nano Dev SARL — Constellio is not a direct employer.",
    },
    context: {
      fr: "Mission débutée en février 2025 pour Constellio, Canada. Constellio fait partie du groupe Harris Computer. La mission se déroule en télétravail via Nano Dev SARL.",
      en: "Assignment started February 2025 for Constellio, Canada. Constellio is part of the Harris Computer group. The assignment is remote, through Nano Dev SARL.",
    },
    achievements: {
      fr: [
        "Conception, développement et tests d'applications ; participation aux choix d'architecture et à la feuille de route.",
        "Contribution à l'optimisation des performances et à l'amélioration des pratiques de développement.",
        "Participation aux réunions de suivi et aux sessions de formation.",
      ],
      en: [
        "Designed, developed and tested applications; contributed to architectural decisions and the roadmap.",
        "Contributed to performance optimization and development practice improvements.",
        "Participated in project follow-up meetings and training sessions.",
      ],
    },
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "avomark",
    featured: false,
    category: "enterprise",
    imageKey: null,
    title: {
      fr: "Avomark — Plateforme de fidélisation client",
      en: "Avomark — Customer Loyalty Platform",
    },
    summary: {
      fr: "Évolution d'une plateforme SaaS française de fidélisation et de marketing omnicanal utilisée par plus de 4 000 points de vente, dans le cadre d'une mission chez Abyster Consulting.",
      en: "Evolution of a French omnichannel loyalty and marketing SaaS platform used by 4,000+ retail points, as part of an assignment at Abyster Consulting.",
    },
    role: {
      fr: "Développeur Fullstack chez Abyster Consulting — évolution de la plateforme, nouvelles fonctionnalités, intégrations.",
      en: "Full-Stack Developer at Abyster Consulting — platform evolution, new features, integrations.",
    },
    context: {
      fr: "Avomark est un SaaS bordelais fondé en 1989 qui équipe plus de 4 000 points de vente en France avec des outils de fidélisation, de CRM et de marketing multicanal (SMS, email, push). Mission réalisée en tant que développeur chez Abyster Consulting.",
      en: "Avomark is a Bordeaux-based SaaS founded in 1989, equipping 4,000+ retail locations in France with loyalty, CRM and multichannel marketing tools (SMS, email, push). Assignment carried out as a developer at Abyster Consulting.",
    },
    achievements: {
      fr: [
        "Évolution et maintenance de la plateforme .NET MVC : nouvelles fonctionnalités, refactoring, corrections.",
        "Développement de composants frontend Angular pour les interfaces de gestion des campagnes et des clients.",
        "Travail sur les connecteurs POS et les modules de fidélisation (cartes digitales, cagnottes, bons d'achat).",
        "Collaboration en équipe avec revue de code et intégration continue.",
      ],
      en: [
        "Platform evolution and maintenance on .NET MVC: new features, refactoring, bug fixes.",
        "Development of Angular frontend components for campaign and customer management interfaces.",
        "Work on POS connectors and loyalty modules (digital cards, wallets, vouchers).",
        "Team collaboration with code review and continuous integration.",
      ],
    },
    technologies: [".NET", "C#", "MVC", "Angular", "TypeScript", "SQL Server"],
    links: [{ label: "avomark.co", url: "https://avomark.co" }],
  },
  {
    slug: "erp-dgi-congo",
    featured: false,
    category: "enterprise",
    imageKey: null,
    title: {
      fr: "ERP DGI Congo — Direction Générale des Impôts",
      en: "DGI Congo ERP — Tax Administration System",
    },
    summary: {
      fr: "Développement d'un ERP pour la Direction Générale des Impôts de la République du Congo, dans le cadre d'une mission chez Abyster Consulting.",
      en: "Development of an ERP system for the General Tax Directorate (DGI) of the Republic of Congo, as part of an assignment at Abyster Consulting.",
    },
    role: {
      fr: "Développeur Frontend chez Abyster Consulting — développement Angular de l'interface de gestion fiscale.",
      en: "Frontend Developer at Abyster Consulting — Angular development of the tax management interface.",
    },
    context: {
      fr: "La Direction Générale des Impôts de la République du Congo avait besoin d'une solution ERP pour moderniser la gestion de l'administration fiscale. Le backend était en Java. Mission réalisée chez Abyster Consulting.",
      en: "The General Tax Directorate of the Republic of Congo needed an ERP solution to modernize tax administration management. The backend was in Java. Assignment carried out at Abyster Consulting.",
    },
    achievements: {
      fr: [
        "Développement des interfaces Angular : gestion des rôles, permissions et flux de validation.",
        "Implémentation des modules métier frontend : contribuables, déclarations, paiements.",
        "Intégration avec l'API Java backend : contrats API, gestion des erreurs, mapping des données.",
        "Mise en place des tableaux de bord de reporting et de suivi des dossiers fiscaux.",
      ],
      en: [
        "Angular interface development: role management, permissions and validation workflows.",
        "Implementation of frontend business modules: taxpayers, declarations, payments.",
        "Java backend API integration: API contracts, error handling, data mapping.",
        "Implementation of reporting dashboards and tax file tracking interfaces.",
      ],
    },
    technologies: ["Angular", "TypeScript", "REST API"],
  },
  {
    slug: "bridge-africa",
    featured: false,
    category: "enterprise",
    imageKey: null,
    title: {
      fr: "Bridge Africa Ventures — Présence digitale",
      en: "Bridge Africa Ventures — Digital Presence",
    },
    summary: {
      fr: "Développement d'interfaces web et intégration d'API pour Bridge Africa Ventures, une plateforme camerounaise permettant aux PME africaines de créer leur présence digitale et d'accéder à l'e-commerce.",
      en: "Web interface development and API integration for Bridge Africa Ventures, a Cameroonian platform enabling African SMEs to build their digital presence and access e-commerce.",
    },
    role: {
      fr: "Développeur Frontend — conception d'interfaces et intégration des services API.",
      en: "Frontend Developer — interface design and API service integration.",
    },
    context: {
      fr: "Bridge Africa Ventures (Yaoundé) accompagne les PME africaines dans leur transformation digitale : création de sites web, marketplace en ligne, SMS/USSD pour les zones à faible connectivité, et formation des entrepreneurs. Mission de août 2021 à février 2022.",
      en: "Bridge Africa Ventures (Yaoundé) supports African SMEs in their digital transformation: website creation, online marketplace, SMS/USSD for low-connectivity zones, and entrepreneur training. Assignment from August 2021 to February 2022.",
    },
    achievements: {
      fr: [
        "Développement d'interfaces web pour la plateforme de mise en ligne des entreprises locales.",
        "Intégration des API de services externes et gestion des flux de données.",
        "Contribution au module marketplace : pages entreprises, annuaires, comparaison de prix.",
        "Travail sur la compatibilité multi-plateforme et l'accessibilité pour les zones à faible connectivité.",
      ],
      en: [
        "Web interface development for the local business listing platform.",
        "Integration of external service APIs and data flow management.",
        "Contribution to the marketplace module: business pages, directories, price comparison.",
        "Work on cross-platform compatibility and accessibility for low-connectivity zones.",
      ],
    },
    technologies: ["React", "JavaScript", "Node.js", "REST API"],
    links: [{ label: "bridgeafricaventures.com", url: "https://www.bridgeafrica.bridgeafricaventures.com/" }],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
