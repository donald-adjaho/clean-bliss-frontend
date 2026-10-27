/**
 * EN: Business-settings data access for the shop page. Kept separate from the
 *     homepage query so /boutique fetches only the fields it renders (the
 *     "Visit us" CTA between the grid and the footer, § B.2).
 * FR: Accès aux réglages métier pour la page boutique. Séparé de la requête
 *     d'accueil afin que /boutique ne récupère que les champs qu'elle affiche
 *     (le CTA « Rendez-nous visite » entre la grille et le pied de page, § B.2).
 *
 * EN: Server-only (imported by the /boutique Server Component).
 * FR: Côté serveur uniquement (importé par le Server Component /boutique).
 */

import { fetchGraphQL } from "@/lib/wp-graphql";

/** EN: Subset of the WP business settings the shop CTA needs · FR: Sous-ensemble des réglages métier nécessaires au CTA */
export interface VisitCtaSettings {
  address: string | null;
  phone: string | null;
  video: { sourceUrl: string | null; mimeType: string | null } | null;
}

const VISIT_CTA_SETTINGS_QUERY = `
  query VisitCtaSettings {
    allSettings {
      businessAdresse
      businessPhone
      ctaVideo { sourceUrl mimeType }
    }
  }
`;

/**
 * EN: Fetches the address, phone and video used by the reusable
 *     <VisitCtaSection /> on the shop page.
 * FR: Récupère l'adresse, le téléphone et la vidéo utilisés par le
 *     <VisitCtaSection /> réutilisable sur la page boutique.
 */
export async function getVisitCtaSettings(): Promise<VisitCtaSettings> {
  const data = (await fetchGraphQL(VISIT_CTA_SETTINGS_QUERY)) as {
    allSettings: {
      businessAdresse: string | null;
      businessPhone: string | null;
      ctaVideo: { sourceUrl: string | null; mimeType: string | null } | null;
    };
  };

  return {
    address: data.allSettings.businessAdresse,
    phone: data.allSettings.businessPhone,
    video: data.allSettings.ctaVideo,
  };
}
