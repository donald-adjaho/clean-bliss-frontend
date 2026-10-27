/**
 * EN: ProductCard — catalogue tile used by the homepage carousels (§3 best
 *     sellers, §4 new arrivals, §5 offers). Structure per GUIDE.md § B.1.3 and
 *     STRUCTURE-PAGES.md §3: image 240px, optional badge, name, category
 *     subtitle, stars, price + add-to-cart. Reuses Card + Badge + Button.
 * FR: ProductCard — tuile catalogue utilisée par les carrousels de l'accueil
 *     (§3 meilleures ventes, §4 nouveautés, §5 offres). Structure selon
 *     GUIDE.md § B.1.3 et STRUCTURE-PAGES.md §3 : image 240px, badge optionnel,
 *     nom, sous-titre catégorie, étoiles, prix + ajout au panier. Réutilise
 *     Card + Badge + Button.
 *
 * EN: No "use client" — presentational Server Component. The cart is wired in a
 *     later lot (B.4), so the "Ajouter" control is rendered but inert for now.
 * FR: Pas de "use client" — Server Component présentationnel. Le panier est
 *     câblé dans un lot ultérieur (B.4) ; le bouton « Ajouter » est donc rendu
 *     mais inactif pour l'instant.
 */

import Image from "next/image";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { cn } from "@/lib/cn";
import { computeDiscount, formatPrice } from "@/lib/format";
import type { HomeProduct } from "@/lib/queries/homepage";

/** EN: Which badge to force; "auto" derives it from tags/discount
    FR: Badge à forcer ; « auto » le déduit des tags/de la remise */
export type BadgeMode = "auto" | "bestSeller" | "new" | "promo" | "none";

/** EN: Card density — "default" = homepage carousel (image 240px, name h6);
 *      "catalogue" = boutique grid (image 260/139px, name body-l, font-heading price)
    FR: Densité de la carte — « default » = carrousel accueil (image 240px, nom h6) ;
         « catalogue » = grille boutique (image 260/139px, nom body-l, prix font-heading) */
export type ProductCardVariant = "default" | "catalogue";

interface ProductCardProps {
  /** EN: Product node from the homepage/shop query · FR: Nœud produit de la requête accueil/boutique */
  product: HomeProduct;
  /** EN: Override the CTA label (e.g. "J'en profite !" for §5) · FR: Surcharger le libellé du CTA (ex. « J'en profite ! » pour §5) */
  ctaLabel?: string;
  /** EN: Badge mode · FR: Mode de badge */
  badge?: BadgeMode;
  /** EN: Card density (GUIDE.md B.2.5 vs B.1.3) · FR: Densité de la carte (GUIDE.md B.2.5 vs B.1.3) */
  variant?: ProductCardVariant;
  className?: string;
}

/**
 * EN: Resolves the badge to display from the product tags / discount.
 * FR: Détermine le badge à afficher à partir des tags / de la remise.
 */
function resolveBadge(product: HomeProduct, mode: BadgeMode) {
  if (mode === "none") return null;

  const tags = product.productTags.nodes.map((tag) => tag.slug);
  const discount = computeDiscount(product.regularPrice, product.salePrice);

  if (mode === "promo" || (mode === "auto" && discount !== null)) {
    return discount !== null
      ? { variant: "promo" as const, label: `-${discount}%` }
      : null;
  }
  if (mode === "bestSeller" || (mode === "auto" && tags.includes("top-ventes"))) {
    return { variant: "bestseller" as const, label: "BESTSELLER" };
  }
  if (mode === "new" || (mode === "auto" && tags.includes("nouveautes"))) {
    return { variant: "new" as const, label: "NOUVEAU" };
  }
  return null;
}

/**
 * EN: Renders a 5-star rating row (filled up to the rounded average).
 * FR: Affiche une rangée de 5 étoiles (remplies jusqu'à la moyenne arrondie).
 */
function Rating({ rating, count }: { rating: number; count: number }) {
  // EN: No reviews yet → hide the row (avoids a misleading "0 ★")
  // FR: Aucun avis pour l'instant → masquer la rangée (évite un « 0 ★ » trompeur)
  if (count === 0) return null;

  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-[var(--space-xs)]">
      <span className="flex items-center text-brand-primary" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) =>
          index < filled ? (
            <IconStarFilled key={index} className="size-4" />
          ) : (
            <IconStar key={index} className="size-4" />
          ),
        )}
      </span>
      <span className="text-body-s text-text-muted">
        ({count})
      </span>
    </div>
  );
}

export function ProductCard({
  product,
  ctaLabel = "Ajouter",
  badge = "auto",
  variant = "default",
  className,
}: ProductCardProps) {
  // EN: Product routes are French — /produit/{slug} (GUIDE.md + revalidate route)
  // FR: Les routes produit sont en français — /produit/{slug} (GUIDE.md + route revalidate)
  const href = `/produit/${product.slug}`;
  const isCatalogue = variant === "catalogue";
  const categoryName = product.productCategories.nodes[0]?.name;
  const salePrice = formatPrice(product.salePrice);
  const regularPrice = formatPrice(product.regularPrice);
  const displayPrice = salePrice || formatPrice(product.price);
  const hasSale = product.onSale && salePrice !== "" && regularPrice !== "";
  const badgeData = resolveBadge(product, badge);

  return (
    <Card
      variant="product"
      gap="none"
      className={cn(
        // EN: Lift + shadow on hover (ANIMATIONS.md §3.3)
        // FR: Élévation + ombre au survol (ANIMATIONS.md §3.3)
        "group h-full transition-[box-shadow,transform] duration-[var(--duration-base)] ease-out",
        "shadow-card hover:-translate-y-1 hover:shadow-card-hover",
        // EN: Catalogue cards use a compact uniform padding on mobile (GUIDE.md B.2.5)
        // FR: Les cartes catalogue ont un padding uniforme compact sur mobile (GUIDE.md B.2.5)
        isCatalogue && "max-md:p-[var(--space-md)]",
        className,
      )}
    >
      <Link href={href} className="flex flex-1 flex-col gap-[var(--space-md)]">
        {/* EN: Image frame — 240px (homepage) or 260px/139px (catalogue). Product
                images are square (1088×1088); object-contain keeps the whole
                product in view (object-cover was cropping the packshots).
            FR: Cadre image — 240px (accueil) ou 260px/139px (catalogue). Les images
                produit sont carrées (1088×1088) ; object-contain garde tout le
                produit visible (object-cover rognait les packshots). */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-md bg-bg-surface",
            isCatalogue ? "h-[139px] md:h-[260px]" : "h-[240px]",
          )}
        >
          {product.image?.sourceUrl ? (
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              fill
              sizes={
                isCatalogue
                  ? "(max-width: 767px) 45vw, (max-width: 1279px) 45vw, 25vw"
                  : "(max-width: 767px) 278px, (max-width: 1023px) 33vw, 25vw"
              }
              className="object-contain transition-transform duration-[var(--duration-slow)] ease-out group-hover:scale-[1.04]"
            />
          ) : null}

          {badgeData && (
            <div className="absolute left-[var(--space-md)] top-[var(--space-md)]">
              <Badge variant={badgeData.variant}>{badgeData.label}</Badge>
            </div>
          )}
        </div>

        {/* EN: Name + subtitle + rating · FR: Nom + sous-titre + note */}
        <div className={cn("flex flex-col", isCatalogue ? "gap-[var(--space-2xs)]" : "gap-[var(--space-xs)]")}>
          <h3
            className={cn(
              "font-medium text-text-primary",
              isCatalogue ? "line-clamp-2 text-body-m md:line-clamp-none md:text-body-l" : "text-h6",
            )}
          >
            {product.name}
          </h3>
          {categoryName && <p className="text-body-m text-text-muted">{categoryName}</p>}
          <Rating rating={product.averageRating} count={product.reviewCount} />
        </div>
      </Link>

      {/* EN: Footer — price + add-to-cart · FR: Pied — prix + ajout au panier */}
      <div className="mt-[var(--space-md)] flex items-center justify-between gap-[var(--space-sm)]">
        <span className="flex flex-col">
          {hasSale && (
            <span className="text-body-s text-text-muted line-through">{regularPrice}</span>
          )}
          {/* EN: Catalogue price uses Manrope (like homepage cards). FR: Le prix catalogue utilise Manrope (comme les cartes accueil) */}
          <span
            className={cn(
              "text-text-primary",
              isCatalogue ? "text-body-l font-semibold md:text-body-xl" : "text-body-xl font-semibold",
            )}
          >
            {displayPrice}
          </span>
        </span>

        <AddToCartButton label={ctaLabel} ariaLabel={`Ajouter ${product.name} au panier`} />
      </div>
    </Card>
  );
}
