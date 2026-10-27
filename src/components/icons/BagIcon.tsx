/**
 * EN: Shopping bag icon — Tabler IconShoppingBag (24px grid, 1.5px stroke,
 *     currentColor) for a refined premium header look.
 * FR: Icône sac de shopping — Tabler IconShoppingBag (grille 24px, trait 1.5px,
 *     currentColor) pour un rendu premium raffiné du header.
 */

import type { SVGProps } from "react";
import { IconShoppingBag } from "@tabler/icons-react";

export function BagIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconShoppingBag stroke={1.5} aria-hidden="true" className={className} {...props} />;
}