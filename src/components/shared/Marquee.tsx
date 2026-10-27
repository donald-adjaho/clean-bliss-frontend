"use client";

/**
 * EN: Marquee — infinite horizontal banner (ANIMATIONS.md §4). The child
 *     sequence is rendered twice (second copy `aria-hidden`) inside a `w-max`
 *     track animated by the `.animate-marquee` utility (translateX 0 → -50%,
 *     linear, 28 s). Pauses on hover (CSS) and when the banner leaves the
 *     viewport (IntersectionObserver via `useInView` → `data-paused`).
 *     `prefers-reduced-motion` freezes it entirely (handled in globals.css).
 * FR: Marquee — bandeau horizontal infini (ANIMATIONS.md §4). La séquence enfant
 *     est rendue deux fois (2e copie `aria-hidden`) dans une piste `w-max`
 *     animée par l'utilitaire `.animate-marquee` (translateX 0 → -50%, linéaire,
 *     28 s). Pause au survol (CSS) et hors écran (IntersectionObserver via
 *     `useInView` → `data-paused`). `prefers-reduced-motion` le fige totalement
 *     (géré dans globals.css).
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/useInView";

interface MarqueeProps {
  /** EN: One full sequence of items (will be duplicated for the loop)
   * FR: Une séquence complète d'éléments (dupliquée pour la boucle) */
  children: ReactNode;
  /** EN: Track classes (e.g. gap) · FR: Classes de la piste (ex. gap) */
  className?: string;
}

export function Marquee({ children, className }: MarqueeProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div
        className={cn("animate-marquee flex w-max", className)}
        data-paused={inView ? "false" : "true"}
      >
        {/* EN: Original sequence · FR: Séquence d'origine */}
        <div className="flex shrink-0 items-center">{children}</div>
        {/* EN: Duplicate for a seamless loop (hidden from assistive tech)
            FR: Duplicata pour une boucle sans couture (masqué aux lecteurs d'écran) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
