import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { RevealText } from "@/components/ui/RevealText";
import { Product } from "@/lib/types";

export function Collections({ products }: { products: Product[] }) {
  return (
    <section className="bg-paper px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-content">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <RevealText>
              <p className="placard text-ink/50">03 — La Collection</p>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="mt-4 font-display text-4xl italic md:text-5xl">
                Des pièces, pas des produits.
              </h2>
            </RevealText>
          </div>
          <RevealText delay={0.2}>
            <Link href="/collections" className="placard border-b border-ink pb-1 hover:border-gold hover:text-gold">
              Voir la Collection Complète
            </Link>
          </RevealText>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
