import Link from "next/link";
import { getAllProductsForAdmin, formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { ProductStatusToggle } from "@/components/admin/ProductStatusToggle";

export default async function AdminProductsPage() {
  // Admin sees every product, active or hidden — never filter by is_active here.
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="placard text-ink/50">Produits</p>
          <h1 className="mt-2 font-display text-3xl italic">{products.length} pièces</h1>
        </div>
        <Link href="/admin/products/new">
          <Button>Ajouter un Produit</Button>
        </Link>
      </div>

      <div className="mt-10 overflow-hidden border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand/40 text-ink/50">
            <tr>
              <th className="px-5 py-3 font-normal">Pièce</th>
              <th className="px-5 py-3 font-normal">Édition</th>
              <th className="px-5 py-3 font-normal">Prix</th>
              <th className="px-5 py-3 font-normal">Stock</th>
              <th className="px-5 py-3 font-normal">Statut</th>
              <th className="px-5 py-3 font-normal"></th>
              <th className="px-5 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className={`border-t border-ink/10 ${!p.is_active ? "opacity-60" : ""}`}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-10 flex-shrink-0 overflow-hidden bg-sand/30">
                      <ProductImage product={p} />
                    </div>
                    <span className="font-display italic">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink/60">{p.edition}</td>
                <td className="px-5 py-3">{formatPrice(p.price_cents)}</td>
                <td className="px-5 py-3">{p.stock}</td>
                <td className="px-5 py-3">
                  <span className={p.is_active ? "text-green-700" : "text-ink/40"}>
                    {p.is_active ? "Actif" : "Masqué du site"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-xs underline hover:text-pink">
                    Modifier
                  </Link>
                </td>
                <td className="px-5 py-3 text-right">
                  <ProductStatusToggle id={p.id} isActive={p.is_active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
