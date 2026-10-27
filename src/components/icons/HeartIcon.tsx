/**
 * EN: Heart icon (wishlist) — Tabler IconHeart (24px grid, 1.5px stroke,
 *     currentColor) for a refined, consistent header look.
 * FR: Icône cœur (liste de souhaits) — Tabler IconHeart (grille 24px,
 *     trait 1.5px, currentColor) pour un rendu de header cohérent et raffiné.
 */

import type { SVGProps } from "react";
import { IconHeart } from "@tabler/icons-react";

export function HeartIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconHeart stroke={1.5} aria-hidden="true" className={className} {...props} />;
}