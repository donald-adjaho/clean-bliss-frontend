"use client";

/**
 * EN: useReducedMotion — reports whether the user asked to reduce motion
 *     (prefers-reduced-motion: reduce). Reusable by every animated component
 *     so animations can be skipped (ANIMATIONS.md § "Réduit").
 * FR: useReducedMotion — indique si l'utilisateur a demandé à réduire les
 *     animations (prefers-reduced-motion: reduce). Réutilisable par tout
 *     composant animé pour pouvoir sauter les animations (ANIMATIONS.md § « Réduit »).
 */

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  // EN: Default false on the server; corrected on mount (avoids SSR mismatch)
  // FR: false par défaut côté serveur ; corrigé au montage (évite un écart SSR)
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersReduced;
}
