import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getAllProducts } from "@/lib/products";
import { CustomerInfo } from "@/lib/types";

type CheckoutPayload = {
  customer: CustomerInfo;
  lines: { product_id: string; quantity: number }[];
};

const MARTINIQUE_POSTAL_PREFIX = "972";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CheckoutPayload;
  const { customer, lines } = body;

  if (!customer?.full_name || !customer?.email || !customer?.address_line || !customer?.postal_code) {
    return NextResponse.json({ error: "Informations client manquantes." }, { status: 400 });
  }

  if (!customer.postal_code.startsWith(MARTINIQUE_POSTAL_PREFIX)) {
    return NextResponse.json(
      { error: "VIE KING livre actuellement uniquement en Martinique (codes postaux commençant par 972)." },
      { status: 400 }
    );
  }

  if (!lines || lines.length === 0) {
    return NextResponse.json({ error: "Votre panier est vide." }, { status: 400 });
  }

  // Recompute totals server-side from trusted product data — never trust client prices.
  const products = await getAllProducts();
  const orderLines = lines.map((line) => {
    const product = products.find((p) => p.id === line.product_id);
    if (!product) throw new Error(`Unknown product: ${line.product_id}`);
    return {
      product_id: product.id,
      name: product.name,
      quantity: line.quantity,
      price_cents: product.price_cents,
    };
  });
  const total_cents = orderLines.reduce((sum, l) => sum + l.price_cents * l.quantity, 0);

  const order = {
    customer,
    lines: orderLines,
    total_cents,
    status: "pending" as const,
    payment_provider: "sumup" as const,
  };

  let orderId = `local-${Date.now()}`;

  if (supabaseServer) {
    const { data, error } = await supabaseServer.from("orders").insert(order).select("id").single();
    if (error) {
      return NextResponse.json({ error: "Impossible d'enregistrer la commande." }, { status: 500 });
    }
    orderId = data.id;
  }

  // --- SumUp integration point -------------------------------------------
  // When SumUp credentials are available, create a checkout session here and
  // return its `checkout_url` / `checkout_reference` instead of a flat
  // "pending" status. See README.md → "Connecting SumUp" for the exact shape
  // SumUp's Checkout API expects (POST /v0.1/checkouts with amount,
  // currency: "EUR", checkout_reference: orderId, merchant_code).
  // -------------------------------------------------------------------------

  return NextResponse.json({ orderId, total_cents, paymentUrl: null });
}
