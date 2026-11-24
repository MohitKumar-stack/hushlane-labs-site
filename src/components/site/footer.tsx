import Link from "next/link"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-sm font-medium tracking-tight">
            Hushlane <span className="font-normal text-muted-foreground">Labs</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline} White-label tech, product, and AI automation for agencies.
          </p>
          <p className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            <a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a
              className="underline-offset-4 hover:underline"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Services</p>
          <ul className="mt-3 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {service.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Company</p>
          <ul className="mt-3 space-y-2">
            {[
              ["/how-we-work", "How we work"],
              ["/work", "Case studies"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/blog", "Notes"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Agencies we serve</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {site.markets.map((market) => (
              <li key={market}>{market}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
