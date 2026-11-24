import Link from "next/link"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/seo/json-ld"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { BookingCta } from "@/components/site/booking-cta"
import { Cta } from "@/components/site/cta"
import { FaqList } from "@/components/site/faq-list"
import { LinkButton } from "@/components/site/link-button"
import { getCaseStudy, postsForService } from "@/lib/content"
import { iconClass, serviceIcons } from "@/lib/icons"
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { getService, services } from "@/lib/services"

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = service.related
    .map((item) => getService(item))
    .filter((item) => item !== undefined)
  const study = service.caseStudy ? getCaseStudy(service.caseStudy) : undefined
  const notes = postsForService(service.slug)
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.navLabel, path: `/services/${service.slug}` },
  ]
  const Icon = serviceIcons[service.slug]

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faqs)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs items={crumbs} />
          {Icon ? (
            <span className="mt-8 inline-flex size-11 items-center justify-center rounded-xl border border-border bg-muted/40">
              <Icon aria-hidden="true" className={iconClass} strokeWidth={1.75} />
            </span>
          ) : null}
          <p className="mt-6 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {service.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{service.lede}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingCta />
            <LinkButton href="/how-we-work" variant="outline">
              How we work
            </LinkButton>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
          {service.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-medium tracking-tight">Deliverables</h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <div key={item.title}>
                <dt className="font-medium">{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-medium tracking-tight">Process</h2>
          <ol className="mt-8 grid gap-6">
            {service.process.map((item, index) => (
              <li key={item.title} className="grid gap-2 border-t border-border pt-6 sm:grid-cols-[4rem_1fr]">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-medium tracking-tight">Tech we use</h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {service.tech.map((item) => (
              <li key={item.name} className="grid gap-2 py-4 sm:grid-cols-[14rem_1fr] sm:items-baseline">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{item.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-medium tracking-tight">Questions agencies ask</h2>
          <div className="mt-8">
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-xl font-medium tracking-tight">Related</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="underline-offset-4 hover:underline">
                  {item.h1}
                </Link>
              </li>
            ))}
            {study ? (
              <li>
                <Link href={`/work/${study.slug}`} className="underline-offset-4 hover:underline">
                  Case study: {study.title}
                </Link>
              </li>
            ) : null}
            {notes.map((note) => (
              <li key={note.slug}>
                <Link href={`/blog/${note.slug}`} className="underline-offset-4 hover:underline">
                  {note.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Cta />
    </>
  )
}
