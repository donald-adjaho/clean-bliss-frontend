"use client";

/**
 * EN: NavLink — main navigation link with an active state: the link of the
 *     current page keeps the action-primary color and a persistent underline
 *     (GUIDE.md A.1.2 Section 3, premium pattern; action-primary for AA).
 * FR: NavLink — lien de navigation principale avec état actif : le lien de la
 *     page courante garde la couleur action-primary et un soulignement persistant
 *     (GUIDE.md A.1.2 Section 3, pattern premium ; action-primary pour l'AA).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/** EN: NavLink props — href + visible label · FR: Props de NavLink — href + label visible */
export interface NavLinkProps {
  /** EN: Target route (ex. "/boutique") · FR: Route cible (ex. « /boutique ») */
  href: string;
  /** EN: Visible link label · FR: Libellé visible du lien */
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();

  // EN: "/" is active only on the exact home route; other sections match on
  //     prefix so nested pages (ex. /boutique?page=2 or /publications/{slug})
  //     keep their section highlighted
  // FR: « / » n'est actif que sur la page d'accueil exacte ; les autres sections
  //     matchent par préfixe pour que les pages imbriquées gardent leur
  //     section surlignée
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative text-body-l transition-colors duration-fast ease-out",
        // EN: Active = action-primary-hover (deeper blue, ≥ 4.5:1 on white AND
        //     on the light tinted header surfaces, where action-primary sits at
        //     4.38). Inactive = same hue on hover only.
        // FR: Actif = action-primary-hover (bleu plus profond, ≥ 4,5:1 sur blanc
        //     ET sur les surfaces teintées du header, où action-primary plafonne
        //     à 4,38). Inactif = même teinte au survol uniquement.
        isActive
          ? "text-action-primary-hover"
          : "text-text-primary hover:text-action-primary-hover",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
      )}
    >
      {label}
      {/* EN: Underline — persistent when active, scaleX 0 → 1 on hover otherwise
          (GUIDE.md A.1.2 Section 3)
          FR: Soulignement — persistant si actif, scaleX 0 → 1 au survol sinon
          (GUIDE.md A.1.2 Section 3) */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-1 left-0 h-px w-full origin-left bg-action-primary-hover",
          "transition-transform duration-base ease-out",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}
