import { LinkButton } from "@/components/site/link-button"

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-28">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">That page is not on this site.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The address may be old, or the page was never published. The work we do have is linked from the home page.
      </p>
      <div className="mt-8">
        <LinkButton href="/">Back home</LinkButton>
      </div>
    </div>
  )
}
