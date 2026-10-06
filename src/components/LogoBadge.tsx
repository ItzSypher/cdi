import { motion, useReducedMotion, type Transition } from "motion/react";
import { LOGO, LOGO_COLORS as C } from "../lib/logo-geometry";

type Props = {
  className?: string;
  /** desenha o logo traço a traço (preloader e reel) */
  animated?: boolean;
  title?: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function LogoBadge({ className, animated = false, title = "CDI Refrigeração" }: Props) {
  const reduce = useReducedMotion();
  const live = animated && !reduce;

  const draw = (delay: number, duration = 0.55) =>
    live
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { delay, duration, ease } satisfies Transition,
        }
      : {};

  const rise = (delay: number) =>
    live
      ? {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease } satisfies Transition,
        }
      : {};

  const sweep = (delay: number, from: number) =>
    live
      ? {
          initial: { opacity: 0, rotate: from },
          animate: { opacity: 1, rotate: 0 },
          transition: { delay, duration: 0.8, ease } satisfies Transition,
        }
      : {};

  const letter = { fill: "none", strokeWidth: 34, strokeLinejoin: "miter" as const };

  return (
    <svg viewBox="0 0 600 600" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="cdi-sw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.white} />
          <stop offset="1" stopColor={C.blue} />
        </linearGradient>
        <linearGradient id="cdi-rule" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.blue} stopOpacity="0" />
          <stop offset=".5" stopColor={C.blue} />
          <stop offset="1" stopColor={C.blue} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="300"
        cy="300"
        r="284"
        fill={C.ink}
        {...(live
          ? { initial: { scale: 0.85, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.6, ease } }
          : {})}
        style={{ transformOrigin: "300px 300px" }}
      />
      <motion.circle
        cx="300"
        cy="300"
        r="284"
        fill="none"
        stroke={C.blue}
        strokeWidth="16"
        style={{ rotate: -90, transformOrigin: "300px 300px" }}
        {...draw(0.15, 0.9)}
      />

      <motion.path d={LOGO.swooshTop} fill="url(#cdi-sw)" style={{ transformOrigin: "305px 228px" }} {...sweep(0.55, -24)} />
      <motion.path d={LOGO.swooshBottom} fill={C.blue} style={{ transformOrigin: "305px 228px" }} {...sweep(0.65, 24)} />

      <motion.path d={LOGO.letterC} stroke={C.white} {...letter} {...draw(0.5)} />
      <motion.path d={LOGO.letterD} stroke={C.blue} {...letter} {...draw(0.65)} />
      <motion.path d={LOGO.letterI} stroke={C.white} {...letter} {...draw(0.8, 0.35)} />

      <motion.g
        style={{ transformOrigin: "466px 166px" }}
        {...(live
          ? { initial: { opacity: 0, rotate: -120, scale: 0.4 }, animate: { opacity: 1, rotate: 0, scale: 1 }, transition: { delay: 0.95, duration: 0.7, ease } }
          : {})}
      >
        <path d={LOGO.snowTop} fill="none" stroke={C.white} strokeWidth="4" strokeLinecap="round" />
      </motion.g>

      <motion.path d={LOGO.refrigeracao} fill={C.white} {...rise(1.05)} />
      <motion.path
        d={LOGO.rule}
        stroke="url(#cdi-rule)"
        strokeWidth="2"
        style={{ transformOrigin: "300px 386px" }}
        {...(live
          ? { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { delay: 1.2, duration: 0.6, ease } }
          : {})}
      />
      <motion.path d={LOGO.tagline} fill={C.white} {...rise(1.25)} />

      <motion.g {...rise(1.4)}>
        <path d={LOGO.snowLeft} fill="none" stroke={C.white} strokeWidth="4" strokeLinecap="round" />
        <path d={LOGO.acBody} fill={C.white} />
        <path d={LOGO.acSlot} stroke={C.ink} strokeWidth="3" />
        <path d={LOGO.acAir} stroke={C.blue} strokeWidth="3" strokeLinecap="round" />
        <path d={LOGO.tools} fill="none" stroke={C.white} strokeWidth="7" strokeLinecap="round" />
        <path d={LOGO.toolsGrip} stroke={C.white} strokeWidth="12" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
