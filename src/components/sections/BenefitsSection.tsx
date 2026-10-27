/**
 * EN: BenefitsSection — homepage §12 "Benefits / Services" (GUIDE.md B.1 §12).
 *     A 4-column grid of white boxes: a 32px icon in a brand-surface circle
 *     (radius-full, action-primary colour), a title and a description. Copy
 *     from GUIDE.md B.1 §12.
 * FR: BenefitsSection — accueil §12 « Benefits / Services » (GUIDE.md B.1 §12).
 *     Une grille de 4 encarts blancs : une icône de 32px dans un cercle
 *     brand-surface (radius-full, couleur action-primary), un titre et une
 *     description. Texte de GUIDE.md B.1 §12.
 *
 * EN: Server Component — static content only. · FR: Server Component — contenu statique uniquement.
 */

import type { ReactNode } from "react";
import {
  IconBuildingStore,
  IconDeviceMobileDollar,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

/** EN: The four benefit boxes (icon + title + description) — GUIDE.md B.1 §12
 *  FR: Les quatre encarts (icône + titre + description) — GUIDE.md B.1 §12 */
const BENEFITS: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <IconBuildingStore className="size-8" />,
    title: "Retrait gratuit en boutique (sous 14 jours)",
    description:
      "Commandez en ligne et récupérez gratuitement votre commande dans notre boutique à Cotonou. 14 jours max et votre commande sera considérée comme abandonnée, puis vous serez remboursé intégralement.",
  },
  {
    icon: <IconTruckDelivery className="size-8" />,
    title: "Livraison à domicile",
    description: "Livraison express à Cotonou, Calavi, Akpakpa et environs sous 2 à 4 heures.",
  },
  {
    icon: <WhatsAppIcon className="size-8" />,
    title: "Paiement & commande WhatsApp",
    description: "Discutez en direct avec nos conseillers et payez facilement à la livraison.",
  },
  {
    icon: <IconDeviceMobileDollar className="size-8" />,
    title: "Mobile Money (MoMo)",
    description: "Paiement sécurisé accepté via MTN Mobile Money et Moov Money Bénin.",
  },
];

export function BenefitsSection() {
  return (
    <Section id="benefits">
      <Reveal selector="[data-benefit]" stagger={0.08}>
        <div className="grid grid-cols-1 gap-[var(--space-lg)] sm:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              data-benefit
              className="flex flex-col gap-[var(--space-md)] rounded-[var(--radius-md)] bg-bg-surface p-[var(--space-xl)]"
            >
              <span
                className="inline-flex size-12 items-center justify-center rounded-full bg-brand-surface text-action-primary"
                aria-hidden="true"
              >
                {benefit.icon}
              </span>
              <h3 className="text-h6 font-medium text-text-primary">{benefit.title}</h3>
              <p className="text-body-m text-text-secondary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
