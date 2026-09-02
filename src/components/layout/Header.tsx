"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-700 ease-luxury ${
        scrolled ? "bg-paper/90 backdrop-blur-md hairline" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-display text-lg tracking-[0.25em] text-ink"
        >
          VIE KING
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="placard text-ink/70 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="placard flex items-center gap-2 text-ink/80 transition-colors hover:text-gold"
          aria-label="Ouvrir le panier"
        >
          Panier
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink/40 text-[10px] normal-case tracking-normal">
            {totalCount}
          </span>
        </button>
      </div>
    </header>
  );
}
