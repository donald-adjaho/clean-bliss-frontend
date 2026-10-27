/**
 * EN: Homepage FAQ content (§11) — one canonical question per product family,
 *     sourced from GUIDE.md Part E.1 (product FAQ per category). The copy is
 *     hardcoded (GUIDE.md B.1 §11 — "Source : contenu hardcodé").
 * FR: Contenu de la FAQ de l'accueil (§11) — une question canonique par famille
 *     de produits, issue de GUIDE.md Partie E.1 (FAQ produit par catégorie). Le
 *     texte est codé en dur (GUIDE.md B.1 §11 — « Source : contenu hardcodé »).
 */

import type { AccordionItemData } from "@/components/ui/Accordion";

/** EN: The five FAQ entries — one per universe (Parfums, Bougies, Nettoyants,
 *     Senteurs, Déodorants) · FR: Les cinq entrées de FAQ — une par univers
 *     (Parfums, Bougies, Nettoyants, Senteurs, Déodorants) */
export const HOME_FAQ: AccordionItemData[] = [
  {
    id: "parfums",
    question: "Comment choisir un parfum qui me correspond ?",
    answer:
      "Le choix dépend de vos goûts, de votre personnalité et du type de notes que vous appréciez. Si vous hésitez entre plusieurs fragrances, notre équipe peut vous accompagner dans votre choix.",
  },
  {
    id: "bougies",
    question: "Combien de temps une bougie peut-elle brûler ?",
    answer:
      "La durée dépend de sa taille, de sa cire et de son utilisation. Pour préserver la bougie, laissez idéalement la cire fondre de manière homogène lors des premières utilisations.",
  },
  {
    id: "nettoyants",
    question: "Comment choisir le bon nettoyant ?",
    answer:
      "Commencez par identifier la surface ou le besoin : cuisine, salle de bain, sols, vitres, désinfection, entretien quotidien, etc. Si vous avez un doute, notre équipe peut vous aider à choisir le produit adapté.",
  },
  {
    id: "senteurs",
    question: "Quelle est la différence entre une senteur et un parfum ?",
    answer:
      "Les parfums sont principalement destinés à parfumer la personne, tandis que les senteurs et diffuseurs sont conçus pour créer une ambiance olfactive dans un espace.",
  },
  {
    id: "deodorants",
    question: "Comment choisir mon déodorant ?",
    answer:
      "Selon vos préférences, votre niveau de transpiration et le type de protection recherché.",
  },
];
