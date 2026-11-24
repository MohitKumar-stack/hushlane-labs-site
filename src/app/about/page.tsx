import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

const values = [
  {
    title: "The agency stays the vendor",
    detail: "The client hired them. We do not collapse that into a joint brand, a shared slide, or a surprise introduction.",
  },
  {
    title: "Write the boundary down",
    detail: "Memory is a bad scope tool. If a date, a screen, or a permission matters, it goes in the statement of work.",
  },
  {
    title: "Named people",
    detail: "You should know who is in the repository next month. We do not send a rotating cast under one account manager.",
  },
  {
    title: "Leave cleanly",
    detail: "Access ends. Notes stay. The product does not depend on a login only we can reset.",
  },
]

export const metadata = pageMetadata({
  title: "About Hushlane Labs | White-Label Studio",
  description:
    "Hushlane Labs is a quiet, reliable white-label partner for agencies in the USA, UK, Australia, and Canada. Your brand. Our build.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]}
          />
          <h1 className="mt-8 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            A quiet, reliable partner behind the agency
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {site.tagline} Hushlane Labs exists so an agency can sell technology and still be the only name the client needs to remember.
          </p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-3xl space-y-5 leading-relaxed text-muted-foreground">
          <p>
            The client hired the agency. The agency can hire us. Those are different relationships, and the work gets worse when someone pretends they are the same. We stay in the build: the repository, the preview, the weekly note. We stay out of the pitch deck unless you put us there.
          </p>
          <p>
            We work with teams in the {site.markets.join(", ")}. Delivery is arranged so reviews happen in your hours, and the rest of the work is written clearly enough to read the next morning. We are not a marketplace, and we do not introduce you to a bench of strangers.
          </p>
          <p>
            If a brief needs a skill we do not have, we turn it down. A quiet partner who accepts everything is just slow to disappoint you.
          </p>
          <p>
            The company page is on{" "}
            <a
              href={site.linkedin}
              className="text-foreground underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-medium tracking-tight">Values</h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="border-t border-border pt-6">
                <dt className="font-medium">{value.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Cta />
    </>
  )
}
