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
  } catch {
    // Analytics may be blocked or unset. Never break the page for tracking.
  }
}
