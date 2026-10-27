/**
 * EN: Section — server layout primitive giving every homepage block the same
 *     responsive rhythm: mobile (--space-mobile-h/v), tablet (--space-tablet),
 *     desktop (--space-5xl / --space-8xl) — GUIDE.md § B.1.
 * FR: Section — primitive de mise en page serveur donnant à chaque bloc de
 *     l'accueil le même rythme responsive : mobile (--space-mobile-h/v),
 *     tablette (--space-tablet), desktop (--space-5xl / --space-8xl) — GUIDE.md § B.1.
 *
 * EN: No "use client" — pure presentational wrapper, works from both contexts.
 * FR: Pas de "use client" — simple enveloppe présentationnelle, utilisable dans
 *     les deux contextes.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** EN: Shared responsive padding applied to every section unless overridden
    FR: Padding responsive partagé, appliqué à toute section sauf surcharge */
export const SECTION_PADDING =
  "px-[var(--space-mobile-h)] py-[var(--space-mobile-v)] md:p-[var(--space-tablet)] xl:px-[var(--space-5xl)] xl:py-[var(--space-8xl)]";

interface SectionProps {
  /** EN: Section anchor id (in-page navigation) · FR: Id d'ancre de la section (navigation interne) */
  id?: string;
  /** EN: Token-based background class, e.g. "bg-bg-subtle" · FR: Classe de fond token, ex. « bg-bg-subtle » */
  background?: string;
  /** EN: Skip the default responsive padding (full-bleed blocks) · FR: Sauter le padding responsive par défaut (blocs pleine largeur) */
  unpadded?: boolean;
  /** EN: Extra classes merged last (can override padding) · FR: Classes supplémentaires fusionnées en dernier (peuvent surcharger le padding) */
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  background,
  unpadded = false,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full", background, !unpadded && SECTION_PADDING, className)}
    >
      {children}
    </section>
  );
}
