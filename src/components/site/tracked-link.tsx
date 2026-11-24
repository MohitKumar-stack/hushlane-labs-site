"use client"

import { track, type TrackEvent } from "@/lib/track"

export function TrackedLink({
  href,
  event,
  className,
  children,
}: {
  href: string
  event: TrackEvent
  className?: string
  children: React.ReactNode
}) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  )
}
