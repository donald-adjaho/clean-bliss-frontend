/**
 * EN: Compare icon — Tabler IconArrowsDiff (24px grid, 1.5px stroke,
 *     currentColor) for a refined, consistent header look.
 * FR: Icône comparer — Tabler IconArrowsDiff (grille 24px, trait 1.5px,
 *     currentColor) pour un rendu de header cohérent et raffiné.
 */

import type { SVGProps } from "react";
import { IconArrowsDiff } from "@tabler/icons-react";

export function CompareIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconArrowsDiff stroke={1.5} aria-hidden="true" className={className} {...props} />;
}