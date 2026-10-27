"use client";

/**
 * EN: Accordion built on @radix-ui/react-accordion — used for the FAQ
 *     sections (home §11, product FAQ). White item, 1px neutral-100 border,
 *     radius-md, padding 24/32, question 18px medium with Plus/Minus icon,
 *     answer 16px secondary. Open/close animates via grid-template-rows
 *     0fr → 1fr (ANIMATIONS.md § 3.6).
 *     Specs: GUIDE.md B.1 §11 (FAQ) + ANIMATIONS.md § 3.6. Tokens only.
 * FR: Accordéon basé sur @radix-ui/react-accordion — utilisé pour les FAQ
 *     (accueil §11, FAQ produit). Item blanc, bordure 1px neutral-100,
 *     radius-md, padding 24/32, question 18px medium avec icône Plus/Minus,
 *     réponse 16px secondary. L'ouverture s'anime via grid-template-rows
 *     0fr → 1fr (ANIMATIONS.md § 3.6).
 *     Specs : GUIDE.md B.1 §11 (FAQ) + ANIMATIONS.md § 3.6. Tokens uniquement.
 *
 * EN: "use client" required — Radix primitives are client-side interactive.
 * FR: "use client" requis — les primitives Radix sont interactives côté client.
 */

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

/** EN: One FAQ entry — id is used as the Radix value (open state)
    FR: Une entrée de FAQ — l'id sert de valeur Radix (état ouvert) */
export interface AccordionItemData {
  /** EN: Unique id of the item · FR: Id unique de l'item */
  id: string;
  /** EN: Question displayed in the trigger · FR: Question affichée dans le déclencheur */
  question: string;
  /** EN: Answer displayed in the collapsible content · FR: Réponse affichée dans le contenu dépliable */
  answer: React.ReactNode;
}

/** EN: Accordion props — items mandatory, defaultOpen optional (open items on mount)
    FR: Props de l'accordéon — items obligatoires, defaultOpen optionnel (items ouverts au montage) */
export interface AccordionProps {
  /** EN: FAQ entries · FR: Entrées de FAQ */
  items: AccordionItemData[];
  /** EN: Id (or ids) of item(s) open on first render · FR: Id (ou ids) des items ouverts au premier rendu */
  defaultOpen?: string | string[];
  /** EN: Extra classes for the root list · FR: Classes additionnelles pour la liste racine */
  className?: string;
}

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  // EN: type="multiple" allows several FAQ entries open at once
  // FR: type="multiple" permet d'ouvrir plusieurs entrées de FAQ en même temps
  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={Array.isArray(defaultOpen) ? defaultOpen : defaultOpen ? [defaultOpen] : undefined}
      className={cn("flex w-full flex-col gap-[var(--space-md)]", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className={cn(
            // EN: Item container — white surface, 1px neutral-100 border, radius-md,
            //     padding 24px vertical / 32px horizontal (GUIDE.md B.1 §11)
            // FR: Conteneur d'item — fond blanc, bordure 1px neutral-100, radius-md,
            //     padding 24px vertical / 32px horizontal (GUIDE.md B.1 §11)
            "rounded-md border border-neutral-100 bg-bg-surface",
            "px-[var(--space-2xl)] py-[var(--space-xl)]",
            "transition-colors duration-fast ease-out",
            "data-[state=open]:border-border-default",
          )}
        >
          <AccordionPrimitive.Header asChild>
            <h3>
              {/* EN: Trigger — question 18px medium + Plus/Minus icon 22px.
                  The visible question text is the accessible name (rule 4.6).
                  FR: Déclencheur — question 18px medium + icône Plus/Minus 22px.
                  Le texte visible de la question est le nom accessible (règle 4.6). */}
              <AccordionPrimitive.Trigger
                className={cn(
                  "group/trigger flex w-full cursor-pointer items-center justify-between gap-[var(--space-lg)]",
                  "text-left text-body-xl font-medium text-text-primary",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                )}
              >
                {item.question}

                {/* EN: Plus icon when closed / Minus when open (GUIDE.md B.1 §11) —
                    the data-state lives on the Radix Trigger, targeted via the named group
                    FR: Icône Plus quand fermé / Minus quand ouvert (GUIDE.md B.1 §11) —
                    le data-state est porté par le Trigger Radix, ciblé via le groupe nommé */}
                <span
                  aria-hidden="true"
                  className="inline-flex size-[22px] shrink-0 text-action-primary"
                >
                  <IconPlus stroke={2} className="size-full group-data-[state=open]/trigger:hidden" />
                  <IconMinus stroke={2} className="hidden size-full group-data-[state=open]/trigger:block" />
                </span>
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content
            className={cn(
              // EN: Collapsible content — hidden state collapses the grid row to 0fr
              // FR: Contenu dépliable — l'état fermé réduit la ligne de grille à 0fr
              "overflow-hidden text-body-l text-text-secondary",
              "group",
            )}
          >
            {/* EN: 0fr → 1fr grid animation (ANIMATIONS.md § 3.6) — the row grows
                smoothly when the parent data-state becomes "open"
                FR: Animation 0fr → 1fr (ANIMATIONS.md § 3.6) — la ligne grandit
                en douceur quand le data-state du parent passe à « open » */}
            <div
              className={cn(
                "grid grid-rows-[0fr] transition-[grid-template-rows] duration-slow ease-in-out",
                "group-data-[state=open]:grid-rows-[1fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pt-[var(--space-lg)]">{item.answer}</div>
              </div>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
