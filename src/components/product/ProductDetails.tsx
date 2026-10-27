/**
 * EN: ProductDetails — description, ingredients/INCI/mode d'emploi detection
 *     (GUIDE.md §B.3.2). Parses basic blocks from WooCommerce HTML.
 * FR: Détails produit — description, ingrédients/INCI/mode d'emploi
 *     (GUIDE.md §B.3.2). Parse basique des blocs depuis le HTML WooCommerce.
 */

import { IconDroplet, IconLeaf, IconSparkles } from "@tabler/icons-react";
import { decodeHtmlEntities } from "@/lib/format";
import { cn } from "@/lib/cn";

interface ProductDetailsProps {
  description: string | null;
}

function stripHtml(html: string): string {
  const decoded = decodeHtmlEntities(html);
  return decoded.replace(/<[^>]+>/g, "\n").replace(/\n+/g, "\n").trim();
}

function hasBlock(text: string, label: string): boolean {
  const regex = new RegExp(`${label}\\s*:`, "i");
  return regex.test(text);
}

const INGREDIENT_CARDS = [
  { icon: IconLeaf, name: "Extraits botaniques", benefit: "Douceur et bien-être" },
  { icon: IconDroplet, name: "Actifs hydratants", benefit: "Confort au quotidien" },
  { icon: IconSparkles, name: "Notes olfactives", benefit: "Signature unique" },
];

const STEPS = [
  { title: "Préparer", desc: "Appliquez sur peau propre et sèche." },
  { title: "Appliquer", desc: "Utilisez une dose adaptée à vos besoins." },
  { title: "Laisser agir", desc: "Suivez le temps d'action recommandé." },
  { title: "Terminer", desc: "Profitez du résultat au quotidien." },
];

export function ProductDetails({ description }: ProductDetailsProps) {
  if (!description) return null;

  const raw = stripHtml(description);
  const showIngredients = hasBlock(raw, "Ingrédients");
  const showUsage = hasBlock(raw, "Utilisation") || hasBlock(raw, "Mode d'emploi");

  // EN: Very light extraction — keep full description as-is for now (HTML cleaned by stripHtml to text)
  // FR: Extraction très légère — conserver la description complète pour l'instant
  const paragraphs = raw
    .split(/\n{2,}/)
    .map((p) => p.replace(/^\s*[-•]\s*/gm, ""))
    .filter((p) => p && !/^(Ingrédients|Utilisation|Mode d'emploi|Liste complète)/i.test(p));

  return (
    <section className="w-full bg-bg-surface">
      <div
        className={cn(
          "mx-auto flex flex-col gap-[var(--space-2xl)] xl:flex-row xl:gap-[var(--space-4xl)]",
          "px-[var(--space-mobile-h)] py-[var(--space-3xl)]",
          "md:px-[var(--space-tablet)]",
          "xl:px-[var(--space-5xl)]",
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-[var(--space-xl)]">
            <h2 className="font-heading text-h4 text-text-primary">Description</h2>
            <div className="flex flex-col gap-[var(--space-lg)]">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-body-m text-text-secondary">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {showIngredients && (
            <div className="mt-[var(--space-3xl)] flex flex-col gap-[var(--space-xl)]">
              <h3 className="font-heading text-h5 text-text-primary">Ingrédients clés</h3>
              <div className="grid gap-[var(--space-md)] sm:grid-cols-2">
                {INGREDIENT_CARDS.map((card) => (
                  <div
                    key={card.name}
                    className="flex items-center gap-[var(--space-md)] rounded-[var(--radius-md)] border border-border-subtle p-[var(--space-lg)]"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-bg-tint text-action-primary">
                      <card.icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-body-m font-medium text-text-primary">{card.name}</span>
                      <span className="text-body-s text-text-muted">{card.benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="w-full xl:w-[420px] xl:shrink-0">
          <div className="flex flex-col gap-[var(--space-lg)] rounded-[var(--radius-md)] bg-bg-tint p-[var(--space-xl)] xl:p-[var(--space-2xl)]">
            <h3 className="font-heading text-h5 text-text-primary">Comment l'utiliser</h3>
            <div className="flex flex-col gap-[var(--space-md)]">
              {STEPS.map((step, idx) => (
                <div key={step.title} className="flex items-start gap-[var(--space-md)]">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-action-primary text-body-s font-semibold text-base-white">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col gap-[var(--space-2xs)]">
                    <span className="text-body-m font-semibold text-text-primary">{step.title}</span>
                    <span className="text-body-s text-text-secondary">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
