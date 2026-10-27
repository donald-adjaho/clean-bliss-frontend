"use client";

/**
 * EN: OfferCountdown — live 4-block (days / hours / min / sec) countdown used by
 *     homepage §5 (GUIDE.md § B.1.3, ANIMATIONS.md §7). Receives the Pods
 *     `offresEndDate` string from the Server Component parent, ticks every second
 *     via a `setInterval`, and shows an expiry message once the end date is past.
 *     Returns null when `endDate` is missing or unparsable. `prefers-reduced-motion`
 *     freezes the tick (value stays on the last computed remaining time) but the
 *     end state still renders.
 * FR: OfferCountdown — compte à rebours en direct sur 4 blocs (jours / heures /
 *     min / sec) utilisé par l'accueil §5 (GUIDE.md § B.1.3, ANIMATIONS.md §7).
 *     Reçoit la chaîne Pods `offresEndDate` depuis le Server Component parent,
 *     décrémente chaque seconde via un `setInterval`, et affiche un message
 *     d'expiration une fois la date de fin passée. Renvoie null si `endDate`
 *     est absent ou illisible. `prefers-reduced-motion` fige le tick (la valeur
 *     reste sur le dernier temps restant calculé) mais l'état final s'affiche.
 */

import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";
import { parseWpDate } from "@/lib/format";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface OfferCountdownProps {
  /** EN: Raw end date string from Pods (`YYYY-MM-DD HH:MM:SS`) · FR: Chaîne de date de fin brute de Pods (`YYYY-MM-DD HH:MM:SS`) */
  endDate: string | null;
}

interface Remaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

/** EN: Pads a number to two digits · FR: Complète un nombre sur deux chiffres */
function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

/** EN: Computes the remaining time down to the second, or null once expired.
 * FR: Calcule le temps restant à la seconde près, ou null une fois expiré. */
function computeRemaining(end: Date, now: Date): Remaining | null {
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

/** EN: 4-block grid (white tiles with a subtle border, Cormorant serif numbers).
 * FR: Grille de 4 blocs (tuiles blanches à liseré discret, chiffres serif Cormorant). */
function CountdownBlocks({ remaining }: { remaining: Remaining }) {
  const blocks: { label: string; value: string }[] = [
    { label: "Jours", value: remaining.days },
    { label: "Heures", value: remaining.hours },
    { label: "Mins", value: remaining.minutes },
    { label: "Secs", value: remaining.seconds },
  ];

  return (
    // EN: role="timer" — a live countdown should not be announced on every tick
    // FR: role="timer" — un compte à rebours ne doit pas être annoncé à chaque tick
    <div
      role="timer"
      aria-label="Temps restant avant la fin des offres"
      className="flex flex-wrap items-stretch gap-[var(--space-md)]"
    >
      {blocks.map((block) => (
        <div
          key={block.label}
          className="flex min-w-[var(--space-6xl)] flex-col items-center gap-[var(--space-xs)] rounded-[var(--radius-md)] border border-border-subtle bg-base-white px-[var(--space-md)] py-[var(--space-md)] shadow-card"
        >
          {/* EN: suppressHydrationWarning — the seconds value depends on the
                  render clock, which differs between server and client.
              FR: suppressHydrationWarning — la valeur des secondes dépend de
                  l'horloge de rendu, qui diffère entre serveur et client. */}
          <span
            suppressHydrationWarning
            className="font-heading text-h4 leading-none text-action-primary tabular-nums"
          >
            {block.value}
          </span>
          <span className="text-body-s uppercase tracking-[0.12em] text-text-secondary">{block.label}</span>
        </div>
      ))}
    </div>
  );
}

export function OfferCountdown({ endDate }: OfferCountdownProps) {
  const reducedMotion = useReducedMotion();

  // EN: Initial value from a lazy initializer (computed once on the first
  //     render, server and client) — avoids a synchronous setState in the effect.
  // FR: Valeur initiale via un initialiseur paresseux (calculé une fois au
  //     premier rendu, serveur et client) — évite un setState synchrone dans l'effet.
  const [remaining, setRemaining] = useState<Remaining | null>(() => {
    const target = parseWpDate(endDate);
    return target ? computeRemaining(target, new Date()) : null;
  });

  useEffect(() => {
    const target = parseWpDate(endDate);
    // EN: No date, or reduced motion → keep the initial value, no ticking
    // FR: Pas de date, ou mouvement réduit → conserver la valeur initiale, pas de tick
    if (!target || reducedMotion) return;

    const interval = setInterval(() => {
      setRemaining(computeRemaining(target, new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate, reducedMotion]);

  const end = parseWpDate(endDate);

  // EN: Missing or unparsable date → render nothing (GUIDE.md § B.1.5 "error")
  // FR: Date absente ou illisible → ne rien rendre (GUIDE.md § B.1.5 « error »)
  if (!end) return null;

  // EN: Expired → single polite message, grid hidden (GUIDE.md § B.1.5 "expired")
  // FR: Expiré → message unique poli, grille masquée (GUIDE.md § B.1.5 « expired »)
  if (!remaining) {
    return (
      <p aria-live="polite" className="text-body-m text-text-secondary">
        Les offres flash sont terminées pour ce mois…
      </p>
    );
  }

  return (
    // EN: Tinted panel behind the tiles — gives the countdown a premium,
    //     separated treatment on the white offers box.
    // FR: Panneau teinté derrière les tuiles — offre au compteur un traitement
    //     premium et détaché sur la boîte blanche des offres.
    <div className="flex w-full flex-col gap-[var(--space-md)] rounded-[var(--radius-md)] bg-bg-tint p-[var(--space-lg)]">
      <p className="flex items-center gap-[var(--space-xs)] text-body-m text-text-secondary">
        <IconClock className="size-4 shrink-0 text-action-primary" aria-hidden="true" />
        Temps restant pour l&apos;offre du mois :
      </p>
      <CountdownBlocks remaining={remaining} />
    </div>
  );
}
