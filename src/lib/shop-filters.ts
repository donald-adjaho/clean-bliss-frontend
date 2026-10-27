/**
 * EN: Boutique filter/sort utilities (GUIDE.md § B.2). Pure, framework-free
 *     helpers shared by the Server Component (initial parse) and the client
 *     filter/toolbar/grid components (URL building). No React, no I/O.
 * FR: Utilitaires de filtres/tri de la boutique (GUIDE.md § B.2). Helpers purs,
 *     sans framework, partagés par le Server Component (parsing initial) et les
 *     composants client filtres/barre/grille (construction d'URL). Sans React,
 *     sans E/S.
 */

import { parsePriceAmount } from "@/lib/format";
import type { ShopOrderby, ShopProduct } from "@/lib/api/products";

/* EN: Raw search-params object as delivered by Next.js (string | string[] | undefined).
 * FR: Objet brut des paramètres d'URL fourni par Next.js (string | string[] | undefined). */
export type RawSearchParams = Record<string, string | string[] | undefined>;

/** EN: A price bracket filter (checkbox) · FR: Une tranche de prix (checkbox) */
export interface PriceRange {
  /** EN: URL value, e.g. "5-10" (thousands) · FR: Valeur d'URL, ex. « 5-10 » (milliers) */
  id: string;
  /** EN: Display label · FR: Libellé affiché */
  label: string;
  /** EN: Inclusive lower bound · FR: Borne inférieure incluse */
  min: number;
  /** EN: Exclusive-ish upper bound (null = open) · FR: Borne supérieure (null = ouverte) */
  max: number | null;
}

/* EN: Price brackets (GUIDE.md B.2.3) — values in FCFA. `id` keeps the GUIDE
 *     URL convention (thousands): ?price=5-10 · ?price=50-
 * FR: Tranches de prix (GUIDE.md B.2.3) — valeurs en FCFA. `id` suit la
 *     convention d'URL du GUIDE (milliers) : ?price=5-10 · ?price=50- */
export const PRICE_RANGES: readonly PriceRange[] = [
  { id: "0-5", label: "< 5 000", min: 0, max: 5000 },
  { id: "5-10", label: "5 000 – 10 000", min: 5000, max: 10000 },
  { id: "10-25", label: "10 000 – 25 000", min: 10000, max: 25000 },
  { id: "25-50", label: "25 000 – 50 000", min: 25000, max: 50000 },
  { id: "50-", label: "50 000 +", min: 50000, max: null },
] as const;

/** EN: Sort option id · FR: Identifiant d'option de tri */
export type ShopSortId = "pertinence" | "price-asc" | "price-desc" | "newest" | "bestsellers";

/** EN: A sort option (label + id) · FR: Une option de tri (libellé + id) */
export interface SortOption {
  id: ShopSortId;
  label: string;
}

/* EN: Sort labels (GUIDE.md B.2.4 order) · FR: Libellés de tri (ordre du GUIDE.md B.2.4) */
export const SORT_OPTIONS: readonly SortOption[] = [
  { id: "pertinence", label: "Pertinence" },
  { id: "price-asc", label: "Prix croissant" },
  { id: "price-desc", label: "Prix décroissant" },
  { id: "newest", label: "Nouveautés" },
  { id: "bestsellers", label: "Meilleures ventes" },
] as const;

/** EN: Default sort id · FR: Identifiant de tri par défaut */
export const DEFAULT_SORT: ShopSortId = "pertinence";

/* EN: Products per page (desktop 3-col grid → 3×3) · FR: Produits par page (grille 3 col → 3×3) */
export const PAGE_SIZE = 9;

/** EN: Parsed, validated shop URL state · FR: État d'URL boutique parsé et validé */
export interface ShopQueryState {
  category: string | null;
  tags: string[];
  prices: string[];
  sort: ShopSortId;
  page: number;
}

/* EN: Reads a raw search-param value that may be a single string or an array.
 * FR: Lit une valeur de paramètre qui peut être une chaîne ou un tableau. */
function toArray(value: string | string[] | undefined): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

/* EN: Reads the first value of a param (single-select). · FR: Lit la première valeur d'un paramètre (sélection unique). */
function first(value: string | string[] | undefined): string | null {
  const values = toArray(value);
  return values.length > 0 ? values[0] : null;
}

/**
 * EN: Maps a sort id to the WooGraphQL `orderby` list. Returns undefined for
 *     the default ("pertinence" → WooCommerce menu order), so we omit `where.orderby`.
 * FR: Convertit un id de tri en liste `orderby` WooGraphQL. Renvoie undefined
 *     pour le défaut (« pertinence » → ordre de menu WooCommerce), afin d'omettre `where.orderby`.
 */
export function sortToOrderby(sort: ShopSortId): ShopOrderby[] | undefined {
  switch (sort) {
    case "price-asc":
      return [{ field: "PRICE", order: "ASC" }];
    case "price-desc":
      return [{ field: "PRICE", order: "DESC" }];
    case "newest":
      return [{ field: "DATE", order: "DESC" }];
    case "bestsellers":
      return [{ field: "POPULARITY", order: "DESC" }];
    case "pertinence":
    default:
      return undefined;
  }
}

/**
 * EN: Parses and validates the shop search params. Unknown price/sort values
 *     are dropped and page is coerced to a positive integer.
 * FR: Parse et valide les paramètres d'URL boutique. Les valeurs de prix/tri
 *     inconnues sont ignorées et la page est ramenée à un entier positif.
 */
export function parseShopParams(sp: RawSearchParams): ShopQueryState {
  const rawCategory = first(sp.category);
  const category = rawCategory && rawCategory !== "all" && rawCategory !== "toutes" ? rawCategory : null;

  // EN: Keep only known price-range ids so the URL can't poison the filter
  // FR: Ne garde que les ids de tranche connus pour que l'URL ne puisse pas fausser le filtre
  const knownPriceIds = new Set(PRICE_RANGES.map((range) => range.id));
  const prices = toArray(sp.price).filter((id) => knownPriceIds.has(id));

  const tags = Array.from(new Set(toArray(sp.tag).filter(Boolean)));

  const rawSort = first(sp.sort);
  const sort: ShopSortId =
    rawSort && SORT_OPTIONS.some((option) => option.id === rawSort) ? (rawSort as ShopSortId) : DEFAULT_SORT;

  const rawPage = Number.parseInt(first(sp.page) ?? "", 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  return { category, tags, prices, sort, page };
}

/* EN: Applies a mutation to a copy of the current search params and serialises
 *     it — shared by every client control so URL building stays in one place.
 * FR: Applique une mutation à une copie des paramètres courants puis sérialise
 *     — partagé par tous les contrôles client pour centraliser la construction d'URL. */
export function buildShopSearchParams(sp: URLSearchParams, mutate: (next: URLSearchParams) => void): string {
  const next = new URLSearchParams(sp.toString());
  mutate(next);
  return next.toString();
}

/**
 * EN: Returns the display label of a price-range id (empty string if unknown).
 * FR: Renvoie le libellé d'affichage d'un id de tranche (chaîne vide si inconnu).
 */
export function priceRangeLabel(id: string): string {
  return PRICE_RANGES.find((range) => range.id === id)?.label ?? id;
}

/**
 * EN: Client-side price filtering. A product matches when its (minimum) price
 *     falls in ANY selected bracket (OR). Products with no parsable price are
 *     kept only when no bracket is selected.
 * FR: Filtrage prix côté client. Un produit correspond quand son prix (minimum)
 *     tombe dans AU MOINS une tranche sélectionnée (OU). Les produits sans prix
 *     exploitable ne sont gardés que si aucune tranche n'est sélectionnée.
 */
export function applyPriceFilter(products: ShopProduct[], priceIds: string[]): ShopProduct[] {
  if (priceIds.length === 0) return products;

  const ranges = PRICE_RANGES.filter((range) => priceIds.includes(range.id));

  return products.filter((product) => {
    // EN: Variable products expose a range ("7 900 CFA - 11 900 CFA") → min price
    // FR: Les produits variables exposent une plage (« 7 900 CFA - 11 900 CFA ») → prix mini
    const amount = parsePriceAmount(product.price);
    if (amount == null) return false;

    return ranges.some((range) => amount >= range.min && (range.max == null || amount < range.max));
  });
}

/**
 * EN: True when any filter (category, tag, price) is active — drives the
 *     "Tout effacer" affordance and the active-pills row.
 * FR: Vrai dès qu'un filtre (catégorie, étiquette, prix) est actif — pilote
 *     l'affordance « Tout effacer » et la rangée de pastilles actives.
 */
export function hasActiveFilters(state: Pick<ShopQueryState, "category" | "tags" | "prices">): boolean {
  return Boolean(state.category) || state.tags.length > 0 || state.prices.length > 0;
}

/**
 * EN: Builds the compact page list for the numbered pagination with ellipses
 *     (GUIDE.md B.2.6 — "…" when more than 5 pages). Always shows first, last
 *     and a window around the current page.
 * FR: Construit la liste compacte des pages avec points de suspension
 *     (GUIDE.md B.2.6 — « … » au-delà de 5 pages). Affiche toujours la première,
 *     la dernière et une fenêtre autour de la page courante.
 */
export function buildPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (page - previous > 1) result.push("ellipsis");
    result.push(page);
    previous = page;
  }
  return result;
}
