"use client";

/**
 * EN: ShopToolbar — the boutique results bar (GUIDE.md B.2.4): result count on
 *     the left, sort control on the right, plus a "Filtres" trigger that opens
 *     the filter drawer below xl (tablet/mobile, B.2.6).
 * FR: ShopToolbar — la barre de résultats de la boutique (GUIDE.md B.2.4) :
 *     compte de résultats à gauche, contrôle de tri à droite, plus un déclencheur
 *     « Filtres » qui ouvre le tiroir de filtres sous xl (tablette/mobile, B.2.6).
 *
 * EN: "use client" required — dropdown, drawer and URL state.
 * FR: "use client" requis — menu déroulant, tiroir et état d'URL.
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconAdjustmentsHorizontal, IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { useShopUrl } from "@/hooks/useShopUrl";
import { cn } from "@/lib/cn";
import { applyPriceFilter, PAGE_SIZE, SORT_OPTIONS } from "@/lib/shop-filters";
import type { ShopCategory, ShopProduct, ShopTag } from "@/lib/api/products";

interface ShopToolbarProps {
  categories: ShopCategory[];
  tags: ShopTag[];
  /** EN: Category/tag-filtered products (price filter applied client-side) · FR: Produits filtrés par catégorie/étiquette (filtre prix appliqué côté client) */
  products: ShopProduct[];
}

export function ShopToolbar({ categories, tags, products }: ShopToolbarProps) {
  const { state, setSort } = useShopUrl();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // EN: Price is filtered client-side, so the count must be computed here too
  // FR: Le prix est filtré côté client, le compte doit donc aussi être calculé ici
  const filteredCount = applyPriceFilter(products, state.prices).length;
  const shown = Math.min(state.page * PAGE_SIZE, filteredCount);
  const activeFilterCount =
    (state.category ? 1 : 0) + state.tags.length + state.prices.length;
  const currentSortLabel = SORT_OPTIONS.find((option) => option.id === state.sort)?.label ?? "Pertinence";

  return (
    <div className="mb-[var(--space-lg)] flex items-center justify-between gap-[var(--space-md)]">
      {/* EN: Result count · FR: Compte de résultats */}
      <p className="text-body-m text-text-muted">
        {filteredCount === 0
          ? "Aucun produit"
          : `Affichage de ${shown} sur ${filteredCount} produits`}
      </p>

      <div className="flex items-center gap-[var(--space-sm)]">
        {/* EN: Mobile/tablet filter trigger (drawer) · FR: Déclencheur de filtres mobile/tablette (tiroir) */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={cn(
            "inline-flex h-10 items-center gap-[var(--space-sm)] rounded-md border border-border-default bg-bg-surface",
            "px-[var(--space-lg)] text-body-m font-medium text-text-primary",
            "transition-colors duration-[var(--duration-fast)] ease-out hover:border-action-primary hover:text-action-primary",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            "xl:hidden",
          )}
        >
          <IconAdjustmentsHorizontal aria-hidden="true" className="size-4" />
          <span>Filtres</span>
          {activeFilterCount > 0 && (
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-action-primary text-body-s font-semibold text-action-on-primary">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* EN: Sort dropdown · FR: Menu de tri */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            className={cn(
              "inline-flex h-10 items-center gap-[var(--space-sm)] rounded-md border border-border-default bg-bg-surface",
              "px-[var(--space-lg)] text-body-m font-medium text-text-primary",
              "transition-colors duration-[var(--duration-fast)] ease-out hover:border-action-primary hover:text-action-primary",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            )}
          >
            {/* EN: Hide the "Trier par :" prefix on very small screens
                FR: Masquer le préfixe « Trier par : » sur très petits écrans */}
            <span className="hidden sm:inline text-text-muted">Trier par :</span>
            <span>{currentSortLabel}</span>
            <IconChevronDown aria-hidden="true" className="size-4" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-[220px] rounded-md border border-border-subtle bg-base-white p-[var(--space-xs)] shadow-card-hover"
            >
              <DropdownMenu.RadioGroup value={state.sort} onValueChange={setSort}>
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenu.RadioItem
                    key={option.id}
                    value={option.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-[var(--space-md)] rounded-sm px-[var(--space-md)] py-[var(--space-sm)]",
                      "text-body-m text-text-primary outline-none",
                      "data-[highlighted]:bg-bg-tint data-[highlighted]:text-action-primary",
                    )}
                  >
                    <span>{option.label}</span>
                    <DropdownMenu.ItemIndicator>
                      <IconCheck aria-hidden="true" className="size-4 text-action-primary" />
                    </DropdownMenu.ItemIndicator>
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* EN: Filter drawer (tablet/mobile) · FR: Tiroir de filtres (tablette/mobile) */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Filtres">
        <ShopFilters categories={categories} tags={tags} totalCount={products.length} />
      </Drawer>
    </div>
  );
}
