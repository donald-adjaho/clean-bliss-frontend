/**
 * EN: ProductGallery — main image + thumbnails + wishlist/compare placeholders
 *     (GUIDE.md §B.3.2). Client component for thumbnail navigation.
 * FR: Galerie produit — image principale + vignettes + wishlist/comparaison
 *     (GUIDE.md §B.3.2). Composant client pour la navigation par vignettes.
 */

"use client";

import Image from "next/image";
import { useState } from "react";
import { IconArrowsExchange, IconChevronLeft, IconChevronRight, IconHeart } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import type { WpImage } from "@/lib/api/products";

interface ProductGalleryProps {
  mainImage: WpImage | null;
  galleryImages: WpImage[];
  productName: string;
}

export function ProductGallery({ mainImage, galleryImages, productName }: ProductGalleryProps) {
  const images: WpImage[] = [];
  if (mainImage?.sourceUrl) images.push(mainImage);
  for (const img of galleryImages) {
    if (img?.sourceUrl && !images.some((i) => i.sourceUrl === img.sourceUrl)) {
      images.push(img);
    }
  }
  if (images.length === 0) images.push({ sourceUrl: null, altText: null });

  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] || images[0];

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex w-full flex-col gap-[var(--space-md)]">
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] bg-bg-tint">
        {active.sourceUrl ? (
          <Image
            src={active.sourceUrl}
            alt={active.altText || productName}
            fill
            sizes="(max-width: 1279px) 100vw, 55vw"
            className="object-contain"
            priority
          />
        ) : null}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Image précédente"
              className={cn(
                "absolute left-[var(--space-md)] top-1/2 -translate-y-1/2",
                "inline-flex size-11 items-center justify-center rounded-full bg-base-white shadow-card",
                "transition-opacity duration-fast hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
              )}
            >
              <IconChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Image suivante"
              className={cn(
                "absolute right-[var(--space-md)] top-1/2 -translate-y-1/2",
                "inline-flex size-11 items-center justify-center rounded-full bg-base-white shadow-card",
                "transition-opacity duration-fast hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
              )}
            >
              <IconChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        )}

        <div className="absolute right-[var(--space-md)] top-[var(--space-md)] flex flex-col gap-[var(--space-sm)]">
          <button
            type="button"
            aria-label="Ajouter à ma liste de souhaits"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full bg-base-white shadow-card",
              "transition-opacity duration-fast hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            )}
          >
            <IconHeart aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Comparer ce produit"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full bg-base-white shadow-card",
              "transition-opacity duration-fast hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            )}
          >
            <IconArrowsExchange aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-[var(--space-md)]">
          {images.map((img, index) => (
            <button
              key={img.sourceUrl || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Voir l'image ${index + 1}`}
              className={cn(
                "relative h-[78px] w-[78px] overflow-hidden rounded-[var(--radius-md)] border bg-bg-surface",
                index === activeIndex
                  ? "border-2 border-action-primary"
                  : "border border-border-subtle hover:border-border-default",
              )}
            >
              {img.sourceUrl ? (
                <Image src={img.sourceUrl} alt={img.altText || productName} fill sizes="90px" className="object-contain" />
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
