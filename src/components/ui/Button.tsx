/**
 * EN: Base Button component — pill shape (--radius-full), 3 variants
 *     (primary | secondary | ghost) and 3 sizes (sm | md | lg).
 *     Specs: DESIGN.md § 5 + GUIDE.md § A.3.2. Tokens only (globals.css).
 * FR: Composant Button de base — forme pilule (--radius-full), 3 variantes
 *     (primary | secondary | ghost) et 3 tailles (sm | md | lg).
 *     Specs : DESIGN.md § 5 + GUIDE.md § A.3.2. Tokens uniquement (globals.css).
 *
 * EN: No "use client" — pure presentational component, usable from both
 *     Server and Client Components (event handlers come from the parent).
 * FR: Pas de "use client" — composant purement présentationnel, utilisable
 *     depuis les Server et Client Components (les gestionnaires d'événements
 *     viennent du parent).
 */

import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

/** EN: Button props — extends native button attributes for flexibility
    FR: Props du bouton — étend les attributs natifs <button> pour la flexibilité */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** EN: Visual variant · FR: Variante visuelle */
  variant?: "primary" | "secondary" | "ghost";
  /** EN: Size (sm 40px / md 48px / lg 56px) · FR: Taille (sm 40px / md 48px / lg 56px) */
  size?: "sm" | "md" | "lg";
  /** EN: Disabled state · FR: État désactivé */
  disabled?: boolean;
  /** EN: Shows a spinner and disables the button · FR: Affiche un spinner et désactive le bouton */
  isLoading?: boolean;
  /** EN: Full width (100%) · FR: Pleine largeur (100%) */
  fullWidth?: boolean;
  /** EN: Optional icon (tabler icons-react node) · FR: Icône optionnelle (nœud @tabler/icons-react) */
  icon?: React.ReactNode;
  /** EN: Icon position relative to the label · FR: Position de l'icône par rapport au libellé */
  iconPosition?: "left" | "right";
  /** EN: Button content · FR: Contenu du bouton */
  children: React.ReactNode;
}

/* EN: Shared base styles — reused by Button and ButtonLink so anchors and
 *     buttons render identically (GUIDE.md § A.3.2)
 * FR: Styles de base partagés — réutilisés par Button et ButtonLink afin que
 *     liens et boutons rendent identiquement (GUIDE.md § A.3.2) */
export const BUTTON_BASE_CLASSES = cn(
  // EN: Shared base — pill radius, inline flex, smooth color transitions
  // FR: Base commune — rayon pilule, flex inline, transitions de couleurs fluides
  "inline-flex items-center justify-center gap-[var(--space-sm)] rounded-full font-medium",
  "transition-colors duration-[var(--duration-fast)] ease-out",
  // EN: Focus ring — 2px brand ring with 2px offset (a11y requirement)
  // FR: Anneau de focus — anneau 2px avec offset 2px (exigence d'accessibilité)
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
);

/* EN: Variant styles — colors and borders come exclusively from globals.css tokens
   FR: Styles de variante — couleurs et bordures proviennent exclusivement des tokens de globals.css */
export const BUTTON_VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-action-primary text-action-on-primary border-none hover:bg-action-primary-hover active:bg-action-primary-active",
  secondary:
    "bg-bg-surface text-text-primary border border-border-default hover:border-action-primary hover:text-action-primary",
  ghost: "bg-transparent text-text-primary border-none hover:text-action-primary",
};

/* EN: Size styles — heights map to Tailwind scale (h-10=40, h-12=48, h-14=56),
       paddings use the --space-* tokens via arbitrary values
   FR: Styles de taille — hauteurs alignées sur l'échelle Tailwind (h-10=40, h-12=48, h-14=56),
       paddings via les tokens --space-* en valeurs arbitraires */
export const BUTTON_SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-10 px-[var(--space-lg)] py-[var(--space-sm)] text-body-m font-medium",
  md: "h-12 px-[var(--space-xl)] py-[var(--space-md)] text-body-l font-medium",
  lg: "h-14 px-[var(--space-3xl)] py-[var(--space-lg)] text-body-xl font-medium",
};

/* EN: Builds the full class string shared by Button and ButtonLink
   FR: Construit la chaîne de classes complète partagée par Button et ButtonLink */
export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}): string {
  return cn(
    BUTTON_BASE_CLASSES,
    BUTTON_SIZE_CLASSES[size ?? "md"],
    // EN: Variant last so its colour token wins the tailwind-merge conflict
    //     against the size's text-* token (see cn.ts — tailwind-merge reads
    //     custom `text-*` colour tokens as font-size); the size token is then
    //     re-appended by cn()'s SIZE_TOKENS workaround.
    // FR: Variante en dernier pour que son token de couleur gagne le conflit
    //     tailwind-merge face au token text-* de la taille (cf. cn.ts —
    //     tailwind-merge lit les tokens `text-*` de couleur comme des tailles) ;
    //     le token de taille est ensuite ré-ajouté par cn() (SIZE_TOKENS).
    BUTTON_VARIANT_CLASSES[variant ?? "primary"],
    fullWidth && "w-full",
    // EN: Disabled — brand token at 40% opacity, forbidden cursor
    // FR: Désactivé — token de marque à 40% d'opacité, curseur interdit
    disabled && "opacity-40 cursor-not-allowed",
    className,
  );
}

/* EN: Spinner size follows the button text size
   FR: La taille du spinner suit la taille du texte du bouton */
const spinnerSizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-5",
};

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  // EN: While loading, the button behaves as disabled (no double submit)
  // FR: Pendant le chargement, le bouton se comporte comme désactivé (pas de double soumission)
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={buttonClassName({
        variant,
        size,
        fullWidth,
        disabled: isDisabled,
        className,
      })}
      {...rest}
    >
      {/* EN: Leading icon or spinner while loading
          FR: Icône de gauche ou spinner pendant le chargement */}
      {isLoading && iconPosition === "left" && (
        <IconLoader2 aria-hidden="true" className={cn(spinnerSizeClasses[size], "animate-spin")} />
      )}
      {!isLoading && icon && iconPosition === "left" && (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      )}

      {children}

      {/* EN: Trailing icon · FR: Icône de droite */}
      {!isLoading && icon && iconPosition === "right" && (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      )}
      {isLoading && iconPosition === "right" && (
        <IconLoader2 aria-hidden="true" className={cn(spinnerSizeClasses[size], "animate-spin")} />
      )}
    </button>
  );
}
