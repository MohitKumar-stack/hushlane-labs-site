import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/seo/json-ld"
import { MdxContent } from "@/components/mdx/mdx-content"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import { ProjectLogoMark } from "@/components/site/project-logo"
import { getCaseStudies, getCaseStudy } from "@/lib/content"
import { logoForSlug } from "@/lib/logos"
import { breadcrumbJsonLd, pageMetadata, projectJsonLd } from "@/lib/seo"
import { getService } from "@/lib/services"

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return pageMetadata({
    title: `${study.title} Case Study | Hushlane Labs`,
    description: study.summary,
    path: `/work/${study.slug}`,
  })
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const service = getService(study.service)
  const logo = logoForSlug(study.slug)

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/work" },
    { name: study.title, path: `/work/${study.slug}` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={projectJsonLd({
          title: study.title,
          summary: study.summary,
          slug: study.slug,
          url: study.url,
          tags: study.tags,
          serviceName: service?.h1 ?? study.service,
          servicePath: service ? `/services/${service.slug}` : "/services",
        })}
      />
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs items={crumbs} />
          {logo ? (
            <div className="mt-8">
              <ProjectLogoMark logo={logo} size={80} priority />
            </div>
          ) : null}
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{study.summary}</p>
          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              Visit live site
            </a>
            {service ? (
              <Link href={`/services/${service.slug}`} className="underline-offset-4 hover:underline">
                {service.navLabel}
              </Link>
            ) : null}
          </p>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Screenshots</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {study.screenshots.map((slot) => (
              <li key={slot.alt} className="overflow-hidden rounded-2xl border border-border bg-muted/40">
                {slot.src ? (
                  <figure>
                    <Image
                      src={slot.src}
                      alt={slot.alt}
                      width={slot.width}
                      height={slot.height}
                      className="h-auto w-full"
                      priority={slot === study.screenshots[0]}
                    />
                    <figcaption className="px-4 py-3 text-sm text-muted-foreground">{slot.alt}</figcaption>
                  </figure>
                ) : (
                  <div className="flex aspect-video items-center justify-center border border-dashed border-border px-6 text-center text-sm text-muted-foreground">
                    {slot.alt}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <MdxContent source={study.body} />
      </section>

      <Cta
        title="Need something similar for your client?"
        body="Book a free 30-min call. Tell us the client, the deadline, and what should ship under your brand."
      />
    </>
  )
}
