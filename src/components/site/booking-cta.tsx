"use client"

import { buttonVariants } from "@/components/ui/button"
import { TrackedLink } from "@/components/site/tracked-link"
import { bookingHref } from "@/lib/booking"
import { cn } from "@/lib/utils"

export function BookingCta({
  className,
  variant = "default",
  children = "Book a Free Call",
}: {
  className?: string
  variant?: "default" | "outline" | "ghost"
  children?: React.ReactNode
}) {
  return (
    <TrackedLink
      href={bookingHref()}
      event="booking_click"
      className={cn(buttonVariants({ variant, size: "lg" }), "h-11 px-5", className)}
    >
      {children}
    </TrackedLink>
  )
}
