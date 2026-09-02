import Link from "next/link";
import { CrownMark } from "@/components/ui/CrownMark";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-content px-6 py-20 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <CrownMark className="h-8 w-16 text-gold" />
            <p className="mt-6 max-w-xs font-display text-2xl italic leading-snug">
              Chaque tête mérite une couronne.
            </p>
          </div>

          <div>
            <p className="placard text-paper/40">Boutique</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/collections" className="hover:text-gold">Collection</Link></li>
              <li><Link href="/#philosophy" className="hover:text-gold">Philosophie</Link></li>
              <li><Link href="/#founder" className="hover:text-gold">Fondateur</Link></li>
            </ul>
          </div>

          <div>
            <p className="placard text-paper/40">Service Client</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/checkout" className="hover:text-gold">Commande</Link></li>
              <li>Livraison — Martinique uniquement</li>
              <li>contact@vieking.com</li>
            </ul>
          </div>

          <div>
            <p className="placard text-paper/40">La Maison</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Fort-de-France, Martinique</li>
              <li>Fondée par Yannis Cinna</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-8 text-xs text-paper/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} VIE KING. Tous droits réservés.</p>
          <p className="placard">Pas des casquettes. Des couronnes.</p>
        </div>
      </div>
    </footer>
  );
}
