import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <p className="placard text-ink/50">Produits</p>
      <h1 className="mt-2 font-display text-3xl italic">{product.name}</h1>
      <div className="mt-10">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
