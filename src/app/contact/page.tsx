import { ContactForm } from "@/components/contact/contact-form"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Send Hushlane Labs a brief: your name, work email, agency, website, the service you need, a budget range, and what the client already bought.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
      <div>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <h1 className="mt-8 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          Start a brief
        </h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Tell us the agency, the service, and what the client already agreed to buy. We reply within one business day. If you would rather write directly, email{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Do not include passwords or customer records in this form. A mutual NDA comes before that material. Read the{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href="/how-we-work#confidentiality">
            confidentiality policy
          </a>
          .
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
