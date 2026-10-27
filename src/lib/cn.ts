/**
 * EN: Class name helper — merges Tailwind classes and resolves conflicts
 *     (clsx + tailwind-merge), shared by all UI components.
 * FR: Aide aux noms de classes — fusionne les classes Tailwind et résout
 *     les conflits (clsx + tailwind-merge), partagé par tous les composants UI.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* EN: Design-token text sizes (globals.css @theme) that tailwind-merge
 *     misclassifies: a class like `text-action-primary` is read as a font-size
 *     (not a color) because its value is not a Tailwind color name, so it
 *     conflicts with the real size token and tailwind-merge drops it.
 *     We re-append these tokens after merging so the size survives; size and
 *     color are different CSS properties so both classes can coexist safely.
 * FR: Tailles de texte par tokens (globals.css @theme) mal classées par
 *     tailwind-merge : une classe comme `text-action-primary` est lue comme
 *     une taille (pas une couleur) car sa valeur n'est pas un nom de couleur
 *     Tailwind, elle entre donc en conflit avec le vrai token de taille et
 *     tailwind-merge le supprime. On ré-ajoute ces tokens après fusion pour
 *     conserver la taille ; taille et couleur étant des propriétés CSS
 *     distinctes, les deux classes coexistent sans danger. */
const SIZE_TOKENS = [
  "text-h1",
  "text-h2",
  "text-h3",
  "text-h4",
  "text-h5",
  "text-h6",
  "text-body-2xs",
  "text-body-xs",
  "text-body-sm",
  "text-body-s",
  "text-body-m",
  "text-body-md",
  "text-body-l",
  "text-body-lg",
  "text-body-xl",
  "text-display-md",
  "text-display-lg",
  "text-display-xl",
];

export function cn(...inputs: ClassValue[]) {
  const flat = clsx(inputs);
  const merged = twMerge(flat);

  const mergedSet = new Set(merged.split(" ").filter(Boolean));
  const sizes = flat
    .split(" ")
    .filter((c): c is string => SIZE_TOKENS.includes(c));

  /* EN: If twMerge already kept a size token it deliberately resolved the size
   *     group (a later class overrode an earlier one) — trust it. Otherwise we
   *     re-append all input size tokens that were wrongly dropped.
   * FR: Si tailwind-merge a déjà conservé un token de taille, il a résolu le
   *     groupe taille (une classe ultérieure a primé) — on lui fait confiance.
   *     Sinon on ré-ajoute les tokens de taille d'entrée injustement supprimés. */
  const keptAnySize = sizes.some((s) => mergedSet.has(s));

  const final = keptAnySize
    ? merged.split(" ")
    : Array.from(new Set([...merged.split(" "), ...sizes]));

  return final.filter(Boolean).join(" ");
}
