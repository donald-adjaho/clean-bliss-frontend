/**
 * EN: Formatting helpers shared across product cards, prices and dates.
 *     WooCommerce returns HTML-encoded strings (e.g. "28665&nbsp;CFA") and
 *     dates in a non-ISO format ("2026-10-31 23:59:59") that Safari rejects,
 *     so every value coming from the GraphQL API goes through these helpers.
 * FR: Aides de formatage partagées par les cartes produit, les prix et les
 *     dates. WooCommerce renvoie des chaînes encodées HTML (ex. « 28665&nbsp;CFA »)
 *     et des dates dans un format non ISO (« 2026-10-31 23:59:59 ») que Safari
 *     refuse, donc chaque valeur venant de l'API GraphQL passe par ces helpers.
 */

/* EN: Named HTML entities used by WooCommerce/WPGraphQL price strings.
 *     Only the handful actually emitted by the backend are mapped.
 * FR: Entités HTML nommées utilisées par les chaînes de prix WooCommerce/WPGraphQL.
 *     Seules celles réellement émises par le backend sont mappées. */
const NAMED_ENTITIES: Record<string, string> = {
  // EN: Non-breaking space — kept as \u00A0 so the price never wraps
  // FR: Espace insécable — conservée en \u00A0 pour que le prix ne se coupe jamais
  nbsp: "\u00A0",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  "#039": "'",
  "#39": "'",
};

/**
 * EN: Decodes the HTML entities found in WooCommerce strings (&nbsp;, &amp;,
 *     &#8217;, …) without a DOM. Non-breaking spaces are preserved as \u00A0.
 * FR: Décode les entités HTML présentes dans les chaînes WooCommerce
 *     (&nbsp;, &amp;, &#8217;, …) sans DOM. Les espaces insécables sont
 *     conservées en \u00A0.
 */
export function decodeHtmlEntities(input: string | null | undefined): string {
  if (!input) return "";

  return input
    // EN: Numeric decimal entities (&#8217;) · FR: Entités numériques décimales (&#8217;)
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    // EN: Numeric hex entities (&#x2019;) · FR: Entités numériques hexadécimales (&#x2019;)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    // EN: Named entities (&nbsp;, &amp;) · FR: Entités nommées (&nbsp;, &amp;)
    .replace(/&([a-zA-Z#0-9]+);/g, (match, name: string) => NAMED_ENTITIES[name] ?? match);
}

/**
 * EN: Formats a raw WooCommerce price string for display. Returns "" when the
 *     value is missing; otherwise the decoded string (e.g. "28 665\u00A0CFA").
 * FR: Formate une chaîne de prix WooCommerce brute pour l'affichage. Renvoie ""
 *     si la valeur manque ; sinon la chaîne décodée (ex. « 28 665\u00A0CFA »).
 */
export function formatPrice(raw: string | null | undefined): string {
  const decoded = decodeHtmlEntities(raw).trim();
  return decoded;
}

/**
 * EN: Parses the first numeric value out of a price string ("28 665 CFA" →
 *     28665). Returns null when no number can be found. Exported so the shop
 *     filters can compare a product's (minimum) price against price ranges.
 * FR: Extrait la première valeur numérique d'une chaîne de prix
 *     (« 28 665 CFA » → 28665). Renvoie null si aucun nombre n'est trouvé.
 *     Exporté pour que les filtres boutique puissent comparer le prix
 *     (minimum) d'un produit aux tranches de prix.
 */
export function parsePriceAmount(raw: string | null | undefined): number | null {
  const decoded = decodeHtmlEntities(raw).replace(/\u00A0/g, " ");
  const match = decoded.replace(/[^\d.,]/g, "").replace(/,/g, ".");
  // EN: Keep only the first dot (thousand separators are spaces in CFA)
  // FR: Ne garder que le premier point (les séparateurs de milliers sont des espaces en CFA)
  const firstDot = match.indexOf(".");
  const normalized = firstDot === -1 ? match : match.slice(0, firstDot + 1) + match.slice(firstDot + 1).replace(/\./g, "");
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : null;
}

/**
 * EN: Computes the discount percentage between a regular and a sale price.
 *     Returns null when there is no real discount (missing values or ≤ 0 %).
 * FR: Calcule le pourcentage de remise entre un prix normal et un prix barré.
 *     Renvoie null s'il n'y a pas de vraie remise (valeurs manquantes ou ≤ 0 %).
 */
export function computeDiscount(
  regularPrice: string | null | undefined,
  salePrice: string | null | undefined,
): number | null {
  const regular = parsePriceAmount(regularPrice);
  const sale = parsePriceAmount(salePrice);
  if (regular === null || sale === null || regular <= 0 || sale >= regular) return null;

  const discount = Math.round((1 - sale / regular) * 100);
  return discount > 0 ? discount : null;
}

/**
 * EN: Strips HTML tags from a string and collapses whitespace — used for
 *     WooCommerce review bodies before rendering them as plain text (keeps the
 *     output safe without shipping a sanitizer to the client).
 * FR: Retire les balises HTML d'une chaîne et compacte les espaces — utilisé
 *     pour les avis WooCommerce avant de les rendre en texte brut (garde la
 *     sortie sûre sans expédier un assainisseur au client).
 */
export function stripHtml(input: string | null | undefined): string {
  if (!input) return "";

  return decodeHtmlEntities(input)
    // EN: Replace block-level tags with a space so words don't get glued together
    // FR: Remplace les balises de bloc par une espace pour ne pas coller les mots
    .replace(/<\/?(p|br|div|li|ul|ol|h[1-6])[^>]*>/gi, " ")
    // EN: Remove every remaining tag · FR: Retire toutes les balises restantes
    .replace(/<[^>]*>/g, "")
    // EN: Collapse runs of whitespace · FR: Compacte les suites d'espaces
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * EN: Normalizes a WordPress date ("YYYY-MM-DD HH:MM:SS", Cotonou time = UTC+1
 *     without DST) into a valid ISO 8601 string so `new Date()` parses it on all
 *     browsers (Safari/iOS reject the raw format). Already-ISO input is kept.
 * FR: Normalise une date WordPress (« YYYY-MM-DD HH:MM:SS », heure de Cotonou =
 *     UTC+1 sans heure d'été) en chaîne ISO 8601 valide afin que `new Date()`
 *     la parse sur tous les navigateurs (Safari/iOS refuse le format brut).
 *     Une entrée déjà ISO est conservée.
 */
export function parseWpDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const trimmed = value.trim();
  // EN: Already ISO (contains "T") → parse directly
  // FR: Déjà ISO (contient « T ») → parse direct
  if (trimmed.includes("T")) {
    const iso = new Date(trimmed);
    return Number.isNaN(iso.getTime()) ? null : iso;
  }

  // EN: "2026-10-31 23:59:59" → "2026-10-31T23:59:59+01:00"
  // FR: « 2026-10-31 23:59:59 » → « 2026-10-31T23:59:59+01:00 »
  const iso = trimmed.replace(" ", "T") + "+01:00";
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}
