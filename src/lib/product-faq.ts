/**
 * EN: Product FAQ mapping by category slug (GUIDE.md §B.3.4/E.1). Returns a
 *     list of questions/answers per product category; falls back to a generic
 *     set when the category is unknown.
 * FR: Mapping FAQ produit par slug de catégorie (GUIDE.md §B.3.4/E.1). Retourne
 *     une liste de questions/réponses par catégorie produit ; utilise un jeu
 *     générique si la catégorie est inconnue.
 */

import type { AccordionItemData } from "@/components/ui/Accordion";

export interface ProductFaqCategoryMap {
  [slug: string]: AccordionItemData[];
}

const GENERIC_FAQ: AccordionItemData[] = [
  {
    id: "faq-generic-1",
    question: "Comment passer commande ?",
    answer:
      "Ajoutez vos produits au panier, puis validez votre commande depuis la page panier. Vous pourrez choisir votre mode de livraison et votre mode de paiement.",
  },
  {
    id: "faq-generic-2",
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons Mobile Money (MTN, Moov) ainsi que le paiement à la livraison selon les zones desservies.",
  },
  {
    id: "faq-generic-3",
    question: "Quels sont les délais et zones de livraison ?",
    answer:
      "Nous livrons à Cotonou, Calavi et Akpakpa. Le retrait en boutique est gratuit sous 14 jours. Les délais sont précisés au moment de la commande.",
  },
  {
    id: "faq-generic-4",
    question: "Comment sont expédiés mes produits ?",
    answer:
      "Vos produits sont soigneusement emballés pour préserver leur intégrité. En cas de doute, notre équipe reste à votre écoute via WhatsApp.",
  },
];

const CATEGORY_FAQ: ProductFaqCategoryMap = {
  parfums: [
    {
      id: "faq-parfums-1",
      question: "Comment bien choisir mon parfum ?",
      answer:
        "Testez le parfum sur votre peau et laissez-le évoluer quelques minutes. Les notes de tête se dissipent rapidement, ce sont les notes de cœur et de fond qui révèlent le caractère du parfum.",
    },
    {
      id: "faq-parfums-2",
      question: "Combien de temps tient un parfum ?",
      answer:
        "La tenue dépend de la concentration et de votre type de peau. En général, un parfum bien choisi tient plusieurs heures. Appliquer sur les points de pulsation (poignets, cou) prolonge la tenue.",
    },
    {
      id: "faq-parfums-3",
      question: "Puis-je tester en boutique ?",
      answer:
        "Oui, rendez-vous dans notre boutique à Cotonou pour tester nos parfums et bénéficier des conseils personnalisés de notre équipe.",
    },
    {
      id: "faq-parfums-4",
      question: "Comment conserver mon parfum ?",
      answer:
        "Conservez votre parfum à l'abri de la lumière directe et de la chaleur, idéalement dans son flacon d'origine ou dans un endroit frais et sec.",
    },
  ],
  bougies: [
    {
      id: "faq-bougies-1",
      question: "Comment bien brûler ma bougie ?",
      answer:
        "Lors de la première utilisation, laissez brûler jusqu'à ce que la cire forme une nappe homogène sur toute la surface (1-2h). Cela évite le creusement au centre.",
    },
    {
      id: "faq-bougies-2",
      question: "Combien de temps puis-je laisser ma bougie allumée ?",
      answer:
        "Nous recommandons de ne pas laisser une bougie allumée plus de 3-4 heures d'affilée. Éteignez-la avant de quitter la pièce ou de vous endormir.",
    },
    {
      id: "faq-bougies-3",
      question: "Comment éteindre ma bougie en toute sécurité ?",
      answer:
        "Préférez un éteignoir à bougie ou soufflez délicatement en veillant à ne pas projeter de cire. Évitez de souffler trop fort.",
    },
    {
      id: "faq-bougies-4",
      question: "Ma bougie fume-t-elle trop ?",
      answer:
        "Une mèche trop longue peut provoquer de la fumée. Coupez la mèche à environ 5mm avant chaque utilisation pour un brûlage propre.",
    },
  ],
  nettoyants: [
    {
      id: "faq-nettoyants-1",
      question: "Ces produits conviennent-ils à tous les types de surface ?",
      answer:
        "Chaque produit a une utilisation spécifique. Vérifiez bien l'étiquette et testez sur une petite zone peu visible avant une utilisation plus large.",
    },
    {
      id: "faq-nettoyants-2",
      question: "Faut-il diluer les nettoyants ?",
      answer:
        "Certains produits sont prêts à l'emploi, d'autres nécessitent une dilution. Suivez les indications sur le produit ou la notice fournie.",
    },
    {
      id: "faq-nettoyants-3",
      question: "Peut-on utiliser les nettoyants en présence d'enfants ou d'animaux ?",
      answer:
        "Aérez bien la pièce pendant l'utilisation et rangez les produits hors de portée des enfants et des animaux. Suivez les précautions d'emploi.",
    },
    {
      id: "faq-nettoyants-4",
      question: "Comment conserver mes produits d'entretien ?",
      answer:
        "Conservez dans leur emballage d'origine, hermétiquement fermé, dans un endroit frais et sec, à l'abri de la lumière directe.",
    },
  ],
  senteurs: [
    {
      id: "faq-senteurs-1",
      question: "Comment utiliser un diffuseur de senteur ?",
      answer:
        "Suivez les instructions spécifiques à votre diffuseur. En général, placez-le dans un espace bien ventilé et ajustez l'intensité selon vos préférences.",
    },
    {
      id: "faq-senteurs-2",
      question: "Combien de temps diffuse une senteur ?",
      answer:
        "La durée dépend du produit et du diffuseur utilisé. Certaines senteurs durent plusieurs heures, d'autres se diffusent en continu selon le système choisi.",
    },
    {
      id: "faq-senteurs-3",
      question: "Les senteurs sont-elles adaptées à toute la maison ?",
      answer:
        "Oui, mais évitez de diffuser dans les pièces très petites et mal ventilées. Aérez régulièrement et suivez les recommandations d'utilisation.",
    },
    {
      id: "faq-senteurs-4",
      question: "Puis-je mélanger différentes senteurs ?",
      answer:
        "Nous recommandons d'utiliser une senteur à la fois pour profiter pleinement de son identité olfactive. Certains accords peuvent cependant être harmonieux.",
    },
  ],
  deodorants: [
    {
      id: "faq-deodorants-1",
      question: "Quelle est la différence entre déodorant et antiperspirant ?",
      answer:
        "Le déodorant aide à limiter les odeurs, l'antiperspirant limite également la transpiration. Vérifiez la composition du produit pour connaître son action.",
    },
    {
      id: "faq-deodorants-2",
      question: "À quel moment appliquer mon déodorant ?",
      answer:
        "Appliquez sur peau propre et sèche, idéalement après la douche. Laissez sécher avant de vous habiller pour un meilleur confort.",
    },
    {
      id: "faq-deodorants-3",
      question: "Peut-on l'utiliser après le rasage ?",
      answer:
        "Si votre peau est sensible après le rasage, attendez quelques minutes avant d'appliquer le déodorant pour éviter les irritations.",
    },
    {
      id: "faq-deodorants-4",
      question: "Le déodorant laisse-t-il des traces ?",
      answer:
        "Certains formats peuvent laisser des traces sur les vêtements foncés. Laissez sécher complètement avant de vous habiller ou privilégiez un format adapté.",
    },
  ],
};

/**
 * EN: Returns FAQ items for a product based on its primary category slug.
 * FR: Retourne les questions/réponses FAQ pour un produit selon le slug de sa catégorie principale.
 */
export function getProductFaqItems(categorySlug?: string | null): AccordionItemData[] {
  if (!categorySlug) return GENERIC_FAQ;
  const items = CATEGORY_FAQ[categorySlug];
  if (items && items.length > 0) return items;
  return GENERIC_FAQ;
}
