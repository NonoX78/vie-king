import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { AddToCart } from "@/components/ui/AddToCart";
import { BackLink } from "@/components/ui/BackLink";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Pièce Introuvable" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image_url] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <section className="px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-content">
        <BackLink />
      </div>
      <div className="mx-auto mt-10 grid max-w-content gap-16 md:grid-cols-2 md:gap-20">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand/30">
            <Image src={product.image_url} alt={product.name} fill priority className="object-cover" />
          </div>
          {product.gallery?.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {product.gallery.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden bg-sand/30">
                  <Image src={src} alt={product.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:sticky md:top-32 md:h-fit">
          <p className="placard text-ink/50">{product.edition}</p>
          <h1 className="mt-3 font-display text-5xl italic">{product.name}</h1>
          <p className="mt-4 text-lg text-ink/70">{product.description}</p>
          <p className="mt-6 font-body text-2xl">{formatPrice(product.price_cents)}</p>

          <div className="mt-10">
            <AddToCart product={product} />
          </div>

          <div className="mt-12 space-y-6 hairline-top pt-8">
            <div>
              <p className="placard text-ink/50">Coloris</p>
              <p className="mt-1 text-sm">{product.colorway}</p>
            </div>
            <div>
              <p className="placard text-ink/50">Matière</p>
              <p className="mt-1 text-sm">{product.material}</p>
            </div>
            <div>
              <p className="placard text-ink/50">L'Histoire</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">{product.story}</p>
            </div>
            <div>
              <p className="placard text-ink/50">Livraison</p>
              <p className="mt-1 text-sm text-ink/70">
                Emballé à la main à Fort-de-France. Livré en Martinique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
