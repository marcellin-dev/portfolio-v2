"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Campaign } from "@/lib/analytics/campaigns/types";
import {
  logoutAction,
  createCampaignAction,
  deactivateCampaignAction,
  type CreatedCampaign,
} from "@/app/admin/actions";

interface Props {
  campaigns: Campaign[];
  runtimeIds: string[];
}

export default function CampaignDashboard({ campaigns, runtimeIds }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [result, setResult] = useState<CreatedCampaign | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [deactivating, setDeactivating] = useState<string | null>(null);

  const runtimeSet = new Set(runtimeIds);
  const activeCampaigns = campaigns.filter((c) => c.active);
  const inactiveCampaigns = campaigns.filter((c) => !c.active);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setResult(null);
    setCreating(true);
    const formData = new FormData(event.currentTarget);
    const res = await createCampaignAction(formData);
    if (res.success) {
      setResult(res.data);
      formRef.current?.reset();
      router.refresh();
    } else {
      setFormError(res.error);
    }
    setCreating(false);
  }

  async function handleDeactivate(campaignId: string) {
    setDeactivating(campaignId);
    const res = await deactivateCampaignAction(campaignId);
    if (!res.success) {
      alert(res.error ?? "Erreur");
    } else {
      router.refresh();
    }
    setDeactivating(null);
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-forest text-ivory px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading font-black text-lg">Campagnes — Liens de suivi</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-ivory/60 hover:text-ivory text-sm transition-colors">
            Deconnexion
          </button>
        </form>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-12">

        {/* ── Formulaire de creation ── */}
        <section>
          <h2 className="font-heading font-bold text-lg text-forest-dark mb-4">
            Nouveau lien personnalise
          </h2>

          <form
            ref={formRef}
            onSubmit={handleCreate}
            className="bg-white border border-forest-dark/10 rounded-xl p-6 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-forest-dark/50 uppercase tracking-wide mb-1.5">
                  Entreprise / Recruteur <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  name="label"
                  required
                  placeholder="ex. BNP Paribas, Sophie Martin"
                  className="w-full border border-forest-dark/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-forest-dark/50 uppercase tracking-wide mb-1.5">
                  Poste vise
                </label>
                <input
                  type="text"
                  name="position"
                  placeholder="ex. Lead Fullstack, Developpeur Senior"
                  className="w-full border border-forest-dark/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-dark/50 uppercase tracking-wide mb-1.5">
                  Audience <span className="text-terracotta">*</span>
                </label>
                <select
                  name="audience"
                  defaultValue="recruiter"
                  className="w-full border border-forest-dark/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  <option value="recruiter">Recruteur</option>
                  <option value="prospect">Prospect / Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-dark/50 uppercase tracking-wide mb-1.5">
                  Canal <span className="text-terracotta">*</span>
                </label>
                <select
                  name="channel"
                  defaultValue="email"
                  className="w-full border border-forest-dark/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  <option value="email">Email</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-dark/50 uppercase tracking-wide mb-1.5">
                  Expiration (optionnel)
                </label>
                <input
                  type="date"
                  name="expires"
                  className="w-full border border-forest-dark/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>
            </div>

            {formError && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={creating}
              className="bg-forest text-ivory font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-forest-dark transition-colors disabled:opacity-50"
            >
              {creating ? "Creation en cours..." : "Creer et activer le lien"}
            </button>
          </form>

          {/* Resultat */}
          {result && (
            <div className="mt-4 bg-forest/5 border border-forest/20 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-forest bg-forest/10 px-2 py-0.5 rounded">
                  Actif
                </span>
                <span className="font-semibold text-forest-dark">{result.label}</span>
                <span className="text-xs text-forest-dark/40 font-mono">{result.campaignId}</span>
              </div>

              <div className="space-y-2">
                {[
                  { key: "fr", label: "FR", url: result.linkFr },
                  { key: "en", label: "EN", url: result.linkEn },
                ].map(({ key, label, url }) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 bg-white border border-forest-dark/10 rounded-lg px-4 py-3"
                  >
                    <span className="text-xs font-mono font-bold text-forest-dark/40 w-6 shrink-0">
                      {label}
                    </span>
                    <code className="flex-1 text-xs text-forest-dark break-all leading-relaxed">
                      {url}
                    </code>
                    <button
                      onClick={() => copy(url, key)}
                      className="text-xs font-semibold text-forest hover:text-forest-dark shrink-0 transition-colors"
                    >
                      {copied === key ? "Copie !" : "Copier"}
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-xs text-forest-dark/40">
                La campagne est immediatement active. Envoyez le lien FR ou EN au recruteur.
              </p>
            </div>
          )}
        </section>

        {/* ── Campagnes actives ── */}
        <section>
          <h2 className="font-heading font-bold text-lg text-forest-dark mb-4">
            Actives{" "}
            <span className="font-normal text-forest-dark/40">({activeCampaigns.length})</span>
          </h2>

          {activeCampaigns.length === 0 ? (
            <p className="text-forest-dark/40 text-sm">Aucune campagne active.</p>
          ) : (
            <div className="space-y-3">
              {activeCampaigns.map((c) => (
                <CampaignRow
                  key={c.campaign_id}
                  campaign={c}
                  canDeactivate={runtimeSet.has(c.campaign_id)}
                  deactivating={deactivating === c.campaign_id}
                  onDeactivate={() => handleDeactivate(c.campaign_id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Campagnes inactives ── */}
        {inactiveCampaigns.length > 0 && (
          <section>
            <h2 className="font-heading font-bold text-base text-forest-dark/30 mb-3">
              Inactives ({inactiveCampaigns.length})
            </h2>
            <div className="space-y-2 opacity-40">
              {inactiveCampaigns.map((c) => (
                <CampaignRow
                  key={c.campaign_id}
                  campaign={c}
                  canDeactivate={false}
                  deactivating={false}
                  onDeactivate={() => {}}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function CampaignRow({
  campaign: c,
  canDeactivate,
  deactivating,
  onDeactivate,
}: {
  campaign: Campaign;
  canDeactivate: boolean;
  deactivating: boolean;
  onDeactivate: () => void;
}) {
  const channelLabel: Record<string, string> = {
    email: "Email",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    other: "Autre",
  };

  return (
    <div className="bg-white border border-forest-dark/10 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-forest-dark text-sm truncate">{c.label}</p>
          <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded font-medium shrink-0">
            {channelLabel[c.channel] ?? c.channel}
          </span>
        </div>
        {c.position && (
          <p className="text-xs text-forest-dark/50 truncate mt-0.5">{c.position}</p>
        )}
        <p className="text-xs text-forest-dark/25 mt-1 font-mono">{c.created_at}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {c.expires_at && (
          <span className="text-xs text-forest-dark/40">exp. {c.expires_at}</span>
        )}
        {canDeactivate && (
          <button
            onClick={onDeactivate}
            disabled={deactivating}
            className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {deactivating ? "..." : "Desactiver"}
          </button>
        )}
      </div>
    </div>
  );
}
