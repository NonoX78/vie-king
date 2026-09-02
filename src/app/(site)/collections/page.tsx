import { Metadata } from "next";
import { ProductCard } from "@/components/ui/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "La Collection",
  description: "Toutes les couronnes de la collection VIE KING actuelle.",
};

export default async function CollectionsPage() {
  const products = await getAllProducts();

  return (
    <section className="px-6 pb-32 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-content">
        <p className="placard text-ink/50">La Collection</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl italic md:text-6xl">
          Chaque pièce est numérotée.<br /> Aucune n'est jamais répétée.
        </h1>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
