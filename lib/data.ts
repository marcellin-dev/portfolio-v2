import freemopayMobileImg from "@/public/appmobile.png";
import shopifyGatewayImg from "@/public/avomarkimg.png";
import freemopayImg from "@/public/freemopayimg.png";
import investorAppImg from "@/public/investorappimg.png";
import lemlistImg from "@/public/lemlist-logo.png";
import logsSolutionImg from "@/public/logimg.jpeg";
import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Responsable Tech",
    location: "Freemo Solutions SARL, Yaoundé, Cameroun",
    description:
      "Supervision de l'intégration et de la gestion des moyens de paiement pour Freemopay, garantissant des transactions fluides et sécurisées. Expertise en agrégation de solutions de paiement et optimisation des processus financiers.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - Aujourd'hui",
  },
  {
    title: "Développeur Fullstack Freelance",
    location: "Lemlist, Paris, Île-de-France (Remote)",
    description:
      "Conception et déploiement d'outils pour améliorer le SEO et l'engagement utilisateur, notamment un téléchargeur de vidéos pour LinkedIn et un détecteur de spam. Développement complet, de l'intégration à la mise en ligne.",
    icon: React.createElement(FaReact),
    date: "Août 2024 - Octobre 2024",
  },
  {
    title: "Développeur Fullstack",
    location: "Kamix SAS, Yaoundé, Cameroun (Full Remote)",
    description:
      "Conception et réalisation d'une application de gestion des investisseurs (Node.js, React, MongoDB) et d'une application de comptabilité des crypto-monnaies pour les entreprises .",
    icon: React.createElement(FaReact),
    date: "2022 - Décembre 2024",
  },
  {
    title: "Ingénieur Logiciel",
    location: "Abyster Consulting, Yaoundé, Cameroun",
    description:
      "Mise à jour de la plateforme de fidélisation Avomark (.NET), conception d'une API Gateway pour Shopify, développement d'un plugin Shopify (Node.js, React), et mise en place d'une solution de collecte de logs avec ElasticSearch/OpenSearch.",
    icon: React.createElement(CgWorkAlt),
    date: "Août 2022 - Février 2024",
  },

  {
    title: "Développeur Frontend",
    location: "Bridge Africa, Yaoundé, Cameroun",
    description:
      "Développement frontend et intégration d'API pour des projets web chez Bridge Africa Ventures.",
    icon: React.createElement(CgWorkAlt),
    date: "Août 2021 - Février 2022",
  }
] as const;


export const projectsData = [
  {
    title: "Freemopay - Intégration des Paiements",
    description:
      "Supervision de l'intégration de multiples solutions de paiement pour Freemopay, garantissant des transactions sécurisées et fluides pour les clients.",
    tags: ["Node.js", "API", "Sécurité", "Optimisation"],
    imageUrl: freemopayImg, // Remplacez par l'image appropriée
  },
  {
    title: "Application Mobile Freemopay",
    description:
      "Conception et développement de l'application mobile Freemopay, disponible sur Play Store. L'application permet aux utilisateurs de participer à des systèmes d'épargne collaborative et de collecte de fonds, avec des fonctionnalités de rappels automatiques pour faciliter la gestion des contributions.",
    tags: ["Flutter", "Mobile", "Épargne Collaborative", "Collecte de Fonds", "Play Store"],
    imageUrl: freemopayMobileImg, // Remplacez par l'image appropriée
  },
  {
    title: "API Gateway pour Shopify",
    description:
      "Conception et réalisation d'une API Gateway pour connecter les applications existantes à Shopify, permettant une intégration fluide des flux de données.",
    tags: [".NET Core", "API", "Shopify", "Node.js", "React"],
    imageUrl: shopifyGatewayImg, // Remplacez par l'image appropriée
  },
  {
    title: "Application de Gestion des Investisseurs",
    description:
      "Développement d'une application complète pour la gestion des investisseurs, incluant une interface utilisateur intuitive et une base de données performante.",
    tags: ["Node.js", "React", "MongoDB", "Fullstack"],
    imageUrl: investorAppImg, // Remplacez par l'image appropriée
  },
  {
    title: "Outils SEO pour Lemlist",
    description:
      "Conception et déploiement d'outils pour améliorer le SEO de Lemlist, dont un téléchargeur de vidéos LinkedIn et un détecteur de spam.",
    tags: ["Node.js", "React", "SEO", "Outils"],
    imageUrl: lemlistImg, // Remplacez par l'image appropriée
  },
  {
    title: "Solution de Collecte de Logs",
    description:
      "Mise en place d'une solution de collecte et de distribution de logs pour les applications, basée sur ElasticSearch/OpenSearch.",
    tags: ["ElasticSearch", "OpenSearch", "Logs", "Optimisation"],
    imageUrl: logsSolutionImg, // Remplacez par l'image appropriée
  },
] as const;
export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Flutter",
  "Nest.js",
  ".Net",
  "Entity Framework",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "Express",
  "PostgreSQL",
  "Eleastic Search",
  "Open Search",
  "Shopify plugin",
] as const;
