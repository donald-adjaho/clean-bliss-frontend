"use client";

/**
 * EN: useInView — IntersectionObserver wrapper. Returns a ref and whether the
 *     element is currently in the viewport. Used to pause carousels off-screen
 *     (ANIMATIONS.md §6) and reveals (§9). Falls back to "visible" when the API
 *     is unavailable.
 * FR: useInView — enveloppe autour d'IntersectionObserver. Retourne une ref et
 *     si l'élément est actuellement dans le viewport. Sert à mettre en pause les
 *     carrousels hors écran (ANIMATIONS.md §6). Retombe sur « visible » quand
 *     l'API est indisponible.
 */

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** EN: Visibility ratio triggering the observer · FR: Ratio de visibilité déclenchant l'observateur */
  threshold?: number;
  /** EN: Root margin (e.g. "200px" to pre-trigger) · FR: Marge de racine (ex. « 200px » pour pré-déclencher) */
  rootMargin?: string;
  /** EN: Stop observing after the first intersection · FR: Arrêter l'observation après la première intersection */
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0, rootMargin = "0px", once = false } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // EN: No element or no observer support → assume visible (safe default)
    // FR: Pas d'élément ou pas de support de l'observateur → supposer visible (défaut sûr)
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView] as const;
}
