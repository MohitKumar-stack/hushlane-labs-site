import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import type { ComponentProps, ReactNode } from "react"
import { slugify } from "@/lib/content"

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-8 border-l-2 border-foreground/30 pl-4 text-sm leading-relaxed text-muted-foreground">
      {children}
    </aside>
  )
}

function MdxLink(props: ComponentProps<"a">) {
  const className = "underline decoration-border underline-offset-4 hover:decoration-foreground"
  const href = props.href ?? ""
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {props.children}
      </Link>
    )
  }
  const external = href.startsWith("http")
  return (
    <a
      {...props}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    />
  )
}

const components = {
  Callout,
  a: MdxLink,
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2 id={slugify(textOf(children))} className="mt-10 scroll-mt-24 text-2xl font-medium tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-8 text-xl font-medium tracking-tight" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 border-l-2 border-border pl-4 text-muted-foreground" {...props} />
  ),
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="max-w-3xl">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  )
}
