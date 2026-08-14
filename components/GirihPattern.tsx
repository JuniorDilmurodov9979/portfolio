"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface GirihPatternProps {
  readonly className?: string;
}

const SPRING = { stiffness: 80, damping: 22, mass: 0.7 } as const;
const MAX_TILT = 9;

/**
 * Girih-inspired lattice: an eight-pointed star built from an overlapping
 * square and diamond, tiled and faded out radially. Tilts slightly toward
 * the cursor on devices with a precise pointer.
 */
export default function GirihPattern({
  className,
}: GirihPatternProps): React.JSX.Element {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const interactive = finePointer && !reduceMotion;

  // Normalized cursor offset from the viewport centre, -0.5 … 0.5.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    SPRING,
  );
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [MAX_TILT * 0.7, -MAX_TILT * 0.7]),
    SPRING,
  );

  useEffect(() => {
    if (!interactive) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const handleMove = (event: PointerEvent): void => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [interactive, pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        willChange: interactive ? "transform" : undefined,
      }}
    >
      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full text-accent"
        role="presentation"
        focusable="false"
      >
        <defs>
          <pattern
            id="girih-tile"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="currentColor" strokeWidth="0.75">
              {/* Diamond and square overlap into an eight-pointed star. */}
              <path d="M50 0 L100 50 L50 100 L0 50 Z" />
              <path d="M14.64 14.64 H85.36 V85.36 H14.64 Z" />
              {/* The star's octagonal core. */}
              <path d="M64.64 14.64 L85.36 35.36 L85.36 64.64 L64.64 85.36 L35.36 85.36 L14.64 64.64 L14.64 35.36 L35.36 14.64 Z" />
              {/* Corner ties that continue the lattice across tiles. */}
              <path d="M0 0 L14.64 14.64 M100 0 L85.36 14.64 M0 100 L14.64 85.36 M100 100 L85.36 85.36" />
            </g>
          </pattern>

          <radialGradient id="girih-fade" cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <mask id="girih-mask">
            <rect width="800" height="400" fill="url(#girih-fade)" />
          </mask>
        </defs>

        <rect
          width="800"
          height="400"
          fill="url(#girih-tile)"
          mask="url(#girih-mask)"
          opacity="0.55"
        />
      </svg>
    </motion.div>
  );
}
