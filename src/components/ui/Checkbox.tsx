"use client";

/**
 * EN: Base Checkbox component — 20px square (--radius-sm), 1.5px border,
 *     filled with a check when selected. Label to the right, optional
 *     product count (shop filters, GUIDE.md B.2).
 *     Specs: DESIGN.md § 5 (Checkbox) + GUIDE.md B.2 (filtres). Tokens only.
 * FR: Composant Checkbox de base — carré 20px (--radius-sm), bordure 1.5px,
 *     rempli d'une coche quand sélectionné. Label à droite, compteur
 *     de produits optionnel (filtres boutique, GUIDE.md B.2).
 *     Specs : DESIGN.md § 5 (Checkbox) + GUIDE.md B.2 (filtres). Tokens uniquement.
 *
 * EN: "use client" required — controlled component with an onChange handler.
 * FR: "use client" requis — composant contrôlé avec un gestionnaire onChange.
 */

import { IconCheck } from "@tabler/icons-react";
import { useId } from "react";
import { cn } from "@/lib/cn";

/** EN: Checkbox props — controlled (checked + onChange), label mandatory
    FR: Props de la checkbox — contrôlée (checked + onChange), label obligatoire */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "onChange" | "type" | "size"> {
  /** EN: Visible label rendered to the right of the control
      FR: Label visible affiché à droite du contrôle */
  label: string;
  /** EN: Controlled checked state · FR: État coché contrôlé */
  checked: boolean;
  /** EN: Change handler receiving the new checked state
      FR: Gestionnaire de changement recevant le nouvel état coché */
  onChange: (checked: boolean) => void;
  /** EN: Optional product count, right-aligned muted (shop filters)
      FR: Compteur de produits optionnel, aligné à droite en atténué (filtres boutique) */
  count?: number;
  /** EN: Label text size — sm = 14px (shop filters, GUIDE.md B.2) · md = 16px (default, DESIGN.md § 5)
      FR: Taille du texte du label — sm = 14px (filtres boutique, GUIDE.md B.2) · md = 16px (défaut, DESIGN.md § 5) */
  size?: "sm" | "md";
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  count,
  size = "md",
  className,
  ...rest
}: CheckboxProps) {
  // EN: Stable unique id to wire <label htmlFor> with the <input>
  // FR: Id unique stable pour lier <label htmlFor> et l'<input>
  const id = useId();

  return (
    <div className={cn("flex w-full items-center gap-[var(--space-md)]", className)}>
      {/* EN: Native checkbox visually hidden but kept for a11y + keyboard
          FR: Checkbox native masquée visuellement mais conservée pour l'a11y + clavier */}
      <label
        htmlFor={id}
        className={cn(
          "group inline-flex shrink-0 cursor-pointer items-center gap-[var(--space-md)]",
          disabled && "cursor-not-allowed opacity-45",
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
          {...rest}
        />

        {/* EN: Visual box — 20px square, 1.5px border, radius-sm; filled + check
            when selected (peer-checked). Focus ring via peer-focus-visible.
            FR: Carré visuel — 20px, bordure 1.5px, radius-sm ; rempli + coche
            quand sélectionné (peer-checked). Anneau de focus via peer-focus-visible. */}
        <span
          aria-hidden="true"
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-sm",
            "border-[1.5px] border-border-default bg-bg-surface",
            "transition-colors duration-fast ease-out",
            "peer-checked:border-action-primary peer-checked:bg-action-primary",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring",
          )}
        >
          {/* EN: Check icon — on-primary color, hidden until checked
              FR: Icône de coche — couleur on-primary, masquée tant que non cochée */}
          <IconCheck
            stroke={3}
            className={cn(
              "size-3.5 text-action-on-primary transition-opacity duration-fast",
              checked ? "opacity-100" : "opacity-0",
            )}
          />
        </span>

        {/* EN: Label — body-l (16px) or body-m (14px, filters) to the right of the control
            FR: Label — body-l (16px) ou body-m (14px, filtres) à droite du contrôle */}
        <span className={cn(size === "sm" ? "text-body-m" : "text-body-l", "text-text-primary")}>
          {label}
        </span>
      </label>

      {/* EN: Product count — 12px muted, pushed to the far right (GUIDE.md B.2)
          FR: Compteur de produits — 12px atténué, poussé à l'extrême droite (GUIDE.md B.2) */}
      {typeof count === "number" && (
        <span className="ml-auto text-body-s text-text-muted">{count}</span>
      )}
    </div>
  );
}
