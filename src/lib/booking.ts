const DEFAULT_BOOKING =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3uaA-I8F2icm9ruwj4VE3OcLGabsUpQSqzaK7l8I7ubkzi3x3KFs9baZJfqQKQoCRf2AOl-2mf?gv=true"

/** Normalize the public booking URL. Google appointment schedules need gv=true. */
export function bookingUrl(value = process.env.NEXT_PUBLIC_BOOKING_URL) {
  const raw = (value || DEFAULT_BOOKING).trim()
  if (!raw) return ""
  try {
    const url = new URL(raw)
    if (url.protocol !== "https:") return ""
    const host = url.hostname.toLowerCase()
    if (host === "calendar.google.com" && url.pathname.includes("/appointments/schedules/")) {
      url.searchParams.set("gv", "true")
    }
    if (host === "cal.com" || host.endsWith(".cal.com")) {
      if (!url.searchParams.has("embed")) url.searchParams.set("embed", "true")
    }
    return url.toString()
  } catch {
    return ""
  }
}

export function bookingHref() {
  return bookingUrl() || "/contact#book"
}

export function isGoogleAppointmentUrl(value: string) {
  try {
    const url = new URL(value)
    return (
      url.hostname.toLowerCase() === "calendar.google.com" &&
      url.pathname.includes("/appointments/schedules/")
    )
  } catch {
    return false
  }
}
