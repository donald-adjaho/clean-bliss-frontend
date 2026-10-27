/**
 * EN: Announcement bar (Header Section 1) — infinite scrolling marquee with
 *     the 4 shop messages + tabler separator icons.
 *     Specs: GUIDE.md A.1.2 Section 1 + A.1.3 + ANIMATIONS.md § 4.
 *     Dark footer background, white 12px uppercase text, 28 s loop,
 *     pause on hover, static banner under prefers-reduced-motion.
 * FR: Bandeau d'annonce (Section 1 du Header) — marquee défilant infini avec
 *     les 4 messages de la boutique + icônes séparatrices tabler.
 *     Specs : GUIDE.md A.1.2 Section 1 + A.1.3 + ANIMATIONS.md § 4.
 *     Fond sombre footer, texte blanc 12px uppercase, boucle 28 s,
 *     pause au survol, bandeau statique sous prefers-reduced-motion.
 *
 * EN: Server Component — pure CSS animation, no JavaScript needed.
 * FR: Server Component — animation CSS pure, aucun JavaScript nécessaire.
 */

import { cn } from "@/lib/cn";
import { TRUST_MESSAGES, TrustMessage } from "@/components/shared/TrustMessages";

export function AnnouncementBar({ className }: { className?: string }) {
  return (
    <div
      role="region"
      aria-label="Bandeau d'annonce"
      className={cn("overflow-hidden bg-footer-bg text-base-white", className)}
    >
      {/* EN: Track — w-max so both copies sit side by side; the CSS animation
          slides it 0 → -50% (ANIMATIONS.md § 4)
          FR: Piste — w-max pour aligner les deux copies ; l'animation CSS la
          glisse de 0 → -50% (ANIMATIONS.md § 4) */}
      <div className="animate-marquee flex w-max">
        {/* EN: Content duplicated exactly 2× — the loop is seamless because the
            track is twice the sequence width
            FR: Contenu dupliqué exactement 2× — la boucle est parfaite car la
            piste mesure deux fois la largeur de la séquence */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            // EN: The duplicate is hidden from screen readers and skipped in
            //     tab order (ANIMATIONS.md § 4)
            // FR: Le doublon est masqué aux lecteurs d'écran et exclu de
            //     l'ordre de tabulation (ANIMATIONS.md § 4)
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0"
          >
            {TRUST_MESSAGES.map((message) => (
              <TrustMessage key={`${copy}-${message.text}`} icon={message.icon} text={message.text} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
