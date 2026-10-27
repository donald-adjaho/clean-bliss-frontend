"use client";

/**
 * EN: ActiveFilterPills — removable chips summarising the active filters
 *     (GUIDE.md B.2.7): one pill per selected category/tag/price, each with an
 *     ✕, plus a "Tout effacer" action. Renders nothing when no filter is active.
 * FR: ActiveFilterPills — pastilles amovibles résumant les filtres actifs
 *     (GUIDE.md B.2.7) : une pastille par catégorie/étiquette/prix sélectionné,
 *     chacune avec un ✕, plus une action « Tout effacer ». N'affiche rien si
 *     aucun filtre n'est actif.
 *
 * EN: "use client" required — reads/writes the URL.
 * FR: "use client" requis — lit/écrit l'URL.
 */

import { IconX } from "@tabler/icons-react";
import { useShopUrl } from "@/hooks/useShopUrl";
import { cn } from "@/lib/cn";
import { priceRangeLabel } from "@/lib/shop-filters";
import type { ShopCategory, ShopTag } from "@/lib/api/products";

interface ActiveFilterPillsProps {
  categories: ShopCategory[];
  tags: ShopTag[];
}

/* EN: A single removable pill · FR: Une pastille amovible */
function Pill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[var(--space-xs)] rounded-full border border-border-subtle bg-bg-surface",
        "py-[var(--space-2xs)] pl-[var(--space-md)] pr-[var(--space-xs)] text-body-s text-text-primary",
      )}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Retirer le filtre ${label}`}
        className={cn(
          "inline-flex size-5 items-center justify-center rounded-full text-text-muted",
          "transition-[transform,color] duration-[var(--duration-fast)] ease-out hover:text-action-primary active:scale-90",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        )}
      >
        <IconX aria-hidden="true" className="size-3.5" />
      </button>
    </span>
  );
}

export function ActiveFilterPills({ categories, tags }: ActiveFilterPillsProps) {
  const { state, setCategory, toggleTag, togglePrice, clearAll } = useShopUrl();

  const hasActive = Boolean(state.category) || state.tags.length > 0 || state.prices.length > 0;
  if (!hasActive) return null;

  const categoryName = state.category
    ? categories.find((category) => category.slug === state.category)?.name ?? state.category
    : null;

  return (
    <div className="mb-[var(--space-lg)] flex flex-wrap items-center gap-[var(--space-xs)]">
      {categoryName && <Pill label={categoryName} onRemove={() => setCategory(null)} />}

      {state.tags.map((slug) => (
        <Pill
          key={slug}
          label={tags.find((tag) => tag.slug === slug)?.name ?? slug}
          onRemove={() => toggleTag(slug)}
        />
      ))}

      {state.prices.map((id) => (
        <Pill key={id} label={priceRangeLabel(id)} onRemove={() => togglePrice(id)} />
      ))}

      <button
        type="button"
        onClick={clearAll}
        className="ml-[var(--space-xs)] text-body-s font-medium text-action-primary transition-colors duration-[var(--duration-fast)] ease-out hover:text-action-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        Tout effacer
      </button>
    </div>
  );
}
