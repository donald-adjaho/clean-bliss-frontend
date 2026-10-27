/**
 * EN: BoutiquePageHeader — the shop page intro band (GUIDE.md B.2.1). Tint
 *     background (#EBF6FB), centred eyebrow + title + description, 360px tall on
 *     desktop. Server Component (no interactivity).
 * FR: BoutiquePageHeader — bandeau d'introduction de la boutique (GUIDE.md B.2.1).
 *     Fond teinté (#EBF6FB), eyebrow + titre + description centrés, hauteur
 *     360px sur desktop. Server Component (aucune interactivité).
 */

import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/cn";

export function BoutiquePageHeader() {
  return (
    <section
      className={cn(
        "flex w-full items-center justify-center bg-bg-tint",
        // EN: Mobile/tablet rhythm, then a fixed 360px centred band on desktop
        // FR: Rythme mobile/tablette, puis un bandeau centré de 360px sur desktop
        "px-[var(--space-mobile-h)] py-[var(--space-mobile-v)]",
        "md:px-[var(--space-tablet)] md:py-[var(--space-7xl)]",
        "xl:h-[360px] xl:px-[var(--space-5xl)] xl:py-[var(--space-7xl)]",
      )}
    >
      <Reveal selector="[data-header-item]" stagger={0.1} className="flex w-full flex-col items-center text-center">
        {/* EN: Eyebrow · FR: Sur-titre */}
        <p
          data-header-item
          className="text-body-m font-semibold uppercase tracking-[0.12em] text-action-primary"
        >
          Tout à portée de main
        </p>

        {/* EN: Title (H2 52px) · FR: Titre (H2 52px) */}
        <h1
          data-header-item
          className="mt-[var(--space-md)] text-h3 font-normal text-text-primary md:text-h2"
        >
          Explorer notre boutique dans son intégralité
        </h1>

        {/* EN: Description · FR: Description */}
        <p
          data-header-item
          className="mt-[var(--space-lg)] max-w-[620px] text-body-l text-text-secondary"
        >
          Parfums, bougies, nettoyants, senteurs et déodorants : retrouvez toutes nos
          références réunies en un seul endroit, avec nos filtres pour aller droit au but.
        </p>
      </Reveal>
    </section>
  );
}
