/**
 * EN: Round icon button 44×44px — used in the Header actions (compare,
 *     wishlist, cart, account) and mobile hamburger menu.
 *     Specs: GUIDE.md § A.3 + Header "Bloc D". Tokens only (globals.css).
 * FR: Bouton icône rond 44×44px — utilisé dans les actions du Header
 *     (comparer, favoris, panier, compte) et le menu hamburger mobile.
 *     Specs : GUIDE.md § A.3 + Header « Bloc D ». Tokens uniquement (globals.css).
 *
 * EN: No "use client" — pure presentational component (handlers come from parent).
 * FR: Pas de "use client" — composant purement présentationnel
 *     (les gestionnaires d'événements viennent du parent).
 */

import { cn } from "@/lib/cn";

/** EN: Icon button props — ariaLabel is mandatory (icon-only button, a11y rule 4.6)
    FR: Props du bouton icône — ariaLabel obligatoire (bouton icône seule, règle a11y 4.6) */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** EN: Icon node (tabler icons-react, 20px recommended) · FR: Nœud icône (@tabler/icons-react, 20px recommandé) */
  icon: React.ReactNode;
  /** EN: Accessible label — REQUIRED because the button has no visible text
      FR: Libellé accessible — OBLIGATOIRE car le bouton n'a pas de texte visible */
  ariaLabel: string;
  /** EN: outlined = white surface + border (default) · filled = solid brand background
      FR: outlined = fond blanc + bordure (défaut) · filled = fond de marque plein */
  variant?: "outlined" | "filled";
  /** EN: Badge type — "count" = 20×20px circle, hidden when 0 (cart items) ·
        "price" = auto-width pill, always visible (cart total "0 XOF", GUIDE.md A.1)
      FR: Type de badge — "count" = cercle 20×20px, masqué si 0 (articles panier) ·
        "price" = pilule à largeur auto, toujours visible (total panier « 0 XOF », GUIDE.md A.1) */
  badgeType?: "count" | "price";
  /** EN: Badge content — number (count) or string (price) · FR: Contenu du badge — nombre (compteur) ou chaîne (prix) */
  badge?: number | string;
}

export function IconButton({
  icon,
  ariaLabel,
  variant = "outlined",
  badge,
  badgeType = "count",
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  // EN: "count" badge hidden when absent, zero or negative — avoids confusing "0" states
  // FR: Badge « count » masqué si absent, nul ou négatif — évite les états « 0 » trompeurs
  const showCountBadge = badgeType === "count" && typeof badge === "number" && badge > 0;
  // EN: "price" badge always visible when provided (GUIDE.md A.1 — "0 XOF" default)
  // FR: Badge « price » toujours visible quand fourni (GUIDE.md A.1 — défaut « 0 XOF »)
  const showPriceBadge = badgeType === "price" && badge !== undefined;

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={cn(
        // EN: 44×44px round hit area (mobile-friendly touch target)
        // FR: Zone tactile ronde de 44×44px (cible tactile adaptée au mobile)
        "relative inline-flex size-11 shrink-0 items-center justify-center rounded-full",
        "transition-colors duration-fast ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        variant === "outlined"
          ? // EN: Outlined — surface background + 1px default border (Header "style commun")
            // FR: Outlined — fond surface + bordure 1px par défaut (« style commun » du Header)
            "bg-bg-surface border border-border-default text-text-primary hover:border-action-primary hover:text-action-primary"
          : // EN: Filled — solid primary background, white content (ex. bouton Compte)
            // FR: Filled — fond primary plein, contenu blanc (ex. bouton Compte)
            "bg-action-primary text-action-on-primary border-none hover:bg-action-primary-hover active:bg-action-primary-active",
        // EN: Disabled — reduced opacity + forbidden cursor
        // FR: Désactivé — opacité réduite + curseur interdit
        rest.disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
      {...rest}
    >
      {/* EN: Icon is decorative — the aria-label carries the meaning
          FR: L'icône est décorative — l'aria-label porte le sens */}
      <span aria-hidden="true" className="inline-flex">
        {icon}
      </span>

      {/* EN: "price" badge — auto-width pill, always visible, white text
          (GUIDE.md A.1 "Bloc D" — cart total "0 XOF")
          FR: Badge « price » — pilule à largeur auto, toujours visible, texte blanc
          (GUIDE.md A.1 « Bloc D » — total panier « 0 XOF ») */}
      {showPriceBadge && (
        <span
          aria-hidden="true"
          className="absolute -top-[var(--space-2xs)] -right-[var(--space-2xs)] flex h-5 items-center whitespace-nowrap rounded-full bg-action-primary px-[var(--space-sm)] text-[length:var(--text-body-s)] font-semibold leading-none text-action-on-primary"
        >
          {badge}
        </span>
      )}

      {/* EN: "count" badge — 20×20px circle, top-right, absolute, hidden when 0
          FR: Badge « count » — cercle 20×20px, en haut à droite, absolu, masqué si 0 */}
      {showCountBadge && (
        <span
          aria-hidden="true"
          className="absolute -top-[var(--space-2xs)] -right-[var(--space-2xs)] flex size-5 items-center justify-center rounded-full bg-action-primary text-[length:var(--text-body-s)] font-semibold leading-none text-action-on-primary"
        >
          {/* EN: Truncate values above 99 to keep the 20px circle readable
              FR: Tronque au-delà de 99 pour garder le cercle 20px lisible */}
          {typeof badge === "number" ? (badge > 99 ? "99+" : badge) : badge}
        </span>
      )}
    </button>
  );
}
