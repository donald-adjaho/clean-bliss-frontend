/**
 * EN: Homepage (Server Component) — assembles the homepage sections from
 *     GUIDE.md § B.1. Data is fetched once on the server through
 *     getHomepageData() and cached.
 * FR: Page d'accueil (Server Component) — assemble les sections de l'accueil de
 *     GUIDE.md § B.1. Les données sont récupérées une fois côté serveur via
 *     getHomepageData() puis mises en cache.
 *
 * EN: Lot A — §1 Hero, §2 Nos Univers, §3 Meilleures ventes, §4 Nouveautés.
 *     Lot B — §5 Offres, §6 Marquee, §7 Collections, §8 Pourquoi nous.
 *     Lot C — §9 Témoignages, §10 Marques, §11 FAQ, §12 Benefits, §13 CTA visite.
 * FR: Lot A — §1 Hero, §2 Nos Univers, §3 Meilleures ventes, §4 Nouveautés.
 *     Lot B — §5 Offres, §6 Marquee, §7 Collections, §8 Pourquoi nous.
 *     Lot C — §9 Témoignages, §10 Marques, §11 FAQ, §12 Benefits, §13 CTA visite.
 */

import { getHomepageData } from "@/lib/queries/homepage";
import { Hero } from "@/components/sections/Hero";
import { Univers } from "@/components/sections/Univers";
import { ProductCarouselSection } from "@/components/sections/ProductCarouselSection";
import { OffersFlashSection } from "@/components/sections/OffersFlashSection";
import { MarqueeTrends } from "@/components/sections/MarqueeTrends";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { VisitCtaSection } from "@/components/sections/VisitCtaSection";

export default async function Home() {
  // EN: Single GraphQL round-trip for the whole page (cached 1h)
  // FR: Un seul aller-retour GraphQL pour toute la page (mis en cache 1h)
  const data = await getHomepageData();

  return (
    <main>
      {/* §1 — Hero */}
      <Hero image={data.allSettings.heroImage} />

      {/* §2 — Nos Univers */}
      <Univers categories={data.productCategories.nodes} />

      {/* §3 — Meilleures ventes */}
      <ProductCarouselSection
        id="meilleures-ventes"
        eyebrow="Meilleures ventes"
        title="Adoré Par Notre Communauté"
        description="Nos clients n'arrêtent pas d'en commander. Découvrez-les maintenant et passez votre première commande."
        actionHref="/boutique"
        actionLabel="Voir tous les produits"
        products={data.bestSellers.nodes}
        badge="bestSeller"
      />

      {/* §4 — Nouveautés */}
      <ProductCarouselSection
        id="nouveautes"
        eyebrow="Incontournable"
        title="Nouveautés"
        description="Découvrez nos dernières tendances"
        actionHref="/boutique?tag=nouveautes"
        actionLabel="Voir tous les produits"
        products={data.newArrivals.nodes}
        badge="new"
      />

      {/* §5 — Offres exclusives du mois */}
      <OffersFlashSection offers={data.offers.nodes} endDate={data.allSettings.offresEndDate} />

      {/* §6 — Bandeau défilant */}
      <MarqueeTrends />

      {/* §7 — Collections thématiques */}
      <CollectionsSection
        selection1Image={data.allSettings.selection1Image}
        selection2Image={data.allSettings.selection2Image}
        selection3Image={data.allSettings.selection3Image}
      />

      {/* §8 — Pourquoi Clean & Bliss */}
      <WhyUsSection image={data.allSettings.whyUsImage} />

      {/* §9 — Témoignages (masqué tant qu'aucun avis) */}
      <TestimonialsSection testimonials={data.testimonials} />

      {/* §10 — Nos grandes marques */}
      <BrandsSection />

      {/* §11 — Foires aux questions */}
      <FaqSection />

      {/* §12 — Benefits / Services */}
      <BenefitsSection />

      {/* §13 — CTA visite boutique (+ vidéo) */}
      <VisitCtaSection
        address={data.allSettings.businessAdresse}
        phone={data.allSettings.businessPhone}
        video={data.allSettings.ctaVideo}
      />
    </main>
  );
}
