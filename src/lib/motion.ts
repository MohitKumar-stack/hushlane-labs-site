import type { Transition, Variants } from "framer-motion"

/** Shared motion settings. Prefer these over one-off values in components. */
export const motionEase = [0.22, 1, 0.36, 1] as const

export const fadeUpTransition: Transition = {
  duration: 0.55,
  ease: motionEase,
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

export const heroFadeVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export const viewportOnce = { once: true, margin: "0px 0px -48px 0px" } as const
