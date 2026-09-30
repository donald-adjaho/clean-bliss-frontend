# Clean & Bliss — Headless Storefront

> **EN** · Headless e-commerce storefront for **Clean & Bliss**, a Beninese lifestyle brand blending fine perfumery and high-performance home care from Cotonou.
>
> **FR** · Vitrine e-commerce headless pour **Clean & Bliss**, une marque béninoise qui allie parfumerie fine et produits d'entretien haute performance, basée à Cotonou.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![WordPress](https://img.shields.io/badge/WordPress-Headless-21759B?logo=wordpress)](https://wordpress.org/)
[![WooCommerce](https://img.shields.io/badge/WooCommerce-9-96588A?logo=woocommerce)](https://woocommerce.com/)

---

## 📖 Overview / Aperçu

**EN** · Clean & Bliss is a Cotonou-based brand offering four product families: fine perfumes, artisan candles, home fragrances, and household cleaning products. This project delivers a modern headless e-commerce experience — combining a WordPress/WooCommerce backend with a Next.js frontend — designed for speed, elegance, and full editorial control.

**FR** · Clean & Bliss est une marque basée à Cotonou qui propose quatre familles de produits : parfums fins, bougies artisanales, senteurs d'ambiance et produits d'entretien ménager. Ce projet met en place une expérience e-commerce headless moderne — associant un backend WordPress/WooCommerce à un frontend Next.js — pensée pour la performance, l'élégance et le contrôle éditorial total.

---

## 🏗️ Architecture

**EN** · A **headless** setup: WordPress serves as the content and commerce backend (via GraphQL), while Next.js delivers the public-facing storefront.

**FR** · Une architecture **headless** : WordPress sert de backend pour le contenu et le commerce (via GraphQL), tandis que Next.js délivre la vitrine publique.

┌─────────────────────────────────────────────┐
│ WordPress + WooCommerce (Backend) │
│ · Products, categories, tags │
│ · Orders, customers, payments │
│ · Editorial content (Pods fields) │
└──────────────────┬──────────────────────────┘
│ WPGraphQL / REST API
▼
┌─────────────────────────────────────────────┐
│ Next.js + Faust.js (Frontend) │
│ · Pages, sections, animations │
│ · Cart (CoCart), auth (JWT) │
└─────────────────────────────────────────────┘


---

## 🛠️ Tech Stack / Stack technique

### Frontend
- **Next.js 16** — App Router, React Server Components
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Utility-first CSS with custom design tokens
- **Faust.js** — WordPress headless integration
- **GSAP** — Scroll-based and timeline animations
- **Swiper** — Carousels
- **Radix UI** — Accessible component primitives

### Backend
- **WordPress** — Headless CMS
- **WooCommerce** — Product & order management
- **WPGraphQL** + **WooGraphQL** — GraphQL API
- **Pods** — Custom fields (media, settings)
- **CoCart** — Stateless cart API
- **JWT Authentication** — Customer authentication

---

## 📦 Getting Started / Installation

### Prerequisites / Prérequis

- **Node.js** ≥ 20
- **Yarn** ≥ 1.22
- **WordPress** instance running (with the plugins listed above)

### Setup / Installation

```bash
# 1. Clone the repository
# 1. Clone le dépôt
git clone https://github.com/donald-adjaho/clean-bliss-frontend.git
cd clean-bliss-frontend

# 2. Install dependencies
# 2. Installe les dépendances
yarn install

# 3. Configure environment variables
# 3. Configure les variables d'environnement
cp .env.example .env.local
# Edit .env.local with your own values
# Édite .env.local avec tes propres valeurs

# 4. Start the development server
# 4. Démarre le serveur de développement
yarn dev

The app should be running at http://localhost:3000
L'application devrait tourner sur http://localhost:3000

```

### 🔐 Environment Variables / Variables d'environnement

See .env.example for the full list. Never commit .env.local.
Voir .env.example pour la liste complète. Ne jamais commiter .env.local.
Variable	Description (EN / FR)
**NEXT_PUBLIC_WP_URL**	WordPress base URL / URL de base de WordPress
**NEXT_PUBLIC_WP_GRAPHQL_URL**	GraphQL endpoint / Endpoint GraphQL
**FAUST_SECRET_KEY**	Faust.js secret from WP admin / Clé secrète Faust.js
**NODE_TLS_REJECT_UNAUTHORIZED**	Dev only: disable SSL check / Dev uniquement


### 📜 Available Scripts / Scripts disponibles
Command / Commande	Description (EN / FR)
**yarn dev**	Start dev server / Démarre le serveur de développement
**yarn build**	Build for production / Build pour la production
**yarn start**	Start production server / Démarre le serveur de production
**yarn lint**	Run ESLint / Lance ESLint

### 📂 Project Structure / Structure du projet

clean-bliss-frontend/
├── public/                    # Static assets / Assets statiques
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── fonts/             # Local fonts / Polices locales
│   │   ├── globals.css        # Global styles + design tokens
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page / Page d'accueil
│   ├── components/            # React components / Composants React
│   │   ├── layout/            # Header, Footer
│   │   ├── header/            # Header sub-components
│   │   ├── ui/                # Reusable UI primitives
│   │   ├── product/           # Product-related components
│   │   └── sections/          # Homepage sections
│   └── lib/                   # Utilities / Utilitaires
│       └── wp-graphql.js      # GraphQL client / Client GraphQL
├── .env.example               # Env template / Template d'environnement
├── .gitignore
├── package.json
├── tailwind.config.ts
└── tsconfig.json


### 🎨 Design System / Design system

All design tokens (colors, typography, spacing, radii) are declared in src/app/globals.css using Tailwind CSS 4's @theme directive.

Tous les tokens de design (couleurs, typographie, espacements, rayons) sont déclarés dans src/app/globals.css via la directive @theme de Tailwind CSS 4.

Key tokens / Tokens clés :

    --color-brand-primary — Main brand color

    --color-footer-bg — Dark footer background

    --font-heading — Cormorant Garamond

    --font-body — Manrope


### 🚧 Project Status / Statut du projet

    ✅ Done / Terminé

    WordPress + WooCommerce backend

    WPGraphQL + WooGraphQL + CoCart + JWT integration

    Pods custom fields exposed in GraphQL (homepage media, about media, publications gallery)

    Next.js + Faust.js + Tailwind 4 setup

    Local fonts (Cormorant Garamond + Manrope)

    GraphQL client + connection tested

    🚧 In Progress / En cours

    Header (announcement bar, logo, search, actions, navigation)

    Footer

    Homepage sections (Hero, Categories, Best Sellers, ...)

### 📅 Planned / Prévu

    Shop page with filters

    Product detail page

    Cart + Checkout

    Customer account

    Publications pages

    About page

    Contact page



### 👤 Author / Auteur

Donald Adjaho
Web Developer — Cotonou, Benin
Développeur Web — Cotonou, Bénin

    GitHub: @donald-adjaho

    Email: donaldadjaho@yahoo.com



### 📄 License / Licence

EN · Proprietary — All rights reserved. This project is being developed for Clean & Bliss.
FR · Propriétaire — Tous droits réservés. Ce projet est en cours de développement pour Clean & Bliss.