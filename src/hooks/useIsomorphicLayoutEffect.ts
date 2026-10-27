"use client";

/**
 * EN: useIsomorphicLayoutEffect — useLayoutEffect on the client, useEffect on
 *     the server (where useLayoutEffect would warn). Lets GSAP set the initial
 *     "from" state before the browser paints, avoiding a flash of the final
 *     position.
 * FR: useIsomorphicLayoutEffect — useLayoutEffect côté client, useEffect côté
 *     serveur (où useLayoutEffect déclencherait un avertissement). Permet à GSAP
 *     de poser l'état initial « from » avant le rendu du navigateur, évitant un
 *     flash vers la position finale.
 */

import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
