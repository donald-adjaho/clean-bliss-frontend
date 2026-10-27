/**
 * EN: Instagram brand icon — Tabler IconBrandInstagram (outline, 1.5px stroke,
 *     currentColor), size comes from the caller's className.
 * FR: Icône de marque Instagram — Tabler IconBrandInstagram (outline,
 *     trait 1.5px, currentColor), la taille vient du className de l'appelant.
 */

import type { SVGProps } from "react";
import { IconBrandInstagram } from "@tabler/icons-react";

export function InstagramIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconBrandInstagram stroke={1.5} aria-hidden="true" className={className} {...props} />;
}