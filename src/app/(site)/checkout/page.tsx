"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/Button";

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  address_line: "",
  city: "",
  postal_code: "",
};

export default function CheckoutPage() {
  const { lines, totalCents, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          lines: lines.map((l) => ({ product_id: l.product.id, quantity: l.quantity })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue. Veuillez réessayer.");
        setSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/checkout/confirmation?order=${data.orderId}`);
    } catch {
      setError("Impossible de contacter le serveur. Veuillez réessayer.");
      setSubmitting(false);
    }
  };

  if (lines.length === 0) {
    return (
      <section className="px-6 py-48 text-center">
        <p className="font-display text-3xl italic">Votre panier est vide.</p>
      </section>
    );
  }

  return (
    <section className="px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <p className="placard text-ink/50">Commande</p>
          <h1 className="mt-3 font-display text-4xl italic md:text-5xl">
            Presque à vous.
          </h1>

          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <Field label="Nom Complet" value={form.full_name} onChange={onChange("full_name")} required />
            <Field label="Email" type="email" value={form.email} onChange={onChange("email")} required />
            <Field label="Téléphone" type="tel" value={form.phone} onChange={onChange("phone")} required />
            <Field label="Adresse" value={form.address_line} onChange={onChange("address_line")} required />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Ville" value={form.city} onChange={onChange("city")} required />
              <Field
                label="Code Postal"
                value={form.postal_code}
                onChange={onChange("postal_code")}
                required
                placeholder="972xx"
              />
            </div>

            {error && <p className="text-sm text-red-700">{error}</p>}

            <div className="pt-4">
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Traitement…" : "Payer avec SumUp"}
              </Button>
              <p className="mt-3 text-center text-[11px] text-ink/40">
                Le paiement est géré en toute sécurité par SumUp. Les
                coordonnées bancaires ne sont jamais stockées par VIE KING.
              </p>
            </div>
          </form>
        </div>

        <div className="hairline-top bg-ivory px-6 py-8 md:hairline-top-0 md:bg-transparent md:px-0 md:py-0">
          <p className="placard text-ink/50">Récapitulatif</p>
          <ul className="mt-6 space-y-6">
            {lines.map((line) => (
              <li key={line.product.id} className="flex gap-4">
                <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-sand/40">
                  <Image src={line.product.image_url} alt={line.product.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 items-start justify-between">
                  <div>
                    <p className="font-display italic">{line.product.name}</p>
                    <p className="placard mt-1 text-ink/50">Qté {line.quantity}</p>
                  </div>
                  <p className="text-sm">{formatPrice(line.product.price_cents * line.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between hairline-top pt-6 text-lg">
            <span>Total</span>
            <span>{formatPrice(totalCents)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="placard text-ink/50">{label}</span>
      <input
        {...rest}
        className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 font-body text-base outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}
