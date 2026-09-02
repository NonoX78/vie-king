"use client";

import { useRouter } from "next/navigation";

export function BackLink() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="placard inline-flex items-center gap-2 text-ink/50 hover:text-gold"
    >
      ← Retour à la Collection
    </button>
  );
}
