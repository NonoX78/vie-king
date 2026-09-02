import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <p className="placard text-ink/50">Produits</p>
      <h1 className="mt-2 font-display text-3xl italic">Ajouter une nouvelle pièce</h1>
      <div className="mt-10">
        <ProductForm />
      </div>
    </div>
  );
}
