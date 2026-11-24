"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingCta } from "@/components/site/booking-cta"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { bookingHref } from "@/lib/booking"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { track } from "@/lib/track"

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname
  const booking = bookingHref()
  const bookingExternal = booking.startsWith("http")

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="text-sm font-medium tracking-tight" aria-label={`${site.name} home`}>
          Hushlane <span className="font-normal text-muted-foreground">Labs</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                isCurrent(pathname, item.href) && "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <BookingCta className="hidden sm:inline-flex" />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? <X /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                className="rounded-lg px-2 py-3 text-base hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={booking}
              className="rounded-lg px-2 py-3 text-base font-medium hover:bg-muted"
              onClick={() => track("booking_click")}
              {...(bookingExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Book a Free Call
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
