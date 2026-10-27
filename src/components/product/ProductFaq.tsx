/**
 * EN: ProductFaq — dynamic FAQ by category (GUIDE.md §B.3.2 §4)
 * FR: FAQ produit — dynamique par catégorie (GUIDE.md §B.3.2 §4)
 */

import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/cn";
import { getProductFaqItems } from "@/lib/product-faq";

interface ProductFaqProps {
  categorySlug?: string | null;
}

export function ProductFaq({ categorySlug }: ProductFaqProps) {
  const items = getProductFaqItems(categorySlug);
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full bg-bg-tint">
      <div
        className={cn(
          "mx-auto flex flex-col items-center gap-[var(--space-xl)]",
          "px-[var(--space-mobile-h)] py-[var(--space-3xl)]",
          "md:px-[var(--space-tablet)]",
          "xl:px-[var(--space-5xl)]",
        )}
      >
        <h2 className="text-center font-heading text-h4 text-text-primary">Questions fréquemment posées</h2>
        <Accordion items={items} defaultOpen={items[0]?.id} className="w-full max-w-[820px]" />
      </div>
    </section>
  );
}
