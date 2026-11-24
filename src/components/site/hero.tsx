"use client"

import { motion, useReducedMotion } from "framer-motion"
import { BookingCta } from "@/components/site/booking-cta"
import { DeliveryNote } from "@/components/site/delivery-note"
import { LinkButton } from "@/components/site/link-button"
import { fadeUpTransition, heroFadeVariants } from "@/lib/motion"
import { site } from "@/lib/site"

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="hero-glow relative overflow-hidden border-b border-border">
      {!reduce ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-foreground/[0.04] blur-3xl dark:bg-white/[0.06]"
          animate={{ x: ["-8%", "6%", "-8%"], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          <motion.p
            variants={heroFadeVariants}
            transition={fadeUpTransition}
            className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase"
          >
            {site.tagline}
          </motion.p>
          <motion.h1
            variants={heroFadeVariants}
            transition={fadeUpTransition}
            className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-6xl sm:leading-[1.05]"
          >
            White-label tech, product, and AI automation for agencies
          </motion.h1>
          <motion.p
            variants={heroFadeVariants}
            transition={fadeUpTransition}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            We design and ship the work your clients already hired you for. Websites, apps, software, and automation go out under your name. Ours stays off the masthead.
          </motion.p>
          <motion.div
            variants={heroFadeVariants}
            transition={fadeUpTransition}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <BookingCta className="transition-transform hover:scale-[1.02] active:scale-[0.99]" />
            <LinkButton href="/work" variant="outline" className="group transition-transform hover:scale-[1.02]">
              See the work
              <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </LinkButton>
          </motion.div>
          <motion.p
            variants={heroFadeVariants}
            transition={fadeUpTransition}
            className="mt-8 text-sm text-muted-foreground"
          >
            Agencies in the {site.markets.join(", ")}.
          </motion.p>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ ...fadeUpTransition, delay: 0.2 }}
        >
          <DeliveryNote />
        </motion.div>
      </div>
    </section>
  )
}
