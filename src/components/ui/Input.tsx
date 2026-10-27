"use client";

/**
 * EN: Base Input component — label always visible above the field (never
 *     placeholder-only), optional left/right icons, error and hint messages.
 *     Specs: DESIGN.md § 5. Tokens only (globals.css).
 * FR: Composant Input de base — label toujours visible au-dessus du champ
 *     (jamais uniquement en placeholder), icônes gauche/droite optionnelles,
 *     messages d'erreur et d'aide. Specs : DESIGN.md § 5. Tokens uniquement.
 *
 * EN: "use client" required — React.useId() generates a stable id to wire
 *     <label htmlFor> with the <input> for accessibility.
 * FR: "use client" requis — React.useId() génère un id stable pour lier
 *     <label htmlFor> et l'<input> (accessibilité).
 */

import { useId } from "react";
import { cn } from "@/lib/cn";

/** EN: Input props — extends native input attributes, adds label/error/hint/icons
    FR: Props de l'input — étend les attributs natifs, ajoute label/error/hint/icônes */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** EN: Visible label rendered above the field · FR: Label visible affiché au-dessus du champ */
  label: string;
  /** EN: Optional id override (auto-generated via useId when omitted)
      FR: Id optionnel (généré automatiquement via useId si omis) */
  id?: string;
  /** EN: Error message — displays in danger color, aria-invalid is set
      FR: Message d'erreur — affiché en couleur danger, aria-invalid est posé */
  error?: string;
  /** EN: Helper text shown below the field (hidden if an error is present)
      FR: Texte d'aide sous le champ (masqué si une erreur est présente) */
  hint?: string;
  /** EN: Icon displayed at the left edge of the field · FR: Icône affichée à gauche du champ */
  leftIcon?: React.ReactNode;
  /** EN: Icon displayed at the right edge of the field · FR: Icône affichée à droite du champ */
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...rest
}: InputProps) {
  // EN: Stable unique id shared by label, input and described-by messages
  // FR: Id unique stable partagé par le label, l'input et les messages described-by
  const generatedId = useId();
  const inputId = rest.id ?? generatedId;
  // EN: aria-describedby points to error first, then hint
  // FR: aria-describedby pointe vers l'erreur d'abord, puis l'aide
  const messageId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex w-full flex-col gap-[var(--space-xs)]">
      {/* EN: Label — always visible above the field, body-m medium (14px)
          FR: Label — toujours visible au-dessus du champ, body-m medium (14px) */}
      <label
        htmlFor={inputId}
        className="text-body-m font-medium text-text-primary"
      >
        {label}
      </label>

      {/* EN: Field wrapper — relative so the icons can be absolutely positioned
          FR: Conteneur du champ — relatif pour positionner les icônes en absolu */}
      <div className="relative flex w-full items-center">
        {/* EN: Left icon — decorative, vertically centered
            FR: Icône gauche — décorative, centrée verticalement */}
        {leftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[var(--space-md)] inline-flex text-text-muted"
          >
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          disabled={disabled}
          className={cn(
            // EN: Base field — radius-md, vertical 12px / horizontal 16px padding,
            //     16px/24px text, subtle transition of border + ring
            // FR: Champ de base — radius-md, padding vertical 12px / horizontal 16px,
            //     texte 16px/24px, transition subtile de bordure + anneau
            "h-12 w-full rounded-md border bg-bg-surface px-[var(--space-md)] py-[var(--space-lg)]",
            "text-body-l text-text-primary placeholder:text-text-muted",
            "transition-[border-color,box-shadow] duration-fast ease-out",
            // EN: Focus — 2px strong border + focus ring per DESIGN.md § 5
            // FR: Focus — bordure 2px strong + anneau focus selon DESIGN.md § 5
            "focus:outline-none focus:border-2 focus:border-border-strong focus:ring-2 focus:ring-focus-ring",
            // EN: Default state — 1px default border (Filled keeps the same border)
            // FR: État par défaut — bordure 1px default (l'état Filled garde la même bordure)
            !error && "border-border-default",
            // EN: Error state — danger border (overrides default/focus colors)
            // FR: État erreur — bordure danger (priorité sur les couleurs par défaut/focus)
            error && "border-danger focus:border-danger focus:ring-danger",
            // EN: Disabled — reduced opacity, muted text
            // FR: Désactivé — opacité réduite, texte atténué
            disabled && "opacity-45 cursor-not-allowed",
            // EN: Space reserved for the optional icons
            // FR: Espace réservé aux icônes optionnelles
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className,
          )}
          {...rest}
        />

        {/* EN: Right icon — decorative, vertically centered
            FR: Icône droite — décorative, centrée verticalement */}
        {rightIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[var(--space-md)] inline-flex text-text-muted"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* EN: Error message wins over the hint (only one is displayed)
          FR: Le message d'erreur prime sur l'aide (un seul est affiché) */}
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="text-body-m text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-body-m text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
