import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { Locale } from "@/lib/i18n";

// Using the JSON data provided via the CV JSON file
const cvData = {
  fr: {
    title: "Développeur Web Fullstack Senior",
    headline: "TypeScript · React / Next.js · Node.js / NestJS · .NET · Fintech",
    summary:
      "Ingénieur logiciel avec plus de 5 ans d'expérience en développement fullstack, spécialisé en TypeScript, React/Next.js et Node.js/NestJS. Expérience des paiements et des applications financières, avec des responsabilités de Head of Engineering chez FreemoPay et une mission pour Constellio au Canada, entreprise du groupe Harris Computer. Compétences en conception d'API, CI/CD, conteneurisation et intégration de LLM, complétées par des workflows agentiques, des skills réutilisables et des connexions MCP.",
    labels: {
      profile: "Profil",
      skills: "Compétences techniques",
      experience: "Expérience professionnelle",
      appliedAI: "IA appliquée et workflows agentiques",
      education: "Formation",
      contact: "Contact",
      inPrep: "En préparation",
      present: "Aujourd'hui",
      filename: "CV_Marcellin_Fougang_FR.pdf",
    },
  },
  en: {
    title: "Senior Full-Stack Web Developer",
    headline: "TypeScript · React / Next.js · Node.js / NestJS · .NET · Fintech",
    summary:
      "Software engineer with over five years of full-stack development experience, specializing in TypeScript, React/Next.js and Node.js/NestJS. Experience in payments and financial applications, with Head of Engineering responsibilities at FreemoPay and an assignment for Constellio in Canada, a company within the Harris Computer group. Skilled in API design, CI/CD, containerization and LLM integration, complemented by agentic workflows, reusable skills, and MCP connections.",
    labels: {
      profile: "Profile",
      skills: "Technical skills",
      experience: "Professional experience",
      appliedAI: "Applied AI and agentic workflows",
      education: "Education",
      contact: "Contact",
      inPrep: "In preparation",
      present: "Present",
      filename: "CV_Marcellin_Fougang_EN.pdf",
    },
  },
};

const experience = {
  fr: [
    {
      company: "Nano Dev SARL",
      role: "Développeur Fullstack Senior",
      date: "Février 2025 – Novembre 2026",
      type: "Freelance · Mission pour Constellio (Canada, groupe Harris Computer)",
      items: [
        "Conception, développement et tests d'applications ; participation aux choix d'architecture et à la feuille de route applicative.",
        "Contribution à l'optimisation des performances et à l'amélioration des pratiques de développement.",
        "Participation aux réunions de suivi avec les interlocuteurs du projet et aux sessions de formation.",
      ],
    },
    {
      company: "FreemoPay / Freemo Solutions SARL",
      role: "Head of Engineering",
      date: "Janvier 2021 – Aujourd'hui",
      type: "Yaoundé, Cameroun",
      items: [
        "Pilotage de l'équipe technique et des projets d'intégration, de déploiement et d'exploitation de solutions de paiement.",
        "Coordination des partenaires techniques et contribution à la sécurité, à la disponibilité et à la fiabilité des transactions.",
        "Supervision des serveurs, gestion des incidents et amélioration des processus opérationnels.",
      ],
    },
    {
      company: "Lemlist",
      role: "Développeur Fullstack",
      date: "Août 2024 – Octobre 2024",
      type: "Freelance · Télétravail · France",
      items: [
        "Conception et mise en ligne d'outils d'acquisition utilisateurs : téléchargeur de vidéos LinkedIn et détecteur de spam.",
        "Prise en charge du développement complet, de l'intégration et du déploiement des outils.",
      ],
    },
    {
      company: "Kamix SAS",
      role: "Développeur Fullstack",
      date: "2022 – 2024",
      type: "Télétravail · Yaoundé, Cameroun",
      items: [
        "Plateforme KPI pour service de transfert d'argent crypto.",
        "Application de gestion des investisseurs (Node.js, React, MongoDB).",
        "Comptabilité crypto et collecte des prix historiques des actifs numériques.",
      ],
    },
    {
      company: "Abyster Consulting",
      role: "Ingénieur logiciel",
      date: "Août 2022 – Février 2024",
      type: "Yaoundé, Cameroun",
      items: [
        "Plugin Shopify (Node.js, React) et API Gateway .NET Core.",
        "Évolution plateforme Avomark (.NET MVC) et ERP DGI Congo (Angular).",
        "Solution de collecte de logs Elasticsearch/OpenSearch.",
      ],
    },
    {
      company: "Bridge Africa Ventures",
      role: "Développeur Frontend",
      date: "Août 2021 – Février 2022",
      type: "Yaoundé, Cameroun",
      items: ["Développement d'interfaces web et intégration d'API."],
    },
  ],
  en: [
    {
      company: "Nano Dev SARL",
      role: "Senior Full-Stack Developer",
      date: "February 2025 – November 2026",
      type: "Freelance · Assignment for Constellio (Canada, Harris Computer group)",
      items: [
        "Designed, developed and tested applications; contributed to architectural decisions and the application roadmap.",
        "Contributed to performance optimization and improvement of development practices.",
        "Participated in project follow-up meetings with stakeholders and training sessions.",
      ],
    },
    {
      company: "FreemoPay / Freemo Solutions SARL",
      role: "Head of Engineering",
      date: "January 2021 – Present",
      type: "Yaoundé, Cameroon",
      items: [
        "Led the engineering team and payment integration, deployment, and operations projects.",
        "Coordinated technical partners and contributed to transaction security, availability, and reliability.",
        "Oversaw servers, managed incidents, and improved operational processes.",
      ],
    },
    {
      company: "Lemlist",
      role: "Full-Stack Developer",
      date: "August 2024 – October 2024",
      type: "Freelance · Remote · France",
      items: [
        "Designed and launched user acquisition tools: LinkedIn video downloader and spam detector.",
        "Handled end-to-end development, integration, and deployment of the tools.",
      ],
    },
    {
      company: "Kamix SAS",
      role: "Full-Stack Developer",
      date: "2022 – 2024",
      type: "Remote · Yaoundé, Cameroon",
      items: [
        "KPI monitoring platform for crypto money transfer service.",
        "Investor management application (Node.js, React, MongoDB).",
        "Crypto accounting and historical digital asset price collection.",
      ],
    },
    {
      company: "Abyster Consulting",
      role: "Software Engineer",
      date: "August 2022 – February 2024",
      type: "Yaoundé, Cameroon",
      items: [
        "Shopify plugin (Node.js, React) and .NET Core API Gateway.",
        "Avomark loyalty platform (.NET MVC) and DGI Congo ERP (Angular).",
        "Log collection solution with Elasticsearch/OpenSearch.",
      ],
    },
    {
      company: "Bridge Africa Ventures",
      role: "Frontend Developer",
      date: "August 2021 – February 2022",
      type: "Yaoundé, Cameroon",
      items: ["Developed web interfaces and integrated APIs."],
    },
  ],
};

const aiItems = {
  fr: [
    "Agents de développement : Cursor, Codex — décomposition des tâches, implémentation, refactoring, génération de tests et revue des modifications.",
    "Context engineering et skills : structuration du contexte projet, règles de développement et instructions spécialisées réutilisables pour guider les agents.",
    "MCP (Model Context Protocol) : configuration et utilisation de connexions donnant aux agents accès aux outils et au contexte nécessaires à leurs tâches.",
    "LLM et tool calling : API OpenAI, function calling, définition d'outils métier et orchestration de leur exécution côté backend.",
    "Automatisation conversationnelle : assistant WhatsApp avec NestJS, Prisma et Google Calendar ; registre d'outils extensible et découverte automatique.",
  ],
  en: [
    "Development agents: Cursor, Codex — task decomposition, implementation, refactoring, test generation, and change review.",
    "Context engineering and skills: project context structuring, development rules, and reusable specialized instructions to guide agents.",
    "MCP (Model Context Protocol): configuring and using connections that give agents access to the tools and context needed for their tasks.",
    "LLMs and tool calling: OpenAI API, function calling, business tool definitions, and backend orchestration.",
    "Conversational automation: WhatsApp assistant with NestJS, Prisma, and Google Calendar; extensible tool registry with automatic discovery.",
  ],
};

const skillGroups = {
  fr: [
    { name: "Frontend & Backend", tags: ["JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "NestJS", "API REST"] },
    { name: "Données", tags: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Prisma"] },
    { name: "Architecture & qualité", tags: ["Architecture modulaire", "SOLID", "DRY", "Clean code", "Tests", "Intégration de services tiers"] },
    { name: "DevOps & CI/CD", tags: ["Git", "GitHub Actions", "Jenkins", "Docker", "Docker Compose", "Nginx", "Administration serveurs"] },
    { name: "Technologies complémentaires", tags: ["C# / .NET", "Angular", "Dart / Flutter"] },
  ],
  en: [
    { name: "Frontend & Backend", tags: ["JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "NestJS", "REST APIs"] },
    { name: "Data", tags: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Prisma"] },
    { name: "Architecture & quality", tags: ["Modular architecture", "SOLID", "DRY", "Clean code", "Testing", "Third-party integrations"] },
    { name: "DevOps & CI/CD", tags: ["Git", "GitHub Actions", "Jenkins", "Docker", "Docker Compose", "Nginx", "Server administration"] },
    { name: "Additional technologies", tags: ["C# / .NET", "Angular", "Dart / Flutter"] },
  ],
};

const c = {
  ivory: "#F5F2EB",
  forest: "#234B3D",
  forestDark: "#17201C",
  terracotta: "#CE6B3D",
  muted: "#5a6b65",
  separator: "#ddd8cc",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: c.forestDark,
    backgroundColor: c.ivory,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: c.separator,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    color: c.forestDark,
    marginBottom: 2,
  },
  titleText: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: c.forest,
    marginBottom: 2,
  },
  headlineText: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: c.muted,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  contactItem: {
    fontSize: 8.5,
    color: c.muted,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: c.terracotta,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 16,
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: c.separator,
  },
  summaryText: {
    fontSize: 9,
    color: c.muted,
    lineHeight: 1.5,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  expCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: c.forestDark,
  },
  expRole: {
    fontSize: 9,
    color: c.forest,
    fontFamily: "Helvetica-Bold",
  },
  expDate: {
    fontSize: 8.5,
    color: c.muted,
    textAlign: "right",
  },
  expType: {
    fontSize: 8,
    color: c.muted,
    marginBottom: 4,
    fontStyle: "italic",
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletDash: {
    color: c.terracotta,
    marginRight: 4,
    fontSize: 9,
  },
  bulletText: {
    fontSize: 9,
    color: c.muted,
    flex: 1,
    lineHeight: 1.4,
  },
  expItem: {
    marginBottom: 10,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillGroup: {
    marginBottom: 6,
    width: "48%",
  },
  skillGroupName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: c.muted,
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  skillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillTag: {
    fontSize: 8,
    color: c.forest,
    borderWidth: 0.5,
    borderColor: "#b8cfc5",
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 2,
  },
  inPrepBadge: {
    fontSize: 7.5,
    color: c.terracotta,
    borderWidth: 0.5,
    borderColor: c.terracotta,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    marginLeft: 6,
  },
  aiItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  aiArrow: {
    color: c.terracotta,
    marginRight: 5,
    fontSize: 9,
  },
  aiText: {
    fontSize: 9,
    color: c.muted,
    flex: 1,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: c.forestDark,
  },
  eduInstitution: {
    fontSize: 8.5,
    color: c.muted,
  },
  certRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  certName: {
    fontSize: 9,
    color: c.muted,
  },
});

export function CVDocument({ locale }: { locale: Locale }) {
  const data = cvData[locale];
  const exp = experience[locale];
  const ai = aiItems[locale];
  const skills = skillGroups[locale];

  return (
    <Document
      title={`CV Marcellin Fougang Lele — ${locale.toUpperCase()}`}
      author="Marcellin Fougang Lele"
      subject="CV"
      keywords="TypeScript, React, NestJS, Node.js, DevOps, IA"
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Marcellin Fougang Lele</Text>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.headlineText}>{data.headline}</Text>
          <View style={styles.contactRow}>
            <Link src="mailto:lelemarcellin@gmail.com" style={styles.contactItem}>
              lelemarcellin@gmail.com
            </Link>
            <Link src="tel:+237695509408" style={styles.contactItem}>
              +237 695 509 408
            </Link>
            <Link src="https://marcellinlele.lasolutions.net" style={styles.contactItem}>
              Portfolio
            </Link>
            <Text style={styles.contactItem}>Cameroun · Remote</Text>
          </View>
        </View>

        {/* Profile */}
        <Text style={styles.sectionTitle}>{data.labels.profile}</Text>
        <Text style={styles.summaryText}>{data.summary}</Text>

        {/* Technical Skills */}
        <Text style={styles.sectionTitle}>{data.labels.skills}</Text>
        <View style={styles.skillsGrid}>
          {skills.map((group) => (
            <View key={group.name} style={styles.skillGroup}>
              <Text style={styles.skillGroupName}>{group.name}</Text>
              <View style={styles.skillTags}>
                {group.tags.map((tag) => (
                  <Text key={tag} style={styles.skillTag}>
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Experience */}
        <Text style={styles.sectionTitle}>{data.labels.experience}</Text>
        {exp.map((e) => (
          <View key={e.company} style={styles.expItem}>
            <View style={styles.expHeader}>
              <View>
                <Text style={styles.expCompany}>{e.company}</Text>
                <Text style={styles.expRole}>{e.role}</Text>
              </View>
              <Text style={styles.expDate}>{e.date}</Text>
            </View>
            <Text style={styles.expType}>{e.type}</Text>
            {e.items.map((item, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDash}>—</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Applied AI */}
        <Text style={styles.sectionTitle}>{data.labels.appliedAI}</Text>
        {ai.map((item, i) => (
          <View key={i} style={styles.aiItem}>
            <Text style={styles.aiArrow}>→</Text>
            <Text style={styles.aiText}>{item}</Text>
          </View>
        ))}

        {/* Education */}
        <Text style={styles.sectionTitle}>{data.labels.education}</Text>
        <View style={styles.eduItem}>
          <Text style={styles.eduDegree}>
            {locale === "fr"
              ? "Ingénieur des travaux des télécommunications, option informatique"
              : "Telecommunications Engineering Diploma, Computer Science specialization"}
          </Text>
          <Text style={styles.eduInstitution}>
            SUP-PTIC — Yaoundé, Cameroun · 2021
          </Text>
        </View>

        {/* Certifications */}
        <View style={styles.certRow}>
          <Text style={styles.certName}>CKAD — Certified Kubernetes Application Developer</Text>
          <Text style={styles.inPrepBadge}>{data.labels.inPrep}</Text>
        </View>
      </Page>
    </Document>
  );
}
