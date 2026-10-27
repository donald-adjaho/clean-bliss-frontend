/**
 * EN: Single GraphQL query assembling every data set the homepage needs
 *     (GUIDE.md § B.1) — WP settings, product categories and the three tagged
 *     product lists (best sellers, new arrivals, flash offers). One round-trip
 *     keeps the Server Component fast and cache-friendly.
 * FR: Requête GraphQL unique rassemblant tous les jeux de données nécessaires à
 *     l'accueil (GUIDE.md § B.1) — réglages WP, catégories produit et les trois
 *     listes de produits tagués (meilleures ventes, nouveautés, offres flash).
 *     Un seul aller-retour garde le Server Component rapide et cachable.
 */

import { fetchGraphQL } from "@/lib/wp-graphql";
import { stripHtml } from "@/lib/format";

/* EN: Image shape as returned by WPGraphQL (CleanBlissImage / MediaItem)
 * FR: Forme d'image renvoyée par WPGraphQL (CleanBlissImage / MediaItem) */
export interface WpImage {
  sourceUrl: string | null;
  altText: string | null;
}

/* EN: Product node as used by the product cards (kept minimal — only the
 *     fields the card renders are queried).
 * FR: Nœud produit tel qu'utilisé par les cartes produit (minimal — seuls les
 *     champs affichés par la carte sont interrogés). */
export interface HomeProduct {
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
  productTags: { nodes: { slug: string }[] };
  productCategories: { nodes: { name: string }[] };
}

/* EN: Product category tile (image + count) · FR: Tuile de catégorie produit (image + compte) */
export interface HomeCategory {
  name: string;
  slug: string;
  count: number | null;
  image: WpImage | null;
}

/* EN: A single testimonial flattened from a product review (§9) — the card
 *     shows the reviewed product image + the review itself.
 * FR: Un témoignage aplati depuis un avis produit (§9) — la carte affiche
 *     l'image du produit commenté + l'avis lui-même. */
export interface HomeTestimonial {
  /** EN: Stable id (product id + review index) · FR: Id stable (id produit + index d'avis) */
  id: string;
  /** EN: Review body (HTML stripped) · FR: Corps de l'avis (HTML retiré) */
  content: string;
  /** EN: Star rating 0–5 · FR: Note en étoiles 0–5 */
  rating: number;
  /** EN: Author display name · FR: Nom affiché de l'auteur */
  author: string;
  /** EN: ISO-ish review date · FR: Date de l'avis (quasi ISO) */
  date: string | null;
  /** EN: Reviewed product name · FR: Nom du produit commenté */
  productName: string;
  /** EN: Reviewed product image · FR: Image du produit commenté */
  productImage: WpImage | null;
}

/* EN: Business settings subset used on the homepage
 * FR: Sous-ensemble des réglages métier utilisés sur l'accueil */
export interface HomepageSettings {
  businessAdresse: string | null;
  businessPhone: string | null;
  businessMail: string | null;
  heroImage: WpImage | null;
  selection1Image: WpImage | null;
  selection2Image: WpImage | null;
  selection3Image: WpImage | null;
  whyUsImage: WpImage | null;
  ctaVideo: { sourceUrl: string | null; mimeType: string | null } | null;
  offresEndDate: string | null;
}

/* EN: Full homepage payload · FR: Charge utile complète de l'accueil */
export interface HomepageData {
  allSettings: HomepageSettings;
  productCategories: { nodes: HomeCategory[] };
  bestSellers: { nodes: HomeProduct[] };
  newArrivals: { nodes: HomeProduct[] };
  offers: { nodes: HomeProduct[] };
  testimonials: HomeTestimonial[];
}

/* EN: Raw review shape as returned by WooGraphQL — `rating` lives on the
 *     connection edge, the rest on the Comment node (WooGraphQL
 *     Connection/Comments.php).
 * FR: Forme brute d'un avis renvoyée par WooGraphQL — `rating` est porté par
 *     l'edge de connexion, le reste par le nœud Comment (WooGraphQL
 *     Connection/Comments.php). */
interface RawReviewProduct {
  databaseId: number;
  name: string;
  image: WpImage | null;
  reviews: {
    edges: {
      rating: number | null;
      node: {
        content: string | null;
        date: string | null;
        author: { node: { name: string | null } | null } | null;
      };
    }[];
  };
}

/* EN: Reusable product-card field selection — price lives on the
 *     ProductWithPricing interface, the rest on the Product interface.
 * FR: Sélection de champs réutilisable pour la carte produit — le prix est sur
 *     l'interface ProductWithPricing, le reste sur l'interface Product. */
const PRODUCT_CARD_FIELDS = `
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

const HOMEPAGE_QUERY = `
  query HomepageData {
    allSettings {
      businessAdresse
      businessPhone
      businessMail
      heroImage { sourceUrl altText }
      selection1Image { sourceUrl altText }
      selection2Image { sourceUrl altText }
      selection3Image { sourceUrl altText }
      whyUsImage { sourceUrl altText }
      ctaVideo { sourceUrl mimeType }
      offresEndDate
    }
    productCategories(first: 20, where: { hideEmpty: true }) {
      nodes { name slug count image { sourceUrl altText } }
    }
    bestSellers: products(first: 8, where: { tagIn: ["top-ventes"] }) {
      nodes { ${PRODUCT_CARD_FIELDS} }
    }
    newArrivals: products(first: 8, where: { tagIn: ["nouveautes"] }) {
      nodes { ${PRODUCT_CARD_FIELDS} }
    }
    offers: products(first: 8, where: { tagIn: ["offre-flash"] }) {
      nodes { ${PRODUCT_CARD_FIELDS} }
    }
    testimonials: products(first: 24, where: { orderby: { field: RATING, order: DESC } }) {
      nodes {
        databaseId
        name
        image { sourceUrl altText }
        reviews(first: 5) {
          edges {
            rating
            node {
              content
              date
              author { node { name } }
            }
          }
        }
      }
    }
  }
`;

/* EN: Shape actually returned by the network — `testimonials` arrives as a
 *     product connection carrying nested review edges and must be flattened.
 * FR: Forme réellement renvoyée par le réseau — `testimonials` arrive sous la
 *     forme d'une connexion de produits portant des avis imbriqués, à aplatir. */
type RawHomepageData = Omit<HomepageData, "testimonials"> & {
  testimonials: { nodes: RawReviewProduct[] };
};

/**
 * EN: Flattens reviewed products into a review list (§9). Keeps only reviews
 *     with a positive rating and a non-empty body; the section hides itself
 *     when the list is empty.
 * FR: Aplatit les produits commentés en une liste d'avis (§9). Ne garde que les
 *     avis avec une note positive et un texte non vide ; la section se masque
 *     quand la liste est vide.
 */
function flattenTestimonials(products: RawReviewProduct[]): HomeTestimonial[] {
  const testimonials: HomeTestimonial[] = [];

  for (const product of products) {
    product.reviews.edges.forEach((edge, index) => {
      const content = stripHtml(edge.node.content);
      const rating = edge.rating ?? 0;

      // EN: Skip empty stars / empty bodies · FR: Ignore les notes ou textes vides
      if (rating <= 0 || content === "") return;

      testimonials.push({
        id: `${product.databaseId}-${index}`,
        content,
        rating,
        author: edge.node.author?.node?.name ?? "Cliente Clean & Bliss",
        date: edge.node.date,
        productName: product.name,
        productImage: product.image,
      });
    });
  }

  return testimonials;
}

/**
 * EN: Fetches and shapes the homepage payload. The "uncategorized" bucket
 *     (count null, no image) is removed so only the five real product families
 *     feed the "Nos Univers" grid.
 * FR: Récupère et met en forme la charge utile de l'accueil. Le bac
 *     « uncategorized » (compte null, sans image) est retiré pour que seules
 *     les cinq vraies familles de produits alimentent la grille « Nos Univers ».
 */
export async function getHomepageData(): Promise<HomepageData> {
  const data = (await fetchGraphQL(HOMEPAGE_QUERY)) as RawHomepageData;

  return {
    ...data,
    productCategories: {
      nodes: data.productCategories.nodes.filter(
        (category) => category.slug !== "uncategorized" && category.count !== null,
      ),
    },
    testimonials: flattenTestimonials(data.testimonials.nodes),
  };
}
