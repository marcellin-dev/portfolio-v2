"use client";

import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { useState } from "react";
import AnimateOnScroll from "@/components/shared/AnimateOnScroll";
import { sendEmail } from "@/actions/sendEmail";
import { FiCheck } from "react-icons/fi";

type RequestType = "project" | "ai" | "recruiting" | "other";

interface ContactHomeProps {
  locale: Locale;
}

export default function ContactHome({ locale }: ContactHomeProps) {
  const t = getTranslations(locale).contact;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [requestType, setRequestType] = useState<RequestType>("project");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const formData = new FormData();
    formData.set("senderEmail", email);
    formData.set(
      "message",
      `[Type: ${requestType}]\n[Nom: ${name}]\n\n${message}`
    );

    const { error } = await sendEmail(formData);
    setStatus(error ? "error" : "success");
  }

  return (
    <section id="contact" className="py-24 bg-ivory">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <AnimateOnScroll>
            <h2 className="font-heading font-black text-section-lg text-forest-dark mb-4">
              {t.sectionTitle}
            </h2>
            <p className="text-forest-dark/60 text-lg mb-10">{t.sectionIntro}</p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-forest-dark/40 uppercase tracking-wider mb-2">
                  {t.orEmail}
                </p>
                <a
                  href="mailto:lelemarcellin@gmail.com"
                  className="text-forest font-medium hover:underline underline-offset-2"
                >
                  lelemarcellin@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold text-forest-dark/40 uppercase tracking-wider mb-2">
                  {t.orPhone}
                </p>
                <a
                  href="tel:+237695509408"
                  className="text-forest font-medium hover:underline underline-offset-2"
                >
                  +237 695 509 408
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: form */}
          <AnimateOnScroll delay={0.1}>
            {status === "success" ? (
              <div className="bg-forest text-ivory rounded-xl p-8">
                <div className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center mb-4">
                  <FiCheck size={20} strokeWidth={2.5} className="text-ivory" />
                </div>
                <p className="text-ivory/90">{t.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Request type */}
                <fieldset>
                  <legend className="text-xs font-semibold text-forest-dark/50 uppercase tracking-wider mb-2">
                    {t.requestType}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ["project", t.typeProject],
                        ["ai", t.typeAI],
                        ["recruiting", t.typeRecruiting],
                        ["other", t.typeOther],
                      ] as [RequestType, string][]
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRequestType(value)}
                        className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                          requestType === value
                            ? "bg-forest text-ivory border-forest"
                            : "text-forest-dark/60 border-forest-dark/20 hover:border-forest/50"
                        }`}
                        aria-pressed={requestType === value}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-name" className="text-sm font-medium text-forest-dark/70">
                    {t.namePlaceholder}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={200}
                    className="border border-forest-dark/20 rounded px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest text-forest-dark placeholder:text-forest-dark/30"
                    placeholder={t.namePlaceholder}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-email" className="text-sm font-medium text-forest-dark/70">
                    {t.emailPlaceholder}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={500}
                    className="border border-forest-dark/20 rounded px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest text-forest-dark placeholder:text-forest-dark/30"
                    placeholder="email@exemple.com"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-message" className="text-sm font-medium text-forest-dark/70">
                    {t.messagePlaceholder}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={5}
                    className="border border-forest-dark/20 rounded px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest text-forest-dark placeholder:text-forest-dark/30 resize-none"
                    placeholder={t.messagePlaceholder}
                  />
                </div>

                {status === "error" && (
                  <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-4 py-3">
                    {t.errorMessage}{" "}
                    <a
                      href="mailto:lelemarcellin@gmail.com"
                      className="font-medium underline"
                    >
                      lelemarcellin@gmail.com
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-forest text-ivory font-semibold px-6 py-3 rounded hover:bg-forest-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? t.sending : t.sendButton}
                </button>
              </form>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
