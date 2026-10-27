/**
 * EN: Header orchestrator (Server Component) — stacks the 3 header sections
 *     (announcement bar, main row, nav) and fetches the shop contact details
 *     from WordPress (Pods businessdetails) via fetchGraphQL.
 *     Specs: GUIDE.md A.1.1 (3 sections) + A.1.4 Source 1.
 * FR: Orchestrateur du Header (Server Component) — empile les 3 sections du
 *     header (bandeau d'annonce, rangée principale, navigation) et récupère
 *     les coordonnées boutique depuis WordPress (Pods businessdetails) via
 *     fetchGraphQL.
 *     Specs : GUIDE.md A.1.1 (3 sections) + A.1.4 Source 1.
 */

import { AnnouncementBar } from "@/components/header/AnnouncementBar";
import { HeaderNav } from "@/components/header/HeaderNav";
import { HeaderTop } from "@/components/header/HeaderTop";
import { StickyHeader } from "@/components/header/StickyHeader";
import { fetchGraphQL } from "@/lib/wp-graphql";

/* EN: GraphQL query — the custom resolvers businessAdresse / businessPhone are
   exposed on the `Settings` type (WPGraphQL allSettings), declared WordPress-side
   in inc/graphql-*.php (GUIDE.md A.1.4 Source 1). Verified against the live schema.
   FR: Requête GraphQL — les resolvers custom businessAdresse / businessPhone sont
   exposés sur le type `Settings` (WPGraphQL allSettings), déclarés côté WordPress
   dans inc/graphql-*.php (GUIDE.md A.1.4 Source 1). Vérifié sur le schéma réel. */
const BUSINESS_QUERY = /* GraphQL */ `
  query HeaderBusinessDetails {
    allSettings {
      businessAdresse
      businessPhone
      businessBrand
    }
  }
`;

/* EN: Hardcoded fallbacks — the header must render even if WordPress is down
   (values from GUIDE.md A.1.3 Section 2)
   FR: Valeurs de repli codées en dur — le header doit s'afficher même si
   WordPress est indisponible (valeurs du GUIDE.md A.1.3 Section 2) */
const FALLBACK_ADDRESS = "Cotonou, Bénin";
const FALLBACK_PHONE = "(+229) 45 78 57 65";

/**
 * EN: Fetches the shop contact details + logo with a graceful fallback — a
 *     header must never break the page render.
 * FR: Récupère les coordonnées boutique + le logo avec un repli gracieux — un
 *     header ne doit jamais casser le rendu de la page.
 */
async function getBusinessDetails(): Promise<{
  address: string;
  phone: string;
  logoUrl: string | null;
}> {
  try {
    // EN: Server-side GraphQL call, cached 1 h by Next.js (see wp-graphql.js)
    // FR: Appel GraphQL côté serveur, caché 1 h par Next.js (voir wp-graphql.js)
    const data = await fetchGraphQL(BUSINESS_QUERY);
    const settings = data?.allSettings;
    return {
      address: settings?.businessAdresse || FALLBACK_ADDRESS,
      phone: settings?.businessPhone || FALLBACK_PHONE,
      logoUrl: settings?.businessBrand || null,
    };
  } catch {
    // EN: Log and fall back to the hardcoded values (no logo)
    // FR: Log et repli sur les valeurs codées en dur (pas de logo)
    console.error("Header — impossible de récupérer les coordonnées (businessdetails)");
    return { address: FALLBACK_ADDRESS, phone: FALLBACK_PHONE, logoUrl: null };
  }
}

export async function Header() {
  const { address, phone, logoUrl } = await getBusinessDetails();

  return (
    <header>
      {/* EN: Section 1 — announcement marquee, NOT sticky (scrolls away)
          FR: Section 1 — marquee d'annonce, NON sticky (défile normalement) */}
      <AnnouncementBar />

      {/* EN: Sections 2 + 3 — premium sticky shell: glass background
          (semi-transparent + blur) with a soft elevation shadow past 400px
          of scroll (GUIDE.md A.1.1)
          FR: Sections 2 + 3 — conteneur sticky premium : fond verre
          (semi-transparent + flou) avec ombre d'élévation douce après 400px
          de scroll (GUIDE.md A.1.1) */}
      <StickyHeader>
        <HeaderTop address={address} phone={phone} logoUrl={logoUrl} />
        <HeaderNav />
      </StickyHeader>
    </header>
  );
}
