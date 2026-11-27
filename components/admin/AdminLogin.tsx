"use client";

import { useState } from "react";
import { loginAction } from "@/app/admin/actions";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <h1 className="font-heading font-black text-2xl text-forest-dark mb-8 text-center">
          Administration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-forest-dark/70 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full border border-forest-dark/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-ivory font-semibold py-2 rounded text-sm hover:bg-forest-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
