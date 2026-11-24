"use client"

import { motion, useReducedMotion } from "framer-motion"
import { fadeUpTransition, fadeUpVariants, staggerContainer, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function StaggerGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  as?: "div" | "ul" | "ol" | "section"
}) {
  const reduce = useReducedMotion()
  const Component = motion.create(Tag)

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Component
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  as?: "div" | "li" | "article"
}) {
  const reduce = useReducedMotion()
  const Component = motion.create(Tag)

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Component className={cn(className)} variants={fadeUpVariants} transition={fadeUpTransition}>
      {children}
    </Component>
  )
}
