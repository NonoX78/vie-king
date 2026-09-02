"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductStatusToggle({ id, isActive }: { id: string; isActive: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !isActive }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="text-xs underline hover:text-pink disabled:opacity-50"
    >
      {loading ? "…" : isActive ? "Ne plus afficher" : "Afficher sur le site"}
    </button>
  );
}
