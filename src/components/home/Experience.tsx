import { RevealText } from "@/components/ui/RevealText";

const POINTS = [
  {
    title: "Finition à la main",
    body: "Chaque blason est posé à la main, en petites séries — jamais de chaîne de production, toujours un établi.",
  },
  {
    title: "Scellée dans le sable et l'ivoire",
    body: "Chaque commande arrive dans un emballage mat et sans marque, enveloppée de papier de soie, fermée par un fil unique scellé à la cire.",
  },
  {
    title: "De Fort-de-France à votre porte",
    body: "Livraison actuellement exclusive à la Martinique, pour que chaque pièce arrive avec le même soin qu'à sa création.",
  },
];

export function Experience() {
  return (
    <section className="bg-ivory px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-content">
        <RevealText>
          <p className="placard text-ink/50">05 — L'Expérience</p>
        </RevealText>
        <RevealText delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-4xl italic md:text-5xl">
            Posséder une couronne devrait donner l'impression de la recevoir.
          </h2>
        </RevealText>

        <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-3">
          {POINTS.map((point, i) => (
            <RevealText key={point.title} delay={i * 0.1}>
              <p className="placard text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-2xl italic">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{point.body}</p>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
