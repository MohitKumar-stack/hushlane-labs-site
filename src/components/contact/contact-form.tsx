"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  budgetOptions,
  contactSchema,
  normalizeWebsite,
  serviceOptions,
} from "@/lib/contact"
import { site } from "@/lib/site"
import { track } from "@/lib/track"

type FieldErrors = Partial<Record<"name" | "email" | "agency" | "website" | "service" | "budget" | "message", string>>

const fieldClass = "h-11 bg-background px-3 text-base md:text-sm"

function postToSheet(webhook: string, fields: Record<string, string>) {
  return fetch(webhook, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(fields),
  })
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [fax, setFax] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")
    setErrors({})

    const form = new FormData(event.currentTarget)
    const parsed = contactSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      agency: form.get("agency"),
      website: form.get("website") ?? "",
      service: form.get("service"),
      budget: form.get("budget"),
      message: form.get("message"),
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
      setSent(true)
      return
    }

    const webhook = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL
    if (!webhook) {
      setFormError(`This form is not connected yet. Email ${site.email} and we will pick it up.`)
      return
    }

    setPending(true)
    try {
      await postToSheet(webhook, {
        name: parsed.data.name,
        email: parsed.data.email,
        agency: parsed.data.agency,
        website: normalizeWebsite(parsed.data.website),
        service: parsed.data.service,
        budget: parsed.data.budget,
        message: parsed.data.message,
        source: "contact",
        token: process.env.NEXT_PUBLIC_FORM_TOKEN ?? "",
        page: window.location.href,
        company_fax: "",
      })
      track("form_submit")
      setSent(true)
    } catch {
      setFormError(`That did not send. Email ${site.email} and we will reply from there.`)
    } finally {
      setPending(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8" role="status">
        <h2 className="text-2xl font-medium tracking-tight">Thanks, we&apos;ll reply within 24 hours.</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          If the brief is a poor fit, we will say that plainly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" required className={fieldClass} aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} aria-invalid={Boolean(errors.email)} />
        </Field>
        <Field id="agency" label="Agency name" error={errors.agency}>
          <Input id="agency" name="agency" autoComplete="organization" required className={fieldClass} aria-invalid={Boolean(errors.agency)} />
        </Field>
        <Field id="website" label="Website" error={errors.website} hint="Optional">
          <Input id="website" name="website" autoComplete="url" placeholder="https://" className={fieldClass} aria-invalid={Boolean(errors.website)} />
        </Field>
        <Field id="service" label="Service needed" error={errors.service}>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget range" error={errors.budget}>
          <select
            id="budget"
            name="budget"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="message" label="Message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What did the client already agree to, and when do they expect it?"
          className="min-h-36 bg-background px-3 text-base md:text-sm"
          aria-invalid={Boolean(errors.message)}
        />
      </Field>
      <Button type="submit" size="lg" className="h-11 px-5" disabled={pending} aria-busy={pending}>
        {pending ? "Sending…" : "Send the brief"}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor={id}>{label}</Label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
