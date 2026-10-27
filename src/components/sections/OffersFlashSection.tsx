/**
 * EN: OffersFlashSection — homepage §5 (GUIDE.md § B.1.3). A white rounded box
 *     (radius-xl, soft shadow) split in two columns: the left side promotes the
 *     month's offers (accent badge, title, subtitle, OfferCountdown), the right
 *     side is a 2-up product carousel of the `offre-flash` tagged products with
 *     a "-X% PROMO" badge and a "J'en profite !" CTA. When the end date has
 *     passed, the grid is hidden and only the countdown expiry message shows.
 *     Renders nothing when there is neither an end date nor any offer.
 * FR: OffersFlashSection — accueil §5 (GUIDE.md § B.1.3). Boîte blanche arrondie
 *     (radius-xl, ombre douce) en deux colonnes : à gauche la promotion des
 *     offres du mois (badge accent, titre, sous-titre, OfferCountdown), à droite
 *     un carrousel 2 produits (tag `offre-flash`) avec badge « -X% PROMO » et CTA
 *     « J'en profite ! ». Une fois la date de fin dépassée, la grille est masquée
 *     et seul le message d'expiration du compteur s'affiche. Ne rend rien s'il
 *     n'y a ni date de fin ni offre.
 *
 * EN: Server Component — only OfferCountdown and Carousel are client islands.
 * FR: Server Component — seuls OfferCountdown et Carousel sont des îles client.
 */

import { IconFlame } from "@tabler/icons-react";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Carousel } from "@/components/shared/Carousel";
import { ProductCard } from "@/components/shared/ProductCard";
import { OfferCountdown } from "@/components/sections/OfferCountdown";
import { parseWpDate } from "@/lib/format";
import type { HomeProduct } from "@/lib/queries/homepage";

interface OffersFlashSectionProps {
  /** EN: Products tagged `offre-flash` · FR: Produits tagués `offre-flash` */
  offers: HomeProduct[];
  /** EN: Raw end date string from Pods · FR: Chaîne de date de fin brute de Pods */
  endDate: string | null;
}

/** EN: Offers carousel breakpoints — 1 slide on mobile, 2 from tablet up.
 * FR: Breakpoints du carrousel d'offres — 1 diapo sur mobile, 2 dès la tablette. */
const OFFERS_BREAKPOINTS = {
  0: { slidesPerView: 1, spaceBetween: 16 },
  768: { slidesPerView: 2, spaceBetween: 16 },
};

export function OffersFlashSection({ offers, endDate }: OffersFlashSectionProps) {
  // EN: No date and no products → nothing to promote
  // FR: Ni date ni produit → rien à promouvoir
  if (!endDate && offers.length === 0) return null;

  // EN: Server-side expiry check for the initial paint (the countdown refines it
  //     client-side every second). Date.now() is intentional here: this Server
  //     Component is time-based and the page is statically cached (revalidate 1h).
  // FR: Vérification d'expiration côté serveur pour le premier rendu (le compteur
  //     l'affine côté client chaque seconde). Date.now() est volontaire ici : ce
  //     Server Component dépend du temps et la page est mise en cache (revalidate 1h).
  const end = parseWpDate(endDate);
  // eslint-disable-next-line react-hooks/purity -- time-based server render (cached 1h)
  const isExpired = end !== null && end.getTime() <= Date.now();

  return (
    <Section id="offres" className="xl:pt-0">
      <Reveal>
        <div className="rounded-[var(--radius-xl)] border border-border-subtle bg-base-white p-[var(--space-2xl)] shadow-card">
          <div className="flex flex-col gap-[var(--space-2xl)] lg:flex-row lg:items-center">
            {/* EN: Left column (40%) — promo copy + countdown · FR: Colonne gauche (40%) — texte promo + compteur */}
            <div className="flex flex-col items-start gap-[var(--space-lg)] lg:w-2/5">
              <span className="inline-flex items-center gap-[var(--space-sm)] rounded-full bg-brand-accent px-[var(--space-lg)] py-[var(--space-sm)] text-body-s font-semibold uppercase tracking-[0.12em] text-base-white">
                <IconFlame className="size-4" aria-hidden="true" />
                Offres exclusives du mois
              </span>

              <h2 className="text-h3 text-text-primary">
                Profitez de réductions exceptionnelles jusqu&apos;à -30 % !
              </h2>

              <p className="text-body-l text-text-secondary">
                Chaque mois, sélection spéciale de coffrets cadeaux, parfums de luxe et
                ensembles de nettoyage pour votre maison à des prix réduits.
              </p>

              <OfferCountdown endDate={endDate} />
            </div>

            {/* EN: Right column (60%) — 2-up offers carousel, hidden once expired
                FR: Colonne droite (60%) — carrousel 2 offres, masqué une fois expiré */}
            {!isExpired && offers.length > 0 && (
              <div className="lg:w-3/5">
                <Carousel
                  ariaLabel="Offres du mois"
                  breakpoints={OFFERS_BREAKPOINTS}
                  items={offers.map((product) => (
                    <ProductCard
                      key={product.databaseId}
                      product={product}
                      badge="promo"
                      ctaLabel="J'en profite !"
                    />
                  ))}
                />
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
