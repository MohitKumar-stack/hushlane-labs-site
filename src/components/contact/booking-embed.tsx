"use client"

import { buttonVariants } from "@/components/ui/button"
import { bookingUrl } from "@/lib/booking"
import { site } from "@/lib/site"
import { track } from "@/lib/track"
import { cn } from "@/lib/utils"

export function BookingEmbed() {
  const src = bookingUrl()

  if (!src) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <p className="leading-relaxed text-muted-foreground">
          The scheduler is not connected yet. Email {site.email}.
        </p>
        <a
          href={`mailto:${site.email}`}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-6 inline-flex h-11 px-5")}
        >
          Email {site.email}
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Google Calendar Appointment Scheduling inline embed */}
      <iframe
        src={src}
        title="Book a free 30-min call"
        width="100%"
        height={600}
        frameBorder={0}
        style={{ border: 0 }}
        className="w-full rounded-xl bg-background"
        loading="lazy"
      />
      <p className="mt-4 text-sm text-muted-foreground">
        If the calendar does not appear,{" "}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("booking_click")}
          className="text-foreground underline underline-offset-4"
        >
          open the scheduler in a new tab
        </a>
        .
      </p>
    </div>
  )
}
