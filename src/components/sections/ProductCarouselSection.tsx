/**
 * EN: ProductCarouselSection — reusable horizontal product rail shared by
 *     homepage §3 (best sellers) and §4 (new arrivals): a section header (with
 *     optional "Voir tous…" link) on top of a Swiper carousel of ProductCards.
 *     Returns null when there are no products, so empty sections never render.
 * FR: ProductCarouselSection — rangée produit horizontale réutilisable partagée
 *     par l'accueil §3 (meilleures ventes) et §4 (nouveautés) : un en-tête de
 *     section (avec lien « Voir tous… » optionnel) au-dessus d'un carrousel
 *     Swiper de ProductCard. Renvoie null s'il n'y a aucun produit, pour ne
 *     jamais rendre une section vide.
 *
 * EN: Server Component — only the nested Carousel is a client island.
 * FR: Server Component — seul le Carousel imbriqué est une île client.
 */

import { IconArrowRight } from "@tabler/icons-react";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { Carousel } from "@/components/shared/Carousel";
import { ProductCard, type BadgeMode } from "@/components/shared/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { HomeProduct } from "@/lib/queries/homepage";

interface ProductCarouselSectionProps {
  /** EN: Anchor id · FR: Id d'ancre */
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** EN: Optional "see all" link · FR: Lien « voir tout » optionnel */
  actionHref?: string;
  actionLabel?: string;
  products: HomeProduct[];
  /** EN: Badge mode forwarded to each card · FR: Mode de badge transmis à chaque carte */
  badge?: BadgeMode;
  /** EN: CTA label forwarded to each card · FR: Libellé du CTA transmis à chaque carte */
  ctaLabel?: string;
  /** EN: Header alignment · FR: Alignement de l'en-tête */
  align?: "left" | "center";
}

export function ProductCarouselSection({
  id,
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  products,
  badge = "auto",
  ctaLabel,
  align = "left",
}: ProductCarouselSectionProps) {
  // EN: Nothing to show → render nothing (keeps sparse catalogues clean)
  // FR: Rien à afficher → ne rien rendre (garde les catalogues clairsemés propres)
  if (products.length === 0) return null;

  return (
    <Section id={id}>
      <Reveal>
        <SectionHeader
          align={align}
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            actionHref && actionLabel ? (
              <ButtonLink
                href={actionHref}
                variant="ghost"
                size="sm"
                icon={<IconArrowRight className="size-4" />}
                iconPosition="right"
              >
                {actionLabel}
              </ButtonLink>
            ) : undefined
          }
        />
      </Reveal>

      <Reveal className="mt-[var(--space-4xl)]">
        <Carousel
          ariaLabel={title}
          items={products.map((product) => (
            <ProductCard key={product.databaseId} product={product} badge={badge} ctaLabel={ctaLabel} />
          ))}
        />
      </Reveal>
    </Section>
  );
}
