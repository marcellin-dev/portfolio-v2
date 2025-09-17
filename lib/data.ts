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
      "En tant que chargé de la cellule paiement chez Freemopay, j'ai supervisé l'intégration et la gestion de divers moyens de paiement, garantissant des transactions fluides et sécurisées pour nos clients. Mon rôle m'a permis de développer une expertise pointue en agrégation des solutions de paiement. Cette expérience a renforcé mes compétences en gestion de projets complexes et en optimisation des processus financiers.",
    icon: React.createElement(CgWorkAlt),
    date: "2021 - Aujourd'hui",
  },
  {
    title: "Développeur Fullstack (Remote)",
    location: "Lemlist, Paris, Île-de-France",
    description:
      "En tant que développeur freelance pour Lemlist, j'ai conçu et déployé divers outils destinés à attirer des utilisateurs vers leur plateforme, notamment un téléchargeur de vidéos pour LinkedIn et un détecteur de spam. J'étais responsable du développement complet de ces outils, de leur intégration à leur mise en ligne, assurant leur disponibilité et leur performance pour les utilisateurs.",
    icon: React.createElement(FaReact),
    date: "Août 2024 - Octobre 2024",
  },
  {
    title: "Développeur Fullstack (Full Remote)",
    location: "Kamix SAS, Yaoundé, Cameroun",
    description:
      "Conception et réalisation d'une application pour la gestion des investisseurs (NodeJS / React/ Mongo). Conception et réalisation d'une application de comptabilité des crypto monnaie pour les entreprises. Conception et réalisation d'une app d'indicateur de performance pour l'application de transfert d'argent.",
    icon: React.createElement(FaReact),
    date: "2022 - Décembre 2024",
  },
  {
    title: "Ingénieur Logiciel",
    location: "Abyster Consulting, Yaoundé, Cameroun",
    description:
      "Développement d'un plugin Shopify (Nodejs, ReactJs, JQuery). Mise À Jour De La plateforme de fidélisation Avomark (.NET). Ajoute de nouvelles fonctionnalités (.NET MVC, API). Conception et réalisation d'une Api Gateway de traduction des flux des applications existante pour une connexion avec le système Shopify (.NET Core Api). Mise en place d'une solution de collecte de distribution des logs des différentes applications basé sur ElasticSearch/OpenSearch. Développement des fonctionnalité dans l'ERP de la DGi du congo (ANGULAR).",
    icon: React.createElement(CgWorkAlt),
    date: "Août 2022 - Février 2024",
  },
  {
    title: "Développeur Freelance",
    location: "Crypto Accounting, Remote",
    description:
      "Mission d'intégration d'un service tier à la plateforme crypto accounting (Penny Lane). Mission pour gérer la collecte, l'indexation et la distribution des prix historique des crypto monnaie en haute disponibilité.",
    icon: React.createElement(FaReact),
    date: "2021 - 2024",
  },
  {
    title: "Développeur Frontend",
    location: "Bridge Africa Ventures, Yaoundé, Cameroun",
    description:
      "Développeur web front end et intégrateur des API chez Bridge Africa Ventures. Développement d'interfaces utilisateur modernes et intégration de services backend.",
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
  "JavaScript",
  "TypeScript",
  "C#",
  "Golang",
  "Node.js",
  "NestJS",
  "Express.js",
  "React",
  "Next.js",
  "Flutter",
  ".NET",
  ".NET Core",
  ".NET MVC",
  "Angular",
  "HTML",
  "CSS",
  "Tailwind",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQL Server",
  "Redis",
  "ElasticSearch",
  "OpenSearch",
  "Docker",
  "AWS",
  "Nginx",
  "Git",
  "GitLab CI/CD",
  "Jenkins",
  "Shopify Plugin",
  "API REST",
  "Microservices",
  "Clean Code",
] as const;
