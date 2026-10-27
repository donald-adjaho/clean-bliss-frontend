/**
 * EN: MarqueeTrends — homepage §6 (GUIDE.md § B.1.3). Full-bleed dark information
 *     banner cycling the four trust messages. It reuses the exact same messages
 *     and item markup as the Header announcement bar (shared TrustMessages) so
 *     the two bands stay visually identical; only the generic Marquee is a client
 *     island (pause when scrolled out of view).
 * FR: MarqueeTrends — accueil §6 (GUIDE.md § B.1.3). Bandeau d'information sombre
 *     pleine largeur faisant défiler les quatre messages de confiance. Il réutilise
 *     exactement les mêmes messages et le même balisage d'item que le bandeau
 *     d'annonce du Header (TrustMessages partagé) afin que les deux bandeaux
 *     restent visuellement identiques ; seul le Marquee générique est une île
 *     client (pause lorsqu'il sort de la vue).
 */

import { Marquee } from "@/components/shared/Marquee";
import { TRUST_MESSAGES, TrustMessage } from "@/components/shared/TrustMessages";

export function MarqueeTrends() {
  return (
    <section
      role="region"
      aria-label="Nos engagements"
      className="flex h-12 w-full items-center bg-footer-bg"
    >
      {/* EN: No track gap — the item's horizontal padding provides the spacing
              (and the seam), matching the Header bar exactly.
          FR: Aucune gap de piste — le padding horizontal de l'item fournit
              l'espacement (et le raccord), à l'identique du bandeau du Header. */}
      <Marquee>
        {TRUST_MESSAGES.map((message) => (
          <TrustMessage key={message.text} icon={message.icon} text={message.text} />
        ))}
      </Marquee>
    </section>
  );
}
