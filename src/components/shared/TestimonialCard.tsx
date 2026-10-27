/**
 * EN: TestimonialCard — one customer review (§9, GUIDE.md B.1 §9). White-ish
 *     brand-surface card, radius-xl, 1px border; a 300px product image on the
 *     left and the review on the right (stacked on mobile). Cards are 700×400
 *     on desktop and ~350px wide / swipable on mobile.
 * FR: TestimonialCard — un avis client (§9, GUIDE.md B.1 §9). Carte
 *     brand-surface, radius-xl, bordure 1px ; image produit de 300px à gauche
 *     et l'avis à droite (empilé sur mobile). Cartes 700×400 en desktop et
 *     ~350px de large / swipables sur mobile.
 *
 * EN: Server Component — static rendering + next/image.
 * FR: Server Component — rendu statique + next/image.
 */

import Image from "next/image";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import type { HomeTestimonial } from "@/lib/queries/homepage";

interface TestimonialCardProps {
  testimonial: HomeTestimonial;
}

/** EN: 0–5 star row for the review rating · FR: Rangée de 0–5 étoiles pour la note */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <span className="flex items-center gap-[2px] text-brand-primary" aria-label={`Note : ${filled} sur 5`}>
      {Array.from({ length: 5 }).map((_, index) =>
        index < filled ? (
          <IconStarFilled key={index} className="size-4" aria-hidden="true" />
        ) : (
          <IconStar key={index} className="size-4" aria-hidden="true" />
        ),
      )}
    </span>
  );
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { productImage, productName, content, rating, author } = testimonial;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border-subtle bg-brand-surface md:h-[400px] md:flex-row">
      {/* EN: Product image — 300px column on desktop, 220px band on mobile
          FR: Image produit — colonne de 300px en desktop, bande de 220px en mobile */}
      <div className="relative h-[220px] w-full shrink-0 bg-bg-surface md:h-full md:w-[300px]">
        {productImage?.sourceUrl && (
          <Image
            src={productImage.sourceUrl}
            alt={productImage.altText || productName}
            fill
            sizes="(max-width: 767px) 100vw, 300px"
            className="object-contain p-[var(--space-lg)]"
          />
        )}
      </div>

      {/* EN: Review body — stars, quote, author + reviewed product
          FR: Corps de l'avis — étoiles, citation, auteur + produit commenté */}
      <div className="flex flex-1 flex-col gap-[var(--space-lg)] p-[var(--space-2xl)]">
        <Stars rating={rating} />

        <blockquote className="text-body-xl font-medium text-text-primary">
          {content}
        </blockquote>

        <div className="mt-auto flex flex-col gap-[var(--space-2xs)]">
          <span className="text-body-m font-semibold text-text-primary">{author}</span>
          <span className="text-body-s text-text-muted">Avis sur {productName}</span>
        </div>
      </div>
    </article>
  );
}
