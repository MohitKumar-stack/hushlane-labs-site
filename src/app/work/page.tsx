import Link from "next/link"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import { getCaseStudies } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Sample white-label case studies from Hushlane Labs, including a voice AI CRM and an AI financial intelligence app. Replace them with permitted client work.",
  path: "/work",
})

export default function WorkPage() {
  const studies = getCaseStudies()

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Case studies", path: "/work" },
            ]}
          />
          <h1 className="mt-8 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Problem, solution, technology, and results. The two studies below are samples so the pages have a shape. Publish a real engagement only after the agency agrees in writing.
          </p>
        </div>
      </header>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-16 md:grid-cols-2">
        {studies.map((study) => (
          <article key={study.slug} className="rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{study.industry}</span>
              <span>{study.placeholder ? "Sample" : study.year}</span>
            </div>
            <h2 className="mt-6 text-2xl font-medium tracking-tight">
              <Link href={`/work/${study.slug}`} className="hover:underline hover:decoration-border hover:underline-offset-4">
                {study.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
            <p className="mt-6 text-sm">
              <Link href={`/work/${study.slug}`} className="underline-offset-4 hover:underline">
                Read the study
              </Link>
            </p>
          </article>
        ))}
      </section>
      <Cta title="Have a study we are allowed to tell?" body="We will not draft it from a logo and a guess. Send the problem, the constraint, and what changed." />
    </>
  )
}
