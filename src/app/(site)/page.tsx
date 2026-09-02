import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { FounderStory } from "@/components/home/FounderStory";
import { Collections } from "@/components/home/Collections";
import { EditorialGallery } from "@/components/home/EditorialGallery";
import { Experience } from "@/components/home/Experience";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <Hero />
      <Philosophy />
      <FounderStory />
      <Collections products={products} />
      <EditorialGallery />
      <Experience />
    </>
  );
}
