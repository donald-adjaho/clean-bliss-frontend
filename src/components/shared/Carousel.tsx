"use client";

/**
 * EN: Carousel — Swiper-based horizontal slider (ANIMATIONS.md §6). Autoplay 4s
 *     per slide, pauses on hover and when the section is off-screen; a manual
 *     gesture (swipe or arrow) pauses autoplay for 5s before it resumes
 *     (ANIMATIONS.md §6). Arrows are custom 44×44px round white buttons
 *     (fond blanc, --radius-full, light shadow — GUIDE.md l.1315). On touch
 *     devices Swiper's native swipe/scroll-snap is used; autoplay is disabled
 *     when the user prefers reduced motion while the arrows stay functional.
 * FR: Carousel — carrousel horizontal basé sur Swiper (ANIMATIONS.md §6).
 *     Autoplay 4 s par carte, pause au survol et hors écran ; un geste manuel
 *     (swipe ou flèche) met l'autoplay en pause 5 s avant reprise
 *     (ANIMATIONS.md §6). Les flèches sont des boutons ronds blancs 44×44px
 *     personnalisés (fond blanc, --radius-full, ombre légère — GUIDE.md l.1315).
 *     Sur tactile, le swipe/scroll-snap natif de Swiper est utilisé ; l'autoplay
 *     est désactivé si l'utilisateur préfère réduire les animations, les flèches
 *     restant fonctionnelles.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** EN: Per-breakpoint slide configuration · FR: Configuration des diapositives par point de rupture */
type BreakpointConfig = Record<number, { slidesPerView: number; spaceBetween: number }>;

interface CarouselProps {
  /** EN: One React node per slide · FR: Un nœud React par diapositive */
  items: ReactNode[];
  /** EN: Accessible label describing the carousel · FR: Libellé accessible décrivant le carrousel */
  ariaLabel: string;
  className?: string;
  /** EN: Responsive slides-per-view configuration · FR: Configuration responsive du nombre de diapositives */
  breakpoints?: BreakpointConfig;
  /** EN: Show prev/next arrows · FR: Afficher les flèches précédent/suivant */
  showNavigation?: boolean;
  /** EN: Show pagination dots · FR: Afficher les points de pagination */
  showPagination?: boolean;
  /** EN: Infinite loop · FR: Boucle infinie */
  loop?: boolean;
}

/* EN: Default breakpoints for product rows — 1.25 mobile, 2.5 tablet, 4 desktop
   FR: Points de rupture par défaut pour les rangées produit — 1,25 mobile, 2,5 tablette, 4 desktop */
const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  0: { slidesPerView: 1.25, spaceBetween: 12 },
  640: { slidesPerView: 2.2, spaceBetween: 16 },
  768: { slidesPerView: 2.5, spaceBetween: 16 },
  1024: { slidesPerView: 3, spaceBetween: 16 },
  1280: { slidesPerView: 4, spaceBetween: 16 },
};

/* EN: Shared classes for the round white navigation arrows (44×44px). Vertically
 *     centered on the 240px image frame (top-[120px] — same spec value as the
 *     ProductCard image height). Colors/shadows from tokens only.
   FR: Classes partagées des flèches rondes blanches (44×44px). Centrées
 *     verticalement sur le cadre image de 240px (top-[120px] — même valeur de
 *     spec que la hauteur d'image de ProductCard). Couleurs/ombres via tokens. */
const ARROW_CLASSES = cn(
  "absolute top-[120px] z-10 hidden size-11 -translate-y-1/2 items-center justify-center",
  "rounded-full bg-base-white text-text-primary shadow-card",
  "transition-[background-color,color,box-shadow] duration-[var(--duration-fast)] ease-out",
  "hover:bg-action-primary hover:text-action-on-primary hover:shadow-card-hover",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
  "disabled:pointer-events-none disabled:opacity-40",
  "md:inline-flex",
);

/* EN: Autoplay pause after a manual gesture (ANIMATIONS.md §6)
   FR: Pause de l'autoplay après un geste manuel (ANIMATIONS.md §6) */
const MANUAL_PAUSE_MS = 5000;

export function Carousel({
  items,
  ariaLabel,
  className,
  breakpoints = DEFAULT_BREAKPOINTS,
  showNavigation = true,
  showPagination = false,
  loop = true,
}: CarouselProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [containerRef, inView] = useInView<HTMLDivElement>({ rootMargin: "200px" });
  const prefersReduced = useReducedMotion();
  const [reachedStart, setReachedStart] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  // EN: Keep the live in-view value in a ref so the resume timer can read it
  // FR: Garde la valeur « dans le champ » en direct dans une ref pour le minuteur de reprise
  const inViewRef = useRef(inView);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  // EN: Pause autoplay when off-screen and resume when back in view
  // FR: Mettre l'autoplay en pause hors écran et le reprendre au retour
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (inView && !prefersReduced) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [inView, prefersReduced]);

  // EN: Stop autoplay, then restart it 5s later (only while still on-screen)
  // FR: Stoppe l'autoplay, puis le relance 5 s plus tard (seulement si toujours à l'écran)
  const pauseAutoplayBriefly = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay || prefersReduced) return;
    swiper.autoplay.stop();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (inViewRef.current && swiperRef.current?.autoplay) swiperRef.current.autoplay.start();
    }, MANUAL_PAUSE_MS);
  }, [prefersReduced]);

  // EN: Clear the pending resume timer on unmount
  // FR: Nettoyer le minuteur de reprise en attente au démontage
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  // EN: Sync arrow disabled states with the current position (loop = never disabled)
  // FR: Synchronise l'état désactivé des flèches avec la position (loop = jamais désactivé)
  const syncEdges = useCallback(
    (swiper: SwiperClass) => {
      setReachedStart(swiper.isBeginning);
      setReachedEnd(swiper.isEnd);
    },
    [],
  );

  const handlePrev = () => {
    pauseAutoplayBriefly();
    swiperRef.current?.slidePrev();
  };
  const handleNext = () => {
    pauseAutoplayBriefly();
    swiperRef.current?.slideNext();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <Swiper
        modules={[A11y, Autoplay, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          syncEdges(swiper);
        }}
        onSlideChange={syncEdges}
        onReachBeginning={() => setReachedStart(true)}
        onReachEnd={() => setReachedEnd(true)}
        onFromEdge={(swiper) => syncEdges(swiper)}
        // EN: A manual swipe pauses autoplay for 5s (ANIMATIONS.md §6)
        // FR: Un swipe manuel met l'autoplay en pause 5 s (ANIMATIONS.md §6)
        onTouchStart={pauseAutoplayBriefly}
        a11y={{ enabled: true, containerMessage: ariaLabel }}
        autoplay={
          prefersReduced
            ? false
            : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        pagination={showPagination ? { clickable: true } : false}
        loop={loop}
        breakpoints={breakpoints}
        // EN: Brand-colored pagination dots via Swiper CSS variables (tokens only)
        // FR: Points de pagination aux couleurs de la marque via variables CSS Swiper (tokens uniquement)
        style={
          {
            "--swiper-pagination-color": "var(--color-action-primary)",
            "--swiper-pagination-bullet-inactive-color": "var(--color-neutral-200)",
          } as React.CSSProperties
        }
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="h-auto">
            {item}
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          {/* EN: Previous slide · FR: Diapositive précédente */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!loop && reachedStart}
            aria-label="Produits précédents"
            className={cn(ARROW_CLASSES, "left-[var(--space-md)]")}
          >
            <IconChevronLeft className="size-5" aria-hidden="true" />
          </button>
          {/* EN: Next slide · FR: Diapositive suivante */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!loop && reachedEnd}
            aria-label="Produits suivants"
            className={cn(ARROW_CLASSES, "right-[var(--space-md)]")}
          >
            <IconChevronRight className="size-5" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
