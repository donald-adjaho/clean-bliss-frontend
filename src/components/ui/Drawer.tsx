"use client";

/**
 * EN: Drawer — right-side sliding panel built on @radix-ui/react-dialog
 *     (mobile/tablet shop filters per GUIDE.md B.2.6). Overlay + panel
 *     translate in from the right (ANIMATIONS.md §3.8). Radix handles focus
 *     trap, escape and scroll lock; we only own the styling.
 * FR: Drawer — panneau glissant depuis la droite basé sur
 *     @radix-ui/react-dialog (filtres boutique mobile/tablette, GUIDE.md B.2.6).
 *     Overlay + panneau glissent depuis la droite (ANIMATIONS.md §3.8). Radix
 *     gère le piège de focus, Échap et le verrouillage du scroll ; on ne gère
 *     que le style.
 *
 * EN: "use client" required — Radix primitives are client-side interactive.
 * FR: "use client" requis — les primitives Radix sont interactives côté client.
 */

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DrawerProps {
  /** EN: Controlled open state · FR: État d'ouverture contrôlé */
  open: boolean;
  /** EN: Open-state change handler · FR: Gestionnaire de changement d'état */
  onOpenChange: (open: boolean) => void;
  /** EN: Accessible title (rendered in the panel header) · FR: Titre accessible (affiché dans l'en-tête du panneau) */
  title: string;
  /** EN: Panel content · FR: Contenu du panneau */
  children: ReactNode;
}

export function Drawer({ open, onOpenChange, title, children }: DrawerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* EN: Overlay — dimmed page behind the panel (token colour + alpha)
            FR: Overlay — page assombrie derrière le panneau (couleur token + alpha) */}
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-text-primary/40",
            "transition-opacity duration-[var(--duration-base)] ease-out",
            "data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
            "motion-reduce:transition-none",
          )}
        />

        {/* EN: Panel — slides in from the right edge
            FR: Panneau — glisse depuis le bord droit */}
        <DialogPrimitive.Content
          // EN: No description block — opt out explicitly to avoid the Radix a11y warning
          // FR: Pas de bloc description — désactivation explicite pour éviter l'avertissement a11y de Radix
          aria-describedby={undefined}
          className={cn(
            "fixed right-0 top-0 z-50 flex h-full w-[min(360px,90vw)] flex-col gap-[var(--space-xl)]",
            "overflow-y-auto bg-base-white p-[var(--space-xl)] shadow-card-hover",
            "transition-transform duration-[var(--duration-base)] ease-out",
            "data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
            "motion-reduce:transition-none",
            "focus:outline-none",
          )}
        >
          {/* EN: Header — title + close button · FR: En-tête — titre + bouton de fermeture */}
          <div className="flex items-center justify-between gap-[var(--space-md)]">
            <DialogPrimitive.Title className="text-body-l font-semibold text-text-primary">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Fermer les filtres"
              className={cn(
                "inline-flex size-11 shrink-0 items-center justify-center rounded-full",
                "text-text-primary transition-colors duration-[var(--duration-fast)] ease-out hover:text-action-primary",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
              )}
            >
              <IconX aria-hidden="true" className="size-5" />
            </DialogPrimitive.Close>
          </div>

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
