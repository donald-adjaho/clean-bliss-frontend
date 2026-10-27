"use client";

/**
 * EN: RadioGroup built on @radix-ui/react-radio-group — mutually exclusive
 *     choices (shop category filter, delivery method, active address…).
 *     20px circle, 1.5px border, brand-primary ring + center dot when
 *     selected, label to the right, optional count.
 *     Specs: DESIGN.md § 5 (Radio Button) + GUIDE.md B.2 (filtres). Tokens only.
 * FR: RadioGroup basé sur @radix-ui/react-radio-group — choix mutuellement
 *     exclusifs (filtre catégories boutique, méthode de livraison,
 *     adresse active…). Cercle 20px, bordure 1.5px, anneau brand-primary +
 *     point central quand sélectionné, label à droite, compteur optionnel.
 *     Specs : DESIGN.md § 5 (Radio Button) + GUIDE.md B.2 (filtres). Tokens uniquement.
 *
 * EN: "use client" required — Radix primitives are client-side interactive.
 * FR: "use client" requis — les primitives Radix sont interactives côté client.
 */

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useId } from "react";
import { cn } from "@/lib/cn";

/** EN: One selectable option of the group
    FR: Une option sélectionnable du groupe */
export interface RadioOption {
  /** EN: Value submitted to the parent state · FR: Valeur transmise à l'état parent */
  value: string;
  /** EN: Visible label · FR: Label visible */
  label: string;
  /** EN: Optional product count, right-aligned muted · FR: Compteur optionnel, aligné à droite en atténué */
  count?: number;
  /** EN: Option cannot be selected · FR: L'option ne peut pas être sélectionnée */
  disabled?: boolean;
}

/** EN: RadioGroup props — controlled (value + onValueChange), options mandatory
    FR: Props du RadioGroup — contrôlé (value + onValueChange), options obligatoires */
export interface RadioGroupProps {
  /** EN: Currently selected value · FR: Valeur actuellement sélectionnée */
  value: string;
  /** EN: Called with the newly selected value · FR: Appelé avec la nouvelle valeur sélectionnée */
  onValueChange: (value: string) => void;
  /** EN: List of selectable options · FR: Liste des options sélectionnables */
  options: RadioOption[];
  /** EN: Visible group label (accessibility + design rule 4.6)
      FR: Label visible du groupe (accessibilité + règle design 4.6) */
  label?: string;
  /** EN: Label text size — sm = 14px (shop filters, GUIDE.md B.2) · md = 16px (default, DESIGN.md § 5)
      FR: Taille du texte du label — sm = 14px (filtres boutique, GUIDE.md B.2) · md = 16px (défaut, DESIGN.md § 5) */
  size?: "sm" | "md";
  /** EN: Vertical gap between options (10px by default, GUIDE.md B.2)
      FR: Gap vertical entre les options (10px par défaut, GUIDE.md B.2) */
  className?: string;
}

export function RadioGroup({
  value,
  onValueChange,
  options,
  label,
  size = "md",
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      aria-label={label}
      className={cn("flex w-full flex-col gap-[var(--space-sm)]", className)}
    >
      {options.map((option) => (
        <RadioGroupItem key={option.value} option={option} size={size} />
      ))}
    </RadioGroupPrimitive.Root>
  );
}

/* EN: Single row — item circle + label + optional count
   FR: Ligne unique — cercle du radio + label + compteur optionnel */
function RadioGroupItem({ option, size }: { option: RadioOption; size: "sm" | "md" }) {
  // EN: Per-instance id (useId) so several RadioGroups can coexist (the shop
  //     renders the filters both in the desktop sidebar and the mobile drawer)
  //     without colliding `htmlFor`/`id` pairs.
  // FR: Id par instance (useId) pour que plusieurs RadioGroups coexistent (la
  //     boutique rend les filtres à la fois dans la barre latérale desktop et le
  //     tiroir mobile) sans collision de paires `htmlFor`/`id`.
  const itemId = useId();

  return (
    <div
      className={cn(
        "flex w-full items-center gap-[var(--space-md)]",
        option.disabled && "opacity-45",
      )}
    >
      <RadioGroupPrimitive.Item
        id={itemId}
        value={option.value}
        disabled={option.disabled}
        className={cn(
          // EN: 20px circle, 1.5px default border, white surface (DESIGN.md § 5)
          // FR: Cercle 20px, bordure 1.5px default, fond blanc (DESIGN.md § 5)
          "relative flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full",
          "border-[1.5px] border-border-default bg-bg-surface",
          "transition-colors duration-fast ease-out",
          // EN: Focus ring per a11y rule 4.6
          // FR: Anneau de focus selon la règle a11y 4.6
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          "data-[state=checked]:border-brand-primary",
          option.disabled && "cursor-not-allowed",
        )}
      >
        {/* EN: Selected indicator — brand-primary center dot (DESIGN.md § 5)
            FR: Indicateur de sélection — point central brand-primary (DESIGN.md § 5) */}
        <RadioGroupPrimitive.Indicator
          className={cn(
            "flex size-full items-center justify-center rounded-full",
            "after:block after:size-2.5 after:rounded-full after:bg-brand-primary",
          )}
        />
      </RadioGroupPrimitive.Item>

      {/* EN: Label — body-l (16px) or body-m (14px, filters), to the right of the control, 12px gap
          FR: Label — body-l (16px) ou body-m (14px, filtres), à droite du contrôle, gap 12px */}
      <label
        htmlFor={itemId}
        className={cn(
          "cursor-pointer text-text-primary",
          size === "sm" ? "text-body-m" : "text-body-l",
          option.disabled && "cursor-not-allowed",
        )}
      >
        {option.label}
      </label>

      {/* EN: Product count — 12px muted, pushed to the far right (GUIDE.md B.2)
          FR: Compteur de produits — 12px atténué, poussé à l'extrême droite (GUIDE.md B.2) */}
      {typeof option.count === "number" && (
        <span className="ml-auto text-body-s text-text-muted">{option.count}</span>
      )}
    </div>
  );
}
