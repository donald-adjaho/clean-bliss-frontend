/**
 * EN: ProductRecommended — related products grid (GUIDE.md §B.3.2 §6)
 * FR: Produits liés — grille de recommandations (GUIDE.md §B.3.2 §6)
 */

import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/cn";
import type { ProductDetail } from "@/lib/api/products";

interface ProductRecommendedProps {
  product: ProductDetail;
}

export function ProductRecommended({ product }: ProductRecommendedProps) {
  const related = product.related?.nodes || [];
  if (related.length === 0) return null;

  return (
    <section className="w-full bg-bg-surface">
      <div
        className={cn(
          "mx-auto flex flex-col gap-[var(--space-xl)]",
          "px-[var(--space-mobile-h)] py-[var(--space-3xl)]",
          "md:px-[var(--space-tablet)]",
          "xl:px-[var(--space-5xl)]",
        )}
      >
        <h2 className="font-heading text-h4 text-text-primary">Ceux-ci peuvent encore vous intéresser</h2>
        <div className="grid grid-cols-2 gap-[var(--space-md)] md:gap-[var(--space-lg)] lg:grid-cols-4">
          {related.slice(0, 4).map((p) => (
            <ProductCard key={p.databaseId} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
