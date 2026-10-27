/**
 * EN: VisitCtaSection — homepage §13 "CTA visite boutique (+ vidéo)" (GUIDE.md
 *     B.1 §13). A light-blue band (brand-secondary) with a 2-column layout: on
 *     the left the eyebrow, title, subtitle, three contact boxes and two CTAs
 *     (Google Maps + WhatsApp); on the right the boutique video (§13 video).
 *     Stacks text-then-video below lg (GUIDE.md B.1 mobile/tablet notes).
 * FR: VisitCtaSection — accueil §13 « CTA visite boutique (+ vidéo) » (GUIDE.md
 *     B.1 §13). Une bande bleu clair (brand-secondary) en 2 colonnes : à gauche
 *     l'eyebrow, le titre, le sous-titre, trois encarts de contact et deux CTA
 *     (Google Maps + WhatsApp) ; à droite la vidéo de la boutique (vidéo §13).
 *     Empilé texte puis vidéo en dessous de lg (notes mobile/tablette de GUIDE.md B.1).
 *
 * EN: Server Component — only the nested CtaVideo is a client island.
 * FR: Server Component — seul le CtaVideo imbriqué est une île client.
 */

import type { ReactNode } from "react";import {
  IconClock,
  IconMapPin,
  IconPhone,
  IconRoute,
} from "@tabler/icons-react";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CtaVideo } from "@/components/sections/CtaVideo";
import { WHATSAPP_HREF, buildMapsHref } from "@/lib/content/site-links";

interface VisitCtaSectionProps {
  /** EN: Pods `businessAdresse` · FR: Pods `businessAdresse` */
  address: string | null;
  /** EN: Pods `businessPhone` · FR: Pods `businessPhone` */
  phone: string | null;
  /** EN: Pods `ctaVideo` (source + MIME) · FR: Pods `ctaVideo` (source + MIME) */
  video: { sourceUrl: string | null; mimeType: string | null } | null;
}

/* EN: Fallbacks used when the Pods contact fields are empty (keeps the CTAs
 *     functional and the copy readable) · FR: Replis utilisés quand les champs
 *     de contact Pods sont vides (garde les CTA fonctionnels et le texte lisible) */
const FALLBACK_ADDRESS = "Clean & Bliss, Cotonou, Bénin";
const FALLBACK_SERVICE = "WhatsApp";

/** EN: The three contact boxes (icon + label + value) — GUIDE.md B.1 §13
 *  FR: Les trois encarts (icône + libellé + valeur) — GUIDE.md B.1 §13 */
const CONTACT_BOXES: (serviceValue: string) => {
  icon: ReactNode;
  label: string;
  value: string;
}[] = (serviceValue) => [
  {
    icon: <IconMapPin className="size-5" />,
    label: "Localisation",
    value: "Boutique Clean & Bliss, Cotonou, Bénin",
  },
  {
    icon: <IconClock className="size-5" />,
    label: "Horaire d'ouverture",
    value: "Lundi au Samedi : 09h00 - 20h00",
  },
  {
    icon: <IconPhone className="size-5" />,
    label: "Service Client",
    value: serviceValue,
  },
];

export function VisitCtaSection({ address, phone, video }: VisitCtaSectionProps) {
  // EN: Null-safe contact values · FR: Valeurs de contact tolérantes au null
  const serviceValue = phone ? `${phone} / WhatsApp` : FALLBACK_SERVICE;

  return (
    <Section id="visite-boutique" background="bg-brand-secondary">
      {/* EN: 2 columns from md upward (GUIDE.md B.1 tablet keeps the 2-column
          layout); stacked below md. The video column is fluid at md and becomes
          an even 50% split from lg so the video gets real width instead of a
          cramped fixed box.
          FR: 2 colonnes à partir de md (GUIDE.md B.1 — la tablette conserve le
          layout 2 colonnes) ; empilé sous md. La colonne vidéo est fluide en md
          puis passe à 50 % à partir de lg, pour que la vidéo dispose d'une vraie
          largeur plutôt que d'une boîte fixe trop étroite. */}
      <div className="flex flex-col gap-[var(--space-3xl)] md:flex-row md:items-center md:gap-[var(--space-2xl)]">
        {/* EN: Left column — eyebrow, title, subtitle, contact boxes, CTAs
            FR: Colonne gauche — eyebrow, titre, sous-titre, encarts, CTA */}
        <Reveal className="md:flex-1">
          <div className="flex flex-col items-start gap-[var(--space-xl)] text-neutral-900">
            <span className="inline-flex items-center gap-[var(--space-xs)] text-body-m font-semibold uppercase tracking-[0.12em]">
              <IconMapPin className="size-4" aria-hidden="true" />
              Venez nous rendre visite à Cotonou
            </span>

            <h2 className="text-h3 text-text-primary xl:text-h2">
              Venez Tester &amp; Trouver Votre Parfum Signature en Boutique !
            </h2>

            <p className="max-w-[640px] text-body-l text-text-primary">
              Vous hésitez sur une odeur ? Rien ne remplace une expérience olfactive en réel !
              Rendez-vous dans notre espace privilégié à Cotonou pour tester nos collections de
              parfums, découvrir la fraîcheur de nos nettoyants et bénéficier des conseils
              personnalisés de notre équipe.
            </p>

            {/* EN: Three stacked contact boxes · FR: Trois encarts de contact empilés */}
            <div className="flex w-full max-w-[480px] flex-col gap-[var(--space-md)]">
              {CONTACT_BOXES(serviceValue).map((box) => (
                <div
                  key={box.label}
                  className="flex items-center gap-[var(--space-lg)] rounded-[var(--radius-md)] bg-base-white/70 px-[var(--space-xl)] py-[var(--space-lg)]"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-base-white text-action-primary">
                    <span aria-hidden="true">{box.icon}</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-body-m text-text-secondary">{box.label}</span>
                    <span className="text-body-l font-medium text-text-primary">{box.value}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* EN: Two CTAs — different backgrounds (Primary + Secondary)
                FR: Deux CTA — fonds distincts (primaire + secondaire) */}
            <div className="flex flex-col gap-[var(--space-md)] sm:flex-row sm:flex-wrap">
              <ButtonLink
                href={buildMapsHref(address ?? FALLBACK_ADDRESS)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                icon={<IconRoute className="size-5" />}
              >
                Obtenir l&apos;itinéraire Google Maps
              </ButtonLink>
              <ButtonLink
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={<WhatsAppIcon className="size-5" />}
              >
                Contacter la Boutique
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {/* EN: Right column — boutique video · FR: Colonne droite — vidéo boutique */}
        <Reveal className="md:flex-1 lg:w-1/2 lg:flex-none">
          <CtaVideo src={video?.sourceUrl ?? null} mimeType={video?.mimeType ?? null} />
        </Reveal>
      </div>
    </Section>
  );
}
