/**
 * EN: Hero — homepage §1 (GUIDE.md § B.1.3). Full-width image with a
 *     bottom-anchored dark gradient overlay (keeps the white text legible while
 *     leaving the top of the image crisp), a glass badge, the main title,
 *     subtitle and a white secondary CTA. No scroll reveal here (first screen
 *     must be visible immediately — ANIMATIONS.md §9).
 * FR: Hero — accueil §1 (GUIDE.md § B.1.3). Image pleine largeur avec voile
 *     en dégradé sombre ancré en bas (garantit la lisibilité du texte blanc tout
 *     en gardant le haut de l'image net), badge en verre, titre principal,
 *     sous-titre et CTA secondaire blanc. Aucun reveal ici (le premier écran
 *     doit être visible immédiatement — ANIMATIONS.md §9).
 *
 * EN: No "use client" — static Server Component (image optimised by next/image).
 * FR: Pas de "use client" — Server Component statique (image optimisée par next/image).
 */

import Image from "next/image";
import { IconShoppingBag } from "@tabler/icons-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { WpImage } from "@/lib/queries/homepage";

interface HeroProps {
  /** EN: Hero image (Pods homepage.heroImage) · FR: Image du hero (Pods homepage.heroImage) */
  image: WpImage | null;
}

export function Hero({ image }: HeroProps) {
  return (
    // EN: 20px outer frame around the whole hero · FR: Cadre externe de 20px autour du hero
    <section className="p-[var(--space-mobile-h)]">
      <div className="relative h-[520px] overflow-hidden rounded-[var(--radius-lg)] md:h-[640px] xl:h-[820px]">
        {image?.sourceUrl && (
          <Image
            src={image.sourceUrl}
            alt={image.altText || "Clean & Bliss"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* EN: Responsive dark gradient for text legibility — the mobile block
                fills the hero, so it needs a fuller overlay than tablet/desktop
            FR: Dégradé sombre responsive pour la lisibilité du texte — le bloc
                mobile remplit le hero, il lui faut donc un voile plus dense */}
        <div
          className="absolute inset-0 bg-[image:var(--gradient-overlay-bottom-mobile)] md:bg-[image:var(--gradient-overlay-bottom)]"
          aria-hidden="true"
        />

        {/* EN: Overlaid content, bottom-left · FR: Contenu superposé, en bas à gauche */}
        <div className="absolute inset-x-0 bottom-0 p-[var(--space-mobile-h)] md:p-[var(--space-2xl)] xl:p-[var(--space-3xl)]">
          <div className="flex max-w-[720px] flex-col items-start gap-[var(--space-lg)]">
            {/* EN: Glass badge · FR: Badge en verre */}
            <span className="inline-flex rounded-full bg-base-white/15 px-[var(--space-lg)] py-[var(--space-sm)] text-body-m font-semibold uppercase tracking-[0.12em] text-base-white backdrop-blur-md">
              Parfumerie &amp; Bien-être Premium à Cotonou
            </span>

            <h1 className="max-w-[700px] text-h3 text-base-white md:text-h3 xl:text-h2">
              Révélez Votre Signature Parfumée &amp; Sublimez Votre Intérieur.
            </h1>

            <p className="max-w-[600px] text-body-l text-base-white/90">
              Découvrez nos collections d&apos;eaux de parfum envoûtantes, nos bougies
              artisanales réconfortantes, nos senteurs d&apos;ambiance et nos
              nettoyants haute fraîcheur.
            </p>

            <ButtonLink
              href="/boutique"
              variant="secondary"
              size="md"
              icon={<IconShoppingBag className="size-5" />}
            >
              Explorer la Boutique
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
