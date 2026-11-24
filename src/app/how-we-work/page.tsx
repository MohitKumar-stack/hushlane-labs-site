import Link from "next/link"
import { FadeIn } from "@/components/motion/fade-in"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import { ProcessFlow } from "@/components/site/process-flow"
import { engagementIcons, iconClass } from "@/lib/icons"
import {
  communication,
  confidentiality,
  engagementSteps,
  qualityChecks,
  timelines,
} from "@/lib/process"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "How We Work With Agencies | Hushlane Labs",
  description:
    "The working agreement: NDA first, a private build, dated reviews, and a handoff or retainer. No contact with your client unless you ask.",
  path: "/how-we-work",
})

const sections = [
  {
    id: "process",
    title: "Process",
    intro: "Five steps. None of them include introducing ourselves to your client.",
    items: engagementSteps,
    withIcons: true,
  },
  {
    id: "confidentiality",
    title: "NDA and confidentiality",
    intro: "This is the policy we follow. The signed NDA and the statement of work are the documents that govern a specific job.",
    items: confidentiality,
    withIcons: false,
  },
  {
    id: "communication",
    title: "Communication",
    intro: "Written by default. Live when a review needs it. Your timezone sets the meeting, not ours.",
    items: communication,
    withIcons: false,
  },
  {
    id: "timelines",
    title: "Timelines",
    intro: "We would rather name a shorter list than miss a date that was never real.",
    items: timelines,
    withIcons: false,
  },
  {
    id: "quality",
    title: "Quality checks",
    intro: "Done means a person other than the author could ship it, and the milestone matches the page we agreed.",
    items: qualityChecks,
    withIcons: false,
  },
]

export default function HowWeWorkPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "How we work", path: "/how-we-work" },
            ]}
          />
          <FadeIn>
            <h1 className="mt-8 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              How a quiet engagement actually runs
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Hushlane Labs is the build partner behind an agency. The rules below are how we keep that sentence true after the kickoff call ends.
            </p>
          </FadeIn>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <FadeIn>
            <h2 className="text-3xl font-medium tracking-tight">How it works</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              From the brief you already sold to a dated delivery under your brand.
            </p>
          </FadeIn>
          <div className="mt-10">
            <ProcessFlow />
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <FadeIn>
              <h2 className="text-3xl font-medium tracking-tight">{section.title}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{section.intro}</p>
            </FadeIn>
            <ol className="mt-10 grid gap-8">
              {section.items.map((item, index) => {
                const Icon = section.withIcons ? engagementIcons[index] : null
                return (
                  <li key={item.title} className="grid gap-2 border-t border-border pt-6 sm:grid-cols-[16rem_1fr]">
                    <div className="flex items-start gap-3">
                      {Icon ? (
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
                          <Icon aria-hidden="true" className={iconClass} strokeWidth={1.75} />
                        </span>
                      ) : null}
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      ))}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-xl font-medium tracking-tight">Related notes</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/blog/outsource-development-to-india" className="underline-offset-4 hover:underline">
                Outsourcing development to India: costs, risks, and how to do it safely
              </Link>
            </li>
            <li>
              <Link href="/blog/choose-a-white-label-development-partner" className="underline-offset-4 hover:underline">
                How to choose a white label development partner
              </Link>
            </li>
            <li>
              <Link href="/work" className="underline-offset-4 hover:underline">
                Case studies
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <Cta
        title="Send the proposal you already closed."
        body="We will tell you what we can take, what has to be cut, and whether the date survives contact with the work."
      />
    </>
  )
}
