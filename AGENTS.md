# 🤖 AGENTS.md — Directives & Instructions pour l'Agent IA

> **Document de cadrage impératif** pour tout agent IA intervenant sur le projet **Clean & Bliss**.  
> À lire **intégralement** avant toute écriture ou modification de code.  
> Ce document ne remplace pas les documents sources (`GUIDE.md`, `DESIGN.md`, `ANIMATIONS.md`) mais fixe leur **gouvernance opérationnelle**, les **standards de code** et la **méthode de travail**.

---

## 📑 Sommaire

1. [Contexte & Vision Métier](#1-contexte--vision-métier)
2. [Stack Technique Officielle](#2-stack-technique-officielle)
3. [Documents de Référence & Hiérarchie de Vérité](#3-documents-de-référence--hiérarchie-de-vérité)
4. [Règles Strictes de Développement](#4-règles-strictes-de-développement)
   - [4.1 Commentaires bilingues obligatoires (EN + FR)](#41--commentaires-bilingues-obligatoires-en--fr)
   - [4.2 Tokens CSS uniquement (Zéro valeur en dur)](#42--tokens-css-uniquement-zéro-valeur-en-dur)
   - [4.3 Primitives UI réutilisables](#43--primitives-ui-réutilisables)
   - [4.4 Server Components par défaut](#44--server-components-par-défaut)
   - [4.5 Langue de l'interface & conventions de nommage](#45--langue-de-linterface--conventions-de-nommage)
   - [4.6 Accessibilité (a11y) & Inclusivité](#46--accessibilité-a11y--inclusivité)
   - [4.7 Sécurité & Robustesse](#47--sécurité--robustesse)
5. [Mémoire de Travail & Continuité — AGENT-MEMORY.md](#5-mémoire-de-travail--continuité--agent-memorymd)
6. [Arborescence & Architecture du Projet](#6-arborescence--architecture-du-projet)
7. [État des Lieux du Backend (WordPress & WooGraphQL)](#7-état-des-lieux-du-backend-wordpress--woographql)
8. [Feuille de Route & Avancement Frontend (Next.js)](#8-feuille-de-route--avancement-frontend-nextjs)
9. [Protocole d'Exécution & Checklist de l'Agent](#9-protocole-dexécution--checklist-de-lagent)

---

## 1. Contexte & Vision Métier

**Clean & Bliss** est une boutique e-commerce de référence basée à **Cotonou (Bénin)**, dédiée au bien-être, à la parfumerie et aux soins de la maison.

### Les 5 familles de produits du catalogue :
1. 🧴 **Parfums** — Parfumerie fine, eaux de parfum, brumes.
2. 🕯️ **Bougies** — Bougies parfumées artisanales et décoratives.
3. 🧼 **Nettoyants** — Soins du linge, nettoyants écologiques et désodorisants d'intérieur.
4. 🌬️ **Senteurs et diffuseurs** — Diffuseurs à bâtonnets, huiles et sprays d'ambiance.
5. 🧊 **Déodorants** — Soins corporels et déodorants fraîcheur longue durée.

### Choix de l'architecture Headless :
- **Backend de données :** WordPress + WooCommerce (gestion catalogue, stocks, commandes, clients).
- **Frontend applicatif :** Next.js App Router (performances d'affichage maximales, SEO d'élite, UX sur-mesure).
- **Spécificités locales béninoises :**
  - Moyens de paiement locaux : **Mobile Money** (MTN MoMo, Moov Money via FedaPay / Kkiapay) + Paiement à la livraison (Cash).
  - Canaux de vente directs : Passerelle de commande assistée via **WhatsApp**.
  - Logistique locale : Gestion fine des zones de livraison (Cotonou, Abomey-Calavi, Porto-Novo, intérieur du Bénin).

---

## 2. Stack Technique Officielle

| Couche | Technologie / Outil | Rôle & Usage |
| :--- | :--- | :--- |
| **Framework Web** | **Next.js 16** (App Router, React 19, TypeScript) | Architecture modulaire, React Server Components (RSC), SSR/SSG hybride |
| **Styling** | **Tailwind CSS 4** + Design Tokens CSS | Utilisation exclusive des tokens déclarés dans `@/app/globals.css` |
| **Data Layer** | **GraphQL** (WPGraphQL, WooGraphQL, CoCart, Faust.js) | Requêtes typées côté serveur, cache optimisé, mutations sécurisées |
| **Animations** | **GSAP 3** (ScrollTrigger, Context) + **Framer Motion** + **Swiper** | Révélations progressives, micro-interactions, carrousels tactiles fluides |
| **Iconographie** | **Lucide React** (SVG inline) | Icônes vectorielles légères avec attributs d'accessibilité |
| **Formulaires** | **React Hook Form** + **Zod** | Validation déclarative stricte et gestion des erreurs en français |
| **État Client** | **Zustand** | Gestion de l'état panier, wishlist, modales et préférences locales |
| **Composants Primitifs** | **Radix UI** | Primitives headless accessibles (Dialog, Accordion, Dropdown, Drawer) |
| **Backend CMS** | **WordPress** + **WooCommerce** | Moteur e-commerce, custom resolvers PHP, Pods, endpoints REST |
| **Environnement Local** | **Local by Flywheel** | Serveur de développement WordPress local |

---

## 3. Documents de Référence & Hiérarchie de Vérité

Pour toute prise de décision, l'agent doit se référer aux documents sources selon la hiérarchie établie :

| Priorité | Document | Rôle & Périmètre |
| :---: | :--- | :--- |
| **1️⃣** | **`@/app/globals.css`** | **Implémentation réelle des tokens** (couleurs, rayons, espacements, ombres). *Source de vérité pour les valeurs CSS utilisables.* |
| **2️⃣** | **`DESIGN.md`** | **Design System & Spécifications UI** (typographie, palettes, états de composants). *Source de vérité pour COMMENT styler.* |
| **3️⃣** | **`GUIDE.md`** (et parties C, D, E, F) | **Architecture fonctionnelle, copywriting et décisions métier**. *Source de vérité pour QUOI construire.* |
| **4️⃣** | **`ANIMATIONS.md`** | **Règles cinétiques & interactions** (courbes de bézier, easings, durées, respect a11y). *Source de vérité pour le MOUVEMENT.* |

> [!WARNING]
> ### Règle d'or absolue : Invariance des spécifications
> **Ne JAMAIS inventer** une couleur, un espacement, un rayon, une police ou un comportement absent de ces 4 documents.  
> Si une valeur ou une spécification manque : **s'arrêter immédiatement et solliciter l'arbitrage de l'utilisateur**.

---

## 4. Règles Strictes de Développement

### 4.1 — Commentaires bilingues obligatoires (EN + FR)

Chaque commentaire de code explicatif doit être rédigé **en anglais ET en français**, dans cet ordre immuable :

```typescript
// EN: Fetch the featured products from WooCommerce via GraphQL
// FR: Récupère les produits vedettes depuis WooCommerce via GraphQL
const products = await getFeaturedProducts();

/**
 * EN: Formats a product price with local currency symbol (FCFA)
 * FR: Formate le prix d'un produit avec le symbole monétaire local (FCFA)
 *
 * @param amount - EN: Numerical price value / FR: Valeur numérique du prix
 * @returns EN: Formatted currency string / FR: Chaîne formatée avec la devise
 */
export function formatPrice(amount: number): string {
  // EN: Ensure non-breaking space before currency symbol
  // FR: Assure un espace insécable avant le symbole de devise
  return `${amount.toLocaleString('fr-FR')}\u00A0FCFA`;
}
```

#### Règles précises d'application :
- **JSDoc au-dessus de chaque fonction, composant et hook :** Présentation du rôle en EN puis FR.
- **Commentaires en ligne pour la logique non triviale :** Format `// EN: ...` suivi de `// FR: ...`.
- **Éviter le bruit :** Ne pas commenter les évidences syntaxiques (ex. : `// EN: Increment counter / FR: Incrémente le compteur`).
- **Nommage universel :** Tous les identifiants techniques (noms de fichiers, fonctions, variables, interfaces) doivent être en **anglais**.

---

### 4.2 — Tokens CSS uniquement (Zéro valeur en dur)

Toute valeur numérique brute (`px`, `#hex`, `rgb`, dimensions arbitraires) est strictement proscrite dans les composants.

❌ **Interdit (valeurs brutes en dur) :**
```tsx
<div style={{ padding: '24px', backgroundColor: '#218CC4', borderRadius: '16px' }}>
  <span style={{ fontSize: '14px', color: '#0E2A38' }}>Texte non conforme</span>
</div>
```

✅ **Correct (classes Tailwind v4 générées par les tokens de `@theme`) :**
```tsx
<div className="p-6 rounded-lg bg-brand-primary">
  <span className="text-body-m text-neutral-900">Texte conforme</span>
</div>
```

*Note : si un style dynamique en ligne (`style={{ ... }}`) est requis, utiliser impérativement la variable CSS : `style={{ backgroundColor: 'var(--color-brand-primary)' }}`.*

> [!TIP]
> Toutes les classes utilitaires (`bg-brand-primary`, `text-neutral-900`, `rounded-lg`, `text-body-m`, etc.) sont automatiquement générées par Tailwind v4 à partir des tokens déclarés dans `@theme` de `@/app/globals.css`. Consultez `DESIGN.md` pour le dictionnaire complet.

---

### 4.3 — Primitives UI réutilisables

- Les composants d'interface fondamentaux sont centralisés dans `@/components/ui/` :  
  `Button`, `ButtonLink`, `Input`, `IconButton`, `Checkbox`, `RadioGroup`, `Badge`, `Card`, `Accordion`, `Drawer`.
- **Interdiction formelle** de recoder un bouton, un champ de saisie ou un badge ad-hoc dans un composant métier ou une page.

---

### 4.4 — Server Components par défaut

- Tout composant est par défaut un **React Server Component** (aucun directive `"use client"` sans justification).
- L'utilisation de `"use client"` est strictement restreinte aux îlots nécessitant :
  - La gestion d'état local (`useState`, `useReducer`, `Zustand`).
  - L'écoute d'événements utilisateur (`onClick`, `onChange`, `onSubmit`).
  - Des hooks de cycle de vie et d'effets du DOM (`useEffect`, `useRef`).
  - Des animations GSAP dépendantes du DOM ou de ScrollTrigger.
- Les requêtes de données GraphQL et l'orchestration principale s'exécutent côté serveur.

---

### 4.5 — Langue de l'interface & conventions de nommage

- **Interface utilisateur (UI) :** 100 % en **français** (libellés, boutons, notifications, messages d'erreur, aria-labels).  
  *Seuls les noms officiels de marques (Adopt, Lattafa, MTN, Moov) restent inchangés.*
- **Code source :** 100 % en **anglais** (variables, fonctions, types, fichiers, messages de commit).

---

### 4.6 — Accessibilité (a11y) & Inclusivité

- **Attributs aria obligatoires :** `aria-label` descriptif sur tous les boutons contenant uniquement une icône (`IconButton`).
- **Médias :** Attribut `alt` signifiant obligatoire sur chaque balise image.
- **Focus visible :** Ne jamais masquer l'anneau de focus (`focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]`).
- **Navigation au clavier :** Accessible intégralement via la touche `Tab`, `Enter` et `Escape`.
- **Contraste visuel :** Respect strict de la norme **WCAG AA** (ratio de contraste minimal de 4.5:1 pour le texte normal).
- **Mouvement réduit :** Respect impératif de la préférence utilisateur `prefers-reduced-motion` (désactivation ou adoucissement des transitions via le hook dédié `useReducedMotion`).

---

### 4.7 — Sécurité & Robustesse

- **Protection des clés privées :** Aucune clé d'API secrète WooCommerce ou JWT ne doit transiter vers le bundle client navigateur.
- **BFF / Route Handlers :** Tout appel nécessitant des privilèges sensibles transite par les routes d'API internes de Next.js (`@/app/api/...`).
- **Sanitisation HTML :** Tout contenu HTML dynamique renvoyé par WordPress/Gutenberg doit être assaini avec `DOMPurify` avant injection dans le DOM (`dangerouslySetInnerHTML`).
- **Validation des données :** Validation obligatoire de tous les formulaires et payloads API via des schémas **Zod**.

---

## 5. Mémoire de Travail & Continuité — AGENT-MEMORY.md

Pour assurer une continuité irréprochable entre les sessions des différents agents IA, chaque intervention doit être consignée dans le fichier journal dédié.

📍 **Chemin du fichier :** `AGENT-MEMORY.md` (à la racine du projet)

### Typologie des entrées à consigner :

| Catégorie | Description & Exemples |
| :--- | :--- |
| **Composant créé** | `@/components/layout/Header.tsx` — Structure 3 sections (annonce + top + nav) |
| **Fichier modifié** | `@/app/globals.css` — Ajout des tokens d'ombres `--shadow-card` et `--shadow-card-hover` |
| **Décision technique** | Recours au hook `useReveal` personnalisé avec `gsap.context()` au lieu du paquet `@gsap/react` |
| **Bug résolu** | Correction du débordement horizontal causé par `overflow-visible` sur Swiper |
| **Question en attente** | Validation attendue sur la largeur responsive des cartes produit sur mobile |
| **Tâche en cours** | Spécification de la prochaine section ou page à implémenter |

### Modèle standard d'entrée de session :

````markdown
## YYYY-MM-DD — [Périmètre / Titre de la session]

### ✅ Terminé
- **Fichier / Composant** — Description synthétique du travail réalisé et validé.

### ✅ Vérifications & Tests
- Compilation TypeScript (`npx tsc --noEmit`) : ✅
- Linting (`npx eslint`) : ✅
- Validation visuelle & responsive (Playwright / Navigateur) : ✅

### 🐛 Bugs résolus
- Description du problème rencontré → Solution technique appliquée.

### 📝 Décisions techniques
- Justification des choix structurants ou arbitrages pris par rapport aux documents guides.

### ❓ Questions en attente
- Points d'ambiguïté nécessitant une confirmation utilisateur.

### 🚧 En cours / Prochaine étape
- Périmètre précis prévu pour la session suivante.
````

> [!IMPORTANT]
> **Règle absolue :** Mettre à jour `AGENT-MEMORY.md` à la fin de chaque session de travail avant de rendre la main.

---

## 6. Arborescence & Architecture du Projet

L'application frontend Next.js suit l'architecture modulaire ci-dessous :

```text
clean-bliss-frontend/
├── public/                     # Actifs statiques publics (images, logos, favicon)
├── src/
│   ├── app/                    # Next.js App Router (Pages, Layouts, Route Handlers)
│   │   ├── api/                # Endpoints API internes (BFF, relais sécurisés)
│   │   ├── boutique/           # Route catalogue produits (/boutique)
│   │   ├── produit/            # Route fiche produit (/produit/[slug])
│   │   ├── globals.css         # Déclaration des Design Tokens CSS (@theme Tailwind v4)
│   │   ├── layout.tsx          # Layout racine (Header, Footer, Providers, Polices)
│   │   ├── page.tsx            # Page d'accueil assemblant les 13 sections
│   │   └── providers.tsx       # Fournisseurs d'état client (Toast, Zustand, etc.)
│   ├── components/             # Composants d'interface React
│   │   ├── ui/                 # Primitives UI réutilisables (Button, Input, Badge, Card...)
│   │   ├── header/             # Header, Navigation, TopBar, AnnouncementBar, Actions
│   │   ├── footer/             # Footer complet, colonnes, newsletter, réseaux, mentions
│   │   ├── shared/             # Composants partagés (Section, Reveal, ProductCard, Carousel...)
│   │   ├── sections/           # Sections modulaires de la page d'accueil (Hero, Univers...)
│   │   ├── product/            # Composants fiche produit (Gallery, BuyBox, Details, Reviews)
│   │   └── shop/               # Composants boutique (Filtres, Grille, Pagination, Tri)
│   ├── hooks/                  # Hooks React réutilisables (useReveal, useInView, useReducedMotion)
│   └── lib/                    # Logique métier, utilitaires et requêtes GraphQL
│       ├── api/                # Connecteurs et gestionnaires de requêtes HTTP/GraphQL
│       ├── queries/            # Requêtes GraphQL typées (homepage, product, shop...)
│       ├── cn.ts               # Utilitaire de fusion conditionnelle de classes CSS
│       └── format.ts           # Formatage monétaire (FCFA), dates et assainissement
├── AGENTS.md                   # Ce fichier : Guide et règles pour l'agent IA
├── package.json                # Dépendances du projet et scripts npm
├── tailwind.config.ts          # Configuration Tailwind CSS
└── tsconfig.json               # Configuration TypeScript stricte
```

---

## 7. État des Lieux du Backend (WordPress & WooGraphQL)

> [!CAUTION]
> **Ne JAMAIS recréer ou modifier ces éléments sans consigne explicite.** Ils sont déjà déployés, configurés et opérationnels sur l'instance WordPress locale.

| Composant Backend | Emplacement / Outil | Statut |
| :--- | :--- | :---: |
| **CMS & E-commerce** | WordPress 6.x + WooCommerce 9.x | ✅ Opérationnel |
| **Moteur GraphQL** | Plugins WPGraphQL + WooGraphQL + CoCart + JWT Auth | ✅ Opérationnel |
| **Champs Personnalisés** | Pods (`homepage`, `a_propos`, `businessdetails`) | ✅ Opérationnel |
| **Résolveurs Custom** | `wp-content/themes/.../inc/*.php` | ✅ Opérationnel |
| **Mutations Adresses** | `inc/graphql-customers.php` | ✅ Opérationnel |
| **Recommandations** | `inc/recommendations.php` | ✅ Opérationnel |
| **Notifications Dynamiques** | `inc/notifications.php` | ✅ Opérationnel |
| **Messagerie & Contact** | CPT `contact_message` + endpoint `/wp-json/cleanbliss/v1/contact` | ✅ Opérationnel |
| **Contenus Editoriaux** | Articles du blog Clean & Bliss (Publications initiales) | ✅ Opérationnel |
| **Médiathèque** | Images produits, bannières et logos optimisés | ✅ Opérationnel |

---

## 8. Feuille de Route & Avancement Frontend (Next.js)

Phase courante : **Phase 2 — Développement & Intégration du Frontend Next.js**.

| Périmètre Fonctionnel | Fichiers Clés | Statut |
| :--- | :--- | :---: |
| **Layout Racine** (Header + Footer + Providers globaux) | `@/app/layout.tsx`, `@/components/header/`, `@/components/footer/` | ✅ Terminé |
| **Primitives UI** (Button, Input, Badge, Card, Accordion, Drawer...) | `@/components/ui/*.tsx` | ✅ Terminé |
| **Page d'Accueil** (Assemblage complet des 13 sections B.1) | `@/app/page.tsx`, `@/components/sections/*.tsx` | ✅ Terminé |
| **Boutique & Catalogue** (Grille produits, filtres, tri, pagination) | `@/app/boutique/page.tsx`, `@/components/shop/*.tsx` | ✅ Terminé |
| **Fiche Produit** (Galerie, BuyBox, onglets, avis, recommandations) | `@/app/produit/[slug]/page.tsx`, `@/components/product/*.tsx` | ✅ Terminé |
| **Panier & Drawer Panier** (Panier plein, panier vide, mise à jour) | `@/app/cart/`, `@/components/cart/` | 🚧 En cours |
| **Tunnel de Commande (Checkout)** (Formulaire, zones Bénin, FedaPay MoMo) | `@/app/checkout/page.tsx` | ⏳ En attente |
| **Espace Client / Compte** (Vue d'ensemble + 5 sous-vues de gestion) | `@/app/account/` | ⏳ En attente |
| **Pages Statiques** (À propos, Contact, Blog / Publications, Page 404) | `@/app/a-propos/`, `@/app/contact/`, etc. | ⏳ En attente |
| **Fonctionnalités Transverses** (Wishlist locale, Comparateur, Recherche live) | `@/lib/store/`, composants dédiés | ⏳ En attente |

> [!NOTE]
> **Règle de validation incrémentale :** Construire et valider unitairement chaque section et chaque page (layout, responsive, a11y, 0 erreur console) avant d'engager la suivante.

---

## 9. Protocole d'Exécution & Checklist de l'Agent

Avant d'initier toute session de travail, l'agent IA doit appliquer le protocole suivant :

### 🛫 Avant d'écrire la moindre ligne de code
- [ ] Consulter la dernière entrée du journal `AGENT-MEMORY.md` pour identifier l'état exact et les questions en attente.
- [ ] Vérifier les spécifications dans `GUIDE.md` (contenu), `DESIGN.md` (styles) et `ANIMATIONS.md` (mouvements).
- [ ] Confirmer l'existence des tokens nécessaires dans `@/app/globals.css`.

### ⚙️ Pendant l'implémentation
- [ ] Respecter la séparation Server Components / Client Components.
- [ ] Réutiliser les primitives de `@/components/ui/` sans créer de styles ad-hoc.
- [ ] Rédiger les commentaires bilingues `// EN: ...` et `// FR: ...` sur chaque fonction et bloc logique.
- [ ] Assurer la compatibilité responsive (Mobile 390px, Tablette 768px, Desktop 1440px/1920px).
- [ ] Vérifier l'absence de débordement horizontal (`scrollWidth === clientWidth`).

### 🏁 Avant de clore la session
- [ ] Exécuter la vérification des types : `npx tsc --noEmit`.
- [ ] Exécuter le linter : `npx eslint` sur les fichiers modifiés.
- [ ] Consigner exhaustivement le travail dans `AGENT-MEMORY.md` (Terminé, Bugs résolus, Décisions, Questions).