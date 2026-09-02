"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Props = { product?: Product };

const empty = {
  name: "",
  slug: "",
  colorway: "",
  edition: "",
  material: "",
  price_cents: 0,
  description: "",
  story: "",
  image_url: "",
  gallery: [] as string[],
  stock: 0,
  is_active: true,
};

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(product ?? empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: string, value: unknown) => setForm((f) => ({ ...f, [field]: value }));

  const uploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setError(data.error);
      return null;
    }
    return data.url as string;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().trim().replace(/\s+/g, "-"),
    };

    const res = await fetch(
      product ? `/api/admin/products/${product.id}` : "/api/admin/products",
      {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue.");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  };

  const onDelete = async () => {
    if (!product) return;
    if (!confirm(`Supprimer "${product.name}" définitivement ?`)) return;
    await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      {error && <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <Row>
        <Field label="Nom" value={form.name} onChange={(v) => update("name", v)} required />
        <Field label="Slug (optionnel)" value={form.slug} onChange={(v) => update("slug", v)} placeholder="généré automatiquement" />
      </Row>
      <Row>
        <Field label="Coloris" value={form.colorway} onChange={(v) => update("colorway", v)} required />
        <Field label="Libellé d'édition" value={form.edition} onChange={(v) => update("edition", v)} placeholder="Édition n° 007" required />
      </Row>
      <Field label="Matière" value={form.material} onChange={(v) => update("material", v)} required />
      <Row>
        <Field
          label="Prix (EUR)"
          type="number"
          value={String(form.price_cents / 100)}
          onChange={(v) => update("price_cents", Math.round(Number(v) * 100))}
          required
        />
        <Field
          label="Stock"
          type="number"
          value={String(form.stock)}
          onChange={(v) => update("stock", Number(v))}
          required
        />
      </Row>

      <TextArea label="Description courte" value={form.description} onChange={(v) => update("description", v)} />
      <TextArea label="Histoire" value={form.story} onChange={(v) => update("story", v)} rows={4} />

      <label className="block">
        <span className="placard text-ink/50">Photo principale</span>
        <input
          type="file"
          accept="image/*"
          className="mt-2 block text-sm"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = await uploadFile(file);
            if (url) update("image_url", url);
          }}
        />
        {uploading && <p className="mt-1 text-xs text-ink/50">Téléversement…</p>}
        {form.image_url && (
          <div className="relative mt-3 h-32 w-28 overflow-hidden bg-sand/30">
            <Image src={form.image_url} alt="Aperçu" fill className="object-cover" />
          </div>
        )}
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => update("is_active", e.target.checked)}
        />
        Visible sur le site
      </label>

      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? "Enregistrement…" : product ? "Enregistrer les modifications" : "Ajouter le produit"}
        </Button>
        {product && (
          <button type="button" onClick={onDelete} className="text-xs text-red-700 underline">
            Supprimer le produit
          </button>
        )}
      </div>
    </form>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="placard text-ink/50">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="placard text-ink/50">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}
