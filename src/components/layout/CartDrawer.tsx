"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeItem, totalCents } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-8 py-6 hairline">
              <p className="placard">Vos Couronnes ({lines.length})</p>
              <button onClick={closeCart} className="text-sm text-ink/60 hover:text-gold" aria-label="Fermer le panier">
                Fermer
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {lines.length === 0 ? (
                <p className="mt-16 text-center font-display italic text-ink/50">
                  Aucune couronne choisie pour l'instant.
                </p>
              ) : (
                <ul className="space-y-8">
                  {lines.map((line) => (
                    <li key={line.product.id} className="flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-sand/30">
                        <Image src={line.product.image_url} alt={line.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-display italic">{line.product.name}</p>
                            <p className="placard mt-1 text-ink/50">{line.product.colorway}</p>
                          </div>
                          <p className="text-sm">{formatPrice(line.product.price_cents * line.quantity)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                            className="h-7 w-7 border border-ink/30 text-xs hover:border-gold hover:text-gold"
                          >
                            −
                          </button>
                          <span className="text-sm">{line.quantity}</span>
                          <button
                            onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                            className="h-7 w-7 border border-ink/30 text-xs hover:border-gold hover:text-gold"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(line.product.id)}
                            className="ml-auto text-xs text-ink/40 underline hover:text-gold"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="hairline-top px-8 py-6">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-ink/60">Sous-total</span>
                <span>{formatPrice(totalCents)}</span>
              </div>
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full" disabled={lines.length === 0}>
                  Passer la Commande
                </Button>
              </Link>
              <p className="mt-3 text-center text-[11px] text-ink/40">
                Livraison actuellement en Martinique uniquement.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
