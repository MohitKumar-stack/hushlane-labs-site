"use client"

import { motion, useReducedMotion } from "framer-motion"

const rows = [
  ["Client of record", "Your agency"],
  ["Build partner", "Hushlane Labs"],
  ["Name on the invoice", "Your brand"],
  ["What the end client sees", "Your team"],
]

export function DeliveryNote() {
  const reduce = useReducedMotion()

  return (
    <motion.aside
      aria-label="How a white-label engagement is credited"
      className="rounded-2xl border border-border bg-card/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Delivery note</p>
      <dl className="mt-6 divide-y divide-border">
        {rows.map(([label, value], index) => (
          <motion.div
            key={label}
            className="flex items-baseline justify-between gap-6 py-3 text-sm"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
          >
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium">{value}</dd>
          </motion.div>
        ))}
      </dl>
    </motion.aside>
  )
}
