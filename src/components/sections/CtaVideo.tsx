"use client";

/**
 * EN: CtaVideo — the boutique video shown in homepage §13 (GUIDE.md B.1 §13,
 *     ANIMATIONS.md §8). Native <video autoPlay muted loop playsInline> with no
 *     poster and `preload="metadata"`, a discreet mute/unmute toggle, and a
 *     fallback image when playback cannot start. Under prefers-reduced-motion
 *     the video stays paused and plays only on click (ANIMATIONS.md §8 — Réduit).
 * FR: CtaVideo — la vidéo boutique affichée dans l'accueil §13 (GUIDE.md B.1 §13,
 *     ANIMATIONS.md §8). <video autoPlay muted loop playsInline> natif, sans
 *     poster et avec `preload="metadata"`, un bouton muet/activer le son discret
 *     et une image de repli quand la lecture ne démarre pas. Sous
 *     prefers-reduced-motion, la vidéo reste en pause et ne joue qu'au clic
 *     (ANIMATIONS.md §8 — Réduit).
 *
 * EN: "use client" required — controls playback state with useState/refs. The
 *     playing flag is driven by the video's onPlay/onPause events (no
 *     setState-in-effect).
 * FR: "use client" requis — pilote l'état de lecture via useState/refs. Le
 *     drapeau de lecture est piloté par les événements onPlay/onPause de la
 *     vidéo (pas de setState dans un effet).
 */

import { useRef, useState } from "react";
import Image from "next/image";
import {
  IconVolume,
  IconVolumeOff,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { WpImage } from "@/lib/queries/homepage";

interface CtaVideoProps {
  /** EN: Video file URL · FR: URL du fichier vidéo */
  src: string | null;
  /** EN: Video MIME type · FR: Type MIME de la vidéo */
  mimeType: string | null;
  /** EN: Fallback image shown if playback fails · FR: Image de repli affichée si la lecture échoue */
  fallbackImage?: WpImage | null;
  /** EN: Accessible name for the video · FR: Nom accessible de la vidéo */
  label?: string;
  className?: string;
}

export function CtaVideo({
  src,
  mimeType,
  fallbackImage = null,
  label = "Vidéo de présentation de la boutique Clean & Bliss",
  className,
}: CtaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // EN: Toggle sound · FR: Basculer le son
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  // EN: Manual playback (reduced motion, or autoplay blocked by the browser)
  // FR: Lecture manuelle (reduced motion, ou autoplay bloqué par le navigateur)
  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(
      () => setIsPlaying(true),
      () => setFailed(true),
    );
  };

  // EN: No usable source or playback failed → show the fallback image (or a
  //     brand-surface placeholder), keeping the section visually complete
  // FR: Aucune source exploitable ou échec de lecture → afficher l'image de
  //     repli (ou un placeholder brand-surface), la section reste complète
  if (!src || failed) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-brand-surface",
          className,
        )}
      >
        {fallbackImage?.sourceUrl && (
          <Image
            src={fallbackImage.sourceUrl}
            alt={fallbackImage.altText || "Boutique Clean & Bliss"}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)]",
        className,
      )}
    >
      {/* EN: Clicking the video itself plays it when autoplay was blocked
          FR: Cliquer la vidéo la lance si l'autoplay a été bloqué */}
      <video
        ref={videoRef}
        className="size-full cursor-pointer object-cover"
        aria-label={label}
        autoPlay={!prefersReduced}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={() => {
          if (!isPlaying) handlePlay();
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src={src} type={mimeType ?? undefined} />
      </video>

      {/* EN: Play overlay — only under reduced motion, where the video stays
            paused until the user asks for playback (ANIMATIONS.md §8)
          FR: Voile de lecture — seulement sous reduced motion, où la vidéo reste
            en pause jusqu'à la demande de l'utilisateur (ANIMATIONS.md §8) */}
      {prefersReduced && !isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Lire la vidéo"
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-neutral-900/30 transition-colors duration-[var(--duration-fast)] ease-out hover:bg-neutral-900/40",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          )}
        >
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-base-white text-text-primary shadow-card">
            <IconPlayerPlayFilled className="size-6" aria-hidden="true" />
          </span>
        </button>
      )}

      {/* EN: Discreet mute toggle (only while playing)
          FR: Bouton muet discret (uniquement pendant la lecture) */}
      {isPlaying && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Activer le son" : "Couper le son"}
          className={cn(
            "absolute bottom-[var(--space-md)] right-[var(--space-md)] inline-flex size-10 items-center justify-center",
            "rounded-full bg-base-white/85 text-text-primary backdrop-blur-sm",
            "transition-colors duration-[var(--duration-fast)] ease-out hover:bg-base-white",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          )}
        >
          {muted ? (
            <IconVolumeOff className="size-5" aria-hidden="true" />
          ) : (
            <IconVolume className="size-5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
