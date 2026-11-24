import { z } from "zod"
import { popupConfig } from "@/lib/popup-config"

const freeEmailDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
])

export const popupSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email.")
    .refine((value) => {
      const domain = value.split("@")[1]?.toLowerCase() ?? ""
      return !freeEmailDomains.has(domain)
    }, "Use your agency email. We reply to the company, not a personal inbox."),
  agency: z.string().trim().min(2, "Enter the agency name.").max(120),
})

export type PopupFields = z.infer<typeof popupSchema>

function readStorage(get: () => string | null) {
  try {
    return get()
  } catch {
    return null
  }
}

function writeStorage(set: () => void) {
  try {
    set()
    return true
  } catch {
    return false
  }
}

export function popupAlreadySubmitted() {
  return readStorage(() => localStorage.getItem(popupConfig.storage.submitted)) === "1"
}

export function popupDismissedActive() {
  const raw = readStorage(() => localStorage.getItem(popupConfig.storage.dismissedUntil))
  if (!raw) return false
  const until = Number(raw)
  return Number.isFinite(until) && until > Date.now()
}

export function popupShownThisSession() {
  return readStorage(() => sessionStorage.getItem(popupConfig.storage.sessionShown)) === "1"
}

export function markPopupShownThisSession() {
  writeStorage(() => sessionStorage.setItem(popupConfig.storage.sessionShown, "1"))
}

export function markPopupDismissed() {
  const until = Date.now() + popupConfig.dismissDays * 24 * 60 * 60 * 1000
  writeStorage(() => localStorage.setItem(popupConfig.storage.dismissedUntil, String(until)))
}

export function markPopupSubmitted() {
  writeStorage(() => {
    localStorage.setItem(popupConfig.storage.submitted, "1")
    localStorage.removeItem(popupConfig.storage.dismissedUntil)
  })
}

export function popupMayOpen(pathname: string) {
  if (pathname === "/contact" || pathname.startsWith("/contact/")) return false
  if (typeof document !== "undefined" && document.querySelector('[data-page="not-found"]')) {
    return false
  }
  if (popupAlreadySubmitted()) return false
  if (popupDismissedActive()) return false
  if (popupShownThisSession()) return false
  return true
}
