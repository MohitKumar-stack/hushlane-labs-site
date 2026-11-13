import Link from "next/link"
import { notFound } from "next/navigation"
import { MdxContent } from "@/components/mdx/mdx-content"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import { getCaseStudies, getCaseStudy } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { services } from "@/lib/services"

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
    title: study.title,
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

  const relatedServices = services.filter((service) => service.caseStudy === study.slug)

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Case studies", path: "/work" },
              { name: study.title, path: `/work/${study.slug}` },
            ]}
          />
          <p className="mt-8 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {study.industry} · {study.year}
            {study.placeholder ? " · Sample" : ""}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{study.summary}</p>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Problem</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{study.problem}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Solution</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{study.solution}</p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Tech used</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.tech.map((item) => (
              <li key={item} className="rounded-full border border-border px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Results</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3">
            {study.results.map((result) => (
              <div key={result.label} className="border-t border-border pt-4">
                <dt className="text-sm text-muted-foreground">{result.label}</dt>
                <dd className="mt-2 font-medium leading-relaxed">{result.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <MdxContent source={study.body} />
          {relatedServices.length > 0 ? (
            <ul className="mt-10 space-y-2 text-sm">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="underline-offset-4 hover:underline">
                    {service.h1}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      <Cta />
    </>
  )
}
