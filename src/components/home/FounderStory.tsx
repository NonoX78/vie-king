import Image from "next/image";
import { RevealText } from "@/components/ui/RevealText";

export function FounderStory() {
  return (
    <section id="founder" className="bg-ivory px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-content gap-16 md:grid-cols-2 md:items-center md:gap-24">
        <RevealText className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/vieking-founder/1000/1250"
            alt="Yannis Cinna, fondateur de VIE KING"
            fill
            className="object-cover"
          />
        </RevealText>

        <div>
          <RevealText>
            <p className="placard text-ink/50">02 — Le Fondateur</p>
          </RevealText>

          <RevealText delay={0.1}>
            <h2 className="mt-4 font-display text-4xl italic leading-tight md:text-5xl">
              Yannis Cinna
            </h2>
          </RevealText>

          <RevealText delay={0.2}>
            <div className="mt-8 space-y-6 font-body text-base leading-relaxed text-ink/70 md:text-lg">
              <p>
                Yannis a grandi entre deux langues qui n'en formaient qu'une
                seule : la langue de l'art, et celle des vêtements. Bien avant
                VIE KING, c'était l'enfant qui dessinait dans les coins de
                musée, traçant le contour d'une couronne de Basquiat sans
                encore savoir qu'elle deviendrait le motif de sa vie.
              </p>
              <p>
                Ce qui l'attire vers l'art abstrait est ce qui l'attire vers
                le streetwear — les deux laissent une personne dire quelque
                chose de vrai sans dire un mot. Une silhouette, une couleur,
                une forme sur une toile ou sur une tête : tout cela est une
                forme de parole pour ceux qui préfèrent être vus qu'entendus.
              </p>
              <p>
                VIE KING a commencé comme un rituel privé — une façon de se
                sentir soi-même avant d'entrer dans des pièces qui ne lui
                faisaient pas toujours de place. Il a construit la marque
                pour que ce rituel appartienne à quiconque a le courage de se
                l'approprier : une confiance que l'on enfile délibérément, une
                liberté portée à l'extérieur, un rêve qu'on n'a pas besoin
                d'expliquer.
              </p>
              <p className="font-display italic text-xl text-ink">
                &ldquo;Je ne fais pas des casquettes. Je fabrique les cinq
                minutes avant d'entrer quelque part, en te sentant devenir la
                version de toi-même que tu es en train de bâtir.&rdquo;
              </p>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
