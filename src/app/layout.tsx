// ┌─────────────────────────────────────────────────────────────────┐
// │ LAYOUT RACINE — Structure commune à TOUTES les pages            │
// │                                                                 │
// │ Rôle : envelopper chaque page du site avec la structure HTML    │
// │ de base (<html>, <body>, balises <head>, etc.).                 │
// │                                                                 │
// │ C'est ici qu'on mettra plus tard :                              │
// │  - Le Header (navbar)                                           │
// │  - Le Footer                                                    │
// │  - Les polices personnalisées (Instrument Serif, Roboto Flex)   │
// └─────────────────────────────────────────────────────────────────┘

// Import de type TypeScript pour les métadonnées
// "type" = on n'importe que le type, pas la valeur (optimisation)

import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";

/* ═══════════════════════════════════════════════════════════════════
   CHARGEMENT DES POLICES — Optimisé Next.js
   
   next/font/google télécharge les polices AU BUILD (une seule fois),
   les stocke dans .next/ et les sert depuis ton propre serveur.
   
   Avantages :
   - Zéro requête vers Google Fonts côté client (RGPD ✓)
   - Zéro layout shift (police déjà chargée)
   - Performance maximale
   ═══════════════════════════════════════════════════════════════════ */

// import { Cormorant_Garamond, Manrope } from "next/font/google"; /*Obtenir les polices via google*/

/* ═══════════════════════════════════════════════════════════════════
   POLICES LOCALES — Clean & Bliss
   
   Chargées depuis ton propre serveur (pas de Google Fonts).
   Avantage : fonctionne même avec une connexion instable.
   ═══════════════════════════════════════════════════════════════════ */
import localFont from "next/font/local" /*Obtenir les polices téléchargées en local*/

// Import des styles globaux (Tailwind + styles custom)
// "./" = chemin relatif (même dossier que layout.tsx)
import "./globals.css";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

/*const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant", // Variable CSS réutilisable
  display: "swap",               // Affiche fallback pendant le chargement
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
*/
const cormorant = localFont({
  src: [
    { path: "./fonts/CormorantGaramond-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/CormorantGaramond-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/CormorantGaramond-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/CormorantGaramond-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = localFont({
  src: [
    { path: "./fonts/Manrope-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Manrope-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Manrope-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Manrope-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});
// ┌─────────────────────────────────────────────────────────────────┐
// │ MÉTADONNÉES SEO                                                  │
// │                                                                 │
// │ Ces infos sont lues par Next.js pour générer les balises :      │
// │  - <title> dans l'onglet du navigateur                          │
// │  - <meta name="description"> pour Google                        │
// │  - Open Graph (partage sur réseaux sociaux)                     │
// └─────────────────────────────────────────────────────────────────┘
export const metadata: Metadata = {
  title: "Clean & Bliss",
  description: "Votre référence à Cotonou pour la parfumerie fine et les produits de nettoyage.",
};

/*export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
*/

// ┌─────────────────────────────────────────────────────────────────┐
// │ COMPOSANT RootLayout                                             │
// │                                                                 │
// │ "children" = le contenu de la page en cours                     │
// │ Ex: si tu vas sur /test-graphql, children = <TestGraphQL />     │
// │                                                                 │
// │ Readonly<{...}> = type TypeScript qui dit :                     │
// │  "children est un ReactNode, et on ne le modifie pas"           │
// └─────────────────────────────────────────────────────────────────┘
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`}>
      {/* 
        suppressHydrationWarning = dit à React :
        "Ne t'inquiète pas si le HTML du serveur diffère du client"
        
        Pourquoi ? Parce que des extensions de navigateur (ColorZilla,
        Grammarly, etc.) injectent des attributs dans le HTML après
        que React ait fait son rendu. Sans ce flag, React affiche
        une erreur d'hydratation dans la console.
        
        Ce n'est PAS un problème de sécurité ni de code. C'est juste
        une tolérance pour les extensions utilisateur.
      */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}