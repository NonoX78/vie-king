import Link from "next/link";
import { getAllProductsForAdmin } from "@/lib/products";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

export default async function AdminOverview() {
  // Admin overview must count every product, active or hidden.
  const products = await getAllProductsForAdmin();
  const activeProducts = products.filter((p) => p.is_active);
  const hiddenProducts = products.filter((p) => !p.is_active);
  const lowStock = products.filter((p) => p.stock <= 10);

  return (
    <div>
      <p className="placard text-ink/50">Aperçu</p>
      <h1 className="mt-2 font-display text-3xl italic">Bon retour.</h1>

      {!isSupabaseServerConfigured && (
        <div className="mt-6 border border-gold/40 bg-gold/10 px-5 py-4 text-sm">
          Tu vois des données d&rsquo;exemple. Connecte Supabase pour gérer
          les vrais produits, le stock et les commandes — voir{" "}
          <code>README.md</code> → &laquo; Connecting Supabase &raquo;.
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Stat label="Pièces au Total" value={products.length} />
        <Stat label="Actives sur le Site" value={activeProducts.length} />
        <Stat label="Masquées" value={hiddenProducts.length} />
        <Stat label="Stock Faible (≤10)" value={lowStock.length} />
      </div>

      <div className="mt-12 flex gap-4">
        <Link href="/admin/products" className="placard border-b border-ink pb-1 hover:border-pink hover:text-pink">
          Gérer les Produits
        </Link>
        <Link href="/admin/orders" className="placard border-b border-ink pb-1 hover:border-pink hover:text-pink">
          Voir les Commandes
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-ink/10 bg-white px-6 py-6">
      <p className="placard text-ink/50">{label}</p>
      <p className="mt-3 font-display text-4xl italic">{value}</p>
    </div>
  );
}
