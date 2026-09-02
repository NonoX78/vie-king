import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const BUCKET = "product-photos";

// Les URLs publiques Supabase ressemblent à :
// https://<projet>.supabase.co/storage/v1/object/public/product-photos/<chemin>
// On extrait juste le <chemin> pour pouvoir le passer à storage.remove()
function extractStoragePath(url: string): string | null {
  const marker = `/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!supabaseServer) {
    return NextResponse.json({ error: "Connecte une base de données" }, { status: 400 });
  }
  const body = await req.json();

  // On récupère l'ancienne photo AVANT d'écraser, pour pouvoir la nettoyer
  // une fois que la nouvelle est bien enregistrée.
  const { data: existing } = await supabaseServer
    .from("products")
    .select("image_url")
    .eq("id", params.id)
    .single();

  const { data, error } = await supabaseServer
    .from("products")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const oldUrl = existing?.image_url;
  const newUrl = body.image_url;
  if (oldUrl && newUrl && oldUrl !== newUrl) {
    const oldPath = extractStoragePath(oldUrl);
    if (oldPath) {
      await supabaseServer.storage.from(BUCKET).remove([oldPath]);
    }
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!supabaseServer) {
    return NextResponse.json({ error: "Connecte d'abord Supabase. Voir README.md." }, { status: 400 });
  }

  const { data: product } = await supabaseServer
    .from("products")
    .select("image_url, gallery")
    .eq("id", params.id)
    .single();

  const { error } = await supabaseServer.from("products").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (product) {
    const urls = [product.image_url, ...(product.gallery ?? [])].filter(Boolean);
    const paths = urls.map(extractStoragePath).filter((p): p is string => Boolean(p));
    if (paths.length > 0) {
      await supabaseServer.storage.from(BUCKET).remove(paths);
    }
  }

  return NextResponse.json({ ok: true });
}