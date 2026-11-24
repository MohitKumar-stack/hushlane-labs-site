"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { setConsent, subscribeToPreferencesOpen, useConsent } from "@/lib/consent"

export function CookieConsent() {
  const consent = useConsent()
  const [reopened, setReopened] = useState(false)

  useEffect(() => subscribeToPreferencesOpen(() => setReopened(true)), [])

  const visible = consent === "unset" || (reopened && consent !== "pending")
  if (!visible) return null

  function choose(value: "granted" | "denied") {
    setReopened(false)
    setConsent(value)
  }

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-xl rounded-xl border border-border bg-background p-4 shadow-lg sm:right-auto sm:left-4 sm:mx-0"
    >
      <p className="text-sm font-medium">Cookies and analytics</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        We use analytics cookies to see which pages help and which confuse visitors. They load only if you accept. See our{" "}
        <Link href="/privacy" className="text-foreground underline underline-offset-4">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2">
        <Button size="lg" className="flex-1" onClick={() => choose("granted")}>
          Accept
        </Button>
        <Button size="lg" variant="outline" className="flex-1" onClick={() => choose("denied")}>
          Reject
        </Button>
      </div>
    </section>
  )
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="hover:text-foreground"
      onClick={() => window.dispatchEvent(new Event("hushlane-consent-open"))}
    >
      Cookie settings
    </button>
  )
}
