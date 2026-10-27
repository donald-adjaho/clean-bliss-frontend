/**
 * EN: WhatsApp brand icon — Tabler IconBrandWhatsapp (outline, 1.5px stroke,
 *     currentColor), size comes from the caller's className.
 * FR: Icône de marque WhatsApp — Tabler IconBrandWhatsapp (outline,
 *     trait 1.5px, currentColor), la taille vient du className de l'appelant.
 */

import type { SVGProps } from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export function WhatsAppIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconBrandWhatsapp stroke={1.5} aria-hidden="true" className={className} {...props} />;
}