"use client";

/**
 * EN: ProductGrid — the boutique catalogue grid (GUIDE.md B.2.5/B.2.6) with
 *     client-side price filtering and pagination. The URL is the source of
 *     truth: desktop shows the current page slice, mobile uses a cumulative
 *     "Charger plus" that reveals one more page. Reveals are mounted once so
 *     paginating never re-triggers the entrance animation (§B.2.9).
 * FR: ProductGrid — la grille du catalogue boutique (GUIDE.md B.2.5/B.2.6) avec
 *     filtrage prix et pagination côté client. L'URL est la source de vérité :
 *     le desktop affiche la tranche de la page courante, le mobile utilise un
 *     « Charger plus » cumulatif qui révèle une page de plus. Les reveals sont
 *     montés une fois, donc paginer ne relance jamais l'animation d'entrée (§B.2.9).
 *
 * EN: "use client" required — local pagination state derived from the URL.
 * FR: "use client" requis — état de pagination local dérivé de l'URL.
 */

import {
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { ProductCard } from "@/components/shared/ProductCard";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useShopUrl } from "@/hooks/useShopUrl";
import { cn } from "@/lib/cn";
import { applyPriceFilter, buildPageList, PAGE_SIZE } from "@/lib/shop-filters";
import type { ShopProduct } from "@/lib/api/products";

interface ProductGridProps {
  /** EN: Category/tag-filtered products (price filter applied here) · FR: Produits filtrés par catégorie/étiquette (filtre prix appliqué ici) */
  products: ShopProduct[];
}

/* EN: Grid classes shared by the desktop + mobile grids · FR: Classes de grille partagées par les grilles desktop + mobile */
const GRID_CLASSES = "grid gap-[var(--space-md)] md:gap-[var(--space-xl)]";

export function ProductGrid({ products }: ProductGridProps) {
  const { state, setPage } = useShopUrl();

  const filtered = applyPriceFilter(products, state.prices);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(state.page, 1), totalPages);

  const desktopItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const mobileItems = filtered.slice(0, page * PAGE_SIZE);

  /* EN: Jump to a page and bring the grid top back into view (no smooth
   *     scrolling when the user prefers reduced motion)
   * FR: Aller à une page et ramener le haut de la grille dans la vue (pas de
   *     défilement fluide si l'utilisateur préfère réduire les animations) */
  const goToPage = (next: number) => {
    setPage(next);
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("grille-produits")?.scrollIntoView({
      block: "start",
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  if (total === 0) {
    return (
      <div
        id="grille-produits"
        className="flex flex-col items-center gap-[var(--space-lg)] rounded-xl border border-border-subtle bg-bg-tint px-[var(--space-xl)] py-[var(--space-4xl)] text-center"
      >
        <p className="text-body-l font-medium text-text-primary">Aucun produit ne correspond à vos filtres.</p>
        <p className="max-w-[420px] text-body-m text-text-secondary">
          Essayez d&apos;élargir vos critères ou de réinitialiser les filtres pour découvrir toute la boutique.
        </p>
        <ButtonLink href="/boutique" variant="secondary">
          Réinitialiser les filtres
        </ButtonLink>
      </div>
    );
  }

  return (
    <div id="grille-produits" className="scroll-mt-[var(--space-6xl)]">
      {/* EN: Desktop grid — one page at a time · FR: Grille desktop — une page à la fois */}
      <Reveal selector="[data-reveal-card]" stagger={0.08} className={cn(GRID_CLASSES, "hidden md:grid md:grid-cols-2 xl:grid-cols-3")}>
        {desktopItems.map((product) => (
          <div key={product.databaseId} data-reveal-card className="flex">
            <ProductCard product={product} variant="catalogue" className="w-full" />
          </div>
        ))}
      </Reveal>

      {/* EN: Mobile grid — cumulative (Charger plus adds a page) · FR: Grille mobile — cumulative (Charger plus ajoute une page) */}
      <Reveal selector="[data-reveal-card]" stagger={0.06} className={cn(GRID_CLASSES, "grid grid-cols-2 md:hidden")}>
        {mobileItems.map((product) => (
          <div key={product.databaseId} data-reveal-card className="flex">
            <ProductCard product={product} variant="catalogue" className="w-full" />
          </div>
        ))}
      </Reveal>

      {/* EN: Pagination — numbered on desktop, "Charger plus" on mobile
          FR: Pagination — numérotée sur desktop, « Charger plus » sur mobile */}
      {totalPages > 1 && (
        <nav aria-label="Pagination des produits" className="mt-[var(--space-2xl)]">
          {/* EN: Desktop numbered pagination · FR: Pagination numérotée desktop */}
          <div className="hidden items-center justify-center gap-[var(--space-sm)] md:flex">
            <PageButton
              ariaLabel="Page précédente"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              <IconChevronLeft aria-hidden="true" className="size-4" />
            </PageButton>

            {buildPageList(page, totalPages).map((item, index) =>
              item === "ellipsis" ? (
                <span key={`ellipsis-${index}`} className="px-[var(--space-2xs)] text-body-m text-text-muted">
                  …
                </span>
              ) : (
                <PageButton
                  key={item}
                  active={item === page}
                  ariaLabel={`Page ${item}`}
                  ariaCurrent={item === page ? "page" : undefined}
                  onClick={() => goToPage(item)}
                >
                  {item}
                </PageButton>
              ),
            )}

            <PageButton
              ariaLabel="Page suivante"
              disabled={page >= totalPages}
              onClick={() => goToPage(page + 1)}
            >
              <IconChevronRight aria-hidden="true" className="size-4" />
            </PageButton>
          </div>

          {/* EN: Mobile "Charger plus" · FR: « Charger plus » mobile */}
          {page < totalPages && (
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center rounded-full border border-border-default bg-bg-surface",
                  "text-body-l font-medium text-text-primary",
                  "transition-colors duration-[var(--duration-fast)] ease-out hover:border-action-primary hover:text-action-primary",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                )}
              >
                Charger plus
              </button>
            </div>
          )}
        </nav>
      )}
    </div>
  );
}

/* EN: A 40px square pagination button (token colours) · FR: Un bouton de pagination carré 40px (couleurs tokens) */
function PageButton({
  children,
  onClick,
  disabled = false,
  active = false,
  ariaLabel,
  ariaCurrent,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  ariaLabel: string;
  ariaCurrent?: "page";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md border text-body-m font-medium",
        "transition-colors duration-[var(--duration-fast)] ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        active
          ? "border-action-primary bg-action-primary text-action-on-primary"
          : "border-border-default bg-bg-surface text-text-primary hover:border-action-primary hover:text-action-primary",
        disabled && "cursor-not-allowed opacity-40 hover:border-border-default hover:text-text-primary",
      )}
    >
      {children}
    </button>
  );
}
