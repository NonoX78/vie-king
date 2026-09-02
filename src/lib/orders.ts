import { supabaseServer } from "@/lib/supabase/server";
import { Order } from "@/lib/types";

export async function getAllOrders(): Promise<Order[]> {
  if (!supabaseServer) return [];

  const { data, error } = await supabaseServer
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Order[];
}
