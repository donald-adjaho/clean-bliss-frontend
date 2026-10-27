/**
 * EN: Boutique page (Server Component) — assembles GUIDE.md § B.2: page intro,
 *     filter sidebar + results grid, then the reusable "Visit us" CTA (Header
 *     and Footer come from the root layout). All WooCommerce reads happen on
 *     the server through the shop data layer; the grid + filters then refine
 *     the result client-side through the URL.
 * FR: Page boutique (Server Component) — assemble GUIDE.md § B.2 : intro de
 *     page, barre de filtres + grille de résultats, puis le CTA « Rendez-nous
 *     visite » réutilisable (Header et Footer viennent du layout racine). Toutes
 *     les lectures WooCommerce se font côté serveur via la couche de données
 *     boutique ; la grille + les filtres affinent ensuite le résultat côté
 *     client via l'URL.
 */

import type { Metadata } from "next";
import { BoutiquePageHeader } from "@/components/shop/BoutiquePageHeader";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { ActiveFilterPills } from "@/components/shop/ActiveFilterPills";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { VisitCtaSection } from "@/components/sections/VisitCtaSection";
import { getShopCategories, getShopProducts, getShopTags } from "@/lib/api/products";
import { getVisitCtaSettings } from "@/lib/api/settings";
import { cn } from "@/lib/cn";
import { parseShopParams, sortToOrderby, type RawSearchParams } from "@/lib/shop-filters";

export const metadata: Metadata = {
  title: "Boutique — Clean & Bliss",
  description:
    "Découvrez toute la boutique Clean & Bliss à Cotonou : parfums, bougies, nettoyants, senteurs et diffuseurs, déodorants. Filtrez par catégorie, étiquette et prix.",
};

interface BoutiquePageProps {
  searchParams: Promise<RawSearchParams>;
}

export default async function BoutiquePage({ searchParams }: BoutiquePageProps) {
  // EN: Validate + read the filter state from the URL
  // FR: Valide + lit l'état des filtres depuis l'URL
  const params = await searchParams;
  const state = parseShopParams(params);

  // EN: Server-side data (category/tag filtering + sorting); price is client-side
  // FR: Données serveur (filtrage catégorie/étiquette + tri) ; le prix est côté client
  const [categories, tags, products, cta] = await Promise.all([
    getShopCategories(),
    getShopTags(),
    getShopProducts({
      category: state.category,
      tags: state.tags,
      orderby: sortToOrderby(state.sort),
    }),
    getVisitCtaSettings(),
  ]);

  return (
    <main>
      {/* § B.2.1 — Page header */}
      <BoutiquePageHeader />

      {/* § B.2.2 — Shop area: filters sidebar + results */}
      <section
        className={cn(
          "flex flex-col gap-[var(--space-xl)] xl:flex-row xl:items-start xl:gap-[var(--space-3xl)]",
          "px-[var(--space-mobile-h)] py-[var(--space-xl)] md:px-[var(--space-tablet)]",
          "xl:px-[var(--space-5xl)] xl:pt-[var(--space-xl)] xl:pb-[var(--space-8xl)]",
        )}
      >
        {/* EN: Desktop filter sidebar · FR: Barre latérale de filtres desktop */}
        <aside className="hidden w-[260px] shrink-0 xl:block">
          <ShopFilters categories={categories} tags={tags} totalCount={products.length} />
        </aside>

        {/* EN: Results column — toolbar, active pills, grid
            FR: Colonne de résultats — barre, pastilles actives, grille */}
        <div className="min-w-0 flex-1">
          <ShopToolbar categories={categories} tags={tags} products={products} />
          <ActiveFilterPills categories={categories} tags={tags} />
          <ProductGrid products={products} />
        </div>
      </section>

      {/* § B.2 — Reused "Visit us" CTA before the global footer */}
      <VisitCtaSection address={cta.address} phone={cta.phone} video={cta.video} />
    </main>
  );
}
