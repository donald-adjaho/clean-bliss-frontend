/**
 * EN: FaqSection — homepage §11 (GUIDE.md B.1 §11). Two columns on desktop: a
 *     fixed 380px left block (eyebrow, title, support text, "Nous contacter"
 *     button opening WhatsApp) and a flexible right column holding the 5-item
 *     accordion. Stacks vertically below lg. Content is hardcoded in
 *     `home-faq.ts` (one canonical question per product family).
 * FR: FaqSection — accueil §11 (GUIDE.md B.1 §11). Deux colonnes en desktop :
 *     un bloc gauche fixe de 380px (eyebrow, titre, texte support, bouton
 *     « Nous contacter » ouvrant WhatsApp) et une colonne droite flexible
 *     contenant l'accordéon à 5 items. Empilé verticalement en dessous de lg.
 *     Le contenu est codé en dur dans `home-faq.ts` (une question canonique par
 *     famille de produits).
 *
 * EN: Server Component — only the Accordion is a client island.
 * FR: Server Component — seul l'Accordion est une île client.
 */

import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { HOME_FAQ } from "@/lib/content/home-faq";
import { WHATSAPP_HREF } from "@/lib/content/site-links";

export function FaqSection() {
  return (
    <Section id="faq" background="bg-brand-surface">
      <div className="flex flex-col gap-[var(--space-3xl)] lg:flex-row lg:items-start lg:gap-[40px]">
        {/* EN: Left column — fixed 380px on desktop · FR: Colonne gauche — fixe 380px en desktop */}
        <Reveal className="lg:w-[380px] lg:shrink-0">
          <div className="flex flex-col items-start gap-[var(--space-lg)]">
            <span className="text-body-m font-semibold uppercase tracking-[0.12em] text-action-primary">
              Foires aux questions
            </span>
            <h2 className="text-h3 text-text-primary">Questions fréquemment posées</h2>
            <p className="text-body-l text-text-secondary">
              Besoin d&apos;aide pour choisir vos produits ? Découvrez les réponses aux questions
              les plus fréquentes ou contactez notre équipe pour être accompagné.
            </p>
            <ButtonLink
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon={<WhatsAppIcon className="size-5" />}
            >
              Nous contacter
            </ButtonLink>
          </div>
        </Reveal>

        {/* EN: Right column — flexible FAQ list · FR: Colonne droite — liste FAQ flexible */}
        <Reveal className="lg:flex-1">
          <Accordion items={HOME_FAQ} defaultOpen={HOME_FAQ[0]?.id} />
        </Reveal>
      </div>
    </Section>
  );
}
