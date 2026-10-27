/**
 * EN: Footer brand block (Server Component) — stacked brand title, slogan,
 *     description and the 3 social circles (Instagram, TikTok, WhatsApp).
 *     Specs: GUIDE.md A.2.2 (sous-zone 1) + A.2.3 (copywriting).
 * FR: Bloc marque du footer (Server Component) — titre de marque empilé,
 *     slogan, description et les 3 cercles sociaux (Instagram, TikTok,
 *     WhatsApp). Specs : GUIDE.md A.2.2 (sous-zone 1) + A.2.3 (copywriting).
 */

import { SOCIAL_LINKS } from "@/components/header/HeaderNav";
import { cn } from "@/lib/cn";

export function FooterBrand() {
  return (
    // EN: Left column — fixed 360px width on desktop (GUIDE.md A.2.2)
    // FR: Colonne gauche — largeur fixe 360px sur desktop (GUIDE.md A.2.2)
    <div className="flex flex-col xl:w-[360px] xl:shrink-0">
      {/* EN: Brand title — Cormorant Garamond 26px, pure white
          FR: Titre de marque — Cormorant Garamond 26px, blanc pur */}
      <p className="font-heading text-h5 leading-tight text-base-white">Clean &amp; Bliss</p>

      {/* EN: Slogan — body-s, footer-link color, 4px top margin
          FR: Slogan — body-s, couleur footer-link, marge haute 4px */}
      <p className="mt-[var(--space-2xs)] text-body-s text-footer-link">
        Beauté, Cosmétique et Soins.
      </p>

      {/* EN: Description — body-m, footer-text color, max width 340px
          FR: Description — body-m, couleur footer-text, largeur max 340px */}
      <p className="mt-[var(--space-sm)] max-w-[340px] text-body-m text-footer-text">
        Votre référence ultime à Cotonou pour la parfumerie fine, les bougies
        d&apos;ambiance et les produits de nettoyage haute fraîcheur.
      </p>

      {/* EN: Social circles — 40×40px, 1px border (footer-border token), 18px icons.
          Hover: reinforced border + slight scale (ANIMATIONS.md, reduced-motion safe).
          FR: Cercles sociaux — 40×40px, bordure 1px (token footer-border), icônes
          18px. Hover : bordure renforcée + léger scale (ANIMATIONS.md, safe
          prefers-reduced-motion). */}
      <ul className="mt-[var(--space-xl)] flex items-center gap-[var(--space-sm)]">
        {SOCIAL_LINKS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full",
                "border border-footer-border text-base-white",
                "transition-[border-color,transform] duration-fast ease-out",
                "hover:border-brand-surface",
                "motion-safe:hover:scale-105",
                // EN: White focus ring for AA visibility on the dark background
                // FR: Anneau de focus blanc pour une visibilité AA sur fond sombre
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-white",
              )}
            >
              <social.icon aria-hidden="true" className="size-[18px]" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
