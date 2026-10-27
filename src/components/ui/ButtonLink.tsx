/**
 * EN: ButtonLink — an <a>/Next <Link> styled exactly like the Button component.
 *     Used for navigation CTAs ("Explorer la Boutique", "Voir tout"...) so we
 *     never nest a <button> inside an <a>. Reuses Button's class builder.
 * FR: ButtonLink — un <a>/<Link> Next stylé exactement comme le composant Button.
 *     Utilisé pour les CTA de navigation (« Explorer la Boutique », « Voir tout »…)
 *     afin de ne jamais imbriquer un <button> dans un <a>. Réutilise le
 *     constructeur de classes de Button.
 *
 * EN: No "use client" — Next <Link> works from Server Components.
 * FR: Pas de "use client" — <Link> Next fonctionne depuis les Server Components.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClassName, type ButtonProps } from "@/components/ui/Button";

/** EN: Reuses the Button visual props and forwards native anchor attributes
 *      (target, rel, aria-label…) · FR: Réutilise les props visuelles de Button
 *      et transmet les attributs natifs de l'ancre (target, rel, aria-label…). */
export interface ButtonLinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  > {
  /** EN: Link target · FR: Cible du lien */
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  /** EN: Optional icon (tabler icons-react node) · FR: Icône optionnelle (nœud @tabler/icons-react) */
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  iconPosition = "left",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...rest}
    >
      {/* EN: Leading icon · FR: Icône de gauche */}
      {icon && iconPosition === "left" && (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      )}

      {children}

      {/* EN: Trailing icon · FR: Icône de droite */}
      {icon && iconPosition === "right" && (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {icon}
        </span>
      )}
    </Link>
  );
}
