"use client"

import { motion, useReducedMotion } from "framer-motion"
import { processFlowIcons, iconClass } from "@/lib/icons"
import { processFlowSteps } from "@/lib/process-flow"
import { cn } from "@/lib/utils"

export function ProcessFlow({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-[12.5%] left-[12.5%] hidden h-px overflow-hidden lg:block"
      >
        <motion.span
          className="block h-px w-full origin-left bg-foreground/30"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6" aria-label="How engagement works">
        {processFlowSteps.map((step, index) => {
          const Icon = processFlowIcons[index]
          const isLast = index === processFlowSteps.length - 1
          return (
            <li key={step.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute top-12 bottom-[-2rem] left-6 w-px bg-border lg:hidden"
                />
              ) : null}
              <div className="relative z-10 flex shrink-0 flex-col items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full border border-border bg-background text-sm font-medium shadow-sm">
                  <span className="sr-only">Step {index + 1}. </span>
                  <span aria-hidden="true">{index + 1}</span>
                </span>
                <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted/40">
                  <Icon aria-hidden="true" className={iconClass} strokeWidth={1.75} />
                </span>
              </div>
              <div className="min-w-0 pt-1 lg:pt-0">
                <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
