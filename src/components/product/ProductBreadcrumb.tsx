/**
 * EN: ProductBreadcrumb — breadcrumb for product detail page (GUIDE.md §B.3.1)
 * FR: Fil d'Ariane pour la page détail produit (GUIDE.md §B.3.1)
 */

import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ProductBreadcrumbProps {
  productName: string;
  categoryName?: string | null;
  categorySlug?: string | null;
}

export function ProductBreadcrumb({ productName, categoryName, categorySlug }: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="w-full">
      <ol
        className={cn(
          "mx-auto flex flex-wrap items-center gap-[var(--space-sm)]",
          "px-[var(--space-mobile-h)] py-[var(--space-md)]",
          "md:px-[var(--space-tablet)]",
          "xl:px-[var(--space-5xl)] xl:py-[var(--space-xl)]",
        )}
      >
        <li className="flex items-center gap-[var(--space-sm)]">
          <Link href="/" className="text-body-m text-text-muted transition-colors hover:text-action-primary">
            Accueil
          </Link>
          <IconChevronRight aria-hidden="true" className="size-3.5 text-text-muted" />
        </li>
        <li className="flex items-center gap-[var(--space-sm)]">
          <Link href="/boutique" className="text-body-m text-text-muted transition-colors hover:text-action-primary">
            Boutique
          </Link>
          <IconChevronRight aria-hidden="true" className="size-3.5 text-text-muted" />
        </li>
        {categoryName && categorySlug && (
          <li className="flex items-center gap-[var(--space-sm)]">
            <Link
              href={`/boutique?category=${encodeURIComponent(categorySlug)}`}
              className="text-body-m text-text-muted transition-colors hover:text-action-primary"
            >
              {categoryName}
            </Link>
            <IconChevronRight aria-hidden="true" className="size-3.5 text-text-muted" />
          </li>
        )}
        <li>
          <span aria-current="page" className="text-body-m text-text-primary">
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
}
