import posthog from "posthog-js"
import { logMarketingConversion, type MarketingConversionAction } from "@/lib/posthog-log"

export type TrackEvent =
  | "form_submit"
  | "booking_click"
  | "booking_clicked"
  | "popup_shown"
  | "popup_closed"
  | "popup_submitted"

export function track(event: TrackEvent) {
  if (typeof window === "undefined") return
  try {
    const target = window as Window & {
      dataLayer?: Record<string, string>[]
      plausible?: (name: string) => void
      gtag?: (...args: unknown[]) => void
    }
    target.dataLayer = target.dataLayer || []
    target.dataLayer.push({ event })
    if (typeof target.plausible === "function") target.plausible(event)
    if (typeof target.gtag === "function") {
      target.gtag("event", event)
    }
    if (
      event !== "popup_shown" &&
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      posthog.capture(event)
      logMarketingConversion(event as MarketingConversionAction)
    }
  } catch {
    // Analytics may be blocked or unset. Never break the page for tracking.
  }
}
