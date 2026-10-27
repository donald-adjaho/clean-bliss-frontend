/**
 * EN: Boutique loading UI — shown while the server fetches the catalogue.
 *     Mirrors the page header + filter sidebar + grid layout with pulsing
 *     placeholders (GUIDE.md B.2.9). The pulse is disabled under
 *     prefers-reduced-motion.
 * FR: UI de chargement de la boutique — affichée pendant que le serveur
 *     récupère le catalogue. Reprend la disposition en-tête + barre latérale +
 *     grille avec des placeholders pulsants (GUIDE.md B.2.9). La pulsation est
 *     désactivée sous prefers-reduced-motion.
 */

import { cn } from "@/lib/cn";

/* EN: Shared placeholder look — token background + pulse (motion-safe)
 * FR: Apparence de placeholder partagée — fond token + pulsation (motion-safe) */
const PLACEHOLDER = "animate-pulse rounded-sm bg-border-subtle motion-reduce:animate-none";

/* EN: One placeholder card · FR: Une carte placeholder */
function CardSkeleton() {
  return (
    <div className="flex flex-col gap-[var(--space-md)] rounded-xl border border-border-subtle bg-bg-tint p-[var(--space-lg)] pb-[var(--space-xl)]">
      <div className={cn(PLACEHOLDER, "h-[139px] w-full rounded-md md:h-[260px]")} />
      <div className={cn(PLACEHOLDER, "h-4 w-3/4")} />
      <div className={cn(PLACEHOLDER, "h-3 w-1/2")} />
      <div className="mt-[var(--space-xs)] flex items-center justify-between">
        <div className={cn(PLACEHOLDER, "h-6 w-24")} />
        <div className={cn(PLACEHOLDER, "size-8 rounded-full")} />
      </div>
    </div>
  );
}

export default function BoutiqueLoading() {
  return (
    <main aria-busy="true">
      {/* EN: Page header placeholder · FR: Placeholder d'en-tête */}
      <section className="flex items-center justify-center bg-bg-tint px-[var(--space-mobile-h)] py-[var(--space-mobile-v)] md:px-[var(--space-tablet)] md:py-[var(--space-7xl)] xl:h-[360px]">
        <div className="flex w-full flex-col items-center gap-[var(--space-lg)]">
          <div className={cn(PLACEHOLDER, "h-4 w-40")} />
          <div className={cn(PLACEHOLDER, "h-10 w-[min(560px,90%)] rounded-md")} />
          <div className={cn(PLACEHOLDER, "h-4 w-[min(620px,90%)]")} />
        </div>
      </section>

      {/* EN: Shop area placeholder · FR: Placeholder de la zone boutique */}
      <section
        className={cn(
          "flex flex-col gap-[var(--space-xl)] xl:flex-row xl:items-start xl:gap-[var(--space-3xl)]",
          "px-[var(--space-mobile-h)] py-[var(--space-xl)] md:px-[var(--space-tablet)]",
          "xl:px-[var(--space-5xl)] xl:pt-[var(--space-xl)] xl:pb-[var(--space-8xl)]",
        )}
      >
        <div className="hidden w-[260px] shrink-0 flex-col gap-[var(--space-xl)] xl:flex">
          <div className={cn(PLACEHOLDER, "h-5 w-40")} />
          <div className={cn(PLACEHOLDER, "h-40 w-full rounded-md")} />
          <div className={cn(PLACEHOLDER, "h-56 w-full rounded-md")} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-[var(--space-lg)] flex items-center justify-between">
            <div className={cn(PLACEHOLDER, "h-4 w-48")} />
            <div className={cn(PLACEHOLDER, "h-10 w-40 rounded-md")} />
          </div>
          <div className="grid grid-cols-2 gap-[var(--space-md)] md:gap-[var(--space-xl)] xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
