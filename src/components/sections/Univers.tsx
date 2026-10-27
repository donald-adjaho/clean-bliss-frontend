/**
 * EN: Nos Univers — homepage §2 (GUIDE.md § B.1.3). Centered header + an
 *     asymmetric category grid: one large tile (Parfums, 2×2 on desktop) and
 *     four small tiles. Each tile links to the filtered shop page.
 * FR: Nos Univers — accueil §2 (GUIDE.md § B.1.3). En-tête centré + grille
 *     asymétrique de catégories : une grande tuile (Parfums, 2×2 sur desktop) et
 *     quatre petites tuiles. Chaque tuile mène à la boutique filtrée.
 *
 * EN: No "use client" — the grid is server-rendered; the reveal wrapper is a
 *     small client island.
 * FR: Pas de "use client" — la grille est rendue côté serveur ; l'enveloppe de
 *     reveal est une petite île client.
 */

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import type { HomeCategory } from "@/lib/queries/homepage";

interface UniversProps {
  categories: HomeCategory[];
}

/* EN: Display order + responsive spans. Parfums is the big 2×2 tile on desktop;
 *     the four others fill the remaining cells. Below xl the grid stacks.
 * FR: Ordre d'affichage + spans responsives. Parfums est la grande tuile 2×2 sur
 *     desktop ; les quatre autres remplissent les cellules restantes. En dessous
 *     de xl, la grille s'empile. */
const TILE_LAYOUT: { slug: string; span: string }[] = [
  { slug: "parfums", span: "col-span-2 xl:col-span-2 xl:row-span-2" },
  { slug: "bougies", span: "col-span-1" },
  { slug: "nettoyants", span: "col-span-1" },
  { slug: "senteurs", span: "col-span-2 md:col-span-1" },
  { slug: "deodorants", span: "col-span-2 md:col-span-1" },
];

export function Univers({ categories }: UniversProps) {
  const bySlug = new Map(categories.map((category) => [category.slug, category]));

  return (
    <Section id="univers">
      <Reveal>
        <SectionHeader
          eyebrow="Nos Univers"
          title="Explorez Nos Catégories Phares"
          description="Que ce soit pour votre rituel beauté ou pour embaumer votre foyer, trouvez le produit parfait."
        />
      </Reveal>

      <Reveal
        stagger={0.08}
        selector="[data-tile]"
        className="mt-[var(--space-4xl)] grid grid-cols-2 gap-[var(--space-mobile-h)] md:grid-cols-2 xl:h-[600px] xl:grid-cols-4 xl:grid-rows-2"
      >
        {TILE_LAYOUT.map(({ slug, span }) => {
          const category = bySlug.get(slug);
          if (!category) return null;

          return (
            <Link
              key={slug}
              data-tile
              href={`/boutique?category=${category.slug}`}
              className={`group relative min-h-[220px] overflow-hidden rounded-[var(--radius-md)] xl:min-h-0 ${span}`}
            >
              {category.image?.sourceUrl ? (
                <Image
                  src={category.image.sourceUrl}
                  alt={category.image.altText || category.name}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[var(--duration-slow)] ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 bg-brand-surface" aria-hidden="true" />
              )}

              {/* EN: Light dark overlay, darker on hover · FR: Voile sombre léger, plus foncé au survol */}
              <div
                className="absolute inset-0 bg-neutral-900/20 transition-colors duration-[var(--duration-base)] ease-out group-hover:bg-neutral-900/40"
                aria-hidden="true"
              />

              {/* EN: Floating label, bottom-left · FR: Étiquette flottante, en bas à gauche */}
              <div className="absolute bottom-[var(--space-lg)] left-[var(--space-lg)] rounded-[var(--radius-md)] bg-bg-surface px-[var(--space-lg)] py-[var(--space-sm)]">
                <span className="block text-body-m font-medium uppercase text-text-primary">
                  {category.name}
                </span>
                {category.count !== null && (
                  <span className="block text-body-s text-text-muted">
                    {category.count} produits
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </Reveal>
    </Section>
  );
}
