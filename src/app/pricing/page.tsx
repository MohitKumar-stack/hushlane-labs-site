import Link from "next/link"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { Cta } from "@/components/site/cta"
import { plans } from "@/lib/pricing"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Pricing and Engagement Models",
  description:
    "Project, dedicated developer, and retainer. Indicative starting ranges in USD for agencies that need white-label delivery.",
  path: "/pricing",
})

export default function PricingPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing" },
            ]}
          />
          <h1 className="mt-8 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            Engagement models
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Three ways to buy the work. The numbers are starting ranges in USD, not a quote. A short brief turns a range into a figure.
          </p>
        </div>
      </header>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-16 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-medium">{plan.name}</h2>
            <p className="mt-6 text-4xl font-medium tracking-tight">{plan.price}</p>
            <p className="mt-1 text-sm text-muted-foreground">{plan.cadence}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{plan.summary}</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed">
              {plan.points.map((point) => (
                <li key={point} className="border-t border-border pt-3">
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">{plan.fit}</p>
          </article>
        ))}
      </section>
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-medium tracking-tight">What changes the number</h2>
          <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>How much of the product already exists, and whether we can read it.</li>
            <li>Whether design, copy, and accounts are ready or still hypothetical.</li>
            <li>Integrations, store accounts, and anything that needs a security review.</li>
            <li>The overlap you need with US, UK, or Australian business hours.</li>
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/services" className="underline-offset-4 hover:underline">
              Compare the services
            </Link>
          </p>
        </div>
      </section>
      <Cta title="Ask for a number, not a deck." body="Send the proposal, the date, and the budget band you already have in mind." />
    </>
  )
}
