/**
 * EN: TikTok brand icon — Tabler IconBrandTiktok (outline, 1.5px stroke,
 *     currentColor), size comes from the caller's className.
 * FR: Icône de marque TikTok — Tabler IconBrandTiktok (outline, trait 1.5px,
 *     currentColor), la taille vient du className de l'appelant.
 */

import type { SVGProps } from "react";
import { IconBrandTiktok } from "@tabler/icons-react";

export function TikTokIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <IconBrandTiktok stroke={1.5} aria-hidden="true" className={className} {...props} />;
}