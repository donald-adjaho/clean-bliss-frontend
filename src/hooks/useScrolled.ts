"use client";

/**
 * EN: useScrolled — returns true once the page has been scrolled past the
 *     given threshold (pixels). Passive listener, SSR-safe.
 * FR: useScrolled — retourne true dès que la page a dépassé le seuil de
 *     scroll donné (pixels). Listener passif, sûr pour le SSR.
 */

import { useEffect, useState } from "react";

export function useScrolled(threshold = 400): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // EN: Update on every scroll event (passive = no scroll jank)
    // FR: Mise à jour à chaque événement de scroll (passif = pas de saccade)
    const update = () => setIsScrolled(window.scrollY > threshold);
    // EN: Set the initial state on mount (e.g. page restored mid-scroll)
    // FR: Pose l'état initial au montage (ex. page restaurée en cours de scroll)
    update();
    window.addEventListener("scroll", update, { passive: true });
    // EN: Cleanup on unmount · FR: Nettoyage au démontage
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return isScrolled;
}
