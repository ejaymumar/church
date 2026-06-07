import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before this element animates in. */
  delay?: number;
  /** Travel distance (px) for the slide-up. */
  y?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal: fades + slides up the first time it enters the
 * viewport. `MotionConfig reducedMotion="user"` (set at the page root) makes
 * this collapse to an instant show when the OS requests reduced motion.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — children using `staggerItem` reveal in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
