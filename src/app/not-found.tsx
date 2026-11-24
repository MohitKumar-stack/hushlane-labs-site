import type { Metadata } from "next"
import Link from "next/link"
import { LinkButton } from "@/components/site/link-button"

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Hushlane Labs" },
  description: "That address is not on the Hushlane Labs site. Start from the home page, the services, or the case studies.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div data-page="not-found" className="mx-auto flex w-full max-w-6xl flex-col px-6 py-28">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">That page is not on this site.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The address may be old, or the page was never published. The work we do have is linked from the home page.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/">Back home</LinkButton>
        <LinkButton href="/services" variant="outline">
          Services
        </LinkButton>
      </div>
      <p className="mt-6 text-sm">
        <Link href="/work" className="underline-offset-4 hover:underline">
          Case studies
        </Link>
      </p>
    </div>
  )
}
