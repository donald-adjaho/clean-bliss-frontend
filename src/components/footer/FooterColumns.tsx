/**
 * EN: Footer link columns (Server Component) — 4 columns (Nos Univers,
 *     Navigation, Nos sélections, Boutique Cotonou), the contact details and
 *     the newsletter/payment extras. Responsive: 2×2 grid on mobile/tablet,
 *     4 columns on desktop (GUIDE.md A.2.2).
 * FR: Colonnes de liens du footer (Server Component) — 4 colonnes (Nos
 *     Univers, Navigation, Nos sélections, Boutique Cotonou), les coordonnées
 *     et les extras newsletter/paiement. Responsive : grille 2×2 sur
 *     mobile/tablette, 4 colonnes sur desktop (GUIDE.md A.2.2).
 *
 * EN: On mobile the newsletter + payments move to a full-width block below the
 *     grid (validated choice); on tablet/desktop they stay in the 4th column.
 * FR: Sur mobile, la newsletter + les paiements passent dans un bloc pleine
 *     largeur sous la grille (choix validé) ; sur tablette/desktop ils restent
 *     dans la 4e colonne.
 */

import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";

import { FooterNewsletter } from "@/components/footer/FooterNewsletter";
import { FooterPayments } from "@/components/footer/FooterPayments";
import type { FooterContacts, PaymentBadge } from "@/components/footer/Footer";
import { cn } from "@/lib/cn";

/* EN: Universe links — categories (GUIDE.md A.2.2, colonne 1)
   FR: Liens des univers — catégories (GUIDE.md A.2.2, colonne 1) */
const UNIVERS_LINKS = [
  { label: "Parfums", href: "/boutique?category=parfums" },
  { label: "Bougies", href: "/boutique?category=bougies" },
  { label: "Nettoyants", href: "/boutique?category=nettoyants" },
  { label: "Senteurs et diffuseurs", href: "/boutique?category=senteurs" },
  { label: "Déodorants", href: "/boutique?category=deodorants" },
] as const;

/* EN: Secondary navigation (GUIDE.md A.2.2, colonne 2)
   FR: Navigation secondaire (GUIDE.md A.2.2, colonne 2) */
const NAVIGATION_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Qui sommes-nous ?", href: "/a-propos" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
  { label: "Avis clients", href: "/#avis-clients" },
] as const;

/* EN: Curated selections — tags (GUIDE.md A.2.2, colonne 3)
   FR: Sélections éditoriales — tags (GUIDE.md A.2.2, colonne 3) */
const SELECTION_LINKS = [
  { label: "Gamme Adopt", href: "/boutique?tag=adopt" },
  { label: "Sélection Octobre-Rose", href: "/boutique?tag=octobre-rose" },
  { label: "Sélection de Novembre", href: "/boutique?tag=mon-novembre" },
  { label: "Offres du mois", href: "/boutique?tag=offre-flash" },
] as const;

/**
 * EN: Renders a single link column (uppercase title + stacked links with color
 *     hover, GUIDE.md A.2.2).
 * FR: Affiche une colonne de liens (titre en majuscules + liens empilés avec
 *     survol coloré, GUIDE.md A.2.2).
 */
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      {/* EN: Column title — body-m semibold, white, uppercase, tracking 0.05em
          FR: Titre de colonne — body-m semibold, blanc, majuscules, tracking 0.05em */}
      <h3 className="mb-[var(--space-lg)] font-body text-body-m font-semibold uppercase tracking-[0.05em] text-base-white">
        {title}
      </h3>

      {/* EN: Stacked links — 10px gap, footer-link color, hover to footer-link-hover
          FR: Liens empilés — gap 10px, couleur footer-link, hover vers footer-link-hover */}
      <ul className="flex flex-col gap-[var(--space-sm)]">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={cn(
                "text-body-m text-footer-link transition-colors duration-fast ease-out",
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
  );
}

/**
 * EN: Renders the "Boutique Cotonou" column — address, phone and email with
 *     leading icons (GUIDE.md A.2.2, colonne 4).
 * FR: Affiche la colonne « Boutique Cotonou » — adresse, téléphone et e-mail
 *     avec icônes en tête (GUIDE.md A.2.2, colonne 4).
 */
function FooterContactColumn({ contacts }: { contacts: FooterContacts }) {
  const rows = [
    { icon: IconMapPin, value: contacts.address },
    { icon: IconPhone, value: contacts.phone },
    { icon: IconMail, value: contacts.mail },
  ];

  return (
    <div>
      <h3 className="mb-[var(--space-lg)] font-body text-body-m font-semibold uppercase tracking-[0.05em] text-base-white">
        Boutique Cotonou
      </h3>

      <ul className="flex flex-col gap-[var(--space-md)]">
        {rows.map((row) => (
          <li key={row.value} className="flex items-start gap-[var(--space-sm)]">
            {/* EN: Decorative icon — 18px, footer-link color
                FR: Icône décorative — 18px, couleur footer-link */}
            <row.icon
              aria-hidden="true"
              className="mt-[2px] size-[18px] shrink-0 text-footer-link"
            />
            <span className="text-body-m text-footer-text">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterColumns({
  contacts,
  payments,
}: {
  contacts: FooterContacts;
  payments: PaymentBadge[];
}) {
  return (
    // EN: Right zone — grid 2×2 (mobile/tablet) then 4 columns (desktop)
    // FR: Zone droite — grille 2×2 (mobile/tablette) puis 4 colonnes (desktop)
    <div className="min-w-0 flex-1">
      <div
        className={cn(
          // EN: Mobile — 2 columns, 32px horizontal / 24px vertical gaps
          // FR: Mobile — 2 colonnes, gaps 32px horizontal / 24px vertical
          "grid grid-cols-2 gap-x-[var(--space-2xl)] gap-y-[var(--space-xl)]",
          // EN: Tablet — same 2×2 but 32px vertical gap (GUIDE.md A.2.2)
          // FR: Tablette — même 2×2 mais gap vertical 32px (GUIDE.md A.2.2)
          "md:gap-y-[var(--space-2xl)]",
          // EN: Desktop — 4 columns, 64px gap (GUIDE.md A.2.2)
          // FR: Desktop — 4 colonnes, gap 64px (GUIDE.md A.2.2)
          "xl:grid-cols-4 xl:gap-[var(--space-5xl)]",
        )}
      >
        <FooterColumn title="Nos Univers" links={UNIVERS_LINKS} />
        <FooterColumn title="Navigation" links={NAVIGATION_LINKS} />
        <FooterColumn title="Nos sélections" links={SELECTION_LINKS} />

        {/* EN: 4th column — contact details + extras (extras desktop/tablet only)
            FR: 4e colonne — coordonnées + extras (extras desktop/tablette uniquement) */}
        <div>
          <FooterContactColumn contacts={contacts} />

          {/* EN: Newsletter + payment badges inside column 4 on tablet/desktop
              FR: Newsletter + badges de paiement dans la colonne 4 sur tablette/desktop */}
          <div className="mt-[var(--space-xl)] hidden md:block">
            <FooterNewsletter />
            <div className="mt-[var(--space-xl)]">
              <FooterPayments payments={payments} />
            </div>
          </div>
        </div>
      </div>

      {/* EN: Mobile-only — newsletter + payment badges full width below the grid
          FR: Mobile uniquement — newsletter + badges de paiement pleine largeur
          sous la grille */}
      <div className="mt-[var(--space-2xl)] md:hidden">
        <FooterNewsletter />
        <div className="mt-[var(--space-xl)]">
          <FooterPayments payments={payments} />
        </div>
      </div>
    </div>
  );
}
