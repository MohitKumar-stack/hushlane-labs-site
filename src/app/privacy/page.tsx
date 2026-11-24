import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { pageMetadata } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Privacy Policy | Hushlane Labs",
  description:
    "How Hushlane Labs handles information submitted through hushlanelabs.com, including the contact form, email, and optional analytics.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <h1 className="mt-8 text-4xl font-medium tracking-tight">Privacy policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated {site.legalUpdated}</p>
      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          This policy describes how {site.name} handles information collected on {site.url}. Project work is also covered by the mutual NDA and the statement of work we sign with an agency. Those documents control if they conflict with this page.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">What we collect</h2>
        <p>
          If you use the contact form, we collect your name, work email, agency name, website if you provide one, the service you select, a budget range, and your message. We also store the page address and the time you sent it. A hidden field is used to reduce spam. If that field is filled in, we discard the submission. If you book a call, the scheduler (Google Calendar or Cal.com) collects the time and the details that booking form asks for. The invite is meant to include a Google Meet link.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">Where it goes</h2>
        <p>
          Form submissions are sent to a Google Sheet we control and emailed to us so we can reply. Google processes that data on our behalf. We use the details to answer the enquiry and, if we work together, to scope the engagement.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">Analytics</h2>
        <p>
          Analytics only load after you click Accept on the cookie banner. If you click Reject, or ignore the banner, none of them run. When enabled, the site loads Google Tag Manager (and Google Analytics when it is enabled there) and Microsoft Clarity. They receive technical data such as pages viewed, device and browser type, a coarse location, and how you click and scroll. Clarity may record anonymised sessions and heatmaps so we can fix confusing pages. Form fields are masked.
        </p>
        <p>
          Your choice is stored in your browser. You can change it at any time with Cookie settings in the footer.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">How long we keep it</h2>
        <p>
          We keep enquiry records while a conversation is open and for a reasonable period afterward so we can find what was asked. We delete them sooner if you ask and we have no duty to retain them.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">Sharing</h2>
        <p>
          We do not sell personal information. We share it with the service that stores the sheet and sends the notification email, and with anyone the law requires us to tell. Client project data is handled under the NDA, not under this website policy.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight text-foreground">Contact</h2>
        <p>
          Questions about this policy go to{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    </article>
  )
}
