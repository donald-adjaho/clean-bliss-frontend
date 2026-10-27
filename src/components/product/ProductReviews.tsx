/**
 * EN: ProductReviews — summary, filters, list (GUIDE.md §B.3.2 §5)
 * FR: Avis produit — résumé, filtres, liste (GUIDE.md §B.3.2 §5)
 */

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { ProductDetail } from "@/lib/api/products";
import { decodeHtmlEntities } from "@/lib/format";

interface ProductReviewsProps {
  product: ProductDetail;
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return decodeHtmlEntities(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "CB";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts[1]?.[0] || parts[0]?.[1] || "";
  return (first + last).toUpperCase();
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const reviews = product.reviews?.nodes || [];
  const avg = product.averageRating || 0;
  const count = product.reviewCount || 0;

  const filters = ["Tous", "5★", "4★", "3★", "2★", "1★", "Avec photos"];

  return (
    <section id="avis" className="w-full bg-bg-surface">
      <div
        className={cn(
          "mx-auto flex flex-col gap-[var(--space-2xl)]",
          "px-[var(--space-mobile-h)] py-[var(--space-3xl)]",
          "md:px-[var(--space-tablet)]",
          "xl:px-[var(--space-5xl)]",
        )}
      >
        <h2 className="font-heading text-h4 text-text-primary">Avis des Clients</h2>

        <div className="flex flex-col gap-[var(--space-xl)] rounded-[var(--radius-md)] border border-border-subtle p-[var(--space-xl)] md:flex-row md:items-center">
          <div className="flex flex-col items-center gap-[var(--space-sm)] md:w-[280px]">
            <span className="font-heading text-[64px] leading-none text-text-primary">{avg.toFixed(1)}</span>
            <span className="text-body-m text-action-primary">{"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}</span>
            <span className="text-body-m text-text-muted">Basé sur {count} avis</span>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-[var(--space-md)] py-[var(--space-xs)]">
                <span className="w-10 text-body-m text-text-primary">{stars} ★</span>
                <div className="h-2 flex-1 rounded-full bg-neutral-100">
                  <div className="h-2 rounded-full bg-action-primary" style={{ width: stars === 5 ? "80%" : "10%" }} />
                </div>
                <span className="w-10 text-right text-body-m text-text-muted">{stars === 5 ? "80%" : "10%"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
          {filters.map((f, idx) => (
            <button
              key={f}
              type="button"
              className={cn(
                "inline-flex h-8 items-center rounded-full px-[var(--space-md)] text-body-m transition-colors",
                idx === 0
                  ? "bg-action-primary text-base-white"
                  : "border border-border-default bg-bg-surface text-text-secondary hover:border-action-primary hover:text-action-primary",
              )}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto">
            <Button variant="secondary">Écrire un avis</Button>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-[var(--space-md)] rounded-[var(--radius-md)] border border-border-subtle p-[var(--space-2xl)] text-center">
            <p className="text-body-l text-text-primary">Aucun avis pour le moment. Soyez le premier à donner votre opinion !</p>
            <Button variant="primary">Écrire un avis</Button>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border-subtle rounded-[var(--radius-md)] border border-border-subtle">
            {reviews.slice(0, 5).map((review, idx) => {
              const author = review.author?.node?.name || "Cliente Clean & Bliss";
              const content = stripHtml(review.content);
              return (
                <article key={idx} className="flex flex-col gap-[var(--space-md)] p-[var(--space-xl)]">
                  <div className="flex items-center justify-between gap-[var(--space-md)]">
                    <div className="flex items-center gap-[var(--space-md)]">
                      <div className="inline-flex size-11 items-center justify-center rounded-full bg-bg-tint text-body-m font-semibold text-action-primary">
                        {getInitials(author)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-[var(--space-sm)]">
                          <span className="text-body-m font-medium text-text-primary">{author}</span>
                        </div>
                        <span className="text-body-s text-text-muted">{review.date ? new Date(review.date).toLocaleDateString("fr-FR") : ""}</span>
                      </div>
                    </div>
                  </div>
                  {content && <p className="text-body-m text-text-secondary">{content}</p>}
                </article>
              );
            })}
          </div>
        )}

        {reviews.length > 5 && (
          <div className="flex justify-center">
            <Button variant="secondary">Charger plus</Button>
          </div>
        )}
      </div>
    </section>
  );
}
