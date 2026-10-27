/**
 * EN: Header navigation (Section 3) — 5 main links with animated underline
 *     hover + 3 social icons (Instagram, TikTok, WhatsApp).
 *     Specs: GUIDE.md A.1.2 Section 3 + A.1.3. Menu hardcoded in v1
 *     (GUIDE.md A.1.4 Source 3), social URLs from § A.1.3.
 * FR: Navigation du Header (Section 3) — 5 liens principaux avec soulignement
 *     animé au survol + 3 icônes sociales (Instagram, TikTok, WhatsApp).
 *     Specs : GUIDE.md A.1.2 Section 3 + A.1.3. Menu codé en dur en v1
 *     (GUIDE.md A.1.4 Source 3), URLs sociales de § A.1.3.
 *
 * EN: Server Component — the link arrays are exported so the client mobile
 *     menu (HeaderTop) can reuse them.
 * FR: Server Component — les tableaux de liens sont exportés pour que le
 *     menu mobile client (HeaderTop) puisse les réutiliser.
 */

import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { NavLink } from "@/components/header/NavLink";
import { cn } from "@/lib/cn";

/** EN: Main navigation links (GUIDE.md A.1.3 Section 3) · FR: Liens de navigation principaux (GUIDE.md A.1.3 Section 3) */
export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Qui sommes-nous ?", href: "/a-propos" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
] as const;

/** EN: Social links — target _blank + rel noopener (GUIDE.md A.1.3 Section 3).
        Icons are official brand SVGs from src/components/icons/ (lucide v1 no
        longer ships brand icons), 20×20px, currentColor.
    FR: Liens sociaux — target _blank + rel noopener (GUIDE.md A.1.3 Section 3).
        Les icônes sont les SVG de marque officiels de src/components/icons/
        (lucide v1 n'inclut plus les icônes de marque), 20×20px, currentColor. */
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/cleanandbliss/", icon: InstagramIcon },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/discover/clean-and-bliss-cotonou/",
    icon: TikTokIcon,
  },
  { label: "WhatsApp", href: "https://wa.me/c/22945785765", icon: WhatsAppIcon },
] as const;

export function HeaderNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Navigation principale"
      className={cn(
        // EN: Section 3 — background comes from the StickyHeader glass shell
        //     (Header.tsx), top border 1px subtle, padding 16px / 64px
        // FR: Section 3 — le fond vient du conteneur verre StickyHeader
        //     (Header.tsx), bordure haute 1px subtile, padding 16px / 64px
        "hidden flex items-center justify-between border-t border-border-subtle",
        "px-[var(--space-5xl)] py-[var(--space-lg)]",
        // EN: Hidden on mobile (menu lives in the hamburger dropdown)
        // FR: Masqué sur mobile (le menu vit dans le déroulé hamburger)
        "max-md:hidden md:flex",
        className,
      )}
    >
      {/* EN: 5 links via <NavLink> — active state on the current page (brand
          color + persistent underline), hover = brand color + animated
          underline (scaleX) on the others (GUIDE.md A.1.2 Section 3)
          FR: 5 liens via <NavLink> — état actif sur la page courante (couleur
          de marque + soulignement persistant), survol = couleur de marque +
          soulignement animé (scaleX) sur les autres (GUIDE.md A.1.2 Section 3) */}
      <ul className="flex items-center gap-[var(--space-3xl)] max-lg:gap-[var(--space-xl)]">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>

      {/* EN: "Suivez-nous sur :" + 3 brand icons — bigger label + tinted pill\n          buttons with hover scale for premium presence (desktop only)\n          FR: « Suivez-nous sur : » + 3 icônes de marque — libellé plus grand +\n          boutons pastille teintés avec scale au survol pour un look premium\n          (desktop uniquement) */}
      <div className="hidden items-center gap-[var(--space-md)] xl:flex">
        <span className="text-body-m font-medium text-text-secondary">Suivez-nous&nbsp;sur&nbsp;:</span>
        <ul className="flex items-center gap-[var(--space-md)]">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  "inline-flex rounded-full p-[var(--space-xs)] text-text-primary",
                  "bg-brand-surface transition-all duration-fast ease-out hover:bg-bg-tint hover:text-brand-primary hover:scale-110",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                )}
              >
                <social.icon aria-hidden="true" className="size-[20px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
