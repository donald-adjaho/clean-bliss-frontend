"use client";

/**
 * EN: ShopFilters — the boutique filter panel (GUIDE.md B.2.2/B.2.3): categories
 *     (radio), tags (checkbox) and price brackets (checkbox). Drives the URL
 *     through useShopUrl so it renders identically in the desktop sidebar and
 *     the mobile/tablet drawer.
 * FR: ShopFilters — le panneau de filtres de la boutique (GUIDE.md B.2.2/B.2.3) :
 *     catégories (radio), étiquettes (checkbox) et tranches de prix (checkbox).
 *     Pilote l'URL via useShopUrl afin de rendre identiquement dans la barre
 *     latérale desktop et le tiroir mobile/tablette.
 *
 * EN: "use client" required — controlled filters reading/writing the URL.
 * FR: "use client" requis — filtres contrôlés lisant/écrivant l'URL.
 */

import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup, type RadioOption } from "@/components/ui/RadioGroup";
import { useShopUrl } from "@/hooks/useShopUrl";
import { PRICE_RANGES } from "@/lib/shop-filters";
import type { ShopCategory, ShopTag } from "@/lib/api/products";

interface ShopFiltersProps {
  /** EN: Category options (radio) · FR: Options de catégorie (radio) */
  categories: ShopCategory[];
  /** EN: Tag options (checkbox) · FR: Options d'étiquette (checkbox) */
  tags: ShopTag[];
  /** EN: Total product count (shown on the "Toutes" option) · FR: Nombre total de produits (affiché sur l'option « Toutes ») */
  totalCount: number;
}

/* EN: A titled, separated filter group · FR: Un groupe de filtres titré et séparé */
function FilterGroup({
  title,
  children,
  first = false,
}: {
  title: string;
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className={
        first
          ? "flex flex-col gap-[var(--space-md)]"
          : "flex flex-col gap-[var(--space-md)] border-t border-border-subtle pt-[var(--space-xl)]"
      }
    >
      <h3 className="text-body-m font-semibold text-text-primary">{title}</h3>
      {children}
    </div>
  );
}

export function ShopFilters({ categories, tags, totalCount }: ShopFiltersProps) {
  const { state, setCategory, toggleTag, togglePrice, clearAll } = useShopUrl();
  const hasActive = Boolean(state.category) || state.tags.length > 0 || state.prices.length > 0;

  const categoryOptions: RadioOption[] = [
    { value: "", label: "Toutes les catégories", count: totalCount },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.name,
      count: category.count ?? undefined,
    })),
  ];

  return (
    <div className="flex flex-col gap-[var(--space-xl)]">
      {/* EN: Panel header — icon + title + reset · FR: En-tête du panneau — icône + titre + réinitialisation */}
      <div className="flex items-center justify-between gap-[var(--space-md)]">
        <span className="flex items-center gap-[var(--space-xs)]">
          <IconAdjustmentsHorizontal aria-hidden="true" className="size-[18px] text-text-primary" />
          <span className="text-body-m font-semibold text-text-primary">Filtrez avec précision</span>
        </span>
        {hasActive && (
          <button
            type="button"
            onClick={clearAll}
            className="text-body-s text-action-primary transition-colors duration-[var(--duration-fast)] ease-out hover:text-action-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            Tout effacer
          </button>
        )}
      </div>

      <FilterGroup title="Catégories" first>
        <RadioGroup
          value={state.category ?? ""}
          onValueChange={(value) => setCategory(value || null)}
          options={categoryOptions}
          label="Catégories"
          size="sm"
        />
      </FilterGroup>

      {tags.length > 0 && (
        <FilterGroup title="Étiquettes">
          <div className="flex flex-col gap-[var(--space-sm)]">
            {tags.map((tag) => (
              <Checkbox
                key={tag.slug}
                label={tag.name}
                count={tag.count ?? undefined}
                checked={state.tags.includes(tag.slug)}
                onChange={() => toggleTag(tag.slug)}
                size="sm"
              />
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title="Prix (FCFA)">
        <div className="flex flex-col gap-[var(--space-sm)]">
          {PRICE_RANGES.map((range) => (
            <Checkbox
              key={range.id}
              label={range.label}
              checked={state.prices.includes(range.id)}
              onChange={() => togglePrice(range.id)}
              size="sm"
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
