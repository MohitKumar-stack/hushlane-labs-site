import { useSyncExternalStore } from "react"

// "pending" is only returned on the server and during hydration, so the
// banner never flashes for visitors who already chose.
export type ConsentState = "pending" | "unset" | "granted" | "denied"

const KEY = "hushlane-consent"
const CHANGE_EVENT = "hushlane-consent-change"
const OPEN_EVENT = "hushlane-consent-open"

function read(): ConsentState {
  try {
    const value = window.localStorage.getItem(KEY)
    return value === "granted" || value === "denied" ? value : "unset"
  } catch {
    return "unset"
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => "pending" as const)
}

export function setConsent(value: "granted" | "denied") {
  const previous = read()
  try {
    window.localStorage.setItem(KEY, value)
  } catch {
    // Storage can be blocked. The choice then lasts only for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
  // Scripts that were already loaded cannot be unloaded, so reload to stop them.
  if (previous === "granted" && value === "denied") window.location.reload()
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function subscribeToPreferencesOpen(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback)
  return () => window.removeEventListener(OPEN_EVENT, callback)
}
