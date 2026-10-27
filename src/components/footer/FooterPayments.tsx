/**
 * EN: Footer payment badges (Server Component) — "Modes de paiement acceptés"
 *     title + 3 pills (MTN Mobile Money, Moov Money, Espèces). Renders the
 *     WordPress badge image when available, otherwise a text fallback so the
 *     footer never breaks.
 *     Specs: GUIDE.md A.2.2 (colonne 4) + A.2.4 (données).
 * FR: Badges de paiement du footer (Server Component) — titre « Modes de
 *     paiement acceptés » + 3 pastilles (MTN Mobile Money, Moov Money,
 *     Espèces). Affiche l'image WordPress quand elle existe, sinon un repli
 *     texte pour ne jamais casser le footer.
 *     Specs : GUIDE.md A.2.2 (colonne 4) + A.2.4 (données).
 */

import Image from "next/image";

import type { PaymentBadge } from "@/components/footer/Footer";
import { cn } from "@/lib/cn";

/* EN: Shared pill style — 1px footer-border, transparent background, radius-sm
   FR: Style de pastille partagé — bordure 1px footer-border, fond transparent,
   radius-sm */
const pillClasses =
  "inline-flex items-center justify-center rounded-sm border border-footer-border px-[var(--space-sm)] py-[var(--space-xs)]";

export function FooterPayments({ payments }: { payments: PaymentBadge[] }) {
  return (
    <div>
      {/* EN: Title — body-s, footer-link color, uppercase
          FR: Titre — body-s, couleur footer-link, majuscules */}
      <h3 className="text-body-s uppercase tracking-[0.05em] text-footer-link">
        Modes de paiement acceptés
      </h3>

      {/* EN: 3 badges — 10px gap (GUIDE.md A.2.2)
          FR: 3 badges — gap 10px (GUIDE.md A.2.2) */}
      <ul className="mt-[var(--space-md)] flex flex-wrap items-center gap-[var(--space-sm)]">
        {payments.map((payment) => (
          <li key={payment.label} className={pillClasses}>
            {payment.sourceUrl ? (
              // EN: Badge image — 24×24 square box, object-contain keeps ratio
              // FR: Image du badge — boîte carrée 24×24, object-contain garde le ratio
              <Image
                src={payment.sourceUrl}
                alt={payment.altText || payment.label}
                width={50}
                height={50}
                className="object-contain"
              />
            ) : (
              // EN: Text fallback — white label when no image is configured
              // FR: Repli texte — libellé blanc quand aucune image n'est configurée
              <span className={cn("text-body-s text-base-white")}>{payment.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
