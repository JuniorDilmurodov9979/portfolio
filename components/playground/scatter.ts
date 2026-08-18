/**
 * Fixed lookup tables, not Math.random() — rotation/offset must stay stable
 * across SSR and re-renders. All arrays cycle by `index % 6`.
 */
const ROTATIONS_DEG = [-3, 5, -2, 4, -5, 3] as const;
const OFFSETS_X_PX = [-18, 24, -14, 20, -24, 16] as const;
const OFFSETS_Y_PX = [16, -12, 20, -18, 14, -20] as const;

/** Tablet scatter is reduced to roughly ±2deg / ±10px of the desktop values. */
const TABLET_SCALE = 10 / 24;

export type ScatterVariant = "mobile" | "tablet" | "desktop";

export interface ScatterTransform {
  readonly rotate: number;
  readonly x: number;
  readonly y: number;
  /** Parallax speed multiplier for this card, 0.5-1.2. */
  readonly depth: number;
}

export function getScatterTransform(
  index: number,
  variant: ScatterVariant,
): ScatterTransform {
  const i = index % ROTATIONS_DEG.length;
  const depth = 0.5 + (index % 3) * 0.35;

  if (variant === "mobile") {
    return { rotate: 0, x: 0, y: 0, depth };
  }

  const scale = variant === "tablet" ? TABLET_SCALE : 1;

  return {
    rotate: ROTATIONS_DEG[i] * scale,
    x: OFFSETS_X_PX[i] * scale,
    y: OFFSETS_Y_PX[i] * scale,
    depth,
  };
}

/** Scroll-parallax amplitude in px before the per-card depth multiplier. */
export function getParallaxAmplitude(variant: ScatterVariant): number {
  if (variant === "desktop") return 30;
  if (variant === "tablet") return 12;
  return 0;
}
