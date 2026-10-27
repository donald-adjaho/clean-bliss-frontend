"use client";

/**
 * EN: Header search bar (Header Section 2, Bloc C) — 48px pill input with
 *     left Search icon and an animated placeholder: fixed "Rechercher votre"
 *     + rotating word every 3 s with a slow fade.
 *     Specs: GUIDE.md A.1.2 Bloc C. Live search panel is a SEPARATE task.
 * FR: Barre de recherche du Header (Section 2, Bloc C) — input pilule 48px
 *     avec icône Search à gauche et placeholder animé : « Rechercher votre »
 *     fixe + mot rotatif toutes les 3 s avec fondu lent.
 *     Specs : GUIDE.md A.1.2 Bloc C. Le panneau de live search est une
 *     TÂCHE SÉPARÉE.
 */

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** EN: Rotating placeholder words (GUIDE.md A.1.3) · FR: Mots rotatifs du placeholder (GUIDE.md A.1.3) */
const ROTATING_WORDS = [
  "votre fragrance",
  "vos produits de nettoyage",
  "vos bougies",
  "vos senteurs maison",
] as const;

/** EN: Rotation interval — 3 s per GUIDE.md A.1.2 · FR: Intervalle de rotation — 3 s selon GUIDE.md A.1.2 */
const ROTATION_INTERVAL_MS = 3000;

export function SearchBar({ className }: { className?: string }) {
  // EN: Current value — the animated placeholder hides as soon as the user types
  // FR: Valeur courante — le placeholder animé disparaît dès que l'utilisateur tape
  const [value, setValue] = useState("");
  // EN: Index of the currently displayed rotating word
  // FR: Index du mot rotatif actuellement affiché
  const [wordIndex, setWordIndex] = useState(0);

  // EN: Cycle the rotating word every 3 s (GUIDE.md A.1.2)
  // FR: Fait tourner le mot rotatif toutes les 3 s (GUIDE.md A.1.2)
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((index) => (index + 1) % ROTATING_WORDS.length);
    }, ROTATION_INTERVAL_MS);
    // EN: Clear the interval on unmount · FR: Nettoie l'intervalle au démontage
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        // EN: 48px pill — 1px default border, surface background; on focus-within:
        //     2px action-primary border + focus ring (GUIDE.md A.1.2 Bloc C)
        // FR: Pilule 48px — bordure 1px default, fond surface ; au focus-within :
        //     bordure 2px action-primary + anneau focus (GUIDE.md A.1.2 Bloc C)
        "relative flex h-12 w-full items-center gap-[var(--space-sm)] rounded-full",
        "border border-border-default bg-bg-surface px-[var(--space-md)]",
        "transition-[border-color,box-shadow] duration-fast ease-out",
        "focus-within:border-2 focus-within:border-action-primary focus-within:ring-2 focus-within:ring-focus-ring",
        className,
      )}
    >
      {/* EN: Search icon — 18px, muted (GUIDE.md A.1.2 Bloc C)
          FR: Icône Search — 18px, atténuée (GUIDE.md A.1.2 Bloc C) */}
      <Search aria-hidden="true" className="size-[18px] shrink-0 text-text-muted" />

      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Rechercher un produit"
        className={cn(
          // EN: Transparent input — the visual pill comes from the wrapper
          // FR: Input transparent — la pilule visuelle vient du conteneur
          "h-full w-full bg-transparent text-body-l text-text-primary",
          "outline-none placeholder:text-transparent",
          // EN: Hide the native search cancel button (visual noise in the pill)
          // FR: Masque le bouton d'annulation natif (bruit visuel dans la pilule)
          "[&::-webkit-search-cancel-button]:hidden",
        )}
      />

      {/* EN: Animated placeholder — only while the field is empty; the word fades
          in on each rotation (key change restarts the fade animation)
          FR: Placeholder animé — uniquement quand le champ est vide ; le mot
          apparaît en fondu à chaque rotation (le changement de key relance le fondu) */}
      {value === "" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[calc(var(--space-md)+26px)] flex items-center gap-1 text-body-l text-text-muted"
        >
          <span>Rechercher </span>
          <span key={wordIndex} className="animate-fade-in">
            {ROTATING_WORDS[wordIndex]}
          </span>
        </span>
      )}
    </div>
  );
}
