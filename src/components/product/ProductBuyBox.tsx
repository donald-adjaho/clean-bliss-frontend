/**
 * EN: ProductBuyBox — badges, title, price, short description, quantity,
 *     variations, delivery method, CTAs, reassurance (GUIDE.md §B.3.2)
 * FR: BuyBox produit — badges, titre, prix, description courte, quantité,
 *     déclinaisons, méthode de livraison, CTA, réassurance (GUIDE.md §B.3.2)
 */

"use client";

import { IconHeart, IconMinus, IconPlus, IconRefresh, IconRotateClockwise, IconShieldCheck, IconShoppingBag, IconTruck } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/shared/AddToCartButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { cn } from "@/lib/cn";
import { decodeHtmlEntities, formatPrice, parsePriceAmount } from "@/lib/format";
import type { ProductDetail } from "@/lib/api/products";

interface ProductBuyBoxProps {
  product: ProductDetail;
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  const decoded = decodeHtmlEntities(html);
  return decoded.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState("retrait");

  const tags = product.productTags?.nodes?.map((t) => t.slug) || [];
  const hasBestseller = tags.includes("top-ventes");
  const hasNew = tags.includes("nouveautes");
  const isOnSale = !!product.onSale && product.salePrice;
  const regular = parsePriceAmount(product.regularPrice);
  const sale = parsePriceAmount(product.salePrice);
  const discountPct =
    isOnSale && regular != null && sale != null && regular > 0 && sale > 0
      ? Math.round(((regular - sale) / regular) * 100)
      : 0;

  const shortDesc = useMemo(() => stripHtml(product.shortDescription), [product.shortDescription]);

  const inStock = product.stockStatus === "IN_STOCK";
  const outOfStock = product.stockStatus === "OUT_OF_STOCK";

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(product.stockQuantity || 99, q + 1));

  return (
    <div className="flex w-full flex-col gap-[var(--space-xl)]">
      <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
        {hasBestseller && <Badge>Bestseller</Badge>}
        {hasNew && <Badge>Nouveau</Badge>}
        {isOnSale && discountPct > 0 && <Badge>-{discountPct}%</Badge>}
      </div>

      <div className="flex flex-col gap-[var(--space-sm)]">
        <h1 className="font-heading text-h3 text-text-primary">{product.name}</h1>
        <div className="flex items-center gap-[var(--space-sm)] text-body-m">
          <span className="text-action-primary">★ {product.averageRating?.toFixed(1) || "0.0"}</span>
          <span className="text-text-muted">·</span>
          <a href="#avis" className="text-text-muted transition-colors hover:text-action-primary">
            {product.reviewCount || 0} avis
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-[var(--space-md)]">
        {isOnSale && product.regularPrice ? (
          <>
            <span className="text-body-l text-text-muted line-through">{formatPrice(product.regularPrice)}</span>
            <span className="font-heading text-h4 text-action-primary">{formatPrice(product.salePrice || product.price)}</span>
            {discountPct > 0 && <Badge>-{discountPct}%</Badge>}
          </>
        ) : (
          <span className="font-heading text-h4 text-text-primary">{formatPrice(product.price)}</span>
        )}
      </div>

      {shortDesc && <p className="text-body-m text-text-secondary">{shortDesc}</p>}

      <div className="h-px w-full bg-border-subtle" />

      <div className="flex flex-col gap-[var(--space-md)]">
        <span className="text-body-m font-semibold text-text-primary">Quantité</span>
        <div className="inline-flex h-12 w-[116px] items-center rounded-[var(--radius-sm)] border border-border-default">
          <button
            type="button"
            onClick={decrease}
            aria-label="Diminuer la quantité"
            className="inline-flex h-full w-11 items-center justify-center text-text-primary transition-colors hover:bg-bg-tint"
          >
            <IconMinus aria-hidden="true" className="size-4" />
          </button>
          <span className="flex-1 text-center text-body-m font-medium text-text-primary">{quantity}</span>
          <button
            type="button"
            onClick={increase}
            aria-label="Augmenter la quantité"
            className="inline-flex h-full w-11 items-center justify-center text-text-primary transition-colors hover:bg-bg-tint"
          >
            <IconPlus aria-hidden="true" className="size-4" />
          </button>
        </div>
        {outOfStock && <span className="text-body-s text-danger">Rupture de stock</span>}
      </div>

      <div className="flex flex-col gap-[var(--space-md)]">
        <span className="text-body-m font-semibold text-text-primary">Méthode de livraison</span>
        <RadioGroup
          value={delivery}
          onValueChange={setDelivery}
          options={[
            { value: "retrait", label: "Retrait en boutique · Gratuit · Sous 14 jours" },
            { value: "livraison", label: "Livraison à domicile · 1 000 – 2 000 FCFA · Cotonou, Calavi, Akpakpa" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-[var(--space-md)] sm:flex-row">
        <Button variant="secondary" className="flex-1" icon={<IconHeart aria-hidden="true" className="size-4" />} iconPosition="left">
          Ajouter à la liste
        </Button>
        {inStock ? (
          <div className="[&>button]:h-12 [&>button]:w-full sm:[&>button]:w-auto">
            <AddToCartButton label="Ajouter au panier" ariaLabel={`Ajouter ${product.name} au panier`} />
          </div>
        ) : (
          <Button variant="primary" disabled className="flex-1" icon={<IconShoppingBag aria-hidden="true" className="size-4" />} iconPosition="left">
            Rupture de stock
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-[var(--space-md)] rounded-[var(--radius-md)] bg-bg-tint p-[var(--space-lg)]">
        <div className="flex items-center gap-[var(--space-md)]">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-base-white text-action-primary">
            <IconTruck aria-hidden="true" className="size-5" />
          </span>
          <span className="text-body-m text-text-primary">Retrait gratuit en boutique sous 14 jours</span>
        </div>
        <div className="flex items-center gap-[var(--space-md)]">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-base-white text-action-primary">
            <IconRotateClockwise aria-hidden="true" className="size-5" />
          </span>
          <span className="text-body-m text-text-primary">Retours faciles sous 30 jours</span>
        </div>
        <div className="flex items-center gap-[var(--space-md)]">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-base-white text-action-primary">
            <IconShieldCheck aria-hidden="true" className="size-5" />
          </span>
          <span className="text-body-m text-text-primary">Paiement MoMo sécurisé</span>
        </div>
      </div>
    </div>
  );
}
