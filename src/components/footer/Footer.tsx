/**
 * EN: Footer orchestrator (Server Component) — fetches the shop contact details
 *     and the 3 payment-method badges from WordPress (Pods businessdetails) via
 *     fetchGraphQL, then stacks the 4 footer zones: brand, link columns, giant
 *     watermark and the bottom bar.
 *     Specs: GUIDE.md A.2.1 (role) + A.2.2 (structure) + A.2.4 (data).
 * FR: Orchestrateur du Footer (Server Component) — récupère les coordonnées
 *     boutique et les 3 badges de paiement depuis WordPress (Pods
 *     businessdetails) via fetchGraphQL, puis empile les 4 zones du footer :
 *     marque, colonnes de liens, watermark géant et barre du bas.
 *     Specs : GUIDE.md A.2.1 (rôle) + A.2.2 (structure) + A.2.4 (données).
 */

import { FooterBottom } from "@/components/footer/FooterBottom";
import { FooterBrand } from "@/components/footer/FooterBrand";
import { FooterColumns } from "@/components/footer/FooterColumns";
import { FooterWatermark } from "@/components/footer/FooterWatermark";
import { fetchGraphQL } from "@/lib/wp-graphql";

/* EN: GraphQL query — custom resolvers businessAdresse / businessPhone /
   businessMail are exposed on the `Settings` type (WPGraphQL allSettings),
   plus the 3 payment images (CleanBlissImage) from the Pods "Paiements" group
   (GUIDE.md A.2.4). Verified against the live schema.
   FR: Requête GraphQL — les resolvers custom businessAdresse / businessPhone /
   businessMail sont exposés sur le type `Settings` (WPGraphQL allSettings),
   ainsi que les 3 images de paiement (CleanBlissImage) du groupe Pods
   « Paiements » (GUIDE.md A.2.4). Vérifié sur le schéma réel. */
const FOOTER_QUERY = /* GraphQL */ `
  query FooterBusinessDetails {
    allSettings {
      businessAdresse
      businessPhone
      businessMail
      paymentMtnImage {
        sourceUrl
        altText
      }
      paymentMoovImage {
        sourceUrl
        altText
      }
      paymentCashImage {
        sourceUrl
        altText
      }
    }
  }
`;

/* EN: Hardcoded fallbacks — the footer must render even if WordPress is down
   (values from GUIDE.md A.2.3 Copywriting)
   FR: Valeurs de repli codées en dur — le footer doit s'afficher même si
   WordPress est indisponible (valeurs du GUIDE.md A.2.3 Copywriting) */
const FALLBACK_ADDRESS = "Cotonou, Bénin";
const FALLBACK_PHONE = "(+229) 45 78 57 65";
const FALLBACK_MAIL = "cleanandbliss@contact.com";

/* EN: Payment badge shape used across the footer components
   FR: Forme d'un badge de paiement utilisée dans les composants du footer */
export interface PaymentBadge {
  label: string;
  sourceUrl: string | null;
  altText: string | null;
}

/* EN: Footer contact details consumed by the link columns
   FR: Coordonnées du footer consommées par les colonnes de liens */
export interface FooterContacts {
  address: string;
  phone: string;
  mail: string;
}

/* EN: Subset of the WPGraphQL `Settings` type we rely on
   FR: Sous-ensemble du type `Settings` de WPGraphQL que nous utilisons */
interface FooterSettingsGraphQL {
  businessAdresse?: string | null;
  businessPhone?: string | null;
  businessMail?: string | null;
  paymentMtnImage?: { sourceUrl?: string | null; altText?: string | null } | null;
  paymentMoovImage?: { sourceUrl?: string | null; altText?: string | null } | null;
  paymentCashImage?: { sourceUrl?: string | null; altText?: string | null } | null;
}

/**
 * EN: Fetches the footer data (contacts + payment badges) with a graceful
 *     fallback — the footer must never break the page render.
 * FR: Récupère les données du footer (coordonnées + badges de paiement) avec un
 *     repli gracieux — le footer ne doit jamais casser le rendu de la page.
 */
async function getFooterData(): Promise<{
  contacts: FooterContacts;
  payments: PaymentBadge[];
}> {
  try {
    // EN: Server-side GraphQL call, cached 1 h by Next.js (see wp-graphql.js)
    // FR: Appel GraphQL côté serveur, caché 1 h par Next.js (voir wp-graphql.js)
    const data = await fetchGraphQL(FOOTER_QUERY);
    const settings = data?.allSettings as FooterSettingsGraphQL | undefined;

    return {
      contacts: {
        address: settings?.businessAdresse || FALLBACK_ADDRESS,
        phone: settings?.businessPhone || FALLBACK_PHONE,
        mail: settings?.businessMail || FALLBACK_MAIL,
      },
      // EN: Keep one entry per method — a null sourceUrl triggers the text fallback
      // FR: On garde une entrée par moyen — un sourceUrl null déclenche le repli texte
      payments: [
        {
          label: "MTN Mobile Money",
          sourceUrl: settings?.paymentMtnImage?.sourceUrl ?? null,
          altText: settings?.paymentMtnImage?.altText ?? null,
        },
        {
          label: "Moov Money",
          sourceUrl: settings?.paymentMoovImage?.sourceUrl ?? null,
          altText: settings?.paymentMoovImage?.altText ?? null,
        },
        {
          label: "Espèces",
          sourceUrl: settings?.paymentCashImage?.sourceUrl ?? null,
          altText: settings?.paymentCashImage?.altText ?? null,
        },
      ],
    };
  } catch {
    // EN: Log and fall back to the hardcoded contacts + text badges
    // FR: Log et repli sur les coordonnées codées en dur + badges texte
    console.error("Footer — impossible de récupérer les données (businessdetails)");
    return {
      contacts: { address: FALLBACK_ADDRESS, phone: FALLBACK_PHONE, mail: FALLBACK_MAIL },
      payments: [
        { label: "MTN Mobile Money", sourceUrl: null, altText: null },
        { label: "Moov Money", sourceUrl: null, altText: null },
        { label: "Espèces", sourceUrl: null, altText: null },
      ],
    };
  }
}

export async function Footer() {
  const { contacts, payments } = await getFooterData();

  return (
    <footer
      // EN: Deep dark background + overflow hidden (contains the giant watermark)
      // FR: Fond sombre profond + overflow hidden (contient le watermark géant)
      className="overflow-hidden bg-footer-bg text-footer-text"
    >
      <div
        className={[
          // EN: Mobile padding 48px / 20px (GUIDE.md A.2.2)
          // FR: Padding mobile 48px / 20px (GUIDE.md A.2.2)
          "px-[var(--space-mobile-h)] py-[var(--space-mobile-v)]",
          // EN: Tablet padding 56px uniform (GUIDE.md A.2.2)
          // FR: Padding tablette 56px uniforme (GUIDE.md A.2.2)
          "md:px-[var(--space-tablet)] md:py-[var(--space-tablet)]",
          // EN: Desktop padding 80px / 64px / 40px (GUIDE.md A.2.2)
          // FR: Padding desktop 80px / 64px / 40px (GUIDE.md A.2.2)
          "xl:px-[var(--space-5xl)] xl:pt-[var(--space-7xl)] xl:pb-[var(--space-3xl)]",
        ].join(" ")}
      >
        {/* EN: Top zone — brand block + link columns (stacked below 1280px)
            FR: Zone haute — bloc marque + colonnes de liens (empilées sous 1280px) */}
        <div className="flex flex-col gap-[var(--space-3xl)] xl:flex-row xl:gap-[var(--space-5xl)]">
          <FooterBrand />
          <FooterColumns contacts={contacts} payments={payments} />
        </div>

        {/* EN: Giant decorative watermark (GUIDE.md A.2.2) — not animated
            FR: Watermark décoratif géant (GUIDE.md A.2.2) — non animé */}
        <FooterWatermark />

        {/* EN: Bottom bar — copyright, back-to-top button, legal links
            FR: Barre du bas — copyright, bouton retour en haut, liens légaux */}
        <FooterBottom />
      </div>
    </footer>
  );
}
