"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { IconType } from "react-icons";
import { FiCalendar, FiPackage, FiFileText, FiCheck } from "react-icons/fi";

type ScenarioId = "rdv" | "support" | "devis";

interface Message {
  from: "user" | "bot";
  text: string;
  time?: string;
  slots?: string[];
  isConfirmation?: boolean;
}

interface Scenario {
  id: ScenarioId;
  Icon: IconType;
  labelFr: string;
  labelEn: string;
  messages: Message[];
  interactiveUpTo?: number;
}

const scenarios: Scenario[] = [
  {
    id: "rdv",
    Icon: FiCalendar,
    labelFr: "Prise de RDV",
    labelEn: "Booking",
    interactiveUpTo: 3,
    messages: [
      {
        from: "user",
        text: "Bonjour, je souhaite prendre rendez-vous pour une démo.",
        time: "10:21",
      },
      {
        from: "bot",
        text: "Bonjour ! Voici les créneaux disponibles cette semaine :",
        time: "10:21",
        slots: ["Lundi · 14h00", "Mercredi · 10h30", "Vendredi · 09h00"],
      },
      {
        from: "user",
        text: "Mercredi 10h30, ça me va.",
        time: "10:22",
      },
      {
        from: "bot",
        text: "Rendez-vous confirmé — mercredi à 10h30. Une invitation Google Calendar vous a été envoyée.",
        time: "10:22",
        isConfirmation: true,
      },
    ],
  },
  {
    id: "support",
    Icon: FiPackage,
    labelFr: "Suivi commande",
    labelEn: "Order tracking",
    messages: [
      {
        from: "user",
        text: "Bonjour, ma commande n°3847 n'est pas arrivée.",
        time: "14:05",
      },
      {
        from: "bot",
        text: "Je consulte votre commande...",
        time: "14:05",
      },
      {
        from: "bot",
        text: "Votre colis est en transit. Dernière étape : Douala — Yaoundé. Livraison estimée : demain avant 18h.",
        time: "14:05",
        isConfirmation: true,
      },
      {
        from: "user",
        text: "Parfait, merci pour l'information.",
        time: "14:06",
      },
      {
        from: "bot",
        text: "Avec plaisir. N'hésitez pas si vous avez d'autres questions.",
        time: "14:06",
      },
    ],
  },
  {
    id: "devis",
    Icon: FiFileText,
    labelFr: "Devis express",
    labelEn: "Quick quote",
    messages: [
      {
        from: "user",
        text: "J'aurais besoin d'un outil de gestion pour mon restaurant — 30 tables.",
        time: "09:14",
      },
      {
        from: "bot",
        text: "Avez-vous besoin d'une caisse intégrée et d'un module de réservation en ligne ?",
        time: "09:14",
      },
      {
        from: "user",
        text: "Oui, les deux.",
        time: "09:15",
      },
      {
        from: "bot",
        text: "Estimation indicative :\n— Gestion commandes & tables : 2 500 €\n— Caisse & paiements : 1 500 €\n— Réservations en ligne : 800 €\n\nTotal : ~4 800 € · Délai : 6 semaines\n\nJe vous prépare un devis détaillé ?",
        time: "09:15",
        isConfirmation: true,
      },
    ],
  },
];

interface AssistantDemoProps {
  locale: Locale;
}

export default function AssistantDemo({ locale }: AssistantDemoProps) {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("rdv");
  const [visibleCount, setVisibleCount] = useState(1);

  const scenario = scenarios.find((s) => s.id === activeScenario)!;
  const isInteractive = scenario.interactiveUpTo !== undefined;
  const displayedMessages = isInteractive
    ? scenario.messages.slice(0, visibleCount)
    : scenario.messages;

  const canAdvance =
    isInteractive &&
    scenario.interactiveUpTo !== undefined &&
    visibleCount < scenario.interactiveUpTo + 1;

  function handleScenarioChange(id: ScenarioId) {
    setActiveScenario(id);
    setVisibleCount(1);
  }

  function advance() {
    setVisibleCount((v) => Math.min(v + 1, scenario.messages.length));
  }

  const lastMsg = displayedMessages[displayedMessages.length - 1];
  const showSlots = lastMsg?.slots && lastMsg.from === "bot";

  return (
    <div className="flex flex-col gap-3">
      {/* Scenario tabs */}
      <div className="flex gap-1 p-1 bg-forest-dark/5 rounded-xl">
        {scenarios.map((s) => {
          const { Icon } = s;
          const isActive = activeScenario === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium px-2 py-2 rounded-lg transition-all leading-tight ${
                isActive
                  ? "bg-white text-forest-dark shadow-sm"
                  : "text-forest-dark/45 hover:text-forest-dark/70"
              }`}
            >
              <Icon size={12} strokeWidth={2} />
              <span className="hidden sm:inline">
                {locale === "fr" ? s.labelFr : s.labelEn}
              </span>
              <span className="sm:hidden">
                {locale === "fr" ? s.labelFr.split(" ")[0] : (s.labelEn.split(" ")[0])}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-xl border border-forest-dark/10 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">M</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight">
              {locale === "fr" ? "Assistant Marcellin" : "Marcellin Assistant"}
            </p>
            <p className="text-[11px] text-white/60 leading-tight">
              {locale === "fr" ? "en ligne" : "online"}
            </p>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" aria-hidden="true" />
        </div>

        {/* Chat area */}
        <div
          className="p-4 flex flex-col gap-2.5 min-h-[220px] max-h-[300px] overflow-y-auto"
          style={{ background: "linear-gradient(180deg, #EAE6DF 0%, #E5DDD5 100%)" }}
        >
          {displayedMessages.map((msg, i) => {
            const isUser = msg.from === "user";

            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                {msg.slots ? (
                  /* Slot selection */
                  <div className="max-w-[90%] flex flex-col gap-1.5 items-start">
                    <div className="bg-white text-gray-800 rounded-xl rounded-bl-sm shadow-sm px-3 py-2 text-sm">
                      {msg.text}
                    </div>
                    {msg.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => canAdvance && advance()}
                        className="w-full text-left text-sm bg-white border border-[#25D366]/40 text-[#075E54] px-3 py-2 rounded-lg hover:bg-[#E8F5E9] transition-colors font-medium shadow-sm"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`max-w-[82%] rounded-xl shadow-sm text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#DCF8C6] text-gray-800 rounded-br-sm"
                        : msg.isConfirmation
                        ? "bg-white text-forest-dark rounded-bl-sm border-l-2 border-[#25D366]"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <div className="px-3 py-2 whitespace-pre-line">
                      {msg.isConfirmation && (
                        <span className="inline-flex items-center gap-1 text-[#25D366] font-medium text-xs mb-1">
                          <FiCheck size={11} strokeWidth={2.5} />
                          {locale === "fr" ? "Confirmé" : "Confirmed"}
                        </span>
                      )}
                      {msg.isConfirmation && <br />}
                      {msg.text}
                      {msg.time && (
                        <span className="ml-2 text-[10px] text-gray-400 float-right mt-0.5">
                          {msg.time}
                          {isUser && (
                            <span className="ml-0.5 text-[#4FC3F7]"> ✓✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Advance CTA */}
          {canAdvance && !showSlots && (
            <div className="flex justify-center mt-1">
              <button
                onClick={advance}
                className="text-[11px] text-[#075E54] bg-white/90 border border-[#075E54]/20 px-4 py-1.5 rounded-full hover:bg-white transition-colors font-medium shadow-sm"
              >
                {locale === "fr" ? "Continuer" : "Continue"} →
              </button>
            </div>
          )}

          {/* Restart */}
          {!canAdvance && isInteractive && visibleCount === scenario.messages.length && (
            <div className="flex justify-center mt-1">
              <button
                onClick={() => setVisibleCount(1)}
                className="text-[11px] text-gray-500 bg-white/80 border border-gray-200 px-4 py-1.5 rounded-full hover:bg-white transition-colors shadow-sm"
              >
                {locale === "fr" ? "Recommencer" : "Restart"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-forest-dark/35 italic text-center">
        {locale === "fr"
          ? "Illustration — aucun message réel envoyé"
          : "Illustration — no real message sent"}
      </p>
    </div>
  );
}
