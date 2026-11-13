import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { Cta } from "@/components/site/cta"
import { DeliveryNote } from "@/components/site/delivery-note"
import { FaqList } from "@/components/site/faq-list"
import { LinkButton } from "@/components/site/link-button"
import { Reveal } from "@/components/site/reveal"
import { Section } from "@/components/site/section"
import { getCaseStudies } from "@/lib/content"
import { homeFaqs, homeSteps, trustPoints } from "@/lib/home"
import { faqJsonLd } from "@/lib/seo"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    absolute: "Hushlane Labs — White-label tech, product, and AI automation",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hushlane Labs — White-label tech, product, and AI automation",
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
    title: "Hushlane Labs — White-label tech, product, and AI automation",
    description: site.description,
    images: ["/opengraph-image"],
  },
}

export default function HomePage() {
  const studies = getCaseStudies()

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <section className="hero-glow relative overflow-hidden border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {site.tagline}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
              White-label tech, product, and AI automation for agencies
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We design and ship the work your clients already hired you for. Websites, apps, software, and automation go out under your name. Ours stays off the masthead.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact">Start a brief</LinkButton>
              <LinkButton href="/work" variant="outline">
                See sample work
              </LinkButton>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Agencies in the {site.markets.join(", ")}.
            </p>
          </div>
          <DeliveryNote />
        </div>
      </section>

      <Section
        id="services"
        eyebrow="Services"
        title="Five ways agencies use a quiet build partner"
        intro="Each practice has its own page, scope, and questions. Start with the one that matches the proposal you already sold."
      >
        <div className="divide-y divide-border border-y border-border">
          {services.map((service, index) => (
            <Reveal key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-3 py-6 transition-colors hover:bg-muted/40 sm:grid-cols-[4rem_14rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-2"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{service.navLabel}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{service.card}</span>
                <span aria-hidden="true" className="text-muted-foreground transition group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="How it works"
        title="Your client relationship stays yours"
        intro="The longer version, including the confidentiality rules, is on the how we work page."
        className="border-t border-border"
      >
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {homeSteps.map((step, index) => (
            <li key={step.title} className="bg-background p-6">
              <p className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm">
          <Link href="/how-we-work" className="underline-offset-4 hover:underline">
            Read the full working agreement
          </Link>
        </p>
      </Section>

      <Section
        id="trust"
        eyebrow="Trust"
        title="Quiet is a practice, not a slogan"
        className="border-t border-border"
      >
        <div className="grid gap-10 md:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title}>
              <h3 className="text-lg font-medium tracking-tight">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="work"
        eyebrow="Case studies"
        title="Sample engagements you can replace"
        intro="These are placeholders so the structure is real. Swap in client work when you have written permission to name it."
        className="border-t border-border"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {studies.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>{study.industry}</span>
                {study.placeholder ? <span>Sample</span> : <span>{study.year}</span>}
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-tight group-hover:underline group-hover:decoration-border group-hover:underline-offset-4">
                {study.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Before you send a client’s name"
        className="border-t border-border"
      >
        <FaqList items={homeFaqs} />
      </Section>

      <Cta />
    </>
  )
}
