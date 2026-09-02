import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  if (!supabaseServer) {
    return NextResponse.json({ orders: [], mock: true });
  }
  const { data, error } = await supabaseServer
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data, mock: false });
}
