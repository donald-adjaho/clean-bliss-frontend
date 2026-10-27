/**
 * EN: Root layout — wraps every page of the site with the base HTML
 *     structure (<html>, <body>), loads local fonts, global styles
 *     and the shared client <Providers>.
 * FR: Layout racine — enveloppe chaque page du site avec la structure
 *     HTML de base (<html>, <body>), charge les polices locales, les
 *     styles globaux et le <Providers> partagé.
 */

import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

import "./globals.css";
import { Providers } from "./providers";

/* ═══════════════════════════════════════════════════════════════════
   EN: LOCAL FONTS — served from our own server (no Google Fonts
   requests), optimized by next/font (zero layout shift, self-hosted).
   FR: POLICES LOCALES — servies depuis notre propre serveur (aucune
   requête Google Fonts), optimisées par next/font (zéro layout shift,
   auto-hébergées).
   ═══════════════════════════════════════════════════════════════════ */

// EN: Cormorant Garamond — display/heading font, exposed as --font-cormorant
// FR: Cormorant Garamond — police des titres, exposée en --font-cormorant
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

// EN: Manrope — body/UI font, exposed as --font-manrope
// FR: Manrope — police du corps/interface, exposée en --font-manrope
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

/* ═══════════════════════════════════════════════════════════════════
   EN: SEO metadata — read by Next.js to generate <title>,
   <meta name="description"> and Open Graph tags.
   FR: Métadonnées SEO — lues par Next.js pour générer <title>,
   <meta name="description"> et les balises Open Graph.
   ═══════════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: "Clean & Bliss — Beauté, Cosmétique et Soins",
  description:
    "Votre référence à Cotonou pour la parfumerie fine, les bougies, les senteurs et les produits de nettoyage.",
};

// EN: suppressHydrationWarning tolerates browser extensions (Grammarly,
//     ColorZilla…) injecting attributes into <body> before hydration.
// FR: suppressHydrationWarning tolère les extensions navigateur
//     (Grammarly, ColorZilla…) qui injectent des attributs dans <body>
//     avant l'hydratation.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`}>
      <body suppressHydrationWarning>
        <Providers>
          {/* EN: Site header — 3 sections (announcement, main row, nav)
              FR: Header du site — 3 sections (annonce, rangée principale, navigation) */}
          <Header />
          {children}
          {/* EN: Site footer — brand, link columns, watermark, bottom bar
              FR: Footer du site — marque, colonnes de liens, watermark, barre du bas */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
