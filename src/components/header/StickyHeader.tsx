"use client";

/**
 * EN: StickyHeader — premium sticky shell for the header sections 2+3.
 *     Glassmorphism: semi-transparent surface + backdrop blur, so the page
 *     content glides softly behind the pinned header. A subtle elevation
 *     shadow appears past ~400px of scroll (GUIDE.md A.1.1).
 * FR: StickyHeader — conteneur sticky premium pour les sections 2+3 du
 *     header. Glassmorphism : surface semi-transparente + flou d'arrière-plan,
 *     le contenu glisse doucement derrière le header épinglé. Une ombre
 *     d'élévation subtile apparaît après ~400px de scroll (GUIDE.md A.1.1).
 */

import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

export function StickyHeader({ children }: { children: React.ReactNode }) {
  const isScrolled = useScrolled(400);

  return (
    <div
      className={cn(
        // EN: Glass effect — 85% opaque surface + blur; sections 2+3 stay
        //     readable while the page scrolls behind them
        // FR: Effet verre — surface à 85% + flou ; les sections 2+3 restent
        //     lisibles pendant que la page défile derrière elles
        "sticky top-0 z-50 bg-bg-surface/85 backdrop-blur-md",
        "transition-shadow duration-base ease-out",
        // EN: Elevation shadow past 400px (rgba of --color-neutral-900 #0E2A38)
        // FR: Ombre d'élévation après 400px (rgba de --color-neutral-900 #0E2A38)
        isScrolled && "shadow-[0_8px_24px_rgba(14,42,56,0.08)]",
      )}
    >
      {children}
    </div>
  );
}
