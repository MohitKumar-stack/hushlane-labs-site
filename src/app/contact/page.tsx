import { BookingEmbed } from "@/components/contact/booking-embed"
import { ContactForm } from "@/components/contact/contact-form"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Book a 30-Minute Call | Hushlane Labs",
  description:
    "Book a free 30-minute call with Hushlane Labs. The invite includes a Google Meet link. Prefer to write? Send a brief and we reply within 24 hours.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl">Talk to Hushlane</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Book a free 30-minute call with a Google Meet link, or send a brief. We reply within 24 hours. Email{" "}
            <a className="text-foreground underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            if you would rather write directly.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#book" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground">
            Book a Free Call
          </a>
          <a href="#brief" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Prefer to write? Send a brief
          </a>
        </div>
      </div>

      <section id="book" className="mt-12 scroll-mt-24">
        <div className="mb-4 flex flex-col gap-1 px-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-medium tracking-tight">Book a free 30-min call</h2>
          <p className="text-sm text-muted-foreground">The invite includes a Google Meet link.</p>
        </div>
        <BookingEmbed />
      </section>

      <section id="brief" className="mt-6 scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-2xl font-medium tracking-tight">Prefer to write? Send a brief</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Agency, service, and what the client already agreed to buy. Do not include passwords or customer records. A mutual NDA comes before that material. Read the{" "}
          <a className="text-foreground underline underline-offset-4" href="/how-we-work#confidentiality">
            confidentiality policy
          </a>
          .
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
