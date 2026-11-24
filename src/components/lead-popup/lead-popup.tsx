"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrackedLink } from "@/components/site/tracked-link"
import { bookingHref } from "@/lib/booking"
import { popupConfig } from "@/lib/popup-config"
import {
  markPopupDismissed,
  markPopupShownThisSession,
  markPopupSubmitted,
  popupMayOpen,
  popupSchema,
} from "@/lib/popup"
import { site } from "@/lib/site"
import { track } from "@/lib/track"
import { cn } from "@/lib/utils"

type FieldErrors = Partial<Record<"name" | "email" | "agency", string>>

const fieldClass = "h-11 bg-background px-3 text-base md:text-sm"

function focusableElements(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.getAttribute("aria-hidden") !== "true" &&
      el.getAttribute("tabindex") !== "-1" &&
      !el.closest('[aria-hidden="true"]')
  )
}

function postToSheet(webhook: string, fields: Record<string, string>) {
  return fetch(webhook, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(fields),
  })
}

export function LeadPopup() {
  const pathname = usePathname()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const opened = useRef(false)
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  const [pending, setPending] = useState(false)
  const [sentName, setSentName] = useState("")
  const [fax, setFax] = useState("")

  const close = useCallback((reason: "dismiss" | "submit" = "dismiss") => {
    setOpen(false)
    if (reason === "dismiss") {
      markPopupDismissed()
      track("popup_closed")
    }
    const previous = previousFocus.current
    if (previous && typeof previous.focus === "function") {
      window.setTimeout(() => previous.focus(), 0)
    }
  }, [])

  const openPopup = useCallback(() => {
    if (opened.current) return
    if (!popupMayOpen(pathname)) return
    opened.current = true
    markPopupShownThisSession()
    previousFocus.current = document.activeElement as HTMLElement | null
    setOpen(true)
    track("popup_shown")
  }, [pathname])

  useEffect(() => {
    opened.current = false
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!popupMayOpen(pathname)) return

    const started = Date.now()
    let idleTimer: number | undefined
    let readyTimer: number | undefined
    let armed = false

    const arm = () => {
      if (armed || opened.current) return
      if (!popupMayOpen(pathname)) return
      if (Date.now() - started < popupConfig.minDelayMs) return
      armed = true
      openPopup()
    }

    readyTimer = window.setTimeout(() => {
      idleTimer = window.setTimeout(arm, popupConfig.idleMs - popupConfig.minDelayMs)
    }, popupConfig.minDelayMs)

    const onScroll = () => {
      if (Date.now() - started < popupConfig.minDelayMs) return
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if (window.scrollY / scrollable >= popupConfig.scrollDepth) arm()
    }

    const onMouseOut = (event: MouseEvent) => {
      if (Date.now() - started < popupConfig.minDelayMs) return
      if (event.relatedTarget) return
      if (event.clientY > 0) return
      arm()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("mouseout", onMouseOut)

    return () => {
      window.clearTimeout(readyTimer)
      window.clearTimeout(idleTimer)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mouseout", onMouseOut)
    }
  }, [pathname, openPopup])

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return

    const focusables = focusableElements(dialog)
    focusables[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        close("dismiss")
        return
      }
      if (event.key !== "Tab") return
      const items = focusableElements(dialog)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open, close])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")
    setErrors({})

    const form = new FormData(event.currentTarget)
    const parsed = popupSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      agency: form.get("agency"),
    })

    if (!parsed.success) {
      const next: FieldErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === "string" && !(key in next)) {
          next[key as keyof FieldErrors] = issue.message
        }
      }
      setErrors(next)
      setFormError("Check the highlighted fields.")
      return
    }

    if (fax.trim() !== "") {
      markPopupSubmitted()
      setSentName(parsed.data.name.split(/\s+/)[0] || parsed.data.name)
      track("popup_submitted")
      return
    }

    const webhook = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL
    if (!webhook) {
      setFormError(`This form is not connected yet. Email ${site.email}.`)
      return
    }

    setPending(true)
    try {
      await postToSheet(webhook, {
        name: parsed.data.name,
        email: parsed.data.email,
        agency: parsed.data.agency,
        website: "",
        service: "",
        budget: "",
        message: "Lead popup request for a free 30-minute call.",
        source: "popup",
        token: process.env.NEXT_PUBLIC_FORM_TOKEN ?? "",
        page: window.location.href,
        company_fax: "",
      })
      markPopupSubmitted()
      setSentName(parsed.data.name.split(/\s+/)[0] || parsed.data.name)
      track("popup_submitted")
    } catch {
      setFormError(`That did not send. Email ${site.email} and we will reply from there.`)
    } finally {
      setPending(false)
    }
  }

  if (!open) return null

  const booking = bookingHref()
  const success = Boolean(sentName)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/55"
        onClick={() => close("dismiss")}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 flex max-h-[min(92vh,40rem)] w-full flex-col overflow-y-auto border border-border bg-card text-card-foreground shadow-xl",
          "rounded-t-2xl p-5 sm:max-w-md sm:rounded-2xl sm:p-6"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="max-w-[16rem] text-xl font-medium tracking-tight text-balance sm:max-w-none sm:text-2xl">
            {success
              ? `Thanks, ${sentName}. Pick a time below:`
              : "Need extra dev capacity? Book a free 30-minute call."}
          </h2>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label="Close"
            onClick={() => close("dismiss")}
          >
            <X />
          </Button>
        </div>

        {success ? (
          <div className="mt-5 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your details are with us. Choose a slot for the free 30-minute call.
            </p>
            <TrackedLink
              href={booking}
              event="booking_clicked"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Pick a time
            </TrackedLink>
            <p className="text-center text-sm text-muted-foreground">
              Or{" "}
              <Link href="/contact#brief" className="text-foreground underline underline-offset-4" onClick={() => close("submit")}>
                Prefer to write? Send a brief
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative mt-5 space-y-4">
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Fax
                <input
                  name="company_fax"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fax}
                  onChange={(event) => setFax(event.target.value)}
                />
              </label>
            </div>

            {formError ? (
              <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">
                {formError}
              </p>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="popup-name">Name</Label>
              <Input
                id="popup-name"
                name="name"
                autoComplete="name"
                required
                className={fieldClass}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="popup-email">Work email</Label>
              <Input
                id="popup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClass}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="popup-agency">Agency name</Label>
              <Input
                id="popup-agency"
                name="agency"
                autoComplete="organization"
                required
                className={fieldClass}
                aria-invalid={Boolean(errors.agency)}
              />
              {errors.agency ? <p className="text-sm text-destructive">{errors.agency}</p> : null}
            </div>

            <Button type="submit" size="lg" className="h-11 w-full px-5" disabled={pending} aria-busy={pending}>
              {pending ? "Sending…" : "Book a free call"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/contact#brief" className="underline underline-offset-4" onClick={() => close("dismiss")}>
                Prefer to write? Send a brief
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
