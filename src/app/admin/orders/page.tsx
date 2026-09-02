import { getAllOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/products";
import { isSupabaseServerConfigured } from "@/lib/supabase/server";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  paid: "Payée",
  fulfilled: "Expédiée",
  cancelled: "Annulée",
};

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <p className="placard text-ink/50">Commandes</p>
      <h1 className="mt-2 font-display text-3xl italic">{orders.length} commande{orders.length !== 1 ? "s" : ""}</h1>

      {!isSupabaseServerConfigured && (
        <div className="mt-6 border border-gold/40 bg-gold/10 px-5 py-4 text-sm">
          Les commandes apparaîtront ici une fois Supabase connecté et un
          client passé en caisse. Voir <code>README.md</code> → &ldquo;Connecting
          Supabase&rdquo;.
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-10 overflow-hidden border border-ink/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-ivory text-ink/50">
              <tr>
                <th className="px-5 py-3 font-normal">Client</th>
                <th className="px-5 py-3 font-normal">Articles</th>
                <th className="px-5 py-3 font-normal">Total</th>
                <th className="px-5 py-3 font-normal">Statut</th>
                <th className="px-5 py-3 font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-ink/10 align-top">
                  <td className="px-5 py-3">
                    <p>{o.customer.full_name}</p>
                    <p className="text-xs text-ink/50">{o.customer.email}</p>
                    <p className="text-xs text-ink/50">
                      {o.customer.address_line}, {o.customer.city} {o.customer.postal_code}
                    </p>
                  </td>
                  <td className="px-5 py-3">
                    {o.lines.map((l) => (
                      <p key={l.product_id}>
                        {l.quantity} × {l.name}
                      </p>
                    ))}
                  </td>
                  <td className="px-5 py-3">{formatPrice(o.total_cents)}</td>
                  <td className="px-5 py-3">{STATUS_LABELS[o.status] ?? o.status}</td>
                  <td className="px-5 py-3 text-ink/50">
                    {o.created_at ? new Date(o.created_at).toLocaleDateString("fr-FR") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
