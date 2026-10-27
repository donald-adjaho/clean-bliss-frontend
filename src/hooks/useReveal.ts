"use client";

/**
 * EN: useReveal — scroll-triggered fade/slide-in powered by GSAP + ScrollTrigger
 *     (ANIMATIONS.md §9). Returns a container ref; the container itself (or the
 *     children matching `selector`) is revealed once when it enters the viewport.
 *     Skips the animation entirely when the user prefers reduced motion.
 * FR: useReveal — apparition au défilement (fondu + glissement) via GSAP +
 *     ScrollTrigger (ANIMATIONS.md §9). Retourne une ref de conteneur ; le
 *     conteneur (ou ses enfants correspondant à `selector`) est révélé une fois
 *     à l'entrée dans le viewport. L'animation est entièrement ignorée si
 *     l'utilisateur préfère réduire les animations.
 *
 * EN: Replaces the official @gsap/react `useGSAP` hook (not installed) with an
 *     equivalent gsap.context() + cleanup pattern.
 * FR: Remplace le hook officiel @gsap/react `useGSAP` (non installé) par un
 *     schéma équivalent gsap.context() + nettoyage.
 */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export interface RevealOptions {
  /** EN: CSS selector for the children to stagger · FR: Sélecteur CSS des enfants à décaler */
  selector?: string;
  /** EN: Stagger between children (seconds) · FR: Décalage entre enfants (secondes) */
  stagger?: number;
  /** EN: Delay before the animation starts · FR: Délai avant le début de l'animation */
  delay?: number;
  /** EN: Vertical offset at start (px) · FR: Décalage vertical au départ (px) */
  y?: number;
  /** EN: Animation duration (seconds) · FR: Durée de l'animation (secondes) */
  duration?: number;
  /** EN: ScrollTrigger start position · FR: Position de départ du ScrollTrigger */
  start?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const prefersReduced = useReducedMotion();

  // EN: Destructure to primitive deps so the effect only re-runs on real changes
  // FR: Déstructurer vers des dépendances primitives pour ne relancer l'effet qu'au réel changement
  const {
    selector,
    stagger = 0,
    delay = 0,
    y = Number.parseFloat(getComputedStyleRevealOffset()) || 24,
    duration = 0.4,
    start = "top 85%",
  } = options;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    // EN: Nothing to animate, or reduced motion → leave content visible
    // FR: Rien à animer, ou mouvement réduit → laisser le contenu visible
    if (!el || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // EN: gsap.context scopes selectors and collects tweens for one-shot cleanup
    // FR: gsap.context limite les sélecteurs et collecte les tweens pour un nettoyage unique
    const ctx = gsap.context(() => {
      const targets: HTMLElement[] = selector
        ? Array.from(el.querySelectorAll<HTMLElement>(selector))
        : [el];
      if (targets.length === 0) return;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        ease: "power2.out",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [prefersReduced, selector, stagger, delay, y, duration, start]);

  return ref;
}

/**
 * EN: Reads the --anim-reveal-offset token (falls back to 24 when the token is
 *     not yet available, e.g. during SSR-less first paint).
 * FR: Lit le token --anim-reveal-offset (retombe sur 24 quand le token n'est pas
 *     encore disponible, ex. au premier rendu sans SSR).
 */
function getComputedStyleRevealOffset(): string {
  if (typeof window === "undefined") return "24";
  const value = getComputedStyle(document.documentElement).getPropertyValue("--anim-reveal-offset");
  return value || "24";
}
