/**
 * EN: BrandsSection — homepage §10 "Marques" (GUIDE.md B.1 §10). A tinted band
 *     with a centered uppercase label and the five brand wordmarks set in the
 *     serif heading font (styled text, no logo images).
 * FR: BrandsSection — accueil §10 « Marques » (GUIDE.md B.1 §10). Une bande
 *     teintée avec un libellé centré en majuscules et les cinq marques
 *     composées dans la police serif de titrage (texte stylisé, pas de logos).
 *
 * EN: Server Component — static content only. · FR: Server Component — contenu statique uniquement.
 */

import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";

/** EN: Brand wordmarks (GUIDE.md B.1 §10) · FR: Marques (GUIDE.md B.1 §10) */
const BRANDS = ["ADOPT", "LATTAFA PRIDE", "MAISON ALHAMBRA", "INTEGRITY", "LIFE"];

export function BrandsSection() {
  return (
    <Section id="marques" background="bg-bg-tint">
      <div className="flex flex-col items-center gap-[var(--space-3xl)]">
        <Reveal>
          <p className="text-center text-body-m font-semibold uppercase tracking-[0.2em] text-text-secondary">
            Nos grandes marques disponibles en boutique
          </p>
        </Reveal>

        <Reveal selector="[data-brand]" stagger={0.08}>
          <ul className="flex flex-wrap items-center justify-center gap-x-[var(--space-3xl)] gap-y-[var(--space-lg)] xl:gap-x-[var(--space-5xl)]">
            {BRANDS.map((brand) => (
              <li
                key={brand}
                data-brand
                className="font-heading text-h5 tracking-[0.08em] text-neutral-700"
              >
                {brand}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
