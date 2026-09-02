import { supabaseServer } from "@/lib/supabase/server";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { Product } from "@/lib/types";

export async function getAllProducts(): Promise<Product[]> {
  if (!supabaseServer) return MOCK_PRODUCTS;

  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return MOCK_PRODUCTS;
  return data as Product[];
}

// Admin-only: returns every product regardless of is_active, so hidden
// pieces stay visible and manageable in the dashboard. Never use this for
// the public storefront — use getAllProducts() there instead.
export async function getAllProductsForAdmin(): Promise<Product[]> {
  if (!supabaseServer) return MOCK_PRODUCTS;

  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return MOCK_PRODUCTS;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabaseServer) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  return data as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!supabaseServer) {
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  }

  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Product;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
