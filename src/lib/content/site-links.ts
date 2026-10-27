/**
 * EN: Shared outbound links used by the homepage CTAs — the WhatsApp catalogue
 *     link (same convention as the header/FooterBrand) and a Google Maps search
 *     built from the boutique address (GUIDE.md B.1 §11/§13).
 * FR: Liens sortants partagés par les CTA de l'accueil — le lien catalogue
 *     WhatsApp (même convention que le header/FooterBrand) et une recherche
 *     Google Maps construite depuis l'adresse de la boutique (GUIDE.md B.1 §11/§13).
 */

/** EN: WhatsApp catalogue link (Benin number, matches HeaderNav.tsx)
 *  FR: Lien catalogue WhatsApp (numéro béninois, identique à HeaderNav.tsx) */
export const WHATSAPP_HREF = "https://wa.me/c/22945785765";

/**
 * EN: Builds a Google Maps search URL for the given boutique address.
 * FR: Construit une URL de recherche Google Maps pour l'adresse de la boutique.
 */
export function buildMapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
