/**
 * EN: Base Card component — 4 variants covering every card used on the site.
 *     It only provides the container (background, radius, border, padding,
 *     internal gap); the content layout stays the caller's responsibility.
 *     Specs: GUIDE.md § A.3 (carte produit B.2, carte commande B.4,
 *     carte info Compte B.6, carte valeur À-propos §4). Tokens only.
 * FR: Composant Card de base — 4 variantes couvrant toutes les cartes du site.
 *     Il fournit uniquement le conteneur (fond, rayon, bordure, padding,
 *     gap interne) ; la disposition du contenu reste à la charge de l'appelant.
 *     Specs : GUIDE.md § A.3. Tokens uniquement (globals.css).
 *
 * EN: No "use client" — pure presentational component.
 * FR: Pas de "use client" — composant purement présentationnel.
 */

import { cn } from "@/lib/cn";

/** EN: Card props — variant picks the container styling, children is the content
    FR: Props de la carte — la variante choisit le style du conteneur, children est le contenu */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** EN: product = catalogue tile (tint background, radius-xl)
        FR: product = tuile catalogue (fond teinté, radius-xl) */
  /** EN: command = order card (white, radius-md, border-subtle)
        FR: command = carte commande (blanche, radius-md, bordure subtile) */
  /** EN: info = account/panel card (white, radius-md, padding 32px)
        FR: info = carte Compte/panneau (blanche, radius-md, padding 32px) */
  /** EN: value = values card (white, radius-xl, padding 32px)
        FR: value = carte valeurs (blanche, radius-xl, padding 32px) */
  variant?: "product" | "command" | "info" | "value";
  /** EN: Internal flex gap (16px by default) · FR: Gap flex interne (16px par défaut) */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  /** EN: Card content · FR: Contenu de la carte */
  children: React.ReactNode;
}

/* EN: Container styles per variant — all values come from globals.css tokens
   FR: Styles du conteneur par variante — toutes les valeurs viennent des tokens de globals.css */
const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  // EN: Carte produit (catalogue) — tint bg, subtle border, radius-xl,
  //     padding 16px/16px/24px (GUIDE.md B.2)
  // FR: Carte produit (catalogue) — fond tint, bordure subtile, radius-xl,
  //     padding 16px/16px/24px (GUIDE.md B.2)
  product:
    "bg-bg-tint border border-border-subtle rounded-xl p-[var(--space-lg)] pb-[var(--space-xl)]",
  // EN: Carte commande — surface bg, subtle border, radius-md, padding 24px (GUIDE.md B.4)
  // FR: Carte commande — fond surface, bordure subtile, radius-md, padding 24px (GUIDE.md B.4)
  command: "bg-bg-surface border border-border-subtle rounded-md p-[var(--space-xl)]",
  // EN: Carte info (Compte) — surface bg, radius-md, padding 32px
  // FR: Carte info (Compte) — fond surface, radius-md, padding 32px
  info: "bg-bg-surface rounded-md p-[var(--space-2xl)]",
  // EN: Carte valeur (À-propos §4) — surface bg, radius-xl, padding 32px
  // FR: Carte valeur (À-propos §4) — fond surface, radius-xl, padding 32px
  value: "bg-bg-surface rounded-xl p-[var(--space-2xl)]",
};

/* EN: Internal gap options — maps to the --space-* tokens
   FR: Options de gap interne — correspond aux tokens --space-* */
const gapClasses: Record<NonNullable<CardProps["gap"]>, string> = {
  none: "",
  sm: "gap-[var(--space-sm)]",
  md: "gap-[var(--space-md)]",
  lg: "gap-[var(--space-lg)]",
  xl: "gap-[var(--space-xl)]",
};

export function Card({
  variant = "info",
  gap = "lg",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        // EN: Flex column by default — most cards stack their content vertically
        // FR: Flex column par défaut — la plupart des cartes empilent leur contenu
        "flex flex-col",
        variantClasses[variant],
        gapClasses[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
