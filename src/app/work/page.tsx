import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import { ProjectCard } from "@/components/site/project-card"
import { getCaseStudies } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Agency Case Studies | Hushlane Labs",
  description:
    "Three shipped products: Zappio at zappio.in, Lumic at lumic.co.in, and Acredge at acredge.ai. Each was designed, built, and deployed end to end.",
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
            Three products designed, built, and deployed end to end. Screenshot and result slots stay marked until the real files and numbers are added.
          </p>
        </div>
      </header>
      <StaggerGroup className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-16 lg:grid-cols-3">
        {studies.map((study) => (
          <StaggerItem key={study.slug}>
            <ProjectCard study={study} />
          </StaggerItem>
        ))}
      </StaggerGroup>
      <Cta
        title="Need something similar for your client?"
        body="Book a free 30-min call. Tell us the client, the deadline, and what should ship under your brand."
      />
    </>
  )
}
