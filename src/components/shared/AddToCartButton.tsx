"use client";

/**
 * EN: AddToCartButton — the "Ajouter" control of the catalogue card. The cart
 *     is wired in a later lot (B.4), so for now the button notifies the user it
 *     is coming soon instead of adding to the cart. Client island so the
 *     presentational <ProductCard /> can stay a Server Component.
 * FR: AddToCartButton — le contrôle « Ajouter » de la carte catalogue. Le panier
 *     est câblé dans un lot ultérieur (B.4) ; en attendant, le bouton informe
 *     l'utilisateur que la feature arrive au lieu d'ajouter au panier. Îlot
 *     client pour que le <ProductCard /> présentationnel reste un Server Component.
 *
 * EN: Responsive per GUIDE.md B.2.5 — desktop: pill "Ajouter" with a plus icon;
 *     mobile: 32×32 icon-only square. Styles are reused from the Button
 *     primitive (BUTTON_BASE_CLASSES + BUTTON_VARIANT_CLASSES) so no button
 *     styling is duplicated.
 * FR: Responsive selon GUIDE.md B.2.5 — desktop : pilule « Ajouter » avec icône
 *     plus ; mobile : carré 32×32 icône seule. Les styles sont réutilisés depuis
 *     la primitive Button (BUTTON_BASE_CLASSES + BUTTON_VARIANT_CLASSES) pour ne
 *     pas dupliquer le style de bouton.
 */

import { IconPlus } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface AddToCartButtonProps {
  /** EN: Visible desktop label (e.g. "J'en profite !" for §5) · FR: Libellé desktop visible (ex. « J'en profite ! » pour §5) */
  label?: string;
  /** EN: Accessible name announced to screen readers · FR: Nom accessible annoncé aux lecteurs d'écran */
  ariaLabel?: string;
  className?: string;
}

export function AddToCartButton({
  label = "Ajouter",
  ariaLabel = "Ajouter au panier",
  className,
}: AddToCartButtonProps) {
  /* EN: Temporary handler until the cart is wired (lot B.4)
   * FR: Gestionnaire temporaire tant que le panier n'est pas câblé (lot B.4) */
  const handleAdd = () => {
    toast.success("Bientôt disponible ! Ce produit sera ajoutable au panier très bientôt.");
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={cn(
        BUTTON_BASE_CLASSES,
        BUTTON_VARIANT_CLASSES.primary,
        // EN: Size — 32×32 icon-only on mobile, pill 40px with label from 768px
        // FR: Taille — 32×32 icône seule sur mobile, pilule 40px avec libellé dès 768px
        "size-8 shrink-0 p-0 md:h-10 md:w-auto md:px-[var(--space-lg)] md:py-[var(--space-sm)] md:text-body-m md:font-medium",
        className,
      )}
    >
      <IconPlus aria-hidden="true" className="size-4 shrink-0" />
      {/* EN: Label hidden on mobile (icon-only) · FR: Libellé masqué sur mobile (icône seule) */}
      <span className="hidden md:inline">{label}</span>
      {/* EN: Screen-reader name matching the icon-only mobile state
          FR: Nom lecteur d'écran correspondant à l'état mobile icône seule */}
      <span className="sr-only md:hidden">{ariaLabel}</span>
    </button>
  );
}
