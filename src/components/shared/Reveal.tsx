"use client";

/**
 * EN: Reveal — thin client wrapper around useReveal. Renders a container whose
 *     contents fade/slide in on scroll (GSAP + ScrollTrigger, ANIMATIONS.md §9).
 *     Pass `selector` to stagger specific children instead of the container.
 * FR: Reveal — fine enveloppe client autour de useReveal. Rend un conteneur dont
 *     le contenu apparaît (fondu + glissement) au défilement (GSAP +
 *     ScrollTrigger, ANIMATIONS.md §9). Passer `selector` pour décaler des
 *     enfants précis plutôt que le conteneur.
 */

import type { ReactNode } from "react";
import { useReveal, type RevealOptions } from "@/hooks/useReveal";
import { cn } from "@/lib/cn";

interface RevealProps extends RevealOptions {
  /** EN: Revealed content · FR: Contenu révélé */
  children: ReactNode;
  /** EN: Container classes · FR: Classes du conteneur */
  className?: string;
}

export function Reveal({ children, className, ...options }: RevealProps) {
  const ref = useReveal<HTMLDivElement>(options);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
