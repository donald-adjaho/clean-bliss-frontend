/**
 * EN: Product not found page (GUIDE.md §B.3.5)
 * FR: Page produit introuvable (GUIDE.md §B.3.5)
 */

import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { IconHome, IconShoppingBag } from "@tabler/icons-react";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-[var(--space-xl)] px-[var(--space-mobile-h)] text-center">
      <div className="flex flex-col items-center gap-[var(--space-md)]">
        <span className="text-body-s font-semibold uppercase tracking-[0.12em] text-action-primary">ERREUR</span>
        <h1 className="font-heading text-h2 text-text-primary">Produit introuvable</h1>
        <p className="max-w-[520px] text-body-l text-text-secondary">
          Ce produit n'existe pas ou n'est plus disponible. Explorez notre boutique pour découvrir nos autres références.
        </p>
      </div>
      <div className="flex flex-col gap-[var(--space-md)] sm:flex-row">
        <ButtonLink href="/" variant="primary" icon={<IconHome aria-hidden="true" className="size-4" />} iconPosition="left">
          Retour à l'accueil
        </ButtonLink>
        <ButtonLink href="/boutique" variant="secondary" icon={<IconShoppingBag aria-hidden="true" className="size-4" />} iconPosition="left">
          Voir la boutique
        </ButtonLink>
      </div>
    </main>
  );
}
