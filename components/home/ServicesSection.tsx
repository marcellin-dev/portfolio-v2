"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import type { IconType } from "react-icons";
import {
  FiSmartphone, FiFileText, FiMail, FiBell,
  FiBarChart2, FiUsers, FiGrid, FiLink2,
  FiMessageCircle, FiSettings, FiLayers, FiShield,
  FiZap, FiMonitor, FiBookOpen,
} from "react-icons/fi";

interface ServicesSectionProps {
  locale: Locale;
}

type UseCase = {
  Icon: IconType;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
};

const services = [
  {
    id: "automation",
    number: "01",
    Icon: FiZap,
    titleFr: "Automatisation IA",
    titleEn: "AI Automation",
    taglineFr: "Vos outils font le travail à votre place",
    taglineEn: "Your tools work for you",
    descFr:
      "Vous perdez du temps à répondre aux mêmes messages, envoyer des rappels, copier-coller des données d'un logiciel à l'autre ? Ces tâches répétitives peuvent être automatisées — sans changer vos habitudes.",
    descEn:
      "Spending hours answering the same messages, sending reminders, copying data from one tool to another? These repetitive tasks can be fully automated — without changing your habits.",
    useCases: [
      {
        Icon: FiSmartphone,
        titleFr: "Réservations WhatsApp",
        titleEn: "WhatsApp bookings",
        descFr: "Un client envoie un message → votre agenda se met à jour. Zéro saisie manuelle.",
        descEn: "A client sends a message → your calendar updates. Zero manual input.",
      },
      {
        Icon: FiFileText,
        titleFr: "Devis automatiques",
        titleEn: "Automatic quotes",
        descFr: "Un prospect remplit votre formulaire → il reçoit un devis personnalisé en moins de 2 minutes.",
        descEn: "A prospect fills your form → they receive a personalized quote in under 2 minutes.",
      },
      {
        Icon: FiMail,
        titleFr: "Tri d'emails intelligent",
        titleEn: "Smart email sorting",
        descFr: "Vos emails sont lus et classés. Les urgences vous sont signalées. Les autres attendent.",
        descEn: "Your emails are read and sorted. Urgent ones are flagged. The rest can wait.",
      },
      {
        Icon: FiBell,
        titleFr: "Rappels clients",
        titleEn: "Client reminders",
        descFr: "Chaque rendez-vous, facture en retard ou relance est géré automatiquement.",
        descEn: "Every appointment, overdue invoice, or follow-up is handled automatically.",
      },
    ] as UseCase[],
    targetFr: "Idéal pour : PME, cabinets, e-commerce, service client",
    targetEn: "Best for: SMBs, consulting firms, e-commerce, customer support",
  },
  {
    id: "app",
    number: "02",
    Icon: FiMonitor,
    titleFr: "Application sur-mesure",
    titleEn: "Custom application",
    taglineFr: "Un logiciel pensé pour votre façon de travailler",
    taglineEn: "Software built around how you work",
    descFr:
      "Vos tableurs débordent, votre logiciel actuel est trop générique, ou vos équipes perdent du temps à jongler entre plusieurs outils ? Je conçois des applications simples, efficaces, et entièrement adaptées à votre métier.",
    descEn:
      "Your spreadsheets are overflowing, your current software is too generic, or your teams waste time juggling multiple tools? I design simple, effective applications fully tailored to your business.",
    useCases: [
      {
        Icon: FiBarChart2,
        titleFr: "Tableau de bord métier",
        titleEn: "Business dashboard",
        descFr: "Toutes vos données (ventes, stocks, finances) consolidées en un seul endroit, en temps réel.",
        descEn: "All your data (sales, stock, finances) consolidated in one place, in real time.",
      },
      {
        Icon: FiUsers,
        titleFr: "Portail client",
        titleEn: "Client portal",
        descFr: "Vos clients suivent leurs commandes, téléchargent leurs factures et envoient des demandes eux-mêmes.",
        descEn: "Your clients track orders, download invoices, and submit requests on their own.",
      },
      {
        Icon: FiGrid,
        titleFr: "Remplacement Excel",
        titleEn: "Replace Excel",
        descFr: "Un outil de gestion interne qui ne plante pas, ne se perd pas et se met à jour seul.",
        descEn: "An internal management tool that doesn't crash, get lost, or need manual updates.",
      },
      {
        Icon: FiLink2,
        titleFr: "Connexion de logiciels",
        titleEn: "Software integration",
        descFr: "Votre CRM, votre boutique en ligne et votre comptabilité parlent entre eux automatiquement.",
        descEn: "Your CRM, online store, and accounting talk to each other automatically.",
      },
    ] as UseCase[],
    targetFr: "Idéal pour : startups, TPE/PME, équipes internes, associations",
    targetEn: "Best for: startups, small businesses, internal teams, NGOs",
  },
  {
    id: "training",
    number: "03",
    Icon: FiBookOpen,
    titleFr: "Formation des équipes",
    titleEn: "Team training",
    taglineFr: "Vos collaborateurs à l'aise avec l'IA en une journée",
    taglineEn: "Your team comfortable with AI in one day",
    descFr:
      "L'IA change la manière de travailler. Mais sans accompagnement, elle reste un outil que personne n'utilise vraiment. Je forme vos équipes avec des exercices concrets, tirés de votre secteur.",
    descEn:
      "AI is changing how we work. But without guidance, it stays a tool nobody uses. I train your teams with hands-on exercises drawn from your industry.",
    useCases: [
      {
        Icon: FiMessageCircle,
        titleFr: "Atelier ChatGPT pratique",
        titleEn: "Hands-on ChatGPT workshop",
        descFr: "Rédiger, résumer, analyser, répondre aux emails : votre équipe repart avec des réflexes concrets.",
        descEn: "Writing, summarizing, analyzing, answering emails: your team leaves with concrete new habits.",
      },
      {
        Icon: FiSettings,
        titleFr: "Automatisation sans code",
        titleEn: "No-code automation",
        descFr: "Créer des workflows avec Make ou Zapier : connecter vos outils sans écrire une ligne de code.",
        descEn: "Build workflows with Make or Zapier: connect your tools without writing a single line of code.",
      },
      {
        Icon: FiLayers,
        titleFr: "Intégration dans vos process",
        titleEn: "Integration in your processes",
        descFr: "Identifier quelles tâches automatiser en premier dans votre organisation, et comment démarrer.",
        descEn: "Identify which tasks to automate first in your organization, and how to get started.",
      },
      {
        Icon: FiShield,
        titleFr: "Bonnes pratiques",
        titleEn: "Best practices",
        descFr: "Ce que l'IA fait bien, ce qu'elle ne remplace pas, et comment l'utiliser sans risque.",
        descEn: "What AI does well, what it doesn't replace, and how to use it safely.",
      },
    ] as UseCase[],
    targetFr: "Idéal pour : équipes dirigeantes, services RH, marketing, administration",
    targetEn: "Best for: leadership teams, HR, marketing, administration",
  },
];

const accentColors: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  automation: {
    bg: "bg-terracotta",
    text: "text-terracotta",
    border: "border-terracotta/20",
    iconBg: "bg-terracotta/10",
  },
  app: {
    bg: "bg-forest",
    text: "text-forest",
    border: "border-forest/20",
    iconBg: "bg-forest/8",
  },
  training: {
    bg: "bg-forest-dark",
    text: "text-forest-dark",
    border: "border-forest-dark/20",
    iconBg: "bg-forest-dark/6",
  },
};

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const [openId, setOpenId] = useState<string | null>("automation");
  const isFr = locale === "fr";

  return (
    <section id="services" className="py-24 bg-ivory">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <AnimateOnScroll className="mb-16">
          <p className="text-terracotta text-xs font-semibold uppercase tracking-widest mb-4">
            Services
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="font-heading font-black text-section-lg text-forest-dark mb-3">
                {isFr
                  ? "Des solutions concrètes. Expliquées simplement."
                  : "Concrete solutions. Explained simply."}
              </h2>
              <p className="text-forest-dark/60 text-lg max-w-2xl">
                {isFr
                  ? "Que vous soyez chef d'entreprise, manager ou fondateur de startup — voici comment je peux vous aider."
                  : "Whether you're a business owner, manager, or startup founder — here's how I can help."}
              </p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="shrink-0 inline-flex items-center gap-2 bg-forest text-ivory font-semibold px-6 py-3 rounded-lg hover:bg-forest-light transition-colors whitespace-nowrap"
            >
              {isFr ? "Discutons de votre besoin" : "Let's discuss your need"}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Service accordion */}
        <div className="flex flex-col gap-3">
          {services.map((service, i) => {
            const isOpen = openId === service.id;
            const colors = accentColors[service.id];
            const { Icon: ServiceIcon } = service;

            return (
              <AnimateOnScroll key={service.id} delay={i * 0.08}>
                <div
                  className={`border rounded-2xl overflow-hidden transition-shadow ${
                    isOpen ? "border-forest-dark/15 shadow-md" : "border-forest-dark/10 hover:border-forest-dark/20"
                  }`}
                >
                  {/* Header button */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center gap-5 bg-white hover:bg-forest-dark/[0.02] transition-colors"
                    aria-expanded={isOpen}
                  >
                    {/* Number + icon */}
                    <div className="shrink-0 flex flex-col items-center gap-1">
                      <span className="text-xs font-mono text-forest-dark/30">{service.number}</span>
                      <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                        <ServiceIcon size={18} strokeWidth={1.75} className={colors.text} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-black text-lg sm:text-xl text-forest-dark leading-snug">
                        {isFr ? service.titleFr : service.titleEn}
                      </h3>
                      <p className="text-sm text-forest-dark/50 mt-0.5">
                        {isFr ? service.taglineFr : service.taglineEn}
                      </p>
                    </div>

                    {/* Chevron */}
                    <div
                      className={`shrink-0 w-7 h-7 rounded-full border border-forest-dark/15 flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-forest-dark/5" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-forest-dark/40">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {/* Content */}
                  {isOpen && (
                    <div className="bg-white border-t border-forest-dark/8 px-6 pb-8 sm:px-8">
                      <p className="text-forest-dark/70 text-base leading-relaxed pt-6 mb-8 max-w-3xl">
                        {isFr ? service.descFr : service.descEn}
                      </p>

                      {/* Use cases grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.useCases.map((uc, j) => {
                          const { Icon: UcIcon } = uc;
                          return (
                            <div
                              key={j}
                              className="flex gap-4 p-4 rounded-xl border border-forest-dark/8 bg-forest-dark/[0.02]"
                            >
                              <div className={`shrink-0 w-9 h-9 rounded-lg ${colors.iconBg} flex items-center justify-center mt-0.5`}>
                                <UcIcon size={16} strokeWidth={1.75} className={colors.text} />
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-forest-dark mb-1">
                                  {isFr ? uc.titleFr : uc.titleEn}
                                </p>
                                <p className="text-sm text-forest-dark/55 leading-relaxed">
                                  {isFr ? uc.descFr : uc.descEn}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-forest-dark/8">
                        <p className="text-xs text-forest-dark/40 italic">
                          {isFr ? service.targetFr : service.targetEn}
                        </p>
                        <Link
                          href={`/${locale}/contact`}
                          className={`inline-flex items-center gap-2 text-sm font-semibold text-ivory ${colors.bg} px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity`}
                        >
                          {isFr ? "Me contacter" : "Contact me"}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Bottom note */}
        <AnimateOnScroll className="mt-12 text-center">
          <p className="text-sm text-forest-dark/45 max-w-xl mx-auto">
            {isFr
              ? "Pas sûr de ce dont vous avez besoin ? Décrivez votre situation — je vous aide à identifier la bonne solution."
              : "Not sure what you need? Describe your situation — I'll help you identify the right solution."}
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
