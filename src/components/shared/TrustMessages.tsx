/**
 * EN: TrustMessages — single source of truth for the two scrolling trust bands
 *     (Header announcement bar and homepage §6). Sharing the messages and the
 *     item markup guarantees both marquees stay visually identical
 *     (GUIDE.md A.1.2 + B.1 §6).
 * FR: TrustMessages — source unique pour les deux bandeaux de confiance défilants
 *     (bandeau d'annonce du Header et §6 de l'accueil). Partager les messages et
 *     le balisage de l'item garantit que les deux marquees restent visuellement
 *     identiques (GUIDE.md A.1.2 + B.1 §6).
 *
 * EN: Server Component — static data + icons, no interaction.
 * FR: Server Component — données statiques + icônes, aucune interaction.
 */

import type { ReactNode } from "react";
import {
  IconBuildingStore,
  IconCreditCard,
  IconShieldCheck,
  IconTruck,
} from "@tabler/icons-react";

/** EN: The 4 trust messages (GUIDE.md A.1.3) · FR: Les 4 messages de confiance (GUIDE.md A.1.3) */
export const TRUST_MESSAGES: { icon: ReactNode; text: string }[] = [
  { icon: <IconTruck className="size-4" />, text: "Livraison rapide à Cotonou, Calavi & Akpakpa" },
  { icon: <IconBuildingStore className="size-4" />, text: "Retrait gratuit en boutique" },
  { icon: <IconCreditCard className="size-4" />, text: "Paiement MoMo & paiement à la livraison" },
  { icon: <IconShieldCheck className="size-4" />, text: "100 % parfums originaux & authentiques" },
];

/**
 * EN: One marquee item — 40px bar, 12px uppercase text, wide tracking (0.1em),
 *     16px accent icon and horizontal padding (which also creates the spacing at
 *     the loop seam, so no track `gap` is needed).
 * FR: Un item de marquee — bandeau 40px, texte 12px uppercase, tracking large
 *     (0.1em), icône accent 16px et padding horizontal (qui crée aussi l'espace
 *     au raccord de la boucle, donc aucune `gap` de piste n'est nécessaire).
 */
export function TrustMessage({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex h-10 items-center gap-[var(--space-sm)] px-[var(--space-xl)] text-body-s uppercase tracking-[0.1em] text-base-white/90">
      <span className="shrink-0 text-brand-accent" aria-hidden="true">
        {icon}
      </span>
      {text}
    </span>
  );
}
