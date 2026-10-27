"use client";

/**
 * EN: Single source of truth for the boutique filter/sort/pagination URL state.
 *     Every client control (filters, toolbar, pills, grid) mutates the URL
 *     through this hook, so the query-string format lives in exactly one place
 *     and can later be swapped to a server-driven flow without touching the
 *     components.
 * FR: Source unique de vérité pour l'état d'URL filtres/tri/pagination de la
 *     boutique. Chaque contrôle client (filtres, barre, pastilles, grille)
 *     mute l'URL via ce hook, donc le format de la query-string vit à un seul
 *     endroit et pourra plus tard être basculé vers un flux serveur sans
 *     toucher aux composants.
 */

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildShopSearchParams, parseShopParams, type ShopQueryState } from "@/lib/shop-filters";

interface NavigateOptions {
  /** EN: Replace instead of push (pagination) · FR: Remplacer au lieu d'empiler (pagination) */
  replace?: boolean;
  /** EN: Keep the current scroll position · FR: Conserver la position de défilement */
  scroll?: boolean;
}

/** EN: Mutate callback applied to a copy of the current search params · FR: Mutation appliquée à une copie des paramètres courants */
export type ShopParamsMutator = (params: URLSearchParams) => void;

/**
 * EN: Converts Next's read-only search params into the raw object parseShopParams
 *     expects, preserving repeated keys (tag/price) as arrays.
 * FR: Convertit les paramètres Next (lecture seule) en objet brut attendu par
 *     parseShopParams, en conservant les clés répétées (tag/price) en tableaux.
 */
function toRawSearchParams(searchParams: URLSearchParams): Record<string, string | string[]> {
  const raw: Record<string, string | string[]> = {};
  for (const key of new Set(searchParams.keys())) {
    const values = searchParams.getAll(key);
    raw[key] = values.length > 1 ? values : values[0];
  }
  return raw;
}

/**
 * EN: Reads the current shop state and exposes navigation helpers.
 * FR: Lit l'état boutique courant et expose les helpers de navigation.
 */
export function useShopUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state: ShopQueryState = parseShopParams(toRawSearchParams(searchParams));

  /* EN: Applies a mutation to the URL, preserving unrelated params.
   * FR: Applique une mutation à l'URL en préservant les paramètres non concernés. */
  const update = useCallback(
    (mutate: ShopParamsMutator, options: NavigateOptions = {}) => {
      const queryString = buildShopSearchParams(new URLSearchParams(searchParams.toString()), mutate);
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      const { replace = false, scroll = false } = options;
      if (replace) router.replace(url, { scroll });
      else router.push(url, { scroll });
    },
    [router, pathname, searchParams],
  );

  /* EN: Clears the pagination cursor — call on any filter/sort change.
   * FR: Supprime le curseur de pagination — à appeler à chaque changement de filtre/tri. */
  const resetPage = (params: URLSearchParams) => params.delete("page");

  const setCategory = useCallback(
    (slug: string | null) =>
      update((params) => {
        resetPage(params);
        if (slug) params.set("category", slug);
        else params.delete("category");
      }),
    [update],
  );

  const toggleTag = useCallback(
    (slug: string) =>
      update((params) => {
        resetPage(params);
        const current = params.getAll("tag");
        params.delete("tag");
        const next = current.includes(slug) ? current.filter((tag) => tag !== slug) : [...current, slug];
        next.forEach((tag) => params.append("tag", tag));
      }),
    [update],
  );

  const togglePrice = useCallback(
    (id: string) =>
      update((params) => {
        resetPage(params);
        const current = params.getAll("price");
        params.delete("price");
        const next = current.includes(id) ? current.filter((price) => price !== id) : [...current, id];
        next.forEach((price) => params.append("price", price));
      }),
    [update],
  );

  const setSort = useCallback(
    (id: string) =>
      update((params) => {
        resetPage(params);
        params.set("sort", id);
      }),
    [update],
  );

  const setPage = useCallback(
    (page: number) =>
      update(
        (params) => {
          if (page > 1) params.set("page", String(page));
          else params.delete("page");
        },
        { replace: true },
      ),
    [update],
  );

  /* EN: "Tout effacer" — clears filters + pagination, keeps the sort choice.
   * FR: « Tout effacer » — efface filtres + pagination, conserve le tri choisi. */
  const clearAll = useCallback(
    () =>
      update((params) => {
        params.delete("category");
        params.delete("tag");
        params.delete("price");
        params.delete("page");
      }),
    [update],
  );

  return { state, update, setCategory, toggleTag, togglePrice, setSort, setPage, clearAll };
}
