import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import {
  communication,
  confidentiality,
  engagementSteps,
  qualityChecks,
  timelines,
} from "@/lib/process"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "How We Work",
  description:
    "The Hushlane Labs working agreement: process, NDA and confidentiality, communication, timelines, and quality checks for agency partners.",
  path: "/how-we-work",
})

const sections = [
  {
    id: "process",
    title: "Process",
    intro: "Five steps. None of them include introducing ourselves to your client.",
    items: engagementSteps,
  },
  {
    id: "confidentiality",
    title: "NDA and confidentiality",
    intro: "This is the policy we follow. The signed NDA and the statement of work are the documents that govern a specific job.",
    items: confidentiality,
  },
  {
    id: "communication",
    title: "Communication",
    intro: "Written by default. Live when a review needs it. Your timezone sets the meeting, not ours.",
    items: communication,
  },
  {
    id: "timelines",
    title: "Timelines",
    intro: "We would rather name a shorter list than miss a date that was never real.",
    items: timelines,
  },
  {
    id: "quality",
    title: "Quality checks",
    intro: "Done means a person other than the author could ship it, and the milestone matches the page we agreed.",
    items: qualityChecks,
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
          <h1 className="mt-8 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            How a quiet engagement actually runs
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Hushlane Labs is the build partner behind an agency. The rules below are how we keep that sentence true after the kickoff call ends.
          </p>
        </div>
      </header>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="text-3xl font-medium tracking-tight">{section.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{section.intro}</p>
            <ol className="mt-10 grid gap-8">
              {section.items.map((item) => (
                <li key={item.title} className="grid gap-2 border-t border-border pt-6 sm:grid-cols-[16rem_1fr]">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}
      <Cta
        title="Send the proposal you already closed."
        body="We will tell you what we can take, what has to be cut, and whether the date survives contact with the work."
      />
    </>
  )
}
