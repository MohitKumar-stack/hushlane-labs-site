import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Terms",
  description:
    "Terms for using the Hushlane Labs website. Client work is governed by the statement of work signed with the agency.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
      <h1 className="mt-8 text-4xl font-medium tracking-tight">Terms</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated {site.legalUpdated}</p>
      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          These terms cover use of the {site.name} website. They are not a statement of work. If we take on a project, the signed statement of work and NDA govern that work. If those documents conflict with this page, they win.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">The site</h2>
        <p>
          The pages describe how we work with agencies. Starting ranges are indicative. A number becomes a commitment only when it is written into a statement of work. Case studies marked as samples are illustrations, not claims about a live client.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">White-label work</h2>
        <p>
          Unless a statement of work says otherwise, we do not contact an agency’s end client, and we do not put our name on their product. Intellectual property in a paid engagement is assigned as that statement of work describes, after the related invoices are paid.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">Acceptable use</h2>
        <p>
          Do not misuse the contact form, attempt to break the site, or send unlawful material, credentials, or personal data you do not have permission to share. We may ignore submissions that look like spam.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">Liability</h2>
        <p>
          The website is provided as a source of information. To the extent the law allows, we are not liable for loss arising only from use of these pages. Liability for paid work is capped as the statement of work says, typically at the fees paid for that engagement, and excludes indirect or consequential loss where that exclusion is allowed.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">Law</h2>
        <p>
          These website terms follow the law that applies to the agreement we sign with you. Until there is a signed agreement, write to{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          and we will tell you which contract will govern the work.
        </p>
      </div>
    </article>
  )
}
