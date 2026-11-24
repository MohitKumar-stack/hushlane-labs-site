import Link from "next/link"
import { HoverCard } from "@/components/motion/hover-card"
import { ProjectLogoMark } from "@/components/site/project-logo"
import type { CaseStudy } from "@/lib/content"
import { logoForSlug } from "@/lib/logos"
import { getService } from "@/lib/services"

export function ProjectCard({
  study,
  heading = "h2",
}: {
  study: CaseStudy
  heading?: "h2" | "h3"
}) {
  const service = getService(study.service)
  const logo = logoForSlug(study.slug)
  const Title = heading

  return (
    <HoverCard>
      <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-[0_0_0_1px_oklch(0.7_0_0_/_0.08)]">
        {logo ? (
          <Link href={`/work/${study.slug}`} className="mb-5 inline-flex w-fit">
            <ProjectLogoMark logo={logo} size={64} />
          </Link>
        ) : null}
        <ul className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>
        <Title className="mt-6 text-2xl font-medium tracking-tight">
          <Link href={`/work/${study.slug}`} className="hover:underline hover:decoration-border hover:underline-offset-4">
            {study.title}
          </Link>
        </Title>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
        {service ? (
          <p className="mt-4 text-sm">
            <Link href={`/services/${service.slug}`} className="underline-offset-4 hover:underline">
              {service.navLabel}
            </Link>
          </p>
        ) : null}
        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-6 text-sm">
          <a href={study.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            Visit live site
          </a>
          <Link href={`/work/${study.slug}`} className="underline-offset-4 hover:underline">
            Read the study
          </Link>
        </p>
      </article>
    </HoverCard>
  )
}
