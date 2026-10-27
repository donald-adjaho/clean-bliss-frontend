/**
 * EN: User icon (account) — Tabler IconUser (24px grid, 1.5px stroke,
 *     currentColor) for a consistent, refined header look.
 * FR: Icône utilisateur (compte) — Tabler IconUser (grille 24px, trait 1.5px,
 *     currentColor) pour un rendu de header cohérent et raffiné.
 */

import type { SVGProps } from "react";
import { IconUser } from "@tabler/icons-react";

export function UserIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconUser stroke={1.5} aria-hidden="true" className={className} {...props} />;
}