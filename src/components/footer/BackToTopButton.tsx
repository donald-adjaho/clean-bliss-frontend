"use client";

/**
 * EN: Back-to-top button (Client Component) — appears after 400px of scroll
 *     (translateY + opacity) and smooth-scrolls to the top on click.
 *     Specs: GUIDE.md A.2.2 (bottom) + A.2.5 (états) + ANIMATIONS.md § 3.7.
 * FR: Bouton retour en haut (Client Component) — apparaît après 400px de scroll
 *     (translateY + opacity) et remonte en douceur vers le haut au clic.
 *     Specs : GUIDE.md A.2.2 (bas) + A.2.5 (états) + ANIMATIONS.md § 3.7.
 *
 * EN: "use client" required — scroll listener + click handler.
 * FR: "use client" requis — écouteur de scroll + gestionnaire de clic.
 */

import { IconArrowUp } from "@tabler/icons-react";

import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

export function BackToTopButton() {
  // EN: Appearance threshold — 400px (GUIDE.md A.2.5)
  // FR: Seuil d'apparition — 400px (GUIDE.md A.2.5)
  const isVisible = useScrolled(400);

  /**
   * EN: Scrolls back to the top — instant when prefers-reduced-motion is set,
   *     smooth otherwise (ANIMATIONS.md § 3.7, reduced-motion rule).
   * FR: Remonte en haut de page — instantané si prefers-reduced-motion est
   *     actif, fluide sinon (ANIMATIONS.md § 3.7, règle reduced-motion).
   */
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut"
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        // EN: Pill style — footer-border 1px, white text, padding 10px / 16px
        // FR: Style pilule — bordure 1px footer-border, texte blanc, padding 10px / 16px
        "inline-flex items-center gap-[var(--space-xs)] rounded-full border border-footer-border",
        "px-[var(--space-lg)] py-[var(--space-sm)] text-body-s text-base-white",
        "transition-[border-color,color,opacity,transform] duration-xslow ease-out motion-reduce:transition-none",
        "hover:border-brand-surface",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-white",
        // EN: Floating appearance — fade + translateY after 400px (--duration-xslow)
        // FR: Apparition flottante — fondu + translateY après 400px (--duration-xslow)
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        // EN: Hidden on mobile — native touch scroll replaces it (GUIDE.md A.2.2)
        // FR: Masqué sur mobile — le scroll tactile natif le remplace (GUIDE.md A.2.2)
        "max-md:hidden",
      )}
    >
      <IconArrowUp aria-hidden="true" className="size-4" />
      Retour en haut
    </button>
  );
}
