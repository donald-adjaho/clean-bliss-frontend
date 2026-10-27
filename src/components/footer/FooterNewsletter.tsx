"use client";

/**
 * EN: Footer newsletter form (Client Component) — front-only subscribe form
 *     (decision D-24, no backend in v1). Validates the email with zod via
 *     react-hook-form and shows a confirmation toast on submit.
 *     Specs: GUIDE.md A.2.2 (colonne 4) + A.2.3 + A.2.5 (états).
 * FR: Formulaire newsletter du footer (Client Component) — formulaire
 *     d'abonnement front-only (décision D-24, pas de backend en v1). Valide
 *     l'e-mail avec zod via react-hook-form et affiche un toast de confirmation
 *     à la soumission.
 *     Specs : GUIDE.md A.2.2 (colonne 4) + A.2.3 + A.2.5 (états).
 *
 * EN: "use client" required — react-hook-form hooks + toast.
 * FR: "use client" requis — hooks react-hook-form + toast.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/Button";

/* EN: Validation schema — a single valid email (French message on failure)
   FR: Schéma de validation — un seul e-mail valide (message FR en cas d'échec) */
const newsletterSchema = z.object({
  email: z.email({ message: "Veuillez saisir une adresse e-mail valide." }),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function FooterNewsletter() {
  // EN: RHF wiring — zod resolver, no fields registered until first render
  // FR: Câblage RHF — resolver zod, aucun champ enregistré avant le 1er rendu
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  /**
   * EN: Submit handler — front-only: confirm with a toast then clear the field.
   * FR: Gestionnaire de soumission — front-only : confirme via un toast puis
   *     vide le champ.
   */
  const onSubmit = () => {
    toast.success("Merci ! Votre inscription est bien prise en compte.");
    reset();
  };

  return (
    <div>
      {/* EN: Section title — body-m semibold, white
          FR: Titre de section — body-m semibold, blanc */}
      <h3 className="font-body text-body-m font-semibold text-base-white">
        S&apos;abonner à notre Newsletter
      </h3>

      {/* EN: Inline pill field — compact input + primary "S'abonner" button
          (the shared <Input> forces a visible label, so a compact field is
          used here with an aria-label for accessibility)
          FR: Champ pilule en ligne — input compact + bouton primary
          « S'abonner » (le composant <Input> partagé impose un label visible,
          on utilise donc ici un champ compact avec aria-label) */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-[var(--space-md)] flex items-center gap-[var(--space-sm)] rounded-full border border-footer-border p-[var(--space-2xs)] pl-[var(--space-lg)]"
      >
        <input
          type="email"
          aria-label="Votre adresse e-mail"
          placeholder="votre meilleur e-mail"
          aria-invalid={errors.email ? true : undefined}
          className={[
            "min-w-0 flex-1 bg-transparent text-body-m text-base-white",
            "placeholder:text-footer-link focus:outline-none",
          ].join(" ")}
          {...register("email")}
        />
        <Button type="submit" size="sm">
          S&apos;abonner
        </Button>
      </form>

      {/* EN: Inline validation error (GUIDE.md A.2.5 — error state)
          FR: Erreur de validation en ligne (GUIDE.md A.2.5 — état erreur) */}
      {errors.email && (
        <p role="alert" className="mt-[var(--space-xs)] text-body-s text-danger">
          {errors.email.message}
        </p>
      )}
    </div>
  );
}
