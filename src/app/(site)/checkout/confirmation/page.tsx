import { CrownMark } from "@/components/ui/CrownMark";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { order?: string };
}) {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <CrownMark className="h-10 w-20 text-gold" />
      <p className="placard mt-8 text-ink/50">Commande {searchParams.order}</p>
      <h1 className="mt-4 max-w-xl font-display text-4xl italic md:text-5xl">
        Votre couronne est en préparation.
      </h1>
      <p className="mt-6 max-w-md text-ink/70">
        Une confirmation a été envoyée à votre email. Votre pièce sera
        emballée à la main à Fort-de-France et livrée en Martinique.
      </p>
    </section>
  );
}
