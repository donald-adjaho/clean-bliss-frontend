/**
 * EN: TestimonialsSection — homepage §9 "Avis clients" (GUIDE.md B.1 §9). A
 *     centered header over a Swiper carousel of TestimonialCards sourced from
 *     real WooCommerce reviews. The section hides itself when there are no
 *     reviews, so it simply disappears until the first review is published
 *     (GUIDE.md B.1 §9 — "Source : avis WooCommerce").
 * FR: TestimonialsSection — accueil §9 « Avis clients » (GUIDE.md B.1 §9). Un
 *     en-tête centré au-dessus d'un carrousel Swiper de TestimonialCard alimenté
 *     par les vrais avis WooCommerce. La section se masque quand il n'y a aucun
 *     avis : elle disparaît jusqu'à la publication du premier avis
 *     (GUIDE.md B.1 §9 — « Source : avis WooCommerce »).
 *
 * EN: Server Component — only the nested Carousel is a client island.
 * FR: Server Component — seul le Carousel imbriqué est une île client.
 */

import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { Carousel } from "@/components/shared/Carousel";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import type { HomeTestimonial } from "@/lib/queries/homepage";

interface TestimonialsSectionProps {
  testimonials: HomeTestimonial[];
}

/* EN: §9 carousel breakpoints — cards ≈350px mobile, ≈700px desktop
   FR: Points de rupture du carrousel §9 — cartes ≈350px mobile, ≈700px desktop */
const TESTIMONIAL_BREAKPOINTS = {
  0: { slidesPerView: 1.08, spaceBetween: 16 },
  768: { slidesPerView: 1.4, spaceBetween: 20 },
  1024: { slidesPerView: 1.5, spaceBetween: 24 },
  1280: { slidesPerView: 1.6, spaceBetween: 24 },
};

/* EN: Horizontal rhythm shared by the header and the carousel rails
   FR: Rythme horizontal partagé par l'en-tête et les rails du carrousel */
const CONTAINER_X =
  "px-[var(--space-mobile-h)] md:px-[var(--space-tablet)] xl:px-[var(--space-5xl)]";

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // EN: No reviews yet → hide the whole section · FR: Aucun avis → masquer toute la section
  if (testimonials.length === 0) return null;

  return (
    <Section
      id="avis-clients"
      unpadded
      className="overflow-hidden py-[var(--space-mobile-v)] md:py-[var(--space-tablet)] xl:py-[var(--space-8xl)]"
    >
      <div className={CONTAINER_X}>
        <Reveal>
          <SectionHeader align="center" eyebrow="Avis clients" title="Ce que nos Clients disent" />
        </Reveal>
      </div>

      <Reveal className={`mt-[var(--space-4xl)] ${CONTAINER_X}`}>
        <Carousel
          ariaLabel="Avis clients"
          showNavigation={false}
          showPagination
          breakpoints={TESTIMONIAL_BREAKPOINTS}
          items={testimonials.map((testimonial) => (
            <div key={testimonial.id} className="mx-auto h-full w-full max-w-[700px]">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        />
      </Reveal>
    </Section>
  );
}
