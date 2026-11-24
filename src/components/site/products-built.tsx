"use client"

import Link from "next/link"
import { FadeIn } from "@/components/motion/fade-in"
import { HoverCard } from "@/components/motion/hover-card"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { ProjectLogoMark } from "@/components/site/project-logo"
import { projectLogos } from "@/lib/logos"

export function ProductsBuilt() {
  return (
    <FadeIn>
      <StaggerGroup className="grid gap-4 sm:grid-cols-3">
        {projectLogos.map((logo) => (
          <StaggerItem key={logo.slug}>
            <HoverCard>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-[border-color,box-shadow] hover:border-foreground/20 hover:shadow-[0_0_0_1px_oklch(0.7_0_0_/_0.08)]">
                <Link href={logo.href} className="flex flex-col gap-4">
                  <ProjectLogoMark logo={logo} size={72} />
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{logo.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Case study</p>
                  </div>
                </Link>
                <a
                  href={logo.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {logo.liveLabel}
                </a>
              </article>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </FadeIn>
  )
}
