/**
 * EN: Giant decorative footer watermark (Server Component) — the brand name in
 *     Cormorant Garamond at 5% white opacity. Purely aesthetic: aria-hidden and
 *     NOT animated (GUIDE.md A.2.2 + A.2.6, point de vigilance).
 * FR: Watermark décoratif géant du footer (Server Component) — le nom de la
 *     marque en Cormorant Garamond à 5% d'opacité blanche. Purement esthétique :
 *     aria-hidden et NON animé (GUIDE.md A.2.2 + A.2.6, point de vigilance).
 */

export function FooterWatermark() {
  return (
    // EN: Wrapper — centers the text and clips the overflow (no horizontal scroll)
    // FR: Conteneur — centre le texte et rogne le débordement (pas de scroll horizontal)
    <div
      aria-hidden="true"
      className="pointer-events-none mt-[var(--space-3xl)] select-none overflow-hidden text-center xl:mt-[var(--space-5xl)]"
    >
      {/* EN: Watermark — responsive font size (mobile 84 / tablet 140 / desktop 260)
          FR: Watermark — taille fluide (mobile 84 / tablette 140 / desktop 260) */}
      <span className="block whitespace-nowrap font-heading font-normal leading-[0.9] text-footer-watermark text-watermark-mobile md:text-watermark-tablet xl:text-watermark-desktop">
        Clean &amp; Bliss
      </span>
    </div>
  );
}
