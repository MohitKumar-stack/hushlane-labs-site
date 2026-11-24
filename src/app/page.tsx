import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group"
import { Cta } from "@/components/site/cta"
import { FaqList } from "@/components/site/faq-list"
import { Hero } from "@/components/site/hero"
import { ProcessFlow } from "@/components/site/process-flow"
import { ProductsBuilt } from "@/components/site/products-built"
import { ProjectCard } from "@/components/site/project-card"
import { Section } from "@/components/site/section"
import { getCaseStudies } from "@/lib/content"
import { homeFaqs, trustPoints } from "@/lib/home"
import { iconClass, serviceIcons, trustIcons } from "@/lib/icons"
import { faqJsonLd, hreflangLanguages } from "@/lib/seo"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    absolute: "White Label Development & AI Automation | Hushlane Labs",
  },
  description: site.description,
  alternates: { canonical: "/", languages: hreflangLanguages("/") },
  openGraph: {
    title: "White Label Development & AI Automation | Hushlane Labs",
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hushlane Labs. Your brand. Our build.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "White Label Development & AI Automation | Hushlane Labs",
    description: site.description,
    images: ["/opengraph-image"],
  },
}

export default function HomePage() {
  const studies = getCaseStudies()

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero />

      <Section
        id="services"
        eyebrow="Services"
        title="Five ways agencies use a quiet build partner"
        intro="Each practice has its own page, scope, and questions. Start with the one that matches the proposal you already sold."
      >
        <StaggerGroup className="divide-y divide-border border-y border-border" as="div">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug]
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid gap-3 py-6 transition-colors hover:bg-muted/40 sm:grid-cols-[4rem_2.5rem_14rem_1fr_auto] sm:items-center sm:gap-6 sm:px-2"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {Icon ? (
                    <span className="hidden size-10 items-center justify-center rounded-xl border border-border bg-muted/40 sm:inline-flex">
                      <Icon aria-hidden="true" className={iconClass} strokeWidth={1.75} />
                    </span>
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  <span className="font-medium">{service.navLabel}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{service.card}</span>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </Section>

      <Section
        id="process"
        eyebrow="How it works"
        title="Your client relationship stays yours"
        intro="The longer version, including the confidentiality rules, is on the how we work page."
        className="border-t border-border"
      >
        <FadeIn>
          <ProcessFlow />
        </FadeIn>
        <p className="mt-6 text-sm">
          <Link href="/how-we-work" className="underline-offset-4 hover:underline">
            Read the full working agreement
          </Link>
        </p>
      </Section>

      <Section
        id="products"
        eyebrow="Products we've built"
        title="Three live products under other brands"
        intro="Logos link to the case study. The domain is the live product."
        className="border-t border-border"
      >
        <ProductsBuilt />
      </Section>

      <Section
        id="trust"
        eyebrow="Trust"
        title="Quiet is a practice, not a slogan"
        className="border-t border-border"
      >
        <StaggerGroup className="grid gap-10 md:grid-cols-3">
          {trustPoints.map((point, index) => {
            const Icon = trustIcons[index]
            return (
              <StaggerItem key={point.title}>
                <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted/40">
                  <Icon aria-hidden="true" className={iconClass} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-lg font-medium tracking-tight">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.detail}</p>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </Section>

      <Section
        id="work"
        eyebrow="Case studies"
        title="Three products, shipped"
        intro="Designed, built, and deployed end to end. Screenshot and result slots stay marked until the real files and numbers are added."
        className="border-t border-border"
      >
        <StaggerGroup className="grid gap-4 lg:grid-cols-3">
          {studies.map((study) => (
            <StaggerItem key={study.slug}>
              <ProjectCard study={study} heading="h3" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Before you send a client’s name"
        className="border-t border-border"
      >
        <FadeIn>
          <FaqList items={homeFaqs} />
        </FadeIn>
      </Section>

      <Cta />
    </>
  )
}
