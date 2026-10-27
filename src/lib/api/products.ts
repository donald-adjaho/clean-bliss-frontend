/**
 * EN: Shop data-access layer (GUIDE.md § B.2). Every WooCommerce read used by
 *     the /boutique page lives here so the transport can be swapped in ONE
 *     place — today we fetch the whole matching catalogue (the boutique is
 *     small, ~95 products) and paginate client-side; the day we move to real
 *     server pagination (cursors in the URL), only this file changes.
 * FR: Couche d'accès aux données de la boutique (GUIDE.md § B.2). Toutes les
 *     lectures WooCommerce utilisées par la page /boutique vivent ici afin de
 *     pouvoir changer le transport à UN seul endroit — aujourd'hui on récupère
 *     tout le catalogue correspondant (la boutique est petite, ~95 produits) et
 *     on pagine côté client ; le jour où l'on passe à une vraie pagination
 *     serveur (curseurs dans l'URL), seul ce fichier change.
 *
 * EN: Server-only (imported by the /boutique Server Component).
 * FR: Côté serveur uniquement (importé par le Server Component /boutique).
 */

import { fetchGraphQL } from "@/lib/wp-graphql";
import type { WpImage } from "@/lib/queries/homepage";

/* EN: Re-exported here so shop components depend on one data module.
 * FR: Ré-exporté ici pour que les composants boutique dépendent d'un seul module. */
export type { WpImage };

/** EN: A product category filter option (radio group) · FR: Une option de filtre catégorie (radio) */
export interface ShopCategory {
  id: string;
  name: string;
  slug: string;
  count: number | null;
}

/** EN: A product tag filter option (checkbox) · FR: Une option de filtre étiquette (checkbox) */
export interface ShopTag {
  name: string;
  slug: string;
  count: number | null;
}

/* EN: Product node rendered by the catalogue card — identical shape to the
 *     homepage card so the same <ProductCard /> can render both.
 * FR: Nœud produit rendu par la carte catalogue — forme identique à la carte
 *     de l'accueil pour que le même <ProductCard /> rende les deux. */
export interface ShopProduct {
  databaseId: number;
  name: string;
  slug: string;
  price: string | null;
  regularPrice: string | null;
  salePrice: string | null;
  onSale: boolean;
  image: WpImage | null;
  averageRating: number;
  reviewCount: number;
  productTags: { nodes: { slug: string; name?: string }[] };
  productCategories: { nodes: { name: string; slug?: string }[] };
}

/* EN: Review shape returned by WooGraphQL (product.reviews.nodes)
 * FR: Forme d'avis renvoyée par WooGraphQL (product.reviews.nodes) */
export interface ProductReview {
  content: string | null;
  date: string | null;
  author: { node: { name: string | null } | null } | null;
}

/* EN: A single purchasable variation of a variable product (colour, size…)
 * FR: Une variation achetable d'un produit variable (couleur, taille…) */
export interface ProductVariation {
  databaseId: number;
  name: string | null;
  price: string | null;
  regularPrice: string | null;
  salePrice: string | null;
  onSale: boolean;
  stockStatus: string | null;
}

/* EN: Full product detail shape for /produit/[slug] (GUIDE.md §B.3.4)
 * FR: Forme complète du produit pour /produit/[slug] (GUIDE.md §B.3.4) */
export interface ProductDetail extends ShopProduct {
  shortDescription: string | null;
  description: string | null;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER" | string | null;
  stockQuantity: number | null;
  galleryImages: { nodes: WpImage[] };
  productCategories: { nodes: { slug: string; name: string }[] };
  productTags: { nodes: { slug: string; name: string }[] };
  variations: { nodes: ProductVariation[] };
  related: { nodes: ShopProduct[] };
  reviews: { nodes: ProductReview[] };
}

/* EN: Sort fields accepted by WooGraphQL (ProductsOrderByEnum subset we use).
 * FR: Champs de tri acceptés par WooGraphQL (sous-ensemble de ProductsOrderByEnum utilisé). */
export type ShopOrderField = "MENU_ORDER" | "DATE" | "PRICE" | "POPULARITY" | "RATING";
export type ShopOrderDirection = "ASC" | "DESC";
export interface ShopOrderby {
  field: ShopOrderField;
  order: ShopOrderDirection;
}

/** EN: Parameters accepted by getShopProducts · FR: Paramètres acceptés par getShopProducts */
export interface ShopProductsParams {
  /** EN: Category slug (radio filter) · FR: Slug de catégorie (filtre radio) */
  category?: string | null;
  /** EN: Tag slugs (checkbox filter, OR) · FR: Slugs d'étiquettes (filtre checkbox, OU) */
  tags?: string[];
  /** EN: Sort order (list — WooGraphQL requires an array) · FR: Ordre de tri (liste — WooGraphQL exige un tableau) */
  orderby?: ShopOrderby[];
}

/* EN: How many products per request while draining the connection. The
 *     boutique has ~95 products, so this is a single request today; the loop
 *     below future-proofs the >100 case without changing callers.
 * FR: Nombre de produits par requête en vidant la connexion. La boutique a
 *     ~95 produits, donc c'est une seule requête aujourd'hui ; la boucle
 *     ci-dessous couvre le cas >100 sans changer les appelants. */
const PRODUCTS_PER_PAGE = 100;

/* EN: Product-card field selection (price on ProductWithPricing, rest on
 *     Product) — mirrors the homepage selection.
 * FR: Sélection de champs de la carte produit (prix sur ProductWithPricing, le
 *     reste sur Product) — miroir de la sélection de l'accueil. */
const PRODUCT_FIELDS = `
  databaseId
  name
  slug
  ... on ProductWithPricing { price regularPrice salePrice }
  ... on Product {
    onSale
    image { sourceUrl altText }
    averageRating
    reviewCount
    productTags { nodes { slug } }
    productCategories(first: 1) { nodes { name } }
  }
`;

/* EN: Drains the products connection page by page (cursor loop) so callers
 *     always receive the complete, sorted, filtered set.
 * FR: Vide la connexion produits page par page (boucle de curseur) afin que les
 *     appelants reçoivent toujours l'ensemble complet, trié et filtré. */
const SHOP_PRODUCTS_QUERY = `
  query ShopProducts($first: Int!, $after: String, $where: RootQueryToProductConnectionWhereArgs) {
    products(first: $first, after: $after, where: $where) {
      pageInfo { hasNextPage endCursor }
      nodes { ${PRODUCT_FIELDS} }
    }
  }
`;

const SHOP_CATEGORIES_QUERY = `
  query ShopCategories {
    productCategories(first: 20, where: { hideEmpty: true }) {
      nodes { id name slug count }
    }
  }
`;

/* EN: Tags are fetched unfiltered then trimmed client-side so the query stays
 *     valid even if the `hideEmpty` where-arg is unavailable on product tags.
 * FR: Les étiquettes sont récupérées sans filtre puis épurées côté client afin
 *     que la requête reste valide même si l'argument `hideEmpty` n'existe pas
 *     pour les étiquettes produit. */
const SHOP_TAGS_QUERY = `
  query ShopTags {
    productTags(first: 100) {
      nodes { name slug count }
    }
  }
`;

const PRODUCT_DETAIL_FIELDS = `
  id
  databaseId
  name
  slug
  shortDescription
  description
  ... on ProductWithPricing { price regularPrice salePrice }
  ... on Product {
    onSale
    image { sourceUrl altText }
    averageRating
    reviewCount
    galleryImages { nodes { sourceUrl altText } }
    productTags { nodes { slug name } }
    productCategories(first: 1) { nodes { slug name } }
  }
  ... on InventoriedProduct {
    stockStatus
    stockQuantity
  }
  ... on ProductWithVariations {
    variations(first: 100) {
      nodes {
        databaseId
        name
        price
        regularPrice
        salePrice
        onSale
        ... on InventoriedProduct {
          stockStatus
        }
      }
    }
  }
  ... on Product {
    related(first: 8) {
      nodes { ${PRODUCT_FIELDS} }
    }
    reviews(first: 50) {
      nodes {
        content
        date
        author { node { name } }
      }
    }
  }
`;

const PRODUCT_BY_SLUG_QUERY = `
  query ProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ${PRODUCT_DETAIL_FIELDS}
    }
  }
`;

interface ProductBySlugResponse {
  product: ProductDetail | null;
}

interface ShopProductsResponse {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ShopProduct[];
  };
}

/**
 * EN: Fetches every product matching the filters, sorted server-side. Loops on
 *     the cursor until the connection is exhausted (hasNextPage === false).
 * FR: Récupère tous les produits correspondant aux filtres, triés côté serveur.
 *     Boucle sur le curseur jusqu'à épuisement de la connexion (hasNextPage === false).
 */
export async function getShopProducts(params: ShopProductsParams = {}): Promise<ShopProduct[]> {
  // EN: Build the WooGraphQL `where` only with the keys actually provided
  // FR: Construit le `where` WooGraphQL uniquement avec les clés réellement fournies
  const where: Record<string, unknown> = {};
  if (params.category) where.categoryIn = [params.category];
  if (params.tags && params.tags.length > 0) where.tagIn = params.tags;
  if (params.orderby && params.orderby.length > 0) where.orderby = params.orderby;

  const products: ShopProduct[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  // EN: Cursor loop — one iteration per 100 products
  // FR: Boucle de curseur — une itération par 100 produits
  while (hasNextPage) {
    const data = (await fetchGraphQL(SHOP_PRODUCTS_QUERY, {
      first: PRODUCTS_PER_PAGE,
      after,
      where,
    })) as ShopProductsResponse;

    products.push(...data.products.nodes);
    hasNextPage = data.products.pageInfo.hasNextPage;
    after = data.products.pageInfo.endCursor;
  }

  return products;
}

/**
 * EN: Fetches the product categories used by the category radio filter. The
 *     "uncategorized" bucket (count null) is dropped.
 * FR: Récupère les catégories produit utilisées par le filtre radio. Le bac
 *     « uncategorized » (compte null) est retiré.
 */
export async function getShopCategories(): Promise<ShopCategory[]> {
  const data = (await fetchGraphQL(SHOP_CATEGORIES_QUERY)) as {
    productCategories: { nodes: ShopCategory[] };
  };

  return data.productCategories.nodes.filter(
    (category) => category.slug !== "uncategorized" && category.count !== null,
  );
}

/**
 * EN: Fetches the product tags used by the tag checkbox filter (GUIDE.md B.2 —
 *     the boutique reuses the WooCommerce tags as its second filter group).
 * FR: Récupère les étiquettes produit utilisées par le filtre checkbox
 *     (GUIDE.md B.2 — la boutique réutilise les étiquettes WooCommerce comme
 *     second groupe de filtres).
 */
export async function getShopTags(): Promise<ShopTag[]> {
  const data = (await fetchGraphQL(SHOP_TAGS_QUERY)) as {
    productTags: { nodes: ShopTag[] };
  };

  // EN: Drop tags without any product so the filter never yields an empty result
  // FR: Retire les étiquettes sans produit pour que le filtre ne renvoie jamais un résultat vide
  return data.productTags.nodes.filter((tag) => tag.count !== null && tag.count > 0);
}

/**
 * EN: Fetches a single product by slug for the /produit/[slug] page.
 * FR: Récupère un produit unique par slug pour la page /produit/[slug].
 */
export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const data = (await fetchGraphQL(PRODUCT_BY_SLUG_QUERY, { slug })) as ProductBySlugResponse;
  return data.product ?? null;
}

