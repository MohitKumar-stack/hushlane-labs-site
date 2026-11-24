import Link from "next/link"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { Cta } from "@/components/site/cta"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { iconClass, serviceIcons } from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import { services } from "@/lib/services"

export const metadata = pageMetadata({
  title: "White Label Services for Agencies | Hushlane Labs",
  description:
    "Five white-label services for agencies: web development, app development, AI automation, software, and MVP builds. Every build ships under your brand.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]}
          />
          <h1 className="mt-8 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            White-label services for agencies
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Pick the page that matches the work you sold. Each one has its own deliverables, stack, and questions, so you are not reading the same paragraph five times.
          </p>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <StaggerGroup className="grid gap-4" as="ul">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug]
            return (
              <StaggerItem key={service.slug} as="li">
                <Link
                  href={`/services/${service.slug}`}
                  className="group block rounded-2xl border border-border p-6 transition-[background-color,border-color,transform] hover:border-foreground/20 hover:bg-muted/40 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    {Icon ? (
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40">
                        <Icon aria-hidden="true" className={iconClass} strokeWidth={1.75} />
                      </span>
                    ) : null}
                    <div>
                      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                        {service.eyebrow}
                      </p>
                      <h2 className="mt-3 text-2xl font-medium tracking-tight">{service.h1}</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {service.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
      <Cta
        title="Not sure which lane the brief belongs in?"
        body="Send it anyway. The first reply will name the lane, or tell you we are the wrong partner."
      />
    </>
  )
}
