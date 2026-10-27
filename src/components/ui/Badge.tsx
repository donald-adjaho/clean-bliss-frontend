/**
 * EN: Badge component — small pill used in two families:
 *     1) PRODUCT badges (catalogue/product page, GUIDE.md B.2 + B.3):
 *        promo (-X%), new ("NOUVEAU"), bestseller ("BESTSELLER"), default.
 *     2) STATUS badges (order cards, GUIDE.md B.4): processing / shipped /
 *        completed / cancelled — pill + 14px icon, per-status colors.
 *     Specs: GUIDE.md § A.3 + B.2/B.3/B.4. Tokens only (globals.css).
 * FR: Composant Badge — petite pilule utilisée dans deux familles :
 *     1) Badges PRODUIT (cartes et fiche produit, GUIDE.md B.2 + B.3) :
 *        promo (-X%), new (« NOUVEAU »), bestseller (« BESTSELLER »), default.
 *     2) Badges STATUT (cartes commande, GUIDE.md B.4) : processing / shipped /
 *        completed / cancelled — pilule + icône 14px, couleurs par statut.
 *     Specs : GUIDE.md § A.3 + B.2/B.3/B.4. Tokens uniquement (globals.css).
 *
 * EN: No "use client" — pure presentational component.
 * FR: Pas de "use client" — composant purement présentationnel.
 */

import { cn } from "@/lib/cn";

/** EN: Badge props — variant picks the color family, children is the label text
    FR: Props du badge — la variante choisit la famille de couleurs, children est le texte */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** EN: promo = danger bg · new = brand-accent bg · bestseller = brand-primary bg ·
        default = brand-surface bg + action-primary text ·
        status variants follow GUIDE.md B.4 order-status colors
      FR: promo = fond danger · new = fond brand-accent · bestseller = fond brand-primary ·
        default = fond brand-surface + texte action-primary ·
        variantes statut : couleurs des statuts de commande du GUIDE.md B.4 */
  variant?:
    | "promo"
    | "new"
    | "bestseller"
    | "default"
    | "processing"
    | "shipped"
    | "completed"
    | "cancelled";
  /** EN: Optional 14px icon rendered before the text (status badges, ex. lucide `Clock`)
      FR: Icône 14px optionnelle avant le texte (badges statut, ex. lucide `Clock`) */
  icon?: React.ReactNode;
  /** EN: Badge content (text) · FR: Contenu du badge (texte) */
  children: React.ReactNode;
}

/* EN: Color styles per variant — every color comes from globals.css tokens
   FR: Styles de couleur par variante — chaque couleur vient des tokens de globals.css */
const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  // EN: Promo — solid danger background, white text (badge "-X%")
  // FR: Promo — fond danger plein, texte blanc (badge « -X% »)
  promo: "bg-danger text-danger-on",
  // EN: New — solid brand accent, white text (badge "NOUVEAU")
  // FR: Nouveau — fond accent de marque, texte blanc (badge « NOUVEAU »)
  new: "bg-brand-accent text-base-white",
  // EN: Bestseller — solid brand primary, white text (badge "BESTSELLER")
  // FR: Meilleures ventes — fond primaire de marque, texte blanc (badge « BESTSELLER »)
  bestseller: "bg-brand-primary text-base-white",
  // EN: Default — pale brand surface + action-primary text (pills "Par défaut",
  //     "Vérifié", "Membre depuis…" — GUIDE.md B.4/B.6)
  // FR: Défaut — surface de marque pâle + texte action-primary (pilules « Par défaut »,
  //     « Vérifié », « Membre depuis… » — GUIDE.md B.4/B.6)
  default: "bg-brand-surface text-action-primary",
  // EN: Order status "processing" — pale brand surface + action-primary text + Clock
  // FR: Statut « En traitement » — surface de marque pâle + texte action-primary + Clock
  processing: "bg-brand-surface text-action-primary",
  // EN: Order status "shipped" — pale amber + warning text + Truck
  // FR: Statut « Expédiée » — ambre pâle + texte warning + Truck
  shipped: "bg-warning-surface text-warning",
  // EN: Order status "completed" — pale green + success text + CheckCircle
  // FR: Statut « Livrée » — vert pâle + texte success + CheckCircle
  completed: "bg-success-surface text-success",
  // EN: Order status "cancelled" — pale red + danger text + XCircle
  // FR: Statut « Annulée » — rouge pâle + texte danger + XCircle
  cancelled: "bg-danger-surface text-danger",
};

export function Badge({
  variant = "default",
  icon,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        // EN: Pill base — radius-full, 4px/10px padding, 12px semibold text,
        //     uppercase, tight tracking (product + status badge specs)
        // FR: Base pilule — radius-full, padding 4px/10px, texte 12px semibold,
        //     uppercase, tracking serré (specs badges produit + statut)
        "inline-flex w-fit items-center gap-[var(--space-2xs)] rounded-full",
        "px-[var(--space-sm)] py-[var(--space-2xs)]",
        "text-body-s font-semibold uppercase",
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {/* EN: Optional icon is decorative — the text carries the meaning
          FR: L'icône optionnelle est décorative — le texte porte le sens */}
      {icon && (
        <span aria-hidden="true" className="inline-flex size-[14px] shrink-0 [&_svg]:size-full">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
