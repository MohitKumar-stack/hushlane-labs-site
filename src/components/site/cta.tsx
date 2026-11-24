import { BookingCta } from "@/components/site/booking-cta"

export function Cta({
  title = "If the client already said yes, book a free call.",
  body = "Tell us what you sold, the date they expect, and whether we should stay off the call. We reply within one business day.",
  action = "Book a Free Call",
}: {
  title?: string
  body?: string
  action?: string
}) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 sm:py-24 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
        </div>
        <BookingCta>{action}</BookingCta>
      </div>
    </section>
  )
}
