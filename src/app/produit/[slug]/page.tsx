/**
 * EN: Product detail page (GUIDE.md §B.3). Server Component fetching the
 *     product by slug and rendering all sections in order.
 * FR: Page détail produit (GUIDE.md §B.3). Server Component récupérant le
 *     produit par slug et rendant toutes les sections dans l'ordre.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/api/products";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductFaq } from "@/components/product/ProductFaq";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductRecommended } from "@/components/product/ProductRecommended";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable — Clean & Bliss",
    };
  }

  const description = product.shortDescription
    ? product.shortDescription.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
    : `Découvrez ${product.name} sur Clean & Bliss.`;

  return {
    title: `${product.name} — Clean & Bliss`,
    description,
    openGraph: {
      title: `${product.name} — Clean & Bliss`,
      description,
      images: product.image?.sourceUrl ? [{ url: product.image.sourceUrl }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = product.productCategories?.nodes?.[0] || null;

  return (
    <main>
      <ProductBreadcrumb productName={product.name} categoryName={category?.name} categorySlug={category?.slug} />

      <section className="w-full bg-brand-surface">
        <div
          className={cn(
            "mx-auto grid gap-[var(--space-2xl)] xl:grid-cols-[55%_45%] xl:gap-[var(--space-4xl)]",
            "px-[var(--space-mobile-h)] pb-[var(--space-2xl)]",
            "md:px-[var(--space-tablet)]",
            "xl:px-[var(--space-5xl)] xl:pb-[var(--space-3xl)]",
          )}
        >
          <ProductGallery mainImage={product.image} galleryImages={product.galleryImages?.nodes || []} productName={product.name} />
          <ProductBuyBox product={product} />
        </div>
      </section>

      <ProductDetails description={product.description} />
      <ProductFaq categorySlug={category?.slug} />
      <ProductReviews product={product} />
      <ProductRecommended product={product} />
    </main>
  );
}
