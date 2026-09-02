import Image from "next/image";
import { RevealText } from "@/components/ui/RevealText";

const IMAGES = [
  { seed: "vieking-ed-1", span: "md:row-span-2" },
  { seed: "vieking-ed-2", span: "" },
  { seed: "vieking-ed-3", span: "" },
  { seed: "vieking-ed-4", span: "md:col-span-2" },
];

export function EditorialGallery() {
  return (
    <section className="bg-ink px-6 py-32 text-paper md:px-10 md:py-40">
      <div className="mx-auto max-w-content">
        <RevealText>
          <p className="placard text-paper/50">04 — Sur le Terrain</p>
        </RevealText>
        <RevealText delay={0.1}>
          <h2 className="mt-4 font-display text-4xl italic md:text-5xl">
            Portées, pas posées.
          </h2>
        </RevealText>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
          {IMAGES.map((img, i) => (
            <RevealText key={img.seed} delay={i * 0.08} className={`relative aspect-square overflow-hidden ${img.span}`}>
              <Image
                src={`https://picsum.photos/seed/${img.seed}/900/900`}
                alt="VIE KING éditorial"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-luxury hover:scale-105"
              />
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
