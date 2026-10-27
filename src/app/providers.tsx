"use client";

/**
 * EN: Shared client providers — wraps client-side global providers
 *     (toasts today; Zustand stores, Apollo, auth… later).
 * FR: Providers clients partagés — enveloppe les providers globaux
 *     côté client (toasts aujourd'hui ; stores Zustand, Apollo, auth…
 *     plus tard).
 */

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

/**
 * EN: Returns the toast position depending on viewport width:
 *     top-center on mobile, bottom-right on desktop.
 * FR: Retourne la position des toasts selon la largeur d'écran :
 *     top-center sur mobile, bottom-right sur desktop.
 */
function useToastPosition(): "top-center" | "bottom-right" {
  // EN: Safe initial value for SSR (matches mobile-first default)
  // FR: Valeur initiale sûre pour le SSR (correspond au défaut mobile-first)
  const [isDesktop, setIsDesktop] = useState(false);

  // EN: Listen to the 768px breakpoint (Tailwind md) to switch position
  // FR: Écoute le breakpoint 768px (Tailwind md) pour changer la position
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    // EN: Cleanup the listener on unmount
    // FR: Nettoie le listener au démontage
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop ? "bottom-right" : "top-center";
}

export function Providers({ children }: { children: React.ReactNode }) {
  const toastPosition = useToastPosition();

  return (
    <>
      {children}
      <Toaster
        position={toastPosition}
        toastOptions={{
          // EN: Use design tokens so toasts match the brand
          // FR: Utilise les tokens de design pour que les toasts suivent la marque
          style: {
            background: "var(--color-bg-surface)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-sm)",
          },
        }}
      />
    </>
  );
}
