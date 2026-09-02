"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CrownMark } from "@/components/ui/CrownMark";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <CrownMark className="mx-auto h-8 w-16 text-gold" />
        <h1 className="mt-6 text-center font-display text-2xl italic">VIE KING Admin</h1>
        <label className="mt-10 block">
          <span className="placard text-paper/50">Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full border-b border-paper/30 bg-transparent py-2 text-base outline-none focus:border-gold"
          />
        </label>
        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        <Button type="submit" disabled={loading} variant="light" className="mt-8 w-full">
          {loading ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </section>
  );
}
