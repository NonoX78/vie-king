"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const LINKS = [
  { href: "/admin", label: "Aperçu" },
  { href: "/admin/products", label: "Produits" },
  { href: "/admin/orders", label: "Commandes" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-full w-56 flex-shrink-0 flex-col justify-between border-r border-paper/10 bg-ink px-6 py-8 text-paper">
      <div>
        <Link href="/admin" className="font-display text-lg italic tracking-wide">
          VIE KING
        </Link>
        <p className="placard mt-1 text-paper/40">Admin</p>

        <nav className="mt-10 space-y-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "block rounded px-3 py-2 text-sm transition-colors",
                  active ? "bg-paper/10 text-gold" : "text-paper/70 hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button onClick={signOut} className="text-left text-xs text-paper/40 hover:text-gold">
        Se déconnecter
      </button>
    </aside>
  );
}
