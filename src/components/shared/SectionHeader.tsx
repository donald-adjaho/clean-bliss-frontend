/**
 * EN: SectionHeader — shared heading block for homepage sections (eyebrow +
 *     serif title + optional description + optional right-side action link).
 *     GUIDE.md § B.1. Tokens only.
 * FR: SectionHeader — bloc de titre partagé pour les sections de l'accueil
 *     (sur-titre + titre serif + description optionnelle + lien d'action à
 *     droite optionnel). GUIDE.md § B.1. Tokens uniquement.
 *
 * EN: No "use client" — presentational. `action` is passed as a server node.
 * FR: Pas de "use client" — présentationnel. `action` est passé comme nœud serveur.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** EN: Small uppercase label above the title · FR: Petit libellé en majuscules au-dessus du titre */
  eyebrow?: string;
  /** EN: Section title (h2) · FR: Titre de la section (h2) */
  title: string;
  /** EN: Optional supporting paragraph · FR: Paragraphe d'accompagnement optionnel */
  description?: string;
  /** EN: "left" = title left / action right (md+); "center" = centered stack */
  /** FR: « left » = titre à gauche / action à droite (md+) ; « center » = pile centrée */
  align?: "left" | "center";
  /** EN: Optional action node (e.g. "Voir tout" link) · FR: Nœud d'action optionnel (ex. lien « Voir tout ») */
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  action,
  className,
}: SectionHeaderProps) {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-xl)]",
        // EN: On md+, a left-aligned header puts the action on the same line
        // FR: À partir de md, un en-tête aligné à gauche place l'action sur la même ligne
        isLeft && "md:flex-row md:items-end md:justify-between",
        !isLeft && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-[var(--space-md)]",
          !isLeft && "items-center",
        )}
      >
        {eyebrow && (
          <span className="text-body-m font-semibold uppercase tracking-[0.12em] text-action-primary">
            {eyebrow}
          </span>
        )}

        <h2 className="text-h3 text-text-primary xl:text-h2">{title}</h2>

        {description && (
          <p className={cn("text-body-l text-text-muted", !isLeft && "max-w-[640px]")}>
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
