"use client"

import { motion, useReducedMotion } from "framer-motion"
import { fadeUpTransition, fadeUpVariants, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function FadeIn({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "li" | "article" | "header"
}) {
  const reduce = useReducedMotion()
  const Component = motion.create(Tag)

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Component
      className={cn(className)}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...fadeUpTransition, delay }}
    >
      {children}
    </Component>
  )
}
