"use client";

/**
 * EN: Header action cluster (Section 2, Bloc D) — premium e-commerce layout:
 *     utility group (Comparer · Favoris) separated from the conversion group
 *     (Panier · Compte) by a vertical hairline (Dior-style structure).
 *     Refined 1.5px line icons, small uppercase label under each icon,
 *     hover micro-interaction (icon lifts -0.5px + brand color).
 *     Cart: item-count pastille on the top-left of the icon (hidden while 0)
 *     + floating price badge on the top-right (always visible, "0 XOF").
 *     Account: tinted inline chip. Labels use text-body-s (12px, accessible).
 *     Specs: GUIDE.md A.1.2 Bloc D + A.1.3 aria-labels.
 * FR: Groupe d'actions du Header (Section 2, Bloc D) — layout e-commerce
 *     premium : groupe utilitaire (Comparer · Favoris) séparé du groupe
 *     conversion (Panier · Compte) par un filet vertical (structure Dior).
 *     Icônes line-art 1.5px, petit libellé uppercase sous chaque icône,
 *     micro-interaction au survol (icône -0.5px + couleur de marque).
 *     Panier : pastille du nombre d'articles en haut-gauche de l'icône
 *     (masquée si 0) + badge prix flottant en haut-droite (toujours visible,
 *     « 0 XOF »). Compte : chip teintée inline. Libellés en text-body-s (12px,
 *     accessible). Specs : GUIDE.md A.1.2 Bloc D + aria-labels A.1.3.
 */

import { BagIcon } from "@/components/icons/BagIcon";
import { CompareIcon } from "@/components/icons/CompareIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { UserIcon } from "@/components/icons/UserIcon";
import { cn } from "@/lib/cn";

/** EN: Cluster props — counters/total come from the Zustand cart store later
    FR: Props du cluster — compteurs/total viendront du store panier Zustand */
export interface HeaderActionsProps {
  /** EN: Extra classes applied to the cluster root · FR: Classes additionnelles sur la racine du cluster */
  className?: string;
  /** EN: Cart item count (dot hidden while 0) · FR: Nombre d'articles du panier (pastille masquée si 0) */
  cartCount?: number;
  /** EN: Cart running total displayed in the label · FR: Total panier affiché dans le libellé */
  cartTotal?: string;
  /** EN: Opens the full-screen search panel from the mobile/tablet icon button
      FR: Ouvre le panneau de recherche plein écran depuis le bouton icône mobile/tablette */
  onSearchOpen?: () => void;
}

/* EN: Shared action base — transparent, icon + label column, 44px min touch
   target kept via padding
   FR: Base commune des actions — transparent, colonne icône + libellé,
   cible tactile de 44px min conservée via le padding */
const actionButtonClasses = cn(
  "group relative flex flex-col items-center justify-center",
  "rounded-md px-[var(--space-sm)] py-[var(--space-xs)]",
  "text-text-primary transition-colors duration-fast ease-out",
  "hover:text-action-primary",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
);

/* EN: Premium hover micro-interaction — the icon lifts 0.5px
   FR: Micro-interaction premium au survol — l'icône se soulève de 0.5px */
const actionIconClasses =
  "size-[22px] transition-transform duration-fast ease-out group-hover:-translate-y-0.5";

/* EN: Label under the icon — 12px (text-body-s, accessible floor) uppercase,
   wide tracking, desktop only
   FR: Libellé sous l'icône — 12px (text-body-s, plancher accessible) uppercase,
   tracking large, desktop uniquement */
const actionLabelClasses = cn(
  "hidden text-body-s font-semibold uppercase tracking-[0.08em] xl:block",
  "mt-[var(--space-2xs)]",
);

export function HeaderActions({
  className,
  cartCount = 0,
  cartTotal = "0 XOF",
  onSearchOpen,
}: HeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-[var(--space-xl)]", className)}>
      {/* ────────── EN: Utility group — desktop only · FR: Groupe utilitaire — desktop uniquement ────────── */}
      <div className="hidden items-center gap-[var(--space-xl)] xl:flex">
        <button
          type="button"
          aria-label="Comparer des produits"
          className={actionButtonClasses}
        >
          <CompareIcon className={actionIconClasses} />
          <span className={actionLabelClasses}>Comparer</span>
        </button>

        <button
          type="button"
          aria-label="Ma liste de souhaits"
          className={actionButtonClasses}
        >
          <HeartIcon className={actionIconClasses} />
          <span className={actionLabelClasses}>Favoris</span>
        </button>
      </div>

      {/* EN: Vertical hairline between the utility and conversion groups
          (Dior-style structural separator)
          FR: Filet vertical entre le groupe utilitaire et le groupe conversion
          (séparateur structurel style Dior) */}
      <span
        aria-hidden="true"
        className="hidden h-8 w-px shrink-0 bg-border-subtle xl:block"
      />

      {/* ────────── EN: Conversion group — visible on every breakpoint
                     FR: Groupe conversion — visible sur tous les breakpoints ────────── */}
      <div className="flex items-center gap-[var(--space-xl)]">
        {/* EN: Cart — item-count pastille on the top-LEFT of the icon (hidden
            while 0) + the running total as a floating badge on the top-RIGHT
            (always visible, "0 XOF"). Under the icon the label stays just
            "Panier" (the total moved into the badge).
            FR: Panier — pastille du nombre d'articles en haut-gauche de l'icône
            (masquée si 0) + le total courant en badge flottant en haut-droite
            (toujours visible, « 0 XOF »). Sous l'icône le libellé reste
            simplement « Panier » (le total est passé dans le badge). */}
        <button type="button" aria-label="Mon panier" className={actionButtonClasses}>
          <span className="relative inline-flex">
            <BagIcon className={actionIconClasses} />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[var(--space-2xs)] -top-[var(--space-2xs)]",
                  "flex size-5 items-center justify-center rounded-full",
                  "bg-action-primary text-body-s font-semibold leading-none text-action-on-primary",
                  "ring-2 ring-bg-surface",
                )}
              >
                {/* EN: Truncated past 99 to keep the pastille readable
                    FR: Tronqué au-delà de 99 pour garder la pastille lisible */}
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
            {/* EN: Floating price badge — absolute top -8px / right -16px,
                always visible (white on action-primary = AA), stays compact.
                The -16px overhang keeps the badge clear of the search field
                (≥ 24px at tablet widths) and of the cluster's left hairline.
                FR: Badge prix flottant — absolu top -8px / right -16px,
                toujours visible (blanc sur action-primary = AA), reste compact.
                Le débordement de 16px écarte le badge du champ de recherche
                (≥ 24px en tablette) et du filet gauche du cluster. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -right-[var(--space-lg)] -top-[var(--space-xs)]",
                "flex items-center whitespace-nowrap rounded-full px-[var(--space-xs)] py-px",
                "bg-action-primary text-body-s font-semibold leading-none tabular-nums text-action-on-primary",
                "ring-2 ring-bg-surface",
              )}
            >
              {cartTotal}
            </span>
          </span>
          <span className={actionLabelClasses}>Panier</span>
        </button>

        {/* EN: Account — differentiated tinted chip (bg-brand-surface, inline
            icon + label), slightly deeper tint on hover. Text uses
            action-primary-hover for AA on the tinted surface.
            FR: Compte — chip teintée différenciée (bg-brand-surface, icône +
            libellé inline), teinte légèrement plus soutenue au survol. Le texte
            utilise action-primary-hover pour l'AA sur la surface teintée. */}
        <button
          type="button"
          aria-label="Mon compte"
          className={cn(
            "group hidden items-center gap-[var(--space-xs)] rounded-full bg-brand-surface",
            "px-[var(--space-md)] py-[var(--space-sm)]",
            "text-action-primary-hover transition-colors duration-fast ease-out hover:bg-bg-tint",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            "xl:inline-flex",
          )}
        >
          <UserIcon className="size-[18px] transition-transform duration-fast ease-out group-hover:-translate-y-0.5" />
          <span className="text-body-s font-medium leading-none">Compte</span>
        </button>

        {/* EN: Tablet/mobile — search icon: opens the full-screen search panel
            (GUIDE.md A.1.2 "Search — ouvre un panneau plein écran"), wired in
            HeaderTop via onSearchOpen
            FR: Tablette/mobile — icône recherche : ouvre le panneau de
            recherche plein écran (GUIDE.md A.1.2 « Search — ouvre un panneau
            plein écran »), câblé dans HeaderTop via onSearchOpen */}
        <button
          type="button"
          aria-label="Rechercher"
          className={cn(actionButtonClasses, "xl:hidden")}
          onClick={onSearchOpen}
        >
          <SearchIcon className={actionIconClasses} />
        </button>
      </div>
    </div>
  );
}
