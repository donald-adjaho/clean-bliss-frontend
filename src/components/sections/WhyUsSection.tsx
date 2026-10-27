/**
 * EN: WhyUsSection — homepage §8 (GUIDE.md § B.1.3). Two columns: left (60%) a
 *     heading + 4 rounded feature boxes (icon + title + description) in a 2×2
 *     grid; right (40%) the Pods `whyUsImage`. Stacks image-first on mobile.
 * FR: WhyUsSection — accueil §8 (GUIDE.md § B.1.3). Deux colonnes : gauche (60%)
 *     un titre + 4 encarts arrondis (icône + titre + description) en grille 2×2 ;
 *     droite (40%) l'image Pods `whyUsImage`. Empilé image en premier sur mobile.
 *
 * EN: Server Component — static content + next/image. · FR: Server Component — contenu statique + next/image.
 */

import Image from "next/image";
import type { ReactNode } from "react";
import {
  IconSparkles,
  IconShieldCheck,
  IconMessageCircle,
  IconBadge,
} from "@tabler/icons-react";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import type { WpImage } from "@/lib/queries/homepage";

interface WhyUsSectionProps {
  /** EN: Pods `whyUsImage` · FR: Image Pods `whyUsImage` */
  image: WpImage | null;
}

/** EN: The four feature boxes (icon + title + description) — copy from GUIDE.md § B.1.3.
 * FR: Les quatre encarts (icône + titre + description) — texte de GUIDE.md § B.1.3. */
const FEATURES: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <IconSparkles className="size-7" />,
    title: "Sélection soigneusement choisie",
    description:
      "Des parfums, soins et produits de beauté sélectionnés avec attention pour vous proposer des produits qui allient qualité, élégance et plaisir.",
  },
  {
    icon: <IconShieldCheck className="size-7" />,
    title: "La confiance avant tout",
    description:
      "Nous privilégions des produits fiables et une expérience d'achat transparente, pour que vous puissiez acheter avec sérénité.",
  },
  {
    icon: <IconMessageCircle className="size-7" />,
    title: "Des conseils personnalisés",
    description:
      "Vous hésitez entre plusieurs fragrances ? Notre équipe vous accompagne pour trouver le parfum ou le produit qui correspond réellement à vos goûts, votre personnalité et votre occasion.",
  },
  {
    icon: <IconBadge className="size-7" />,
    title: "L'élégance accessible",
    description:
      "Parce que prendre soin de soi et sentir bon ne devrait pas être réservé à quelques-uns, nous cherchons à proposer une expérience premium à des prix accessibles.",
  },
];

export function WhyUsSection({ image }: WhyUsSectionProps) {
  return (
    <Section id="pourquoi-nous">
      <div className="flex flex-col-reverse gap-[var(--space-3xl)] lg:flex-row lg:items-center lg:gap-[72px]">
        {/* EN: Left column (60%) — heading + 2×2 feature grid
            FR: Colonne gauche (60%) — titre + grille 2×2 d'encarts */}
        <div className="flex flex-col gap-[var(--space-2xl)] lg:w-3/5">
          <Reveal>
            <span className="text-body-m font-semibold uppercase tracking-[0.12em] text-action-primary">
              Pourquoi Clean &amp; Bliss ?
            </span>
            <h2 className="mt-[var(--space-md)] max-w-[560px] text-h3 text-text-primary">
              Des parfums qui vous ressemblent, une expérience qui fait la différence.
            </h2>
            <p className="mt-[var(--space-lg)] max-w-[600px] text-body-l text-text-secondary">
              Chez Clean &amp; Bliss, nous croyons que le parfum est bien plus qu&apos;une simple
              fragrance : c&apos;est une signature, une manière d&apos;exprimer sa personnalité et
              de prendre soin de soi.
            </p>
          </Reveal>

          <Reveal selector="[data-feature]" stagger={0.08}>
            <div className="grid grid-cols-1 gap-[var(--space-lg)] sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  data-feature
                  className="flex flex-col gap-[var(--space-md)] rounded-[var(--radius-xl)] bg-brand-surface p-[var(--space-xl)]"
                >
                  <span className="text-action-primary" aria-hidden="true">
                    {feature.icon}
                  </span>
                  <h3 className="text-h6 font-medium text-text-primary">{feature.title}</h3>
                  <p className="text-body-m text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* EN: Right column (40%) — illustration image. Fixed heights so the
                image never overflows the text column: 360px mobile / 450px tablet
                (image sits above the grid there, STRUCTURE-PAGES tablet §8) /
                560px desktop (matched to the ~530px text column).
            FR: Colonne droite (40%) — image d'illustration. Hauteurs fixes pour
                que l'image ne déborde jamais de la colonne texte : 360px mobile /
                450px tablette (l'image est au-dessus de la grille, STRUCTURE-PAGES
                tablette §8) / 560px desktop (aligné sur la colonne texte ~530px). */}
        <Reveal className="lg:w-2/5">
          <div className="relative h-[360px] w-full overflow-hidden rounded-[var(--radius-lg)] bg-brand-surface sm:h-[450px] lg:h-[560px]">
            {image?.sourceUrl && (
              <Image
                src={image.sourceUrl}
                alt={image.altText || "Clean & Bliss"}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover"
              />
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
