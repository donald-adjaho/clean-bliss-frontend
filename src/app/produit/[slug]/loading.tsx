/**
 * EN: Product detail loading skeleton (GUIDE.md §B.3.5)
 * FR: Squelette de chargement fiche produit (GUIDE.md §B.3.5)
 */

import { cn } from "@/lib/cn";

const PLACEHOLDER = "animate-pulse rounded-sm bg-border-subtle motion-reduce:animate-none";

export default function ProductLoading() {
  return (
    <main aria-busy="true">
      <div className="mx-auto flex items-center gap-[var(--space-sm)] px-[var(--space-mobile-h)] py-[var(--space-md)] md:px-[var(--space-tablet)] xl:px-[var(--space-5xl)] xl:py-[var(--space-xl)]">
        <div className={cn(PLACEHOLDER, "h-4 w-16")} />
        <div className={cn(PLACEHOLDER, "h-4 w-16")} />
        <div className={cn(PLACEHOLDER, "h-4 w-40")} />
      </div>

      <section className="w-full bg-brand-surface">
        <div className="mx-auto grid gap-[var(--space-2xl)] px-[var(--space-mobile-h)] pb-[var(--space-2xl)] md:px-[var(--space-tablet)] xl:grid-cols-[55%_45%] xl:gap-[var(--space-4xl)] xl:px-[var(--space-5xl)] xl:pb-[var(--space-3xl)]">
          <div className="flex flex-col gap-[var(--space-md)]">
            <div className={cn(PLACEHOLDER, "aspect-square w-full rounded-[var(--radius-lg)]")} />
            <div className="flex gap-[var(--space-md)]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(PLACEHOLDER, "h-[78px] w-[78px] rounded-[var(--radius-md)]")} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-xl)]">
            <div className={cn(PLACEHOLDER, "h-6 w-40")} />
            <div className={cn(PLACEHOLDER, "h-10 w-3/4")} />
            <div className={cn(PLACEHOLDER, "h-8 w-40")} />
            <div className={cn(PLACEHOLDER, "h-16 w-full")} />
            <div className={cn(PLACEHOLDER, "h-12 w-full")} />
            <div className={cn(PLACEHOLDER, "h-12 w-full")} />
          </div>
        </div>
      </section>
    </main>
  );
}
