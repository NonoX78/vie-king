import { RevealText } from "@/components/ui/RevealText";

export function Philosophy() {
  return (
    <section id="philosophy" className="bg-paper px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-content">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <RevealText>
              <p className="placard text-ink/50">01 — Philosophie</p>
            </RevealText>
          </div>

          <div className="md:col-span-9">
            <RevealText>
              <p className="font-display text-4xl italic leading-[1.15] md:text-6xl">
                Une casquette, ça se porte. Une couronne, ça se porte fièrement.
              </p>
            </RevealText>

            <RevealText delay={0.15}>
              <p className="mt-10 max-w-xl font-body text-base leading-relaxed text-ink/70 md:text-lg">
                VIE KING n'a jamais été pensé comme un simple couvre-chef.
                C'est conçu comme un petit acte d'auto-couronnement — une
                pièce que l'on porte quand on décide, pour cette journée, de
                prendre la place qui nous revient. Nous travaillons au point
                de rencontre entre la mode de luxe, l'art contemporain et la
                culture urbaine, et nous laissons chaque pièce porter les
                trois à la fois.
              </p>
            </RevealText>

            <RevealText delay={0.3}>
              <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink/70 md:text-lg">
                Rien ici n'est décoratif pour le plaisir de l'être. Chaque
                silhouette, chaque point de couture, chaque numéro d'édition
                est une décision — de la même manière qu'une galerie décide où
                accrocher une toile, et pourquoi.
              </p>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
