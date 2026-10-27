/**
 * EN: Footer bottom bar (Server Component) — separator line, copyright,
 *     back-to-top button and the 2 legal links. Desktop: 3 zones
 *     justify-between; mobile: stacked and centered (GUIDE.md A.2.2).
 * FR: Barre du bas du footer (Server Component) — ligne de séparation,
 *     copyright, bouton retour en haut et les 2 liens légaux. Desktop :
 *     3 zones justify-between ; mobile : empilé et centré (GUIDE.md A.2.2).
 */

import { BackToTopButton } from "@/components/footer/BackToTopButton";
import { cn } from "@/lib/cn";

/* EN: Legal links — real target routes (pages to be built later)
   FR: Liens légaux — routes cibles réelles (pages à construire plus tard) */
const LEGAL_LINKS = [
  { label: "Politiques de remboursements", href: "/politiques-de-remboursement" },
  { label: "Conditions générales", href: "/conditions-generales" },
] as const;

export function FooterBottom() {
  return (
    <div>
      {/* EN: Separator — 1px footer-border, 40px vertical margin (GUIDE.md A.2.2)
          FR: Séparateur — 1px footer-border, marge verticale 40px (GUIDE.md A.2.2) */}
      <hr className="my-[var(--space-3xl)] border-t border-footer-border" />

      {/* EN: Bottom row — stacked/centered on mobile, 3 zones on desktop
          FR: Rangée du bas — empilée/centrée sur mobile, 3 zones sur desktop */}
      <div className="flex flex-col items-center gap-[var(--space-lg)] text-center md:flex-row md:justify-between md:text-left">
        {/* EN: Left — copyright (body-s, footer-link)
            FR: Gauche — copyright (body-s, footer-link) */}
        <p className="text-body-s text-footer-link">
          © 2026 Clean &amp; Bliss. Tous droits réservés.
        </p>

        {/* EN: Center — back-to-top button (hidden on mobile)
            FR: Centre — bouton retour en haut (masqué sur mobile) */}
        <BackToTopButton />

        {/* EN: Right — 2 legal links, 16px gap, body-s footer-link
            FR: Droite — 2 liens légaux, gap 16px, body-s footer-link */}
        <ul className="flex items-center gap-[var(--space-lg)]">
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "text-body-s text-footer-link transition-colors duration-fast ease-out",
                  "hover:text-footer-link-hover",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-white",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
