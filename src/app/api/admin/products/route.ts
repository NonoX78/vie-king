import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export async function GET() {
  if (!supabaseServer) {
    return NextResponse.json({ products: MOCK_PRODUCTS, mock: true });
  }
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data, mock: false });
}

export async function POST(req: NextRequest) {
  if (!supabaseServer) {
    return NextResponse.json(
      { error: "Connecte Supabase pour ajouter de vrais produits. Voir README.md → 'Connecting Supabase'." },
      { status: 400 }
    );
  }
  const body = await req.json();
  const { data, error } = await supabaseServer.from("products").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}
