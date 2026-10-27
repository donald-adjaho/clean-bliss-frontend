/**
 * EN: Search icon — Tabler IconSearch (24px grid, 1.5px stroke, currentColor)
 *     for a consistent, refined header look.
 * FR: Icône recherche — Tabler IconSearch (grille 24px, trait 1.5px,
 *     currentColor) pour un rendu de header cohérent et raffiné.
 */

import type { SVGProps } from "react";
import { IconSearch } from "@tabler/icons-react";

export function SearchIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconSearch stroke={1.5} aria-hidden="true" className={className} {...props} />;
}