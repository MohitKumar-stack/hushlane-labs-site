import { cn } from "@/lib/utils"

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        {eyebrow ? (
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
        <div className={title || eyebrow || intro ? "mt-10" : undefined}>{children}</div>
      </div>
    </section>
  )
}
