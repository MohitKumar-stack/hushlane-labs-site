export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer items-start justify-between gap-6 text-base font-medium">
            <span>{item.question}</span>
            <span aria-hidden="true" className="mt-0.5 text-muted-foreground transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-3xl pt-3 leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
