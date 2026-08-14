"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without setState-in-effect. Returns false
 * during server rendering and the first hydration pass.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void): (() => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    (): boolean => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
