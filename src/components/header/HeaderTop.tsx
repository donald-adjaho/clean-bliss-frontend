"use client";

/**
 * EN: Header main row (Section 2, STICKY) — logo | shop contact details |
 *     search bar | action buttons, plus the mobile hamburger dropdown menu.
 *     Layout per breakpoint (GUIDE.md A.1.2) :
 *     - Desktop (≥ 1280px)  : logo | coords | search (flex-1) | 4 actions
 *     - Tablet (768–1279px) : logo | search | 2 actions (search + cart)
 *     - Mobile (< 768px)    : hamburger | centered logo | search + cart icons
 *     Specs: GUIDE.md A.1.2 Section 2 + mobile menu A.1.2 "Section 3 mobile".
 * FR: Rangée principale du Header (Section 2, STICKY) — logo | coordonnées |
 *     barre de recherche | boutons d'action, plus le menu déroulant hamburger
 *     mobile. Layout par breakpoint (GUIDE.md A.1.2) :
 *     - Desktop (≥ 1280px)   : logo | coords | search (flex-1) | 4 actions
 *     - Tablette (768–1279px): logo | search | 2 actions (search + panier)
 *     - Mobile (< 768px)     : hamburger | logo centré | icônes search + panier
 *     Specs : GUIDE.md A.1.2 Section 2 + menu mobile A.1.2 « Section 3 mobile ».
 *
 * EN: "use client" — hamburger state, mobile dropdown. Contact details come
 *     as props fetched server-side (Header.tsx → fetchGraphQL).
 * FR: "use client" — état du hamburger, menu déroulant mobile. Les
 *     coordonnées arrivent en props, récupérées côté serveur
 *     (Header.tsx → fetchGraphQL).
 */

import { IconMapPin, IconMenu2, IconPhone, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeaderActions } from "@/components/header/HeaderActions";
import { NAV_LINKS, SOCIAL_LINKS } from "@/components/header/HeaderNav";
import { SearchBar } from "@/components/header/SearchBar";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

/** EN: HeaderTop props — shop contact details + logo fetched server-side by Header.tsx
    FR: Props de HeaderTop — coordonnées boutique + logo récupérés côté serveur par Header.tsx */
export interface HeaderTopProps {
  /** EN: Shop address (Pods businessAdresse) · FR: Adresse boutique (Pods businessAdresse) */
  address: string;
  /** EN: Shop phone (Pods businessPhone) · FR: Téléphone boutique (Pods businessPhone) */
  phone: string;
  /** EN: Site icon URL (Pods businessBrand), nullable · FR: URL de l'icône du site (Pods businessBrand), nullable */
  logoUrl: string | null;
}

export function HeaderTop({ address, phone, logoUrl }: HeaderTopProps) {
  // EN: Mobile dropdown menu state (closed by default)
  // FR: État du menu déroulant mobile (fermé par défaut)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // EN: Full-screen search panel state (mobile/tablet — GUIDE.md A.1.2
  //     "Search — ouvre un panneau plein écran")
  // FR: État du panneau de recherche plein écran (mobile/tablette — GUIDE.md
  //     A.1.2 « Search — ouvre un panneau plein écran »)
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // EN: While the search panel is open — close it on Escape and lock body
  //     scroll (cleanup restores both on close/unmount)
  // FR: Tant que le panneau de recherche est ouvert — le fermer sur Échap et
  //     verrouiller le défilement du body (le nettoyage restaure les deux)
  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  return (
    <div className="border-b border-border-subtle">
      {/* EN: Main row — glass background + blur provided by StickyHeader (Header.tsx)
          FR: Rangée principale — fond verre + flou fournis par StickyHeader (Header.tsx) */}
      <div
        className={cn(
          // EN: justify-between + base gap — the search keeps a NORMAL width
          //     (capped), and every leftover pixel is spread as equal gaps
          //     between the visible blocks (logo | coords | search | actions),
          //     so the row stays flush edge to edge with no dead zone after
          //     the Compte chip and no oversized search field
          // FR: justify-between + gap de base — la recherche garde une largeur
          //     NORMALE (plafonnée), et chaque pixel restant est réparti en
          //     écarts égaux entre les blocs visibles (logo | coordonnées |
          //     recherche | actions), la rangée restant bord à bord, sans
          //     zone morte après le chip Compte ni champ démesuré
          "flex items-center justify-between gap-[var(--space-xl)]",
          // EN: Desktop padding 24/64 · tablet 24/56 · mobile 16/20
          // FR: Padding desktop 24/64 · tablette 24/56 · mobile 16/20
          "px-[var(--space-5xl)] py-[var(--space-xl)]",
          "md:px-[var(--space-tablet)] xl:px-[var(--space-5xl)] max-md:gap-[var(--space-lg)]",
          "max-md:px-[var(--space-mobile-h)] max-md:py-[var(--space-lg)]",
        )}
      >
        {/* EN: Mobile hamburger — toggles the dropdown menu (< 768px only)
            FR: Hamburger mobile — ouvre le menu déroulant (< 768px uniquement) */}
        <IconButton
          className="max-md:inline-flex md:hidden"
          icon={isMenuOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
          ariaLabel={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        />

        {/* EN: Bloc A — site icon (GraphQL businessBrand) + stacked logo
            (title + slogan), links to "/"
            FR: Bloc A — icône du site (GraphQL businessBrand) + logo empilé
            (titre + slogan), redirige vers « / » */}
        <Link
          href="/"
          aria-label="Clean & Bliss — Accueil"
          className={cn(
            "flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            // EN: Centered between hamburger and actions on mobile
            // FR: Centré entre le hamburger et les actions sur mobile
            "max-md:flex-1 max-md:items-center",
          )}
        >
          <span className="flex items-center gap-[var(--space-md)]">
            {/* EN: Site icon — 48px, rounded, served from the WordPress media
                library via next/image (decorative: the link aria-label carries
                the name). Hidden when GraphQL returns no logo.
                FR: Icône du site — 48px, arrondie, servie depuis la médiathèque
                WordPress via next/image (décorative : l'aria-label du lien porte
                le nom). Masquée si GraphQL ne renvoie pas de logo. */}
            {logoUrl && (
              <Image
                src={logoUrl}
                alt=""
                width={48}
                height={48}
                className="size-10 shrink-0 rounded-full object-cover md:size-12"
              />
            )}
            <span className="flex flex-col">
              {/* EN: Title — Cormorant Garamond, 26px (text-h5 token), brand color
                  FR: Titre — Cormorant Garamond, 26px (token text-h5), couleur de marque */}
              <span className="font-heading text-h5 leading-tight text-brand-primary max-md:text-h6">
                Clean & Bliss
              </span>
              {/* EN: Slogan — 12px muted (GUIDE.md A.1.2 Bloc A; kept on mobile
                  per the mobile spec "Logo (titre + slogan, 20px)")
                  FR: Slogan — 12px atténué (GUIDE.md A.1.2 Bloc A ; conservé sur
                  mobile selon la spec mobile « Logo (titre + slogan, 20px) ») */}
              {/* EN: Slogan — 12px, text-secondary for AA contrast (12px is
                  normal-size text, needs ≥ 4.5:1)
                  FR: Slogan — 12px, text-secondary pour le contraste AA (12px est
                  du texte normal, requiert ≥ 4,5:1) */}
              <span className="mt-[var(--space-2xs)] text-body-s text-text-secondary">
                Beauté, Cosmétique et Soins.
              </span>
            </span>
          </span>
        </Link>

        {/* EN: Bloc B — shop contact details, desktop only (≥ 1280px, GUIDE.md
            A.1.2). Icon + value on two stacked rows, no truncation: the full
            address wraps over 1–2 lines. Small tinted chip (size-8) holds the
            icon; spacing with the logo is 32px (24px flex gap + 8px margin).
            FR: Bloc B — coordonnées boutique, desktop uniquement (≥ 1280px,
            GUIDE.md A.1.2). Icône + valeur empilées sur 2 lignes, sans
            troncature : l'adresse complète s'enroule sur 1–2 lignes. Petite
            pastille teintée (size-8) porte l'icône ; espacement avec le logo
            de 32px (gap flex 24px + marge 8px). */}
        <div
          className={cn(
            "hidden flex-col gap-[var(--space-2xs)] xl:flex",
            "xl:ml-[var(--space-xs)]",
          )}
        >
          {/* EN: Address row — tinted icon chip + full value, no truncate
              FR: Ligne adresse — pastille icône teintée + valeur complète, sans troncature */}
          <span className="flex items-center gap-[var(--space-md)]">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-surface"
            >
              <IconMapPin className="size-4 text-brand-primary" stroke={1.75} />
            </span>
            <span className="max-w-[240px] whitespace-normal text-body-m text-text-primary">
              {address}
            </span>
          </span>

          {/* EN: Phone row — tinted icon chip + clickable semibold value
              FR: Ligne téléphone — pastille icône teintée + valeur cliquable en demi-gras */}
          <a
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            className={cn(
              "group flex items-center gap-[var(--space-md)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            )}
          >
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-surface transition-shadow duration-fast ease-out group-hover:shadow-md"
            >
              <IconPhone className="size-4 text-brand-primary transition-transform duration-fast ease-out group-hover:-translate-y-0.5" stroke={1.75} />
            </span>
            <span className="text-body-m font-semibold text-text-primary transition-colors duration-fast ease-out group-hover:text-action-primary">
              {phone}
            </span>
          </a>
        </div>


        {/* EN: Bloc C — search bar — normal capped width (480px max) and still
            flex-1 min-w-0 so it shrinks below the cap on narrow screens
            (no overflow). The extra space of the row is distributed by the
            parent's justify-between instead of being swallowed by the field.
            FR: Bloc C — barre de recherche — largeur normale plafonnée
            (480px max), toujours flex-1 min-w-0 pour rétrécir sous le cap
            sur les écrans étroits (sans débordement). L'espace excédentaire
            de la rangée est réparti par le justify-between du parent plutôt
            qu'avalé par le champ. */}
        <div className={cn("hidden min-w-0 flex-1 md:block", "max-w-[480px]")}>
          <SearchBar className="w-full" />
        </div>


        {/* EN: Actions cluster — vertical hairline on its left (tablet+); no
            extra left padding so the gap from the search stays at the 24px
            flex gap (user spec)
            FR: Cluster d'actions — filet vertical à sa gauche (tablette+) ;
            aucun padding gauche additionnel pour que l'écart avec la recherche
            reste au gap flex de 24px (spec utilisateur) */}
        <HeaderActions
          className={cn("shrink-0", "md:border-l md:border-border-subtle")}
          onSearchOpen={() => setIsSearchOpen(true)}
        />
      </div>

      {/* EN: Full-screen mobile/tablet search panel (GUIDE.md A.1.2 "Search —
          ouvre un panneau plein écran"). The search icon in the actions cluster
          opens it; Escape, the close button or a backdrop click dismiss it.
          Rendered through a React portal on document.body: a plain in-tree
          "fixed inset-0" panel would be trapped by the sticky header's
          backdrop-blur (containing block for fixed descendants).
          FR: Panneau de recherche plein écran mobile/tablette (GUIDE.md A.1.2
          « Search — ouvre un panneau plein écran »). L'icône recherche du
          cluster d'actions l'ouvre ; Échap, le bouton de fermeture ou un clic
          sur le fond le ferment. Rendu via un portail React sur document.body :
          un simple « fixed inset-0 » dans l'arbre serait capté par le
          backdrop-blur du header sticky (bloc conteneur des descendants fixés). */}
      {isSearchOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Recherche"
            className="animate-fade-in fixed inset-0 z-50 flex flex-col bg-bg-surface"
          >
            <div
              className={cn(
                "flex items-center justify-between gap-[var(--space-xl)]",
                "border-b border-border-subtle",
                "px-[var(--space-mobile-h)] py-[var(--space-lg)]",
              )}
            >
              <span className="font-heading text-h6 text-brand-primary">
                Recherche
              </span>
              <IconButton
                icon={<IconX className="size-5" />}
                ariaLabel="Fermer la recherche"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
            <div className="px-[var(--space-mobile-h)] py-[var(--space-xl)]">
              <SearchBar className="w-full" />
              <p className="mt-[var(--space-md)] text-body-m text-text-secondary">
                Saisissez un mot-clé pour explorer notre catalogue.
              </p>
            </div>
          </div>,
          document.body,
        )}

      {/* EN: Mobile dropdown menu (GUIDE.md A.1.2 "Section 3 mobile") — nav links,
          contact details and social icons; opens/closes with a 0fr → 1fr grid
          animation in --duration-base
          FR: Menu déroulant mobile (GUIDE.md A.1.2 « Section 3 mobile ») — liens
          de navigation, coordonnées et icônes sociales ; ouverture/fermeture avec
          une animation de grille 0fr → 1fr en --duration-base */}
      <div
        id="mobile-menu"
        className={cn(
          // EN: "invisible" when closed removes the links from the a11y tree and
          //     tab order (grid 0fr alone would only hide them visually)
          // FR: "invisible" quand fermé retire les liens de l'arbre d'accessibilité
          //     et de l'ordre de tabulation (la grille 0fr seule ne les masquerait
          //     que visuellement)
          "grid transition-[grid-template-rows,visibility] duration-base ease-in-out md:hidden",
          isMenuOpen ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "border-t border-border-subtle bg-bg-surface",
              "px-[var(--space-mobile-h)] py-[var(--space-lg)]",
            )}
          >
            {/* EN: 5 stacked nav links (GUIDE.md A.1.2 mobile menu)
                FR: 5 liens de navigation empilés (GUIDE.md A.1.2 menu mobile) */}
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block py-[var(--space-lg)] text-body-l text-text-primary",
                      "transition-colors duration-fast ease-out hover:text-action-primary-hover",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* EN: Bottom — premium service block (same motif as the desktop
                Bloc B: tinted chips + micro-labels) + "Suivez-nous sur :" + the
                3 brand icons (GUIDE.md A.1.2)
                FR: Bas — bloc service premium (même motif que le Bloc B desktop :
                pastilles teintées + micro-libellés) + « Suivez-nous sur : » + les
                3 icônes de marque (GUIDE.md A.1.2) */}
            <div className="mt-[var(--space-md)] flex flex-col gap-[var(--space-sm)] border-t border-border-subtle pt-[var(--space-lg)]">
              {/* EN: Address row — compact tinted icon chip + truncated value
                  FR: Ligne adresse — pastille icône teintée compacte + valeur tronquée */}
              <span className="flex items-center gap-[var(--space-md)]">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-surface"
                >
                  <IconMapPin className="size-4 text-brand-primary" stroke={1.75} />
                </span>
                <span
                  className="max-w-[200px] truncate text-body-m font-medium text-text-primary"
                  title={address}
                >
                  {address}
                </span>
              </span>


              {/* EN: Phone row — compact tinted icon chip + clickable value
                  FR: Ligne téléphone — pastille icône teintée compacte + valeur cliquable */}
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className={cn(
                  "group flex items-center gap-[var(--space-md)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-surface transition-shadow duration-fast ease-out group-hover:shadow-md"
                >
                  <IconPhone className="size-4 text-brand-primary transition-transform duration-fast ease-out group-hover:-translate-y-0.5" stroke={1.75} />
                </span>
                <span className="text-body-m font-semibold text-text-primary transition-colors duration-fast ease-out group-hover:text-action-primary">
                  {phone}
                </span>
              </a>


              {/* EN: "Suivez-nous sur :" + 3 brand icons — bigger label + larger
                  icons for better visual presence in the mobile menu
                  FR: « Suivez-nous sur : » + 3 icônes — libellé plus grand +
                  icônes plus grandes pour une meilleure présence visuelle mobile */}
              <div className="mt-[var(--space-md)] flex items-center justify-between">
                <span className="text-body-m font-medium text-text-secondary">Suivez-nous sur :</span>
                <ul className="flex items-center gap-[var(--space-xl)]">
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
                        <social.icon aria-hidden="true" className="size-[22px]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
