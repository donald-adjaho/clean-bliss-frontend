/**
 * EN: CollectionsSection — homepage §7 (GUIDE.md § B.1.3). Three themed tiles
 *     (image background + dark overlay) with a badge, title, short subtitle and
 *     a link. Heights: 400px desktop, responsive below. Links to
 *     `/boutique?tag={slug}` (matched to existing WooCommerce tags).
 * FR: CollectionsSection — accueil §7 (GUIDE.md § B.1.3). Trois tuiles thématiques
 *     (image de fond + voile sombre) avec badge, titre, sous-titre court et lien.
 *     Hauteurs : 400px desktop, responsive en dessous. Liens vers
 *     `/boutique?tag={slug}` (assortis aux tags WooCommerce existants).
 *
 * EN: Server Component — static content + next/image. · FR: Server Component — contenu statique + next/image.
 */

import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import type { WpImage } from "@/lib/queries/homepage";

interface CollectionTile {
  /** EN: Pill label · FR: Libellé de la pilule */
  badge: string;
  title: string;
  subtitle: string;
  /** EN: CTA link label · FR: Libellé du lien CTA */
  cta: string;
  /** EN: Destination tag slug · FR: Slug de tag de destination */
  tag: string;
  image: WpImage | null;
}

interface CollectionsSectionProps {
  selection1Image: WpImage | null;
  selection2Image: WpImage | null;
  selection3Image: WpImage | null;
}

/** EN: Wraps the tile in a reveal with an 80ms stagger index (ANIMATIONS.md §9).
 * FR: Enveloppe la tuile dans un reveal avec un index de décalage de 80ms (ANIMATIONS.md §9). */
function TileReveal({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      {children}
    </Reveal>
  );
}

export function CollectionsSection({
  selection1Image,
  selection2Image,
  selection3Image,
}: CollectionsSectionProps) {
  const tiles: CollectionTile[] = [
    {
      badge: "Gamme française",
      title: "Parfums Adopt",
      subtitle: "Fragrances pétillantes, gourmandes et variées pour changer de parfum selon vos envies.",
      cta: "Explorer la gamme Adopt",
      tag: "adopt",
      image: selection1Image,
    },
    {
      badge: "Édition spéciale",
      title: "Sélection Octobre Rose",
      subtitle: "Compositions florales d'une extrême douceur aux notes de rose, pivoine et musc blanc.",
      cta: "Découvrir la sélection",
      tag: "octobre-rose",
      image: selection2Image,
    },
    {
      badge: "Saison",
      title: "Sélection de Novembre",
      subtitle: "Eaux de parfum ambrées, boisées et épicées pour une élégance affirmée.",
      cta: "Découvrir la sélection",
      tag: "mon-novembre",
      image: selection3Image,
    },
  ].filter((tile) => tile.image?.sourceUrl);

  // EN: No usable image → hide the whole section · FR: Aucune image exploitable → masquer toute la section
  if (tiles.length === 0) return null;

  return (
    <Section id="collections">
      <Reveal>
        <SectionHeader
          align="center"
          eyebrow="Collections thématiques"
          title="Nos sélections Exclusives pour Vous"
          description="Des sélections soigneusement composées par nos spécialistes en parfumerie."
        />
      </Reveal>

      <div className="mt-[var(--space-4xl)] grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile, index) => (
          <TileReveal key={tile.tag} index={index}>
            <Link
              href={`/boutique?tag=${tile.tag}`}
              className="group relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[var(--radius-xl)] p-[var(--space-2xl)]"
            >
              {tile.image?.sourceUrl && (
                <Image
                  src={tile.image.sourceUrl}
                  alt={tile.image.altText || tile.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[var(--duration-slow)] ease-out group-hover:scale-[1.04]"
                />
              )}

              {/* EN: Dark bottom overlay for text legibility (token gradient)
                  FR: Voile sombre ancré en bas pour la lisibilité (dégradé token) */}
              <div
                className="absolute inset-0 bg-[image:var(--gradient-tile-overlay)]"
                aria-hidden="true"
              />

              <div className="relative flex flex-col items-start gap-[var(--space-sm)]">
                <span className="inline-flex rounded-full bg-base-white/15 px-[var(--space-lg)] py-[var(--space-sm)] text-body-s font-semibold uppercase tracking-[0.12em] text-base-white backdrop-blur-md">
                  {tile.badge}
                </span>
                <h3 className="text-h4 text-base-white">{tile.title}</h3>
                <p className="text-body-m text-base-white/85">{tile.subtitle}</p>
                <span className="mt-[var(--space-sm)] inline-flex items-center gap-[var(--space-xs)] text-body-m font-semibold text-base-white">
                  {tile.cta}
                  <IconArrowRight className="size-4 transition-transform duration-[var(--duration-base)] ease-out group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </TileReveal>
        ))}
      </div>
    </Section>
  );
}
